# Ordinals Collection MarketPlace API

This API provides endpoints for ordinals collection marketplace services

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [POST /v3/market/collection/auction/collection_statistic](#return-a-summary-of-collection) | Return a summary of collection. |
| [POST /v3/market/collection/auction/collection_statistic_list](#return-a-summary-of-collection) | Return a summary of collection. |
| [POST /v3/market/collection/auction/collection_summary](#get-the-collection-statistics-information-at-a-certain-address) | Get the collection statistics information at a certain address |
| [POST /v3/market/collection/auction/collection_inscriptions](#get-the-list-details-of-a-certain-collection-at-a-certain-address) | Get the list details of a certain collection at a certain address |
| [POST /v3/market/collection/auction/inscription_info](#retrieve-inscription-information-including-brc20-names-collection-it-is-necessary-to-first-determine-the-inscription-type-before-calling-the-relevant-services) | Retrieve inscription information, including brc20, names, collection. It is necessary to first determine the inscription type before calling the relevant services. |
| [POST /v3/market/collection/auction/inscription_info_list](#get-the-basic-listing-information-of-the-specified-inscription-list) | Get the basic listing information of the specified inscription list |
| [POST /v3/market/collection/auction/list](#retrieve-the-list-information-of-the-market) | Retrieve the list information of the market. |
| [POST /v3/market/collection/auction/actions](#get-information-on-listings-delistings-and-sales) | Get information on listings, delistings, and sales. |
| [POST /v3/market/collection/auction/create_put_on](#create-listing-order) | Create listing order. |
| [POST /v3/market/collection/auction/confirm_put_on](#confirm-listing-order) | Confirm listing order. |
| [POST /v3/market/collection/auction/create_bid_prepare](#return-params-before-creating-purchase-order) | Return params before creating purchase order. |
| [POST /v3/market/collection/auction/create_bid](#create-purchase-order) | Create purchase order. |
| [POST /v3/market/collection/auction/confirm_bid](#confirm-purchase-order) | Confirm purchase order. |
| [POST /v3/market/collection/auction/create_put_off](#create-delisting-order) | Create delisting order. |
| [POST /v3/market/collection/auction/confirm_put_off](#confirm-delisting-order) | Confirm delisting order. |
| [POST /v3/market/collection/auction/create_modify_price](#create-the-order-for-price-adjustment) | Create the order for price adjustment. |
| [POST /v3/market/collection/auction/confirm_modify_price](#confirm-the-order-for-price-adjustment) | Confirm the order for price adjustment. |

---

## MarketPlace-Collection

### Return a summary of collection.
<a id="return-a-summary-of-collection"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/collection_statistic`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/getCollectionStatistic)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
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

#### Response (200)
- `code` (number): 
- `msg` (string): 
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

#### Response (200)
- `code` (number): 
- `msg` (string): 
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

#### Response (200)
- `code` (number): 
- `msg` (string): 
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

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `auctionId` (string): 
  - `inscriptionId` (string): 
  - `inscriptionNumber` (number): 
  - `marketType` (string):  (example: `fixedPrice`)
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
  - `domainType` (string): Domain field
  - `utxo` (object):


---

### Get the basic listing information of the specified inscription list
<a id="get-the-basic-listing-information-of-the-specified-inscription-list"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/inscription_info_list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/getInscriptionInfoList)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `list` (array):
    - `auctionId` (string): 
    - `inscriptionId` (string): 
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

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `list` (array):
    - `auctionId` (string): 
    - `inscriptionId` (string): 
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
    - `domainType` (string): Domain field
  - `total` (number): 
  - `timestamp` (number): 

---

### Get information on listings, delistings, and sales.
<a id="get-information-on-listings-delistings-and-sales"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/actions`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/getMarketActions)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `list` (array):
    - `auctionId` (string): 
    - `inscriptionId` (string): 
    - `inscriptionNumber` (number): 
    - `event` (string): 
    - `price` (number): 
    - `from` (string): 
    - `to` (string): 
    - `timestamp` (number): 
    - `nftConfirmNum` (number): 
    - `nftType` (string): 
    - `endMsg` (string): An error message generated by the order
    - `newest` (boolean): The update order generates multiple events
    - `name` (string): Brc20 filed
    - `unitPrice` (number): Brc20 filed
    - `amount` (number): Brc20 filed
    - `domain` (string): Domain filed
    - `domainType` (string): Domain filed
    - `domainCategorys` (array):

    - `collectionId` (string): Collection filed
    - `collectionItemName` (string): Collection filed
    - `contentType` (string): Collection filed
    - `contentBody` (string): Collection filed
    - `attributes` (array):
      - `trait_type` (string): 
      - `value` (string): 
  - `total` (number): 

---

### Create listing order.
<a id="create-listing-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/create_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/createMarketPutOn)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `auctionId` (string): 
  - `psbt` (string): 
  - `signIndexes` (array):


---

### Confirm listing order.
<a id="confirm-listing-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/confirm_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/confirmMarketPutOn)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):


---

### Return params before creating purchase order.
<a id="return-params-before-creating-purchase-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/create_bid_prepare`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/createMarketBidPrepare)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
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

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `bidId` (string): 
  - `psbtBid` (string): Bid psbt
  - `psbtBid2` (string): Auction mode is used, and the current empty string can be passed
  - `psbtSettle` (string): Auction mode is used, and the current empty string can be passed
  - `serverFee` (number): The service fee charged by the platform
  - `networkFee` (number): BTC network total fee
  - `feeRate` (number): BTC network fee rate
  - `nftValue` (number): 
  - `bidSignIndexes` (array):


---

### Confirm purchase order.
<a id="confirm-purchase-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/confirm_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/confirmMarketBid)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `txid` (string): Transaction txid

---

### Create delisting order.
<a id="create-delisting-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/create_put_off`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/createMarketPutOff)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `psbt` (string): 
  - `txSize` (number): 
  - `btcSignIndexes` (array):

  - `nftSignIndexes` (array):


---

### Confirm delisting order.
<a id="confirm-delisting-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/confirm_put_off`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/confirmMarketPutOff)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `txid` (string): 

---

### Create the order for price adjustment.
<a id="create-the-order-for-price-adjustment"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/create_modify_price`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/createMarketModifyPrice)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `psbt` (string): 
  - `signIndexes` (array):


---

### Confirm the order for price adjustment.
<a id="confirm-the-order-for-price-adjustment"></a>

**Method**: `POST`  
**Path**: `/v3/market/collection/auction/confirm_modify_price`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Collection/confirmMarketModifyPrice)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):


---

