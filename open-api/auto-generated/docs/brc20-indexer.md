# BRC-20 API

BRC-20 API is a RESTful API for classic BRC-20 token data indexing and querying. It provides endpoints to retrieve information about classic BRC-20 tokens, including their status, holders, history, and more. Use these endpoints for classic BRC-20 tickers such as ordi. Do not use these endpoints for BRC20-Prog 6-character tickers; use /v1/indexer/brc20-prog/* endpoints for BRC20-Prog data.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [GET `/v1/indexer/brc20/bestheight`](#get-classic-brc-20-indexer-height-and-ticker-total) | Get Classic BRC-20 indexer height and ticker total |
| [GET `/v1/indexer/brc20/list`](#list-indexed-classic-brc-20-tickers) | List indexed Classic BRC-20 tickers |
| [GET `/v1/indexer/brc20/status`](#search-classic-brc-20-ticker-status-and-mint-progress) | Search Classic BRC-20 ticker status and mint progress |
| [GET `/v1/indexer/brc20/(ticker)/info`](#get-classic-brc-20-ticker-deployment-and-supply-info) | Get Classic BRC-20 ticker deployment and supply info |
| [GET `/v1/indexer/brc20/(ticker)/holders`](#list-classic-brc-20-holders-and-balances-for-a-ticker) | List Classic BRC-20 holders and balances for a ticker |
| [GET `/v1/indexer/brc20/(ticker)/history`](#list-classic-brc-20-history-events-for-a-ticker) | List Classic BRC-20 history events for a ticker |
| [GET `/v1/indexer/brc20/(ticker)/tx/(txid)/history`](#get-classic-brc-20-ticker-events-in-a-transaction) | Get Classic BRC-20 ticker events in a transaction |
| [GET `/v1/indexer/brc20/history-by-height/(height)`](#list-classic-brc-20-events-indexed-at-a-block-height) | List Classic BRC-20 events indexed at a block height |
| [GET `/v1/indexer/address/(address)/brc20/summary`](#list-an-addresss-classic-brc-20-token-balances) | List an address's Classic BRC-20 token balances |
| [GET `/v1/indexer/address/(address)/brc20/summary-by-height/(height)`](#list-an-addresss-classic-brc-20-balances-at-a-height) | List an address's Classic BRC-20 balances at a height |
| [GET `/v1/indexer/address/(address)/brc20/(ticker)/info`](#get-an-addresss-classic-brc-20-balance-details-for-a-ticker) | Get an address's Classic BRC-20 balance details for a ticker |
| [GET `/v1/indexer/address/(address)/brc20/history`](#list-all-classic-brc-20-history-events-for-an-address) | List all Classic BRC-20 history events for an address |
| [GET `/v1/indexer/address/(address)/brc20/(ticker)/history`](#list-an-addresss-classic-brc-20-history-for-a-ticker) | List an address's Classic BRC-20 history for a ticker |
| [GET `/v1/indexer/address/(address)/brc20/(ticker)/transferable-inscriptions`](#list-transferable-classic-brc-20-inscriptions-for-an-address) | List transferable Classic BRC-20 inscriptions for an address |
| [GET `/v1/indexer/brc20-module/(module)/history`](#list-classic-brc-20-module-history-for-a-module-inscription) | List Classic BRC-20 module history for a module inscription |
| [GET `/v1/indexer/brc20-module/withdraw-history`](#list-classic-brc-20-module-withdrawal-history) | List Classic BRC-20 module withdrawal history |

---

## BRC20 Indexer

### Get Classic BRC-20 indexer height and ticker total
<a id="get-classic-brc-20-indexer-height-and-ticker-total"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20/bestheight`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20 Indexer/getBrc20BestHeight)  

#### Description
Returns the latest indexed block height, block hash, block timestamp, and total Classic BRC-20 ticker count. Use it to check indexer freshness before reading token status, holders, history, or address balances; data may lag the chain tip and should not be used for BRC20-Prog 6-character tickers.

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

### List indexed Classic BRC-20 tickers
<a id="list-indexed-classic-brc-20-tickers"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20/list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20 Indexer/getBrc20TickerList)  

#### Description
Returns a paginated ticker list with total count and start offset for Classic BRC-20 discovery. Use these tickers with the Classic BRC-20 info, holder, history, and address-balance endpoints; route BRC20-Prog 6-character tickers to the brc20-prog API instead.

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

### Search Classic BRC-20 ticker status and mint progress
<a id="search-classic-brc-20-ticker-status-and-mint-progress"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20/status`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20 Indexer/getBrc20Status)  

#### Description
Returns indexed Classic BRC-20 ticker status records including deployment metadata, minted supply, holder and history counts, and completion state. Use sort and completion filters for token discovery or ranking; balances are indexer-derived and may change as new blocks are processed.

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

### Get Classic BRC-20 ticker deployment and supply info
<a id="get-classic-brc-20-ticker-deployment-and-supply-info"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20/{ticker}/info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20 Indexer/getBrc20InfoByTicker)  

#### Description
Returns deployment inscription, creator, max supply, mint limit, decimals, minted amounts, holder count, and related history counts for one Classic BRC-20 ticker. Use this before showing token detail pages or validating ticker-level context; 6-character BRC20-Prog tickers are intentionally out of scope.

#### Parameters
- `ticker` (path, string) **(required)**: Classic BRC-20 ticker, such as ordi. Use brc20-prog endpoints for 6-character BRC20-Prog tickers.

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

### List Classic BRC-20 holders and balances for a ticker
<a id="list-classic-brc-20-holders-and-balances-for-a-ticker"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20/{ticker}/holders`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20 Indexer/getBrc20HoldersByTicker)  

#### Description
Returns holder addresses with overall, transferable, and available balances for the selected Classic BRC-20 ticker. Use it for holder distribution views or balance audits; values are indexed token balances and do not authorize transfers or create inscriptions.

#### Parameters
- `ticker` (path, string) **(required)**: Classic BRC-20 ticker, such as ordi. Use brc20-prog endpoints for 6-character BRC20-Prog tickers.
- `start` (query, integer) **(required)**: Start offset
- `limit` (query, integer) **(required)**: Number of returned

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

### List Classic BRC-20 history events for a ticker
<a id="list-classic-brc-20-history-events-for-a-ticker"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20/{ticker}/history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20 Indexer/getBrc20HistoryByTicker)  

#### Description
Returns deploy, mint, transfer-inscription, send, and receive events with inscription, transaction, balance, height, and validity fields. Use it for token activity feeds or reconciliation at a height; invalid or unconfirmed protocol actions should be interpreted according to the returned validity and indexer state.

#### Parameters
- `ticker` (path, string) **(required)**: Classic BRC-20 ticker, such as ordi. Use brc20-prog endpoints for 6-character BRC20-Prog tickers.
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

### Get Classic BRC-20 ticker events in a transaction
<a id="get-classic-brc-20-ticker-events-in-a-transaction"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20/{ticker}/tx/{txid}/history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20 Indexer/getBrc20HistoryByTickerAndTxid)  

#### Description
Returns ticker-specific history events found in a transaction, including event type, inscription id, amount, counterparties, balances, and validity. Use it to explain how a transaction affected a Classic BRC-20 ticker; always treat returned balances as indexed results rather than spend authorization.

#### Parameters
- `ticker` (path, string) **(required)**: Classic BRC-20 ticker, such as ordi. Use brc20-prog endpoints for 6-character BRC20-Prog tickers.
- `txid` (path, string) **(required)**: txid
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

### List Classic BRC-20 events indexed at a block height
<a id="list-classic-brc-20-events-indexed-at-a-block-height"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20/history-by-height/{height}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20 Indexer/getBrc20HistoryByHeight)  

#### Description
Returns paginated Classic BRC-20 history events for a specific block height with ticker, transaction, inscription, amount, and validity details. Use it for block-level indexing audits or backfills; results represent the indexer's view of confirmed protocol events at that height.

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

### List an address's Classic BRC-20 token balances
<a id="list-an-addresss-classic-brc-20-token-balances"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/brc20/summary`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20 Indexer/getBrc20SummaryByAddress)  

#### Description
Returns paginated Classic BRC-20 balance summaries for an address, including ticker, indexed height, total count, overall balance, transferable balance, and available balance. Use tick_filter to separate 4-, 5-, or 6-character Classic BRC-20 namespaces when needed; use brc20-prog endpoints for BRC20-Prog semantics.

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

### List an address's Classic BRC-20 balances at a height
<a id="list-an-addresss-classic-brc-20-balances-at-a-height"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/brc20/summary-by-height/{height}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20 Indexer/getBrc20SummaryByAddressAndHeight)  

#### Description
Returns the address's indexed Classic BRC-20 balance summaries as of a specific block height, including ticker, overall, transferable, and available balances. Use it for historical portfolio snapshots or reconciliation; balances are read-only indexer state and may differ from current spendability.

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

### Get an address's Classic BRC-20 balance details for a ticker
<a id="get-an-addresss-classic-brc-20-balance-details-for-a-ticker"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/brc20/{ticker}/info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20 Indexer/getBrc20InfoByAddressAndTicker)  

#### Description
Returns one address's overall, available, safe, unsafe, and transferable balances for a Classic BRC-20 ticker, plus related transfer inscriptions and history counts. Use it before building transfer flows or balance displays; this endpoint only reports indexed state and does not guarantee UTXO spend safety.

#### Parameters
- `address` (path, string) **(required)**: Address
- `ticker` (path, string) **(required)**: Classic BRC-20 ticker, such as ordi. Use brc20-prog endpoints for 6-character BRC20-Prog tickers.

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

### List all Classic BRC-20 history events for an address
<a id="list-all-classic-brc-20-history-events-for-an-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/brc20/history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20 Indexer/getBrc20HistoryByAddress)  

#### Description
Returns paginated Classic BRC-20 events involving an address across tickers, including event type, amount, counterparties, transaction, inscription, and balance fields. Use it for wallet activity timelines and audits; events are indexer-derived and should be checked for validity before user-facing accounting.

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

### List an address's Classic BRC-20 history for a ticker
<a id="list-an-addresss-classic-brc-20-history-for-a-ticker"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/brc20/{ticker}/history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20 Indexer/getBrc20HistoryByAddressAndTicker)  

#### Description
Returns ticker-specific Classic BRC-20 events for an address with event type, transaction, inscription, amount, balance, height, and validity fields. Use it to explain wallet balance changes for one ticker; read the validity flag and confirmation context before treating events as final.

#### Parameters
- `address` (path, string) **(required)**: Address
- `ticker` (path, string) **(required)**: Classic BRC-20 ticker, such as ordi. Use brc20-prog endpoints for 6-character BRC20-Prog tickers.
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

### List transferable Classic BRC-20 inscriptions for an address
<a id="list-transferable-classic-brc-20-inscriptions-for-an-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/brc20/{ticker}/transferable-inscriptions`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20 Indexer/getBrc20TransferableInscriptionsByAddressAndTicker)  

#### Description
Returns unused transferable inscriptions for a Classic BRC-20 ticker with inscription id, inscription number, satoshi value, confirmations, and transfer amount payload. Use it to select candidate transfer inscriptions; callers must still validate UTXO ownership, confirmation policy, and signing context before spending.

#### Parameters
- `address` (path, string) **(required)**: Address
- `ticker` (path, string) **(required)**: Classic BRC-20 ticker, such as ordi. Use brc20-prog endpoints for 6-character BRC20-Prog tickers.
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

### List Classic BRC-20 module history for a module inscription
<a id="list-classic-brc-20-module-history-for-a-module-inscription"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20-module/{module}/history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20 Indexer/getBrc20ModuleHistoryByAddress)  

#### Description
Returns module-related Classic BRC-20 events across a height range, including inscription, satpoint, address, amount, validity, and block metadata. Use it to inspect module deposit or movement workflows; this is an indexer audit view and does not submit withdrawals or transfers.

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

### List Classic BRC-20 module withdrawal history
<a id="list-classic-brc-20-module-withdrawal-history"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20-module/withdraw-history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20 Indexer/getBrc20WithdrawHistory)  

#### Description
Returns withdrawal-related module events within a height range, including inscription, satpoint, address, token amount, transaction, validity, and block metadata. Use it for module withdrawal monitoring and reconciliation; this endpoint is read-only and never creates, signs, or broadcasts withdrawals.

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

