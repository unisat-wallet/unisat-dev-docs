# Collection Indexer API

This is the API for collections. Currently, it only indexes a single whitelisted collection.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [GET /v1/collection-indexer/collection/status](#return-the-overall-information-of-the-collection-service) | Return the overall information of the collection service |
| [GET /v1/collection-indexer/collection/{collectionId}/info](#return-the-details-of-the-specified-collection) | Return the details of the specified collection |
| [GET /v1/collection-indexer/collection/{collectionId}/holders](#return-the-owner-information-of-a-specific-collection) | Return the owner information of a specific collection |
| [GET /v1/collection-indexer/address/{address}/collection/list](#return-the-collection-summary-for-the-specified-address) | Return the collection summary for the specified address. |
| [GET /v1/collection-indexer/collection/{collectionId}/items](#return-the-list-of-inscriptions-for-a-specific-collection) | Return the list of inscriptions for a specific collection. |
| [GET /v1/collection-indexer/address/{address}/collection/{collectionId}/summary](#return-the-summary-of-a-specific-collection-for-the-designated-address) | Return the summary of a specific collection for the designated address. |
| [GET /v1/collection-indexer/address/{address}/collection/{collectionId}/items](#get-the-list-of-inscriptions-for-a-specific-collection-at-a-designated-address) | Get the list of inscriptions for a specific collection at a designated address. |
| [GET /v1/collection-indexer/inscription/{inscriptionId}/collection/list](#get-inscription-collection-list) | Get inscription collection list |

---

## Collection-Indexer

### Return the overall information of the collection service
<a id="return-the-overall-information-of-the-collection-service"></a>

**Method**: `GET`  
**Path**: `/v1/collection-indexer/collection/status`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Collection-Indexer/getCollectionStatus)  

#### Description
Returns the latest height of the collection indexer, the last handled height, and the total number of collections.

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `newestHeight` (number): 
  - `lastHandledHeight` (number): 
  - `totalCollection` (number): 

---

### Return the details of the specified collection
<a id="return-the-details-of-the-specified-collection"></a>

**Method**: `GET`  
**Path**: `/v1/collection-indexer/collection/{collectionId}/info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Collection-Indexer/getCollectionInfo)  

#### Description
Returns the details of a specific collection, including its name, icon, supply, description, and social media links.

#### Parameters
- `height` (query) : 
- `collectionId` (path) **(required)**: 

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `height` (number): 
  - `holders` (number): 
  - `totalItems` (number): 

---

### Return the owner information of a specific collection
<a id="return-the-owner-information-of-a-specific-collection"></a>

**Method**: `GET`  
**Path**: `/v1/collection-indexer/collection/{collectionId}/holders`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Collection-Indexer/getCollectionHolders)  

#### Description
Returns the list of addresses that hold items from a specific collection, along with the count of items each address holds.

#### Parameters
- `height` (query) : 
- `start` (query) **(required)**: 
- `limit` (query) **(required)**: 
- `collectionId` (path) **(required)**: 

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `total` (number): 
  - `list` (array):
    - `address` (string): 
    - `count` (number): 

---

### Return the collection summary for the specified address.
<a id="return-the-collection-summary-for-the-specified-address"></a>

**Method**: `GET`  
**Path**: `/v1/collection-indexer/address/{address}/collection/list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Collection-Indexer/getAddressCollectionList)  

#### Description
Returns the summary of all collections that the specified address holds, including collection name, icon, supply, and social media links.

#### Parameters
- `height` (query) : 
- `start` (query) **(required)**: 
- `limit` (query) **(required)**: 
- `address` (path) **(required)**: 

#### Response (200)
- `code` (number): 
- `msg` (string): 
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

### Return the list of inscriptions for a specific collection.
<a id="return-the-list-of-inscriptions-for-a-specific-collection"></a>

**Method**: `GET`  
**Path**: `/v1/collection-indexer/collection/{collectionId}/items`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Collection-Indexer/getCollectionItems)  

#### Description
Returns the list of inscriptions that belong to a specific collection, including details such as inscription ID, name, content type, and height.

#### Parameters
- `height` (query) : 
- `start` (query) **(required)**: 
- `limit` (query) **(required)**: 
- `collectionId` (path) **(required)**: 

#### Response (200)
- `code` (number): 
- `msg` (string): 
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

### Return the summary of a specific collection for the designated address.
<a id="return-the-summary-of-a-specific-collection-for-the-designated-address"></a>

**Method**: `GET`  
**Path**: `/v1/collection-indexer/address/{address}/collection/{collectionId}/summary`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Collection-Indexer/getAddressCollectionSummary)  

#### Description
Returns the summary of a specific collection for a designated address, including collection name, icon, supply, description, and social media links.

#### Parameters
- `height` (query) : 
- `address` (path) **(required)**: 
- `collectionId` (path) **(required)**: 

#### Response (200)
- `code` (number): 
- `msg` (string): 
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

### Get the list of inscriptions for a specific collection at a designated address.
<a id="get-the-list-of-inscriptions-for-a-specific-collection-at-a-designated-address"></a>

**Method**: `GET`  
**Path**: `/v1/collection-indexer/address/{address}/collection/{collectionId}/items`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Collection-Indexer/getAddressCollectionItems)  

#### Description
Returns the list of inscriptions that belong to a specific collection at a designated address, including details such as inscription ID, name,

#### Parameters
- `height` (query) : 
- `start` (query) **(required)**: 
- `limit` (query) **(required)**: 
- `address` (path) **(required)**: 
- `collectionId` (path) **(required)**: 

#### Response (200)
- `code` (number): 
- `msg` (string): 
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

### Get inscription collection list
<a id="get-inscription-collection-list"></a>

**Method**: `GET`  
**Path**: `/v1/collection-indexer/inscription/{inscriptionId}/collection/list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Collection-Indexer/getInscriptionCollectionList)  

#### Description
Returns the list of collections that a specific inscription belongs to, including collection name, icon, supply, and social media links.

#### Parameters
- `inscriptionId` (path) **(required)**: 

#### Response (200)
- `code` (number): 
- `msg` (string): 
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

