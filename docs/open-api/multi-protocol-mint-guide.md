# Multi-Protocol Mint Guide

The Inscribe API V5 Multi-Mint flow creates one order that mints Alkanes and Runes together, with an optional BRC-20 mint inscription in each round.

Supported combinations:

- Alkanes + Runes
- Alkanes + BRC-20 + Runes

Alkanes or Runes alone, BRC-20 alone, and any other combination are rejected.

## Endpoints

| Action | Endpoint |
| --- | --- |
| Quote a new order | `POST /v5/inscribe/order/quote/multi-protocol-mint` |
| Create a new order | `POST /v5/inscribe/order/create/multi-protocol-mint` |
| Quote from an existing Multi-Mint order | `POST /v5/inscribe/order/quote/repeat/multi-protocol-mint` |
| Create from an existing Multi-Mint order | `POST /v5/inscribe/order/repeat/multi-protocol-mint` |
| Get order status | `GET /v5/inscribe/order/{orderId}` |

## Payload

| Field | Required | Description |
| --- | --- | --- |
| `receiver` | Yes | Address that receives the minted assets. |
| `feeRate` | Yes | Requested miner fee rate in sats/vB. |
| `outputValue` | Yes | Value in sats for each receiving output. |
| `refundAddress` | Yes | Address used for any available refund flow. |
| `count` | Yes | Number of mint rounds; positive integer. |
| `clientId` | Create only | Client-supplied identifier used for creation rate limiting. |
| `userAddress` | No | Connected wallet ordinals address. |
| `devAddress` and `devFee` | No | Developer fee recipient and fee in sats. Both must be set to charge a developer fee. |
| `useCredit` | No | Request service-fee credit handling when available. |
| `channel` | No | Channel identifier. |
| `runes_mint` | Yes | Rune mint payload. |
| `alkanes_mint` | Yes | Alkanes mint payload. |
| `brc20_mint` | No | Add this payload only for the three-protocol combination. |

### Protocol Payloads

```json
{
  "runes_mint": {
    "runeid": "1:0"
  },
  "alkanes_mint": {
    "alkaneid": "2:0",
    "amount": "1000"
  },
  "brc20_mint": {
    "ticker": "ordi",
    "amount": "1000"
  }
}
```

- `runeid` and `alkaneid` use the service's canonical `block:tx` asset ID format.
- `alkanes_mint.amount` is an integer string in the Alkanes asset's base units. If omitted, the service uses the asset's on-chain `perMint` value.
- `brc20_mint.amount` is an amount per round. It must be positive, no greater than the ticker's mint limit, and `amount * count` must not exceed remaining supply.
- The service verifies that the Runes and Alkanes assets are currently mintable and that the requested Alkanes amount does not exceed remaining supply.

## Quote First

Quote before creating an order. A quote validates the current mintability and returns the amount that must be paid without creating order state.

```bash
curl -X POST "https://open-api.unisat.io/v5/inscribe/order/quote/multi-protocol-mint" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "receiver": "bc1p...",
    "feeRate": 10,
    "outputValue": 546,
    "refundAddress": "bc1p...",
    "count": 10,
    "runes_mint": { "runeid": "1:0" },
    "alkanes_mint": { "alkaneid": "2:0", "amount": "1000" }
  }'
```

For a three-protocol mint, include `brc20_mint` in the same request:

```json
"brc20_mint": {
  "ticker": "ordi",
  "amount": "1000"
}
```

The quote response contains `baseServiceFee`, `serviceFee`, `minerFee`, `outputValueFee`, `devFee`, `payableAmount`, `count`, and, when available, `mintDetails`. Pay `payableAmount`; do not recompute it from a local formula. See the [V5 Fee Guide](./inscribe-v5-fee-guide.md) for the service-fee schedule.

## Create and Pay

Use the same protocol payload and fee inputs from the quote, adding a unique `clientId`.

```bash
curl -X POST "https://open-api.unisat.io/v5/inscribe/order/create/multi-protocol-mint" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "mint-campaign-001",
    "receiver": "bc1p...",
    "feeRate": 10,
    "outputValue": 546,
    "refundAddress": "bc1p...",
    "count": 10,
    "devAddress": "bc1p...",
    "devFee": 1000,
    "runes_mint": { "runeid": "1:0" },
    "alkanes_mint": { "alkaneid": "2:0", "amount": "1000" },
    "brc20_mint": { "ticker": "ordi", "amount": "1000" }
  }'
```

The response contains `orderId`, `payAddress`, `amount`, and `availablePaymentMethods`.

1. Read `availablePaymentMethods` from the created order.
2. For direct payment, send exactly `amount` sats to `payAddress`.
3. Poll `GET /v5/inscribe/order/{orderId}` until the order reaches `minted` or a terminal state.

Multi-Mint is a linear transaction chain. The service continues broadcasting child transactions after the preceding transaction is accepted; completion can therefore take longer than a single inscription order.

## Order Status and Assets

The order response reports `pendingCount`, `unconfirmedCount`, `confirmedCount`, and `mintedAssetCount`. Use `availableActions` and `availablePaymentMethods` from the latest response rather than assuming a refund, pause, or Request-Commit flow is available for every state.

For Alkanes + Runes, the protocol assets accumulate through the chain and are delivered to `receiver` in the final transaction. When `brc20_mint` is included, one BRC-20 mint inscription is created per round, while the final transaction delivers the Runes and Alkanes outputs.

## Repeat a Multi-Mint Order

Use Repeat to mint the same protocol payload again without resending the protocol objects.

1. Quote with `POST /v5/inscribe/order/quote/repeat/multi-protocol-mint` and provide `sourceOrderId` plus the new receiver, fee, output, refund, count, and optional developer-fee fields.
2. Create with `POST /v5/inscribe/order/repeat/multi-protocol-mint`, adding `clientId` and optional `userAddress`.

The source order must be a Multi-Mint order. The service copies its Alkanes, Runes, and optional BRC-20 payload, then validates current mintability, remaining supply, and current fees again. A repeat order is not guaranteed to succeed merely because the source order succeeded.

## Limits and Fees

The current public maximum is environment-specific: 1,000 rounds on Bitcoin OpenAPI and 100 rounds on Fractal OpenAPI. The service fee is based on the selected protocol combination and `count`; miner fees and output-value requirements are added separately. Refer to the [V5 Fee Guide](./inscribe-v5-fee-guide.md) and use the quote response as the authoritative amount.
