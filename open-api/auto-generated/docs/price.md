# Price API

This API provides real-time price information for BTC and FB (Fractal Bitcoin).

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [GET `/v1/price/btc`](#get-latest-btc-price-in-usd) | Get latest BTC price in USD |
| [GET `/v1/price/fb`](#get-latest-fractal-bitcoin-price-in-usd) | Get latest Fractal Bitcoin price in USD |

---

## Price

### Get latest BTC price in USD
<a id="get-latest-btc-price-in-usd"></a>

**Method**: `GET`  
**Path**: `/v1/price/btc`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Price/getBtcPrice)  

#### Description
Returns the latest BTC price quote with the USD price and Unix updateTime timestamp. Use this read-only endpoint for wallets, marketplaces, fee estimators, and portfolio views that need a public BTC reference price without creating orders, signatures, or transactions.

#### Response (200)
Successful operation

- `code` (integer (int32)):
- `msg` (string): example: `"ok"`
- `data` (object):
  - `price` (number): Current price in USD; example: `71373.42718545307`
  - `updateTime` (integer (int64)): Unix timestamp of last price update; example: `1770558840`

#### Response (401)
Invalid API Key


---

### Get latest Fractal Bitcoin price in USD
<a id="get-latest-fractal-bitcoin-price-in-usd"></a>

**Method**: `GET`  
**Path**: `/v1/price/fb`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Price/getFbPrice)  

#### Description
Returns the latest FB (Fractal Bitcoin) price quote with the USD price and Unix updateTime timestamp. Use this read-only endpoint for Fractal wallets, marketplaces, analytics, and portfolio screens that need a public FB reference price without side effects or user confirmation.

#### Response (200)
Successful operation

- `code` (integer (int32)):
- `msg` (string): example: `"ok"`
- `data` (object):
  - `price` (number): Current price in USD; example: `71373.42718545307`
  - `updateTime` (integer (int64)): Unix timestamp of last price update; example: `1770558840`

#### Response (401)
Invalid API Key


---

