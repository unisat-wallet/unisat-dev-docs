# RGB Instant Swap

Instant Swap lets an RGB NIA seller publish a reusable, seller-signed listing.
Any buyer can complete that listing with their own BTC inputs and witness
receive output. There is no Proxy ACK round trip: the buyer validates and
stages the consignment before signing, then the trading application broadcasts
the final Bitcoin transaction.

This is a native UniSat API at `window.unisat.rgb`. It is not part of the
standard WebRGB provider at `window.rgb`, and it must not be mixed with the
[backend-coordinated](./rgb-swap-backend.md) or
[pure P2P](./rgb-swap-p2p.md) swap flows.

## Wallet version and scope

The complete flow requires **UniSat Wallet v1.8.4 or later**. Feature-detect
all four methods before offering Instant Swap:

```ts
const rgb = window.unisat?.rgb
const supported = [
  'prepareInstantSwap',
  'signInstantSwapListing',
  'signInstantSwap',
  'settleInstantSwapListing',
].every(method => typeof rgb?.[method] === 'function')

if (!supported) {
  throw new Error('RGB Instant Swap requires UniSat Wallet v1.8.4+')
}
```

Current restrictions:

- only NIA assets are supported;
- `assetId`, `amount`, `priceSats`, and `maxBtcSpend` are decimal strings;
- `amount` is expressed in the asset's smallest unit and `priceSats` in sats;
- the seller must spend one confirmed carrier containing exactly `amount` of
  the selected asset and no companion asset;
- the seller input and buyer receive output use P2TR;
- RBF and locktime are disabled;
- operations are bound to the connected website origin.

If the seller does not have an exact-total carrier, split the allocation first
and wait for that transaction to confirm before creating a listing.

## Required order

```text
Seller: build the unsigned fixed-layout listing PSBT
  -> Seller: prepareInstantSwap
  -> Seller: signInstantSwapListing
  -> Market: publish the returned listing package
  -> Buyer: createReceiveInvoice({ recipientType: 'witness' })
  -> Market: complete the listing PSBT with buyer inputs and receive output
  -> Buyer: signInstantSwap
  -> Market: finalize and broadcast the returned PSBT
  -> Seller: settleInstantSwapListing until settled
```

Persist the seller `transferId`, the complete listing package, the buyer
`recipientId`, and the final PSBT/txid. Do not repeat preparation after losing
only an HTTP response: preparation reserves the seller's RGB outpoint.

## Seller listing template

Query the seller's eligible carriers with `getFundingUtxos(assetId)`. Select
one carrier whose allocation total for `assetId` equals the listing `amount`.
The unsigned PSBT supplied to `prepareInstantSwap` must use this fixed layout:

| Position | Required value                                                      |
| -------- | ------------------------------------------------------------------- |
| input 0  | Replaceable buyer placeholder with `witnessUtxo` metadata           |
| input 1  | Exact seller RGB carrier with `witnessUtxo` and sighash `0x83`      |
| output 0 | Empty `OP_RETURN` (`script = 0x6a`, value `0`)                      |
| output 1 | Seller's current wallet script, value `sellerInputSats + priceSats` |
| output 2 | Dust-safe P2TR placeholder, value at least 330 sats                 |

Use exactly two inputs and three outputs for the listing template. Set
transaction locktime to `0` and every input sequence to `0xffffffff`. The PSBT
must not already contain a signature or another `OP_RETURN`.

The wallet replaces the empty `OP_RETURN` with the RGB commitment, verifies
the carrier against local state, reserves it, and forces seller input 1 to
`SIGHASH_SINGLE | SIGHASH_ANYONECANPAY` (`0x83`). This signature protects the
seller outpoint and output 1 while allowing a buyer to replace input 0 and
output 2 and append funding/change entries.

## Seller preparation and signature

```ts
const prepared = await seller.rgb.prepareInstantSwap({
  assetId,
  amount, // atomic-unit string, for example '100'
  priceSats, // positive satoshi string, for example '5000'
  feeRate, // optional; validated by wallet policy
  psbt: unsignedListingPsbtHex,
})

// {
//   transferId,
//   coloredPsbt,
//   status: 'awaiting_seller_signature',
// }

const listing = await seller.rgb.signInstantSwapListing(prepared.transferId, priceSats)
```

`signInstantSwapListing` opens the seller signing approval and returns the
public listing package:

```ts
interface RgbInstantSwapListingPackage {
  version: 1
  transferId: string
  assetId: string
  amount: string
  priceSats: string
  psbt: string // colored PSBT with seller input 1 signed
  consignment: string // base64 listing consignment
  templateTxid: string
  sellerOutpoint: { txid: string; vout: number }
  sellerInputIndex: 1
  sellerPayoutVout: 1
  receiverVout: 2
  protocolState: string // opaque; relay unchanged
}
```

The market must relay this object byte-for-byte. It must not decode, rewrite,
or regenerate `consignment`, `psbt`, or `protocolState`.

## Buyer invoice and final PSBT

The buyer creates a normal fixed-asset witness invoice. Do **not** set
`purpose: 'buy_swap'`; that option belongs to the ACK/commit swap flow and is
rejected by Instant Swap.

