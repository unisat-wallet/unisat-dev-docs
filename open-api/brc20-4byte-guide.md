# BRC-20 (4-byte) Standard Protocol Guide

## 📖 Overview

BRC-20 (4-byte) is the most standard and commonly used BRC-20 token protocol, with a ticker consisting of 4 characters. It supports three operations: Deploy, Mint, and Transfer.

**Features:**

- ✅ Token ticker: 4 characters
- ✅ Public minting: Anyone can mint
- ✅ Simple process: Direct payment only

---

## 🚀 Deploy (Deploy Token)

### Endpoint

`POST /v2/inscribe/order/create`

### Description

Create a new BRC-20 token. Each token can only be deployed once, first come first served.

### Request Parameters

| Parameter      | Type    | Required | Description                                   |
| -------------- | ------- | -------- | --------------------------------------------- |
| receiveAddress | string  | Yes      | Bitcoin address to receive the inscription    |
| feeRate        | number  | Yes      | Transaction fee rate (sat/vB)                 |
| outputValue    | integer | Yes      | UTXO amount for inscription (recommended 546) |
| brc20_deploy   | object  | Yes      | BRC-20 deployment parameter object            |
| devAddress     | string  | No       | Developer address                             |
| devFee         | integer | No       | Developer fee                                 |

#### brc20_deploy Object Structure

| Parameter | Type    | Required | Description                                            |
| --------- | ------- | -------- | ------------------------------------------------------ |
| ticker    | string  | Yes      | BRC-20 token ticker (4 characters)                     |
| max       | string  | Yes      | Maximum supply                                         |
| limit     | string  | Yes      | Mint limit per transaction                             |
| selfMint  | boolean | No       | Whether only deployer can mint (default false, public) |

### Example Request

```bash
curl -X POST "https://open-api.unisat.io/v2/inscribe/order/create" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "receiveAddress": "bc1p...",
    "feeRate": 10,
    "outputValue": 546,
    "brc20_deploy": {
      "ticker": "ordi",
      "max": "21000000",
      "limit": "1000"
    }
  }'
```

### Generated Inscription Content

```json
{
  "p": "brc-20",
  "op": "deploy",
  "tick": "ordi",
  "max": "21000000",
  "lim": "1000"
}
```

### Payment Process

1. After creating the order, obtain `orderId`, `payAddress`, and `amount`
2. Pay exactly `amount` sats to `payAddress`
3. After payment confirmation, order automatically enters `inscribing` status
4. Wait for transaction confirmation, order becomes `minted`

### Notes

- Token ticker must be 4 characters (e.g., `ordi`, `sats`)
- Same ticker can only be deployed once, first come first served
- After successful deployment, anyone can mint the token

---

## ⚒️ Mint (Mint Token)

### Endpoint

`POST /v2/inscribe/order/create`

### Description

Mint a deployed BRC-20 token. Multiple identical mint inscriptions can be batch minted.

### Request Parameters

| Parameter      | Type    | Required | Description                                   |
| -------------- | ------- | -------- | --------------------------------------------- |
| receiveAddress | string  | Yes      | Bitcoin address to receive the inscription    |
| feeRate        | number  | Yes      | Transaction fee rate (sat/vB)                 |
| outputValue    | integer | Yes      | UTXO amount for inscription (recommended 546) |
| brc20_mint     | object  | Yes      | BRC-20 mint parameter object                  |
| count          | integer | Yes      | Repeat mint count (default 1, max 1000)       |
| devAddress     | string  | No       | Developer address                             |
| devFee         | integer | No       | Developer fee                                 |

#### brc20_mint Object Structure

| Parameter | Type   | Required | Description                    |
| --------- | ------ | -------- | ------------------------------ |
| ticker    | string | Yes      | BRC-20 token ticker to mint    |
| amount    | string | Yes      | Amount to mint per transaction |

### Example Request

```bash
curl -X POST "https://open-api.unisat.io/v2/inscribe/order/create" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "receiveAddress": "bc1p...",
    "feeRate": 10,
    "outputValue": 546,
    "brc20_mint": {
      "ticker": "ordi",
      "amount": "1000"
    },
    "count": 10
  }'
```

### Generated Inscription Content

```json
{
  "p": "brc-20",
  "op": "mint",
  "tick": "ordi",
  "amt": "1000"
}
```

### Payment Process

Same as Deploy:

1. Create order
2. Pay `amount` to `payAddress`
3. Wait for order status to become `minted`

### Batch Minting

Use the `count` parameter to mint multiple identical mint inscriptions at once:

```javascript
{
  "brc20_mint": {
    "ticker": "ordi",
    "amount": "1000"
  },
  "count": 100  // Mint 100 mint inscriptions
}
```

### Notes

- Mint amount cannot exceed the `limit` set during deployment
- Total minted amount cannot exceed `max` maximum supply
- `count` parameter maximum is 1000
- Anyone can mint, first come first served

---

## 💸 Transfer (Transfer Inscription)

### Endpoint

`POST /v2/inscribe/order/create`

### Description

Create a BRC-20 transfer inscription. This is the first step of BRC-20 transfer (inscribe transfer inscription), the second step is to send the inscription to the target address.

### Request Parameters

| Parameter      | Type    | Required | Description                                   |
| -------------- | ------- | -------- | --------------------------------------------- |
| receiveAddress | string  | Yes      | Bitcoin address to receive the inscription    |
| feeRate        | number  | Yes      | Transaction fee rate (sat/vB)                 |
| outputValue    | integer | Yes      | UTXO amount for inscription (recommended 546) |
| brc20_transfer | object  | Yes      | BRC-20 transfer parameter object              |
| devAddress     | string  | No       | Developer address                             |
| devFee         | integer | No       | Developer fee                                 |

