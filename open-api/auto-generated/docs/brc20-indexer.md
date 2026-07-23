# BRC-20 API

BRC-20 API is a RESTful API for BRC-20 token data indexing and querying. It provides endpoints to retrieve information about BRC-20 tokens, including their status, holders, history, and more.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [GET `/v1/indexer/brc20/bestheight`](#get-the-best-block-height-of-brc20-data) | Get the best block height of BRC20 data |
| [GET `/v1/indexer/brc20/list`](#get-the-ticker-list-of-brc-20-tokens) | Get the ticker list of BRC-20 tokens. |
| [GET `/v1/indexer/brc20/status`](#get-the-status-of-brc20-list) | Get the status of BRC20 list. |
| [GET `/v1/indexer/brc20/(ticker)/info`](#get-the-information-of-brc-20-by-ticker) | Get the information of BRC-20 by ticker |
| [GET `/v1/indexer/brc20/(ticker)/holders`](#get-the-holders-of-brc20-by-ticker) | Get the holders of BRC20 by ticker. |
| [GET `/v1/indexer/brc20/(ticker)/history`](#get-the-full-history-of-brc20-by-ticker) | Get the full history of BRC20 by ticker. |
| [GET `/v1/indexer/brc20/(ticker)/tx/(txid)/history`](#get-the-full-history-of-brc-20-by-ticker-and-transaction-id) | Get the full history of BRC-20 by ticker and transaction ID. |
| [GET `/v1/indexer/brc20/history-by-height/(height)`](#get-brc-20-history-by-block-height) | Get BRC-20 history by block height. |
| [GET `/v1/indexer/address/(address)/brc20/summary`](#get-the-brc20-token-summary-by-address) | Get the BRC20 token summary by address. |
| [GET `/v1/indexer/address/(address)/brc20/summary-by-height/(height)`](#get-the-brc20-token-summary-by-address-and-height) | Get the BRC20 token summary by address and height. |
| [GET `/v1/indexer/address/(address)/brc20/(ticker)/info`](#get-the-brc20-token-info-by-address-and-ticker) | Get the BRC20 token info by address and ticker. |
| [GET `/v1/indexer/address/(address)/brc20/history`](#get-the-full-history-of-brc-20-by-address) | Get the full history of BRC-20 by address. |
| [GET `/v1/indexer/address/(address)/brc20/(ticker)/history`](#get-the-full-history-of-brc-20-by-address-and-ticker) | Get the full history of BRC-20 by address and ticker. |
| [GET `/v1/indexer/address/(address)/brc20/(ticker)/transferable-inscriptions`](#get-the-transferable-inscriptions-list-of-brc20-by-address) | Get the transferable inscriptions list of BRC20 by address. |
| [GET `/v1/indexer/brc20-module/(module)/history`](#get-the-history-of-brc20-module-by-address) | Get the history of BRC20 Module by address. |
| [GET `/v1/indexer/brc20-module/withdraw-history`](#get-the-withdraw-history-of-brc20) | Get the withdraw history of BRC20. |

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
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `height` (integer): best block height of brc20
  - `blockid` (string): best block id of brc20
  - `timestamp` (integer): timestamp of best block
  - `total` (integer): total number of brc20 tickers

#### Response (401)
Invalid API Key


---

### Get the ticker list of BRC-20 tokens.
<a id="get-the-ticker-list-of-brc-20-tokens"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20/list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20TickerList)  

#### Description
Get the ticker list of BRC-20 tokens.

#### Parameters
- `start` (query, integer) **(required)**: Start offset
- `limit` (query, integer) **(required)**: Number of inscriptions returned

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `detail` (object):
  - `start` (integer):
  - `total` (integer):

#### Response (401)
Invalid API Key


---

### Get the status of BRC20 list.
<a id="get-the-status-of-brc20-list"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20/status`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20Status)  

#### Description
Obtain BRC20 list status

#### Parameters
- `start` (query, integer) **(required)**: Start offset
- `limit` (query, integer) **(required)**: Number of inscriptions returned
- `sort` (query, string): sort by (holders/deploy/minted/transactions); enum: `holders`, `deploy`, `minted`, `transactions`
- `complete` (query, string): filter by (completed or not); enum: `yes`, `no`

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `height` (integer):
  - `start` (integer):
  - `total` (integer):
  - `detail` (array):
    - `ticker` (string):
    - `creator` (string):
    - `totalMinted` (string):
    - `confirmedMinted` (string):
    - `confirmedMinted1h` (string):
    - `confirmedMinted24h` (string):
    - `completeBlocktime` (integer):
    - `completeHeight` (integer):
    - `inscriptionNumberEnd` (integer):
    - `inscriptionNumberStart` (integer):
    - `minted` (string):
    - `mintTimes` (integer):
    - `historyCount` (integer):
    - `holdersCount` (integer):
    - `txid` (string):
    - `deployHeight` (integer):
    - `deployBlocktime` (integer):
    - `inscriptionId` (string):
    - `inscriptionNumber` (integer):
    - `max` (string):
    - `decimal` (integer):
    - `limit` (string):

#### Response (401)
Invalid API Key


---

### Get the information of BRC-20 by ticker
<a id="get-the-information-of-brc-20-by-ticker"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20/{ticker}/info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20InfoByTicker)  

#### Description
Get the information of BRC-20 by ticker.

#### Parameters
- `ticker` (path, string) **(required)**: Token ticker

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `ticker` (string):
  - `creator` (string):
  - `totalMinted` (string):
  - `confirmedMinted` (string):
  - `confirmedMinted1h` (string):
  - `confirmedMinted24h` (string):
  - `completeBlocktime` (integer):
  - `completeHeight` (integer):
  - `inscriptionNumberEnd` (integer):
  - `inscriptionNumberStart` (integer):
  - `minted` (string):
  - `mintTimes` (integer):
  - `historyCount` (integer):
  - `holdersCount` (integer):
  - `txid` (string):
  - `deployHeight` (integer):
  - `deployBlocktime` (integer):
  - `inscriptionId` (string):
  - `inscriptionNumber` (integer):
  - `max` (string):
  - `decimal` (integer):
  - `limit` (string):

#### Response (401)
Invalid API Key

### Notes

![image](./brc20_p1.avif)

Due to the inability to transmit special characters on the router, for tickers containing special characters, please use the hexadecimal encoding format.

```typescript
export function stringToHex(stringToEncode: string) {
  return Buffer.from(stringToEncode).toString("hex");
}
```

![image](./brc20_p2.avif)


---

### Get the holders of BRC20 by ticker.
<a id="get-the-holders-of-brc20-by-ticker"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20/{ticker}/holders`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20HoldersByTicker)  

#### Description
Get the holders of BRC20 by ticker.

#### Parameters
- `ticker` (path, string) **(required)**: Token ticker
- `start` (query, integer) **(required)**: Start offset
- `limit` (query, integer) **(required)**: Number of holders returned

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `detail` (array):
    - `address` (string):
    - `availableBalance` (string):
    - `overallBalance` (string):
    - `transferableBalance` (string):
  - `start` (integer):
  - `total` (integer):

#### Response (401)
Invalid API Key


---

### Get the full history of BRC20 by ticker.
<a id="get-the-full-history-of-brc20-by-ticker"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20/{ticker}/history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20HistoryByTicker)  

#### Description
Get the full history of BRC20.

#### Parameters
- `ticker` (path, string) **(required)**: Token ticker
- `type` (query, string) **(required)**: Filter by history type; enum: `inscribe-deploy`, `inscribe-mint`, `inscribe-transfer`, `transfer`, `send`, `receive`
- `height` (query, integer) **(required)**: Block height
- `start` (query, integer) **(required)**: Start offset
- `limit` (query, integer) **(required)**: Number of inscriptions returned

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `detail` (array):
    - `valid` (boolean):
    - `type` (string):
    - `from` (string):
    - `to` (string):
    - `amount` (string):
    - `overallBalance` (string):
    - `availableBalance` (string):
    - `transferBalance` (string):
    - `inscriptionId` (string):
    - `inscriptionNumber` (integer):
    - `height` (integer):
    - `blockhash` (string):
    - `blocktime` (integer):
    - `txIdx` (integer):
    - `txid` (string):
    - `satoshi` (integer):
    - `offset` (integer):
  - `start` (integer):
  - `total` (integer):

#### Response (401)
Invalid API Key


---

### Get the full history of BRC-20 by ticker and transaction ID.
<a id="get-the-full-history-of-brc-20-by-ticker-and-transaction-id"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20/{ticker}/tx/{txid}/history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20HistoryByTickerAndTxid)  

#### Description
Get the full history of BRC-20 by ticker and transaction ID.

#### Parameters
- `ticker` (path, string) **(required)**: Token ticker
- `txid` (path, string) **(required)**: Transaction ID
- `type` (query, string) **(required)**: Filter by history type; enum: `inscribe-deploy`, `inscribe-mint`, `inscribe-transfer`, `transfer`, `send`, `receive`
- `start` (query, integer) **(required)**: Start offset
- `limit` (query, integer) **(required)**: Number of inscriptions returned

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `detail` (array):
    - `valid` (boolean):
    - `type` (string):
    - `from` (string):
    - `to` (string):
    - `amount` (string):
    - `overallBalance` (string):
    - `availableBalance` (string):
    - `transferBalance` (string):
    - `inscriptionId` (string):
    - `inscriptionNumber` (integer):
    - `height` (integer):
    - `blockhash` (string):
    - `blocktime` (integer):
    - `txIdx` (integer):
    - `txid` (string):
    - `satoshi` (integer):
    - `offset` (integer):
  - `start` (integer):
  - `total` (integer):

#### Response (401)
Invalid API Key


---

### Get BRC-20 history by block height.
<a id="get-brc-20-history-by-block-height"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20/history-by-height/{height}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20HistoryByHeight)  

#### Description
Get BRC-20 history by block height.

#### Parameters
- `height` (path, integer) **(required)**: Block Height
- `start` (query, integer) **(required)**: Start offset
- `limit` (query, integer) **(required)**: Number of inscriptions returned

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `height` (number):
  - `total` (integer):
  - `start` (integer):
  - `detail` (array):
    - `valid` (boolean):
    - `type` (string):
    - `from` (string):
    - `to` (string):
    - `amount` (string):
    - `overallBalance` (string):
    - `availableBalance` (string):
    - `transferBalance` (string):
    - `inscriptionId` (string):
    - `inscriptionNumber` (integer):
    - `height` (integer):
    - `blockhash` (string):
    - `blocktime` (integer):
    - `txIdx` (integer):
    - `txid` (string):
    - `satoshi` (integer):
    - `offset` (integer):

#### Response (401)
Invalid API Key


---

### Get the BRC20 token summary by address.
<a id="get-the-brc20-token-summary-by-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/brc20/summary`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20SummaryByAddress)  

#### Description
Obtain BRC20 token summary by address, including available balance, transferable balance

#### Parameters
- `address` (path, string) **(required)**: Address
- `start` (query, integer) **(required)**: Start offset
- `limit` (query, integer) **(required)**: Number of inscriptions returned
- `tick_filter` (query, string): -&gt; filter by tick type 8 - Returns only 4-character BRC20 tokens 16 - Returns only 5-character BRC20 tokens 32 - Returns only 6-character BRC20 tokens 24 - Returns 4 and 5-character BRC20 tokens (bitwise combination 8 | 16) 56 - Returns 4, 5, and 6-character BRC20 tokens (bitwise combination 8 | 16 | 32); enum: `8`, `16`, `24`, `32`, `56`
- `exclude_zero` (query, boolean): Exclude zero balance

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `height` (integer):
  - `start` (integer):
  - `total` (integer):
  - `detail` (array):
    - `ticker` (string):
    - `overallBalance` (string):
    - `transferableBalance` (string):
    - `availableBalance` (string):

#### Response (401)
Invalid API Key

### Notes

Each ticker includes two types of balances:

- transferableBalance: The balance already inscribed as TRANSFER inscriptions
- availableBalance: The balance can be inscribed as TRANSFER inscriptions
- overallBalance = transferableBalance+availableBalance


---

### Get the BRC20 token summary by address and height.
<a id="get-the-brc20-token-summary-by-address-and-height"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/brc20/summary-by-height/{height}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20SummaryByAddressAndHeight)  

#### Description
Obtain BRC20 token summary by address, including available balance, transferable balance

#### Parameters
- `address` (path, string) **(required)**: Address
- `height` (path, string) **(required)**: Block Height
- `start` (query, integer) **(required)**: Start offset
- `limit` (query, integer) **(required)**: Number of inscriptions returned

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `height` (integer):
  - `start` (integer):
  - `total` (integer):
  - `detail` (array):
    - `ticker` (string):
    - `overallBalance` (string):
    - `transferableBalance` (string):
    - `availableBalance` (string):

#### Response (401)
Invalid API Key


---

### Get the BRC20 token info by address and ticker.
<a id="get-the-brc20-token-info-by-address-and-ticker"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/brc20/{ticker}/info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20InfoByAddressAndTicker)  

#### Description
Obtain BRC-20 token information by address, including available balance, transferable balance, number of transferable inscriptions, the first few Inscriptions, etc.

#### Parameters
- `address` (path, string) **(required)**: Address
- `ticker` (path, string) **(required)**: Token ticker

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `ticker` (string):
  - `overallBalance` (string):
  - `availableBalance` (string):
  - `availableBalanceSafe` (string):
  - `availableBalanceUnSafe` (string):
  - `transferableBalance` (string):
  - `historyCount` (integer):
  - `historyInscriptions` (array):
    - `confirmations` (integer):
    - `data` (object):
      - `amt` (string):
      - `decimal` (string):
      - `lim` (string):
      - `max` (string):
      - `minted` (string):
      - `op` (string):
      - `tick` (string):
      - `to` (string):
    - `inscriptionId` (string):
    - `inscriptionNumber` (integer):
  - `transferableCount` (integer):
  - `transferableInscriptions` (array):
    - `confirmations` (integer):
    - `data` (object):
      - `amt` (string):
      - `decimal` (string):
      - `lim` (string):
      - `max` (string):
      - `minted` (string):
      - `op` (string):
      - `tick` (string):
      - `to` (string):
    - `inscriptionId` (string):
    - `inscriptionNumber` (integer):

#### Response (401)
Invalid API Key


---

### Get the full history of BRC-20 by address.
<a id="get-the-full-history-of-brc-20-by-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/brc20/history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20HistoryByAddress)  

#### Description
Get the full history of BRC-20 by address.

#### Parameters
- `address` (path, string) **(required)**: Address
- `start` (query, integer) **(required)**: Start offset
- `limit` (query, integer) **(required)**: Number of inscriptions returned

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `detail` (array):
    - `valid` (boolean):
    - `type` (string):
    - `from` (string):
    - `to` (string):
    - `amount` (string):
    - `overallBalance` (string):
    - `availableBalance` (string):
    - `transferBalance` (string):
    - `inscriptionId` (string):
    - `inscriptionNumber` (integer):
    - `height` (integer):
    - `blockhash` (string):
    - `blocktime` (integer):
    - `txIdx` (integer):
    - `txid` (string):
    - `satoshi` (integer):
    - `offset` (integer):
  - `start` (integer):
  - `total` (integer):

#### Response (401)
Invalid API Key


---

### Get the full history of BRC-20 by address and ticker.
<a id="get-the-full-history-of-brc-20-by-address-and-ticker"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/brc20/{ticker}/history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20HistoryByAddressAndTicker)  

#### Description
Get the full history of BRC-20 by address and ticker.

#### Parameters
- `address` (path, string) **(required)**: Address
- `ticker` (path, string) **(required)**: Token ticker
- `type` (query, string) **(required)**: Filter by history type; enum: `inscribe-deploy`, `inscribe-mint`, `inscribe-transfer`, `transfer`, `send`, `receive`
- `start` (query, integer) **(required)**: Start offset
- `limit` (query, integer) **(required)**: Number of inscriptions returned

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `detail` (array):
    - `valid` (boolean):
    - `type` (string):
    - `from` (string):
    - `to` (string):
    - `amount` (string):
    - `overallBalance` (string):
    - `availableBalance` (string):
    - `transferBalance` (string):
    - `inscriptionId` (string):
    - `inscriptionNumber` (integer):
    - `height` (integer):
    - `blockhash` (string):
    - `blocktime` (integer):
    - `txIdx` (integer):
    - `txid` (string):
    - `satoshi` (integer):
    - `offset` (integer):
  - `start` (integer):
  - `total` (integer):

#### Response (401)
Invalid API Key


---

### Get the transferable inscriptions list of BRC20 by address.
<a id="get-the-transferable-inscriptions-list-of-brc20-by-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/brc20/{ticker}/transferable-inscriptions`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20TransferableInscriptionsByAddressAndTicker)  

#### Description
Get the transferable inscriptions list of BRC20 by address.

#### Parameters
- `address` (path, string) **(required)**: Address
- `ticker` (path, string) **(required)**: Token ticker
- `start` (query, integer) **(required)**: Start offset
- `limit` (query, integer) **(required)**: Number of inscriptions returned

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `detail` (object):
    - `inscriptionNumber` (integer):
    - `inscriptionId` (string):
    - `satoshi` (integer):
    - `confirmations` (integer):
    - `data` (object):
      - `op` (string):
      - `tick` (string):
      - `lim` (string):
      - `amt` (string):
      - `decimal` (string):
  - `start` (integer):
  - `total` (integer):

#### Response (401)
Invalid API Key


---

### Get the history of BRC20 Module by address.
<a id="get-the-history-of-brc20-module-by-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20-module/{module}/history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20ModuleHistoryByAddress)  

#### Description
Get the history of BRC20 Module.

#### Parameters
- `module` (path, string) **(required)**: Address
- `start` (query, integer) **(required)**: Start height
- `end` (query, integer) **(required)**: End height
- `cursor` (query, integer) **(required)**: Start Offset
- `size` (query, integer) **(required)**: Number of events returned

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `detail` (array):
    - `type` (string):
    - `valid` (boolean):
    - `txid` (string):
    - `idx` (number):
    - `vout` (number):
    - `offset` (integer):
    - `inscriptionNumber` (integer):
    - `inscriptionId` (string):
    - `contentType` (string):
    - `contentBody` (string):
    - `oldSatPoint` (string):
    - `newSatPoint` (string):
    - `from` (string):
    - `to` (string):
    - `satoshi` (integer):
    - `data` (object):
      - `tick` (string):
      - `amount` (string):
    - `height` (integer):
    - `txidx` (integer):
    - `blockhash` (string):
    - `blocktime` (integer):
  - `start` (integer):
  - `total` (integer):

#### Response (401)
Invalid API Key


---

### Get the withdraw history of BRC20.
<a id="get-the-withdraw-history-of-brc20"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20-module/withdraw-history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC-20/getBrc20WithdrawHistory)  

#### Description
Get the withdraw history of BRC20.

#### Parameters
- `start` (query, integer) **(required)**: Start height
- `end` (query, integer) **(required)**: End height
- `cursor` (query, integer) **(required)**: Start Offset
- `size` (query, integer) **(required)**: Number of events returned

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `detail` (array):
    - `type` (string):
    - `valid` (boolean):
    - `txid` (string):
    - `idx` (number):
    - `vout` (number):
    - `offset` (integer):
    - `inscriptionNumber` (integer):
    - `inscriptionId` (string):
    - `contentType` (string):
    - `contentBody` (string):
    - `oldSatPoint` (string):
    - `newSatPoint` (string):
    - `from` (string):
    - `to` (string):
    - `satoshi` (integer):
    - `data` (object):
      - `tick` (string):
      - `amount` (string):
    - `height` (integer):
    - `txidx` (integer):
    - `blockhash` (string):
    - `blocktime` (integer):
  - `start` (integer):
  - `total` (integer):

#### Response (401)
Invalid API Key


---

