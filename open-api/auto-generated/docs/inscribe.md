# Inscribe API

This is UniSat Wallet Open API. If you wish to use the OpenAPI, please feel free to send us an email, and we will provide you with an API KEY.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [GET `/v2/inscribe/order/summary`](#get-order-summary-of-current-apikey) | Get order summary of current apikey |
| [GET `/v2/inscribe/order/list`](#get-order-list-of-current-apikey) | Get order list of current apikey |
| [GET `/v2/inscribe/order/(orderId)`](#search-an-order-by-orderid) | Search an order by orderId |
| [POST `/v2/inscribe/order/create`](#create-an-order) | Create an order |
| [POST `/v2/inscribe/order/create/brc20-deploy`](#create-an-order-to-inscribe-brc-20-deploy-deprecated) | Create an order to inscribe BRC-20 DEPLOY (Deprecated) |
| [POST `/v2/inscribe/order/create/brc20-mint`](#create-an-order-to-inscribe-brc-20-mint-deprecated) | Create an order to inscribe BRC-20 MINT (Deprecated) |
| [POST `/v2/inscribe/order/create/brc20-transfer`](#create-an-order-to-inscribe-brc-20-transfer-deprecated) | Create an order to inscribe BRC-20 TRANSFER (Deprecated) |
| [POST `/v2/inscribe/order/request-commit`](#request-commit-txs-of-some-order) | Request commit txs of some order |
| [POST `/v2/inscribe/order/sign-commit`](#sign-commit-txs-of-some-order) | Sign commit txs of some order |
| [POST `/v2/inscribe/order/sign-reveal`](#sign-reveal-txs-of-some-order) | Sign reveal txs of some order |
| [POST `/v2/inscribe/order/create/brc20-5byte-mint`](#create-an-order-to-inscribe-brc-20-mint-deprecated) | Create an order to inscribe BRC-20 MINT (Deprecated) |
| [POST `/v2/inscribe/order/request-commit/brc20-5byte-mint`](#request-commit-txs-of-brc20-5byte-mint-deprecated) | Request commit txs of brc20-5byte-mint. (Deprecated) |
| [POST `/v2/inscribe/order/sign-commit/brc20-5byte-mint`](#sign-commit-txs-of-brc20-5byte-mint-deprecated) | Sign commit txs of brc20-5byte-mint (Deprecated) |
| [POST `/v2/inscribe/order/sign-reveal/brc20-5byte-mint`](#sign-reveal-txs-of-brc20-5byte-mint-deprecated) | Sign reveal txs of brc20-5byte-mint (Deprecated) |
| [POST `/v2/inscribe/order/create/runes-etch`](#create-an-order-to-etch-runes) | Create an order to etch Runes |
| [POST `/v2/inscribe/order/create/runes-mint`](#create-an-order-to-mint-runes) | Create an order to mint Runes |
| [POST `/v2/inscribe/order/(orderId)/refund`](#process-a-refund-for-an-order) | Process a refund for an order. |
| [POST `/v2/inscribe/order/(orderId)/refund-estimate`](#estimate-the-size-of-the-refund-transaction) | Estimate the size of the refund transaction |

---

## Inscribe

### Get order summary of current apikey
<a id="get-order-summary-of-current-apikey"></a>

**Method**: `GET`  
**Path**: `/v2/inscribe/order/summary`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/getOrderSummary)  

#### Response (200)
Successful operation

- `code` (integer (int32)):
- `msg` (string): example: `"OK"`
- `data` (object):
  - `orderCount` (object):
    - `total` (integer):
    - `pendingCount` (integer):
    - `inscribingCount` (integer):
    - `mintedCount` (integer):
    - `closedCount` (integer):
    - `refundedCount` (integer):

#### Response (401)
Invalid API Key


---

### Get order list of current apikey
<a id="get-order-list-of-current-apikey"></a>

**Method**: `GET`  
**Path**: `/v2/inscribe/order/list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/getOrderList)  

#### Description
Get order list of current apikey

#### Parameters
- `cursor` (query, integer) **(required)**: Start offset
- `size` (query, integer) **(required)**: Number of items returned
- `sort` (query, string): Sort by (asc/desc); enum: `asc`, `desc`
- `status` (query, string): Status of order; enum: `pending`, `inscribing`, `minted`, `closed`, `refunded`
- `receiveAddress` (query, string): ReceiveAddress of order
- `clientId` (query, string): ClientId of order
- `withFiles` (query, boolean): Whether to include files

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `detail` (array):
    - `orderId` (string): example: `""`
    - `status` (string): Order Status; enum: `pending`, `inscribing`, `minted`; example: `"pending"`
    - `payAddress` (string): Pay to this address to start inscribing; example: `""`
    - `receiveAddress` (string): Bitcoin address to receive the inscriptions; example: `""`
    - `amount` (integer): The BTC amount (in satoshis) need to pay; example: `3000`
    - `paidAmount` (integer): The paid BTC amount (in satoshis)
    - `outputValue` (integer): The outputValue of each inscription
    - `feeRate` (number): The feeRate of inscribing transactions
    - `minerFee` (number): The miner fee of this order
    - `serviceFee` (number): The service fee of this order
    - `devFee` (number): The developer fee of this order
    - `files` (array):
      - `filename` (string): example: `"10000.sats"`
      - `inscriptionId` (string): example: `""`
      - `status` (string): enum: `pending`, `unconfirmed`, `confirmed`
    - `count` (integer): The total inscriptions count; example: `1`
    - `pendingCount` (integer): The pending inscriptions count; example: `1`
    - `unconfirmedCount` (integer (int32)): The unconfirmed inscriptions count; example: `0`
    - `confirmedCount` (integer (int32)): The confirmed inscriptions count; example: `0`
    - `createTime` (integer): example: `1693439128100`
    - `refundTxid` (string): example: `""`
    - `refundAmount` (integer):
    - `refundFeeRate` (number):
  - `start` (integer):
  - `total` (integer):

#### Response (401)
Invalid API Key

### Notes

- status (Optional) : pending/inscribing/minted/closed/refunded
- receiveAddress (Optional): Filter by receive address
- clientId (Optional): The clientId passed when creating an order is useful for filtering a certain user's orders.


---

### Search an order by orderId
<a id="search-an-order-by-orderid"></a>

**Method**: `GET`  
**Path**: `/v2/inscribe/order/{orderId}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/getOrderById)  

#### Description
It's recommended to query the latest status every 10 seconds.

_amount = outputValue*count + minerFee + serviceFee + devFee_

#### Parameters
- `orderId` (path, string) **(required)**: 

#### Response (200)
Successful operation

- `code` (integer (int32)):
- `msg` (string): example: `"OK"`
- `data` (object):
  - `orderId` (string): example: `""`
  - `status` (string): Order Status; enum: `pending`, `inscribing`, `minted`; example: `"pending"`
  - `payAddress` (string): Pay to this address to start inscribing; example: `""`
  - `receiveAddress` (string): Bitcoin address to receive the inscriptions; example: `""`
  - `amount` (integer): The BTC amount (in satoshis) need to pay; example: `3000`
  - `paidAmount` (integer): The paid BTC amount (in satoshis)
  - `outputValue` (integer): The outputValue of each inscription
  - `feeRate` (number): The feeRate of inscribing transactions
  - `minerFee` (number): The miner fee of this order
  - `serviceFee` (number): The service fee of this order
  - `devFee` (number): The developer fee of this order
  - `files` (array):
    - `filename` (string): example: `"10000.sats"`
    - `inscriptionId` (string): example: `""`
    - `status` (string): enum: `pending`, `unconfirmed`, `confirmed`
  - `count` (integer): The total inscriptions count; example: `1`
  - `pendingCount` (integer): The pending inscriptions count; example: `1`
  - `unconfirmedCount` (integer (int32)): The unconfirmed inscriptions count; example: `0`
  - `confirmedCount` (integer (int32)): The confirmed inscriptions count; example: `0`
  - `createTime` (integer): example: `1693439128100`
  - `refundTxid` (string): example: `""`
  - `refundAmount` (integer):
  - `refundFeeRate` (number):

#### Response (401)
Invalid API Key

### Notes

```typescript
enum OrderStatus {
  // when create order
  pending = "pending",

  // pay not enough, need pay more
  payment_notenough = "payment_notenough",

  // pay over, need choose continue or refund
  payment_overpay = "payment_overpay",

  // there is an inscription in payment transaction, need refund
  payment_withinscription = "payment_withinscription",

  // in some case, payment transaction need be confirmed
  payment_waitconfirmed = "payment_waitconfirmed",

  // payment success
  payment_success = "payment_success",

  // ready to inscribe
  ready = "ready",
  inscribing = "inscribing",
  minted = "minted",
  closed = "closed",
  refunded = "refunded",
  cancel = "cancel",
}

enum InscriptionStatus {
  pending = "pending",
  unconfirmed = "unconfirmed",
  confirmed = "confirmed",
}
```


---

### Create an order
<a id="create-an-order"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/create`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/createOrder)  

#### Description
Create an order to inscribe something

#### Request Body
Content-Type: `application/json` **(required)**

- `receiveAddress` (string): Bitcoin address to receive the inscriptions
- `feeRate` (number (float)): The fee rate of transaction; example: `1`
- `outputValue` (integer (int32)): The balance of inscription; example: `546`
- `files` (array): example: `[{"filename":"1000.sats","dataURL":"data:text/plain;charset=utf-8;base64,eyJwIjoic25zIiwib3AiOiJyZWciLCJuYW1lIjoiMTAwMDAuc2F0cyJ9"}]`
  - `filename` (string):
  - `dataURL` (string):
- `devAddress` (string): Developer address to receive extra fee
- `devFee` (integer (int32)): Extra fee to pay to developer's address

#### Response (200)
Successful operation

- `code` (integer (int32)):
- `msg` (string):
- `data` (object):
  - `orderId` (string): example: `""`
  - `status` (string): Order Status; enum: `pending`, `inscribing`, `minted`; example: `"pending"`
  - `payAddress` (string): Pay to this address to start inscribing; example: `""`
  - `receiveAddress` (string): Bitcoin address to receive the inscriptions; example: `""`
  - `amount` (integer): The BTC amount (in satoshis) need to pay; example: `3000`
  - `paidAmount` (integer): The paid BTC amount (in satoshis)
  - `outputValue` (integer): The outputValue of each inscription
  - `feeRate` (number): The feeRate of inscribing transactions
  - `minerFee` (number): The miner fee of this order
  - `serviceFee` (number): The service fee of this order
  - `devFee` (number): The developer fee of this order
  - `files` (array):
    - `filename` (string): example: `"10000.sats"`
    - `inscriptionId` (string): example: `""`
    - `status` (string): enum: `pending`, `unconfirmed`, `confirmed`
  - `count` (integer): The total inscriptions count; example: `1`
  - `pendingCount` (integer): The pending inscriptions count; example: `1`
  - `unconfirmedCount` (integer (int32)): The unconfirmed inscriptions count; example: `0`
  - `confirmedCount` (integer (int32)): The confirmed inscriptions count; example: `0`
  - `createTime` (integer): example: `1693439128100`
  - `refundTxid` (string): example: `""`
  - `refundAmount` (integer):
  - `refundFeeRate` (number):

#### Response (401)
Invalid API Key


---

### Request commit txs of some order
<a id="request-commit-txs-of-some-order"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/request-commit`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/requestCommit)  

#### Request Body
Content-Type: `application/json` **(required)**

- `orderId` (string): orderId; example: `""`
- `payerAddress` (string): payer's bitcoin address; example: `""`
- `payerPubkey` (string): payer's pubkey; example: `""`

#### Response (200)
Successful operation

- `code` (integer (int32)):
- `msg` (string):
- `data` (object):
  - `psbtHex` (string): psbt hex string; example: `""`
  - `inputsToSign` (array):
    - `address` (string):
    - `signingIndexes` (array):

#### Response (401)
Invalid API Key


---

### Sign commit txs of some order
<a id="sign-commit-txs-of-some-order"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/sign-commit`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/signCommit)  

#### Request Body
Content-Type: `application/json` **(required)**

- `orderId` (string): orderId; example: `""`
- `psbt` (string): psbt hex string; example: `""`

#### Response (200)
Successful operation

- `code` (integer (int32)):
- `msg` (string):
- `data` (object):
  - `psbtHex` (string): psbt hex string; example: `""`
  - `inputsToSign` (array):
    - `address` (string):
    - `signingIndexes` (array):

#### Response (401)
Invalid API Key


---

### Sign reveal txs of some order
<a id="sign-reveal-txs-of-some-order"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/sign-reveal`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/signReveal)  

#### Request Body
Content-Type: `application/json` **(required)**

- `orderId` (string): orderId; example: `""`
- `psbt` (string): psbt hex string; example: `""`

#### Response (200)
Successful operation

- `code` (integer (int32)):
- `msg` (string):
- `data` (object):
  - `inscriptionId` (string): inscriptionId; example: `""`

#### Response (401)
Invalid API Key


---

### Create an order to etch Runes
<a id="create-an-order-to-etch-runes"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/create/runes-etch`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/createOrderRunesEtch)  

#### Request Body
Content-Type: `application/json` **(required)**

- `receiveAddress` (string): Bitcoin address to receive the inscriptions; example: `""`
- `feeRate` (number (float)): The fee rate of transaction; example: `1`
- `outputValue` (integer (int32)): The balance of inscription; example: `546`
- `files` (array): example: `[{"filename":"logo","dataURL":"data:text/plain;charset=utf-8;base64,eyJwIjoic25zIiwib3AiOiJyZWciLCJuYW1lIjoiMTAwMDAuc2F0cyJ9","runes_etch":{"etching":{"spacedRune":"AAAABBBBB","symbol":"G","divisibility":0,"premine":100,"terms":{"amount":1000,"cap":21000000,"height":[840000,880000],"offset":[0,10000]}}}}]`
  - `filename` (string):
  - `dataURL` (string):
  - `runes_etch` (object):
    - `etching` (object):
      - `spacedRune` (string):
      - `symbol` (string):
      - `divisibility` (integer):
      - `premine` (string):
      - `terms` (object):
        - `amount` (string):
        - `cap` (string):
        - `height` (array):
        - `offset` (array):
- `devAddress` (string): Developer address to receive extra fee
- `devFee` (integer (int32)): Extra fee to pay to developer's address

#### Response (200)
Successful operation

- `code` (integer (int32)):
- `msg` (string):
- `data` (object):
  - `orderId` (string): example: `""`
  - `status` (string): Order Status; enum: `pending`, `inscribing`, `minted`; example: `"pending"`
  - `payAddress` (string): Pay to this address to start inscribing; example: `""`
  - `receiveAddress` (string): Bitcoin address to receive the inscriptions; example: `""`
  - `amount` (integer): The BTC amount (in satoshis) need to pay; example: `3000`
  - `paidAmount` (integer): The paid BTC amount (in satoshis)
  - `outputValue` (integer): The outputValue of each inscription
  - `feeRate` (number): The feeRate of inscribing transactions
  - `minerFee` (number): The miner fee of this order
  - `serviceFee` (number): The service fee of this order
  - `devFee` (number): The developer fee of this order
  - `files` (array):
    - `filename` (string): example: `"10000.sats"`
    - `inscriptionId` (string): example: `""`
    - `status` (string): enum: `pending`, `unconfirmed`, `confirmed`
  - `count` (integer): The total inscriptions count; example: `1`
  - `pendingCount` (integer): The pending inscriptions count; example: `1`
  - `unconfirmedCount` (integer (int32)): The unconfirmed inscriptions count; example: `0`
  - `confirmedCount` (integer (int32)): The confirmed inscriptions count; example: `0`
  - `createTime` (integer): example: `1693439128100`
  - `refundTxid` (string): example: `""`
  - `refundAmount` (integer):
  - `refundFeeRate` (number):

#### Response (401)
Invalid API Key


---

### Create an order to mint Runes
<a id="create-an-order-to-mint-runes"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/create/runes-mint`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/createOrderRunesMint)  

#### Request Body
Content-Type: `application/json` **(required)**

- `receiveAddress` (string): Bitcoin address to receive the inscriptions; example: `""`
- `feeRate` (number (float)): The fee rate of transaction; example: `1`
- `outputValue` (integer (int32)): The balance of inscription; example: `546`
- `runeid` (string): example: `"848484:10"`
- `count` (integer): example: `2`
- `devAddress` (string): Developer address to receive extra fee
- `devFee` (integer (int32)): Extra fee to pay to developer's address

#### Response (200)
Successful operation

- `code` (integer (int32)):
- `msg` (string):
- `data` (object):
  - `orderId` (string): example: `""`
  - `status` (string): Order Status; enum: `pending`, `inscribing`, `minted`; example: `"pending"`
  - `payAddress` (string): Pay to this address to start inscribing; example: `""`
  - `receiveAddress` (string): Bitcoin address to receive the inscriptions; example: `""`
  - `amount` (integer): The BTC amount (in satoshis) need to pay; example: `3000`
  - `paidAmount` (integer): The paid BTC amount (in satoshis)
  - `outputValue` (integer): The outputValue of each inscription
  - `feeRate` (number): The feeRate of inscribing transactions
  - `minerFee` (number): The miner fee of this order
  - `serviceFee` (number): The service fee of this order
  - `devFee` (number): The developer fee of this order
  - `files` (array):
    - `filename` (string): example: `"10000.sats"`
    - `inscriptionId` (string): example: `""`
    - `status` (string): enum: `pending`, `unconfirmed`, `confirmed`
  - `count` (integer): The total inscriptions count; example: `1`
  - `pendingCount` (integer): The pending inscriptions count; example: `1`
  - `unconfirmedCount` (integer (int32)): The unconfirmed inscriptions count; example: `0`
  - `confirmedCount` (integer (int32)): The confirmed inscriptions count; example: `0`
  - `createTime` (integer): example: `1693439128100`
  - `refundTxid` (string): example: `""`
  - `refundAmount` (integer):
  - `refundFeeRate` (number):

#### Response (401)
Invalid API Key


---

### Process a refund for an order.
<a id="process-a-refund-for-an-order"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/{orderId}/refund`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/refundOrder)  

#### Description
When the amount paid by the user includes inscriptions, inscribing cannot be performed. Refund can be requested through this method.

#### Parameters
- `orderId` (path, string) **(required)**: 

#### Request Body
Content-Type: `application/json` **(required)**

- `refundFeeRate` (number (float)): example: `1`

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `txid` (string): txid of refunded transaction

#### Response (401)
Invalid API Key


---

### Estimate the size of the refund transaction
<a id="estimate-the-size-of-the-refund-transaction"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/{orderId}/refund-estimate`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/estimateRefundOrder)  

#### Description
RefundAmount = PaidAmount - RefundTxSize * RefundFeeRate. This value must be greater than SafeRefundAmount, otherwise there's a risk of losing inscriptions used for payment due to errors.

#### Parameters
- `orderId` (path, string) **(required)**: 

#### Response (200)
Successful operation

- `code` (integer (int32)): enum: `0`, `-1`
- `msg` (string): example: `"OK"`
- `data` (object):
  - `paidAmount` (integer (int32)):
  - `refundTxSize` (integer (int32)): The refund amount = size * refundFeeRate
  - `safeRefundAmount` (integer (int32)):

#### Response (401)
Invalid API Key


---

## Inscribe Deprecated

### Create an order to inscribe BRC-20 DEPLOY (Deprecated)
<a id="create-an-order-to-inscribe-brc-20-deploy-deprecated"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/create/brc20-deploy`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe Deprecated/createOrderBRC20Deploy)  

#### Description
Deprecated, please use /order/create instead

#### Request Body
Content-Type: `application/json` **(required)**

- `receiveAddress` (string): Bitcoin address to receive the inscriptions; example: `""`
- `feeRate` (number (float)): The fee rate of transaction; example: `1`
- `outputValue` (integer (int32)): The balance of inscription; example: `546`
- `devAddress` (string): Developer address to receive extra fee; example: `""`
- `devFee` (integer (int32)): Extra fee to pay to developer's address
- `brc20Ticker` (string): tick in brc20-deploy; example: `""`
- `brc20Max` (string): max in brc20-deploy; example: `""`
- `brc20Limit` (string): lim in brc20-deploy; example: `""`

#### Response (200)
Successful operation

- `code` (integer (int32)):
- `msg` (string):
- `data` (object):
  - `orderId` (string): example: `""`
  - `status` (string): Order Status; enum: `pending`, `inscribing`, `minted`; example: `"pending"`
  - `payAddress` (string): Pay to this address to start inscribing; example: `""`
  - `receiveAddress` (string): Bitcoin address to receive the inscriptions; example: `""`
  - `amount` (integer): The BTC amount (in satoshis) need to pay; example: `3000`
  - `paidAmount` (integer): The paid BTC amount (in satoshis)
  - `outputValue` (integer): The outputValue of each inscription
  - `feeRate` (number): The feeRate of inscribing transactions
  - `minerFee` (number): The miner fee of this order
  - `serviceFee` (number): The service fee of this order
  - `devFee` (number): The developer fee of this order
  - `files` (array):
    - `filename` (string): example: `"10000.sats"`
    - `inscriptionId` (string): example: `""`
    - `status` (string): enum: `pending`, `unconfirmed`, `confirmed`
  - `count` (integer): The total inscriptions count; example: `1`
  - `pendingCount` (integer): The pending inscriptions count; example: `1`
  - `unconfirmedCount` (integer (int32)): The unconfirmed inscriptions count; example: `0`
  - `confirmedCount` (integer (int32)): The confirmed inscriptions count; example: `0`
  - `createTime` (integer): example: `1693439128100`
  - `refundTxid` (string): example: `""`
  - `refundAmount` (integer):
  - `refundFeeRate` (number):

#### Response (401)
Invalid API Key


---

### Create an order to inscribe BRC-20 MINT (Deprecated)
<a id="create-an-order-to-inscribe-brc-20-mint-deprecated"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/create/brc20-mint`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe Deprecated/createOrderBRC20Mint)  

#### Description
Deprecated, please use /order/create instead

#### Request Body
Content-Type: `application/json` **(required)**

- `receiveAddress` (string): Bitcoin address to receive the inscriptions; example: `""`
- `feeRate` (number (float)): The fee rate of transaction; example: `1`
- `outputValue` (integer (int32)): The balance of inscription; example: `546`
- `devAddress` (string): Developer address to receive extra fee; example: `""`
- `devFee` (integer (int32)): Extra fee to pay to developer's address
- `brc20Ticker` (string): tick in brc20-mint; example: `""`
- `brc20Amount` (string): amt in brc20-mint; example: `""`
- `count` (integer (int32)): Repetition count; example: `1`

#### Response (200)
Successful operation

- `code` (integer (int32)):
- `msg` (string):
- `data` (object):
  - `orderId` (string): example: `""`
  - `status` (string): Order Status; enum: `pending`, `inscribing`, `minted`; example: `"pending"`
  - `payAddress` (string): Pay to this address to start inscribing; example: `""`
  - `receiveAddress` (string): Bitcoin address to receive the inscriptions; example: `""`
  - `amount` (integer): The BTC amount (in satoshis) need to pay; example: `3000`
  - `paidAmount` (integer): The paid BTC amount (in satoshis)
  - `outputValue` (integer): The outputValue of each inscription
  - `feeRate` (number): The feeRate of inscribing transactions
  - `minerFee` (number): The miner fee of this order
  - `serviceFee` (number): The service fee of this order
  - `devFee` (number): The developer fee of this order
  - `files` (array):
    - `filename` (string): example: `"10000.sats"`
    - `inscriptionId` (string): example: `""`
    - `status` (string): enum: `pending`, `unconfirmed`, `confirmed`
  - `count` (integer): The total inscriptions count; example: `1`
  - `pendingCount` (integer): The pending inscriptions count; example: `1`
  - `unconfirmedCount` (integer (int32)): The unconfirmed inscriptions count; example: `0`
  - `confirmedCount` (integer (int32)): The confirmed inscriptions count; example: `0`
  - `createTime` (integer): example: `1693439128100`
  - `refundTxid` (string): example: `""`
  - `refundAmount` (integer):
  - `refundFeeRate` (number):

#### Response (401)
Invalid API Key


---

### Create an order to inscribe BRC-20 TRANSFER (Deprecated)
<a id="create-an-order-to-inscribe-brc-20-transfer-deprecated"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/create/brc20-transfer`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe Deprecated/createOrderBRC20Transfer)  

#### Description
Deprecated, please use /order/create instead

#### Request Body
Content-Type: `application/json` **(required)**

- `receiveAddress` (string): Bitcoin address to receive the inscriptions; example: `""`
- `feeRate` (number (float)): The fee rate of transaction; example: `1`
- `outputValue` (integer (int32)): The balance of inscription; example: `546`
- `devAddress` (string): Developer address to receive extra fee; example: `""`
- `devFee` (integer (int32)): Extra fee to pay to developer's address
- `brc20Ticker` (string): tick in brc20-transfer; example: `""`
- `brc20Amount` (string): amt in brc20-transfer; example: `""`

#### Response (200)
Successful operation

- `code` (integer (int32)):
- `msg` (string):
- `data` (object):
  - `orderId` (string): example: `""`
  - `status` (string): Order Status; enum: `pending`, `inscribing`, `minted`; example: `"pending"`
  - `payAddress` (string): Pay to this address to start inscribing; example: `""`
  - `receiveAddress` (string): Bitcoin address to receive the inscriptions; example: `""`
  - `amount` (integer): The BTC amount (in satoshis) need to pay; example: `3000`
  - `paidAmount` (integer): The paid BTC amount (in satoshis)
  - `outputValue` (integer): The outputValue of each inscription
  - `feeRate` (number): The feeRate of inscribing transactions
  - `minerFee` (number): The miner fee of this order
  - `serviceFee` (number): The service fee of this order
  - `devFee` (number): The developer fee of this order
  - `files` (array):
    - `filename` (string): example: `"10000.sats"`
    - `inscriptionId` (string): example: `""`
    - `status` (string): enum: `pending`, `unconfirmed`, `confirmed`
  - `count` (integer): The total inscriptions count; example: `1`
  - `pendingCount` (integer): The pending inscriptions count; example: `1`
  - `unconfirmedCount` (integer (int32)): The unconfirmed inscriptions count; example: `0`
  - `confirmedCount` (integer (int32)): The confirmed inscriptions count; example: `0`
  - `createTime` (integer): example: `1693439128100`
  - `refundTxid` (string): example: `""`
  - `refundAmount` (integer):
  - `refundFeeRate` (number):

#### Response (401)
Invalid API Key


---

### Create an order to inscribe BRC-20 MINT (Deprecated)
<a id="create-an-order-to-inscribe-brc-20-mint-deprecated"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/create/brc20-5byte-mint`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe Deprecated/createOrderBRC205ByteMint)  

#### Description
Deprecated, please use /order/create instead

#### Request Body
Content-Type: `application/json` **(required)**

- `deployerAddress` (string): The deployer address that deployed the ticker; example: `""`
- `deployerPubkey` (string): The deployer pubkey that deployed the ticker; example: `""`
- `receiveAddress` (string): Bitcoin address to receive the inscriptions; example: `""`
- `feeRate` (number (float)): The fee rate of transaction; example: `1`
- `outputValue` (integer (int32)): The balance of inscription; example: `546`
- `devAddress` (string): Developer address to receive extra fee; example: `""`
- `devFee` (integer (int32)): Extra fee to pay to developer's address
- `brc20Ticker` (string): tick in brc20-mint; example: `""`
- `brc20Amount` (string): amt in brc20-mint; example: `""`

#### Response (200)
Successful operation

- `code` (integer (int32)):
- `msg` (string):
- `data` (object):
  - `orderId` (string): example: `""`
  - `status` (string): Order Status; enum: `pending`, `inscribing`, `minted`; example: `"pending"`
  - `payAddress` (string): Pay to this address to start inscribing; example: `""`
  - `receiveAddress` (string): Bitcoin address to receive the inscriptions; example: `""`
  - `amount` (integer): The BTC amount (in satoshis) need to pay; example: `3000`
  - `paidAmount` (integer): The paid BTC amount (in satoshis)
  - `outputValue` (integer): The outputValue of each inscription
  - `feeRate` (number): The feeRate of inscribing transactions
  - `minerFee` (number): The miner fee of this order
  - `serviceFee` (number): The service fee of this order
  - `devFee` (number): The developer fee of this order
  - `files` (array):
    - `filename` (string): example: `"10000.sats"`
    - `inscriptionId` (string): example: `""`
    - `status` (string): enum: `pending`, `unconfirmed`, `confirmed`
  - `count` (integer): The total inscriptions count; example: `1`
  - `pendingCount` (integer): The pending inscriptions count; example: `1`
  - `unconfirmedCount` (integer (int32)): The unconfirmed inscriptions count; example: `0`
  - `confirmedCount` (integer (int32)): The confirmed inscriptions count; example: `0`
  - `createTime` (integer): example: `1693439128100`
  - `refundTxid` (string): example: `""`
  - `refundAmount` (integer):
  - `refundFeeRate` (number):

#### Response (401)
Invalid API Key


---

### Request commit txs of brc20-5byte-mint. (Deprecated)
<a id="request-commit-txs-of-brc20-5byte-mint-deprecated"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/request-commit/brc20-5byte-mint`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe Deprecated/requestCommitBRC205ByteMint)  

#### Description
Deprecated, please use /order/request-commit instead

#### Request Body
Content-Type: `application/json` **(required)**

- `orderId` (string): orderId; example: `""`
- `payerAddress` (string): payer's bitcoin address; example: `""`
- `payerPubkey` (string): payer's pubkey; example: `""`

#### Response (200)
Successful operation

- `code` (integer (int32)):
- `msg` (string):
- `data` (object):
  - `psbtHex` (string): psbt hex string; example: `""`
  - `inputsToSign` (array):
    - `address` (string):
    - `signingIndexes` (array):

#### Response (401)
Invalid API Key


---

### Sign commit txs of brc20-5byte-mint (Deprecated)
<a id="sign-commit-txs-of-brc20-5byte-mint-deprecated"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/sign-commit/brc20-5byte-mint`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe Deprecated/signCommitBRC205ByteMint)  

#### Description
Deprecated, please use /order/sign-commit instead

#### Request Body
Content-Type: `application/json` **(required)**

- `orderId` (string): orderId; example: `""`
- `psbt` (string): psbt hex string; example: `""`

#### Response (200)
Successful operation

- `code` (integer (int32)):
- `msg` (string):
- `data` (object):
  - `psbtHex` (string): psbt hex string; example: `""`
  - `inputsToSign` (array):
    - `address` (string):
    - `signingIndexes` (array):

#### Response (401)
Invalid API Key


---

### Sign reveal txs of brc20-5byte-mint (Deprecated)
<a id="sign-reveal-txs-of-brc20-5byte-mint-deprecated"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/sign-reveal/brc20-5byte-mint`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe Deprecated/signRevealBRC205ByteMint)  

#### Description
Deprecated, please use /order/sign-reveal instead

#### Request Body
Content-Type: `application/json` **(required)**

- `orderId` (string): orderId; example: `""`
- `psbt` (string): psbt hex string; example: `""`

#### Response (200)
Successful operation

- `code` (integer (int32)):
- `msg` (string):
- `data` (object):
  - `inscriptionId` (string): inscriptionId; example: `""`

#### Response (401)
Invalid API Key


---

