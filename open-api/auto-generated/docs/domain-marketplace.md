# Ordinals Domain Marketplace API

This API provides endpoints for Ordinals domain marketplace services, including domain type statistics, domain listing search, inscription details, activity history, and marketplace order workflows.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [POST `/v3/market/domain/auction/domain_types`](#list-domain-type-market-statistics) | List domain type market statistics |
| [POST `/v3/market/domain/auction/domain_statistic`](#get-domain-type-category-statistics) | Get domain type category statistics |
| [POST `/v3/market/domain/auction/inscription_info`](#get-marketplace-inscription-detail) | Get marketplace inscription detail |
| [POST `/v3/market/domain/auction/inscription_info_list`](#get-marketplace-inscription-details-in-batch) | Get marketplace inscription details in batch |
| [POST `/v3/market/domain/auction/list`](#search-ordinals-domain-marketplace-listings) | Search Ordinals domain marketplace listings |
| [POST `/v3/market/domain/auction/actions`](#list-ordinals-domain-marketplace-activity-history) | List Ordinals domain marketplace activity history |
| [POST `/v3/market/domain/auction/create_put_on`](#create-domain-listing-psbt-draft) | Create domain listing PSBT draft |
| [POST `/v3/market/domain/auction/confirm_put_on`](#publish-signed-domain-listing) | Publish signed domain listing |
| [POST `/v3/market/domain/auction/create_bid_prepare`](#estimate-domain-purchase-fees-and-balance) | Estimate domain purchase fees and balance |
| [POST `/v3/market/domain/auction/create_bid`](#create-domain-purchase-psbt-order) | Create domain purchase PSBT order |
| [POST `/v3/market/domain/auction/confirm_bid`](#submit-signed-domain-purchase-order) | Submit signed domain purchase order |
| [POST `/v3/market/domain/auction/create_put_off`](#create-domain-delisting-psbt-draft) | Create domain delisting PSBT draft |
| [POST `/v3/market/domain/auction/confirm_put_off`](#remove-signed-domain-listing) | Remove signed domain listing |
| [POST `/v3/market/domain/auction/create_modify_price`](#create-domain-price-update-psbt-draft) | Create domain price-update PSBT draft |
| [POST `/v3/market/domain/auction/confirm_modify_price`](#apply-signed-domain-listing-price-update) | Apply signed domain listing price update |

---

## Marketplace-Domains

### List domain type market statistics
<a id="list-domain-type-market-statistics"></a>

**Method**: `POST`  
**Path**: `/v3/market/domain/auction/domain_types`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Domains/getDomainTypes)  

#### Description
Query read-only Ordinals domain marketplace statistics grouped by domain type. This query-style POST only reads market data; readonly true and requires confirmation false.

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `list` (array):
    - `btcVolume` (number):
    - `btcVolumePercent` (number):
    - `amountVolume` (number):
    - `curPrice` (integer):
    - `domainType` (string):


---

### Get domain type category statistics
<a id="get-domain-type-category-statistics"></a>

**Method**: `POST`  
**Path**: `/v3/market/domain/auction/domain_statistic`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Domains/getDomainStatistic)  

#### Description
Query read-only marketplace statistics for categories under a specified Ordinals domain type. This query-style POST only reads market data; readonly true and requires confirmation false.

#### Request Body
Content-Type: `application/json` **(required)**

- `domainType` (string): required

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `list` (array):
    - `demo` (string):
    - `domainCategory` (string):
    - `total` (integer):


---

### Get marketplace inscription detail
<a id="get-marketplace-inscription-detail"></a>

**Method**: `POST`  
**Path**: `/v3/market/domain/auction/inscription_info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Domains/getDomainInscriptionInfo)  

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
**Path**: `/v3/market/domain/auction/inscription_info_list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Domains/getDomainInscriptionInfoList)  

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

### Search Ordinals domain marketplace listings
<a id="search-ordinals-domain-marketplace-listings"></a>

**Method**: `POST`  
**Path**: `/v3/market/domain/auction/list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Domains/getDomainMarketList)  

#### Description
Query read-only Ordinals domain marketplace listings with filters, sorting, and pagination. This query-style POST only reads marketplace data; readonly true and requires confirmation false.

#### Request Body
Content-Type: `application/json` **(required)**

- `filter` (object):
  - `nftType` (string): required; enum: `domain`
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

### List Ordinals domain marketplace activity history
<a id="list-ordinals-domain-marketplace-activity-history"></a>

**Method**: `POST`  
**Path**: `/v3/market/domain/auction/actions`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Domains/getDomainMarketActions)  

#### Description
Query read-only Ordinals domain marketplace activity history such as listings, delistings, sales, claims, and updates. This query-style POST only reads marketplace data; readonly true and requires confirmation false.

#### Request Body
Content-Type: `application/json` **(required)**

- `filter` (object):
  - `nftType` (string): enum: `domain`
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

### Create domain listing PSBT draft
<a id="create-domain-listing-psbt-draft"></a>

**Method**: `POST`  
**Path**: `/v3/market/domain/auction/create_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Domains/createDomainMarketPutOn)  

#### Description
Creates an Ordinals domain listing draft and returns auctionId, PSBT, and signing indexes for the seller. Review inscriptionId, domain name/type/category, initPrice, unitPrice, marketType, and receiving address before signing or confirming the listing.

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

### Publish signed domain listing
<a id="publish-signed-domain-listing"></a>

**Method**: `POST`  
**Path**: `/v3/market/domain/auction/confirm_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Domains/confirmDomainMarketPutOn)  

#### Description
Confirms the seller-signed listing PSBT and activates the Ordinals domain marketplace listing. Verify auctionId, PSBT encoding, domain name, listing price, seller address, and market type before submitting.

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

### Estimate domain purchase fees and balance
<a id="estimate-domain-purchase-fees-and-balance"></a>

**Method**: `POST`  
**Path**: `/v3/market/domain/auction/create_bid_prepare`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Domains/createDomainMarketBidPrepare)  

#### Description
Returns pre-purchase fee estimates, available balances, network fee rate, transaction size, and inscription value for an Ordinals domain listing. This is a quote/material preparation step only; before any later purchase submission, verify auctionId, bidPrice, buyer address, feeRate, and domain name.

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

### Create domain purchase PSBT order
<a id="create-domain-purchase-psbt-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/domain/auction/create_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Domains/createDomainMarketBid)  

#### Description
Creates an Ordinals domain purchase order and returns bidId, PSBT data, signing indexes, server/network fees, feeRate, and inscription value. Confirm auctionId, bidPrice, buyer address, domain name/type, and fee totals before requesting signatures.

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

### Submit signed domain purchase order
<a id="submit-signed-domain-purchase-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/domain/auction/confirm_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Domains/confirmDomainMarketBid)  

#### Description
Submits the signed domain purchase PSBT and returns the settlement transaction id when accepted. Before calling, verify auctionId, bidId, PSBT content, final price, domain name, buyer/seller addresses, and fee values because this can settle the purchase.

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

### Create domain delisting PSBT draft
<a id="create-domain-delisting-psbt-draft"></a>

**Method**: `POST`  
**Path**: `/v3/market/domain/auction/create_put_off`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Domains/createDomainMarketPutOff)  

#### Description
Creates delisting signing material for an active Ordinals domain marketplace order, including PSBT/signing data when needed. Confirm auctionId, owner addresses, and domain name before signing because the next confirmation removes the listing.

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

### Remove signed domain listing
<a id="remove-signed-domain-listing"></a>

**Method**: `POST`  
**Path**: `/v3/market/domain/auction/confirm_put_off`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Domains/confirmDomainMarketPutOff)  

#### Description
Confirms signed delisting data and removes the Ordinals domain listing from the marketplace. Verify auctionId, PSBT/signature payload, owner address, and target domain name before submitting.

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

### Create domain price-update PSBT draft
<a id="create-domain-price-update-psbt-draft"></a>

**Method**: `POST`  
**Path**: `/v3/market/domain/auction/create_modify_price`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Domains/createDomainMarketModifyPrice)  

#### Description
Creates signing material to update an existing Ordinals domain listing price. Verify auctionId, domain name, old and new prices, seller address, and returned PSBT/sign indexes before signing.

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

### Apply signed domain listing price update
<a id="apply-signed-domain-listing-price-update"></a>

**Method**: `POST`  
**Path**: `/v3/market/domain/auction/confirm_modify_price`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Domains/confirmDomainMarketModifyPrice)  

#### Description
Confirms signed price-update data and changes the active Ordinals domain listing price. Verify auctionId, signed PSBT, domain name, seller address, and final price before submitting.

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

