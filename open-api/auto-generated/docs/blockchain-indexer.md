# Blockchain API

Blockchain API is a RESTful API for accessing Bitcoin blockchain data. It provides endpoints to retrieve information about blocks, transactions, addresses, and more. The API supports both mainnet and testnet environments.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [GET `/v1/indexer/blockchain/info`](#get-chain-tip-header-height-and-best-block-metadata) | Get chain tip, header height, and best block metadata |
| [GET `/v1/indexer/fees/recommended`](#get-recommended-bitcoin-fee-rates-by-confirmation-target) | Get recommended Bitcoin fee rates by confirmation target |
| [GET `/v1/indexer/height/(height)/block`](#get-block-metadata-by-height) | Get block metadata by height |
| [GET `/v1/indexer/block/id/(blockid)`](#get-block-metadata-by-block-hash) | Get block metadata by block hash |
| [GET `/v1/indexer/block/(height)/txs`](#list-indexed-transactions-in-a-block-by-height) | List indexed transactions in a block by height |
| [GET `/v1/indexer/tx/(txid)`](#get-indexed-transaction-summary-by-txid) | Get indexed transaction summary by txid |
| [GET `/v1/indexer/tx/(txid)/ins`](#list-inputs-spent-by-a-transaction) | List inputs spent by a transaction |
| [GET `/v1/indexer/tx/(txid)/outs`](#list-outputs-created-by-a-transaction) | List outputs created by a transaction |
| [GET `/v1/indexer/rawtx/(txid)`](#get-raw-transaction-hex-by-txid) | Get raw transaction hex by txid |
| [GET `/v1/indexer/utxo/(txid)/(index)`](#get-one-transaction-output-by-txid-and-vout) | Get one transaction output by txid and vout |
| [POST `/v1/indexer/local_pushtx`](#broadcast-one-raw-transaction-to-the-selected-network) | Broadcast one raw transaction to the selected network |
| [POST `/v1/indexer/local_pushtxs`](#broadcast-multiple-raw-transactions-to-the-selected-network) | Broadcast multiple raw transactions to the selected network |
| [GET `/v1/indexer/address/(address)/balance`](#get-address-balance-split-by-btc-and-inscription-utxos) | Get address balance split by BTC and inscription UTXOs |
| [GET `/v1/indexer/address/(address)/history`](#list-indexed-transaction-history-for-an-address) | List indexed transaction history for an address |
| [GET `/v1/indexer/address/(address)/utxo-data`](#list-utxos-for-an-address) | List UTXOs for an address |
| [GET `/v1/indexer/address/(address)/all-utxo-data`](#list-all-indexed-utxos-for-an-address) | List all indexed UTXOs for an address |
| [GET `/v1/indexer/address/(address)/available-balance`](#get-address-balance-grouped-by-available-and-unavailable-utxos) | Get address balance grouped by available and unavailable UTXOs |
| [GET `/v1/indexer/address/(address)/available-utxo-data`](#list-available-utxos-for-an-address) | List available UTXOs for an address |

---

## Indexer-Blockchain

### Get chain tip, header height, and best block metadata
<a id="get-chain-tip-header-height-and-best-block-metadata"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/blockchain/info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Blockchain/getBlockchainInfo)  

#### Description
Returns the indexed blockchain state, including chain name, block and header heights, best and previous block hashes, median time, and accumulated chainwork.

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `chain` (string):
  - `blocks` (integer):
  - `headers` (integer):
  - `bestBlockHash` (string):
  - `prevBlockHash` (string):
  - `medianTime` (integer):
  - `chainwork` (string):

#### Response (401)
Invalid API Key


---

### Get recommended Bitcoin fee rates by confirmation target
<a id="get-recommended-bitcoin-fee-rates-by-confirmation-target"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/fees/recommended`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Blockchain/getRecommendedFees)  

#### Description
Returns fee-rate estimates for fastest, half-hour, hour, economy, and minimum confirmation targets, together with the update timestamp for freshness checks.

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `fastestFee` (integer):
  - `halfHourFee` (integer):
  - `hourFee` (integer):
  - `economyFee` (integer):
  - `minimumFee` (integer):
  - `updateTime` (integer):

#### Response (401)
Invalid API Key


---

### Get block metadata by height
<a id="get-block-metadata-by-height"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/height/{height}/block`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Blockchain/getBlockByHeight)  

#### Description
Returns indexed block details such as hash links, transaction count, satoshi totals, coinbase output, timestamp, bits, and serialized size for the requested height.

#### Parameters
- `height` (path, integer) **(required)**: Block height

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `height` (integer):
  - `version` (string):
  - `auxpow` (boolean):
  - `id` (string):
  - `prev` (string):
  - `next` (string):
  - `merkle` (string):
  - `ntx` (integer):
  - `inSatoshi` (integer):
  - `outSatoshi` (integer):
  - `coinbaseOut` (number):
  - `timestamp` (integer):
  - `bits` (number):
  - `size` (integer):

#### Response (401)
Invalid API Key


---

### Get block metadata by block hash
<a id="get-block-metadata-by-block-hash"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/block/id/{blockid}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Blockchain/getBlockById)  

#### Description
Returns the same indexed block model as height lookup, including chain links, transaction count, value totals, timestamp, difficulty bits, and block size.

#### Parameters
- `blockid` (path, string) **(required)**: Block id

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `height` (integer):
  - `version` (string):
  - `auxpow` (boolean):
  - `id` (string):
  - `prev` (string):
  - `next` (string):
  - `merkle` (string):
  - `ntx` (integer):
  - `inSatoshi` (integer):
  - `outSatoshi` (integer):
  - `coinbaseOut` (number):
  - `timestamp` (integer):
  - `bits` (number):
  - `size` (integer):

#### Response (401)
Invalid API Key


---

### List indexed transactions in a block by height
<a id="list-indexed-transactions-in-a-block-by-height"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/block/{height}/txs`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Blockchain/getTxsByBlockHeight)  

#### Description
Returns paginated transaction summaries for a block, including each transaction's input/output counts, satoshi totals, locktime, size, block position, confirmations, and timestamp.

#### Parameters
- `height` (path, integer) **(required)**: Block height
- `cursor` (query, integer) **(required)**: Start offset
- `size` (query, integer) **(required)**: Number of items returned

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `detail` (array):
    - `txid` (string):
    - `nIn` (integer):
    - `nOut` (integer):
    - `inSatoshi` (integer):
    - `outSatoshi` (integer):
    - `locktime` (integer):
    - `size` (integer):
    - `witOffset` (integer):
    - `height` (integer):
    - `idx` (integer):
    - `blkid` (string):
    - `confirmations` (integer):
    - `timestamp` (integer):
  - `start` (integer):
  - `total` (integer):

#### Response (401)
Invalid API Key


---

### Get indexed transaction summary by txid
<a id="get-indexed-transaction-summary-by-txid"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/tx/{txid}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Blockchain/getTxById)  

#### Description
Returns transaction-level metadata such as input/output counts, satoshi totals, locktime, size, witness offset, block hash, confirmations, and timestamp.

#### Parameters
- `txid` (path, string) **(required)**: Tx id

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `txid` (string):
  - `nIn` (integer):
  - `nOut` (integer):
  - `inSatoshi` (integer):
  - `outSatoshi` (integer):
  - `locktime` (integer):
  - `size` (integer):
  - `witOffset` (integer):
  - `height` (integer):
  - `idx` (integer):
  - `blkid` (string):
  - `confirmations` (integer):
  - `timestamp` (integer):

#### Response (401)
Invalid API Key


---

### List inputs spent by a transaction
<a id="list-inputs-spent-by-a-transaction"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/tx/{txid}/ins`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Blockchain/getInputsByTxId)  

#### Description
Returns paginated previous-output records consumed by a transaction, including address, script data, satoshi value, inscription metadata, source txid, vout, and indexed height fields.

#### Parameters
- `txid` (path, string) **(required)**: Tx id
- `cursor` (query, integer) **(required)**: Start offset
- `size` (query, integer) **(required)**: Number of items returned

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `address` (string):
  - `codeType` (integer): 0~3: Reserved , 4: CodeType_P2PK, 5: CodeType_P2PKH, 6: CodeType_P2SH, 7: CodeType_P2WPKH, 8: CodeType_P2WSH, 9: CodeType_P2TR; enum: `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`
  - `inscriptions` (array):
    - `inscriptionId` (string):
    - `inscriptionNumber` (integer):
    - `isBRC20` (boolean):
    - `moved` (boolean):
    - `offset` (integer):
  - `satoshi` (integer):
  - `scriptPk` (string):
  - `scriptSig` (string):
  - `scriptType` (string):
  - `scriptWits` (string):
  - `sequence` (integer):
  - `height` (integer):
  - `txid` (string):
  - `idx` (integer):
  - `heightTxo` (integer):
  - `utxid` (string):
  - `vout` (integer):

#### Response (401)
Invalid API Key


---

### List outputs created by a transaction
<a id="list-outputs-created-by-a-transaction"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/tx/{txid}/outs`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Blockchain/getOutputsByTxId)  

#### Description
Returns paginated transaction outputs with address, script type and scriptPubKey, satoshi value, inscription metadata, output index, and spend status fields when indexed.

#### Parameters
- `txid` (path, string) **(required)**: Tx id
- `cursor` (query, integer) **(required)**: Start offset
- `size` (query, integer) **(required)**: Number of items returned

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `address` (string):
  - `codeType` (integer):
  - `inscriptions` (array):
    - `inscriptionId` (string):
    - `inscriptionNumber` (integer):
    - `isBRC20` (boolean):
    - `moved` (boolean):
    - `offset` (integer):
  - `satoshi` (integer):
  - `scriptPk` (string):
  - `scriptType` (string):
  - `height` (integer):
  - `txid` (string):
  - `idx` (integer):
  - `heightSpent` (integer):
  - `txidSpent` (string):
  - `vout` (integer):

#### Response (401)
Invalid API Key


---

### Get raw transaction hex by txid
<a id="get-raw-transaction-hex-by-txid"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/rawtx/{txid}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Blockchain/getRawTxById)  

#### Description
Returns the serialized raw transaction hex for decoding, verification, rebroadcast analysis, or offline transaction inspection.

#### Parameters
- `txid` (path, string) **(required)**: Tx id

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (string):

#### Response (401)
Invalid API Key


---

### Get one transaction output by txid and vout
<a id="get-one-transaction-output-by-txid-and-vout"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/utxo/{txid}/{index}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Blockchain/getUtxoByTxIdAndIndex)  

#### Description
Returns indexed output details including satoshi value, script type, scriptPubKey, address, inscription metadata, RBF marker, and whether the output is spent.

#### Parameters
- `txid` (path, string) **(required)**: Tx id
- `index` (path, string) **(required)**: Transaction output index (vout) of the UTXO.

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `txid` (string):
  - `vout` (integer): example: `0`
  - `satoshi` (integer): example: `10000`
  - `scriptType` (string):
  - `scriptPk` (string):
  - `codeType` (integer):
  - `address` (string):
  - `height` (integer):
  - `idx` (integer):
  - `inscriptions` (array):
    - `inscriptionId` (string):
    - `inscriptionNumber` (integer):
    - `isBRC20` (boolean):
    - `moved` (boolean):
    - `offset` (integer):
  - `isOpInRBF` (boolean): example: `false`
  - `isSpent` (boolean): example: `false`

#### Response (401)
Invalid API Key

### Notes

The return result of this UTXO interface will have three scenarios:

1. When UTXO has not been spent, it will return the information of this UTXO, and isSpent will be set to false.

   ![image](./p1.png)

2. When UTXO has been spent, but the transaction that spent it has not yet been confirmed, it will return the information of this UTXO, and isSpent will be set to true.

   ![image](./p2.avif)

3. When UTXO has been spent and the transacted spend has been confirmed, it will return null.
   ![image](./p3.avif)

#### This endpoint was updated on 2025-05-20

BRC20 inscriptions of type TRANSFER (those that have undergone transfers) and MINT inscriptions, which no longer hold value, will no longer be available for query after this update.
**Before Upgrade:**

```JSON
{
  "code": 0,
  "msg": "ok",
  "data": {
    "txid": "...",
    "vout": 0,
    "satoshi": 546,
    "scriptType": "5120",
    "scriptPk": "...",
    "codeType": 9,
    "address": "...",
    "height": 815539,
    "idx": 2516,
    "isOpInRBF": false,
    "isSpent": false,
    "inscriptionsCount": 2,
    "inscriptions": [
      {
        "inscriptionNumber": 38012882,
        "inscriptionId": "...",
        "offset": 0,
        "moved": false,
        "sequence": 0,
        "isCursed": false,
        "isVindicate": false,
        "isBRC20Ext": false,
        "isBRC20": true
      },
      {
        "inscriptionNumber": 38012883,
        "inscriptionId": "....",
        "offset": 0,
        "moved": false,
        "sequence": 0,
        "isCursed": false,
        "isVindicate": false,
        "isBRC20Ext": false,
        "isBRC20": false
      }
    ]
  }
}
```

**After Upgrade:**

```JSON
{
  "code": 0,
  "msg": "ok",
  "data": {
    "txid": "...",
    "vout": 0,
    "satoshi": 546,
    "scriptType": "5120",
    "scriptPk": "...",
    "codeType": 9,
    "address": "...",
    "height": 815539,
    "idx": 2516,
    "isOpInRBF": false,
    "isSpent": false,
    "inscriptionsCount": 2,
    "inscriptions": [
    {
        "inscriptionNumber": 38012883,
        "inscriptionId": "....",
        "offset": 0,
        "moved": false,
        "sequence": 0,
        "isCursed": false,
        "isVindicate": false,
        "isBRC20Ext": false,
        "isBRC20": false
      }
     ]
  }
}
```

Migration Guidance:

- The inscriptionsCount (no changes required)
- The inscriptions array will eventually be removed for useless brc20 Inscriptions


---

### Broadcast one raw transaction to the selected network
<a id="broadcast-one-raw-transaction-to-the-selected-network"></a>

**Method**: `POST`  
**Path**: `/v1/indexer/local_pushtx`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Blockchain/localPushTx)  

#### Description
Submits a signed transaction hex and optional maximum fee rate for local validation and propagation. This can move funds or assets and requires explicit confirmation before execution.

#### Request Body
Content-Type: `application/json` **(required)**

- `txHex` (string): rawtx; example: `""`
- `maxFeeRate` (number): maxfeerate btc/kvB(optional and must less than 1 btc/kvB)

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (string):

#### Response (401)
Invalid API Key


---

### Broadcast multiple raw transactions to the selected network
<a id="broadcast-multiple-raw-transactions-to-the-selected-network"></a>

**Method**: `POST`  
**Path**: `/v1/indexer/local_pushtxs`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Blockchain/localPushTxs)  

#### Description
Submits a batch of signed transaction hex strings with optional maximum fee rate. Use only after validating order, dependencies, fees, and target network because each transaction may move funds or assets.

#### Request Body
Content-Type: `application/json` **(required)**

- `txsHex` (array):
- `maxFeeRate` (number): maxfeerate btc/kvB(optional and must less than 1 btc/kvB)

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (array):

#### Response (401)
Invalid API Key


---

### Get address balance split by BTC and inscription UTXOs
<a id="get-address-balance-split-by-btc-and-inscription-utxos"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/balance`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Blockchain/getBalanceByAddress)  

#### Description
Returns confirmed and pending satoshi totals plus UTXO counts for the address, separated into overall, plain BTC, and inscription-related balances.

#### Parameters
- `address` (path, string) **(required)**: Address

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `address` (string):
  - `satoshi` (integer):
  - `pendingSatoshi` (integer):
  - `utxoCount` (integer):
  - `btcSatoshi` (integer):
  - `btcPendingSatoshi` (integer):
  - `btcUtxoCount` (integer):
  - `inscriptionSatoshi` (integer):
  - `inscriptionPendingSatoshi` (integer):
  - `inscriptionUtxoCount` (integer):

#### Response (401)
Invalid API Key


---

### List indexed transaction history for an address
<a id="list-indexed-transaction-history-for-an-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Blockchain/getTxHistoryByAddress)  

#### Description
Returns paginated transaction summaries involving the address, including transaction size, satoshi totals, block position, confirmations, and timestamp for wallet activity views.

#### Parameters
- `address` (path, string) **(required)**: Address
- `cursor` (query, integer) **(required)**: Start offset
- `size` (query, integer) **(required)**: Number of items returned

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `detail` (array):
    - `txid` (string):
    - `nIn` (integer):
    - `nOut` (integer):
    - `inSatoshi` (integer):
    - `outSatoshi` (integer):
    - `locktime` (integer):
    - `size` (integer):
    - `witOffset` (integer):
    - `height` (integer):
    - `idx` (integer):
    - `blkid` (string):
    - `confirmations` (integer):
    - `timestamp` (integer):
  - `start` (integer):
  - `total` (integer):

#### Response (401)
Invalid API Key


---

### List UTXOs for an address
<a id="list-utxos-for-an-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/utxo-data`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Blockchain/getUtxoDataByAddress)  

#### Description
Returns paginated UTXO records with confirmed, unconfirmed, and unconfirmed-spend totals. Each UTXO includes address, satoshi value, script data, inscriptions, RBF marker, and output coordinates.

#### Parameters
- `address` (path, string) **(required)**: Address
- `cursor` (query, integer) **(required)**: Start offset
- `size` (query, integer) **(required)**: Number of items returned

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `cursor` (integer):
  - `total` (integer):
  - `totalConfirmed` (integer):
  - `totalUnconfirmed` (integer):
  - `totalUnconfirmedSpend` (integer):
  - `utxo` (array):
    - `address` (string):
    - `codeType` (integer):
    - `height` (integer):
    - `idx` (integer):
    - `inscriptions` (array):
      - `inscriptionId` (string):
      - `inscriptionNumber` (integer):
      - `isBRC20` (boolean):
      - `moved` (boolean):
      - `offset` (integer):
    - `isOpInRBF` (boolean): example: `false`
    - `satoshi` (integer): example: `10000`
    - `scriptPk` (string):
    - `scriptType` (string):
    - `txid` (string):
    - `vout` (integer): example: `0`
    - `isLowFee` (boolean): Whether the UTXO has a low fee rate (less than 1 sat/vB)

#### Response (401)
Invalid API Key


---

### List all indexed UTXOs for an address
<a id="list-all-indexed-utxos-for-an-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/all-utxo-data`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Blockchain/getAllUtxoDataByAddress)  

#### Description
Returns paginated UTXO records and aggregate totals across confirmed, unconfirmed, and unconfirmed-spend states, including inscription and low-fee metadata when indexed.

#### Parameters
- `address` (path, string) **(required)**: Address
- `cursor` (query, integer) **(required)**: Start offset
- `size` (query, integer) **(required)**: Number of items returned

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `cursor` (integer):
  - `total` (integer):
  - `totalConfirmed` (integer):
  - `totalUnconfirmed` (integer):
  - `totalUnconfirmedSpend` (integer):
  - `utxo` (array):
    - `address` (string):
    - `codeType` (integer):
    - `height` (integer):
    - `idx` (integer):
    - `inscriptions` (array):
      - `inscriptionId` (string):
      - `inscriptionNumber` (integer):
      - `isBRC20` (boolean):
      - `moved` (boolean):
      - `offset` (integer):
    - `isOpInRBF` (boolean): example: `false`
    - `satoshi` (integer): example: `10000`
    - `scriptPk` (string):
    - `scriptType` (string):
    - `txid` (string):
    - `vout` (integer): example: `0`
    - `isLowFee` (boolean): Whether the UTXO has a low fee rate (less than 1 sat/vB)

#### Response (401)
Invalid API Key


---

### Get address balance grouped by available and unavailable UTXOs
<a id="get-address-balance-grouped-by-available-and-unavailable-utxos"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/available-balance`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Blockchain/getAvailableBalanceByAddress)  

#### Description
Returns total, available, and unavailable satoshi balances with matching UTXO counts. The optional low-fee flag controls whether UTXOs below 1 sat/vB are included in availability calculations.

#### Parameters
- `address` (path, string) **(required)**: Address
- `withLowFee` (query, boolean): Whether to include UTXOs balance with low fee rate (less than 1 sat/vB)

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `totalBalance` (integer):
  - `totalUtxoCount` (integer):
  - `availableBalance` (integer):
  - `availableUtxoCount` (integer):
  - `unavailableBalance` (integer):
  - `unavailableUtxoCount` (integer):

#### Response (401)
Invalid API Key


---

### List available UTXOs for an address
<a id="list-available-utxos-for-an-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/available-utxo-data`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Blockchain/getAvailableUtxoDataByAddress)  

#### Description
Returns paginated UTXOs considered available for spending, along with aggregate confirmed, unconfirmed, and unconfirmed-spend totals. The low-fee option controls inclusion of UTXOs below 1 sat/vB.

#### Parameters
- `address` (path, string) **(required)**: Address
- `cursor` (query, integer) **(required)**: Start offset
- `size` (query, integer) **(required)**: Number of items returned
- `withLowFee` (query, boolean): Whether to include UTXOs with low fee rate (less than 1 sat/vB)

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `cursor` (integer):
  - `total` (integer):
  - `totalConfirmed` (integer):
  - `totalUnconfirmed` (integer):
  - `totalUnconfirmedSpend` (integer):
  - `utxo` (array):
    - `address` (string):
    - `codeType` (integer):
    - `height` (integer):
    - `idx` (integer):
    - `inscriptions` (array):
      - `inscriptionId` (string):
      - `inscriptionNumber` (integer):
      - `isBRC20` (boolean):
      - `moved` (boolean):
      - `offset` (integer):
    - `isOpInRBF` (boolean): example: `false`
    - `satoshi` (integer): example: `10000`
    - `scriptPk` (string):
    - `scriptType` (string):
    - `txid` (string):
    - `vout` (integer): example: `0`
    - `isLowFee` (boolean): Whether the UTXO has a low fee rate (less than 1 sat/vB)

#### Response (401)
Invalid API Key


---

