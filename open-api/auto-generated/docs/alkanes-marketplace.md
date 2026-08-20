# Alkanes Marketplace API

This API provides endpoints for Alkanes marketplace services, including market statistics, listing search, activity history, and order preparation/submission for Alkanes assets.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [POST `/v3/market/alkanes/auction/alkanes_types`](#list-alkanes-market-statistics-by-time-window) | List Alkanes market statistics by time window |
| [POST `/v3/market/alkanes/auction/alkanes_types_specified`](#get-market-statistics-for-one-alkanes-ticker) | Get market statistics for one Alkanes ticker |
| [POST `/v3/market/alkanes/auction/list`](#search-active-and-ended-alkanes-marketplace-listings) | Search active and ended Alkanes marketplace listings |
| [POST `/v3/market/alkanes/auction/actions`](#list-alkanes-marketplace-listing-sale-and-update-events) | List Alkanes marketplace listing, sale, and update events |
| [POST `/v3/market/alkanes/auction/create_put_on`](#create-an-alkanes-listing-psbt) | Create an Alkanes listing PSBT |
| [POST `/v3/market/alkanes/auction/confirm_put_on`](#publish-a-signed-alkanes-listing) | Publish a signed Alkanes listing |
| [POST `/v3/market/alkanes/auction/create_bid_prepare`](#estimate-fees-and-balance-for-an-alkanes-purchase) | Estimate fees and balance for an Alkanes purchase |
| [POST `/v3/market/alkanes/auction/create_bid`](#create-an-alkanes-purchase-psbt) | Create an Alkanes purchase PSBT |
| [POST `/v3/market/alkanes/auction/confirm_bid`](#submit-a-signed-alkanes-purchase) | Submit a signed Alkanes purchase |
| [POST `/v3/market/alkanes/auction/create_put_off`](#create-an-alkanes-delisting-psbt) | Create an Alkanes delisting PSBT |
| [POST `/v3/market/alkanes/auction/confirm_put_off`](#remove-a-listed-alkanes-order) | Remove a listed Alkanes order |
| [POST `/v3/market/alkanes/auction/create_modify_price`](#create-an-alkanes-listing-price-update-psbt) | Create an Alkanes listing price-update PSBT |
| [POST `/v3/market/alkanes/auction/confirm_modify_price`](#apply-a-signed-alkanes-listing-price-update) | Apply a signed Alkanes listing price update |
| [POST `/v3/market/alkanes/auction/create_batch_put_on`](#create-batch-alkanes-listing-psbts) | Create batch Alkanes listing PSBTs |
| [POST `/v3/market/alkanes/auction/confirm_batch_put_on`](#publish-signed-batch-alkanes-listings) | Publish signed batch Alkanes listings |
| [POST `/v3/market/alkanes/auction/create_batch_bid_prepare`](#estimate-fees-and-validate-listings-for-batch-alkanes-purchases) | Estimate fees and validate listings for batch Alkanes purchases |
| [POST `/v3/market/alkanes/auction/create_batch_bid`](#create-batch-alkanes-purchase-psbts) | Create batch Alkanes purchase PSBTs |
| [POST `/v3/market/alkanes/auction/confirm_batch_bid`](#submit-signed-batch-alkanes-purchases) | Submit signed batch Alkanes purchases |

---

## Marketplace-Alkanes

### List Alkanes market statistics by time window
<a id="list-alkanes-market-statistics-by-time-window"></a>

**Method**: `POST`  
**Path**: `/v3/market/alkanes/auction/alkanes_types`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Alkanes/getAlkanesTypes)  

#### Description
Returns paginated market metrics for Alkanes tickers, including current price, price change, BTC and asset volume, market cap, holder count, transaction count, warning flag, and the BTC price used for valuation.

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

### Get market statistics for one Alkanes ticker
<a id="get-market-statistics-for-one-alkanes-ticker"></a>

**Method**: `POST`  
**Path**: `/v3/market/alkanes/auction/alkanes_types_specified`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Alkanes/getAlkanesTypesSpecified)  

#### Description
Returns ticker-level marketplace metrics such as symbol, current price, price change, BTC and asset volume, cap in BTC and USD, deploy time, holder count, inscription number, transaction count, and warning flag.

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

### Search active and ended Alkanes marketplace listings
<a id="search-active-and-ended-alkanes-marketplace-listings"></a>

**Method**: `POST`  
**Path**: `/v3/market/alkanes/auction/list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Alkanes/getAlkanesAuctionList)  

#### Description
Returns paginated listing records with auction id, inscription id and number, seller address, price, ticker, amount, unit price, market type, and latest listing timestamp context.

#### Request Body
Content-Type: `application/json` **(required)**

- `filter` (object):
  - `nftType` (string): required; enum: `alkanes`
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

### List Alkanes marketplace listing, sale, and update events
<a id="list-alkanes-marketplace-listing-sale-and-update-events"></a>

**Method**: `POST`  
**Path**: `/v3/market/alkanes/auction/actions`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Alkanes/getAlkanesAuctionActions)  

#### Description
Returns paginated marketplace activity records, including auction id, inscription id and number, event type, price, from/to addresses, timestamp, confirmation count, newest-event marker, and asset-specific metadata.

#### Request Body
Content-Type: `application/json` **(required)**

- `filter` (object):
  - `nftType` (string): enum: `alkanes`
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

### Create an Alkanes listing PSBT
<a id="create-an-alkanes-listing-psbt"></a>

**Method**: `POST`  
**Path**: `/v3/market/alkanes/auction/create_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Alkanes/createAlkanesPutOn)  

#### Description
Builds a fixed-price listing draft for an Alkanes UTXO and returns an auction id, PSBT, and wallet sign indexes. Review the asset UTXO, total price, unit price, public key, and receiving address before use.

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

### Publish a signed Alkanes listing
<a id="publish-a-signed-alkanes-listing"></a>

**Method**: `POST`  
**Path**: `/v3/market/alkanes/auction/confirm_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Alkanes/confirmAlkanesPutOn)  

#### Description
Confirms the signed listing PSBT for an auction id and activates the marketplace listing. The response is empty on success, so callers should verify state through listing or activity queries after confirmation.

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

### Estimate fees and balance for an Alkanes purchase
<a id="estimate-fees-and-balance-for-an-alkanes-purchase"></a>

**Method**: `POST`  
**Path**: `/v3/market/alkanes/auction/create_bid_prepare`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Alkanes/createAlkanesBidPrepare)  

#### Description
Calculates purchase preparation data for an auction id and bid price, including service fee, real fee, fee rate, estimated transaction size, inscription satoshi value, network fee rate, available balance, and total balance.

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

### Create an Alkanes purchase PSBT
<a id="create-an-alkanes-purchase-psbt"></a>

**Method**: `POST`  
**Path**: `/v3/market/alkanes/auction/create_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Alkanes/createAlkanesBid)  

#### Description
Builds a purchase order for a listing and returns bid id, bid PSBT, optional auction-mode PSBT fields, platform fee, network fee, fee rate, inscription value, and wallet sign indexes.

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

### Submit a signed Alkanes purchase
<a id="submit-a-signed-alkanes-purchase"></a>

**Method**: `POST`  
**Path**: `/v3/market/alkanes/auction/confirm_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Alkanes/confirmAlkanesBid)  

#### Description
Confirms the signed bid PSBT for an auction and bid id, then returns the settlement transaction id when the purchase is accepted.

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

### Create an Alkanes delisting PSBT
<a id="create-an-alkanes-delisting-psbt"></a>

**Method**: `POST`  
**Path**: `/v3/market/alkanes/auction/create_put_off`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Alkanes/createAlkanesPutOff)  

#### Description
Builds a delisting transaction for an auction id and returns PSBT, estimated transaction size, BTC sign indexes, and asset sign indexes. Optional inputs support custom UTXOs, RBF, off-chain cancellation, and multi-address wallets.

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

### Remove a listed Alkanes order
<a id="remove-a-listed-alkanes-order"></a>

**Method**: `POST`  
**Path**: `/v3/market/alkanes/auction/confirm_put_off`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Alkanes/confirmAlkanesPutOff)  

#### Description
Confirms the signed delisting PSBT for an auction id and returns the cancellation transaction id when removal is completed or accepted.

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

### Create an Alkanes listing price-update PSBT
<a id="create-an-alkanes-listing-price-update-psbt"></a>

**Method**: `POST`  
**Path**: `/v3/market/alkanes/auction/create_modify_price`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Alkanes/createAlkanesModifyPrice)  

#### Description
Builds a PSBT to change an existing listing's total and unit price, returning the signing payload and sign indexes for the specified auction id.

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

### Apply a signed Alkanes listing price update
<a id="apply-a-signed-alkanes-listing-price-update"></a>

**Method**: `POST`  
**Path**: `/v3/market/alkanes/auction/confirm_modify_price`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Alkanes/confirmAlkanesModifyPrice)  

#### Description
Confirms the signed price-update PSBT for an auction id and updates the active listing price. The response is empty on success, so use listing or activity queries to verify the new price.

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

### Create batch Alkanes listing PSBTs
<a id="create-batch-alkanes-listing-psbts"></a>

**Method**: `POST`  
**Path**: `/v3/market/alkanes/auction/create_batch_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Alkanes/createAlkanesBatchPutOn)  

#### Description
Builds a batch listing draft for multiple Alkanes UTXOs and returns batch auction id, PSBT, and sign indexes. Verify every UTXO, shared unit price, public key, and receiving address before signing.

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

### Publish signed batch Alkanes listings
<a id="publish-signed-batch-alkanes-listings"></a>

**Method**: `POST`  
**Path**: `/v3/market/alkanes/auction/confirm_batch_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Alkanes/confirmAlkanesBatchPutOn)  

#### Description
Confirms a signed batch listing PSBT and activates all listings in the batch. The response is empty on success, so verify the published listings through list or activity endpoints.

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

### Estimate fees and validate listings for batch Alkanes purchases
<a id="estimate-fees-and-validate-listings-for-batch-alkanes-purchases"></a>

**Method**: `POST`  
**Path**: `/v3/market/alkanes/auction/create_batch_bid_prepare`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Alkanes/createAlkanesBatchBidPrepare)  

#### Description
Calculates batch purchase preparation data for auction ids, including service fee, real fee, fee rate, estimated transaction size, network fee rate, available balance, valid auction ids, and invalid auction ids.

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

### Create batch Alkanes purchase PSBTs
<a id="create-batch-alkanes-purchase-psbts"></a>

**Method**: `POST`  
**Path**: `/v3/market/alkanes/auction/create_batch_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Alkanes/createAlkanesBatchBid)  

#### Description
Builds batch purchase orders for multiple auction ids and bid prices, returning bid id, bid PSBT, platform fee, network fee, fee rate, and wallet sign indexes.

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

### Submit signed batch Alkanes purchases
<a id="submit-signed-batch-alkanes-purchases"></a>

**Method**: `POST`  
**Path**: `/v3/market/alkanes/auction/confirm_batch_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-Alkanes/confirmAlkanesBatchBid)  

#### Description
Confirms the signed batch bid PSBT and returns the settlement transaction id when the batch purchase is accepted.

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

