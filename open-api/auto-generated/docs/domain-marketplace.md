# Ordinals Domain MarketPlace API

This API provides endpoints for ordinals domain marketplace services.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [POST /v3/market/domain/auction/domain_types](#get-statistical-data) | Get statistical data. |
| [POST /v3/market/domain/auction/domain_statistic](#return-a-summary-of-domain) | Return a summary of domain. |
| [POST /v3/market/domain/auction/inscription_info](#retrieve-inscription-information-including-brc20-names-collection-it-is-necessary-to-first-determine-the-inscription-type-before-calling-the-relevant-services) | Retrieve inscription information, including brc20, names, collection. It is necessary to first determine the inscription type before calling the relevant services. |
| [POST /v3/market/domain/auction/inscription_info_list](#get-the-basic-listing-information-of-the-specified-inscription-list) | Get the basic listing information of the specified inscription list |
| [POST /v3/market/domain/auction/list](#retrieve-the-list-information-of-the-market) | Retrieve the list information of the market. |
| [POST /v3/market/domain/auction/actions](#get-information-on-listings-delistings-and-sales) | Get information on listings, delistings, and sales. |
| [POST /v3/market/domain/auction/create_put_on](#create-listing-order) | Create listing order. |
| [POST /v3/market/domain/auction/confirm_put_on](#confirm-listing-order) | Confirm listing order. |
| [POST /v3/market/domain/auction/create_bid_prepare](#return-params-before-creating-purchase-order) | Return params before creating purchase order. |
| [POST /v3/market/domain/auction/create_bid](#create-purchase-order) | Create purchase order. |
| [POST /v3/market/domain/auction/confirm_bid](#confirm-purchase-order) | Confirm purchase order. |
| [POST /v3/market/domain/auction/create_put_off](#create-delisting-order) | Create delisting order. |
| [POST /v3/market/domain/auction/confirm_put_off](#confirm-delisting-order) | Confirm delisting order. |
| [POST /v3/market/domain/auction/create_modify_price](#create-the-order-for-price-adjustment) | Create the order for price adjustment. |
| [POST /v3/market/domain/auction/confirm_modify_price](#confirm-the-order-for-price-adjustment) | Confirm the order for price adjustment. |

---

## MarketPlace-Domain

### Get statistical data.
<a id="get-statistical-data"></a>

**Method**: `POST`  
**Path**: `/v3/market/domain/auction/domain_types`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Domain/getDomainTypes)  

#### Description
Get statistical data, price, market capitalization, etc. for domain.

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `list` (array):
    - `btcVolume` (number): 
    - `btcVolumePercent` (number): 
    - `amountVolume` (number): 
    - `curPrice` (integer): 
    - `domainType` (string): 

---

### Return a summary of domain.
<a id="return-a-summary-of-domain"></a>

**Method**: `POST`  
**Path**: `/v3/market/domain/auction/domain_statistic`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Domain/getDomainStatistic)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `list` (array):
    - `demo` (string): 
    - `domainCategory` (string): 
    - `total` (integer): 

---

### Retrieve inscription information, including brc20, names, collection. It is necessary to first determine the inscription type before calling the relevant services.
<a id="retrieve-inscription-information-including-brc20-names-collection-it-is-necessary-to-first-determine-the-inscription-type-before-calling-the-relevant-services"></a>

**Method**: `POST`  
**Path**: `/v3/market/domain/auction/inscription_info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Domain/getDomainInscriptionInfo)  

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
**Path**: `/v3/market/domain/auction/inscription_info_list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Domain/getDomainInscriptionInfoList)  

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
**Path**: `/v3/market/domain/auction/list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Domain/getDomainMarketList)  

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
**Path**: `/v3/market/domain/auction/actions`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Domain/getDomainMarketActions)  

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
**Path**: `/v3/market/domain/auction/create_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Domain/createDomainMarketPutOn)  

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
**Path**: `/v3/market/domain/auction/confirm_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Domain/confirmDomainMarketPutOn)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):


---

### Return params before creating purchase order.
<a id="return-params-before-creating-purchase-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/domain/auction/create_bid_prepare`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Domain/createDomainMarketBidPrepare)  

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
**Path**: `/v3/market/domain/auction/create_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Domain/createDomainMarketBid)  

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
**Path**: `/v3/market/domain/auction/confirm_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Domain/confirmDomainMarketBid)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `txid` (string): Transaction txid

---

### Create delisting order.
<a id="create-delisting-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/domain/auction/create_put_off`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Domain/createDomainMarketPutOff)  

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
**Path**: `/v3/market/domain/auction/confirm_put_off`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Domain/confirmDomainMarketPutOff)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `txid` (string): 

---

### Create the order for price adjustment.
<a id="create-the-order-for-price-adjustment"></a>

**Method**: `POST`  
**Path**: `/v3/market/domain/auction/create_modify_price`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Domain/createDomainMarketModifyPrice)  

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
**Path**: `/v3/market/domain/auction/confirm_modify_price`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Domain/confirmDomainMarketModifyPrice)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):


---

