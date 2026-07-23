# BRC20 Prog API

BRC20 Prog API provides comprehensive BRC20 token data query services, including token information, holder data, historical records, and more. The system uses global memory caching technology to quickly respond to various query requests and supports efficient filtering queries based on indexes.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [GET `/v1/indexer/brc20-prog/bestheight`](#get-best-height) | Get best height |
| [GET `/v1/indexer/brc20-prog/list`](#get-ticker-list) | Get ticker list |
| [GET `/v1/indexer/brc20-prog/status`](#get-ticker-status) | Get ticker status |
| [GET `/v1/indexer/brc20-prog/(ticker)/info`](#get-ticker-info) | Get ticker info |
| [GET `/v1/indexer/brc20-prog/history-by-height/(height)`](#get-ticker-history-by-height) | Get ticker history by height |
| [GET `/v1/indexer/brc20-prog/(ticker)/holders`](#get-ticker-holders) | Get ticker holders |
| [GET `/v1/indexer/brc20-prog/(ticker)/history`](#get-ticker-history) | Get ticker history |
| [GET `/v1/indexer/address/(address)/brc20-prog/summary`](#get-address-token-summary) | Get address token summary |
| [GET `/v1/indexer/address/(address)/brc20-prog/ticker/(ticker)/balance`](#get-address-ticker-balance) | Get address ticker balance |
| [GET `/v1/indexer/address/(address)/brc20-prog/ticker/(ticker)/balance-by-height/(height)`](#get-address-ticker-balance-by-height) | Get address ticker balance by height |
| [GET `/v1/indexer/address/(address)/brc20-prog/ticker/(ticker)/transferable-inscriptions`](#get-address-ticker-transferable-inscriptions) | Get address ticker transferable inscriptions |

---

## BRC20-Prog

### Get best height
<a id="get-best-height"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20-prog/bestheight`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20-Prog/getBestHeight)  

#### Description
Get current blockchain best height

#### Response (200)
Successful response

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `height` (integer): example: `800000`
  - `blockid` (string): example: `"0000000000000000000000000000000000000000000000000000000000000000"`
  - `timestamp` (integer): example: `1703123456`


---

### Get ticker list
<a id="get-ticker-list"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20-prog/list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20-Prog/getTickerList)  

#### Description
Get all BRC20 token list

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
  - `detail` (array): example: `["ordi","pups","rats"]`


---

### Get ticker status
<a id="get-ticker-status"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20-prog/status`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20-Prog/getTickerStatus)  

#### Description
Get ticker status information with multiple filtering and sorting options

#### Parameters
- `ticker` (query, string): Filter by ticker name
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
    - `ticker` (string): example: `"ordi"`
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

### Get ticker info
<a id="get-ticker-info"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20-prog/{ticker}/info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20-Prog/getTickerInfo)  

#### Description
Get detailed information of specified ticker

#### Parameters
- `ticker` (path, string) **(required)**: 

#### Response (200)
Successful response

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `id` (integer (int64)): example: `1`
  - `originalTick` (string): example: `"ordi"`
  - `tick` (string): example: `"ordi"`
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

### Get ticker history by height
<a id="get-ticker-history-by-height"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20-prog/history-by-height/{height}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20-Prog/getTickerHistoryByHeight)  

#### Description
Get ticker history records at specified block height

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
  - `ticker` (string): example: `"ordi"`
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
    - `tick` (string): example: `"ordi"`
    - `original_tick` (string): example: `"ordi"`
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

### Get ticker holders
<a id="get-ticker-holders"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20-prog/{ticker}/holders`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20-Prog/getTickerHolders)  

#### Description
Get holder list of specified ticker

#### Parameters
- `ticker` (path, string) **(required)**: 
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

### Get ticker history
<a id="get-ticker-history"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/brc20-prog/{ticker}/history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20-Prog/getTickerHistory)  

#### Description
Get history records of specified ticker with event type and block height filtering

#### Parameters
- `ticker` (path, string) **(required)**: 
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
    - `ticker` (string): example: `"ordi"`
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
      - `tick` (string): example: `"ordi"`
      - `original_tick` (string): example: `"ordi"`
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

### Get address token summary
<a id="get-address-token-summary"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/brc20-prog/summary`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20-Prog/getAddressTokenSummary)  

#### Description
Get token summary information of specified address

#### Parameters
- `address` (path, string) **(required)**: Bitcoin address
- `ticker` (query, string): Filter by ticker name
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
    - `ticker` (string): example: `"ordi"`
    - `selfMint` (boolean): example: `false`
    - `decimal` (integer): example: `8`
    - `overallBalance` (string): example: `"1000"`
    - `transferableBalance` (string): example: `"500"`
    - `availableBalance` (string): example: `"500"`
    - `moduleBalance` (string): example: `"0"`


---

### Get address ticker balance
<a id="get-address-ticker-balance"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/brc20-prog/ticker/{ticker}/balance`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20-Prog/getAddressTickerBalance)  

#### Description
Get specific ticker balance of specified address

#### Parameters
- `address` (path, string) **(required)**: Bitcoin address
- `ticker` (path, string) **(required)**: 

#### Response (200)
Successful response

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `ticker` (string): example: `"ordi"`
  - `selfMint` (boolean): example: `false`
  - `decimal` (integer): example: `8`
  - `overallBalance` (string): example: `"1000"`
  - `transferableBalance` (string): example: `"500"`
  - `availableBalance` (string): example: `"500"`
  - `moduleBalance` (string): example: `"0"`


---

### Get address ticker balance by height
<a id="get-address-ticker-balance-by-height"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/brc20-prog/ticker/{ticker}/balance-by-height/{height}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20-Prog/getAddressTickerBalanceByHeight)  

#### Description
Get ticker balance of specified address at specified height

#### Parameters
- `address` (path, string) **(required)**: Bitcoin address
- `ticker` (path, string) **(required)**: 
- `height` (path, integer) **(required)**: Block height

#### Response (200)
Successful response

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `ticker` (string): example: `"ordi"`
  - `selfMint` (boolean): example: `false`
  - `decimal` (integer): example: `8`
  - `overallBalance` (string): example: `"1000"`
  - `transferableBalance` (string): example: `"500"`
  - `availableBalance` (string): example: `"500"`


---

### Get address ticker transferable inscriptions
<a id="get-address-ticker-transferable-inscriptions"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/brc20-prog/ticker/{ticker}/transferable-inscriptions`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/BRC20-Prog/getAddressTickerTransferableInscriptions)  

#### Description
Get transferable inscription list of specific ticker for specified address

#### Parameters
- `address` (path, string) **(required)**: Bitcoin address
- `ticker` (path, string) **(required)**: 
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
    - `tick` (string): example: `"ordi"`
    - `amount` (string): example: `"1000"`
    - `currentHolderPkscript` (string): example: `"001234567890abcdef"`
    - `currentHolderWallet` (string): example: `"bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"`
    - `eventId` (integer (int64)): example: `1`
    - `blockHeight` (integer): Block height; example: `800000`
    - `inscriptionNumber` (integer (int64)): example: `123456`


---

