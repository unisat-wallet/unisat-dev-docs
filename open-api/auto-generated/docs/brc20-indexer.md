# BRC-20 API

BRC-20 API is a RESTful API for BRC-20 token data indexing and querying. It provides endpoints to retrieve information about BRC-20 tokens, including their status, holders, history, and more.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---

## 📑 Table of Contents

- [BRC-20](#brc-20)
  - [Get the best block height of BRC20 data](#get-the-best-block-height-of-brc20-data)
  - [Get the tiker list of BRC20 token.](#get-the-tiker-list-of-brc20-token)
  - [Get the status of BRC20 list.](#get-the-status-of-brc20-list)
  - [Get the infomation of BRC20 by ticker](#get-the-infomation-of-brc20-by-ticker)
  - [Get the holders of BRC20 by ticker.](#get-the-holders-of-brc20-by-ticker)
  - [Get the full history of BRC20 by ticker.](#get-the-full-history-of-brc20-by-ticker)
  - [Get the full history of BRC20 by address.](#get-the-full-history-of-brc20-by-address)
  - [Get the tiker list of BRC20 token by height.](#get-the-tiker-list-of-brc20-token-by-height)
  - [Get the BRC20 token summary by address.](#get-the-brc20-token-summary-by-address)
  - [Get the BRC20 token summary by address and height.](#get-the-brc20-token-summary-by-address-and-height)
  - [Get the BRC20 token info by address and ticker.](#get-the-brc20-token-info-by-address-and-ticker)
  - [Get the full history of BRC20 by address.](#get-the-full-history-of-brc20-by-address)
  - [Get the full history of BRC20 by address and ticker.](#get-the-full-history-of-brc20-by-address-and-ticker)
  - [Get the transferable inscriptions list of BRC20 by address.](#get-the-transferable-inscriptions-list-of-brc20-by-address)
  - [Get the history of BRC20 Module by address.](#get-the-history-of-brc20-module-by-address)
  - [Get the withdraw history of BRC20.](#get-the-withdraw-history-of-brc20)

---

## BRC-20

### Get the best block height of BRC20 data
<a id="get-the-best-block-height-of-brc20-data"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20/bestheight`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20BestHeight)  

#### Description
Get the best block height of BRC20 data. This value will be consistent with the latest block height a short time after the block has been confirmed.

#### Response (200)


---

### Get the tiker list of BRC20 token.
<a id="get-the-tiker-list-of-brc20-token"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20/list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20TickerList)  

#### Description
Get the tiker list of BRC20 token.

#### Parameters
- `start` (query) **(required)**: Start offset
- `limit` (query) **(required)**: Number of inscriptions returned

#### Response (200)


---

### Get the status of BRC20 list.
<a id="get-the-status-of-brc20-list"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20/status`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20Status)  

#### Description
Obtain BRC20 list status

#### Parameters
- `start` (query) **(required)**: Start offset
- `limit` (query) **(required)**: Number of inscriptions returned
- `sort` (query) : sort by (holders/deploy/minted/transactions)
- `complete` (query) : filter by (completed or not)

#### Response (200)


---

### Get the infomation of BRC20 by ticker
<a id="get-the-infomation-of-brc20-by-ticker"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20/{ticker}/info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20InfoByTicker)  

#### Description
Get the infomation of BRC20 by ticker.

#### Parameters
- `ticker` (path) **(required)**: Token ticker

#### Response (200)


---

### Get the holders of BRC20 by ticker.
<a id="get-the-holders-of-brc20-by-ticker"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20/{ticker}/holders`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20HoldersByTicker)  

#### Description
Get the holders of BRC20 by ticker.

#### Parameters
- `ticker` (path) **(required)**: Token ticker
- `start` (query) **(required)**: Start offset
- `limit` (query) **(required)**: Number of returned

#### Response (200)


---

### Get the full history of BRC20 by ticker.
<a id="get-the-full-history-of-brc20-by-ticker"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20/{ticker}/history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20HistoryByTicker)  

#### Description
Get the full history of BRC20.

#### Parameters
- `ticker` (path) **(required)**: Token ticker
- `type` (query) **(required)**: Filter by history type
- `height` (query) **(required)**: Block height
- `start` (query) **(required)**: Start offset
- `limit` (query) **(required)**: Number of inscriptions returned

#### Response (200)


---

### Get the full history of BRC20 by address.
<a id="get-the-full-history-of-brc20-by-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20/{ticker}/tx/{txid}/history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20HistoryByTickerAndTxid)  

#### Description
Get the full history of BRC20 by address.

#### Parameters
- `ticker` (path) **(required)**: Token ticker
- `txid` (path) **(required)**: txid
- `type` (query) **(required)**: Filter by history type
- `start` (query) **(required)**: Start offset
- `limit` (query) **(required)**: Number of inscriptions returned

#### Response (200)


---

### Get the tiker list of BRC20 token by height.
<a id="get-the-tiker-list-of-brc20-token-by-height"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20/history-by-height/{height}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20HistoryByHeight)  

#### Description
Get the tiker list of BRC20 token.

#### Parameters
- `height` (path) **(required)**: Block Height
- `start` (query) **(required)**: Start offset
- `limit` (query) **(required)**: Number of inscriptions returned

#### Response (200)


---

### Get the BRC20 token summary by address.
<a id="get-the-brc20-token-summary-by-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/brc20/summary`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20SummaryByAddress)  

#### Description
Obtain BRC20 token summary by address, including available balance, transferable balance

#### Parameters
- `address` (path) **(required)**: Address
- `start` (query) **(required)**: Start offset
- `limit` (query) **(required)**: Number of inscriptions returned
- `tick_filter` (query) : Filter by tick type (8 Filter ticks with selfMint set to false, 16 Filter ticks with selfMint set to true, 24 Return all ticks regardless of selfMint.)
- `exclude_zero` (query) : Exclude zero balance

#### Response (200)


---

### Get the BRC20 token summary by address and height.
<a id="get-the-brc20-token-summary-by-address-and-height"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/brc20/summary-by-height/{height}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20SummaryByAddressAndHeight)  

#### Description
Obtain BRC20 token summary by address, including available balance, transferable balance

#### Parameters
- `address` (path) **(required)**: Address
- `height` (path) **(required)**: Block Height
- `start` (query) **(required)**: Start offset
- `limit` (query) **(required)**: Number of inscriptions returned

#### Response (200)


---

### Get the BRC20 token info by address and ticker.
<a id="get-the-brc20-token-info-by-address-and-ticker"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/brc20/{ticker}/info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20InfoByAddressAndTicker)  

#### Description
Obtain BRC20 token infomation by address, including available balance, transferable balance, number of transferable inscriptions, the first few Inscriptions, etc.

#### Parameters
- `address` (path) **(required)**: Address
- `ticker` (path) **(required)**: Token ticker

#### Response (200)


---

### Get the full history of BRC20 by address.
<a id="get-the-full-history-of-brc20-by-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/brc20/history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20HistoryByAddress)  

#### Description
Get the full history of BRC20 by address.

#### Parameters
- `address` (path) **(required)**: Address
- `start` (query) **(required)**: Start offset
- `limit` (query) **(required)**: Number of inscriptions returned

#### Response (200)


---

### Get the full history of BRC20 by address and ticker.
<a id="get-the-full-history-of-brc20-by-address-and-ticker"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/brc20/{ticker}/history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20HistoryByAddressAndTicker)  

#### Description
Get the full history of BRC20 by address.

#### Parameters
- `address` (path) **(required)**: Address
- `ticker` (path) **(required)**: Token ticker
- `type` (query) **(required)**: Filter by history type
- `start` (query) **(required)**: Start offset
- `limit` (query) **(required)**: Number of inscriptions returned

#### Response (200)


---

### Get the transferable inscriptions list of BRC20 by address.
<a id="get-the-transferable-inscriptions-list-of-brc20-by-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/brc20/{ticker}/transferable-inscriptions`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20TransferableInscriptionsByAddressAndTicker)  

#### Description
Get the transferable inscriptions list of BRC20 by address.

#### Parameters
- `address` (path) **(required)**: Address
- `ticker` (path) **(required)**: Token ticker
- `start` (query) **(required)**: Start offset
- `limit` (query) **(required)**: Number of inscriptions returned

#### Response (200)


---

### Get the history of BRC20 Module by address.
<a id="get-the-history-of-brc20-module-by-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20-module/{module}/history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20ModuleHistoryByAddress)  

#### Description
Get the history of BRC20 Module.

#### Parameters
- `module` (path) **(required)**: Address
- `start` (query) **(required)**: Start height
- `end` (query) **(required)**: End height
- `cursor` (query) **(required)**: Start Offset
- `size` (query) **(required)**: Number of events returned

#### Response (200)


---

### Get the withdraw history of BRC20.
<a id="get-the-withdraw-history-of-brc20"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20-module/withdraw-history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20WithdrawHistory)  

#### Description
Get the withdraw history of BRC20.

#### Parameters
- `start` (query) **(required)**: Start height
- `end` (query) **(required)**: End height
- `cursor` (query) **(required)**: Start Offset
- `size` (query) **(required)**: Number of events returned

#### Response (200)


---

