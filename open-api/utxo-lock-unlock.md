# UTXO Lock and Unlock Guide

UniSat excludes UTXOs that may carry inscriptions, Runes, Alkanes, or other protocol assets from normal BTC coin selection. This protects users from accidentally transferring or destroying protocol assets when they intend to spend only BTC.

The UTXO lock and unlock APIs let a user override that protection for selected outpoints through an explicit wallet signature.

> **Risk warning:** Unlocking a UTXO does not remove its protocol assets. It authorizes UniSat to treat the UTXO as spendable BTC. A later transaction may transfer or destroy assets attached to that UTXO. Show the selected outpoints and this consequence to the user before requesting a signature.

## Endpoints

| Purpose | Endpoint |
| --- | --- |
| Prepare an unlock message | `POST /v1/indexer/unavailable-utxo/unlock/prepare` |
| Apply an authorized unlock | `POST /v1/indexer/unavailable-utxo/unlock` |
| Prepare a lock message | `POST /v1/indexer/unavailable-utxo/lock/prepare` |
| Apply an authorized lock | `POST /v1/indexer/unavailable-utxo/lock` |
| Check manual unlock state | `POST /v1/indexer/check/utxo/unlock` |

These endpoints are available only on the following mainnet hosts:

| Network | Base URL |
| --- | --- |
| Bitcoin Mainnet | `https://open-api.unisat.io` |
| Fractal Bitcoin Mainnet | `https://open-api-fractal.unisat.io` |

They are not available on Bitcoin testnet, testnet4, signet, or Fractal testnet. All requests require the normal OpenAPI bearer token.

## What lock and unlock mean

- **Locked/unavailable:** The UTXO is excluded from `/v1/indexer/address/{address}/available-utxo-data` and the available portion of `/v1/indexer/address/{address}/available-balance`.
- **Unlocked/available:** The selected UTXO may be returned by the available UTXO APIs even if it carries recognized protocol assets.
- **Lock again:** Restores protection for an unlocked UTXO. A regular spendable BTC UTXO can also be manually locked.

Lock state is an OpenAPI coin-selection safeguard. It does not change the Bitcoin UTXO on-chain and does not create or broadcast a transaction.

## Unlock workflow

### 1. Prepare the message

```http
POST /v1/indexer/unavailable-utxo/unlock/prepare
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY
```

```json
{
  "address": "bc1qexampleaddress",
  "outpointList": [
    {
      "txid": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
      "index": 0
    }
  ]
}
```

Successful response:

```json
{
  "code": 0,
  "msg": "ok",
  "data": {
    "message": "Address:\nbc1qexampleaddress\nNonce:\n123456\nUnlockUtxo:\n0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdefi0",
    "nonce": 123456
  }
}
```

### 2. Review and sign

Display the exact returned `message` to the user. Sign its bytes without modifying whitespace, line endings, outpoint order, or capitalization. With the UniSat Wallet API, use the default ECDSA mode:

```javascript
const signature = await window.unisat.signMessage(message, "ecdsa");
```

Do not use `bip322-simple` for these endpoints. See the [Wallet signMessage reference](../wallet-api/api-docs/sign-message.md) for the signature format.

The server verifies the signature using Bitcoin Signed Message hashing:

```text
Bitcoin Signed Message:\n
```

Submit:

- `pubkey`: the signing secp256k1 public key encoded as hex.
- `signature`: a Base64-encoded 65-byte compact ECDSA signature.
- `nonce`: the nonce returned by the prepare call.

The signed message binds the operation, address, nonce, and ordered outpoint list. Changing any of them requires a new signature.

### 3. Apply the unlock

```http
POST /v1/indexer/unavailable-utxo/unlock
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY
```

```json
{
  "address": "bc1qexampleaddress",
  "outpointList": [
    {
      "txid": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
      "index": 0
    }
  ],
  "pubkey": "02...",
  "signature": "BASE64_COMPACT_SIGNATURE",
  "nonce": 123456
}
```

A successful mutation returns `code: 0`. Refresh `available-balance` and `available-utxo-data` before constructing a transaction. Those read endpoints may remain stale briefly because of response caching.

## Lock workflow

Locking uses the same two-step pattern:

1. Call `POST /v1/indexer/unavailable-utxo/lock/prepare` with `address` and the ordered `outpointList`.
2. Review and sign the exact returned message. The operation line is `LockUtxo:` instead of `UnlockUtxo:`.
3. Call `POST /v1/indexer/unavailable-utxo/lock` with the same `address`, ordered `outpointList`, returned `nonce`, signing `pubkey`, and Base64 compact `signature`.
4. Refresh the available balance and UTXO list.

Do not reuse an unlock signature for a lock request or reuse a signature with a different outpoint order.

## Check manual unlock state

The check endpoint accepts an array directly:

```http
POST /v1/indexer/check/utxo/unlock
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY
```

```json
[
  {
    "txid": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
    "index": 0
  },
  {
    "txid": "abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789",
    "index": 1
  }
]
```

```json
{
  "code": 0,
  "msg": "ok",
  "data": [true, false]
}
```

Each boolean corresponds to the request item at the same index. `true` means the outpoint is recorded in the manual unlock history. It does **not** prove that the UTXO is still unspent, belongs to the expected address, or is currently safe to spend. Re-query UTXO and availability data before transaction construction.

## Limits and errors

- An address can have at most 1,000 manually unlocked entries and at most 1,000 manually locked entries. The limit applies to the existing active history plus the requested list.
- `code: 0` means success.
- `code: -1` means request parsing, address, outpoint state, signature verification, or internal processing failed. Use `msg` for context, but do not rely on it as a stable machine-readable identifier.
- `code: -1001` means the applicable manual lock or unlock limit was exceeded.
- The API generally reports application errors inside an HTTP `200` response envelope. Always check `code`.

## Integration checklist

1. Query the address's available, full, and protocol-asset UTXO data as needed.
2. Let the user select exact outpoints and show any attached protocol assets.
3. Call the matching prepare endpoint.
4. Display and sign the exact returned message.
5. Submit the unchanged operation data with the signature.
6. Check `code`, then refresh available balance and UTXOs.
7. Before spending, independently verify that each selected UTXO is unspent and still belongs to the address.

