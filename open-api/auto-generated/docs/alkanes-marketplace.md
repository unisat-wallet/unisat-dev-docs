# Alkanes MarketPlace API

This API provides endpoints for alkanes marketplace services

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [POST `/v3/market/alkanes/auction/alkanes_types`](#get-statistical-data) | Get statistical data |
| [POST `/v3/market/alkanes/auction/alkanes_types_specified`](#get-statistical-data-for-specified-alkanes) | Get statistical data for specified alkanes. |
| [POST `/v3/market/alkanes/auction/list`](#retrieve-the-list-information-of-the-market) | Retrieve the list information of the market. |
| [POST `/v3/market/alkanes/auction/actions`](#get-information-on-listings-delistings-and-sales) | Get information on listings, delistings, and sales. |
| [POST `/v3/market/alkanes/auction/create_put_on`](#create-listing-order) | Create listing order. |
| [POST `/v3/market/alkanes/auction/confirm_put_on`](#confirm-listing-order) | Confirm listing order. |
| [POST `/v3/market/alkanes/auction/create_bid_prepare`](#return-params-before-creating-purchase-order) | Return params before creating purchase order. |
| [POST `/v3/market/alkanes/auction/create_bid`](#create-purchase-order) | Create purchase order. |
| [POST `/v3/market/alkanes/auction/confirm_bid`](#confirm-purchase-order) | Confirm purchase order. |
| [POST `/v3/market/alkanes/auction/create_put_off`](#create-delisting-order) | Create delisting order. |
| [POST `/v3/market/alkanes/auction/confirm_put_off`](#confirm-delisting-order) | Confirm delisting order. |
| [POST `/v3/market/alkanes/auction/create_modify_price`](#create-the-order-for-price-adjustment) | Create the order for price adjustment. |
| [POST `/v3/market/alkanes/auction/confirm_modify_price`](#confirm-the-order-for-price-adjustment) | Confirm the order for price adjustment. |
| [POST `/v3/market/alkanes/auction/create_batch_put_on`](#create-batch-listing-order) | Create batch listing order. |
| [POST `/v3/market/alkanes/auction/confirm_batch_put_on`](#confirm-batch-listing-order) | Confirm batch listing order. |
| [POST `/v3/market/alkanes/auction/create_batch_bid_prepare`](#return-params-before-creating-purchase-order) | Return params before creating purchase order. |
| [POST `/v3/market/alkanes/auction/create_batch_bid`](#create-purchase-order) | Create purchase order. |
| [POST `/v3/market/alkanes/auction/confirm_batch_bid`](#confirm-purchase-order) | Confirm purchase order. |

---

## MarketPlace-Alkanes

### Get statistical data
<a id="get-statistical-data"></a>

**Method**: `POST`  
**Path**: `/v3/market/alkanes/auction/alkanes_types`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Alkanes/getAlkanesTypes)  

#### Description
Get statistical data, price, market capitalization, etc. for alkanes.

#### Request Body
Content-Type: `application/json`

- `timeType` (object): Optional: day1, day7, day30; enum: `day1`, `day7`, `day30`
- `start` (number):
- `limit` (number):

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `BTCPrice` (number): required
  - `list` (array):
    - `tick` (string): required
    - `curPrice` (number): required
    - `changePrice` (number): required
    - `btcVolume` (number): required
    - `amountVolume` (number): required
    - `cap` (string): required
    - `holders` (integer):
    - `transactions` (integer):
    - `warning` (boolean):


---

### Get statistical data for specified alkanes.
<a id="get-statistical-data-for-specified-alkanes"></a>

**Method**: `POST`  
**Path**: `/v3/market/alkanes/auction/alkanes_types_specified`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Alkanes/getAlkanesTypesSpecified)  

#### Description
Get statistical data, price, market capitalization, etc. for Alkanes.

#### Request Body
Content-Type: `application/json`

- `timeType` (string): enum: `day1`, `day7`, `day30`
- `tick` (string):

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
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
**Path**: `/v3/market/alkanes/auction/list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Alkanes/getAlkanesAuctionList)  

#### Request Body
Content-Type: `application/json` **(required)**

- `filter` (object):
  - `nftType` (string): required; enum: `brc20`
  - `address` (string):
  - `tick` (string):
  - `minPrice` (number):
  - `maxPrice` (number):
  - `nftConfirm` (boolean):
  - `isEnd` (boolean): Whether order ends
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
    - `nftType` (string):
    - `tick` (string): Brc20 field
    - `limit` (number): Brc20 field
    - `amount` (number): Brc20 field
    - `unitPrice` (number): Brc20 field
  - `total` (number): required
  - `timestamp` (number):


---

### Get information on listings, delistings, and sales.
<a id="get-information-on-listings-delistings-and-sales"></a>

**Method**: `POST`  
**Path**: `/v3/market/alkanes/auction/actions`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Alkanes/getAlkanesAuctionActions)  

#### Request Body
Content-Type: `application/json` **(required)**

- `filter` (object):
  - `nftType` (string): enum: `brc20`
  - `address` (string):
  - `inscriptionId` (string):
  - `event` (string): Event type: Cancel, Listed, Sold, Updated; enum: `Cancel`, `Claim`, `Listed`, `Sold`, `Updated`
  - `tick` (string):
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
**Path**: `/v3/market/alkanes/auction/create_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Alkanes/createAlkanesPutOn)  

#### Request Body
Content-Type: `application/json` **(required)**

- `nftType` (string):
- `txid` (string): required; The txid of the alkanes utxo txid
- `index` (string): required; The txid of the alkanes utxo index
- `initPrice` (string): required; Set the initial total price
- `unitPrice` (string): required; Unit Price (for tick)
- `pubkey` (string): required; User public key
- `marketType` (string): required; enum: `fixedPrice`; example: `"fixedPrice"`
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
**Path**: `/v3/market/alkanes/auction/confirm_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Alkanes/confirmAlkanesPutOn)  

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
**Path**: `/v3/market/alkanes/auction/create_bid_prepare`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Alkanes/createAlkanesBidPrepare)  

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
**Path**: `/v3/market/alkanes/auction/create_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Alkanes/createAlkanesBid)  

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
**Path**: `/v3/market/alkanes/auction/confirm_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Alkanes/confirmAlkanesBid)  

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
**Path**: `/v3/market/alkanes/auction/create_put_off`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Alkanes/createAlkanesPutOff)  

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
**Path**: `/v3/market/alkanes/auction/confirm_put_off`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Alkanes/confirmAlkanesPutOff)  

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
**Path**: `/v3/market/alkanes/auction/create_modify_price`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Alkanes/createAlkanesModifyPrice)  

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
**Path**: `/v3/market/alkanes/auction/confirm_modify_price`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Alkanes/confirmAlkanesModifyPrice)  

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

### Create batch listing order.
<a id="create-batch-listing-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/alkanes/auction/create_batch_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Alkanes/createAlkanesBatchPutOn)  

#### Request Body
Content-Type: `application/json` **(required)**

- `unitPrice` (string): required; Unit Price (for tick)
- `pubkey` (string): required; User public key
- `nftType` (string):
- `btcAddress` (string): (Optional) Only for multi-address wallet, such as Xverse, hiro. Specifies the BTC receive address
- `utxos` (array): Custom utxo
  - `txid` (string):
  - `index` (number):

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `batchAuctionId` (string):
  - `psbt` (string): required
  - `signIndexes` (array): Specifies the signature location used by the xverse wallet


---

### Confirm batch listing order.
<a id="confirm-batch-listing-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/alkanes/auction/confirm_batch_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Alkanes/confirmAlkanesBatchPutOn)  

#### Request Body
Content-Type: `application/json` **(required)**

- `batchAuctionId` (string): required
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
**Path**: `/v3/market/alkanes/auction/create_batch_bid_prepare`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Alkanes/createAlkanesBatchBidPrepare)  

#### Request Body
Content-Type: `application/json` **(required)**

- `auctionIds` (array):
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
  - `feeRate` (number): Network fee rate
  - `availableBalance` (number): Available confirmed balance for the user
  - `validAuctionIds` (array):
  - `invalidAuctionIds` (array):


---

### Create purchase order.
<a id="create-purchase-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/alkanes/auction/create_batch_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Alkanes/createAlkanesBatchBid)  

#### Request Body
Content-Type: `application/json` **(required)**

- `auctionIds` (array):
- `bidPrices` (array):
- `address` (string): required; Bidder address
- `pubkey` (string): required; Bidder pubkey
- `feeRate` (number): The user sets the rate
- `nftAddress` (string): (Optional) Only for multi-address wallet, such as Xverse, hiro. Inscription receiving address

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `bidId` (string): required
  - `psbtBid` (string): required; Bid psbt
  - `serverFee` (number): required; The service fee charged by the platform
  - `networkFee` (number): required; BTC network total fee
  - `feeRate` (number): required; BTC network fee rate
  - `bidSignIndexes` (array): Specifies the bid signature location used by the xverse wallet


---

### Confirm purchase order.
<a id="confirm-purchase-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/alkanes/auction/confirm_batch_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/MarketPlace-Alkanes/confirmAlkanesBatchBid)  

#### Request Body
Content-Type: `application/json` **(required)**

- `bidId` (string): required
- `psbtBid` (string): required
- `fromBase64` (boolean): Is Base64 format, the default is hex format

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `txid` (string): required; Transaction txid


---

