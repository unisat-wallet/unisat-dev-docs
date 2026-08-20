# Inscription Indexer API

Inscription Indexer API is a RESTful API for accessing and managing inscriptions on the Bitcoin blockchain. It provides endpoints to retrieve information about inscriptions, including their status, metadata, and associated transactions.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [GET `/v1/indexer/inscription/info/(inscriptionId)`](#get-inscription-metadata-by-id-or-number) | Get inscription metadata by id or number |
| [GET `/v1/indexer/inscription/content/(inscriptionId)`](#fetch-raw-inscription-content-by-id-or-number) | Fetch raw inscription content by id or number |
| [GET `/v1/indexer/inscription/events`](#list-inscription-mint-and-transfer-events-by-block-range) | List inscription mint and transfer events by block range |
| [GET `/v1/indexer/address/(address)/inscription-data`](#list-inscriptions-currently-associated-with-an-address) | List inscriptions currently associated with an address |
| [GET `/v1/indexer/address/(address)/inscription-utxo-data`](#list-inscription-bearing-utxos-for-an-address) | List inscription-bearing UTXOs for an address |
| [GET `/v1/indexer/address/(address)/abandon-nft-utxo-data`](#list-abandoned-nft-style-inscription-utxos-for-an-address) | List abandoned NFT-style inscription UTXOs for an address |

---

## Inscription Indexer

### Get inscription metadata by id or number
<a id="get-inscription-metadata-by-id-or-number"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/inscription/info/{inscriptionId}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscription Indexer/getInscriptionInfo)  

#### Description
Returns inscription owner, number, content metadata, parent and delegate flags, metaprotocol fields, BRC-20 payload when present, and current UTXO context. Use either an inscription id or inscription number; verify network and confirmation state before relying on ownership-sensitive results.

#### Parameters
- `inscriptionId` (path, string) **(required)**: Inscription id, or an inscription number accepted by this endpoint.

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
  - `hasDeligate` (boolean):
  - `hasMetaProtocal` (boolean):
  - `hasContentEncoding` (boolean):
  - `pointer` (integer):
  - `parent` (string):
  - `deligate` (string):
  - `metaprotocol` (string):
  - `metadata` (string):
  - `contentEncoding` (string):
  - `contentType` (string):
  - `contentLength` (integer):
  - `height` (integer):
  - `timestamp` (integer):
  - `inSatoshi` (integer):
  - `outSatoshi` (integer):
  - `brc20` (object): Only BRC20 transfer have this value
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

### Fetch raw inscription content by id or number
<a id="fetch-raw-inscription-content-by-id-or-number"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/inscription/content/{inscriptionId}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscription Indexer/getInscriptionContent)  

#### Description
Streams the inscription content body for rendering, preview, or archival workflows. The identifier may be an inscription id or inscription number where supported; callers should trust the returned content type from inscription metadata and avoid executing untrusted content directly.

#### Parameters
- `inscriptionId` (path, string) **(required)**: Inscription id, or an inscription number accepted by this endpoint.

#### Response (200)
Successful operation

#### Response (401)
Invalid API Key


---

### List inscription mint and transfer events by block range
<a id="list-inscription-mint-and-transfer-events-by-block-range"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/inscription/events`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscription Indexer/getInscriptionEvents)  

#### Description
Returns paginated inscription events with transfer flag, inscription id and number, address, content fields for mint events, transaction data, satoshi value, timestamp, and block metadata. Use it for indexer backfills, activity feeds, or monitoring; end=0 may include mempool-visible data that is not final.

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

### List inscriptions currently associated with an address
<a id="list-inscriptions-currently-associated-with-an-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/inscription-data`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscription Indexer/getInscriptionDataByAddress)  

#### Description
Returns paginated inscription metadata for an address with confirmed and unconfirmed totals, spend-pending counts, content metadata, optional BRC-20 payload, and UTXO context. Use it for wallet galleries and ownership views; unconfirmed and unconfirmed-spend values require extra caution before spending.

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
    - `hasDeligate` (boolean):
    - `hasMetaProtocal` (boolean):
    - `hasContentEncoding` (boolean):
    - `pointer` (integer):
    - `parent` (string):
    - `deligate` (string):
    - `metaprotocol` (string):
    - `metadata` (string):
    - `contentEncoding` (string):
    - `contentType` (string):
    - `contentLength` (integer):
    - `height` (integer):
    - `timestamp` (integer):
    - `inSatoshi` (integer):
    - `outSatoshi` (integer):
    - `brc20` (object): Only BRC20 transfer have this value
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

### List inscription-bearing UTXOs for an address
<a id="list-inscription-bearing-utxos-for-an-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/inscription-utxo-data`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscription Indexer/getInscriptionUtxoDataByAddress)  

#### Description
Returns paginated UTXO records that carry inscriptions for an address, along with confirmed, unconfirmed, and unconfirmed-spend totals. Use it to prepare wallet coin selection or inscription transfer screens; always revalidate UTXO ownership and mempool status before signing.

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

### List abandoned NFT-style inscription UTXOs for an address
<a id="list-abandoned-nft-style-inscription-utxos-for-an-address"></a>

**Method**: `GET`  
**Path**: `/v1/indexer/address/{address}/abandon-nft-utxo-data`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscription Indexer/getAbandonNftUtxoDataByAddress)  

#### Description
Returns abandoned inscription UTXO candidates with balance, counts, pagination, and UTXO details for an address. Use it for cleanup or wallet diagnostics; because these are spend-related candidates, verify current chain and mempool state before constructing any transaction.

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

