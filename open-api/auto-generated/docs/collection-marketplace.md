# Ordinals Collection MarketPlace API

This API provides endpoints for ordinals collection marketplace services

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [POST `/v3/market/collection/auction/collection_statistic`](#return-a-summary-of-collection) | Return a summary of collection. |
| [POST `/v3/market/collection/auction/collection_statistic_list`](#return-a-summary-of-collection) | Return a summary of collection. |
| [POST `/v3/market/collection/auction/collection_summary`](#get-the-collection-statistics-information-at-a-certain-address) | Get the collection statistics information at a certain address |
| [POST `/v3/market/collection/auction/collection_inscriptions`](#get-the-list-details-of-a-certain-collection-at-a-certain-address) | Get the list details of a certain collection at a certain address |
| [POST `/v3/market/collection/auction/inscription_info`](#retrieve-inscription-information-including-brc20-names-collection-it-is-necessary-to-first-determine-the-inscription-type-before-calling-the-relevant-services) | Retrieve inscription information, including brc20, names, collection. It is necessary to first determine the inscription type before calling the relevant services. |
| [POST `/v3/market/collection/auction/inscription_info_list`](#get-the-basic-listing-information-of-the-specified-inscription-list) | Get the basic listing information of the specified inscription list |
| [POST `/v3/market/collection/auction/list`](#retrieve-the-list-information-of-the-market) | Retrieve the list information of the market. |
| [POST `/v3/market/collection/auction/actions`](#get-information-on-listings-delistings-and-sales) | Get information on listings, delistings, and sales. |
| [POST `/v3/market/collection/auction/create_put_on`](#create-listing-order) | Create listing order. |
| [POST `/v3/market/collection/auction/confirm_put_on`](#confirm-listing-order) | Confirm listing order. |
| [POST `/v3/market/collection/auction/create_bid_prepare`](#return-params-before-creating-purchase-order) | Return params before creating purchase order. |
| [POST `/v3/market/collection/auction/create_bid`](#create-purchase-order) | Create purchase order. |
| [POST `/v3/market/collection/auction/confirm_bid`](#confirm-purchase-order) | Confirm purchase order. |
| [POST `/v3/market/collection/auction/create_put_off`](#create-delisting-order) | Create delisting order. |
| [POST `/v3/market/collection/auction/confirm_put_off`](#confirm-delisting-order) | Confirm delisting order. |
| [POST `/v3/market/collection/auction/create_modify_price`](#create-the-order-for-price-adjustment) | Create the order for price adjustment. |
| [POST `/v3/market/collection/auction/confirm_modify_price`](#confirm-the-order-for-price-adjustment) | Confirm the order for price adjustment. |

---

## MarketPlace-Collection

### Return a summary of collection.
<a id="return-a-summary-of-collection"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/collection_statistic`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/getCollectionStatistic)  

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

### Return a summary of collection.
<a id="return-a-summary-of-collection"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/collection_statistic_list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/getCollectionStatisticList)  

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

### Get the collection statistics information at a certain address
<a id="get-the-collection-statistics-information-at-a-certain-address"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/collection_summary`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/getCollectionSummary)  

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

### Get the list details of a certain collection at a certain address
<a id="get-the-list-details-of-a-certain-collection-at-a-certain-address"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/collection_inscriptions`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/getCollectionInscriptions)  

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

### Retrieve inscription information, including brc20, names, collection. It is necessary to first determine the inscription type before calling the relevant services.
<a id="retrieve-inscription-information-including-brc20-names-collection-it-is-necessary-to-first-determine-the-inscription-type-before-calling-the-relevant-services"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/inscription_info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/getInscriptionInfo)  

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

### Get the basic listing information of the specified inscription list
<a id="get-the-basic-listing-information-of-the-specified-inscription-list"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/inscription_info_list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/getInscriptionInfoList)  

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

### Retrieve the list information of the market.
<a id="retrieve-the-list-information-of-the-market"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/getMarketList)  

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

### Get information on listings, delistings, and sales.
<a id="get-information-on-listings-delistings-and-sales"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/actions`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/getMarketActions)  

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

### Create listing order.
<a id="create-listing-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/create_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/createMarketPutOn)  

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

### Confirm listing order.
<a id="confirm-listing-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/confirm_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/confirmMarketPutOn)  

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

### Return params before creating purchase order.
<a id="return-params-before-creating-purchase-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/create_bid_prepare`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/createMarketBidPrepare)  

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

### Create purchase order.
<a id="create-purchase-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/create_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/createMarketBid)  

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

### Confirm purchase order.
<a id="confirm-purchase-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/confirm_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/confirmMarketBid)  

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

### Create delisting order.
<a id="create-delisting-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/create_put_off`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/createMarketPutOff)  

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

### Confirm delisting order.
<a id="confirm-delisting-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/confirm_put_off`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/confirmMarketPutOff)  

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

### Create the order for price adjustment.
<a id="create-the-order-for-price-adjustment"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/create_modify_price`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/createMarketModifyPrice)  

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

### Confirm the order for price adjustment.
<a id="confirm-the-order-for-price-adjustment"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/confirm_modify_price`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/confirmMarketModifyPrice)  

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

