# Inscription Indexer API

Inscription Indexer API is a RESTful API for accessing and managing inscriptions on the Bitcoin blockchain. It provides endpoints to retrieve information about inscriptions, including their status, metadata, and associated transactions.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [GET `/v1/indexer/inscription/info/(inscriptionId)`](#get-inscription-info-by-inscriptionid) | Get inscription info by inscriptionId |
| [GET `/v1/indexer/inscription/content/(inscriptionId)`](#get-inscription-content-info-by-inscriptionid) | Get inscription content info by inscriptionId |
| [GET `/v1/indexer/inscription/events`](#get-inscription-events) | Get inscription events |
| [GET `/v1/indexer/address/(address)/inscription-data`](#get-inscription-utxo-list-by-address) | Get inscription UTXO list by address |
| [GET `/v1/indexer/address/(address)/inscription-utxo-data`](#get-inscription-utxo-list-by-address) | Get inscription UTXO list by address |
| [GET `/v1/indexer/address/(address)/abandon-nft-utxo-data`](#get-abandon-nft-utxo-list-by-address) | Get abandon nft UTXO list by address |

---

## Inscriptions

### Get inscription info by inscriptionId
<a id="get-inscription-info-by-inscriptionid"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/inscription/info/{inscriptionId}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscriptions/getInscriptionInfo)  

#### Parameters
- `inscriptionId` (path, string) **(required)**: 

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `address` (string):
  - `offset` (integer):
  - `inscriptionIndex` (integer):
  - `inscriptionId` (string):
  - `inscriptionNumber` (integer):
  - `hasPointer` (boolean):
  - `hasParent` (boolean):
  - `hasDeligate` (boolean): Indicates whether the inscription has the historical delegate field. The field name is kept for backward compatibility.
  - `hasMetaProtocal` (boolean): Indicates whether the inscription has the historical metaprotocol field. The field name is kept for backward compatibility.
  - `hasContentEncoding` (boolean):
  - `pointer` (integer):
  - `parent` (string):
  - `deligate` (string): Historical delegate value for the inscription. The field name is kept for backward compatibility.
  - `metaprotocol` (string):
  - `metadata` (string):
  - `contentEncoding` (string):
  - `contentType` (string):
  - `contentLength` (integer):
  - `height` (integer):
  - `timestamp` (integer):
  - `inSatoshi` (integer):
  - `outSatoshi` (integer):
  - `brc20` (object): Only BRC-20 transfer inscriptions include this value
    - `amt` (string):
    - `decimal` (string):
    - `lim` (string):
    - `max` (string):
    - `minted` (string):
    - `op` (string):
    - `tick` (string):
    - `to` (string):

#### Response (401)
Invalid API Key


---

### Get inscription content info by inscriptionId
<a id="get-inscription-content-info-by-inscriptionid"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/inscription/content/{inscriptionId}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscriptions/getInscriptionContent)  

#### Parameters
- `inscriptionId` (path, string) **(required)**: 

#### Response (200)
Successful operation

#### Response (401)
Invalid API Key


---

### Get inscription events
<a id="get-inscription-events"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/inscription/events`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscriptions/getInscriptionEvents)  

#### Parameters
- `start` (query, integer) **(required)**: Start blockheight
- `end` (query, integer) **(required)**: End blockheight (0 represents the inclusion of mempool data.)
- `cursor` (query, integer) **(required)**: Start offset
- `size` (query, integer) **(required)**: Number of items returned

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `cursor` (integer):
  - `total` (integer):
  - `detail` (array):
    - `isTransfer` (boolean): false: a mint event; true: a transfer event
    - `inscriptionId` (string):
    - `inscriptionNumber` (integer):
    - `address` (string): current address
    - `contentBody` (string): only present when it's a mint event
    - `contentType` (string): only present when it's a mint event
    - `inSatoshi` (integer): total input satoshi in tx
    - `outSatoshi` (integer): total output satoshi in tx
    - `pkScript` (string):
    - `satoshi` (integer): satoshi in inscription
    - `timestamp` (integer): block timestamp
    - `txid` (string): inscription genesis txid
    - `i` (integer): inscription genesis vout
    - `vout` (integer): tx vout
    - `sequence` (integer):
    - `height` (integer):
    - `txidx` (integer): tx index in block

#### Response (401)
Invalid API Key


---

### Get inscription UTXO list by address
<a id="get-inscription-utxo-list-by-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/inscription-data`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscriptions/getInscriptionDataByAddress)  

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
  - `inscription` (array):
    - `address` (string):
    - `offset` (integer):
    - `inscriptionIndex` (integer):
    - `inscriptionId` (string):
    - `inscriptionNumber` (integer):
    - `hasPointer` (boolean):
    - `hasParent` (boolean):
    - `hasDeligate` (boolean): Indicates whether the inscription has the historical delegate field. The field name is kept for backward compatibility.
    - `hasMetaProtocal` (boolean): Indicates whether the inscription has the historical metaprotocol field. The field name is kept for backward compatibility.
    - `hasContentEncoding` (boolean):
    - `pointer` (integer):
    - `parent` (string):
    - `deligate` (string): Historical delegate value for the inscription. The field name is kept for backward compatibility.
    - `metaprotocol` (string):
    - `metadata` (string):
    - `contentEncoding` (string):
    - `contentType` (string):
    - `contentLength` (integer):
    - `height` (integer):
    - `timestamp` (integer):
    - `inSatoshi` (integer):
    - `outSatoshi` (integer):
    - `brc20` (object): Only BRC-20 transfer inscriptions include this value
      - `amt` (string):
      - `decimal` (string):
      - `lim` (string):
      - `max` (string):
      - `minted` (string):
      - `op` (string):
      - `tick` (string):
      - `to` (string):

#### Response (401)
Invalid API Key


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

#### Response (401)
Invalid API Key


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
    - `balance` (integer): example: `10000`
    - `cursor` (integer): example: `0`
    - `nftMintCount` (integer): example: `1`
    - `nftTransferCount` (integer): example: `0`
    - `total` (integer): example: `1`
    - `utxo` (array):

#### Response (401)
Invalid API Key

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