#### brc20_transfer Object Structure

| Parameter | Type   | Required | Description           |
| --------- | ------ | -------- | --------------------- |
| ticker    | string | Yes      | BRC-20 token ticker   |
| amount    | string | Yes      | Transfer amount (amt) |

### Example Request

```bash
curl -X POST "https://open-api.unisat.io/v2/inscribe/order/create" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "receiveAddress": "bc1p...",
    "feeRate": 10,
    "outputValue": 546,
    "brc20_transfer": {
      "ticker": "ordi",
      "amount": "500"
    }
  }'
```

### Generated Inscription Content

```json
{
  "p": "brc-20",
  "op": "transfer",
  "tick": "ordi",
  "amt": "500"
}
```

### Complete Transfer Process

#### Step 1: Inscribe Transfer Inscription

Use the above endpoint to create a transfer inscription.

#### Step 2: Wait for Inscription Completion

Query order status and wait for it to become `minted`.

#### Step 3: Send Inscription to Complete Transfer

Send the inscription UTXO to the target address:

```javascript
// Send inscription using UniSat wallet
await window.unisat.sendInscription(
  targetAddress, // Target address
  inscriptionId, // Transfer inscription ID
  { feeRate: 10 }
);
```

### Notes

- Transfer amount cannot exceed available balance
- Must first inscribe transfer inscription, then send inscription
- When sending inscription, it transfers from sender to receiver
- Transfer inscription can only be used once

---

## 📋 Complete Examples

### JavaScript/TypeScript Example

```javascript
// 1. Deploy token
async function deployBRC20() {
  const response = await fetch(
    "https://open-api.unisat.io/v2/inscribe/order/create",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        receiveAddress: "bc1p...",
        feeRate: 10,
        outputValue: 546,
        brc20_deploy: {
          ticker: "test",
          max: "21000000",
          limit: "1000",
        },
      }),
    }
  );

  const { data } = await response.json();
  console.log("Order ID:", data.orderId);
  console.log("Pay to:", data.payAddress);
  console.log("Amount:", data.amount, "sats");

  return data;
}

// 2. Mint token
async function mintBRC20() {
  const response = await fetch(
    "https://open-api.unisat.io/v2/inscribe/order/create",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        receiveAddress: "bc1p...",
        feeRate: 10,
        outputValue: 546,
        brc20_mint: {
          ticker: "test",
          amount: "1000",
        },
        count: 10,
      }),
    }
  );

  const { data } = await response.json();
  return data;
}

// 3. Create transfer inscription
async function createTransferBRC20() {
  const response = await fetch(
    "https://open-api.unisat.io/v2/inscribe/order/create",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        receiveAddress: "bc1p...",
        feeRate: 10,
        outputValue: 546,
        brc20_transfer: {
          ticker: "test",
          amount: "500",
        },
      }),
    }
  );

  const { data } = await response.json();
  return data;
}

// 4. Check order status
async function checkOrderStatus(orderId) {
  const response = await fetch(
    `https://open-api.unisat.io/v2/inscribe/order/${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  const { data } = await response.json();
  console.log("Order Status:", data.status);
  return data;
}

// 5. Complete flow
async function fullBRC20Flow() {
  // Deploy
  console.log("=== Deploying BRC-20 ===");
  const deployOrder = await deployBRC20();
  // Manually pay to deployOrder.payAddress

  // Mint
  console.log("=== Minting BRC-20 ===");
  const mintOrder = await mintBRC20();
  // Manually pay to mintOrder.payAddress

  // Create transfer inscription
  console.log("=== Creating Transfer Inscription ===");
  const transferOrder = await createTransferBRC20();
  // Manually pay to transferOrder.payAddress

  // After inscription is complete, use wallet to send transfer inscription
}
```

---

## ⚠️ FAQ

### Q: What are the restrictions for 4-byte tickers?

A: Must be 4 characters, can include letters and numbers, case-insensitive. Examples:

- ✅ `ordi`, `sats`, `pepe`, `meme`
- ❌ `abc` (less than 4 characters)
- ❌ `abcde` (more than 4 characters)

### Q: How to check if a ticker is already deployed?

A: Use UniSat's BRC-20 Indexer API to query:

```bash
GET /v1/indexer/brc20/{ticker}/info
```

### Q: What's the difference between Deploy and Mint?

A:

- **Deploy**: Create token, set rules, can only be executed once
- **Mint**: Mint tokens, can be executed multiple times until maximum supply is reached

### Q: Can transfer inscriptions be reused?

A: No. Each transfer inscription can only be used once. It's consumed after sending.

### Q: Will I get a refund if minting fails?

A: If inscription succeeds but token is already fully minted, the inscription is still valid but token balance won't increase. It's recommended to check remaining mintable amount before minting.

---

## 🔗 Related Resources

- [BRC-20 5-byte Guide](./brc20-5byte-guide-en.md) - 5-character token protocol
- [BRC-20 6-byte Guide](./brc20-6byte-guide-en.md) - 6-character token protocol
- [Inscribe Main Guide](./inscribe-guide-en.md) - Return to main documentation
- [Fee Rules](./btc-inscribe-fee-rules.md) - Inscription fee details

---

Return to [Inscribe Service Guide](./inscribe-guide-en.md)
