# Inscribe Service Guide

## 📖 Overview

UniSat Inscribe API provides complete Bitcoin inscription services, supporting standard inscriptions and various protocol templates (BRC-20, Runes, etc.). This document provides detailed instructions on how to use the Inscribe API to create orders, make payments, and track order status.

## 📑 Table of Contents

### Basics

- [Basic Inscription Process](#basic-inscription-process) - Create order, payment, status tracking

### BRC-20 Protocol

- **[BRC-20 (4-byte) Standard Protocol](./brc20-4byte-guide-en.md)** - Most common 4-character tokens
  - Deploy / Mint / Transfer
  - Public minting, anyone can participate
- **[BRC-20 (5-byte) Authorized Protocol](./brc20-5byte-guide-en.md)** - 5-character authorized tokens
  - Deploy / Mint (requires PSBT authorization) / Transfer
  - Only deployer can mint
- **[BRC-20 (6-byte) BRC2.0 Programmable Module](./brc20-6byte-guide-en.md)** - 6-character tokens
  - BRC2.0 - Programmable Module

### Runes Protocol

- [Runes Etch (Rune Inscription)](#runes-etch-rune-inscription) - Create Runes
- [Runes Mint (Rune Minting)](#runes-mint-rune-minting) - Mint Runes

### Other Features

- [Advanced Features](#advanced-features) - Order list, statistics, refund
- [Limits and Rules](#limits-and-rules) - Quantity limits, fee rules
- [FAQ](#faq-and-notes) - FAQ
- [Best Practices](#best-practices) - Code examples

---

## 🚀 Basic Inscription Process

### 1. Basic Process Overview

The basic inscription order process is as follows:

```
Create Order → Payment → Order Processing → Inscription Complete
     ↓            ↓            ↓                  ↓
  pending  →  pending  →  inscribing  →       minted
```

### 2. Create Order

Use the `POST /v2/inscribe/order/create` endpoint to create a basic inscription order.

#### Request Parameters

| Parameter      | Type    | Required | Description                                         |
| -------------- | ------- | -------- | --------------------------------------------------- |
| receiveAddress | string  | Yes      | Bitcoin address to receive the inscription          |
| feeRate        | number  | Yes      | Transaction fee rate (sat/vB)                       |
| outputValue    | integer | Yes      | UTXO amount for each inscription (usually 546 sats) |
| files          | array   | Yes      | List of files to inscribe                           |
| devAddress     | string  | No       | Developer address (for collecting additional fees)  |
| devFee         | integer | No       | Developer fee (sats)                                |

#### Example Request

```bash
curl -X POST "https://open-api.unisat.io/v2/inscribe/order/create" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "receiveAddress": "bc1p...",
    "feeRate": 10,
    "outputValue": 546,
    "files": [
      {
        "filename": "hello.txt",
        "dataURL": "data:text/plain;charset=utf-8;base64,SGVsbG8gV29ybGQ="
      }
    ]
  }'
```

### 3. Pay for Order

After creating an order, you need to pay the `amount` of sats to the `payAddress` in the response.

**Payment amount calculation:**

```
amount = outputValue × fileCount + networkSats + serviceFee + devFee
```

For detailed fee calculation, please refer to:

- [Bitcoin Inscription Fee Rules](./btc-inscribe-fee-rules.md)
- [Inscription FAQ](./inscribe-faq.md)

### 4. Order Status Flow

```
pending               → Pending payment
payment_success       → Payment successful
inscribing            → Inscribing (transaction broadcasted)
minted                → Inscription complete (transaction confirmed)
```

### 5. Query Order Status

Use `GET /v2/inscribe/order/{orderId}` to query the latest order status.

**Recommendation: Query order status every 10 seconds**

```bash
curl -X GET "https://open-api.unisat.io/v2/inscribe/order/{orderId}" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

## 🪙 BRC-20 Protocol Series

BRC-20 is the most popular token protocol on Bitcoin. UniSat supports three different types of BRC-20 tokens:

### 📋 Protocol Comparison

| Protocol Type                           | Ticker Length | Deploy Method    | Minting Permission       | Use Cases                  |
| --------------------------------------- | ------------- | ---------------- | ------------------------ | -------------------------- |
| **[4-byte](./brc20-4byte-guide-en.md)** | 4 characters  | Standard payment | Anyone can mint          | Fair launch, community     |
| **[5-byte](./brc20-5byte-guide-en.md)** | 5 characters  | Standard payment | Deployer only            | Project tokens, controlled |
| **[6-byte](./brc20-6byte-guide-en.md)** | 6 characters  | PSBT signing     | Configurable (self_mint) | Timed launch, permissions  |

### 🔗 Detailed Documentation Links

#### **[→ BRC-20 (4-byte) Standard Protocol Complete Guide](./brc20-4byte-guide-en.md)**

Most commonly used BRC-20 token type:

- ✅ 4-character ticker (e.g., `ordi`, `sats`)
- ✅ Complete Deploy / Mint / Transfer process
- ✅ Public minting, anyone can participate
- ✅ Standard payment process, simple and easy
- 💡 Suitable for: Community fair launch, Meme tokens

#### **[→ BRC-20 (5-byte) Authorized Protocol Complete Guide](./brc20-5byte-guide-en.md)**

Authorized 5-character tokens:

- ✅ 5-character ticker (e.g., `pizza`, `names`)
- 🔐 Deploy (standard) / Mint (requires PSBT signing) / Transfer (standard)
- 🔐 Only deployer can mint
- 🔧 Minting requires 4-step PSBT signing process
- 💡 Suitable for: Project-controlled tokens, whitelist distribution

#### **[→ BRC-20 (6-byte) Protocol Complete Guide](./brc20-6byte-guide-en.md)**

6-character token deployment method:

- ⏰ Set activation height (timed launch)
- 🔐 Support `self_mint` to configure minting permissions
- 🔧 All operations use PSBT signing
- 💡 Suitable for: Timed launch, permission control

### 💡 Quick Selection Guide

```
┌─────────────────────────────────┐
│  Need fair launch?             │
└─────────────┬───────────────────┘
              │
         Yes ─┴─ No
         ↓        ↓
    4-byte     Need minting control?
    Standard         │
                Yes ─┴─ No
                ↓        ↓
           5-byte    Need 6-char or timed activation?
           Authorized     │
                     Yes ─┴─ No
                     ↓        ↓
                  6-byte   Choose simplest
                  Protocol  4-byte

```

---

## 🔮 Runes Protocol

Runes is another token protocol on Bitcoin that uses OP_RETURN to store data, more efficient and natively supports the UTXO model.

### Runes Etch (Rune Inscription)

#### Endpoint

`POST /v2/inscribe/order/create/runes-etch`

#### Quick Example

```bash
curl -X POST "https://open-api.unisat.io/v2/inscribe/order/create/runes-etch" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "receiveAddress": "bc1p...",
    "feeRate": 50,
    "outputValue": 546,
    "files": [{
      "filename": "logo.png",
      "dataURL": "data:image/png;base64,...",
      "runes_etch": {
        "etching": {
          "spacedRune": "MY•RUNE",
          "symbol": "M",
          "divisibility": 8,
          "premine": "1000000",
          "terms": {
            "amount": "100",
            "cap": "21000000",
            "height": [840000, 1000000]
          }
        }
      }
    }]
  }'
```

#### Detailed Documentation

Complete Runes Etch parameter descriptions and configuration details:

- [→ Runes Etch API Complete Documentation](./auto-generated/docs/inscribe.md#create-an-order-to-etch-runes)

---

### Runes Mint (Rune Minting)

#### Endpoint

`POST /v2/inscribe/order/create/runes-mint`

#### Quick Example

```bash
curl -X POST "https://open-api.unisat.io/v2/inscribe/order/create/runes-mint" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "receiveAddress": "bc1p...",
    "feeRate": 30,
    "outputValue": 546,
    "runeid": "840000:1",
    "count": 5
  }'
```

#### Rune ID Format

- Format: `block:tx`
- Example: `840000:1` = Transaction 1 in block 840000

#### Detailed Documentation

Complete Runes Mint parameter descriptions:

- [→ Runes Mint API Complete Documentation](./auto-generated/docs/inscribe.md#create-an-order-to-mint-runes)

---

## 🔧 Advanced Features

### Order List Query

`GET /v2/inscribe/order/list`

```bash
curl -X GET "https://open-api.unisat.io/v2/inscribe/order/list?cursor=0&size=20&status=minted" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Order Summary Statistics

`GET /v2/inscribe/order/summary`

Get order statistics for the current API Key (total, pending, inscribing, minted, etc.).

### Order Refund

`POST /v2/inscribe/order/{orderId}/refund`

When an order has issues (such as payment containing inscriptions, incorrect payment amount, etc.), you can request a refund.

---

## 📊 Limits and Rules

### Quantity Limits

- **Maximum inscriptions per order**: 1000
- **Maximum single file size**: 390 KB
- **Maximum network fee rate**: 10,000 sat/vB

### Service Fee Rules (Bitcoin Mainnet)

- **Base service fee**: 3000 sats
- **Per inscription fee**: 150 sats (after free quota)
- **Free quota**: First 20 inscriptions per order are free
- **Maximum service fee per order**: 4999 sats

#### Fee Calculation Formula

- If n ≤ 20: `Fee = 0`
- If n > 20: `Fee = min(3000 + (n - 20) × 150, 4999)`

Detailed fee rules:

- [Bitcoin Inscription Fee Rules](./btc-inscribe-fee-rules.md)
- [Fractal Inscription Fee Rules](./fractal-openapi-inscribe-fee-rules.md)

---

## ⚠️ FAQ and Notes

### 1. Payment Related

**Q: How long after payment does inscription start?**

- A: Usually starts immediately after the Bitcoin network confirms the payment transaction (about 10 minutes).

**Q: What happens if I pay the wrong amount?**

- A:
  - Insufficient payment: Order status becomes `payment_notenough`, need to make up the difference
  - Overpayment: Order status becomes `payment_overpay`, can choose to continue or refund

### 2. Protocol Selection

**Q: Which BRC-20 protocol should I choose?**

- A:
  - Need fair launch → [4-byte Standard Protocol](./brc20-4byte-guide-en.md)
  - Need minting control → [5-byte Authorized Protocol](./brc20-5byte-guide-en.md)
  - Need 6-character or timed activation → [6-byte Protocol](./brc20-6byte-guide-en.md)

**Q: What's the difference between Runes and BRC-20?**

- A:
  - **BRC-20**: Based on Ordinals theory, data stored in witness
  - **Runes**: Uses OP_RETURN, more efficient, natively supports UTXO model

### 3. Development Related

**Q: How to get an API Key?**

- A: Send an email to contact@unisat.io to apply for an API Key.

**Q: Is a test environment available?**

- A: Yes, use the following test networks:
  - Bitcoin Testnet: `https://open-api-testnet.unisat.io`
  - Bitcoin Signet: `https://open-api-signet.unisat.io`

---

## 🔗 Related Resources

### BRC-20 Protocol Documentation

- **[BRC-20 (4-byte) Complete Guide](./brc20-4byte-guide-en.md)** - Standard 4-character tokens
- **[BRC-20 (5-byte) Complete Guide](./brc20-5byte-guide-en.md)** - 5-character authorized tokens
- **[BRC-20 (6-byte) Complete Guide](./brc20-6byte-guide-en.md)** - 6-character tokens

### API Documentation

- [Inscribe API Complete Documentation](./auto-generated/docs/inscribe.md)
- [Swagger UI Online Documentation](https://open-api.unisat.io/#/)

### Fees and Rules

- [Bitcoin Inscription Fee Rules](./btc-inscribe-fee-rules.md)
- [Fractal Inscription Fee Rules](./fractal-openapi-inscribe-fee-rules.md)
- [Inscription FAQ](./inscribe-faq.md)

### API Base URLs

| Network          | Base URL                                     |
| ---------------- | -------------------------------------------- |
| Bitcoin Mainnet  | `https://open-api.unisat.io`                 |
| Bitcoin Testnet  | `https://open-api-testnet.unisat.io`         |
| Bitcoin Testnet4 | `https://open-api-testnet4.unisat.io`        |
| Bitcoin Signet   | `https://open-api-signet.unisat.io`          |
| Fractal Mainnet  | `https://open-api-fractal.unisat.io`         |
| Fractal Testnet  | `https://open-api-fractal-testnet.unisat.io` |

### Contact Information

- **Email**: contact@unisat.io
- **Website**: https://unisat.io

---

## 💡 Best Practices

### 1. Error Handling

```javascript
async function createOrder(params) {
  try {
    const response = await fetch(
      "https://open-api.unisat.io/v2/inscribe/order/create",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      }
    );

    const data = await response.json();

    if (data.code === 0) {
      return data.data;
    } else {
      throw new Error(data.msg);
    }
  } catch (error) {
    console.error("Failed to create order:", error);
    throw error;
  }
}
```

### 2. Order Status Polling

```javascript
async function pollOrderStatus(orderId, maxAttempts = 60) {
  for (let i = 0; i < maxAttempts; i++) {
    const order = await getOrder(orderId);

    if (order.status === "minted") {
      console.log("Inscription complete!");
      return order;
    } else if (order.status === "closed" || order.status === "refunded") {
      throw new Error(`Order error: ${order.status}`);
    }

    // Wait 10 seconds before next query
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }

  throw new Error("Order timeout");
}
```

### 3. Fee Estimation

```javascript
function estimateTotalCost(fileCount, fileSize, feeRate) {
  // 1. UTXO cost
  const minUtxoTotal = 546 * fileCount;

  // 2. Network fees (simplified estimate)
  const avgTxSize = 200 + fileSize;
  const networkSats = avgTxSize * feeRate;

  // 3. Service fee
  let serviceFee = 0;
  if (fileCount > 20) {
    serviceFee = Math.min(3000 + (fileCount - 20) * 150, 4999);
  }

  // 4. Total cost
  const total = minUtxoTotal + networkSats + serviceFee;

  return {
    minUtxoTotal,
    networkSats,
    serviceFee,
    total,
  };
}
```

---

## 📝 Changelog

- **2024-11**: Initial release
  - Added basic inscription process description
  - Split BRC-20 protocol into separate documents (4-byte / 5-byte / 6-byte)
  - Added Runes protocol description
  - Added FAQ and best practices

---

For any questions or suggestions, please contact the UniSat team!
