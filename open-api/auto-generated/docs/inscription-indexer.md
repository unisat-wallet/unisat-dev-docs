# Inscription Indexer API

Inscription Indexer API is a RESTful API for accessing and managing inscriptions on the Bitcoin blockchain. It provides endpoints to retrieve information about inscriptions, including their status, metadata, and associated transactions.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---

## 📑 Table of Contents

- [Inscriptions](#inscriptions)
  - [Get inscription info by inscriptionId](#get-inscription-info-by-inscriptionid)
  - [Get inscription content info by inscriptionId](#get-inscription-content-info-by-inscriptionid)
  - [Get inscription events](#get-inscription-events)
  - [Get inscription UTXO list by address](#get-inscription-utxo-list-by-address)
  - [Get inscription UTXO list by address](#get-inscription-utxo-list-by-address)

---

## Inscriptions

### Get inscription info by inscriptionId
<a id="get-inscription-info-by-inscriptionid"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/inscription/info/{inscriptionId}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscriptions/getInscriptionInfo)  

#### Parameters
- `inscriptionId` (path) **(required)**: 

#### Response (200)


---

### Get inscription content info by inscriptionId
<a id="get-inscription-content-info-by-inscriptionid"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/inscription/content/{inscriptionId}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscriptions/getInscriptionContent)  

#### Parameters
- `inscriptionId` (path) **(required)**: 

#### Response (200)
---

### Get inscription events
<a id="get-inscription-events"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/inscription/events`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscriptions/getInscriptionEvents)  

#### Parameters
- `start` (query) **(required)**: Start blockheight
- `end` (query) **(required)**: End blockheight (0 represents the inclusion of mempool data.)
- `cursor` (query) **(required)**: Start offset
- `size` (query) **(required)**: Number of items returned

#### Response (200)


---

### Get inscription UTXO list by address
<a id="get-inscription-utxo-list-by-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/inscription-data`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscriptions/getInscriptionDataByAddress)  

#### Parameters
- `address` (path) **(required)**: Address
- `cursor` (query) **(required)**: Start offset
- `size` (query) **(required)**: Number of items returned

#### Response (200)


---

### Get inscription UTXO list by address
<a id="get-inscription-utxo-list-by-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/inscription-utxo-data`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscriptions/getInscriptionUtxoDataByAddress)  

#### Parameters
- `address` (path) **(required)**: Address
- `cursor` (query) **(required)**: Start offset
- `size` (query) **(required)**: Number of items returned

#### Response (200)


---

