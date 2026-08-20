# Fractal Only API

This API is limited to Fractal only. It provides endpoints to interact with the Fractal network, including supply information, address statistics, and rich lists.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [GET `/v1/public/fractal/supply`](#get-current-circulating-fractal-supply-and-block-height) | Get current circulating Fractal supply and block height |
| [GET `/v1/public/fractal/total-supply`](#get-total-fractal-supply-and-indexed-block-height) | Get total Fractal supply and indexed block height |
| [GET `/v1/public/address/total`](#get-total-indexed-fractal-address-count) | Get total indexed Fractal address count |
| [GET `/v1/public/address/rich-list`](#list-richest-fractal-addresses-by-indexed-balance) | List richest Fractal addresses by indexed balance |

---

## Public-Fractal

### Get current circulating Fractal supply and block height
<a id="get-current-circulating-fractal-supply-and-block-height"></a>

**Method**: `GET`  
**Path**: `/v1/public/fractal/supply`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Public-Fractal/getFractalSupply)  

#### Description
Returns the indexed Fractal supply snapshot, including the latest indexed block count and current supply value. Use this read-only endpoint for Fractal dashboards, wallet balance context, and supply monitoring where data may lag the chain tip because of indexer confirmation and synchronization rules.

#### Response (200)
Successful operation

- `code` (integer (int32)):
- `msg` (string): example: `"OK"`
- `data` (object):
  - `blocks` (number):
  - `supply` (number):

#### Response (401)
Invalid API Key


---

### Get total Fractal supply and indexed block height
<a id="get-total-fractal-supply-and-indexed-block-height"></a>

**Method**: `GET`  
**Path**: `/v1/public/fractal/total-supply`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Public-Fractal/getFractalTotalSupply)  

#### Description
Returns the indexed Fractal total supply snapshot with block count and supply amount. Use this read-only endpoint to display aggregate FB issuance, compare supply metrics across environments, or power public Fractal statistics pages without creating orders, signatures, or transactions.

#### Response (200)
Successful operation

- `code` (integer (int32)):
- `msg` (string): example: `"OK"`
- `data` (object):
  - `blocks` (number):
  - `supply` (number):

#### Response (401)
Invalid API Key


---

### Get total indexed Fractal address count
<a id="get-total-indexed-fractal-address-count"></a>

**Method**: `GET`  
**Path**: `/v1/public/address/total`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Public-Fractal/getFractalTotalAddress)  

#### Description
Returns the total number of Fractal addresses tracked by the indexer as a numeric value. Use this read-only endpoint for network growth metrics, explorer overviews, and public statistics where the count reflects UniSat indexing progress rather than an immediate chain-tip scan.

#### Response (200)
Successful operation

- `code` (integer (int32)):
- `msg` (string): example: `"OK"`
- `data` (number):

#### Response (401)
Invalid API Key


---

### List richest Fractal addresses by indexed balance
<a id="list-richest-fractal-addresses-by-indexed-balance"></a>

**Method**: `GET`  
**Path**: `/v1/public/address/rich-list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Public-Fractal/getFractalRichList)  

#### Description
Returns a paginated rich list of Fractal address balances, with each item containing the address and indexed balance amount. Use cursor and size to page through holders for explorer leaderboards, distribution analysis, or wallet analytics; results are read-only and may lag final chain state while indexing catches up.

#### Parameters
- `cursor` (query, integer) **(required)**: Start offset
- `size` (query, integer) **(required)**: Number of items returned (Max 10000)

#### Response (200)
Successful operation

- `code` (integer (int32)):
- `msg` (string): example: `"OK"`
- `data` (array):
  - `address` (string):
  - `balance` (number):

#### Response (401)
Invalid API Key


---

