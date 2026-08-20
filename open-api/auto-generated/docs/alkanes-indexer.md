# Alkanes Indexer API

The Alkanes Indexer API is developed by the UniSat team, providing a simplified and developer-friendly interface based on the official Alkanes indexer (kungfuflex/alkanes).  It is built on specific versions of metashrew and alkanes-rs to ensure compatibility and consistency.  We welcome feedback and suggestions for improvement.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [GET `/v1/indexer/alkanes/status`](#get-alkanes-indexer-status-indexed-height-and-asset-count) | Get Alkanes indexer status, indexed height, and asset count |
| [GET `/v1/indexer/alkanes/info-list`](#list-indexed-alkanes-assets-across-tokens-nfts-and-collections) | List indexed Alkanes assets across tokens, NFTs, and collections |
| [GET `/v1/indexer/alkanes/(alkaneid)/info`](#get-metadata-for-one-alkane-asset-by-alkaneid) | Get metadata for one Alkane asset by alkaneid |
| [GET `/v1/indexer/alkanes/token-list`](#list-fungible-alkanes-tokens-with-supply-and-holder-metadata) | List fungible Alkanes tokens with supply and holder metadata |
| [GET `/v1/indexer/alkanes/(alkaneid)/holders`](#list-holders-and-balances-for-an-alkane-asset) | List holders and balances for an Alkane asset |
| [GET `/v1/indexer/alkanes/(alkaneid)/collection-items`](#list-nft-or-child-assets-that-belong-to-an-alkane-collection) | List NFT or child assets that belong to an Alkane collection |
| [GET `/v1/indexer/alkanes/(alkaneid)/contract-events`](#list-contract-execution-events-for-an-alkane-over-a-block-range) | List contract execution events for an Alkane over a block range |
| [GET `/v1/indexer/alkanes/utxo/(txid)/(index)/balance`](#get-all-alkane-balances-attached-to-a-specific-utxo) | Get all Alkane balances attached to a specific UTXO |
| [GET `/v1/indexer/address/(address)/alkanes/(alkaneid)/utxo`](#list-an-addresss-utxos-that-carry-a-specific-alkane) | List an address's UTXOs that carry a specific Alkane |
| [GET `/v1/indexer/address/(address)/alkanes/token-list`](#list-fungible-alkanes-tokens-held-by-an-address) | List fungible Alkanes tokens held by an address |
| [GET `/v1/indexer/address/(address)/alkanes/collection-list`](#list-alkane-collections-associated-with-an-address) | List Alkane collections associated with an address |
| [GET `/v1/indexer/address/(address)/alkanes/(alkaneid)/collection-items`](#list-an-addresss-items-from-a-specific-alkane-collection) | List an address's items from a specific Alkane collection |
| [GET `/v1/indexer/address/(address)/alkanes/(alkaneid)/transfer-history`](#list-an-addresss-transfer-history-for-a-specific-alkane) | List an address's transfer history for a specific Alkane |

---

## Indexer-Alkanes

### Get Alkanes indexer status, indexed height, and asset count
<a id="get-alkanes-indexer-status-indexed-height-and-asset-count"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/status`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Alkanes/getAlkanesStatus)  

#### Description
Returns the current Alkanes indexer progress and runtime versions, including indexed block height, total tracked Alkane assets, metashrew version, and alkanes-rs version.

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

### List indexed Alkanes assets across tokens, NFTs, and collections
<a id="list-indexed-alkanes-assets-across-tokens-nfts-and-collections"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/info-list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Alkanes/getAlkanesInfoList)  

#### Description
Returns a paginated catalog of Alkane asset metadata. Use it for global discovery across asset types, with optional type filtering and sorting by creation time or alkaneid.

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

### Get metadata for one Alkane asset by alkaneid
<a id="get-metadata-for-one-alkane-asset-by-alkaneid"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/{alkaneid}/info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Alkanes/getAlkanesInfo)  

#### Description
Returns the asset type and type-specific metadata for a single Alkane, such as token supply fields, NFT content fields, or collection supply and holder counts.

#### Parameters
- `alkaneid` (path, string) **(required)**: Alkane id in block:tx format, for example 2:1.

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

### List fungible Alkanes tokens with supply and holder metadata
<a id="list-fungible-alkanes-tokens-with-supply-and-holder-metadata"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/token-list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Alkanes/getAlkanesTokenList)  

#### Description
Returns token-type Alkanes only, including token name, symbol, divisibility, supply, mint progress, and holder count. Supports lookup by alkaneid or name and sorted pagination.

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

### List holders and balances for an Alkane asset
<a id="list-holders-and-balances-for-an-alkane-asset"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/{alkaneid}/holders`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Alkanes/getAlkanesHolders)  

#### Description
Returns paginated holder addresses and their indexed amount for the selected Alkane. Use it to inspect token distribution or collection ownership concentration.

#### Parameters
- `alkaneid` (path, string) **(required)**: Alkane id in block:tx format, for example 2:1.
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

### List NFT or child assets that belong to an Alkane collection
<a id="list-nft-or-child-assets-that-belong-to-an-alkane-collection"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/{alkaneid}/collection-items`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Alkanes/getAlkanesCollectionItems)  

#### Description
Returns paginated Alkane item metadata for a collection, including each item's asset type and NFT or token details when available.

#### Parameters
- `alkaneid` (path, string) **(required)**: 
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

### List contract execution events for an Alkane over a block range
<a id="list-contract-execution-events-for-an-alkane-over-a-block-range"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/{alkaneid}/contract-events`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Alkanes/getAlkanesContractEvents)  

#### Description
Returns indexed contract events with caller, opcode, fuel, inputs, execution status, block height, txid, and vout. Use it to audit contract activity within a bounded height range.

#### Parameters
- `alkaneid` (path, string) **(required)**: 
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

### Get all Alkane balances attached to a specific UTXO
<a id="get-all-alkane-balances-attached-to-a-specific-utxo"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/alkanes/utxo/{txid}/{index}/balance`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Alkanes/getAlkanesUtxoBalance)  

#### Description
Returns the Alkane assets and amounts indexed on one transaction output, with token, NFT, or collection metadata attached when available.

#### Parameters
- `txid` (path, string) **(required)**: 
- `index` (path, string) **(required)**: 

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

### List an address's UTXOs that carry a specific Alkane
<a id="list-an-addresss-utxos-that-carry-a-specific-alkane"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/alkanes/{alkaneid}/utxo`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Alkanes/getAddressAlkanesUtxo)  

#### Description
Returns spendable transaction outputs for an address that contain the selected Alkane, including satoshi value, scriptPubKey, confirmations, and indexed Alkane balances on each UTXO.

#### Parameters
- `address` (path, string) **(required)**: 
- `alkaneid` (path, string) **(required)**: 
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

### List fungible Alkanes tokens held by an address
<a id="list-fungible-alkanes-tokens-held-by-an-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/alkanes/token-list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Alkanes/getAddressAlkanesTokenList)  

#### Description
Returns token assets associated with an address, including each token's metadata and paginated list context. Use it for wallet asset discovery before querying per-token UTXOs or transfer history.

#### Parameters
- `address` (path, string) **(required)**: 
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

### List Alkane collections associated with an address
<a id="list-alkane-collections-associated-with-an-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/alkanes/collection-list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Alkanes/getAddressAlkanesCollectionList)  

#### Description
Returns collection-type Alkane metadata indexed for an address, including collection name, supply, mint progress, and holder count when available.

#### Parameters
- `address` (path, string) **(required)**: 
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

### List an address's items from a specific Alkane collection
<a id="list-an-addresss-items-from-a-specific-alkane-collection"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/alkanes/{alkaneid}/collection-items`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Alkanes/getAddressAlkanesCollectionItems)  

#### Description
Returns collection item metadata scoped to one address, useful for showing which NFTs or child assets from a collection are held by that wallet.

#### Parameters
- `address` (path, string) **(required)**: 
- `alkaneid` (path, string) **(required)**: 
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

### List an address's transfer history for a specific Alkane
<a id="list-an-addresss-transfer-history-for-a-specific-alkane"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/alkanes/{alkaneid}/transfer-history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Indexer-Alkanes/getAddressAlkanesTransferHistory)  

#### Description
Returns indexed transfer records with block height, txid, transfer type, subtype, address, and amount. Use it to build an address-level activity view over a bounded height range.

#### Parameters
- `address` (path, string) **(required)**: 
- `alkaneid` (path, string) **(required)**: 
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

