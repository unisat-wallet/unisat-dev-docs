# Price API

This API provides real-time price information for BTC and FB (Fractal Bitcoin).

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [GET `/v1/price/btc`](#get-btc-price) | Get BTC price |
| [GET `/v1/price/fb`](#get-fb-price) | Get FB price |

---

## Price

### Get BTC price
<a id="get-btc-price"></a>

**Method**: `GET`  
**Path**: `/v1/price/btc`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Price/getBtcPrice)  

#### Description
Retrieves the current price of Bitcoin (BTC) in USD.

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

### Get FB price
<a id="get-fb-price"></a>

**Method**: `GET`  
**Path**: `/v1/price/fb`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Price/getFbPrice)  

#### Description
Retrieves the current price of Fractal Bitcoin (FB) in USD.

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