```ts
const receive = await buyer.rgb.createReceiveInvoice({
  assetId: listing.assetId,
  amount: listing.amount,
  recipientType: 'witness',
  durationSeconds: 86_400,
  minConfirmations: 3,
})

// Keep receive.recipientId and receive.witnessScriptPubKey.
```

Starting from `listing.psbt`, the market builds the final PSBT as follows:

1. Replace placeholder input 0 with a buyer-owned BTC input.
2. Keep the seller outpoint at input 1 and copy its `witnessUtxo`,
   `sighashType`, and `tapKeySig` exactly.
3. Add any additional buyer inputs only after input 1.
4. Preserve outputs 0 and 1 byte-for-byte.
5. Replace output 2 with at least 330 sats paying
   `receive.witnessScriptPubKey`.
6. Add buyer change only after output 2.
7. Keep locktime `0`, all sequences `0xffffffff`, and include `witnessUtxo`
   metadata for every input.

The buyer funds `priceSats`, the witness receive output, and the miner fee.
The seller carrier's existing sats return through protected output 1. The
market should compute the fee from the completed transaction and buyer change,
then enforce its own quote before asking the wallet to sign.

Do not mutate an already signed PSBT with a library that silently removes or
invalidates existing signatures. Rebuild the unsigned transaction and copy
the seller input metadata/signature explicitly, then compare the protected
fields before calling the wallet.

## Buyer validation and signature

```ts
const buyerSigned = await buyer.rgb.signInstantSwap({
  recipientId: receive.recipientId,
  listing,
  finalPsbt: completedPsbtHex,
  maxBtcSpend, // positive satoshi string; maximum net wallet spend
})

// {
//   recipientId,
//   txid,
//   signedPsbt,
//   status: 'ready_to_broadcast',
// }
```

Before opening the signing approval, the wallet:

- verifies the listing asset, amount, price, seller outpoint, signature, and
  protected output;
- rebinds and fully validates the RGB consignment against the final txid and
  the buyer's local witness invoice;
- durably stages that accepted receive;
- checks that input 1 is not buyer-owned;
- checks that the buyer's input value minus buyer change does not exceed
  `maxBtcSpend`.

The wallet signs only buyer-owned inputs. It preserves the seller signature
and returns a PSBT; it does not broadcast the transaction.

`maxBtcSpend` is a safety ceiling, not the quoted price. The wallet calculates
net spend as buyer-owned input value minus outputs returning to the buyer's
current address. Set the ceiling to the quoted price plus the intended miner
fee tolerance; account separately for any output not returning to that
address. Do not use an unlimited value.

## Finalization, broadcast, and seller settlement

The trading application finalizes every input in `buyerSigned.signedPsbt`,
extracts the raw transaction, verifies that its txid equals
`buyerSigned.txid`, and broadcasts that exact transaction. Do not use a
different PSBT or rebuild the transaction after buyer signing.

After the transaction is visible to the seller wallet's Bitcoin backend, call:

```ts
const settlement = await seller.rgb.settleInstantSwapListing(
  listing.transferId,
  buyerSigned.txid,
  buyerSigned.signedPsbt
)

// Before chain visibility:
// { transferId, txid, status: 'awaiting_broadcast', chainStatus, confirmations }
//
// After mempool or confirmed visibility:
// { transferId, txid, status: 'settled', chainStatus?, confirmations? }
```

If the result is `awaiting_broadcast`, retry the same call with the same txid
and PSBT after the transaction is visible. Settlement is idempotent after it
has completed. The seller wallet does not broadcast on behalf of the market.

The buyer receive remains subject to its requested confirmation threshold for
final settled balance presentation, even though the consignment was validated
before signing.

## Retry, cancellation, and recovery

- Retry `signInstantSwapListing` only with the same `transferId` and
  `priceSats`; keep and republish the returned package.
- Retry `signInstantSwap` only with the same invoice, listing, and final PSBT.
- Retry `settleInstantSwapListing` with the exact broadcast txid and PSBT.
- Before a buyer transaction is signed/broadcast, the seller may request
  `cancelSwap(listing.transferId)` to release an unused listing.
- Once buyer staging/signing has begun, the buyer receive is durably bound to
  that final transaction. There is no ACK or ordinary `rejectReceive` step.
  Do not start buyer signing unless the application is ready to finalize and
  broadcast immediately.
- Never create a replacement seller listing merely because a request timed
  out. First recover the saved `transferId` and inspect it with
  `getOperationStatus`.

## Security checklist for market implementations

- Treat `listing` as untrusted network data until `signInstantSwap` succeeds.
- Match the listing's asset, amount, and price against the order displayed by
  the market.
- Preserve seller input index 1 and outputs 0 and 1 exactly.
- Never place buyer change before output 3.
- Disable RBF and locktime for both template and final transaction.
- Enforce a narrow `maxBtcSpend` and independently verify the final fee.
- Broadcast only the exact transaction returned by the buyer wallet.
- Keep seller and buyer calls on the same origins that created their local
  transfer/invoice state.
