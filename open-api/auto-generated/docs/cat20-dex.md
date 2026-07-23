# CAT20 DEX API

Fractal Only API for CAT20 DEX operations. This API provides endpoints to interact with the Fractal network, including supply information, address statistics, and rich lists.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [GET `/v1/cat20-dex/getTokenPrice`](#get-token-price) | Get token price |
| [GET `/v1/cat20-dex/getMarketStats`](#get-the-market-stats) | Get the market stats |

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
- `tokenId` (query, string) **(required)**: tokenId

#### Response (200)
Successful operation

- `code` (integer (int32)):
- `msg` (string): example: `"OK"`
- `data` (object):
  - `askPrice` (number):
  - `bidPrice` (number):
  - `latestTradePrice` (number):
  - `timestamp` (string):
  - `height` (integer):

#### Response (401)
Invalid API Key


---

### Get the market stats
<a id="get-the-market-stats"></a>

**Method**: `GET`  
**Path**: `/v1/cat20-dex/getMarketStats`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/CAT20-DEX/getMarketStats)  

#### Description
Retrieves the market stats for all tokens which have trades in the last 30 days

#### Parameters
- `sortField` (query, string): The field to sort by ('volume', 'volume30d', 'volume7d', 'volume24h', 'volume6h'); enum: `volume`, `volume30d`, `volume7d`, `volume24h`, `volume6h`
- `tokenId` (query, string): tokenId
- `offset` (query, integer): The offset to start from; example: `0`
- `limit` (query, integer): The limit of the stats (default 20, max 100); example: `20`

#### Response (200)
Successful operation

- `code` (integer (int32)):
- `msg` (string): example: `"OK"`
- `data` (object):
  - `tokenStats` (object):
    - `tokenId` (string):
    - `volume` (string):
    - `volume30d` (string):
    - `volume24h` (string):
    - `volume7d` (string):
    - `volume6h` (string):
    - `price` (number):
    - `price6h` (number):
    - `price24h` (number):
    - `price7d` (number):
    - `price30d` (number):
    - `name` (string):
    - `symbol` (string):
    - `decimals` (integer):
    - `max` (integer):
    - `volumeToken` (string):
    - `volumeToken30d` (string):
    - `volumeToken24h` (string):
    - `volumeToken7d` (string):
    - `volumeToken6h` (string):
  - `total` (integer):

#### Response (401)
Invalid API Key


---

