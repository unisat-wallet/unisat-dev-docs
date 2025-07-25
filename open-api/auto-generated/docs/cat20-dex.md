# CAT20 DEX API

Fractal Only API for CAT20 DEX operations. This API provides endpoints to interact with the Fractal network, including supply information, address statistics, and rich lists.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [GET /v1/cat20-dex/getTokenPrice](#get-token-price) | Get token price |
| [GET /v1/cat20-dex/getMarketStats](#get-the-market-stats) | Get the market stats |

---

## CAT20-DEX

### Get token price
<a id="get-token-price"></a>

**Method**: `GET`  
**Path**: `/v1/cat20-dex/getTokenPrice`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/CAT20-DEX/getTokenPrice)  

#### Description
Retrieves the current price of a CAT20 token. If the token has no trades in the last 30 days, it will return the last price.

#### Parameters
- `tokenId` (query) **(required)**: tokenId

#### Response (200)


---

### Get the market stats
<a id="get-the-market-stats"></a>

**Method**: `GET`  
**Path**: `/v1/cat20-dex/getMarketStats`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/CAT20-DEX/getMarketStats)  

#### Description
Retrieves the market stats for all tokens which have trades in the last 30 days

#### Parameters
- `sortField` (query) : The field to sort by ('volume', 'volume30d', 'volume7d', 'volume24h', 'volume6h')
- `tokenId` (query) : tokenId
- `offset` (query) : The offset to start from
- `limit` (query) : The limit of the stats (default 20, max 100)

#### Response (200)


---

