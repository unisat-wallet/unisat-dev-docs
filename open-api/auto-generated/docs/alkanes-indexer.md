# Alkanes Indexer API

The Alkanes Indexer API is developed by the UniSat team, providing a simplified and developer-friendly interface based on the official Alkanes indexer (kungfuflex/alkanes).  It is built on specific versions of metashrew and alkanes-rs to ensure compatibility and consistency.  We welcome feedback and suggestions for improvement.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [GET `/v1/indexer/alkanes/status`](#get-alkanes-status) | Get alkanes status |
| [GET `/v1/indexer/alkanes/info-list`](#get-alkanes-list) | Get alkanes list |
| [GET `/v1/indexer/alkanes/TODO-alkaneid/info`](#get-alkane-info-by-alkaneid) | Get alkane info by alkaneid |
| [GET `/v1/indexer/alkanes/token-list`](#get-alkanes-token-list) | Get alkanes token list |
| [GET `/v1/indexer/alkanes/TODO-alkaneid/holders`](#get-alkanes-holders-by-alkaneid) | Get alkanes holders by alkaneid |
| [GET `/v1/indexer/alkanes/TODO-alkaneid/collection-items`](#get-collection-items) | Get collection items |
| [GET `/v1/indexer/alkanes/TODO-alkaneid/contract-events`](#get-contract-events) | Get contract events |
| [GET `/v1/indexer/alkanes/utxo/TODO-txid/TODO-index/balance`](#get-alkanes-utxo-balance) | Get alkanes utxo balance |
| [GET `/v1/indexer/address/TODO-address/alkanes/TODO-alkaneid/utxo`](#get-utxo-alkanes-balance-by-address-and-alkaneid) | Get utxo alkanes balance by address and alkaneid |
| [GET `/v1/indexer/address/TODO-address/alkanes/token-list`](#get-address-alkanes-token-list) | Get address alkanes token list |
| [GET `/v1/indexer/address/TODO-address/alkanes/collection-list`](#get-address-alkanes-collection-list) | Get address alkanes collection list |
| [GET `/v1/indexer/address/TODO-address/alkanes/TODO-alkaneid/collection-items`](#get-address-collection-items-by-alkaneid) | Get address collection items by alkaneid |
| [GET `/v1/indexer/address/TODO-address/alkanes/TODO-alkaneid/transfer-history`](#get-transfer-history) | Get transfer history |

---

## Alkanes

### Get alkanes status
<a id="get-alkanes-status"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/status`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAlkanesStatus)  

#### Description
Get alkanes global status

#### Response (200)
- `code` (integer):  (example: `0`)
- `msg` (string):  (example: ``)
- `data` (object):
  - `bestHeight` (integer): 
  - `alkanes` (integer):  (example: `100`)
  - `metashrewVersion` (string): 
  - `alkanesRsVersion` (string): 

### Notes

This endpoint is used to monitor the indexer’s sync status.

- `alkanes` indicates the total number of recognized Alkanes currently indexed by the system.
- `bestHeight` represents the current height the indexer has processed. This value may lag behind the actual blockchain height. If `bestHeight` remains significantly behind the blockchain tip, it may indicate a synchronization issue, and the indexed data might be outdated.

- `metashrewVersion` The metashrewVersion field indicates the version of the Metashrew indexer being used.
  For more details, refer to the repository: https://github.com/sandshrewmetaprotocols/metashrew.

- `alkanesRsVersion` The alkanesRsVersion field indicates the version of the alkanes-rs indexer in use.
  For more information, refer to the repository: https://github.com/kungfuflex/alkanes-rs.


---

### Get alkanes list
<a id="get-alkanes-list"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/info-list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAlkanesInfoList)  

#### Parameters
- `type` (query) : search by type,optional
- `sortBy` (query) : sort by timestamp, alkaneid, default=timestamp
- `order` (query) : sort order,optional,default=asc
- `start` (query) : default=0
- `limit` (query) : min=1,max=500,default=10

#### Response (200)
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

### Get alkane info by alkaneid
<a id="get-alkane-info-by-alkaneid"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/{alkaneid}/info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAlkanesInfo)  

#### Parameters
- `alkaneid` (path) **(required)**: 

#### Response (200)
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

### Get alkanes token list
<a id="get-alkanes-token-list"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/token-list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAlkanesTokenList)  

#### Parameters
- `alkaneid` (query) : search by alkaneid
- `name` (query) : search by name
- `sortBy` (query) : sort by timestamp, alkaneid, default=timestamp
- `order` (query) : sort order,optional,default=asc
- `start` (query) : default=0
- `limit` (query) : min=1,max=500,default=10

#### Response (200)
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

### Get alkanes holders by alkaneid
<a id="get-alkanes-holders-by-alkaneid"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/{alkaneid}/holders`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAlkanesHolders)  

#### Parameters
- `alkaneid` (path) **(required)**: 
- `start` (query) : Start offset
- `limit` (query) : min=1,max=500,default=10

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

### Get collection items
<a id="get-collection-items"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/{alkaneid}/collection-items`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAlkanesCollectionItems)  

#### Parameters
- `alkaneid` (path) **(required)**: 
- `start` (query) : default=0
- `limit` (query) : min=1,max=500,default=10

#### Response (200)
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

### Get contract events
<a id="get-contract-events"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/{alkaneid}/contract-events`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAlkanesContractEvents)  

#### Parameters
- `alkaneid` (path) **(required)**: 
- `fromHeight` (query) **(required)**: search by from height
- `toHeight` (query) **(required)**: search by to height
- `start` (query) : default=0
- `limit` (query) : min=1,max=500,default=10

#### Response (200)
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

### Get alkanes utxo balance
<a id="get-alkanes-utxo-balance"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/utxo/{txid}/{index}/balance`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAlkanesUtxoBalance)  

#### Parameters
- `txid` (path) **(required)**: 
- `index` (path) **(required)**: 

#### Response (200)
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

### Get utxo alkanes balance by address and alkaneid
<a id="get-utxo-alkanes-balance-by-address-and-alkaneid"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/alkanes/{alkaneid}/utxo`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAddressAlkanesUtxo)  

#### Parameters
- `address` (path) **(required)**: 
- `alkaneid` (path) **(required)**: 
- `start` (query) : default=0
- `limit` (query) : min=1,max=500,default=10

#### Response (200)
- `code` (integer):  (example: `0`)
- `msg` (string):  (example: ``)
- `data` (object): 


---

### Get address alkanes token list
<a id="get-address-alkanes-token-list"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/alkanes/token-list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAddressAlkanesTokenList)  

#### Parameters
- `address` (path) **(required)**: 
- `start` (query) : default=0
- `limit` (query) : min=1,max=500,default=10

#### Response (200)
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

### Get address alkanes collection list
<a id="get-address-alkanes-collection-list"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/alkanes/collection-list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAddressAlkanesCollectionList)  

#### Parameters
- `address` (path) **(required)**: 
- `start` (query) : default=0
- `limit` (query) : min=1,max=500,default=10

#### Response (200)
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

### Get address collection items by alkaneid
<a id="get-address-collection-items-by-alkaneid"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/alkanes/{alkaneid}/collection-items`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAddressAlkanesCollectionItems)  

#### Parameters
- `address` (path) **(required)**: 
- `alkaneid` (path) **(required)**: 
- `start` (query) : default=0
- `limit` (query) : min=1,max=500,default=10

#### Response (200)
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

### Get transfer history
<a id="get-transfer-history"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/alkanes/{alkaneid}/transfer-history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAddressAlkanesTransferHistory)  

#### Parameters
- `address` (path) **(required)**: 
- `alkaneid` (path) **(required)**: 
- `fromHeight` (query) **(required)**: search by from height
- `toHeight` (query) **(required)**: search by to height
- `start` (query) : default=0
- `limit` (query) : min=1,max=500,default=10

#### Response (200)
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

