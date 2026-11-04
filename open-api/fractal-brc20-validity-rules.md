# Fractal Bitcoin BRC-20 Validity and Reinscription Guide

This guide describes the BRC-20 validity rules that differ on Fractal Bitcoin, especially ticker validation and the acceptance of reinscriptions after the protocol activation height.

> **Network scope:** This page applies to Fractal Bitcoin. Do not apply its reinscription or ticker rules to Bitcoin.

## Key Differences from Bitcoin

| Rule | Bitcoin | Fractal Bitcoin |
| --- | --- | --- |
| Reinscribed satoshi | A BRC-20 operation on a cursed reinscription is not recognized | Reinscriptions are accepted under the Fractal rules after block `930930` |
| Commit UTXO contains offset `0` | Reject it for a conventional offset-`0` BRC-20 inscription | Offset `0` does not by itself make the operation invalid after activation |
| Ticker length | 4 or 5 UTF-8 bytes under the base Bitcoin rules | 6 to 12 ASCII characters |
| Ticker characters | Bitcoin rules allow byte-oriented tickers | Only `0-9`, `A-Z`, `a-z`, and `_` are accepted on Fractal |
| Ticker uniqueness | Case-insensitive | Case-insensitive |

Other JSON, numeric, supply, balance, and transaction-state checks still apply. A permitted reinscription can still contain an invalid BRC-20 operation.

## Reinscription Activation

Fractal BRC-20 reinscription support activates at block height `930930`.

- Before block `930930`, cursed/reinscribed BRC-20 inscriptions are ignored.
- At and after block `930930`, a reinscribed `deploy`, `mint`, or `transfer` can be processed when it satisfies the Fractal rules below.
- The current Fractal chain is past this activation height, so applications creating new inscriptions should use the post-activation rules.

The activation height is inclusive: an inscription at block `930930` is evaluated using the post-activation behavior.

## Reinscription and Inscription Index Rules

Reinscription support is not an unrestricted batch-inscription rule. The inscription index in the reveal transaction still matters:

- A qualifying reinscribed BRC-20 operation at inscription index `0` (`...i0`) can be accepted after activation.
- A reinscribed `deploy` or `mint` at an inscription index greater than `0` (`...i1`, `...i2`, and so on) is ignored.
- A reinscribed `transfer` at an index greater than `0` is only eligible through the supported single-step transfer construction.
- The BRC-20 JSON and current protocol state must still be valid.

For ordinary Fractal `deploy` and `mint` construction, put the operation in the first inscription envelope of the transaction. Do not assume that multiple BRC-20 mints reinscribed in one reveal transaction will all be indexed.

## Single-Step Transfer

A Fractal single-step transfer combines creation and delivery of a BRC-20 transfer into one reveal transaction. The transfer inscription commits to the sender's public key and address type in its tapscript, while the reveal output identifies the receiver.

With the current post-fork behavior, a valid single-step transfer deducts the amount from the encoded sender's available balance and credits the receiver's available balance directly. The receiver does not need to spend a separate transferable inscription to complete the transfer.

The inscription body still uses the normal BRC-20 `transfer` operation:

```json
{
  "p": "brc-20",
  "op": "transfer",
  "tick": "Nikola",
  "amt": "100"
}
```

Do not put `"single-step-transfer"` in the inscription JSON. That name is used by the indexer for history and internal state classification; it is not the submitted BRC-20 `op` value.

### Activation Heights

Single-step transfer has two relevant Fractal activation heights:

| Height | Behavior |
| --- | --- |
| Before `930930` | The tapscript extension is not processed as a single-step transfer. |
| `930930` through `1356999` | Single-step transfer is recognized, but a transfer to a different receiver remains represented as transferable balance. |
| At and after `1357000` | A transfer to a different receiver credits the receiver's available balance directly and does not create a reusable transferable inscription. |

The current Fractal chain is past both activation heights. New integrations should implement the behavior at and after `1357000`, while indexers and history processors must retain the earlier rules for historical blocks.

### Recognition Script

The indexer recognizes the single-step extension only when the key-verification fragment extracted from the tapscript is exactly 35 bytes in this form:

```text
PUSH32 <32-byte x-only public key> OP_CHECKSIGVERIFY <address-type opcode>
```

The final opcode must be between `OP_1` and `OP_8`:

| Opcode | Sender address derivation |
| --- | --- |
| `OP_1` | P2TR using a no-script Taproot tweak of the embedded key |
| `OP_2` | P2WPKH with an even compressed public key |
| `OP_3` | P2WPKH with an odd compressed public key |
| `OP_4` | P2PKH with an even compressed public key |
| `OP_5` | P2PKH with an odd compressed public key |
| `OP_6` | P2SH-P2WPKH with an even compressed public key |
| `OP_7` | P2SH-P2WPKH with an odd compressed public key |
| `OP_8` | P2TR using the x-only public key directly |

The indexer derives the sender script from the embedded public key and address type. The reveal output script is treated as the receiver. If the derived sender differs from the receiver, the operation is handled as a transfer between those two accounts.

The reveal must prove control of the encoded key according to the tapscript. Do not construct this extension by copying an address without its corresponding signing key.

### Validity Checks

A recognized single-step transfer is only valid when all normal transfer checks pass:

- The ticker exists and follows the Fractal ticker rules.
- `amt` is a valid positive string within the ticker's decimal precision.
- The encoded sender has enough available balance when the inscription is indexed.
- The public key and address-type opcode form a supported sender script.
- The operation is not sent to miner fees.

After height `1357000`, a transfer to a different receiver is final at inscription time from the BRC-20 indexer's perspective. Applications should verify the indexed `single-step-transfer` event and sufficient confirmations instead of waiting for a later spend of the inscription.

### Relationship to Reinscriptions

