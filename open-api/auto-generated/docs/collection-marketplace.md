# Ordinals Collection Marketplace API

This API provides endpoints for Ordinals collection marketplace services, including collection statistics, listing search, address collection summaries, inscription listing details, order preparation, and order submission.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [POST `/v3/market/collection/auction/collection_statistic`](#get-collection-market-statistics) | Get collection market statistics |
| [POST `/v3/market/collection/auction/collection_statistic_list`](#list-collection-market-statistics) | List collection market statistics |
| [POST `/v3/market/collection/auction/collection_summary`](#get-address-collection-summary) | Get address collection summary |
| [POST `/v3/market/collection/auction/collection_inscriptions`](#list-address-collection-inscriptions) | List address collection inscriptions |
| [POST `/v3/market/collection/auction/inscription_info`](#get-marketplace-inscription-detail) | Get marketplace inscription detail |
| [POST `/v3/market/collection/auction/inscription_info_list`](#get-marketplace-inscription-details-in-batch) | Get marketplace inscription details in batch |
| [POST `/v3/market/collection/auction/list`](#search-ordinals-collection-marketplace-listings) | Search Ordinals collection marketplace listings |
| [POST `/v3/market/collection/auction/actions`](#list-ordinals-collection-marketplace-activity-history) | List Ordinals collection marketplace activity history |
| [POST `/v3/market/collection/auction/create_put_on`](#create-collection-listing-psbt-draft) | Create collection listing PSBT draft |
| [POST `/v3/market/collection/auction/confirm_put_on`](#publish-signed-collection-listing) | Publish signed collection listing |
| [POST `/v3/market/collection/auction/create_bid_prepare`](#estimate-collection-purchase-fees-and-balance) | Estimate collection purchase fees and balance |
| [POST `/v3/market/collection/auction/create_bid`](#create-collection-purchase-psbt-order) | Create collection purchase PSBT order |
| [POST `/v3/market/collection/auction/confirm_bid`](#submit-signed-collection-purchase-order) | Submit signed collection purchase order |
| [POST `/v3/market/collection/auction/create_put_off`](#create-collection-delisting-psbt-draft) | Create collection delisting PSBT draft |
| [POST `/v3/market/collection/auction/confirm_put_off`](#remove-signed-collection-listing) | Remove signed collection listing |
| [POST `/v3/market/collection/auction/create_modify_price`](#create-collection-price-update-psbt-draft) | Create collection price-update PSBT draft |
| [POST `/v3/market/collection/auction/confirm_modify_price`](#apply-signed-collection-listing-price-update) | Apply signed collection listing price update |

---

## Marketplace-Collections

### Get collection market statistics
<a id="get-collection-market-statistics"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/collection_statistic`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Collections/getCollectionStatistic)  

#### Description
Query read-only marketplace statistics for a specific Ordinals collection, including floor price, listed count, and volume. This query-style POST only reads market data; readonly true and requires confirmation false.

#### Request Body
Content-Type: `application/json` **(required)**

- `collectionId` (string): required

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `collectionId` (string):
  - `name` (string): Collection name
  - `desc` (string): Collection desc
  - `icon` (string): Collection icon
  - `iconContentType` (string): Collection icon content type
  - `btcValue` (number): Total transaction volume
  - `floorPrice` (number):
  - `pricePercent` (number):
  - `listed` (number): The quantity listed for sale
  - `total` (number): The quantity of items already produced
  - `supply` (number):
  - `twitter` (string):
  - `discord` (string):
  - `website` (string):
  - `verification` (boolean): Officially certified


---

### List collection market statistics
<a id="list-collection-market-statistics"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/collection_statistic_list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Collections/getCollectionStatisticList)  

#### Description
Query read-only marketplace statistics for Ordinals collections with filters and pagination. This query-style POST only reads market data; readonly true and requires confirmation false.

#### Request Body
Content-Type: `application/json` **(required)**

- `filter` (object):
  - `timeType` (string): required
  - `name` (string):
  - `collections` (array):
- `start` (number): required
- `limit` (number): required

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `list` (array):
    - `collectionId` (string):
    - `name` (string): Collection name
    - `desc` (string): Collection desc
    - `icon` (string): Collection icon
    - `iconContentType` (string): Collection icon content type
    - `btcValue` (number): Total transaction volume
    - `floorPrice` (number):
    - `pricePercent` (number):
    - `listed` (number): The quantity listed for sale
    - `total` (number): The quantity of items already produced
    - `supply` (number):
    - `twitter` (string):
    - `discord` (string):
    - `website` (string):
    - `verification` (boolean): Officially certified
  - `total` (number):


---

### Get address collection summary
<a id="get-address-collection-summary"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/collection_summary`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Collections/getCollectionSummary)  

#### Description
Query read-only Ordinals collection holdings summary for an address. This query-style POST only reads address and collection data; readonly true and requires confirmation false.

#### Request Body
Content-Type: `application/json` **(required)**

- `firstCollectionId` (string):
- `address` (string): required

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `list` (array):
    - `collectionId` (string):
    - `icon` (string):
    - `iconContentType` (string):
    - `name` (string):
    - `total` (number):


---

### List address collection inscriptions
<a id="list-address-collection-inscriptions"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/collection_inscriptions`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Collections/getCollectionInscriptions)  

#### Description
Query read-only inscription details for a collection held by an address. This query-style POST only reads collection data; readonly true and requires confirmation false.

#### Request Body
Content-Type: `application/json` **(required)**

- `collectionId` (string): required
- `address` (string): required
- `start` (number): required
- `limit` (number): required

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `list` (array):
    - `collectionId` (string):
    - `collectionName` (string):
    - `collectionItemName` (string):
    - `collectionHighResImgUrl` (string):
    - `inscriptionId` (string):
    - `inscriptionNumber` (number):
    - `contentType` (string):
    - `listed` (boolean):
  - `total` (number):


---

### Get marketplace inscription detail
<a id="get-marketplace-inscription-detail"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/inscription_info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Collections/getCollectionMarketInscriptionInfo)  

#### Description
Query read-only marketplace inscription detail for one inscription, including listing and asset metadata. This query-style POST only reads marketplace data; readonly true and requires confirmation false.

#### Request Body
Content-Type: `application/json` **(required)**

- `inscriptionId` (string): required

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `auctionId` (string):
  - `inscriptionId` (string): required
  - `inscriptionNumber` (number):
  - `marketType` (string): example: `"fixedPrice"`
  - `address` (string):
  - `price` (number):
  - `notSupport` (boolean): Domain name content support on sale
  - `verification` (boolean): Whether the collection is validated
  - `nftType` (string):
  - `tick` (string): Brc20 field
  - `limit` (number): Brc20 field
  - `amount` (number): Brc20 field
  - `unitPrice` (number): Brc20 field
  - `collectionId` (string): Collection field
  - `contentType` (string): Collection field
  - `contentBody` (string): Collection field
  - `collectionItemName` (string): Collection field
  - `collectionHighResImgUrl` (string): Collection field
  - `collectionName` (string): Collection field
  - `notOnSale` (boolean): Collection field
  - `domain` (string): Domain field
  - `domainHex` (string): Domain field
  - `domainType` (string): Domain field; enum: `sats`, `unisat`, `btc`, `xbt`, `ord`, `gm`, `bitmap`, `x`, `null`
  - `utxo` (object): The UTXO where the inscription is located


---

### Get marketplace inscription details in batch
<a id="get-marketplace-inscription-details-in-batch"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/inscription_info_list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Collections/getInscriptionInfoList)  

#### Description
Query read-only marketplace listing details for multiple inscriptions. This query-style POST only reads marketplace data; readonly true and requires confirmation false.

#### Request Body
Content-Type: `application/json` **(required)**

- `address` (string):
- `inscriptionIds` (array):

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `list` (array):
    - `auctionId` (string):
    - `inscriptionId` (string): required
    - `inscriptionNumber` (number):
    - `marketType` (string):
    - `address` (string):
    - `price` (number):
    - `nftType` (string):
    - `status` (string):


---

### Search Ordinals collection marketplace listings
<a id="search-ordinals-collection-marketplace-listings"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Collections/getMarketList)  

#### Description
Query read-only Ordinals collection marketplace listings with filters, sorting, and pagination. This query-style POST only reads marketplace data; readonly true and requires confirmation false.

#### Request Body
Content-Type: `application/json` **(required)**

- `filter` (object):
  - `nftType` (string): required; enum: `collection`
  - `address` (string):
  - `tick` (string):
  - `minPrice` (number):
  - `maxPrice` (number):
  - `nftConfirm` (boolean):
  - `isEnd` (boolean): Whether order ends
  - `domainType` (string): enum: `sats`, `unisat`, `btc`, `xbt`, `ord`, `gm`, `bitmap`, `x`
  - `domainMinLength` (number):
  - `domainMaxLength` (integer):
  - `domainCategory` (string):
  - `domainFuzzy` (string): Fuzzy domain name search
  - `collectionId` (string):
  - `collectionFuzzy` (string): Fuzzy collection name search
  - `all` (boolean): Ignore start and limit and return all collection data
- `sort` (object):
  - `unitPrice` (number): enum: `1`, `-1`
  - `onSaleTime` (number): enum: `1`, `-1`
  - `initPrice` (number): enum: `1`, `-1`
  - `inscriptionNumber` (number): enum: `1`, `-1`
- `start` (number): required; The data is looked up from start
- `limit` (number): required; Limit the amount of data

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `list` (array):
    - `auctionId` (string):
    - `inscriptionId` (string): required
    - `inscriptionNumber` (number):
    - `marketType` (string):
    - `address` (string):
    - `price` (number):
    - `notSupport` (boolean): Domain name content support on sale
    - `verification` (boolean): Whether the collection is validated
    - `nftType` (string):
    - `tick` (string): Brc20 field
    - `limit` (number): Brc20 field
    - `amount` (number): Brc20 field
    - `unitPrice` (number): Brc20 field
    - `collectionId` (string): Collection field
    - `contentType` (string): Collection field
    - `contentBody` (string): Collection field
    - `collectionItemName` (string): Collection field
    - `collectionHighResImgUrl` (string): Collection field
    - `collectionName` (string): Collection field
    - `notOnSale` (boolean): Collection field
    - `domain` (string): Domain field
    - `domainHex` (string): Domain field
    - `domainType` (string): Domain field; enum: `sats`, `unisat`, `btc`, `xbt`, `ord`, `gm`, `bitmap`, `x`, `null`
  - `total` (number): required
  - `timestamp` (number):


---

### List Ordinals collection marketplace activity history
<a id="list-ordinals-collection-marketplace-activity-history"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/actions`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Collections/getMarketActions)  

#### Description
Query read-only Ordinals collection marketplace activity history such as listings, delistings, sales, claims, and updates. This query-style POST only reads marketplace data; readonly true and requires confirmation false.

#### Request Body
Content-Type: `application/json` **(required)**

- `filter` (object):
  - `nftType` (string): enum: `collection`
  - `address` (string):
  - `inscriptionId` (string):
  - `event` (string): Event type: Cancel, Listed, Sold, Updated; enum: `Cancel`, `Claim`, `Listed`, `Sold`, `Updated`
  - `tick` (string):
  - `domainType` (string):
  - `collectionId` (string):
- `start` (number): required
- `limit` (number): required

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `list` (array):
    - `auctionId` (string): required
    - `inscriptionId` (string): required
    - `inscriptionNumber` (number): required
    - `event` (string): required; enum: `Listed`, `Sold`, `Cancel`, `Claim`, `Updated`
    - `price` (number): required
    - `from` (string): required
    - `to` (string): required
    - `timestamp` (number): required
    - `nftConfirmNum` (number):
    - `nftType` (string): enum: `brc20`, `domain`, `collection`
    - `endMsg` (string): An error message generated by the order
    - `newest` (boolean): The update order generates multiple events
    - `name` (string): Brc20 filed
    - `unitPrice` (number): Brc20 filed
    - `amount` (number): Brc20 filed
    - `domain` (string): Domain filed
    - `domainType` (string): Domain filed; enum: `sats`, `unisat`, `btc`, `xbt`, `ord`, `gm`, `bitmap`, `x`, `null`
    - `domainCategorys` (array): Domain filed
    - `collectionId` (string): Collection filed
    - `collectionItemName` (string): Collection filed
    - `contentType` (string): Collection filed
    - `contentBody` (string): Collection filed
    - `attributes` (array): Collection filed
      - `trait_type` (string):
      - `value` (string):
  - `total` (number): required


---

### Create collection listing PSBT draft
<a id="create-collection-listing-psbt-draft"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/create_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Collections/createMarketPutOn)  

#### Description
Creates an Ordinals collection listing draft and returns auctionId, PSBT, and signing indexes for the seller. Review inscriptionId, collectionId, item metadata, initPrice, unitPrice, marketType, and receiving address before signing or confirming the listing.

#### Request Body
Content-Type: `application/json` **(required)**

- `nftType` (string):
- `inscriptionId` (string): required
- `initPrice` (string): required; Set the initial total price
- `unitPrice` (string): required; Unit Price (for tick)
- `pubkey` (string): required; User public key
- `marketType` (string): required; enum: `auction`, `fixedPrice`; example: `"fixedPrice"`
- `btcAddress` (string): (Optional) Only for multi-address wallet, such as Xverse, hiro. Specifies the BTC receive address

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `auctionId` (string): required
  - `psbt` (string): required
  - `signIndexes` (array): Specifies the signature location used by the xverse wallet


---

### Publish signed collection listing
<a id="publish-signed-collection-listing"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/confirm_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Collections/confirmMarketPutOn)  

#### Description
Confirms the seller-signed listing PSBT and activates the Ordinals collection marketplace listing. Verify auctionId, PSBT encoding, inscriptionId, collection item, listing price, seller address, and market type before submitting.

#### Request Body
Content-Type: `application/json` **(required)**

- `auctionId` (string): required
- `psbt` (string): required
- `fromBase64` (boolean): Is Base64 format, the default is hex format

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):


---

### Estimate collection purchase fees and balance
<a id="estimate-collection-purchase-fees-and-balance"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/create_bid_prepare`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Collections/createMarketBidPrepare)  

#### Description
Returns pre-purchase fee estimates, available balances, network fee rate, transaction size, and inscription value for an Ordinals collection listing. This is a quote/material preparation step only; before any later purchase submission, verify auctionId, bidPrice, buyer address, feeRate, and inscription details.

#### Request Body
Content-Type: `application/json` **(required)**

- `auctionId` (string): required
- `bidPrice` (number): required
- `address` (string): required; Bidder address
- `pubkey` (string): required; Bidder pubkey

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `serverFee` (number): Expected service fee.
  - `serverReal` (number): Real service fee.
  - `serverFeeRate` (number): Real service fee rate.
  - `txSize` (number): Estimated transaction size
  - `nftValue` (number): Satoshis carried by the inscription
  - `feeRate` (number): Network fee rate
  - `availableBalance` (number): Available confirmed balance for the user
  - `allBalance` (number): Available total balance for the user


---

### Create collection purchase PSBT order
<a id="create-collection-purchase-psbt-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/create_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Collections/createMarketBid)  

#### Description
Creates an Ordinals collection purchase order and returns bidId, PSBT data, signing indexes, server/network fees, feeRate, and inscription value. Confirm auctionId, bidPrice, buyer address, inscriptionId, collection item, and fee totals before requesting signatures.

#### Request Body
Content-Type: `application/json` **(required)**

- `auctionId` (string): required
- `bidPrice` (number): required
- `address` (string): required; Bidder address
- `pubkey` (string): required; Bidder pubkey
- `feeRate` (number): The user sets the rate
- `nftAddress` (string): (Optional) Only for multi-address wallet, such as Xverse, hiro. Inscription receiving address
- `utxos` (array): Custom utxo
  - `txid` (string):
  - `index` (number):

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `bidId` (string): required
  - `psbtBid` (string): required; Bid psbt
  - `psbtBid2` (string): Auction mode is used, and the current empty string can be passed
  - `psbtSettle` (string): Auction mode is used, and the current empty string can be passed
  - `serverFee` (number): required; The service fee charged by the platform
  - `networkFee` (number): required; BTC network total fee
  - `feeRate` (number): required; BTC network fee rate
  - `nftValue` (number): required
  - `bidSignIndexes` (array): Specifies the bid signature location used by the xverse wallet


---

### Submit signed collection purchase order
<a id="submit-signed-collection-purchase-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/confirm_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Collections/confirmMarketBid)  

#### Description
Submits the signed collection purchase PSBT and returns the settlement transaction id when accepted. Before calling, verify auctionId, bidId, PSBT content, final price, inscriptionId, buyer/seller addresses, and fee values because this can settle the purchase.

#### Request Body
Content-Type: `application/json` **(required)**

- `auctionId` (string): required
- `bidId` (string): required
- `psbtBid` (string): required
- `psbtBid2` (string): Auction mode is used, and the current empty string can be passed
- `psbtSettle` (string): Auction mode is used, and the current empty string can be passed
- `fromBase64` (boolean): Is Base64 format, the default is hex format

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `txid` (string): required; Transaction txid


---

### Create collection delisting PSBT draft
<a id="create-collection-delisting-psbt-draft"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/create_put_off`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Collections/createMarketPutOff)  

#### Description
Creates delisting signing material for an active Ordinals collection marketplace order, including PSBT/signing data when needed. Confirm auctionId, owner addresses, inscriptionId, and collection item before signing because the next confirmation removes the listing.

#### Request Body
Content-Type: `application/json` **(required)**

- `auctionId` (string): required
- `nftAddress` (string): (Optional) Only for multi-address wallet, such as Xverse, hiro. Inscription receiving address.
- `btcPubkey` (string): (Optional) Only for multi-address wallet, such as Xverse, hiro. The public key used in the inscription of the order.
- `utxos` (array): Custom utxo
  - `txid` (string):
  - `index` (number):
- `rbf` (boolean):
- `offChain` (boolean):

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `psbt` (string): required
  - `txSize` (number):
  - `btcSignIndexes` (array): Specifies the btc signature location used by the xverse wallet
  - `nftSignIndexes` (array): Specifies the nft signature location used by the xverse wallet


---

### Remove signed collection listing
<a id="remove-signed-collection-listing"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/confirm_put_off`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Collections/confirmMarketPutOff)  

#### Description
Confirms signed delisting data and removes the Ordinals collection listing from the marketplace. Verify auctionId, PSBT/signature payload, owner address, inscriptionId, and collection item before submitting.

#### Request Body
Content-Type: `application/json` **(required)**

- `auctionId` (string): required
- `psbt` (string): required
- `fromBase64` (boolean): Is Base64 format, the default is hex format
- `offChain` (boolean):

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `txid` (string): required


---

### Create collection price-update PSBT draft
<a id="create-collection-price-update-psbt-draft"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/create_modify_price`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Collections/createMarketModifyPrice)  

#### Description
Creates signing material to update an existing Ordinals collection listing price. Verify auctionId, inscriptionId, collection item, old and new prices, seller address, and returned PSBT/sign indexes before signing.

#### Request Body
Content-Type: `application/json` **(required)**

- `auctionId` (string): required
- `initPrice` (string): required
- `unitPrice` (string): required

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `psbt` (string): required
  - `signIndexes` (array): Specifies the signature location used by the xverse wallet


---

### Apply signed collection listing price update
<a id="apply-signed-collection-listing-price-update"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/confirm_modify_price`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Collections/confirmMarketModifyPrice)  

#### Description
Confirms signed price-update data and changes the active Ordinals collection listing price. Verify auctionId, signed PSBT, inscriptionId, seller address, and final price before submitting.

#### Request Body
Content-Type: `application/json` **(required)**

- `auctionId` (string): required
- `psbt` (string): required
- `fromBase64` (boolean): required

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):


---

