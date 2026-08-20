# BRC20 Marketplace API

BRC-20 marketplace APIs for address binding, market discovery, listing inspection, activity history, and PSBT-based listing, purchase, delisting, and price update workflows.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [POST `/v3/market/brc20/auction/bind_info`](#get-marketplace-payment-and-inscription-addresses-for-an-account) | Get marketplace payment and inscription addresses for an account |
| [POST `/v3/market/brc20/auction/brc20_kline`](#get-brc-20-marketplace-price-candles) | Get BRC-20 marketplace price candles |
| [POST `/v3/market/brc20/auction/brc20_types`](#rank-brc-20-tickers-by-marketplace-metrics) | Rank BRC-20 tickers by marketplace metrics |
| [POST `/v3/market/brc20/auction/brc20_types_specified`](#get-marketplace-metrics-for-selected-brc-20-tickers) | Get marketplace metrics for selected BRC-20 tickers |
| [POST `/v3/market/brc20/auction/bind`](#bind-marketplace-payment-and-inscription-addresses) | Bind marketplace payment and inscription addresses |
| [POST `/v3/market/brc20/auction/list`](#search-brc-20-token-listings-for-sale) | Search BRC-20 token listings for sale |
| [POST `/v3/market/brc20/auction/inscription_info`](#get-brc-20-listing-detail-by-inscription) | Get BRC-20 listing detail by inscription |
| [POST `/v3/market/brc20/auction/inscription_info_list`](#get-brc-20-listing-details-for-multiple-inscriptions) | Get BRC-20 listing details for multiple inscriptions |
| [POST `/v3/market/brc20/auction/actions`](#list-brc-20-marketplace-listing-and-sale-events) | List BRC-20 marketplace listing and sale events |
| [POST `/v3/market/brc20/auction/create_put_on`](#create-a-brc-20-fixed-price-listing-psbt) | Create a BRC-20 fixed-price listing PSBT |
| [POST `/v3/market/brc20/auction/confirm_put_on`](#publish-a-signed-brc-20-listing) | Publish a signed BRC-20 listing |
| [POST `/v3/market/brc20/auction/create_bid_prepare`](#estimate-fees-and-balance-for-a-brc-20-purchase) | Estimate fees and balance for a BRC-20 purchase |
| [POST `/v3/market/brc20/auction/create_bid`](#create-a-brc-20-purchase-psbt) | Create a BRC-20 purchase PSBT |
| [POST `/v3/market/brc20/auction/confirm_bid`](#submit-a-signed-brc-20-purchase) | Submit a signed BRC-20 purchase |
| [POST `/v3/market/brc20/auction/create_put_off`](#create-a-brc-20-delisting-psbt) | Create a BRC-20 delisting PSBT |
| [POST `/v3/market/brc20/auction/confirm_put_off`](#remove-a-signed-brc-20-listing) | Remove a signed BRC-20 listing |
| [POST `/v3/market/brc20/auction/create_modify_price`](#create-a-brc-20-listing-price-update-psbt) | Create a BRC-20 listing price-update PSBT |
| [POST `/v3/market/brc20/auction/confirm_modify_price`](#apply-a-signed-brc-20-listing-price-update) | Apply a signed BRC-20 listing price update |

---

## Marketplace-BRC20

### Get marketplace payment and inscription addresses for an account
<a id="get-marketplace-payment-and-inscription-addresses-for-an-account"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/bind_info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-BRC20/bindInfo)  

#### Description
Returns the BTC payment address and NFT/inscription receiving address currently bound for BRC-20 marketplace trading. Use it before listing or buying to confirm which wallet addresses the marketplace will use.

#### Request Body
Content-Type: `application/json` **(required)**

- `address` (string): required

#### Response (200)
Default Response

- `btcAddress` (string): required
- `nftAddress` (string): required


---

### Get BRC-20 marketplace price candles
<a id="get-brc-20-marketplace-price-candles"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/brc20_kline`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-BRC20/getBrc20Kline)  

#### Description
Returns time-series price points for a ticker over the requested time range and granularity. Use it to draw marketplace price charts or analyze short-term trading trends.

#### Request Body
Content-Type: `application/json` **(required)**

- `tick` (string): required
- `timeStart` (number): required; Start time range
- `timeEnd` (number): required; End time range
- `timeStep` (number): required; Time granularity, such as milliseconds for a 5-minute interval

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (array):
  - `price` (number):
  - `timestamp` (number):


---

### Rank BRC-20 tickers by marketplace metrics
<a id="rank-brc-20-tickers-by-marketplace-metrics"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/brc20_types`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-BRC20/getBrc20Types)  

#### Description
Returns paginated market statistics for BRC-20 tickers, including current price, price change, BTC volume, token volume, market cap, and featured deploy entries. Supports ticker length, time window, explicit ticker list, and pagination filters.

#### Request Body
Content-Type: `application/json`

- `tickLen` (number): enum: `4`, `5`; example: `4`
- `timeType` (string): Optional: day1, day7, day30; enum: `day1`, `day7`, `day30`
- `ticks` (array): Specify a list of ticks
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
  - `deploy` (array): The first three deployments of tick
    - `tick` (string): required
    - `curPrice` (number): required
    - `changePrice` (number): required
    - `btcVolume` (number): required
    - `amountVolume` (number): required
    - `cap` (string): required
  - `cap` (array): The top three tick by market capitalization
    - `tick` (string): required
    - `curPrice` (number): required
    - `changePrice` (number): required
    - `btcVolume` (number): required
    - `amountVolume` (number): required
    - `cap` (string): required


---

### Get marketplace metrics for selected BRC-20 tickers
<a id="get-marketplace-metrics-for-selected-brc-20-tickers"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/brc20_types_specified`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-BRC20/getBrc20TypesSpecified)  

#### Description
Returns market statistics for specific BRC-20 tickers, such as price, price change, volume, market cap, and related ticker metadata. Use it when the client already knows which tickers to compare or display.

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
  - `curPrice` (number):
  - `changePrice` (number):
  - `btcVolume` (number):
  - `amountVolume` (number):


---

### Bind marketplace payment and inscription addresses
<a id="bind-marketplace-payment-and-inscription-addresses"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/bind`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-BRC20/bindBrc20NftAddress)  

#### Description
Records the BTC payment address and NFT/inscription receiving address pair used by BRC-20 marketplace workflows. Confirm both addresses carefully because later listing and purchase flows may rely on this binding.

#### Request Body
Content-Type: `application/json` **(required)**

- `btcAddress` (string): required
- `nftAddress` (string): required
- `sign` (string): required

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):


---

### Search BRC-20 token listings for sale
<a id="search-brc-20-token-listings-for-sale"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-BRC20/getBrc20AuctionList)  

#### Description
Returns paginated marketplace listings with auction id, inscription id, seller address, ticker, token amount, total price, unit price, market type, and latest listing context. Use it to power order books, ticker detail pages, and buy-flow listing selection.

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

### Get BRC-20 listing detail by inscription
<a id="get-brc-20-listing-detail-by-inscription"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/inscription_info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-BRC20/getBrc20InscriptionInfo)  

#### Description
Returns marketplace and asset metadata for one inscription, including whether it is listed, its auction context when available, ticker amount, price fields, owner or seller information, and inscription identifiers.

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

### Get BRC-20 listing details for multiple inscriptions
<a id="get-brc-20-listing-details-for-multiple-inscriptions"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/inscription_info_list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-BRC20/getBrc20InscriptionInfoList)  

#### Description
Returns listing and asset metadata for a batch of inscription ids. Use it to hydrate search results, wallet views, or candidate listings without calling the single-inscription endpoint repeatedly.

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

### List BRC-20 marketplace listing and sale events
<a id="list-brc-20-marketplace-listing-and-sale-events"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/actions`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-BRC20/getBrc20AuctionActions)  

#### Description
Returns paginated activity records for BRC-20 marketplace events such as listing, delisting, sale, claim, and price update. Records include auction id, inscription id, event type, price, addresses, timestamp, confirmation count, and ticker-specific metadata.

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

### Create a BRC-20 fixed-price listing PSBT
<a id="create-a-brc-20-fixed-price-listing-psbt"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/create_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-BRC20/createBrc20PutOn)  

#### Description
Builds the seller-side listing draft for a transferable BRC-20 inscription and returns the auction id, PSBT, and signing indexes. Review the inscription id, ticker amount, total price, unit price, market type, public key, and payout address before signing.

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

### Publish a signed BRC-20 listing
<a id="publish-a-signed-brc-20-listing"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/confirm_put_on`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-BRC20/confirmBrc20PutOn)  

#### Description
Submits the seller-signed listing PSBT for an auction id and activates the marketplace order. Success means the token amount can become visible for purchase, so verify the signed PSBT, price, ticker amount, seller address, and market type before calling.

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

### Estimate fees and balance for a BRC-20 purchase
<a id="estimate-fees-and-balance-for-a-brc-20-purchase"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/create_bid_prepare`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-BRC20/createBrc20BidPrepare)  

#### Description
Calculates purchase preparation data for an auction id and bid price, including service fee, network fee, fee rate, estimated transaction size, inscription satoshi value, available balance, and total balance. Use it to decide whether a buy order can be created safely.

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

### Create a BRC-20 purchase PSBT
<a id="create-a-brc-20-purchase-psbt"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/create_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-BRC20/createBrc20Bid)  

#### Description
Builds the buyer-side order for a listed BRC-20 inscription and returns bid id, purchase PSBT, signing indexes, platform fee, network fee, fee rate, and inscription value. Confirm the auction id, bid price, buyer address, ticker amount, and total fees before signing.

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

### Submit a signed BRC-20 purchase
<a id="submit-a-signed-brc-20-purchase"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/confirm_bid`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-BRC20/confirmBrc20Bid)  

#### Description
Confirms the signed purchase PSBT for an auction id and bid id, then returns the settlement transaction id when accepted. This can complete the transfer, so verify the PSBT, final price, ticker amount, buyer and seller addresses, and fee values before submitting.

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

### Create a BRC-20 delisting PSBT
<a id="create-a-brc-20-delisting-psbt"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/create_put_off`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-BRC20/createBrc20PutOff)  

#### Description
Builds the seller-side cancellation transaction for an active BRC-20 listing and returns the signing material needed to remove it. Review the auction id, owner addresses, listed ticker amount, fee settings, and returned signing payload before signing.

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

### Remove a signed BRC-20 listing
<a id="remove-a-signed-brc-20-listing"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/confirm_put_off`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-BRC20/confirmBrc20PutOff)  

#### Description
Submits the signed delisting payload for an auction id and removes the listing when accepted. Verify the PSBT or signature payload, owner address, ticker amount, and target listing before submitting.

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

### Create a BRC-20 listing price-update PSBT
<a id="create-a-brc-20-listing-price-update-psbt"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/create_modify_price`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-BRC20/createBrc20ModifyPrice)  

#### Description
Builds signing material to change the total and unit price of an existing BRC-20 listing. Review the auction id, current ticker amount, current price, new price, seller address, and returned PSBT or sign indexes before signing.

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

### Apply a signed BRC-20 listing price update
<a id="apply-a-signed-brc-20-listing-price-update"></a>

**Method**: `POST`  
**Path**: `/v3/market/brc20/auction/confirm_modify_price`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Marketplace-BRC20/confirmBrc20ModifyPrice)  

#### Description
Submits the signed price-update payload for an auction id and updates the active listing price when accepted. Verify the signed PSBT, ticker amount, seller address, and final total and unit prices before submitting.

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

