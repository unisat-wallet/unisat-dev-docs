# Runes Marketplace API

This API provides endpoints for Runes marketplace services, including Rune market statistics, listing search, price information, activity history, and marketplace order workflows.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [POST `/v3/market/runes/auction/runes_types`](#list-runes-market-statistics) | List Runes market statistics |
| [POST `/v3/market/runes/auction/runes_types_specified`](#get-specified-runes-market-statistics) | Get specified Runes market statistics |
| [POST `/v3/market/runes/auction/list`](#search-runes-marketplace-listings) | Search Runes marketplace listings |
| [POST `/v3/market/runes/auction/actions`](#list-runes-marketplace-activity-history) | List Runes marketplace activity history |
| [POST `/v3/market/runes/auction/create_put_on`](#create-runes-listing-psbt-draft) | Create Runes listing PSBT draft |
| [POST `/v3/market/runes/auction/confirm_put_on`](#publish-signed-runes-listing) | Publish signed Runes listing |
| [POST `/v3/market/runes/auction/create_bid_prepare`](#estimate-runes-purchase-fees-and-balance) | Estimate Runes purchase fees and balance |
| [POST `/v3/market/runes/auction/create_bid`](#create-runes-purchase-psbt-order) | Create Runes purchase PSBT order |
| [POST `/v3/market/runes/auction/confirm_bid`](#submit-signed-runes-purchase-order) | Submit signed Runes purchase order |
| [POST `/v3/market/runes/auction/create_put_off`](#create-runes-delisting-psbt-draft) | Create Runes delisting PSBT draft |
| [POST `/v3/market/runes/auction/confirm_put_off`](#remove-signed-runes-listing) | Remove signed Runes listing |
| [POST `/v3/market/runes/auction/create_modify_price`](#create-runes-price-update-psbt-draft) | Create Runes price-update PSBT draft |
| [POST `/v3/market/runes/auction/confirm_modify_price`](#apply-signed-runes-listing-price-update) | Apply signed Runes listing price update |
| [POST `/v3/market/runes/auction/create_batch_put_on`](#create-batch-runes-listing-psbt-drafts) | Create batch Runes listing PSBT drafts |
| [POST `/v3/market/runes/auction/confirm_batch_put_on`](#publish-signed-batch-runes-listings) | Publish signed batch Runes listings |
| [POST `/v3/market/runes/auction/create_batch_bid_prepare`](#estimate-batch-runes-purchase-fees) | Estimate batch Runes purchase fees |
| [POST `/v3/market/runes/auction/create_batch_bid`](#create-batch-runes-purchase-psbt-orders) | Create batch Runes purchase PSBT orders |
| [POST `/v3/market/runes/auction/confirm_batch_bid`](#submit-signed-batch-runes-purchases) | Submit signed batch Runes purchases |

---

## Marketplace-Runes

### List Runes market statistics
<a id="list-runes-market-statistics"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/runes_types`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Runes/getRunesTypes)  

#### Description
Query read-only Runes marketplace statistics such as price, volume, market capitalization, holders, and transaction counts. This query-style POST only reads market data; readonly true and requires confirmation false.

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

### Get specified Runes market statistics
<a id="get-specified-runes-market-statistics"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/runes_types_specified`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Runes/getRunesTypesSpecified)  

#### Description
Query read-only marketplace statistics for a specified Runes ticker. This query-style POST only reads market data; readonly true and requires confirmation false.

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

### Search Runes marketplace listings
<a id="search-runes-marketplace-listings"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Runes/getRunesAuctionList)  

#### Description
Query read-only Runes marketplace listings with filters, sorting, and pagination. This query-style POST only reads marketplace data; readonly true and requires confirmation false.

#### Request Body
Content-Type: `application/json` **(required)**

- `filter` (object):
  - `nftType` (string): required; enum: `runes`
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

### List Runes marketplace activity history
<a id="list-runes-marketplace-activity-history"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/actions`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Runes/getRunesAuctionActions)  

#### Description
Query read-only Runes marketplace activity history such as listings, delistings, sales, claims, and updates. This query-style POST only reads marketplace data; readonly true and requires confirmation false.

#### Request Body
Content-Type: `application/json` **(required)**

- `filter` (object):
  - `nftType` (string): enum: `runes`
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

### Create Runes listing PSBT draft
<a id="create-runes-listing-psbt-draft"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/create_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Runes/createRunesPutOn)  

#### Description
Creates a Runes listing draft and returns auctionId, PSBT, and signing indexes for the seller. Review rune UTXO, rune amount, initPrice, unitPrice, marketType, and receiving address before signing or confirming the listing.

#### Request Body
Content-Type: `application/json` **(required)**

- `nftType` (string):
- `txid` (string): required; The txid of the rune utxo txid
- `index` (string): required; The txid of the rune utxo index
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

### Publish signed Runes listing
<a id="publish-signed-runes-listing"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/confirm_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Runes/confirmRunesPutOn)  

#### Description
Confirms the seller-signed listing PSBT and activates the Runes marketplace listing. Verify auctionId, PSBT encoding, rune amount, listing price, seller address, and market type before submitting.

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

### Estimate Runes purchase fees and balance
<a id="estimate-runes-purchase-fees-and-balance"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/create_bid_prepare`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Runes/createRunesBidPrepare)  

#### Description
Returns pre-purchase fee estimates, available balances, network fee rate, transaction size, and inscription value for a Runes auction. This is a quote/material preparation step only; before any later purchase submission, verify auctionId, bidPrice, buyer address, feeRate, and rune amount.

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

### Create Runes purchase PSBT order
<a id="create-runes-purchase-psbt-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/create_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Runes/createRunesBid)  

#### Description
Creates a Runes marketplace purchase order and returns bidId, PSBT data, signing indexes, server/network fees, feeRate, and inscription value. Confirm auctionId, bidPrice, buyer address, rune name/amount, and fee totals before requesting signatures.

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

### Submit signed Runes purchase order
<a id="submit-signed-runes-purchase-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/confirm_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Runes/confirmRunesBid)  

#### Description
Submits the signed Runes purchase PSBT and returns the settlement transaction id when accepted. Before calling, verify auctionId, bidId, PSBT content, final price, rune amount, buyer/seller addresses, and fee values because this can settle the purchase.

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

### Create Runes delisting PSBT draft
<a id="create-runes-delisting-psbt-draft"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/create_put_off`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Runes/createRunesPutOff)  

#### Description
Creates delisting signing material for an active Runes marketplace order, including PSBT/signing data when needed. Confirm auctionId, owner addresses, and rune amount before signing because the next confirmation removes the listing.

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

### Remove signed Runes listing
<a id="remove-signed-runes-listing"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/confirm_put_off`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Runes/confirmRunesPutOff)  

#### Description
Confirms signed delisting data and removes the Runes listing from the marketplace. Verify auctionId, PSBT/signature payload, owner address, and target rune amount before submitting.

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

### Create Runes price-update PSBT draft
<a id="create-runes-price-update-psbt-draft"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/create_modify_price`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Runes/createRunesModifyPrice)  

#### Description
Creates signing material to update an existing Runes listing price. Verify auctionId, current rune amount, old and new prices, seller address, and returned PSBT/sign indexes before signing.

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

### Apply signed Runes listing price update
<a id="apply-signed-runes-listing-price-update"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/confirm_modify_price`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Runes/confirmRunesModifyPrice)  

#### Description
Confirms signed price-update data and changes the active Runes listing price. Verify auctionId, signed PSBT, rune amount, seller address, and final price before submitting.

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

### Create batch Runes listing PSBT drafts
<a id="create-batch-runes-listing-psbt-drafts"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/create_batch_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Runes/createRunesBatchPutOn)  

#### Description
Creates multiple Runes listing drafts and returns signing material for each listing. Verify every rune UTXO, asset amount, listing price, seller address, auctionId, and PSBT/sign index before signing.

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

### Publish signed batch Runes listings
<a id="publish-signed-batch-runes-listings"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/confirm_batch_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Runes/confirmRunesBatchPutOn)  

#### Description
Confirms signed PSBTs and activates multiple Runes marketplace listings. Verify every auctionId, signed PSBT, rune amount, listing price, seller address, and market type before submitting.

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

### Estimate batch Runes purchase fees
<a id="estimate-batch-runes-purchase-fees"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/create_batch_bid_prepare`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Runes/createRunesBatchBidPrepare)  

#### Description
Returns quote-only fee, balance, transaction-size, and valid-listing data for multiple Runes purchases. This does not submit orders; before any later batch purchase, verify every auctionId, bid price, buyer address, rune amount, and fee estimate.

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

### Create batch Runes purchase PSBT orders
<a id="create-batch-runes-purchase-psbt-orders"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/create_batch_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Runes/createRunesBatchBid)  

#### Description
Creates multiple Runes purchase orders and returns per-order signing material. Confirm every auctionId, bid price, buyer address, rune amount, feeRate, and returned PSBT/sign indexes before signing.

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

### Submit signed batch Runes purchases
<a id="submit-signed-batch-runes-purchases"></a>

**Method**: `POST`  
**Path**: `/v3/market/runes/auction/confirm_batch_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Runes/confirmRunesBatchBid)  

#### Description
Confirms signed batch purchase PSBTs and can settle multiple Runes orders. Verify each auctionId, bidId, PSBT, final price, buyer/seller address, rune amount, and fee value before submitting.

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