After height `930930`, an eligible single-step `transfer` is the exception that may be accepted at an inscription index greater than `0` on a reinscribed satoshi. This exception does not extend to `deploy`, `mint`, or an ordinary two-step transfer.

## How to Interpret the UTXO Offset API on Fractal

The following endpoint returns inscription offsets already recorded in a UTXO:

```http
GET /v1/indexer/utxo-nft-offset/{txid}/{index}
Authorization: Bearer YOUR_API_KEY
```

Example:

```bash
curl --request GET \
  --url "https://open-api-fractal.unisat.io/v1/indexer/utxo-nft-offset/0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef/0" \
  --header "Authorization: Bearer YOUR_API_KEY"
```

A response containing offset `0` means the first satoshi has already been inscribed:

```json
{
  "code": 0,
  "msg": "ok",
  "data": [0]
}
```

On Bitcoin, this is a reason to reject the UTXO for a conventional BRC-20 inscription. On Fractal at or after block `930930`, it is diagnostic information rather than an automatic rejection: the resulting reinscription may be valid if it follows the Fractal inscription-index and BRC-20 rules.

Applications that support both networks must branch by network instead of sharing the Bitcoin preflight rule:

```javascript
function shouldRejectOffsetZero(network, offsets, revealHeight) {
  if (!offsets.includes(0)) {
    return false;
  }

  if (network === "bitcoin") {
    return true;
  }

  if (network === "fractal") {
    return revealHeight < 930930;
  }

  throw new Error(`Unsupported network: ${network}`);
}
```

This check only addresses the network-level reinscription rule. The application must separately validate the inscription index, ticker, JSON body, amount, and current BRC-20 state.

## Fractal Ticker Rules

A Fractal BRC-20 ticker must satisfy all of the following:

- Length is between 6 and 12 characters, inclusive.
- Every character is ASCII.
- Allowed characters are `0-9`, `A-Z`, `a-z`, and `_`.
- Ticker uniqueness and lookup are case-insensitive.

Because the allowed character set is ASCII-only, character length and byte length are the same for valid Fractal tickers.

Valid examples:

```text
Nikola
Pi_Token
TOKEN2049
MoonFractal
```

Invalid examples:

| Ticker | Reason |
| --- | --- |
| `ordi` | Too short |
| `abcde` | Only 5 characters |
| `ticker-name` | Hyphens are not allowed |
| `ticker name` | Spaces are not allowed |
| `币代币01` | Non-ASCII characters are not allowed |
| `abcdefghijklmn` | More than 12 characters |

For uniqueness, `Nikola`, `NIKOLA`, and `nikola` identify the same ticker. If one has already been deployed, another case variant cannot be deployed again.

## JSON and Field Rules

Fractal BRC-20 operations use the same base JSON shape:

```json
{
  "p": "brc-20",
  "op": "mint",
  "tick": "Nikola",
  "amt": "100"
}
```

Apply these checks:

- The inscription body must be valid JSON.
- `p`, `op`, and `tick` must be strings.
- `p` must be `brc-20`.
- `op` must be `deploy`, `mint`, or `transfer`.
- Numeric protocol fields such as `max`, `lim`, `dec`, and `amt` must be strings.
- Numeric values must respect the ticker's decimal precision and unsigned 64-bit range.
- `dec` defaults to `18` when omitted and cannot exceed `18`.
- `lim` defaults to `max` when omitted.

## Deploy Rules and `self_mint`

Example Fractal deployment:

```json
{
  "p": "brc-20",
  "op": "deploy",
  "tick": "Example_1",
  "max": "21000000",
  "lim": "1000",
  "dec": "8",
  "self_mint": "false"
}
```

- `max` is required.
- `lim` and `dec` may be omitted and use the defaults described above.
- `self_mint` may be omitted and defaults to `false`.
- When provided, `self_mint` must be the string `"true"` or `"false"`, not a JSON boolean.
- For a self-mint ticker, subsequent mint inscriptions must reference the deploy inscription as their parent.
- Ticker deployment is case-insensitively unique.

## State-Dependent Rules Still Apply

Allowing a reinscription does not bypass normal BRC-20 state checks:

- A ticker must already exist before it can be minted or transferred.
- A mint amount must be positive and cannot exceed the deployment's mint limit.
- Minting stops when the ticker reaches its maximum supply.
- A transfer amount must be positive and cannot exceed the owner's available balance.
- A transfer inscription cannot be reused after it has been consumed.
- An operation sent to miner fees is ignored.
- A confirmed inscription is not proof of a valid BRC-20 state transition.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| Reinscription exists but has no BRC-20 event | Check reveal height, inscription index, JSON fields, ticker rules, and protocol state. |
| `mint` at `...i1` or later is ignored | Fractal does not generally accept batched reinscribed mints at inscription indexes greater than `0`. |
| Ticker deployment is ignored | Confirm 6–12 ASCII characters, the allowed character set, and case-insensitive uniqueness. |
| `self_mint` deploy is ignored | Use the string `"true"` or `"false"`; for later mints, verify the parent inscription. |
| Offset API returns `0` | On post-activation Fractal, do not reject solely for this reason; continue with the remaining validity checks. |
| The same code works on Fractal but fails on Bitcoin | Bitcoin does not apply Fractal's reinscription and ticker rules. Use network-specific validation. |

When reporting a Fractal BRC-20 indexing problem, include the reveal height, inscription ID including its `i` index, raw inscription body, ticker, operation, and relevant protocol state.

## References

- [Bitcoin BRC-20 Validity and Troubleshooting Guide](./bitcoin-brc20-validity-rules.md)
- [UniSat Inscription Indexer API](./auto-generated/docs/inscription-indexer.md)
- [BRC20 Balance and Transfer](./brc20-balance-and-transfer.md)

