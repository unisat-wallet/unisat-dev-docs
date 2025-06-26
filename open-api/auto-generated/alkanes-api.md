# Alkanes API

The Alkanes API is developed by the UniSat team, providing a simplified and developer-friendly interface based on the official Alkanes indexer (kungfuflex/alkanes).  It is built on specific versions of metashrew and alkanes-rs to ensure compatibility and consistency.  We welcome feedback and suggestions for improvement.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---

## 📑 Table of Contents

- [Get alkanes status](#get-alkanes-status)
- [Get alkanes list](#get-alkanes-list)
- [Get alkane info by alkaneid](#get-alkane-info-by-alkaneid)
- [Get alkanes token list](#get-alkanes-token-list)
- [Get alkanes holders by alkaneid](#get-alkanes-holders-by-alkaneid)
- [Get collection items](#get-collection-items)
- [Get contract events](#get-contract-events)
- [Get alkanes utxo balance](#get-alkanes-utxo-balance)
- [Get utxo alkanes balance by address and alkaneid](#get-utxo-alkanes-balance-by-address-and-alkaneid)
- [Get address alkanes token list](#get-address-alkanes-token-list)
- [Get address alkanes collection list](#get-address-alkanes-collection-list)
- [Get address collection items by alkaneid](#get-address-collection-items-by-alkaneid)
- [Get transfer history](#get-transfer-history)

---

## Get alkanes status
**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/status`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAlkanesStatus)  

### Description
Get alkanes global status

### Response (200)
- `code` (integer):  (example: `0`)
- `msg` (string):  (example: ``)
- `data` (object):
  - `bestHeight` (integer): 
  - `alkanes` (integer):  (example: `100`)

### Notes

This endpoint is used to monitor the indexer’s sync status.

- `alkanes` indicates the total number of recognized Alkanes currently indexed by the system.
- `bestHeight` represents the current height the indexer has processed. This value may lag behind the actual blockchain height. If `bestHeight` remains significantly behind the blockchain tip, it may indicate a synchronization issue, and the indexed data might be outdated.

---

## Get alkanes list
**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/info-list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAlkanesInfoList)  

### Parameters
- `type` (query) : search by type,optional
- `sortBy` (query) : sort by timestamp, alkaneid, default=timestamp
- `order` (query) : sort order,optional,default=asc
- `start` (query) : default=0
- `limit` (query) : min=1,max=500,default=10

### Response (200)
- `code` (integer):  (example: `0`)
- `msg` (string):  (example: ``)
- `data` (object):
  - `total` (integer):  (example: `3045`)
  - `start` (integer):  (example: `0`)
  - `detail` (array):
    - `alkaneid` (string):  (example: `2583283:1333`)
    - `height` (integer):  (example: `2583283`)
    - `txid` (string): 
    - `timestamp` (integer): 
    - `type` (string): 
    - `logo` (string): 
    - `tokenData` (object):
      - `name` (string):  (example: `MyToken`)
      - `symbol` (string):  (example: `MTK`)
      - `divisibility` (integer):  (example: `0`)
      - `totalSupply` (string):  (example: `1000000`)
      - `maxSupply` (string):  (example: `1000000`)
      - `premine` (string):  (example: `100000`)
      - `perMint` (string):  (example: `1000`)
      - `cap` (string):  (example: `10000000`)
      - `minted` (string):  (example: `500000`)
      - `mintable` (boolean): 
      - `holders` (integer):  (example: `100`)
    - `nftData` (object):
      - `name` (string):  (example: `MyNFT`)
      - `attributes` (object): 
      - `contentType` (string): 
      - `contentUrl` (string): 
      - `collectionId` (string): 
    - `collectionData` (object):
      - `name` (string):  (example: `MyCollection`)
      - `totalSupply` (string):  (example: `1000`)
      - `maxSupply` (string):  (example: `1000`)
      - `minted` (integer): 
      - `holders` (integer): 

---

## Get alkane info by alkaneid
**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/{alkaneid}/info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAlkanesInfo)  

### Parameters
- `alkaneid` (path) **(required)**: 

### Response (200)
- `code` (integer):  (example: `0`)
- `msg` (string):  (example: ``)
- `data` (object):
  - `alkaneid` (string):  (example: `2583283:1333`)
  - `height` (integer):  (example: `2583283`)
  - `txid` (string): 
  - `timestamp` (integer): 
  - `type` (string): 
  - `logo` (string): 
  - `tokenData` (object):
    - `name` (string):  (example: `MyToken`)
    - `symbol` (string):  (example: `MTK`)
    - `divisibility` (integer):  (example: `0`)
    - `totalSupply` (string):  (example: `1000000`)
    - `maxSupply` (string):  (example: `1000000`)
    - `premine` (string):  (example: `100000`)
    - `perMint` (string):  (example: `1000`)
    - `cap` (string):  (example: `10000000`)
    - `minted` (string):  (example: `500000`)
    - `mintable` (boolean): 
    - `holders` (integer):  (example: `100`)
  - `nftData` (object):
    - `name` (string):  (example: `MyNFT`)
    - `attributes` (object): 
    - `contentType` (string): 
    - `contentUrl` (string): 
    - `collectionId` (string): 
  - `collectionData` (object):
    - `name` (string):  (example: `MyCollection`)
    - `totalSupply` (string):  (example: `1000`)
    - `maxSupply` (string):  (example: `1000`)
    - `minted` (integer): 
    - `holders` (integer): 

---

## Get alkanes token list
**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/token-list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAlkanesTokenList)  

### Parameters
- `alkaneid` (query) : search by alkaneid
- `name` (query) : search by name
- `sortBy` (query) : sort by timestamp, alkaneid, default=timestamp
- `order` (query) : sort order,optional,default=asc
- `start` (query) : default=0
- `limit` (query) : min=1,max=500,default=10

### Response (200)
- `code` (integer):  (example: `0`)
- `msg` (string):  (example: ``)
- `data` (object):
  - `total` (integer):  (example: `3045`)
  - `start` (integer):  (example: `0`)
  - `detail` (array):
    - `alkaneid` (string):  (example: `2583283:1333`)
    - `height` (integer):  (example: `2583283`)
    - `txid` (string): 
    - `timestamp` (integer): 
    - `type` (string): 
    - `logo` (string): 
    - `tokenData` (object):
      - `name` (string):  (example: `MyToken`)
      - `symbol` (string):  (example: `MTK`)
      - `divisibility` (integer):  (example: `0`)
      - `totalSupply` (string):  (example: `1000000`)
      - `maxSupply` (string):  (example: `1000000`)
      - `premine` (string):  (example: `100000`)
      - `perMint` (string):  (example: `1000`)
      - `cap` (string):  (example: `10000000`)
      - `minted` (string):  (example: `500000`)
      - `mintable` (boolean): 
      - `holders` (integer):  (example: `100`)
    - `nftData` (object):
      - `name` (string):  (example: `MyNFT`)
      - `attributes` (object): 
      - `contentType` (string): 
      - `contentUrl` (string): 
      - `collectionId` (string): 
    - `collectionData` (object):
      - `name` (string):  (example: `MyCollection`)
      - `totalSupply` (string):  (example: `1000`)
      - `maxSupply` (string):  (example: `1000`)
      - `minted` (integer): 
      - `holders` (integer): 

---

## Get alkanes holders by alkaneid
**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/{alkaneid}/holders`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAlkanesHolders)  

### Parameters
- `alkaneid` (path) **(required)**: 
- `start` (query) : Start offset
- `limit` (query) : min=1,max=500,default=10

### Response (200)
- `code` (integer):  (example: `0`)
- `msg` (string):  (example: ``)
- `data` (object):
  - `total` (integer):  (example: `1`)
  - `start` (integer):  (example: `0`)
  - `detail` (array):
    - `address` (string): 
    - `amount` (string):  (example: `10000`)

---

## Get collection items
**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/{alkaneid}/collection-items`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAlkanesCollectionItems)  

### Parameters
- `alkaneid` (path) **(required)**: 
- `start` (query) : default=0
- `limit` (query) : min=1,max=500,default=10

### Response (200)
- `code` (integer):  (example: `0`)
- `msg` (string):  (example: ``)
- `data` (object):
  - `total` (integer): 
  - `start` (integer): 
  - `detail` (array):
    - `alkaneid` (string):  (example: `2583283:1333`)
    - `height` (integer):  (example: `2583283`)
    - `txid` (string): 
    - `timestamp` (integer): 
    - `type` (string): 
    - `logo` (string): 
    - `tokenData` (object):
      - `name` (string):  (example: `MyToken`)
      - `symbol` (string):  (example: `MTK`)
      - `divisibility` (integer):  (example: `0`)
      - `totalSupply` (string):  (example: `1000000`)
      - `maxSupply` (string):  (example: `1000000`)
      - `premine` (string):  (example: `100000`)
      - `perMint` (string):  (example: `1000`)
      - `cap` (string):  (example: `10000000`)
      - `minted` (string):  (example: `500000`)
      - `mintable` (boolean): 
      - `holders` (integer):  (example: `100`)
    - `nftData` (object):
      - `name` (string):  (example: `MyNFT`)
      - `attributes` (object): 
      - `contentType` (string): 
      - `contentUrl` (string): 
      - `collectionId` (string): 
    - `collectionData` (object):
      - `name` (string):  (example: `MyCollection`)
      - `totalSupply` (string):  (example: `1000`)
      - `maxSupply` (string):  (example: `1000`)
      - `minted` (integer): 
      - `holders` (integer): 

---

## Get contract events
**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/{alkaneid}/contract-events`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAlkanesContractEvents)  

### Parameters
- `alkaneid` (path) **(required)**: 
- `fromHeight` (query) **(required)**: search by from height
- `toHeight` (query) **(required)**: search by to height
- `start` (query) : default=0
- `limit` (query) : min=1,max=500,default=10

### Response (200)
- `code` (integer):  (example: `0`)
- `msg` (string):  (example: ``)
- `data` (object):
  - `total` (integer): 
  - `start` (integer): 
  - `detail` (array):
    - `alkaneid` (string): 
    - `caller` (string): 
    - `type` (string): 
    - `opcode` (string): 
    - `fuel` (string): 
    - `inputs` (array):

    - `status` (string): 
    - `height` (integer): 
    - `txid` (string): 
    - `vout` (integer): 

---

## Get alkanes utxo balance
**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/utxo/{txid}/{index}/balance`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAlkanesUtxoBalance)  

### Parameters
- `txid` (path) **(required)**: 
- `index` (path) **(required)**: 

### Response (200)
- `code` (integer):  (example: `0`)
- `msg` (string):  (example: ``)
- `data` (array):
  - `alkaneid` (string): 
  - `amount` (string): 
  - `type` (object):

  - `logo` (string): 
  - `tokenData` (object):
    - `name` (string):  (example: `MyToken`)
    - `symbol` (string):  (example: `MTK`)
    - `divisibility` (integer):  (example: `0`)
    - `totalSupply` (string):  (example: `1000000`)
    - `maxSupply` (string):  (example: `1000000`)
    - `premine` (string):  (example: `100000`)
    - `perMint` (string):  (example: `1000`)
    - `cap` (string):  (example: `10000000`)
    - `minted` (string):  (example: `500000`)
    - `mintable` (boolean): 
    - `holders` (integer):  (example: `100`)
  - `nftData` (object):
    - `name` (string):  (example: `MyNFT`)
    - `attributes` (object): 
    - `contentType` (string): 
    - `contentUrl` (string): 
    - `collectionId` (string): 
  - `collectionData` (object):
    - `name` (string):  (example: `MyCollection`)
    - `totalSupply` (string):  (example: `1000`)
    - `maxSupply` (string):  (example: `1000`)
    - `minted` (integer): 
    - `holders` (integer): 

---

## Get utxo alkanes balance by address and alkaneid
**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/alkanes/{alkaneid}/utxo`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAddressAlkanesUtxo)  

### Parameters
- `address` (path) **(required)**: 
- `alkaneid` (path) **(required)**: 
- `start` (query) : default=0
- `limit` (query) : min=1,max=500,default=10

### Response (200)
- `code` (integer):  (example: `0`)
- `msg` (string):  (example: ``)
- `data` (object): 

---

## Get address alkanes token list
**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/alkanes/token-list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAddressAlkanesTokenList)  

### Parameters
- `address` (path) **(required)**: 
- `start` (query) : default=0
- `limit` (query) : min=1,max=500,default=10

### Response (200)
- `code` (integer):  (example: `0`)
- `msg` (string):  (example: ``)
- `data` (object):
  - `total` (integer):  (example: `3045`)
  - `start` (integer):  (example: `0`)
  - `detail` (array):
    - `alkaneid` (string):  (example: `2583283:1333`)
    - `height` (integer):  (example: `2583283`)
    - `txid` (string): 
    - `timestamp` (integer): 
    - `type` (string): 
    - `logo` (string): 
    - `tokenData` (object):
      - `name` (string):  (example: `MyToken`)
      - `symbol` (string):  (example: `MTK`)
      - `divisibility` (integer):  (example: `0`)
      - `totalSupply` (string):  (example: `1000000`)
      - `maxSupply` (string):  (example: `1000000`)
      - `premine` (string):  (example: `100000`)
      - `perMint` (string):  (example: `1000`)
      - `cap` (string):  (example: `10000000`)
      - `minted` (string):  (example: `500000`)
      - `mintable` (boolean): 
      - `holders` (integer):  (example: `100`)
    - `nftData` (object):
      - `name` (string):  (example: `MyNFT`)
      - `attributes` (object): 
      - `contentType` (string): 
      - `contentUrl` (string): 
      - `collectionId` (string): 
    - `collectionData` (object):
      - `name` (string):  (example: `MyCollection`)
      - `totalSupply` (string):  (example: `1000`)
      - `maxSupply` (string):  (example: `1000`)
      - `minted` (integer): 
      - `holders` (integer): 

---

## Get address alkanes collection list
**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/alkanes/collection-list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAddressAlkanesCollectionList)  

### Parameters
- `address` (path) **(required)**: 
- `start` (query) : default=0
- `limit` (query) : min=1,max=500,default=10

### Response (200)
- `code` (integer):  (example: `0`)
- `msg` (string):  (example: ``)
- `data` (object):
  - `total` (integer):  (example: `3045`)
  - `start` (integer):  (example: `0`)
  - `detail` (array):
    - `alkaneid` (string):  (example: `2583283:1333`)
    - `height` (integer):  (example: `2583283`)
    - `txid` (string): 
    - `timestamp` (integer): 
    - `type` (string): 
    - `logo` (string): 
    - `tokenData` (object):
      - `name` (string):  (example: `MyToken`)
      - `symbol` (string):  (example: `MTK`)
      - `divisibility` (integer):  (example: `0`)
      - `totalSupply` (string):  (example: `1000000`)
      - `maxSupply` (string):  (example: `1000000`)
      - `premine` (string):  (example: `100000`)
      - `perMint` (string):  (example: `1000`)
      - `cap` (string):  (example: `10000000`)
      - `minted` (string):  (example: `500000`)
      - `mintable` (boolean): 
      - `holders` (integer):  (example: `100`)
    - `nftData` (object):
      - `name` (string):  (example: `MyNFT`)
      - `attributes` (object): 
      - `contentType` (string): 
      - `contentUrl` (string): 
      - `collectionId` (string): 
    - `collectionData` (object):
      - `name` (string):  (example: `MyCollection`)
      - `totalSupply` (string):  (example: `1000`)
      - `maxSupply` (string):  (example: `1000`)
      - `minted` (integer): 
      - `holders` (integer): 

---

## Get address collection items by alkaneid
**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/alkanes/{alkaneid}/collection-items`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAddressAlkanesCollectionItems)  

### Parameters
- `address` (path) **(required)**: 
- `alkaneid` (path) **(required)**: 
- `start` (query) : default=0
- `limit` (query) : min=1,max=500,default=10

### Response (200)
- `code` (integer):  (example: `0`)
- `msg` (string):  (example: ``)
- `data` (object):
  - `total` (integer):  (example: `3045`)
  - `start` (integer):  (example: `0`)
  - `detail` (array):
    - `alkaneid` (string):  (example: `2583283:1333`)
    - `height` (integer):  (example: `2583283`)
    - `txid` (string): 
    - `timestamp` (integer): 
    - `type` (string): 
    - `logo` (string): 
    - `tokenData` (object):
      - `name` (string):  (example: `MyToken`)
      - `symbol` (string):  (example: `MTK`)
      - `divisibility` (integer):  (example: `0`)
      - `totalSupply` (string):  (example: `1000000`)
      - `maxSupply` (string):  (example: `1000000`)
      - `premine` (string):  (example: `100000`)
      - `perMint` (string):  (example: `1000`)
      - `cap` (string):  (example: `10000000`)
      - `minted` (string):  (example: `500000`)
      - `mintable` (boolean): 
      - `holders` (integer):  (example: `100`)
    - `nftData` (object):
      - `name` (string):  (example: `MyNFT`)
      - `attributes` (object): 
      - `contentType` (string): 
      - `contentUrl` (string): 
      - `collectionId` (string): 
    - `collectionData` (object):
      - `name` (string):  (example: `MyCollection`)
      - `totalSupply` (string):  (example: `1000`)
      - `maxSupply` (string):  (example: `1000`)
      - `minted` (integer): 
      - `holders` (integer): 

---

## Get transfer history
**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/alkanes/{alkaneid}/transfer-history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAddressAlkanesTransferHistory)  

### Parameters
- `address` (path) **(required)**: 
- `alkaneid` (path) **(required)**: 
- `fromHeight` (query) **(required)**: search by from height
- `toHeight` (query) **(required)**: search by to height
- `start` (query) : default=0
- `limit` (query) : min=1,max=500,default=10

### Response (200)
- `code` (integer):  (example: `0`)
- `msg` (string):  (example: ``)
- `data` (object):
  - `total` (integer):  (example: `3045`)
  - `start` (integer):  (example: `0`)
  - `detail` (array):
    - `height` (integer): 
    - `txid` (string): 
    - `type` (string): 
    - `subType` (string): 
    - `alkaneid` (string): 
    - `address` (string): 
    - `amount` (string):  (example: `10000`)

---

