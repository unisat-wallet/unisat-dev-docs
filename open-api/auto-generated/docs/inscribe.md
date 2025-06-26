# Inscribe API

This is UniSat Wallet Open API. If you wish to use the OpenAPI, please feel free to send us an email, and we will provide you with an API KEY.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---

## 📑 Table of Contents

- [Inscribe](#inscribe)
  - [Get order summary of current apikey](#get-order-summary-of-current-apikey)
  - [Get order list of current apikey](#get-order-list-of-current-apikey)
  - [Search an order by orderId](#search-an-order-by-orderid)
  - [Create an order](#create-an-order)
  - [Create an order to inscribe BRC-20 DEPLOY](#create-an-order-to-inscribe-brc-20-deploy)
  - [Create an order to inscribe BRC-20 MINT](#create-an-order-to-inscribe-brc-20-mint)
  - [Create an order to inscribe BRC-20 TRANSFER](#create-an-order-to-inscribe-brc-20-transfer)
  - [Create an order to inscribe BRC-20 MINT](#create-an-order-to-inscribe-brc-20-mint)
  - [Request commit txs of brc20-5byte-mint](#request-commit-txs-of-brc20-5byte-mint)
  - [Sign commit txs of brc20-5byte-mint](#sign-commit-txs-of-brc20-5byte-mint)
  - [Sign reveal txs of brc20-5byte-mint](#sign-reveal-txs-of-brc20-5byte-mint)
  - [Create an order to etch Runes](#create-an-order-to-etch-runes)
  - [Create an order to mint Runes](#create-an-order-to-mint-runes)
  - [Process a refund for an order.](#process-a-refund-for-an-order)
  - [Estimate the size of the refund transaction](#estimate-the-size-of-the-refund-transaction)

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

### Create an order to inscribe BRC-20 DEPLOY
<a id="create-an-order-to-inscribe-brc-20-deploy"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/create/brc20-deploy`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/createOrderBRC20Deploy)  

#### Response (200)


---

### Create an order to inscribe BRC-20 MINT
<a id="create-an-order-to-inscribe-brc-20-mint"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/create/brc20-mint`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/createOrderBRC20Mint)  

#### Response (200)


---

### Create an order to inscribe BRC-20 TRANSFER
<a id="create-an-order-to-inscribe-brc-20-transfer"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/create/brc20-transfer`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/createOrderBRC20Transfer)  

#### Response (200)


---

### Create an order to inscribe BRC-20 MINT
<a id="create-an-order-to-inscribe-brc-20-mint"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/create/brc20-5byte-mint`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/createOrderBRC205ByteMint)  

#### Response (200)


---

### Request commit txs of brc20-5byte-mint
<a id="request-commit-txs-of-brc20-5byte-mint"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/request-commit/brc20-5byte-mint`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/requestCommitBRC205ByteMint)  

#### Response (200)


---

### Sign commit txs of brc20-5byte-mint
<a id="sign-commit-txs-of-brc20-5byte-mint"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/sign-commit/brc20-5byte-mint`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/signCommitBRC205ByteMint)  

#### Response (200)


---

### Sign reveal txs of brc20-5byte-mint
<a id="sign-reveal-txs-of-brc20-5byte-mint"></a>

**Method**: `POST`  
**Path**: `/v2/inscribe/order/sign-reveal/brc20-5byte-mint`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Inscribe/signRevealBRC205ByteMint)  

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

