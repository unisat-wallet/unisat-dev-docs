# Runes Indexer API

This is UniSat Wallet Open API. If you wish to use the OpenAPI, please feel free to send us an email, and we will provide you with an API KEY.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [GET /v1/indexer/runes/status](#get-runes-status) | Get runes status |
| [GET /v1/indexer/runes/info-list](#get-runes-list) | Get runes list |
| [GET /v1/indexer/runes/{runeid}/info](#get-rune-info-by-runeid) | Get rune info by runeid |
| [GET /v1/indexer/runes/{runeid}/holders](#get-runes-holders-by-runeid) | Get runes holders by runeid |
| [GET /v1/indexer/address/{address}/runes/balance-list](#get-runes-balance-list-by-address) | Get runes balance list by address |
| [GET /v1/indexer/address/{address}/runes/{runeid}/balance](#get-runes-balance-by-address-and-runeid) | Get runes balance by address and runeid |
| [GET /v1/indexer/runes/utxo/{txid}/{index}/balance](#get-runes-balance-by-utxo) | Get runes balance by utxo |
| [GET /v1/indexer/address/{address}/runes/{runeid}/utxo](#get-utxo-runes-balance-by-address-and-runeid) | Get utxo runes balance by address and runeid |
| [GET /v1/indexer/runes/event](#get-runes-events) | Get Runes Events |

---

## Runes

### Get runes status
<a id="get-runes-status"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/runes/status`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Runes/getRunesStatus)  

#### Description
Get runes global status

#### Response (200)
- `code` (integer):  (example: `0`)
- `msg` (string):  (example: ``)
- `data` (object):
  - `bestHeight` (integer): 
  - `runes` (integer):  (example: `100`)
  - `minimumRune` (string):  (example: `AAAAAAAAAAAA`)
  - `halvingBlockCount` (integer):  (example: `100`)

### Notes

- bestHeight : The latest height of the data being processed by the current index
- runes: The total count of Runes
- minimumRune: The minimumRune can be edicted
- halvingBlockCount: The number of blocks remaining until the next halving

![image](./runes_p1.avif)

---

### Get runes list
<a id="get-runes-list"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/runes/info-list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Runes/getRunesList)  

#### Parameters
- `rune` (query) : search by rune spacedRune
- `sort` (query) : by (holders/transactions/timestamp)
- `complete` (query) : complete type(yes/no)
- `start` (query) : default=0
- `limit` (query) : required,min=1,max=500,default=10

#### Response (200)
- `code` (integer):  (example: `0`)
- `msg` (string):  (example: ``)
- `data` (object):
  - `total` (integer):  (example: `3045`)
  - `start` (integer):  (example: `0`)
  - `detail` (array):
    - `runeid` (string):  (example: `2583283:1333`)
    - `rune` (string):  (example: `UNCOMMONGOODS`)
    - `spacedRune` (string):  (example: `UNCOMMON•GOODS`)
    - `number` (integer):  (example: `0`)
    - `height` (integer):  (example: `2583283`)
    - `txidx` (integer):  (example: `1333`)
    - `timestamp` (integer):  (example: `1623423423`)
    - `divisibility` (integer):  (example: `2`)
    - `symbol` (string):  (example: `G`)
    - `etching` (string):  (example: `7cd19fef13aa2924d4446b1a86c1904e02e46d16630370bc6de86f769692e242`)
    - `premine` (string):  (example: `10000`)
    - `terms` (object):
      - `amount` (string):  (example: `1000000`)
      - `cap` (string):  (example: `234000`)
      - `heightStart` (integer):  (example: `245000`)
      - `heightEnd` (integer):  (example: `2480000`)
      - `offsetStart` (integer):  (example: `null`)
      - `offsetEnd` (integer):  (example: `null`)
    - `mints` (string):  (example: `500`)
    - `burned` (string):  (example: `1000`)
    - `holders` (integer):  (example: `1000`)
    - `transactions` (integer):  (example: `1000`)
    - `supply` (string):  (example: `500010000`)
    - `start` (integer): 
    - `end` (integer): 
    - `mintable` (boolean): 
    - `remaining` (string): 

---

### Get rune info by runeid
<a id="get-rune-info-by-runeid"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/runes/{runeid}/info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Runes/getRuneInfo)  

#### Parameters
- `runeid` (path) **(required)**: 

#### Response (200)
- `code` (integer):  (example: `0`)
- `msg` (string):  (example: ``)
- `data` (object):
  - `runeid` (string):  (example: `2583283:1333`)
  - `rune` (string):  (example: `UNCOMMONGOODS`)
  - `spacedRune` (string):  (example: `UNCOMMON•GOODS`)
  - `number` (integer):  (example: `0`)
  - `height` (integer):  (example: `2583283`)
  - `txidx` (integer):  (example: `1333`)
  - `timestamp` (integer):  (example: `1623423423`)
  - `divisibility` (integer):  (example: `2`)
  - `symbol` (string):  (example: `G`)
  - `etching` (string):  (example: `7cd19fef13aa2924d4446b1a86c1904e02e46d16630370bc6de86f769692e242`)
  - `premine` (string):  (example: `10000`)
  - `terms` (object):
    - `amount` (string):  (example: `1000000`)
    - `cap` (string):  (example: `234000`)
    - `heightStart` (integer):  (example: `245000`)
    - `heightEnd` (integer):  (example: `2480000`)
    - `offsetStart` (integer):  (example: `null`)
    - `offsetEnd` (integer):  (example: `null`)
  - `mints` (string):  (example: `500`)
  - `burned` (string):  (example: `1000`)
  - `holders` (integer):  (example: `1000`)
  - `transactions` (integer):  (example: `1000`)
  - `supply` (string):  (example: `500010000`)
  - `start` (integer): 
  - `end` (integer): 
  - `mintable` (boolean): 
  - `remaining` (string): 

---

### Get runes holders by runeid
<a id="get-runes-holders-by-runeid"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/runes/{runeid}/holders`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Runes/getRuneHolders)  

#### Parameters
- `runeid` (path) **(required)**: 
- `start` (query) : Start offset
- `limit` (query) : Number of inscriptions returned

#### Response (200)
- `code` (integer):  (example: `0`)
- `msg` (string):  (example: ``)
- `data` (object):
  - `total` (integer):  (example: `1`)
  - `start` (integer):  (example: `0`)
  - `detail` (array):
    - `address` (string): 
    - `amount` (string):  (example: `10000`)

---

### Get runes balance list by address
<a id="get-runes-balance-list-by-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/runes/balance-list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Runes/getRunesBalanceList)  

#### Parameters
- `address` (path) **(required)**: 
- `start` (query) : Start offset
- `limit` (query) : Number of items returned

#### Response (200)
- `code` (integer):  (example: `0`)
- `msg` (string):  (example: ``)
- `data` (object): 

---

### Get runes balance by address and runeid
<a id="get-runes-balance-by-address-and-runeid"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/runes/{runeid}/balance`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Runes/getRunesBalance)  

#### Parameters
- `address` (path) **(required)**: 
- `runeid` (path) **(required)**: 

#### Response (200)
- `code` (integer):  (example: `0`)
- `msg` (string):  (example: ``)
- `data` (object):
  - `amount` (string):  (example: `10000`)
  - `runeid` (string):  (example: `2584327:44`)
  - `rune` (string):  (example: `AAAAAAAAAAAAAB`)
  - `spacedRune` (string):  (example: `AAAAA•AAA•AAAAA•B`)
  - `symbol` (string):  (example: `G`)
  - `divisibility` (integer):  (example: `0`)

---

### Get runes balance by utxo
<a id="get-runes-balance-by-utxo"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/runes/utxo/{txid}/{index}/balance`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Runes/getRunesUtxoBalance)  

#### Parameters
- `txid` (path) **(required)**: 
- `index` (path) **(required)**: 

#### Response (200)
- `code` (integer):  (example: `0`)
- `msg` (string):  (example: ``)
- `data` (array):
  - `amount` (string):  (example: `10000`)
  - `runeid` (string):  (example: `2584327:44`)
  - `rune` (string):  (example: `AAAAAAAAAAAAAB`)
  - `spacedRune` (string):  (example: `AAAAA•AAA•AAAAA•B`)
  - `symbol` (string):  (example: `G`)
  - `divisibility` (integer):  (example: `0`)

---

### Get utxo runes balance by address and runeid
<a id="get-utxo-runes-balance-by-address-and-runeid"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/runes/{runeid}/utxo`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Runes/getRunesUtxoByAddressAndRuneid)  

#### Parameters
- `address` (path) **(required)**: 
- `runeid` (path) **(required)**: 
- `start` (query) : default=0
- `limit` (query) : required,min=1,max=500,default=10

#### Response (200)
- `code` (integer):  (example: `0`)
- `msg` (string):  (example: ``)
- `data` (object): 

---

### Get Runes Events
<a id="get-runes-events"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/runes/event`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Runes/getRunesEvents)  

#### Description
Get the full history events of Runes.

#### Parameters
- `rune` (query) : Filter by rune
- `type` (query) : Filter by history type
- `address` (query) : Filter by address
- `height` (query) : Filter by block height
- `txid` (query) : Filter by tx
- `start` (query) : Start offset
- `limit` (query) : Number of inscriptions returned

#### Response (200)


---

