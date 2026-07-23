# Alkanes Indexer API

The Alkanes Indexer API is developed by the UniSat team, providing a simplified and developer-friendly interface based on the official Alkanes indexer (kungfuflex/alkanes).  It is built on specific versions of metashrew and alkanes-rs to ensure compatibility and consistency.  We welcome feedback and suggestions for improvement.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [GET `/v1/indexer/alkanes/status`](#get-alkanes-status) | Get alkanes status |
| [GET `/v1/indexer/alkanes/info-list`](#get-alkanes-list) | Get alkanes list |
| [GET `/v1/indexer/alkanes/(alkaneid)/info`](#get-alkane-info-by-alkaneid) | Get alkane info by alkaneid |
| [GET `/v1/indexer/alkanes/token-list`](#get-alkanes-token-list) | Get alkanes token list |
| [GET `/v1/indexer/alkanes/(alkaneid)/holders`](#get-alkanes-holders-by-alkaneid) | Get alkanes holders by alkaneid |
| [GET `/v1/indexer/alkanes/(alkaneid)/collection-items`](#get-collection-items) | Get collection items |
| [GET `/v1/indexer/alkanes/(alkaneid)/contract-events`](#get-contract-events) | Get contract events |
| [GET `/v1/indexer/alkanes/utxo/(txid)/(index)/balance`](#get-alkanes-utxo-balance) | Get alkanes utxo balance |
| [GET `/v1/indexer/address/(address)/alkanes/(alkaneid)/utxo`](#get-utxo-alkanes-balance-by-address-and-alkaneid) | Get utxo alkanes balance by address and alkaneid |
| [GET `/v1/indexer/address/(address)/alkanes/token-list`](#get-address-alkanes-token-list) | Get address alkanes token list |
| [GET `/v1/indexer/address/(address)/alkanes/collection-list`](#get-address-alkanes-collection-list) | Get address alkanes collection list |
| [GET `/v1/indexer/address/(address)/alkanes/(alkaneid)/collection-items`](#get-address-collection-items-by-alkaneid) | Get address collection items by alkaneid |
| [GET `/v1/indexer/address/(address)/alkanes/(alkaneid)/transfer-history`](#get-transfer-history) | Get transfer history |

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
successful operation

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `bestHeight` (integer):
  - `alkanes` (integer): example: `100`
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

#### Description
Retrieve a paginated list of Alkanes assets with optional type, sorting, and pagination filters.

#### Parameters
- `type` (query, string): search by type,optional; enum: `token`, `collection`, `nft`, `contract`
- `sortBy` (query, string): sort by timestamp, alkaneid, default=timestamp; enum: `timestamp`, `alkaneid`; default: `timestamp`
- `order` (query, string): sort order,optional,default=asc; enum: `asc`, `desc`; default: `asc`
- `start` (query, integer): default=0; example: `0`
- `limit` (query, integer): min=1,max=500,default=10; example: `10`

#### Response (200)
successful operation

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `total` (integer): example: `3045`
  - `start` (integer): example: `0`
  - `detail` (array):
    - `alkaneid` (string): example: `"2583283:1333"`
    - `height` (integer (uint64)): example: `2583283`
    - `txid` (string):
    - `timestamp` (integer):
    - `type` (string):
    - `logo` (string):
    - `tokenData` (object):
      - `name` (string): example: `"MyToken"`
      - `symbol` (string): example: `"MTK"`
      - `divisibility` (integer): example: `0`
      - `totalSupply` (string): example: `"1000000"`
      - `maxSupply` (string): example: `"1000000"`
      - `premine` (string): example: `"100000"`
      - `perMint` (string): example: `"1000"`
      - `cap` (string): example: `"10000000"`
      - `minted` (string): example: `"500000"`
      - `mintable` (boolean):
      - `holders` (integer): example: `100`
    - `nftData` (object):
      - `name` (string): example: `"MyNFT"`
      - `attributes` (object):
      - `contentType` (string):
      - `contentUrl` (string):
      - `collectionId` (string):
    - `collectionData` (object):
      - `name` (string): example: `"MyCollection"`
      - `totalSupply` (string): example: `"1000"`
      - `maxSupply` (string): example: `"1000"`
      - `minted` (integer):
      - `holders` (integer):


---

### Get alkane info by alkaneid
<a id="get-alkane-info-by-alkaneid"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/{alkaneid}/info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAlkanesInfo)  

#### Description
Retrieve detailed information for a specific Alkane asset by Alkane ID.

#### Parameters
- `alkaneid` (path, string) **(required)**: Alkane ID

#### Response (200)
successful operation

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `alkaneid` (string): example: `"2583283:1333"`
  - `height` (integer (uint64)): example: `2583283`
  - `txid` (string):
  - `timestamp` (integer):
  - `type` (string):
  - `logo` (string):
  - `tokenData` (object):
    - `name` (string): example: `"MyToken"`
    - `symbol` (string): example: `"MTK"`
    - `divisibility` (integer): example: `0`
    - `totalSupply` (string): example: `"1000000"`
    - `maxSupply` (string): example: `"1000000"`
    - `premine` (string): example: `"100000"`
    - `perMint` (string): example: `"1000"`
    - `cap` (string): example: `"10000000"`
    - `minted` (string): example: `"500000"`
    - `mintable` (boolean):
    - `holders` (integer): example: `100`
  - `nftData` (object):
    - `name` (string): example: `"MyNFT"`
    - `attributes` (object):
    - `contentType` (string):
    - `contentUrl` (string):
    - `collectionId` (string):
  - `collectionData` (object):
    - `name` (string): example: `"MyCollection"`
    - `totalSupply` (string): example: `"1000"`
    - `maxSupply` (string): example: `"1000"`
    - `minted` (integer):
    - `holders` (integer):


---

### Get alkanes token list
<a id="get-alkanes-token-list"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/token-list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAlkanesTokenList)  

#### Description
Retrieve a paginated list of Alkanes token assets with optional filters.

#### Parameters
- `alkaneid` (query, string): search by alkaneid; example: `"2:1"`
- `name` (query, string): search by name
- `sortBy` (query, string): sort by timestamp, alkaneid, default=timestamp; enum: `timestamp`, `alkaneid`; default: `timestamp`
- `order` (query, string): sort order,optional,default=asc; enum: `asc`, `desc`; default: `asc`
- `start` (query, integer): default=0; example: `0`
- `limit` (query, integer): min=1,max=500,default=10; example: `10`

#### Response (200)
successful operation

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `total` (integer): example: `3045`
  - `start` (integer): example: `0`
  - `detail` (array):
    - `alkaneid` (string): example: `"2583283:1333"`
    - `height` (integer (uint64)): example: `2583283`
    - `txid` (string):
    - `timestamp` (integer):
    - `type` (string):
    - `logo` (string):
    - `tokenData` (object):
      - `name` (string): example: `"MyToken"`
      - `symbol` (string): example: `"MTK"`
      - `divisibility` (integer): example: `0`
      - `totalSupply` (string): example: `"1000000"`
      - `maxSupply` (string): example: `"1000000"`
      - `premine` (string): example: `"100000"`
      - `perMint` (string): example: `"1000"`
      - `cap` (string): example: `"10000000"`
      - `minted` (string): example: `"500000"`
      - `mintable` (boolean):
      - `holders` (integer): example: `100`
    - `nftData` (object):
      - `name` (string): example: `"MyNFT"`
      - `attributes` (object):
      - `contentType` (string):
      - `contentUrl` (string):
      - `collectionId` (string):
    - `collectionData` (object):
      - `name` (string): example: `"MyCollection"`
      - `totalSupply` (string): example: `"1000"`
      - `maxSupply` (string): example: `"1000"`
      - `minted` (integer):
      - `holders` (integer):


---

### Get alkanes holders by alkaneid
<a id="get-alkanes-holders-by-alkaneid"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/{alkaneid}/holders`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAlkanesHolders)  

#### Description
Retrieve holders for a specific Alkane asset by Alkane ID.

#### Parameters
- `alkaneid` (path, string) **(required)**: Alkane ID
- `start` (query, integer): Start offset
- `limit` (query, integer): min=1,max=500,default=10

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

### Get collection items
<a id="get-collection-items"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/{alkaneid}/collection-items`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAlkanesCollectionItems)  

#### Description
Retrieve collection items for a specific Alkanes collection by Alkane ID.

#### Parameters
- `alkaneid` (path, string) **(required)**: Alkane ID
- `start` (query, integer): default=0; example: `0`
- `limit` (query, integer): min=1,max=500,default=10; example: `10`

#### Response (200)
successful operation

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `total` (integer):
  - `start` (integer):
  - `detail` (array):
    - `alkaneid` (string): example: `"2583283:1333"`
    - `height` (integer (uint64)): example: `2583283`
    - `txid` (string):
    - `timestamp` (integer):
    - `type` (string):
    - `logo` (string):
    - `tokenData` (object):
      - `name` (string): example: `"MyToken"`
      - `symbol` (string): example: `"MTK"`
      - `divisibility` (integer): example: `0`
      - `totalSupply` (string): example: `"1000000"`
      - `maxSupply` (string): example: `"1000000"`
      - `premine` (string): example: `"100000"`
      - `perMint` (string): example: `"1000"`
      - `cap` (string): example: `"10000000"`
      - `minted` (string): example: `"500000"`
      - `mintable` (boolean):
      - `holders` (integer): example: `100`
    - `nftData` (object):
      - `name` (string): example: `"MyNFT"`
      - `attributes` (object):
      - `contentType` (string):
      - `contentUrl` (string):
      - `collectionId` (string):
    - `collectionData` (object):
      - `name` (string): example: `"MyCollection"`
      - `totalSupply` (string): example: `"1000"`
      - `maxSupply` (string): example: `"1000"`
      - `minted` (integer):
      - `holders` (integer):


---

### Get contract events
<a id="get-contract-events"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/{alkaneid}/contract-events`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAlkanesContractEvents)  

#### Description
Retrieve contract events for a specific Alkane asset within a block height range.

#### Parameters
- `alkaneid` (path, string) **(required)**: Alkane ID
- `fromHeight` (query, integer) **(required)**: search by from height
- `toHeight` (query, integer) **(required)**: search by to height
- `start` (query, integer): default=0; example: `0`
- `limit` (query, integer): min=1,max=500,default=10; example: `10`

#### Response (200)
successful operation

- `code` (integer): example: `0`
- `msg` (string): example: `""`
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

#### Description
Retrieve Alkanes balances held by a specific transaction output.

#### Parameters
- `txid` (path, string) **(required)**: Transaction ID
- `index` (path, string) **(required)**: Output index (vout) of the transaction

#### Response (200)
successful operation

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (array):
  - `alkaneid` (string):
  - `amount` (string):
  - `type` (string): enum: `token`, `collection`, `nft`, `contract`; example: `"token"`
  - `logo` (string):
  - `tokenData` (object):
    - `name` (string): example: `"MyToken"`
    - `symbol` (string): example: `"MTK"`
    - `divisibility` (integer): example: `0`
    - `totalSupply` (string): example: `"1000000"`
    - `maxSupply` (string): example: `"1000000"`
    - `premine` (string): example: `"100000"`
    - `perMint` (string): example: `"1000"`
    - `cap` (string): example: `"10000000"`
    - `minted` (string): example: `"500000"`
    - `mintable` (boolean):
    - `holders` (integer): example: `100`
  - `nftData` (object):
    - `name` (string): example: `"MyNFT"`
    - `attributes` (object):
    - `contentType` (string):
    - `contentUrl` (string):
    - `collectionId` (string):
  - `collectionData` (object):
    - `name` (string): example: `"MyCollection"`
    - `totalSupply` (string): example: `"1000"`
    - `maxSupply` (string): example: `"1000"`
    - `minted` (integer):
    - `holders` (integer):


---

### Get utxo alkanes balance by address and alkaneid
<a id="get-utxo-alkanes-balance-by-address-and-alkaneid"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/alkanes/{alkaneid}/utxo`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAddressAlkanesUtxo)  

#### Description
Retrieve UTXOs containing a specific Alkane asset for an address.

#### Parameters
- `address` (path, string) **(required)**: Bitcoin address
- `alkaneid` (path, string) **(required)**: Alkane ID
- `start` (query, integer): default=0; example: `0`
- `limit` (query, integer): min=1,max=500,default=10; example: `10`

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
    - `confirmations` (integer):
    - `alkanes` (array):
      - `alkaneid` (string):
      - `amount` (string):
      - `type` (string): enum: `token`, `collection`, `nft`, `contract`; example: `"token"`
      - `logo` (string):
      - `tokenData` (object):
        - `name` (string): example: `"MyToken"`
        - `symbol` (string): example: `"MTK"`
        - `divisibility` (integer): example: `0`
        - `totalSupply` (string): example: `"1000000"`
        - `maxSupply` (string): example: `"1000000"`
        - `premine` (string): example: `"100000"`
        - `perMint` (string): example: `"1000"`
        - `cap` (string): example: `"10000000"`
        - `minted` (string): example: `"500000"`
        - `mintable` (boolean):
        - `holders` (integer): example: `100`
      - `nftData` (object):
        - `name` (string): example: `"MyNFT"`
        - `attributes` (object):
        - `contentType` (string):
        - `contentUrl` (string):
        - `collectionId` (string):
      - `collectionData` (object):
        - `name` (string): example: `"MyCollection"`
        - `totalSupply` (string): example: `"1000"`
        - `maxSupply` (string): example: `"1000"`
        - `minted` (integer):
        - `holders` (integer):


---

### Get address alkanes token list
<a id="get-address-alkanes-token-list"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/alkanes/token-list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAddressAlkanesTokenList)  

#### Description
Retrieve Alkanes token balances owned by an address.

#### Parameters
- `address` (path, string) **(required)**: Bitcoin address
- `start` (query, integer): default=0; example: `0`
- `limit` (query, integer): min=1,max=500,default=10; example: `10`

#### Response (200)
successful operation

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `total` (integer): example: `3045`
  - `start` (integer): example: `0`
  - `detail` (array):
    - `alkaneid` (string): example: `"2583283:1333"`
    - `height` (integer (uint64)): example: `2583283`
    - `txid` (string):
    - `timestamp` (integer):
    - `type` (string):
    - `logo` (string):
    - `tokenData` (object):
      - `name` (string): example: `"MyToken"`
      - `symbol` (string): example: `"MTK"`
      - `divisibility` (integer): example: `0`
      - `totalSupply` (string): example: `"1000000"`
      - `maxSupply` (string): example: `"1000000"`
      - `premine` (string): example: `"100000"`
      - `perMint` (string): example: `"1000"`
      - `cap` (string): example: `"10000000"`
      - `minted` (string): example: `"500000"`
      - `mintable` (boolean):
      - `holders` (integer): example: `100`
    - `nftData` (object):
      - `name` (string): example: `"MyNFT"`
      - `attributes` (object):
      - `contentType` (string):
      - `contentUrl` (string):
      - `collectionId` (string):
    - `collectionData` (object):
      - `name` (string): example: `"MyCollection"`
      - `totalSupply` (string): example: `"1000"`
      - `maxSupply` (string): example: `"1000"`
      - `minted` (integer):
      - `holders` (integer):


---

### Get address alkanes collection list
<a id="get-address-alkanes-collection-list"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/alkanes/collection-list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAddressAlkanesCollectionList)  

#### Description
Retrieve Alkanes collections owned by an address.

#### Parameters
- `address` (path, string) **(required)**: Bitcoin address
- `start` (query, integer): default=0; example: `0`
- `limit` (query, integer): min=1,max=500,default=10; example: `10`

#### Response (200)
successful operation

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `total` (integer): example: `3045`
  - `start` (integer): example: `0`
  - `detail` (array):
    - `alkaneid` (string): example: `"2583283:1333"`
    - `height` (integer (uint64)): example: `2583283`
    - `txid` (string):
    - `timestamp` (integer):
    - `type` (string):
    - `logo` (string):
    - `tokenData` (object):
      - `name` (string): example: `"MyToken"`
      - `symbol` (string): example: `"MTK"`
      - `divisibility` (integer): example: `0`
      - `totalSupply` (string): example: `"1000000"`
      - `maxSupply` (string): example: `"1000000"`
      - `premine` (string): example: `"100000"`
      - `perMint` (string): example: `"1000"`
      - `cap` (string): example: `"10000000"`
      - `minted` (string): example: `"500000"`
      - `mintable` (boolean):
      - `holders` (integer): example: `100`
    - `nftData` (object):
      - `name` (string): example: `"MyNFT"`
      - `attributes` (object):
      - `contentType` (string):
      - `contentUrl` (string):
      - `collectionId` (string):
    - `collectionData` (object):
      - `name` (string): example: `"MyCollection"`
      - `totalSupply` (string): example: `"1000"`
      - `maxSupply` (string): example: `"1000"`
      - `minted` (integer):
      - `holders` (integer):


---

### Get address collection items by alkaneid
<a id="get-address-collection-items-by-alkaneid"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/alkanes/{alkaneid}/collection-items`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAddressAlkanesCollectionItems)  

#### Description
Retrieve items from a specific Alkanes collection owned by an address.

#### Parameters
- `address` (path, string) **(required)**: Bitcoin address
- `alkaneid` (path, string) **(required)**: Alkane ID
- `start` (query, integer): default=0; example: `0`
- `limit` (query, integer): min=1,max=500,default=10; example: `10`

#### Response (200)
successful operation

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `total` (integer): example: `3045`
  - `start` (integer): example: `0`
  - `detail` (array):
    - `alkaneid` (string): example: `"2583283:1333"`
    - `height` (integer (uint64)): example: `2583283`
    - `txid` (string):
    - `timestamp` (integer):
    - `type` (string):
    - `logo` (string):
    - `tokenData` (object):
      - `name` (string): example: `"MyToken"`
      - `symbol` (string): example: `"MTK"`
      - `divisibility` (integer): example: `0`
      - `totalSupply` (string): example: `"1000000"`
      - `maxSupply` (string): example: `"1000000"`
      - `premine` (string): example: `"100000"`
      - `perMint` (string): example: `"1000"`
      - `cap` (string): example: `"10000000"`
      - `minted` (string): example: `"500000"`
      - `mintable` (boolean):
      - `holders` (integer): example: `100`
    - `nftData` (object):
      - `name` (string): example: `"MyNFT"`
      - `attributes` (object):
      - `contentType` (string):
      - `contentUrl` (string):
      - `collectionId` (string):
    - `collectionData` (object):
      - `name` (string): example: `"MyCollection"`
      - `totalSupply` (string): example: `"1000"`
      - `maxSupply` (string): example: `"1000"`
      - `minted` (integer):
      - `holders` (integer):


---

### Get transfer history
<a id="get-transfer-history"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/alkanes/{alkaneid}/transfer-history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Alkanes/getAddressAlkanesTransferHistory)  

#### Description
Retrieve transfer history for a specific Alkane asset and address within a block height range.

#### Parameters
- `address` (path, string) **(required)**: Bitcoin address
- `alkaneid` (path, string) **(required)**: Alkane ID
- `fromHeight` (query, integer) **(required)**: search by from height
- `toHeight` (query, integer) **(required)**: search by to height
- `start` (query, integer): default=0; example: `0`
- `limit` (query, integer): min=1,max=500,default=10; example: `10`

#### Response (200)
successful operation

- `code` (integer): example: `0`
- `msg` (string): example: `""`
- `data` (object):
  - `total` (integer): example: `3045`
  - `start` (integer): example: `0`
  - `detail` (array):
    - `height` (integer):
    - `txid` (string):
    - `type` (string):
    - `subType` (string):
    - `alkaneid` (string):
    - `address` (string):
    - `amount` (string): example: `"10000"`


---

