# Inscribe API V5 Migration

`GET /v2/inscribe/order/summary` remains supported. All other `/v2/inscribe/*` endpoints are deprecated. New integrations must use `/inscribe-v5/*`; deprecated V2 endpoints are retained only for existing clients while they migrate.

V5 uses the same bearer API key. When OpenAPI mode is enabled, every V5 order is scoped to the calling API application, so an order ID cannot be queried or operated on by another application.

## Core Endpoint Mapping

| Deprecated V2 endpoint | V5 replacement | Migration note |
| --- | --- | --- |
| `GET /v2/inscribe/order/summary` | `GET /inscribe-v5/fees-config` and `GET /inscribe-v5/order/list` | V5 has no status-count summary. Use the order list for order state and `fees-config` for fee and eligibility data. |
| `GET /v2/inscribe/order/list` | `GET /inscribe-v5/order/list` | Send `cursor`, `size`, and a JSON-encoded `filter` query parameter. |
| `GET /v2/inscribe/order/{orderId}` | `GET /inscribe-v5/order/{orderId}` | V5 adds `availableActions`, `availablePaymentMethods`, `outputValueFee`, and optional `compactFiles`. |
| `POST /v2/inscribe/order/create` | `POST /inscribe-v5/order/create` | Replace `receiveAddress` with `receiver`; supply `clientId`, `refundAddress`, `userAddress`, and `userPubkey`. |
| `POST /v2/inscribe/order/request-commit` | `POST /inscribe-v5/order/request-commit` | V5 requires `payerAddress` and `payerPubkey`. |
| `POST /v2/inscribe/order/sign-commit` | `POST /inscribe-v5/order/sign-commit` | The signed PSBT remains in `psbt`. |
| `POST /v2/inscribe/order/sign-reveal` | `POST /inscribe-v5/order/sign-reveal` | The signed PSBT remains in `psbt`. |
| `POST /v2/inscribe/order/{orderId}/refund-estimate` | `POST /inscribe-v5/refund/estimate` | Move `orderId` from the path into the JSON body. |
| `POST /v2/inscribe/order/{orderId}/refund` | `POST /inscribe-v5/refund` | Move `orderId` into the JSON body and rename `refundFeeRate` to `feeRate`. |

## Protocol Endpoint Mapping

| Deprecated V2 endpoint | V5 replacement |
| --- | --- |
| `POST /v2/inscribe/order/create/brc20-deploy` | `POST /inscribe-v5/order/create` |
| `POST /v2/inscribe/order/create/brc20-mint` | `POST /inscribe-v5/order/create` or `POST /inscribe-v5/order/repeat` for a supported prior mint order |
| `POST /v2/inscribe/order/create/brc20-transfer` | `POST /inscribe-v5/order/create` |
| `POST /v2/inscribe/order/create/brc20-5byte-mint` | `POST /inscribe-v5/order/create/brc20-5byte-mint` |
| `POST /v2/inscribe/order/request-commit/brc20-5byte-mint` | No V5 replacement. This signing step is not publicly available. |
| `POST /v2/inscribe/order/sign-commit/brc20-5byte-mint` | No V5 replacement. This signing step is not publicly available. |
| `POST /v2/inscribe/order/sign-reveal/brc20-5byte-mint` | No V5 replacement. This signing step is not publicly available. |
| `POST /v2/inscribe/order/create/runes-etch` | `POST /inscribe-v5/order/create/runes-etch` |
| `POST /v2/inscribe/order/create/runes-mint` | `POST /inscribe-v5/order/create/runes-mint` |

For ordinary BRC-20 deploy, mint, and transfer inscriptions in V5, use the generic create endpoint and provide the protocol JSON as a `files[].dataURL` inscription. Use the dedicated V5 endpoints for 5-byte minting, Runes, Alkanes, Clockin, and multi-protocol minting.

## Request Model Changes

- V5 uses `receiver` instead of V2's `receiveAddress` for order creation.
- V5 creation requests require `clientId` and `refundAddress`. Generic V5 creation also requires `userAddress` and `userPubkey`.
- V5 supports optional `devAddress` (developer fee recipient) and `devFee` (developer fee in sats) on supported quote and order creation endpoints. Include both fields when charging a developer fee.
- Quote before creating an order with the matching `/inscribe-v5/order/quote/*` endpoint where available. Quotes do not create order state.
- Before calling a state-changing endpoint, inspect `availablePaymentMethods` and `availableActions` on the V5 order. They are the supported source for direct payment, Request-Commit, cancellation, and pause availability; acceleration endpoints are not publicly available.

See the generated [Inscribe API V5 reference](./inscribe-v5.md) for the complete request and response schemas.
