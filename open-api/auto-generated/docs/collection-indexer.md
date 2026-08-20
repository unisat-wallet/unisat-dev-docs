# Collection Indexer API

Collection Indexer API provides read-only collection indexing endpoints for collection status, collection details, holders, address collection summaries, and collection item ownership. It is separate from marketplace listing and order APIs.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [GET `/v1/collection-indexer/collection/status`](#get-collection-indexer-height-and-collection-count) | Get collection indexer height and collection count |
| [GET `/v1/collection-indexer/collection/(collectionId)/info`](#get-collection-supply-and-holder-summary) | Get collection supply and holder summary |
| [GET `/v1/collection-indexer/collection/(collectionId)/holders`](#list-collection-holders-and-item-counts) | List collection holders and item counts |
| [GET `/v1/collection-indexer/address/(address)/collection/list`](#list-collections-owned-by-an-address) | List collections owned by an address |
| [GET `/v1/collection-indexer/collection/(collectionId)/items`](#list-indexed-items-in-a-collection) | List indexed items in a collection |
| [GET `/v1/collection-indexer/address/(address)/collection/(collectionId)/summary`](#get-an-addresss-ownership-summary-for-a-collection) | Get an address's ownership summary for a collection |
| [GET `/v1/collection-indexer/address/(address)/collection/(collectionId)/items`](#list-collection-items-owned-by-an-address) | List collection items owned by an address |
| [GET `/v1/collection-indexer/inscription/(inscriptionId)/collection/list`](#list-collections-containing-an-inscription) | List collections containing an inscription |

---

## Collection Indexer

### Get collection indexer height and collection count
<a id="get-collection-indexer-height-and-collection-count"></a>

**Method**: `GET`  
**Path**: `/v1/collection-indexer/collection/status`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Collection Indexer/getCollectionStatus)  

#### Description
Returns newest chain height, last handled indexer height, and total indexed collections. Use it to check freshness before reading collection metadata, holder lists, address collection summaries, or item ownership; this indexer is separate from marketplace listing and order state.

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `newestHeight` (number):
  - `lastHandledHeight` (number):
  - `totalCollection` (number):


---

### Get collection supply and holder summary
<a id="get-collection-supply-and-holder-summary"></a>

**Method**: `GET`  
**Path**: `/v1/collection-indexer/collection/{collectionId}/info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Collection Indexer/getCollectionInfo)  

#### Description
Returns a collection's indexed height, holder count, and total item count, optionally at a specified height. Use it for lightweight collection detail headers or historical snapshots; marketplace floor, listings, and order activity are not included.

#### Parameters
- `height` (query, number): 
- `collectionId` (path, string) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `height` (number):
  - `holders` (number):
  - `totalItems` (number):


---

### List collection holders and item counts
<a id="list-collection-holders-and-item-counts"></a>

**Method**: `GET`  
**Path**: `/v1/collection-indexer/collection/{collectionId}/holders`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Collection Indexer/getCollectionHolders)  

#### Description
Returns paginated holder addresses and item counts for a collection, optionally at a specified height. Use it for holder distribution views and ownership analytics; it reflects indexed ownership only and does not include marketplace listing state.

#### Parameters
- `height` (query, number): 
- `start` (query, number) **(required)**: 
- `limit` (query, number) **(required)**: 
- `collectionId` (path, string) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `total` (number):
  - `list` (array):
    - `address` (string):
    - `count` (number):


---

### List collections owned by an address
<a id="list-collections-owned-by-an-address"></a>

**Method**: `GET`  
**Path**: `/v1/collection-indexer/address/{address}/collection/list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Collection Indexer/getAddressCollectionList)  

#### Description
Returns paginated collection summaries for an address, including owned item count, collection name, icon inscription and URL, content type, supply, collection id, description, and social links. Use it for wallet collection portfolios; it does not report listing or order availability.

#### Parameters
- `height` (query, number): 
- `start` (query, number) **(required)**: 
- `limit` (query, number) **(required)**: 
- `address` (path, string) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `total` (number):
  - `list` (array):
    - `count` (number):
    - `name` (string):
    - `iconInscription` (string):
    - `iconUrl` (string):
    - `iconContentType` (string):
    - `supply` (string):
    - `collectionId` (string):
    - `desc` (string):
    - `twitter` (string):
    - `discord` (string):
    - `website` (string):


---

### List indexed items in a collection
<a id="list-indexed-items-in-a-collection"></a>

**Method**: `GET`  
**Path**: `/v1/collection-indexer/collection/{collectionId}/items`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Collection Indexer/getCollectionItems)  

#### Description
Returns paginated collection item records with inscription id and number, item and inscription names, content metadata, indexed height, holder count, and collection totals. Use it for collection item grids or metadata backfills; content bodies may be untrusted and should be rendered safely.

#### Parameters
- `height` (query, number): 
- `start` (query, number) **(required)**: 
- `limit` (query, number) **(required)**: 
- `collectionId` (path, string) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `total` (number):
  - `list` (array):
    - `inscriptionId` (string):
    - `collectionId` (string):
    - `collectionItemName` (string):
    - `inscriptionIndex` (number):
    - `inscriptionNumber` (number):
    - `inscriptionName` (string):
    - `contentBody` (string):
    - `contentLength` (number):
    - `contentType` (string):
    - `height` (number):
    - `holders` (number):
    - `totalItems` (number):


---

### Get an address's ownership summary for a collection
<a id="get-an-addresss-ownership-summary-for-a-collection"></a>

**Method**: `GET`  
**Path**: `/v1/collection-indexer/address/{address}/collection/{collectionId}/summary`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Collection Indexer/getAddressCollectionSummary)  

#### Description
Returns the address's item count plus collection name, icon, supply, collection id, description, and social links for one collection. Use it for wallet collection detail cards or ownership verification; marketplace order state and listing prices are not included.

#### Parameters
- `height` (query, number): 
- `address` (path, string) **(required)**: 
- `collectionId` (path, string) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `count` (number):
  - `name` (string):
  - `iconInscription` (string):
  - `iconUrl` (string):
  - `iconContentType` (string):
  - `supply` (string):
  - `collectionId` (string):
  - `desc` (string):
  - `twitter` (string):
  - `discord` (string):
  - `website` (string):


---

### List collection items owned by an address
<a id="list-collection-items-owned-by-an-address"></a>

**Method**: `GET`  
**Path**: `/v1/collection-indexer/address/{address}/collection/{collectionId}/items`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Collection Indexer/getAddressCollectionItems)  

#### Description
Returns paginated item records that an address owns within a collection, including inscription id and number, item name, content metadata, indexed height, and collection totals. Use it for wallet item galleries; ownership can change with new transfers, so recheck before signing or listing transactions.

#### Parameters
- `height` (query, number): 
- `start` (query, number) **(required)**: 
- `limit` (query, number) **(required)**: 
- `address` (path, string) **(required)**: 
- `collectionId` (path, string) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `total` (number):
  - `list` (array):
    - `inscriptionId` (string):
    - `collectionId` (string):
    - `collectionItemName` (string):
    - `inscriptionIndex` (number):
    - `inscriptionNumber` (number):
    - `inscriptionName` (string):
    - `contentBody` (string):
    - `contentLength` (number):
    - `contentType` (string):
    - `height` (number):
    - `holders` (number):
    - `totalItems` (number):


---

### List collections containing an inscription
<a id="list-collections-containing-an-inscription"></a>

**Method**: `GET`  
**Path**: `/v1/collection-indexer/inscription/{inscriptionId}/collection/list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Collection Indexer/getInscriptionCollectionList)  

#### Description
Returns collection summaries associated with an inscription, including name, icon, supply, collection id, description, and social links. Use it to map an inscription to curated collection contexts; inscription ids or numbers may resolve differently across networks, so match the request to the intended chain.

#### Parameters
- `inscriptionId` (path, string) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `total` (number):
  - `list` (array):
    - `name` (string):
    - `iconInscription` (string):
    - `iconUrl` (string):
    - `iconContentType` (string):
    - `supply` (string):
    - `collectionId` (string):
    - `desc` (string):
    - `twitter` (string):
    - `discord` (string):
    - `website` (string):


---

