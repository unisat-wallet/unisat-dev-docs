# Blockchain API

Blockchain API is a RESTful API for accessing Bitcoin blockchain data. It provides endpoints to retrieve information about blocks, transactions, addresses, and more. The API supports both mainnet and testnet environments.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [GET `/v1/indexer/blockchain/info`](#get-blockchain-info) | Get Blockchain Info |
| [GET `/v1/indexer/fees/recommended`](#get-recommended-fees) | Get Recommended Fees |
| [GET `/v1/indexer/height/(height)/block`](#get-block-info-by-height) | Get block info by height |
| [GET `/v1/indexer/block/id/(blockid)`](#get-block-info-by-blockid) | Get block info by blockid |
| [GET `/v1/indexer/block/(height)/txs`](#get-txs-by-block-height) | Get txs by block height. |
| [GET `/v1/indexer/tx/(txid)`](#get-tx-info-by-txid) | Get tx info by txid |
| [GET `/v1/indexer/tx/(txid)/ins`](#get-the-inputs-of-a-tx) | Get the inputs of a tx |
| [GET `/v1/indexer/tx/(txid)/outs`](#get-the-outputs-of-a-tx) | Get the outputs of a tx |
| [GET `/v1/indexer/rawtx/(txid)`](#get-the-raw-tx-by-txid) | Get the raw tx by txid |
| [GET `/v1/indexer/utxo/(txid)/(index)`](#get-the-utxo-by-txid-and-index) | Get the UTXO by txid and index |
| [POST `/v1/indexer/local_pushtx`](#push-rawtx-to-bitcoin-node) | Push rawtx to bitcoin node. |
| [POST `/v1/indexer/local_pushtxs`](#push-rawtxs-to-bitcoin-node) | Push rawtxs to bitcoin node. |
| [GET `/v1/indexer/address/(address)/balance`](#get-the-balance-by-address) | Get the balance by address |
| [GET `/v1/indexer/address/(address)/history`](#get-transaction-history-by-address) | Get transaction history by address |
| [GET `/v1/indexer/address/(address)/utxo-data`](#get-btcutxo-list-by-address) | Get BTCUTXO list by address |
| [GET `/v1/indexer/address/(address)/all-utxo-data`](#get-all-utxo-list-by-address) | Get all UTXO list by address |
| [GET `/v1/indexer/address/(address)/available-balance`](#get-available-balance-by-address) | Get available balance by address |
| [GET `/v1/indexer/address/(address)/available-utxo-data`](#get-available-utxo-list-by-address) | Get available UTXO list by address |

---

## Blocks

### Get Blockchain Info
<a id="get-blockchain-info"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/blockchain/info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Blocks/getBlockchainInfo)  

#### Description
Get the current blockchain information, including chain type, block count, and best block hash.


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

### Get Recommended Fees
<a id="get-recommended-fees"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/fees/recommended`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Blocks/getRecommendedFees)  

#### Description
Get the recommended fees for different confirmation times. (like mempool.space)

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

### Get block info by height
<a id="get-block-info-by-height"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/height/{height}/block`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Blocks/getBlockByHeight)  

#### Description
Get block info by height.

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

### Get block info by blockid
<a id="get-block-info-by-blockid"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/block/id/{blockid}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Blocks/getBlockById)  

#### Description
Get block info by blockid.

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

### Get txs by block height.
<a id="get-txs-by-block-height"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/block/{height}/txs`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Blocks/getTxsByBlockHeight)  

#### Description
Get txs by block height.

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

## Transactions

### Get tx info by txid
<a id="get-tx-info-by-txid"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/tx/{txid}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Transactions/getTxById)  

#### Description
Get tx info by txid.

#### Parameters
- `txid` (path, string) **(required)**: Transaction ID

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

### Get the inputs of a tx
<a id="get-the-inputs-of-a-tx"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/tx/{txid}/ins`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Transactions/getInputsByTxId)  

#### Description
Get the inputs of a tx.

#### Parameters
- `txid` (path, string) **(required)**: Transaction ID
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

### Get the outputs of a tx
<a id="get-the-outputs-of-a-tx"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/tx/{txid}/outs`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Transactions/getOutputsByTxId)  

#### Description
Get the outputs of a tx.

#### Parameters
- `txid` (path, string) **(required)**: Transaction ID
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

### Get the raw tx by txid
<a id="get-the-raw-tx-by-txid"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/rawtx/{txid}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Transactions/getRawTxById)  

#### Description
Get the raw tx by txid.

#### Parameters
- `txid` (path, string) **(required)**: Transaction ID

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (string):

#### Response (401)
Invalid API Key


---

### Get the UTXO by txid and index
<a id="get-the-utxo-by-txid-and-index"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/utxo/{txid}/{index}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Transactions/getUtxoByTxIdAndIndex)  

#### Description
Get the UTXO by txid and index.

#### Parameters
- `txid` (path, string) **(required)**: Transaction ID
- `index` (path, string) **(required)**: Output index (vout) of the transaction

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

### Push rawtx to bitcoin node.
<a id="push-rawtx-to-bitcoin-node"></a>

**Method**: `POST`  
**Path**: `/v1/indexer/local_pushtx`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Transactions/localPushTx)  

#### Description
Push rawtx to bitcoin node.

#### Request Body
Content-Type: `application/json` **(required)**

- `txHex` (string): rawtx; example: `""`
- `maxFeeRate` (number): Maximum fee rate in BTC/kvB. Optional; must be less than 1 BTC/kvB.

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (string):

#### Response (401)
Invalid API Key


---

### Push rawtxs to bitcoin node.
<a id="push-rawtxs-to-bitcoin-node"></a>

**Method**: `POST`  
**Path**: `/v1/indexer/local_pushtxs`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Transactions/localPushTxs)  

#### Description
Push rawtxs to bitcoin node.

#### Request Body
Content-Type: `application/json` **(required)**

- `txsHex` (array):
- `maxFeeRate` (number): Maximum fee rate in BTC/kvB. Optional; must be less than 1 BTC/kvB.

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (array):

#### Response (401)
Invalid API Key


---

## Addresses

### Get the balance by address
<a id="get-the-balance-by-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/balance`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Addresses/getBalanceByAddress)  

#### Description
Get the balance by address.

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

### Get transaction history by address
<a id="get-transaction-history-by-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Addresses/getTxHistoryByAddress)  

#### Description
Get transaction history by address.

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

### Get BTCUTXO list by address
<a id="get-btcutxo-list-by-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/utxo-data`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Addresses/getUtxoDataByAddress)  

#### Description
Retrieve the UTXOs of an address that do not contain inscriptions. Note that this excludes, but does not completely cover, assets from protocols such as Alkanes, Runes, and others. To obtain the UTXOs of an address that are available for spending as BTC, please use the available-utxo endpoint.

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

### Get all UTXO list by address
<a id="get-all-utxo-list-by-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/all-utxo-data`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Addresses/getAllUtxoDataByAddress)  

#### Description
Retrieve all UTXOs of an address.

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

### Get available balance by address
<a id="get-available-balance-by-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/available-balance`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Addresses/getAvailableBalanceByAddress)  

#### Description
This interface will return the current address's available balance that can be used for BTC spending. Balances of assets such as inscriptions, runes, and alkanes will not be included.

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

### Get available UTXO list by address
<a id="get-available-utxo-list-by-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/available-utxo-data`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Addresses/getAvailableUtxoDataByAddress)  

#### Description
This interface will return the current address's available UTXO list that can be used for BTC spending. UTXOs of assets such as inscriptions, runes, and alkanes will not be included. The UTXO management tool (https://unisat.io/utxo) can unlock these UTXOs, making them available again. Additionally, UTXOs with less than 600 satoshis will not be returned to avoid potential unspendable outputs from unrecognized asset protocols or burns.

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

