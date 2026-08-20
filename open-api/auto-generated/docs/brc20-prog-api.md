# BRC20 Prog API

BRC20 Prog API provides comprehensive BRC20-Prog token data query services, including token information, holder data, historical records, and more. BRC20-Prog interfaces are Bitcoin-only and are intended for 6-character BRC20-Prog tickers. Classic BRC-20 tickers such as ordi should use the /v1/indexer/brc20/* interfaces instead. The system uses global memory caching technology to quickly respond to various query requests and supports efficient filtering queries based on indexes.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [GET `/v1/indexer/brc20-prog/bestheight`](#get-brc20-prog-indexer-height-for-bitcoin) | Get BRC20-Prog indexer height for Bitcoin |
| [GET `/v1/indexer/brc20-prog/list`](#list-indexed-6-character-brc20-prog-tickers) | List indexed 6-character BRC20-Prog tickers |
| [GET `/v1/indexer/brc20-prog/status`](#search-brc20-prog-ticker-status-and-mint-state) | Search BRC20-Prog ticker status and mint state |
| [GET `/v1/indexer/brc20-prog/(ticker)/info`](#get-brc20-prog-ticker-deployment-and-supply-details) | Get BRC20-Prog ticker deployment and supply details |
| [GET `/v1/indexer/brc20-prog/history-by-height/(height)`](#list-brc20-prog-events-indexed-at-a-bitcoin-height) | List BRC20-Prog events indexed at a Bitcoin height |
| [GET `/v1/indexer/brc20-prog/(ticker)/holders`](#list-holders-and-balances-for-a-brc20-prog-ticker) | List holders and balances for a BRC20-Prog ticker |
| [GET `/v1/indexer/brc20-prog/(ticker)/history`](#list-brc20-prog-history-events-for-a-ticker) | List BRC20-Prog history events for a ticker |
| [GET `/v1/indexer/address/(address)/brc20-prog/summary`](#list-an-addresss-brc20-prog-token-balances) | List an address's BRC20-Prog token balances |
| [GET `/v1/indexer/address/(address)/brc20-prog/ticker/(ticker)/balance`](#get-an-addresss-current-brc20-prog-ticker-balance) | Get an address's current BRC20-Prog ticker balance |
| [GET `/v1/indexer/address/(address)/brc20-prog/ticker/(ticker)/balance-by-height/(height)`](#get-an-addresss-brc20-prog-ticker-balance-at-a-height) | Get an address's BRC20-Prog ticker balance at a height |
| [GET `/v1/indexer/address/(address)/brc20-prog/ticker/(ticker)/transferable-inscriptions`](#list-transferable-brc20-prog-inscriptions-for-an-address) | List transferable BRC20-Prog inscriptions for an address |

---

## BRC20-Prog Indexer

### Get BRC20-Prog indexer height for Bitcoin
<a id="get-brc20-prog-indexer-height-for-bitcoin"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20-prog/bestheight`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20-Prog Indexer/getBestHeight)  

#### Description
Returns the latest Bitcoin block height, block hash, and timestamp indexed for BRC20-Prog. Use it to check indexer freshness before querying 6-character BRC20-Prog tickers; this API is Bitcoin-only and should not be used for Classic BRC-20 tokens.

#### Response (200)
Successful response

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `height` (integer): example: `800000`
  - `blockid` (string): example: `"0000000000000000000000000000000000000000000000000000000000000000"`
  - `timestamp` (integer): example: `1703123456`


---

### List indexed 6-character BRC20-Prog tickers
<a id="list-indexed-6-character-brc20-prog-tickers"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20-prog/list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20-Prog Indexer/getTickerList)  

#### Description
Returns paginated BRC20-Prog ticker symbols with indexed height, total, and start offset. Use this for Bitcoin-only BRC20-Prog discovery and route Classic BRC-20 tickers such as ordi to the /v1/indexer/brc20/* APIs.

#### Parameters
- `start` (query, integer): Start offset, default 0; default: `0`
- `limit` (query, integer): Number of items returned, default 20, max 500; default: `20`

#### Response (200)
Successful response

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `height` (integer): example: `800000`
  - `total` (integer): example: `100`
  - `start` (integer): example: `0`
  - `detail` (array): example: `["abc123","def456","ghi789"]`


---

### Search BRC20-Prog ticker status and mint state
<a id="search-brc20-prog-ticker-status-and-mint-state"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20-prog/status`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20-Prog Indexer/getTickerStatus)  

#### Description
Returns BRC20-Prog status records including deployment inscription, max supply, minted supply, holder and transaction counts, decimals, and mint completion state. Use it for 6-character ticker discovery, filtering, and ranking on Bitcoin; indexer data may lag new block confirmations.

#### Parameters
- `ticker` (query, string): Filter by 6-character BRC20-Prog ticker name. Do not use classic BRC-20 tickers such as ordi here.
- `complete` (query, string): Filter by mint status; enum: `yes`, `no`, `all`
- `sort` (query, string): Sort field; enum: `holders`, `deploy`, `transactions`
- `start` (query, integer): Start offset, default 0; default: `0`
- `limit` (query, integer): Number of items returned, default 20; default: `20`

#### Response (200)
Successful response

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `height` (integer): example: `800000`
  - `total` (integer): example: `1`
  - `start` (integer): example: `0`
  - `detail` (array):
    - `ticker` (string): example: `"abc123"`
    - `selfMint` (boolean): example: `false`
    - `holdersCount` (integer): example: `15000`
    - `historyCount` (integer): example: `50000`
    - `inscriptionNumber` (integer (int64)): example: `123456`
    - `inscriptionId` (string): example: `"1234567890abcdef"`
    - `max` (string): example: `"21000000"`
    - `limit` (string): example: `"1000"`
    - `minted` (string): example: `"21000000"`
    - `totalMinted` (string): example: `"21000000"`
    - `confirmedMinted` (string): example: `"21000000"`
    - `confirmedMinted1h` (string): example: `"1000"`
    - `confirmedMinted6h` (string): example: `"5000"`
    - `confirmedMinted24h` (string): example: `"20000"`
    - `mintTimes` (integer (uint32)): example: `21000`
    - `decimal` (integer (uint8)): example: `8`
    - `creator` (string): example: `"bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"`
    - `txid` (string): example: `"1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"`
    - `deployHeight` (integer (uint32)): example: `767430`


---

### Get BRC20-Prog ticker deployment and supply details
<a id="get-brc20-prog-ticker-deployment-and-supply-details"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20-prog/{ticker}/info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20-Prog Indexer/getTickerInfo)  

#### Description
Returns Bitcoin-only BRC20-Prog ticker metadata such as original tick, max supply, remaining supply, burned supply, decimals, deploy inscription, creator address, and mint counters. Use it for 6-character BRC20-Prog detail pages; Classic BRC-20 tickers are not supported here.

#### Parameters
- `ticker` (path, string) **(required)**: 6-character BRC20-Prog ticker. Classic BRC-20 tickers such as ordi are not supported by brc20-prog endpoints.

#### Response (200)
Successful response

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `id` (integer (int64)): example: `1`
  - `originalTick` (string): example: `"abc123"`
  - `tick` (string): example: `"abc123"`
  - `maxSupply` (string): example: `"21000000"`
  - `decimals` (integer): example: `8`
  - `limitPerMint` (string): example: `"1000"`
  - `remainingSupply` (string): example: `"0"`
  - `burnedSupply` (string): example: `"0"`
  - `isSelfMint` (boolean): example: `false`
  - `deployInscriptionId` (string): example: `"1234567890abcdef"`
  - `blockHeight` (integer): Block height; example: `767430`
  - `inscriptionNumber` (integer (int64)): example: `123456`
  - `mintTimes` (integer (uint32)): example: `21000`
  - `mintedSupply` (string): example: `"21000000"`
  - `txid` (string): example: `"1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"`
  - `creatorAddress` (string): example: `"bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"`


---

### List BRC20-Prog events indexed at a Bitcoin height
<a id="list-brc20-prog-events-indexed-at-a-bitcoin-height"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20-prog/history-by-height/{height}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20-Prog Indexer/getTickerHistoryByHeight)  

#### Description
Returns BRC20-Prog history events for one block height with ticker, transaction, event type, inscription, amount, balance, and validity data. Use it for Bitcoin block-level audits or backfills; data is read-only indexer state and may depend on confirmation progress.

#### Parameters
- `height` (path, integer) **(required)**: Block height
- `start` (query, integer): Start offset, default 0; default: `0`
- `limit` (query, integer): Number of items returned, default 20; default: `20`

#### Response (200)
Successful response

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (array):
  - `id` (integer (int64)): example: `1`
  - `ticker` (string): example: `"abc123"`
  - `type` (string): enum: `inscribe-deploy`, `inscribe-mint`, `inscribe-transfer`, `transfer`, `send`, `receive`; example: `"inscribe-deploy"`
  - `txid` (string): example: `"1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"`
  - `vout` (integer (uint32)): example: `0`
  - `offset` (integer (uint64)): example: `0`
  - `inscriptionNumber` (integer (int64)): example: `123456`
  - `inscriptionId` (string): example: `"1234567890abcdef"`
  - `from` (string): example: `"bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"`
  - `to` (string): example: `"bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"`
  - `amount` (string): example: `"21000000"`
  - `height` (integer (uint32)): Block height; example: `800000`
  - `event` (object):
    - `tick` (string): example: `"abc123"`
    - `original_tick` (string): example: `"abc123"`
    - `minted_pkScript` (string): example: `"001234567890abcdef"`
    - `minted_wallet` (string): example: `"bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"`
    - `amount` (string): example: `"1000"`
    - `parent_id` (string): example: `"1234567890abcdef"`
    - `deployer_pkScript` (string): example: `"001234567890abcdef"`
    - `deployer_wallet` (string): example: `"bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"`
    - `max_supply` (string): example: `"21000000"`
    - `limit_per_mint` (string): example: `"1000"`
    - `is_self_mint` (string): example: `"false"`
    - `predeployer_pkScript` (string): example: `"001234567890abcdef"`
    - `predeployer_wallet` (string): example: `"bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"`
    - `hash` (string): example: `"1234567890abcdef"`
    - `source_pkScript` (string): example: `"001234567890abcdef"`
    - `source_wallet` (string): example: `"bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"`
    - `spent_pkScript` (string): example: `"001234567890abcdef"`
    - `spent_wallet` (string): example: `"bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"`
    - `data` (string): example: `"data"`
    - `base64_data` (string): example: `"ZGF0YQ=="`
    - `contract_address` (string): example: `"0x1234567890abcdef"`
    - `contract_inscription_id` (string): example: `"1234567890abcdef"`
    - `byte_len` (integer): example: `4`
    - `using_tx_id` (string): example: `"1234567890abcdef"`
  - `decimal` (integer): example: `8`
  - `overallBalance` (string): example: `"21000000"`
  - `transferBalance` (string): example: `"0"`
  - `availableBalance` (string): example: `"0"`
  - `valid` (boolean): example: `true`


---

### List holders and balances for a BRC20-Prog ticker
<a id="list-holders-and-balances-for-a-brc20-prog-ticker"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20-prog/{ticker}/holders`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20-Prog Indexer/getTickerHolders)  

#### Description
Returns holder addresses with overall, transferable, and available balances for a 6-character BRC20-Prog ticker. Use it for holder distribution and balance checks on Bitcoin; it reports indexed balances only and performs no signing or transfer action.

#### Parameters
- `ticker` (path, string) **(required)**: 6-character BRC20-Prog ticker. Classic BRC-20 tickers such as ordi are not supported by brc20-prog endpoints.
- `start` (query, integer): Start offset, default 0; default: `0`
- `limit` (query, integer): Number of items returned, default 20; default: `20`

#### Response (200)
Successful response

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `height` (integer): example: `800000`
  - `total` (integer): example: `15000`
  - `start` (integer): example: `0`
  - `detail` (array):
    - `address` (string): example: `"bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"`
    - `overallBalance` (string): example: `"1000"`
    - `transferableBalance` (string): example: `"500"`
    - `availableBalance` (string): example: `"500"`


---

### List BRC20-Prog history events for a ticker
<a id="list-brc20-prog-history-events-for-a-ticker"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20-prog/{ticker}/history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20-Prog Indexer/getTickerHistory)  

#### Description
Returns deploy, mint, transfer, and BRC20-Prog withdrawal events for a 6-character ticker, including event type, block height, transaction, inscription, amount, balance, and validity fields. Use it for token activity feeds or reconciliation; this is read-only Bitcoin indexer data.

#### Parameters
- `ticker` (path, string) **(required)**: 6-character BRC20-Prog ticker. Classic BRC-20 tickers such as ordi are not supported by brc20-prog endpoints.
- `type` (query, string): Filter by event type; enum: `deploy-inscribe`, `transfer`, `inscribe-mint`, `inscribe-transfer`, `brc20prog-withdraw-inscribe`, `brc20prog-withdraw-transfer`
- `height` (query, integer): Filter by block height
- `start` (query, integer): Start offset, default 0; default: `0`
- `limit` (query, integer): Number of items returned, default 20; default: `20`

#### Response (200)
Successful response

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `height` (integer): example: `800000`
  - `total` (integer): example: `50000`
  - `start` (integer): example: `0`
  - `detail` (array):
    - `id` (integer (int64)): example: `1`
    - `ticker` (string): example: `"abc123"`
    - `type` (string): enum: `inscribe-deploy`, `inscribe-mint`, `inscribe-transfer`, `transfer`, `send`, `receive`; example: `"inscribe-deploy"`
    - `txid` (string): example: `"1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"`
    - `vout` (integer (uint32)): example: `0`
    - `offset` (integer (uint64)): example: `0`
    - `inscriptionNumber` (integer (int64)): example: `123456`
    - `inscriptionId` (string): example: `"1234567890abcdef"`
    - `from` (string): example: `"bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"`
    - `to` (string): example: `"bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"`
    - `amount` (string): example: `"21000000"`
    - `height` (integer (uint32)): Block height; example: `800000`
    - `event` (object):
      - `tick` (string): example: `"abc123"`
      - `original_tick` (string): example: `"abc123"`
      - `minted_pkScript` (string): example: `"001234567890abcdef"`
      - `minted_wallet` (string): example: `"bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"`
      - `amount` (string): example: `"1000"`
      - `parent_id` (string): example: `"1234567890abcdef"`
      - `deployer_pkScript` (string): example: `"001234567890abcdef"`
      - `deployer_wallet` (string): example: `"bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"`
      - `max_supply` (string): example: `"21000000"`
      - `limit_per_mint` (string): example: `"1000"`
      - `is_self_mint` (string): example: `"false"`
      - `predeployer_pkScript` (string): example: `"001234567890abcdef"`
      - `predeployer_wallet` (string): example: `"bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"`
      - `hash` (string): example: `"1234567890abcdef"`
      - `source_pkScript` (string): example: `"001234567890abcdef"`
      - `source_wallet` (string): example: `"bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"`
      - `spent_pkScript` (string): example: `"001234567890abcdef"`
      - `spent_wallet` (string): example: `"bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"`
      - `data` (string): example: `"data"`
      - `base64_data` (string): example: `"ZGF0YQ=="`
      - `contract_address` (string): example: `"0x1234567890abcdef"`
      - `contract_inscription_id` (string): example: `"1234567890abcdef"`
      - `byte_len` (integer): example: `4`
      - `using_tx_id` (string): example: `"1234567890abcdef"`
    - `decimal` (integer): example: `8`
    - `overallBalance` (string): example: `"21000000"`
    - `transferBalance` (string): example: `"0"`
    - `availableBalance` (string): example: `"0"`
    - `valid` (boolean): example: `true`


---

### List an address's BRC20-Prog token balances
<a id="list-an-addresss-brc20-prog-token-balances"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/brc20-prog/summary`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20-Prog Indexer/getAddressTokenSummary)  

#### Description
Returns paginated BRC20-Prog balance summaries for a Bitcoin address, including indexed height, module height, ticker, decimals, overall, transferable, available, and module balances. Use it for Bitcoin-only wallet portfolio views; Classic BRC-20 balances require the brc20 indexer API.

#### Parameters
- `address` (path, string) **(required)**: Bitcoin address
- `ticker` (query, string): Filter by 6-character BRC20-Prog ticker name. Do not use classic BRC-20 tickers such as ordi here.
- `start` (query, integer): Start offset, default 0; default: `0`
- `limit` (query, integer): Number of items returned, default 20; default: `20`

#### Response (200)
Successful response

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `height` (integer): example: `800000`
  - `moduleHeight` (integer (int64)): example: `800000`
  - `total` (integer): example: `5`
  - `start` (integer): example: `0`
  - `detail` (array):
    - `ticker` (string): example: `"abc123"`
    - `selfMint` (boolean): example: `false`
    - `decimal` (integer): example: `8`
    - `overallBalance` (string): example: `"1000"`
    - `transferableBalance` (string): example: `"500"`
    - `availableBalance` (string): example: `"500"`
    - `moduleBalance` (string): example: `"0"`


---

### Get an address's current BRC20-Prog ticker balance
<a id="get-an-addresss-current-brc20-prog-ticker-balance"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/brc20-prog/ticker/{ticker}/balance`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20-Prog Indexer/getAddressTickerBalance)  

#### Description
Returns current indexed balance fields for one Bitcoin address and 6-character BRC20-Prog ticker, including overall, transferable, available, module balance, decimals, and self-mint state. Use it before displaying or preparing token actions; it reports state only and does not verify spend authorization.

#### Parameters
- `address` (path, string) **(required)**: Bitcoin address
- `ticker` (path, string) **(required)**: 6-character BRC20-Prog ticker. Classic BRC-20 tickers such as ordi are not supported by brc20-prog endpoints.

#### Response (200)
Successful response

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `ticker` (string): example: `"abc123"`
  - `selfMint` (boolean): example: `false`
  - `decimal` (integer): example: `8`
  - `overallBalance` (string): example: `"1000"`
  - `transferableBalance` (string): example: `"500"`
  - `availableBalance` (string): example: `"500"`
  - `moduleBalance` (string): example: `"0"`


---

### Get an address's BRC20-Prog ticker balance at a height
<a id="get-an-addresss-brc20-prog-ticker-balance-at-a-height"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/brc20-prog/ticker/{ticker}/balance-by-height/{height}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20-Prog Indexer/getAddressTickerBalanceByHeight)  

#### Description
Returns historical indexed balance fields for one Bitcoin address and 6-character BRC20-Prog ticker at a specific block height, including overall, transferable, and available balances. Use it for snapshots or reconciliation; historical balances may not reflect current spendability.

#### Parameters
- `address` (path, string) **(required)**: Bitcoin address
- `ticker` (path, string) **(required)**: 6-character BRC20-Prog ticker. Classic BRC-20 tickers such as ordi are not supported by brc20-prog endpoints.
- `height` (path, integer) **(required)**: Block height

#### Response (200)
Successful response

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `ticker` (string): example: `"abc123"`
  - `selfMint` (boolean): example: `false`
  - `decimal` (integer): example: `8`
  - `overallBalance` (string): example: `"1000"`
  - `transferableBalance` (string): example: `"500"`
  - `availableBalance` (string): example: `"500"`


---

### List transferable BRC20-Prog inscriptions for an address
<a id="list-transferable-brc20-prog-inscriptions-for-an-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/brc20-prog/ticker/{ticker}/transferable-inscriptions`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20-Prog Indexer/getAddressTickerTransferableInscriptions)  

#### Description
Returns unused transferable inscriptions for a Bitcoin address and 6-character BRC20-Prog ticker, including inscription id, amount, holder script or wallet, event id, block height, and inscription number. Use it to choose transfer candidates; callers must still validate UTXO ownership, confirmation policy, and signing context before spending.

#### Parameters
- `address` (path, string) **(required)**: Bitcoin address
- `ticker` (path, string) **(required)**: 6-character BRC20-Prog ticker. Classic BRC-20 tickers such as ordi are not supported by brc20-prog endpoints.
- `start` (query, integer): Start offset, default 0; default: `0`
- `limit` (query, integer): Number of items returned, default 20; default: `20`

#### Response (200)
Successful response

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `total` (integer):
  - `start` (integer):
  - `height` (integer):
  - `detail` (array):
    - `id` (integer (int64)): example: `1`
    - `inscriptionId` (string): example: `"1234567890abcdef"`
    - `tick` (string): example: `"abc123"`
    - `amount` (string): example: `"1000"`
    - `currentHolderPkscript` (string): example: `"001234567890abcdef"`
    - `currentHolderWallet` (string): example: `"bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"`
    - `eventId` (integer (int64)): example: `1`
    - `blockHeight` (integer): Block height; example: `800000`
    - `inscriptionNumber` (integer (int64)): example: `123456`


---

