# Runes MarketPlace API

This API provides endpoints for runes marketplace services

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [POST /v3/market/runes/auction/runes_types](#get-statistical-data) | Get statistical data. |
| [POST /v3/market/runes/auction/runes_types_specified](#get-statistical-data-for-specified-runes) | Get statistical data for specified runes. |
| [POST /v3/market/runes/auction/list](#retrieve-the-list-information-of-the-market) | Retrieve the list information of the market. |
| [POST /v3/market/runes/auction/actions](#get-information-on-listings-delistings-and-sales) | Get information on listings, delistings, and sales. |
| [POST /v3/market/runes/auction/create_put_on](#create-listing-order) | Create listing order. |
| [POST /v3/market/runes/auction/confirm_put_on](#confirm-listing-order) | Confirm listing order. |
| [POST /v3/market/runes/auction/create_bid_prepare](#return-params-before-creating-purchase-order) | Return params before creating purchase order. |
| [POST /v3/market/runes/auction/create_bid](#create-purchase-order) | Create purchase order. |
| [POST /v3/market/runes/auction/confirm_bid](#confirm-purchase-order) | Confirm purchase order. |
| [POST /v3/market/runes/auction/create_put_off](#create-delisting-order) | Create delisting order. |
| [POST /v3/market/runes/auction/confirm_put_off](#confirm-delisting-order) | Confirm delisting order. |
| [POST /v3/market/runes/auction/create_modify_price](#create-the-order-for-price-adjustment) | Create the order for price adjustment. |
| [POST /v3/market/runes/auction/confirm_modify_price](#confirm-the-order-for-price-adjustment) | Confirm the order for price adjustment. |
| [POST /v3/market/runes/auction/create_batch_put_on](#create-batch-listing-order) | Create batch listing order. |
| [POST /v3/market/runes/auction/confirm_batch_put_on](#confirm-batch-listing-order) | Confirm batch listing order. |
| [POST /v3/market/runes/auction/create_batch_bid_prepare](#return-params-before-creating-purchase-order) | Return params before creating purchase order. |
| [POST /v3/market/runes/auction/create_batch_bid](#create-purchase-order) | Create purchase order. |
| [POST /v3/market/runes/auction/confirm_batch_bid](#confirm-purchase-order) | Confirm purchase order. |

---

## MarketPlace-Runes

### Get statistical data.
<a id="get-statistical-data"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/runes_types`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Runes/getRunesTypes)  

#### Description
Get statistical data, price, market capitalization, etc. for runes.

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `BTCPrice` (number): 
  - `list` (array):
    - `tick` (string): 
    - `curPrice` (number): 
    - `changePrice` (number): 
    - `btcVolume` (number): 
    - `amountVolume` (number): 
    - `cap` (string): 
    - `holders` (integer): 
    - `transactions` (integer): 
    - `warning` (boolean): 

---

### Get statistical data for specified runes.
<a id="get-statistical-data-for-specified-runes"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/runes_types_specified`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Runes/getRunesTypesSpecified)  

#### Description
Get statistical data, price, market capitalization, etc. for Runes.

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `tick` (string): 
  - `symbol` (string): 
  - `curPrice` (number): 
  - `changePrice` (number): 
  - `btcVolume` (number): 
  - `amountVolume` (number): 
  - `cap` (string): 
  - `capUSD` (string): 
  - `deployTime` (integer): 
  - `holders` (integer): 
  - `number` (integer): 
  - `transactions` (integer): 
  - `warning` (boolean): 

---

### Retrieve the list information of the market.
<a id="retrieve-the-list-information-of-the-market"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Runes/getRunesAuctionList)  

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
    - `tick` (string): Brc20 field
    - `limit` (number): Brc20 field
    - `amount` (number): Brc20 field
    - `unitPrice` (number): Brc20 field
  - `total` (number): 
  - `timestamp` (number): 

---

### Get information on listings, delistings, and sales.
<a id="get-information-on-listings-delistings-and-sales"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/actions`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Runes/getRunesAuctionActions)  

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
**Path**: `/v3/market/runes/auction/create_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Runes/createRunesPutOn)  

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
**Path**: `/v3/market/runes/auction/confirm_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Runes/confirmRunesPutOn)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):


---

### Return params before creating purchase order.
<a id="return-params-before-creating-purchase-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/create_bid_prepare`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Runes/createRunesBidPrepare)  

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
**Path**: `/v3/market/runes/auction/create_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Runes/createRunesBid)  

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
**Path**: `/v3/market/runes/auction/confirm_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Runes/confirmRunesBid)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `txid` (string): Transaction txid

---

### Create delisting order.
<a id="create-delisting-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/create_put_off`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Runes/createRunesPutOff)  

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
**Path**: `/v3/market/runes/auction/confirm_put_off`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Runes/confirmRunesPutOff)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `txid` (string): 

---

### Create the order for price adjustment.
<a id="create-the-order-for-price-adjustment"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/create_modify_price`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Runes/createRunesModifyPrice)  

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
**Path**: `/v3/market/runes/auction/confirm_modify_price`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Runes/confirmRunesModifyPrice)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):


---

### Create batch listing order.
<a id="create-batch-listing-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/create_batch_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Runes/createRunesBatchPutOn)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `batchAuctionId` (string): 
  - `psbt` (string): 
  - `signIndexes` (array):


---

### Confirm batch listing order.
<a id="confirm-batch-listing-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/confirm_batch_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Runes/confirmRunesBatchPutOn)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):


---

### Return params before creating purchase order.
<a id="return-params-before-creating-purchase-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/create_batch_bid_prepare`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Runes/createRunesBatchBidPrepare)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `serverFee` (number): Expected service fee.
  - `serverReal` (number): Real service fee.
  - `serverFeeRate` (number): Real service fee rate.
  - `txSize` (number): Estimated transaction size
  - `feeRate` (number): Network fee rate
  - `availableBalance` (number): Available confirmed balance for the user
  - `validAuctionIds` (array):

  - `invalidAuctionIds` (array):


---

### Create purchase order.
<a id="create-purchase-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/create_batch_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Runes/createRunesBatchBid)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `bidId` (string): 
  - `psbtBid` (string): Bid psbt
  - `serverFee` (number): The service fee charged by the platform
  - `networkFee` (number): BTC network total fee
  - `feeRate` (number): BTC network fee rate
  - `bidSignIndexes` (array):


---

### Confirm purchase order.
<a id="confirm-purchase-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/confirm_batch_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Runes/confirmRunesBatchBid)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `txid` (string): Transaction txid

---

