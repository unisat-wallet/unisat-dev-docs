# Inscribe API

Legacy V2 inscription API. `GET /v2/inscribe/order/summary` remains supported; all other V2 inscription endpoints are deprecated and new integrations must use the Inscribe API V5 endpoints under /inscribe-v5. See open-api/inscribe-v5-migration.md.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [GET `/v2/inscribe/order/summary`](#summarize-inscription-order-counts) | Summarize inscription order counts |
| [GET `/v2/inscribe/order/list`](#list-inscription-orders-with-status-details) | List inscription orders with status details |
| [GET `/v2/inscribe/order/(orderId)`](#get-one-inscription-order-state) | Get one inscription order state |
| [POST `/v2/inscribe/order/create`](#create-generic-inscription-payment-order) | Create generic inscription payment order |
| [POST `/v2/inscribe/order/create/brc20-deploy`](#create-deprecated-brc-20-deploy-inscription-order) | Create deprecated BRC-20 deploy inscription order |
| [POST `/v2/inscribe/order/create/brc20-mint`](#create-deprecated-brc-20-mint-inscription-order) | Create deprecated BRC-20 mint inscription order |
| [POST `/v2/inscribe/order/create/brc20-transfer`](#create-deprecated-brc-20-transfer-inscription-order) | Create deprecated BRC-20 transfer inscription order |
| [POST `/v2/inscribe/order/request-commit`](#prepare-inscription-commit-psbt) | Prepare inscription commit PSBT |
| [POST `/v2/inscribe/order/sign-commit`](#submit-signed-inscription-commit-psbt) | Submit signed inscription commit PSBT |
| [POST `/v2/inscribe/order/sign-reveal`](#submit-signed-inscription-reveal-psbt) | Submit signed inscription reveal PSBT |
| [POST `/v2/inscribe/order/create/brc20-5byte-mint`](#create-deprecated-brc-20-5-byte-mint-order) | Create deprecated BRC-20 5-byte mint order |
| [POST `/v2/inscribe/order/request-commit/brc20-5byte-mint`](#prepare-deprecated-5-byte-commit-psbt) | Prepare deprecated 5-byte commit PSBT |
| [POST `/v2/inscribe/order/sign-commit/brc20-5byte-mint`](#submit-deprecated-signed-5-byte-commit) | Submit deprecated signed 5-byte commit |
| [POST `/v2/inscribe/order/sign-reveal/brc20-5byte-mint`](#submit-deprecated-signed-5-byte-reveal) | Submit deprecated signed 5-byte reveal |
| [POST `/v2/inscribe/order/create/runes-etch`](#create-runes-etch-inscription-order) | Create Runes etch inscription order |
| [POST `/v2/inscribe/order/create/runes-mint`](#create-runes-mint-inscription-order) | Create Runes mint inscription order |
| [POST `/v2/inscribe/order/(orderId)/refund`](#submit-inscription-order-refund) | Submit inscription order refund |
| [POST `/v2/inscribe/order/(orderId)/refund-estimate`](#estimate-inscription-refund-amount) | Estimate inscription refund amount |

---

## Inscribe

### Summarize inscription order counts
<a id="summarize-inscription-order-counts"></a>

**Method**: `GET`  
**Path**: `/v2/inscribe/order/summary`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/getOrderSummary)  

#### Description
Returns orderCount totals by status for the current API key, including pending, inscribing, minted, closed, and refunded buckets. Use it for dashboard totals and reconcile the counts before drilling into order lists; it never creates payment state or broadcasts transactions.

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

### List inscription orders with status details
<a id="list-inscription-orders-with-status-details"></a>

**Method**: `GET`  
**Path**: `/v2/inscribe/order/list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/getOrderList)  

#### Description
Returns paginated inscription orders, including orderId, status, payment amounts, receiveAddress, fee fields, counts, and optional file details. Use it to monitor order progress or reconcile payments; check status, paidAmount, amount, and files before taking follow-up signing or refund actions.

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

### Get one inscription order state
<a id="get-one-inscription-order-state"></a>

**Method**: `GET`  
**Path**: `/v2/inscribe/order/{orderId}`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/getOrderById)  

#### Description
Returns a single order with status, payAddress, receiveAddress, paidAmount, required amount, fee breakdown, inscription counts, file statuses, and refund fields. Poll it before payment, commit signing, reveal signing, or refund decisions; verify status and amount fields because this endpoint is read-only.

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

### Create generic inscription payment order
<a id="create-generic-inscription-payment-order"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/create`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/createOrder)  

#### Description
Creates an inscription order for arbitrary files and returns orderId, payAddress, required amount, receiveAddress, fee breakdown, and order/file status. Confirm receiveAddress, file data, outputValue, feeRate, dev fee fields, and expected payment amount before calling because it starts payable order state.

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

### Create deprecated BRC-20 deploy inscription order
<a id="create-deprecated-brc-20-deploy-inscription-order"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/create/brc20-deploy`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/createOrderBRC20Deploy)  

#### Description
Creates a payable inscription order for legacy BRC-20 deploy content and returns orderId, payAddress, amount, receiveAddress, fee fields, and status. Confirm ticker, max, limit, receiveAddress, feeRate, outputValue, and payment amount before use; prefer newer workflows when available.

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

### Create deprecated BRC-20 mint inscription order
<a id="create-deprecated-brc-20-mint-inscription-order"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/create/brc20-mint`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/createOrderBRC20Mint)  

#### Description
Creates a payable inscription order for legacy BRC-20 mint content and returns orderId, payAddress, amount, receiveAddress, fee fields, and status. Confirm ticker, mint amount, count, receiveAddress, feeRate, outputValue, and total payment before use; prefer newer workflows when available.

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

### Create deprecated BRC-20 transfer inscription order
<a id="create-deprecated-brc-20-transfer-inscription-order"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/create/brc20-transfer`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/createOrderBRC20Transfer)  

#### Description
Creates a payable inscription order for legacy BRC-20 transfer content and returns orderId, payAddress, amount, receiveAddress, fee fields, and status. Confirm ticker, transfer amount, receiveAddress, feeRate, outputValue, and payment amount before use; prefer newer workflows when available.

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

### Prepare inscription commit PSBT
<a id="prepare-inscription-commit-psbt"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/request-commit`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/requestCommit)  

#### Description
Returns commit transaction PSBT hex and inputsToSign for a paid inscription order. Confirm orderId, payerAddress, payerPubkey, payment status, and signing indexes before signing; this prepares spend material but later sign endpoints advance the on-chain workflow.

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

### Submit signed inscription commit PSBT
<a id="submit-signed-inscription-commit-psbt"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/sign-commit`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/signCommit)  

#### Description
Submits the signed commit PSBT for an inscription order and returns next-step PSBT/signing material when accepted. Verify orderId, PSBT content, payer inputs, payment amount, and fee assumptions before calling because it advances the transaction workflow.

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

### Submit signed inscription reveal PSBT
<a id="submit-signed-inscription-reveal-psbt"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/sign-reveal`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/signReveal)  

#### Description
Submits the signed reveal PSBT and returns the resulting inscriptionId when the reveal is accepted. Verify orderId, PSBT content, receiveAddress, file payload, and fees before calling because this can finalize inscription creation on-chain.

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

### Create deprecated BRC-20 5-byte mint order
<a id="create-deprecated-brc-20-5-byte-mint-order"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/create/brc20-5byte-mint`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/createOrderBRC205ByteMint)  

#### Description
Creates a payable inscription order for legacy BRC-20 5-byte mint content and returns orderId, payAddress, amount, receiveAddress, fee fields, and status. Confirm deployer address/pubkey, ticker, mint amount, receiveAddress, feeRate, outputValue, and payment amount before use; prefer newer workflows when available.

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

### Prepare deprecated 5-byte commit PSBT
<a id="prepare-deprecated-5-byte-commit-psbt"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/request-commit/brc20-5byte-mint`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/requestCommitBRC205ByteMint)  

#### Description
Returns commit PSBT hex and inputsToSign for a paid legacy BRC-20 5-byte mint order. Confirm orderId, payerAddress, payerPubkey, payment status, and signing indexes before signing; deprecated endpoint kept for compatibility.

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

### Submit deprecated signed 5-byte commit
<a id="submit-deprecated-signed-5-byte-commit"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/sign-commit/brc20-5byte-mint`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/signCommitBRC205ByteMint)  

#### Description
Submits the signed commit PSBT for a legacy BRC-20 5-byte mint order and returns next-step PSBT/signing material when accepted. Verify orderId, PSBT content, payer inputs, payment amount, and fees before calling; deprecated endpoint kept for compatibility.

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

### Submit deprecated signed 5-byte reveal
<a id="submit-deprecated-signed-5-byte-reveal"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/sign-reveal/brc20-5byte-mint`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/signRevealBRC205ByteMint)  

#### Description
Submits the signed reveal PSBT for a legacy BRC-20 5-byte mint order and returns inscriptionId when accepted. Verify orderId, PSBT content, receiveAddress, inscription payload, and fees before calling; deprecated endpoint kept for compatibility.

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

### Create Runes etch inscription order
<a id="create-runes-etch-inscription-order"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/create/runes-etch`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/createOrderRunesEtch)  

#### Description
Creates a payable inscription order for Runes etching and returns orderId, payAddress, amount, receiveAddress, fee fields, and status. Confirm rune name/symbol/divisibility, premine and terms, file payload, receiveAddress, feeRate, outputValue, and total payment before calling.

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

### Create Runes mint inscription order
<a id="create-runes-mint-inscription-order"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/create/runes-mint`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/createOrderRunesMint)  

#### Description
Creates a payable inscription order for Runes minting and returns orderId, payAddress, amount, receiveAddress, fee fields, and status. Confirm runeid, count, receiveAddress, feeRate, outputValue, dev fee fields, and total payment before calling.

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

### Submit inscription order refund
<a id="submit-inscription-order-refund"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/{orderId}/refund`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/refundOrder)  

#### Description
Requests a refund transaction for a paid inscription order and returns the refund txid when accepted. Verify orderId, order status, paidAmount, safe refund amount, refundFeeRate, and destination assumptions before calling because it can move funds.

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

### Estimate inscription refund amount
<a id="estimate-inscription-refund-amount"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/{orderId}/refund-estimate`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/estimateRefundOrder)  

#### Description
Returns paidAmount, refundTxSize, and safeRefundAmount for an inscription order refund check. Use it before refund submission to compare fee impact and recoverable value; it never creates, signs, or broadcasts the refund transaction.

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

