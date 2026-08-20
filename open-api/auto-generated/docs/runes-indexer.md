# Runes Indexer API

Runes Indexer API is a RESTful API for indexing and querying Bitcoin Runes data. It provides endpoints for Runes status, Rune list/search, Rune metadata, holders, address balances, and transferable Rune UTXOs.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [GET `/v1/indexer/runes/status`](#get-runes-indexer-status-and-minimum-rune-state) | Get Runes indexer status and minimum rune state |
| [GET `/v1/indexer/runes/info-list`](#search-and-list-rune-metadata-entries) | Search and list Rune metadata entries |
| [GET `/v1/indexer/runes/(runeid)/info`](#get-detailed-metadata-for-a-rune) | Get detailed metadata for a Rune |
| [GET `/v1/indexer/runes/(runeid)/holders`](#list-holders-for-a-rune) | List holders for a Rune |
| [GET `/v1/indexer/address/(address)/runes/balance-list`](#list-all-rune-balances-for-an-address) | List all Rune balances for an address |
| [GET `/v1/indexer/address/(address)/runes/(runeid)/balance`](#get-an-addresss-balance-for-one-rune) | Get an address's balance for one Rune |
| [GET `/v1/indexer/runes/utxo/(txid)/(index)/balance`](#get-rune-balances-carried-by-a-specific-utxo) | Get Rune balances carried by a specific UTXO |
| [GET `/v1/indexer/address/(address)/runes/(runeid)/utxo`](#list-an-addresss-transferable-utxos-for-one-rune) | List an address's transferable UTXOs for one Rune |
| [GET `/v1/indexer/runes/event`](#search-rune-etch-mint-burn-send-and-receive-events) | Search Rune etch, mint, burn, send, and receive events |

---

## Runes Indexer

### Get Runes indexer status and minimum rune state
<a id="get-runes-indexer-status-and-minimum-rune-state"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/runes/status`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Runes Indexer/getRunesStatus)  

#### Description
Returns the latest indexed height, total rune count, current minimum rune, and halving block count. Use it to check Runes indexer freshness before reading rune metadata, holder lists, balances, UTXOs, or event history; data may lag new confirmations.

#### Response (200)
successful operation

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `bestHeight` (integer):
  - `runes` (integer): example: `100`
  - `minimumRune` (string): example: `"AAAAAAAAAAAA"`
  - `halvingBlockCount` (integer): example: `100`

### Notes

- bestHeight : The latest height of the data being processed by the current index
- runes: The total count of Runes
- minimumRune: The minimumRune can be edicted
- halvingBlockCount: The number of blocks remaining until the next halving

![image](./runes_p1.avif)


---

### Search and list Rune metadata entries
<a id="search-and-list-rune-metadata-entries"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/runes/info-list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Runes Indexer/getRunesList)  

#### Description
Returns paginated Rune entries with rune id, raw and spaced names, divisibility, symbol, etching transaction, premine, terms, mints, burned amount, holders, transactions, supply, mintability, and remaining amount. Use it for Rune discovery, filtering, and ranking; spaced names may contain bullet separators.

#### Parameters
- `rune` (query, string): Search by spaced Rune name, for example DOG•GO•TO•THE•MOON.; example: `"DOG•GO•TO•THE•MOON"`
- `sort` (query, string): by (holders/transactions/timestamp); example: `"timestamp"`
- `complete` (query, string): complete type(yes/no); example: `"no"`
- `start` (query, integer): default=0; example: `0`
- `limit` (query, integer): required,min=1,max=500,default=10; example: `10`

#### Response (200)
successful operation

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `total` (integer): example: `3045`
  - `start` (integer): example: `0`
  - `detail` (array):
    - `runeid` (string): example: `"2583283:1333"`
    - `rune` (string): example: `"UNCOMMONGOODS"`
    - `spacedRune` (string): example: `"UNCOMMON•GOODS"`
    - `number` (integer (uint64)): example: `0`
    - `height` (integer (uint64)): example: `2583283`
    - `txidx` (integer (uint64)): example: `1333`
    - `timestamp` (integer): example: `1623423423`
    - `divisibility` (integer (uint8)): example: `2`
    - `symbol` (string (Option&lt;char&gt;)): example: `"G"`
    - `etching` (string): example: `"7cd19fef13aa2924d4446b1a86c1904e02e46d16630370bc6de86f769692e242"`
    - `premine` (string): example: `"10000"`
    - `terms` (object):
      - `amount` (string): example: `"1000000"`
      - `cap` (string): example: `"234000"`
      - `heightStart` (integer): example: `245000`
      - `heightEnd` (integer): example: `2480000`
      - `offsetStart` (integer): example: `null`
      - `offsetEnd` (integer): example: `null`
    - `mints` (string): example: `"500"`
    - `burned` (string (u128)): example: `"1000"`
    - `holders` (integer): example: `1000`
    - `transactions` (integer): example: `1000`
    - `supply` (string): example: `"500010000"`
    - `start` (integer):
    - `end` (integer):
    - `mintable` (boolean):
    - `remaining` (string):


---

### Get detailed metadata for a Rune
<a id="get-detailed-metadata-for-a-rune"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/runes/{runeid}/info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Runes Indexer/getRuneInfo)  

#### Description
Returns one Rune entry by block:tx rune id, including names, symbol, divisibility, etching transaction, premine, mint terms, supply, burned amount, holder and transaction counts, mintability, and remaining supply. Use it for Rune detail pages and validation before balance or holder queries.

#### Parameters
- `runeid` (path, string) **(required)**: Rune id in block:tx format, for example 840000:3.

#### Response (200)
successful operation

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `runeid` (string): example: `"2583283:1333"`
  - `rune` (string): example: `"UNCOMMONGOODS"`
  - `spacedRune` (string): example: `"UNCOMMON•GOODS"`
  - `number` (integer (uint64)): example: `0`
  - `height` (integer (uint64)): example: `2583283`
  - `txidx` (integer (uint64)): example: `1333`
  - `timestamp` (integer): example: `1623423423`
  - `divisibility` (integer (uint8)): example: `2`
  - `symbol` (string (Option&lt;char&gt;)): example: `"G"`
  - `etching` (string): example: `"7cd19fef13aa2924d4446b1a86c1904e02e46d16630370bc6de86f769692e242"`
  - `premine` (string): example: `"10000"`
  - `terms` (object):
    - `amount` (string): example: `"1000000"`
    - `cap` (string): example: `"234000"`
    - `heightStart` (integer): example: `245000`
    - `heightEnd` (integer): example: `2480000`
    - `offsetStart` (integer): example: `null`
    - `offsetEnd` (integer): example: `null`
  - `mints` (string): example: `"500"`
  - `burned` (string (u128)): example: `"1000"`
  - `holders` (integer): example: `1000`
  - `transactions` (integer): example: `1000`
  - `supply` (string): example: `"500010000"`
  - `start` (integer):
  - `end` (integer):
  - `mintable` (boolean):
  - `remaining` (string):


---

### List holders for a Rune
<a id="list-holders-for-a-rune"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/runes/{runeid}/holders`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Runes Indexer/getRuneHolders)  

#### Description
Returns holder addresses and Rune amounts for a specific block:tx rune id with pagination totals. Use it for holder distribution and ownership analysis; amounts are indexed token balances and do not authorize transfers or UTXO spends.

#### Parameters
- `runeid` (path, string) **(required)**: Rune id in block:tx format, for example 840000:3.
- `start` (query, integer): Start offset
- `limit` (query, integer): Number of inscriptions returned

#### Response (200)
successful operation

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `total` (integer): example: `1`
  - `start` (integer): example: `0`
  - `detail` (array):
    - `address` (string):
    - `amount` (string): example: `"10000"`


---

### List all Rune balances for an address
<a id="list-all-rune-balances-for-an-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/runes/balance-list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Runes Indexer/getRunesBalanceList)  

#### Description
Returns paginated Rune balances held by an address, including rune id, raw and spaced names, symbol, divisibility, and amount. Use it for wallet portfolio displays or account audits; balances are indexer-derived and should be reconciled with UTXOs before spending.

#### Parameters
- `address` (path, string) **(required)**: Bitcoin address.
- `start` (query, integer): Start offset
- `limit` (query, integer): Number of items returned

#### Response (200)
successful operation

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `start` (integer):
  - `total` (integer):
  - `detail` (array):
    - `amount` (string): example: `"10000"`
    - `runeid` (string): example: `"2584327:44"`
    - `rune` (string): example: `"AAAAAAAAAAAAAB"`
    - `spacedRune` (string): example: `"AAAAA•AAA•AAAAA•B"`
    - `symbol` (string): example: `"G"`
    - `divisibility` (integer): example: `0`


---

### Get an address's balance for one Rune
<a id="get-an-addresss-balance-for-one-rune"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/runes/{runeid}/balance`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Runes Indexer/getRunesBalance)  

#### Description
Returns the indexed amount and Rune identity fields for one address and block:tx rune id. Use it for single-token wallet views or pre-transfer checks; spend construction must still inspect Rune UTXOs and current mempool state.

#### Parameters
- `address` (path, string) **(required)**: Bitcoin address.
- `runeid` (path, string) **(required)**: Rune id in block:tx format, for example 840000:3.

#### Response (200)
successful operation

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `amount` (string): example: `"10000"`
  - `runeid` (string): example: `"2584327:44"`
  - `rune` (string): example: `"AAAAAAAAAAAAAB"`
  - `spacedRune` (string): example: `"AAAAA•AAA•AAAAA•B"`
  - `symbol` (string): example: `"G"`
  - `divisibility` (integer): example: `0`


---

### Get Rune balances carried by a specific UTXO
<a id="get-rune-balances-carried-by-a-specific-utxo"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/runes/utxo/{txid}/{index}/balance`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Runes Indexer/getRunesUtxoBalance)  

#### Description
Returns all Rune balances associated with one transaction output, including rune id, names, symbol, divisibility, and amount. Use it for coin selection diagnostics or validating a Rune-bearing UTXO; callers must confirm the UTXO is still unspent before spending.

#### Parameters
- `txid` (path, string) **(required)**: 
- `index` (path, string) **(required)**: 

#### Response (200)
successful operation

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (array):
  - `amount` (string): example: `"10000"`
  - `runeid` (string): example: `"2584327:44"`
  - `rune` (string): example: `"AAAAAAAAAAAAAB"`
  - `spacedRune` (string): example: `"AAAAA•AAA•AAAAA•B"`
  - `symbol` (string): example: `"G"`
  - `divisibility` (integer): example: `0`


---

### List an address's transferable UTXOs for one Rune
<a id="list-an-addresss-transferable-utxos-for-one-rune"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/runes/{runeid}/utxo`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Runes Indexer/getRunesUtxoByAddressAndRuneid)  

#### Description
Returns UTXOs for an address that carry the selected Rune, including address, satoshi value, script, outpoint, and embedded Rune balances. Use it to prepare transfer candidates; revalidate ownership, dust policy, and mempool state before signing or broadcasting.

#### Parameters
- `address` (path, string) **(required)**: 
- `runeid` (path, string) **(required)**: Rune id in block:tx format, for example 840000:3.
- `start` (query, integer): default=0; example: `0`
- `limit` (query, integer): required,min=1,max=500,default=10; example: `10`

#### Response (200)
successful operation

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `start` (integer):
  - `total` (integer):
  - `utxo` (array):
    - `address` (string):
    - `satoshi` (integer): example: `10000`
    - `scriptPk` (string):
    - `txid` (string):
    - `vout` (integer): example: `0`
    - `runes` (array):
      - `amount` (string): example: `"10000"`
      - `runeid` (string): example: `"2584327:44"`
      - `rune` (string): example: `"AAAAAAAAAAAAAB"`
      - `spacedRune` (string): example: `"AAAAA•AAA•AAAAA•B"`
      - `symbol` (string): example: `"G"`
      - `divisibility` (integer): example: `0`


---

### Search Rune etch, mint, burn, send, and receive events
<a id="search-rune-etch-mint-burn-send-and-receive-events"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/runes/event`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Runes Indexer/getRunesEvents)  

#### Description
Returns paginated Rune events with type, address, amount, height, transaction index, txid, timestamp, raw rune name, and rune id. Use it for activity feeds, compliance exports, or block and transaction investigations; results are read-only indexer events and may lag recent confirmations.

#### Parameters
- `rune` (query, string): Filter by rune
- `type` (query, string): Filter by history type; enum: `etch`, `mint`, `burn`, `receive`, `send`
- `address` (query, string): Filter by address
- `height` (query, integer): Filter by block height
- `txid` (query, string): Filter by tx
- `start` (query, integer): Start offset
- `limit` (query, integer): Number of inscriptions returned

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `detail` (array):
    - `type` (string): enum: `etch`, `mint`, `burn`, `send`, `receive`
    - `address` (string):
    - `amount` (string):
    - `height` (integer):
    - `txidx` (integer):
    - `txid` (string):
    - `timestamp` (integer):
    - `rune` (string):
    - `runeid` (string):
  - `start` (integer):
  - `total` (integer):

#### Response (401)
Invalid API Key


---

