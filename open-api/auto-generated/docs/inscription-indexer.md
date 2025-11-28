# Inscription Indexer API

Inscription Indexer API is a RESTful API for accessing and managing inscriptions on the Bitcoin blockchain. It provides endpoints to retrieve information about inscriptions, including their status, metadata, and associated transactions.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [GET `/v1/indexer/inscription/info/TODO-inscriptionId`](#get-inscription-info-by-inscriptionid) | Get inscription info by inscriptionId |
| [GET `/v1/indexer/inscription/content/TODO-inscriptionId`](#get-inscription-content-info-by-inscriptionid) | Get inscription content info by inscriptionId |
| [GET `/v1/indexer/inscription/events`](#get-inscription-events) | Get inscription events |
| [GET `/v1/indexer/address/TODO-address/inscription-data`](#get-inscription-utxo-list-by-address) | Get inscription UTXO list by address |
| [GET `/v1/indexer/address/TODO-address/inscription-utxo-data`](#get-inscription-utxo-list-by-address) | Get inscription UTXO list by address |
| [GET `/v1/indexer/address/TODO-address/abandon-nft-utxo-data`](#get-abandon-nft-utxo-list-by-address) | Get abandon nft UTXO list by address |

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

#### Description
Returns the list of inscription UTXOs for the given address. 
**Note:** In previous versions, this endpoint returned all inscription UTXOs. After a recent upgrade, UTXOs corresponding to "abandoned inscriptions" are now filtered out. 

**Abandoned inscriptions** refer to:
- BRC20 MINT inscriptions
- BRC20 TRANSFER inscriptions that have already been transferred

These inscriptions do not carry BRC20 assets and account for a large proportion of the index. To improve efficiency, they are now excluded from the normal inscription list. If you still need access to these UTXOs, please use the `/abandon-nft-utxo-data` endpoint.


#### Parameters
- `address` (path) **(required)**: Address
- `cursor` (query) **(required)**: Start offset
- `size` (query) **(required)**: Number of items returned

#### Response (200)



---

### Get abandon nft UTXO list by address
<a id="get-abandon-nft-utxo-list-by-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/abandon-nft-utxo-data`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscriptions/getAbandonNftUtxoDataByAddress)  

#### Description
Returns the list of UTXOs for "abandoned inscriptions" for the given address. 

**Abandoned inscriptions** are defined as:
- BRC20 MINT inscriptions
- BRC20 TRANSFER inscriptions that have already been transferred

These inscriptions do not carry BRC20 assets and are excluded from the normal `/inscription-utxo-data` results. Use this endpoint if you specifically need to access these UTXOs.


#### Parameters
- `address` (path) **(required)**: Address
- `cursor` (query) **(required)**: Start offset
- `size` (query) **(required)**: Number of items returned

#### Response (200)


### Notes

**Background:**

In previous versions, the `inscription-utxo-data` endpoint returned all inscription UTXOs. After a recent upgrade, UTXOs corresponding to "abandoned inscriptions" are now filtered out for efficiency.

**What are abandoned inscriptions?**
- BRC20 MINT inscriptions
- BRC20 TRANSFER inscriptions that have already been transferred

These inscriptions do not carry BRC20 assets and account for a large proportion of the index. To improve efficiency and reduce unnecessary data, they are now excluded from the normal inscription list.

**How to access abandoned inscription UTXOs?**
If you still need access to these UTXOs, please use the new `/abandon-nft-utxo-data` endpoint. This endpoint specifically returns UTXOs for abandoned inscriptions as defined above.

**Summary:**
- `/inscription-utxo-data` now only returns active inscription UTXOs (excluding abandoned ones)
- `/abandon-nft-utxo-data` returns UTXOs for abandoned inscriptions

If you have any questions about this change, please contact the UniSat developer support team.


---

