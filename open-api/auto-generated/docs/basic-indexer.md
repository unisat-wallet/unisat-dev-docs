# Basic Indexer API

Basic Indexer API is a RESTful API for accessing Bitcoin blockchain data. It provides endpoints to retrieve information about blocks, transactions, addresses, and more. The API supports both mainnet and testnet environments.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---

## 📑 Table of Contents

- [Blocks](#blocks)
  - [Get Blockchain Info](#get-blockchain-info)
  - [Get Recommended Fees](#get-recommended-fees)
  - [Get block info by height](#get-block-info-by-height)
  - [Get block info by blockid](#get-block-info-by-blockid)
  - [Get txs by block height.](#get-txs-by-block-height)
- [Transactions](#transactions)
  - [Get tx info by txid](#get-tx-info-by-txid)
  - [Get the inputs of a tx](#get-the-inputs-of-a-tx)
  - [Get the outputs of a tx](#get-the-outputs-of-a-tx)
  - [Get the raw tx by txid](#get-the-raw-tx-by-txid)
  - [Get the UTXO by txid and index](#get-the-utxo-by-txid-and-index)
  - [Push rawtx to bitcoin node.](#push-rawtx-to-bitcoin-node)
  - [Push rawtxs to bitcoin node.](#push-rawtxs-to-bitcoin-node)
- [Addresses](#addresses)
  - [Get the balance by address](#get-the-balance-by-address)
  - [Get transaction history by address](#get-transaction-history-by-address)
  - [Get UTXO list by address](#get-utxo-list-by-address)
  - [Get available balance by address](#get-available-balance-by-address)
  - [Get available UTXO list by address](#get-available-utxo-list-by-address)

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


---

### Get Recommended Fees
<a id="get-recommended-fees"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/fees/recommended`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Blocks/getRecommendedFees)  

#### Description
Get the recommended fees for different confirmation times. (like mempool.space)

#### Response (200)


---

### Get block info by height
<a id="get-block-info-by-height"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/height/{height}/block`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Blocks/getBlockByHeight)  

#### Description
Get block info by height.

#### Parameters
- `height` (path) **(required)**: Block height

#### Response (200)


---

### Get block info by blockid
<a id="get-block-info-by-blockid"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/block/id/{blockid}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Blocks/getBlockById)  

#### Description
Get block info by blockid.

#### Parameters
- `blockid` (path) **(required)**: Block id

#### Response (200)


---

### Get txs by block height.
<a id="get-txs-by-block-height"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/block/{height}/txs`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Blocks/getTxsByBlockHeight)  

#### Description
Get txs by block height.

#### Parameters
- `height` (path) **(required)**: Block height
- `cursor` (query) **(required)**: Start offset
- `size` (query) **(required)**: Number of items returned

#### Response (200)


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
- `txid` (path) **(required)**: Tx id

#### Response (200)


---

### Get the inputs of a tx
<a id="get-the-inputs-of-a-tx"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/tx/{txid}/ins`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Transactions/getInputsByTxId)  

#### Description
Get the inputs of a tx.

#### Parameters
- `txid` (path) **(required)**: Tx id
- `cursor` (query) **(required)**: Start offset
- `size` (query) **(required)**: Number of items returned

#### Response (200)


---

### Get the outputs of a tx
<a id="get-the-outputs-of-a-tx"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/tx/{txid}/outs`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Transactions/getOutputsByTxId)  

#### Description
Get the outputs of a tx.

#### Parameters
- `txid` (path) **(required)**: Tx id
- `cursor` (query) **(required)**: Start offset
- `size` (query) **(required)**: Number of items returned

#### Response (200)


---

### Get the raw tx by txid
<a id="get-the-raw-tx-by-txid"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/rawtx/{txid}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Transactions/getRawTxById)  

#### Description
Get the raw tx by txid.

#### Parameters
- `txid` (path) **(required)**: Tx id

#### Response (200)


---

### Get the UTXO by txid and index
<a id="get-the-utxo-by-txid-and-index"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/utxo/{txid}/{index}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Transactions/getUtxoByTxIdAndIndex)  

#### Description
Get the UTXO by txid and index.

#### Parameters
- `txid` (path) **(required)**: Tx id
- `index` (path) **(required)**: Tx id

#### Response (200)


### Notes

@@

---

### Push rawtx to bitcoin node.
<a id="push-rawtx-to-bitcoin-node"></a>

**Method**: `POST`  
**Path**: `/v1/indexer/local_pushtx`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Transactions/localPushTx)  

#### Description
Push rawtx to bitcoin node.

#### Response (200)


---

### Push rawtxs to bitcoin node.
<a id="push-rawtxs-to-bitcoin-node"></a>

**Method**: `POST`  
**Path**: `/v1/indexer/local_pushtxs`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Transactions/localPushTxs)  

#### Description
Push rawtxs to bitcoin node.

#### Response (200)


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
- `address` (path) **(required)**: Address

#### Response (200)


---

### Get transaction history by address
<a id="get-transaction-history-by-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Addresses/getTxHistoryByAddress)  

#### Description
Get transaction history by address.

#### Parameters
- `address` (path) **(required)**: Address
- `cursor` (query) **(required)**: Start offset
- `size` (query) **(required)**: Number of items returned

#### Response (200)


---

### Get UTXO list by address
<a id="get-utxo-list-by-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/utxo-data`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Addresses/getUtxoDataByAddress)  

#### Description
Retrieve the UTXOs of an address that do not contain inscriptions. Note that this excludes, but does not completely cover, assets from protocols such as Alkanes, Runes, and others. To obtain the UTXOs of an address that are available for spending as BTC, please use the available-utxo endpoint.

#### Parameters
- `address` (path) **(required)**: Address
- `cursor` (query) **(required)**: Start offset
- `size` (query) **(required)**: Number of items returned

#### Response (200)


---

### Get available balance by address
<a id="get-available-balance-by-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/available-balance`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Addresses/getAvailableBalanceByAddress)  

#### Description
This interface will return the current address's available balance that can be used for BTC spending. Balances of assets such as inscriptions, runes, and alkanes will not be included.

#### Parameters
- `address` (path) **(required)**: Address

#### Response (200)


---

### Get available UTXO list by address
<a id="get-available-utxo-list-by-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/available-utxo-data`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Addresses/getAvailableUtxoDataByAddress)  

#### Description
This interface will return the current address's available UTXO list that can be used for BTC spending. UTXOs of assets such as inscriptions, runes, and alkanes will not be included. The UTXO management tool (https://unisat.io/utxo) can unlock these UTXOs, making them available again. Additionally, UTXOs with less than 600 satoshis will not be returned to avoid potential unspendable outputs from unrecognized asset protocols or burns.

#### Parameters
- `address` (path) **(required)**: Address
- `cursor` (query) **(required)**: Start offset
- `size` (query) **(required)**: Number of items returned

#### Response (200)


---

