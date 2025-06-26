# BRC20 MarketPlace API

This API provides endpoints for BRC20 marketplace services

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---

## 📑 Table of Contents

- [MarketPlace-BRC20](#marketplace-brc20)
  - [/v3/market/brc20/auction/bind_info (Get the address bind info.) ](#get-the-address-bind-info)
  - [/v3/market/brc20/auction/brc20_kline (Get tick k line.) ](#get-tick-k-line)
  - [/v3/market/brc20/auction/brc20_types (Get statistical data, price, market capitalization, etc. for BRC20.) ](#get-statistical-data-price-market-capitalization-etc-for-brc20)
  - [/v3/market/brc20/auction/brc20_types_specified (Get statistical data, price, market capitalization, etc. for BRC20.) ](#get-statistical-data-price-market-capitalization-etc-for-brc20)
  - [/v3/market/brc20/auction/bind (Bind btcAddress and nftAddress.) ](#bind-btcaddress-and-nftaddress)
  - [/v3/market/brc20/auction/list (Retrieve the list information of the market.) ](#retrieve-the-list-information-of-the-market)
  - [/v3/market/brc20/auction/inscription_info (Retrieve inscription information, including brc20, names, collection. It is necessary to first determine the inscription type before calling the relevant services.) ](#retrieve-inscription-information-including-brc20-names-collection-it-is-necessary-to-first-determine-the-inscription-type-before-calling-the-relevant-services)
  - [/v3/market/brc20/auction/inscription_info_list (Get the basic listing information of the specified inscription list) ](#get-the-basic-listing-information-of-the-specified-inscription-list)
  - [/v3/market/brc20/auction/actions (Get information on listings, delistings, and sales.) ](#get-information-on-listings-delistings-and-sales)
  - [/v3/market/brc20/auction/create_put_on (Create listing order.) ](#create-listing-order)
  - [/v3/market/brc20/auction/confirm_put_on (Confirm listing order.) ](#confirm-listing-order)
  - [/v3/market/brc20/auction/create_bid_prepare (Return params before creating purchase order.) ](#return-params-before-creating-purchase-order)
  - [/v3/market/brc20/auction/create_bid (Create purchase order.) ](#create-purchase-order)
  - [/v3/market/brc20/auction/confirm_bid (Confirm purchase order.) ](#confirm-purchase-order)
  - [/v3/market/brc20/auction/create_put_off (Create delisting order.) ](#create-delisting-order)
  - [/v3/market/brc20/auction/confirm_put_off (Confirm delisting order.) ](#confirm-delisting-order)
  - [/v3/market/brc20/auction/create_modify_price (Create the order for price adjustment.) ](#create-the-order-for-price-adjustment)
  - [/v3/market/brc20/auction/confirm_modify_price (Confirm the order for price adjustment.) ](#confirm-the-order-for-price-adjustment)

---

## MarketPlace-BRC20

### Get the address bind info.
<a id="get-the-address-bind-info"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/bind_info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-BRC20/bindInfo)  

#### Response (200)
- `btcAddress` (string): 
- `nftAddress` (string): 

---

### Get tick k line.
<a id="get-tick-k-line"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/brc20_kline`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-BRC20/getBrc20Kline)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (array):
  - `price` (number): 
  - `timestamp` (number): 

---

### Get statistical data, price, market capitalization, etc. for BRC20.
<a id="get-statistical-data-price-market-capitalization-etc-for-brc20"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/brc20_types`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-BRC20/getBrc20Types)  

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
  - `deploy` (array):
    - `tick` (string): 
    - `curPrice` (number): 
    - `changePrice` (number): 
    - `btcVolume` (number): 
    - `amountVolume` (number): 
    - `cap` (string): 
  - `cap` (array):
    - `tick` (string): 
    - `curPrice` (number): 
    - `changePrice` (number): 
    - `btcVolume` (number): 
    - `amountVolume` (number): 
    - `cap` (string): 

---

### Get statistical data, price, market capitalization, etc. for BRC20.
<a id="get-statistical-data-price-market-capitalization-etc-for-brc20"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/brc20_types_specified`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-BRC20/getBrc20TypesSpecified)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `tick` (string): 
  - `curPrice` (number): 
  - `changePrice` (number): 
  - `btcVolume` (number): 
  - `amountVolume` (number): 

---

### Bind btcAddress and nftAddress.
<a id="bind-btcaddress-and-nftaddress"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/bind`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-BRC20/bindBrc20NftAddress)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):


---

### Retrieve the list information of the market.
<a id="retrieve-the-list-information-of-the-market"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-BRC20/getBrc20AuctionList)  

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

### Retrieve inscription information, including brc20, names, collection. It is necessary to first determine the inscription type before calling the relevant services.
<a id="retrieve-inscription-information-including-brc20-names-collection-it-is-necessary-to-first-determine-the-inscription-type-before-calling-the-relevant-services"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/inscription_info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-BRC20/getBrc20InscriptionInfo)  

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
**Path**: `/v3/market/brc20/auction/inscription_info_list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-BRC20/getBrc20InscriptionInfoList)  

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

### Get information on listings, delistings, and sales.
<a id="get-information-on-listings-delistings-and-sales"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/actions`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-BRC20/getBrc20AuctionActions)  

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
**Path**: `/v3/market/brc20/auction/create_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-BRC20/createBrc20PutOn)  

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
**Path**: `/v3/market/brc20/auction/confirm_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-BRC20/confirmBrc20PutOn)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):


---

### Return params before creating purchase order.
<a id="return-params-before-creating-purchase-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/create_bid_prepare`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-BRC20/createBrc20BidPrepare)  

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
**Path**: `/v3/market/brc20/auction/create_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-BRC20/createBrc20Bid)  

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
**Path**: `/v3/market/brc20/auction/confirm_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-BRC20/confirmBrc20Bid)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `txid` (string): Transaction txid

---

### Create delisting order.
<a id="create-delisting-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/create_put_off`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-BRC20/createBrc20PutOff)  

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
**Path**: `/v3/market/brc20/auction/confirm_put_off`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-BRC20/confirmBrc20PutOff)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `txid` (string): 

---

### Create the order for price adjustment.
<a id="create-the-order-for-price-adjustment"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/create_modify_price`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-BRC20/createBrc20ModifyPrice)  

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
**Path**: `/v3/market/brc20/auction/confirm_modify_price`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-BRC20/confirmBrc20ModifyPrice)  

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):


---

