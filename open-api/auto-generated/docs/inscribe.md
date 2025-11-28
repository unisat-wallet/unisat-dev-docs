# Inscribe API

This is UniSat Wallet Open API. If you wish to use the OpenAPI, please feel free to send us an email, and we will provide you with an API KEY.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [GET /v2/inscribe/order/summary](#get-order-summary-of-current-apikey) | Get order summary of current apikey |
| [GET /v2/inscribe/order/list](#get-order-list-of-current-apikey) | Get order list of current apikey |
| [GET /v2/inscribe/order/{orderId}](#search-an-order-by-orderid) | Search an order by orderId |
| [POST /v2/inscribe/order/create](#create-an-order) | Create an order |
| [POST /v2/inscribe/order/create/brc20-deploy](#create-an-order-to-inscribe-brc-20-deploy-deprecated) | Create an order to inscribe BRC-20 DEPLOY (Deprecated) |
| [POST /v2/inscribe/order/create/brc20-mint](#create-an-order-to-inscribe-brc-20-mint-deprecated) | Create an order to inscribe BRC-20 MINT (Deprecated) |
| [POST /v2/inscribe/order/create/brc20-transfer](#create-an-order-to-inscribe-brc-20-transfer-deprecated) | Create an order to inscribe BRC-20 TRANSFER (Deprecated) |
| [POST /v2/inscribe/order/request-commit](#request-commit-txs-of-some-order) | Request commit txs of some order |
| [POST /v2/inscribe/order/sign-commit](#sign-commit-txs-of-some-order) | Sign commit txs of some order |
| [POST /v2/inscribe/order/sign-reveal](#sign-reveal-txs-of-some-order) | Sign reveal txs of some order |
| [POST /v2/inscribe/order/create/brc20-5byte-mint](#create-an-order-to-inscribe-brc-20-mint-deprecated) | Create an order to inscribe BRC-20 MINT (Deprecated) |
| [POST /v2/inscribe/order/request-commit/brc20-5byte-mint](#request-commit-txs-of-brc20-5byte-mint-deprecated) | Request commit txs of brc20-5byte-mint. (Deprecated) |
| [POST /v2/inscribe/order/sign-commit/brc20-5byte-mint](#sign-commit-txs-of-brc20-5byte-mint-deprecated) | Sign commit txs of brc20-5byte-mint (Deprecated) |
| [POST /v2/inscribe/order/sign-reveal/brc20-5byte-mint](#sign-reveal-txs-of-brc20-5byte-mint-deprecated) | Sign reveal txs of brc20-5byte-mint (Deprecated) |
| [POST /v2/inscribe/order/create/runes-etch](#create-an-order-to-etch-runes) | Create an order to etch Runes |
| [POST /v2/inscribe/order/create/runes-mint](#create-an-order-to-mint-runes) | Create an order to mint Runes |
| [POST /v2/inscribe/order/{orderId}/refund](#process-a-refund-for-an-order) | Process a refund for an order. |
| [POST /v2/inscribe/order/{orderId}/refund-estimate](#estimate-the-size-of-the-refund-transaction) | Estimate the size of the refund transaction |

---

## Inscribe

### Get order summary of current apikey
<a id="get-order-summary-of-current-apikey"></a>

**Method**: `GET`  
**Path**: `/v2/inscribe/order/summary`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/getOrderSummary)  

#### Response (200)


---

### Get order list of current apikey
<a id="get-order-list-of-current-apikey"></a>

**Method**: `GET`  
**Path**: `/v2/inscribe/order/list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/getOrderList)  

#### Description
Get order list of current apikey

#### Parameters
- `cursor` (query) **(required)**: Start offset
- `size` (query) **(required)**: Number of items returned
- `sort` (query) : Sort by (asc/desc)
- `status` (query) : Status of order
- `receiveAddress` (query) : ReceiveAddress of order
- `clientId` (query) : ClientId of order
- `withFiles` (query) : Whether to include files

#### Response (200)


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
- `orderId` (path) **(required)**: 

#### Response (200)


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

#### Response (200)


---

### Request commit txs of some order
<a id="request-commit-txs-of-some-order"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/request-commit`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/requestCommit)  

#### Response (200)


---

### Sign commit txs of some order
<a id="sign-commit-txs-of-some-order"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/sign-commit`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/signCommit)  

#### Response (200)


---

### Sign reveal txs of some order
<a id="sign-reveal-txs-of-some-order"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/sign-reveal`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/signReveal)  

#### Response (200)


---

### Create an order to etch Runes
<a id="create-an-order-to-etch-runes"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/create/runes-etch`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/createOrderRunesEtch)  

#### Response (200)


---

### Create an order to mint Runes
<a id="create-an-order-to-mint-runes"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/create/runes-mint`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/createOrderRunesMint)  

#### Response (200)


---

### Process a refund for an order.
<a id="process-a-refund-for-an-order"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/{orderId}/refund`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/refundOrder)  

#### Description
When the amount paid by the user includes inscriptions, inscribing cannot be performed. Refund can be requested through this method.

#### Parameters
- `orderId` (path) **(required)**: 

#### Response (200)


---

### Estimate the size of the refund transaction
<a id="estimate-the-size-of-the-refund-transaction"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/{orderId}/refund-estimate`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/estimateRefundOrder)  

#### Description
RefundAmount = PaidAmount - RefundTxSize * RefundFeeRate. This value must be greater than SafeRefundAmount, otherwise there's a risk of losing inscriptions used for payment due to errors.

#### Parameters
- `orderId` (path) **(required)**: 

#### Response (200)


---

## Inscribe Deprecated

### Create an order to inscribe BRC-20 DEPLOY (Deprecated)
<a id="create-an-order-to-inscribe-brc-20-deploy-deprecated"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/create/brc20-deploy`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe Deprecated/createOrderBRC20Deploy)  

#### Description
Deprecated, please use /order/create instead

#### Response (200)


---

### Create an order to inscribe BRC-20 MINT (Deprecated)
<a id="create-an-order-to-inscribe-brc-20-mint-deprecated"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/create/brc20-mint`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe Deprecated/createOrderBRC20Mint)  

#### Description
Deprecated, please use /order/create instead

#### Response (200)


---

### Create an order to inscribe BRC-20 TRANSFER (Deprecated)
<a id="create-an-order-to-inscribe-brc-20-transfer-deprecated"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/create/brc20-transfer`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe Deprecated/createOrderBRC20Transfer)  

#### Description
Deprecated, please use /order/create instead

#### Response (200)


---

### Create an order to inscribe BRC-20 MINT (Deprecated)
<a id="create-an-order-to-inscribe-brc-20-mint-deprecated"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/create/brc20-5byte-mint`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe Deprecated/createOrderBRC205ByteMint)  

#### Description
Deprecated, please use /order/create instead

#### Response (200)


---

### Request commit txs of brc20-5byte-mint. (Deprecated)
<a id="request-commit-txs-of-brc20-5byte-mint-deprecated"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/request-commit/brc20-5byte-mint`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe Deprecated/requestCommitBRC205ByteMint)  

#### Description
Deprecated, please use /order/request-commit instead

#### Response (200)


---

### Sign commit txs of brc20-5byte-mint (Deprecated)
<a id="sign-commit-txs-of-brc20-5byte-mint-deprecated"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/sign-commit/brc20-5byte-mint`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe Deprecated/signCommitBRC205ByteMint)  

#### Description
Deprecated, please use /order/sign-commit instead

#### Response (200)


---

### Sign reveal txs of brc20-5byte-mint (Deprecated)
<a id="sign-reveal-txs-of-brc20-5byte-mint-deprecated"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/sign-reveal/brc20-5byte-mint`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe Deprecated/signRevealBRC205ByteMint)  

#### Description
Deprecated, please use /order/sign-reveal instead

#### Response (200)


---

