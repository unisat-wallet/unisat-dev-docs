# BRC-20 (6-byte) Protocol Guide

## 📖 Overview

BRC-20 (6-byte) is a special BRC-20 token protocol with a ticker consisting of 6 characters. Unlike 4-byte and 5-byte, 6-byte tokens support setting activation height and minting permission control, and deployment requires completion through a PSBT signing process.

**Features:**

- ✅ Token ticker: 6 characters
- ⏰ Timed activation: Set activation block height
- 🔐 Permission control: Support `self_mint` to control minting permissions
- 🔧 PSBT process: Deploy requires PSBT signing

---

## 📑 Table of Contents

- [Deploy (Deploy Token)](#deploy-deploy-token)
- [Mint - Public Mode (self_mint = false)](#mint---public-mode-self_mint--false)
- [Mint - Authorized Mode (self_mint = true)](#mint---authorized-mode-self_mint--true)
- [Transfer (Transfer Inscription)](#transfer-transfer-inscription)
- [Complete Examples](#complete-examples)

---

## 🚀 Deploy (Deploy Token)

### Endpoints

- Create order: `POST /v2/inscribe/order/create`
- Request Commit transaction: `POST /v2/inscribe/order/request-commit`
- Submit Commit signature: `POST /v2/inscribe/order/sign-commit`

### Description

Create a new 6-byte BRC-20 token. Unlike 4-byte and 5-byte, 6-byte tokens support setting activation height and minting permission control, and the deployment process requires completion through PSBT signing.

---

## Deployment Process

### Step 1: Create Deployment Order

#### Request Parameters

| Parameter         | Type    | Required | Description                                   |
| ----------------- | ------- | -------- | --------------------------------------------- |
| receiveAddress    | string  | Yes      | Bitcoin address to receive the inscription    |
| feeRate           | number  | Yes      | Transaction fee rate (sat/vB)                 |
| outputValue       | integer | Yes      | UTXO amount for inscription (recommended 546) |
| brc20_prog_deploy | object  | Yes      | Prog Deploy configuration object              |
| devAddress        | string  | No       | Developer address                             |
| devFee            | integer | No       | Developer fee                                 |

#### brc20_prog_deploy Object Structure

```typescript
interface Brc20ProgDeployData {
  tick: string; // Token ticker (6 characters)
  max: string; // Maximum supply
  lim: string; // Mint limit per transaction
  dec: string; // Decimal places (0-18)
  self_mint?: boolean; // Whether only deployer can mint
}

interface Brc20ProgDeploy {
  deploys: Brc20ProgDeployData[]; // Deployment config (currently supports only one token)
  activeHeight: number; // Activation block height
}
```

**Note:** The `deploys` array currently **supports only one element**, meaning each deployment can only create one token.

#### Example Request

```bash
curl -X POST "https://open-api.unisat.io/v2/inscribe/order/create" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "receiveAddress": "bc1q...",
    "feeRate": 1,
    "outputValue": 546,
    "brc20_prog_deploy": {
      "activeHeight": 920000,
      "deploys": [
        {
          "tick": "unisat",
          "max": "21000000",
          "lim": "1000",
          "dec": "18",
          "self_mint": false
        }
      ]
    }
  }'
```

#### Response

```json
{
  "code": 0,
  "msg": "OK",
  "data": {
    "orderId": "202511-PROG-ABC123",
    "payAddress": "bc1q...",
    "amount": 15000,
    "status": "pending"
  }
}
```

---

### Step 2: Request Commit Transaction

**Note:** Prog Deploy cannot be paid directly, must go through PSBT signing process.

```bash
curl -X POST "https://open-api.unisat.io/v2/inscribe/order/request-commit" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "202511-PROG-ABC123",
    "payerAddress": "bc1q...",
    "payerPubkey": "02a1b2c3d4..."
  }'
```

#### Request Parameters

| Parameter    | Type   | Required | Description                          |
| ------------ | ------ | -------- | ------------------------------------ |
| orderId      | string | Yes      | Order ID                             |
| payerAddress | string | Yes      | Payer address (usually the deployer) |
| payerPubkey  | string | Yes      | Payer public key (compressed format) |

#### Response

```json
{
  "code": 0,
  "msg": "OK",
  "data": {
    "psbtHex": "70736274ff01007d02...",
    "inputsToSign": [
      {
        "address": "bc1q...",
        "signingIndexes": [0]
      }
    ]
  }
}
```

---

### Step 3: Sign and Submit Commit Transaction

#### Sign Using Wallet

```javascript
const signedPsbt = await window.unisat.signPsbt(psbtHex, {
  autoFinalized: false, // Must be set to false
});
```

#### Submit Signature

```bash
curl -X POST "https://open-api.unisat.io/v2/inscribe/order/sign-commit" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "202511-PROG-ABC123",
    "psbt": "70736274ff01007d02...signed..."
  }'
```

#### Response

```json
{
  "code": 0,
  "msg": "OK",
  "data": "a1b2c3d4e5f6...i0" // Inscription ID
}
```

Order status changes to `inscribing`, waiting for confirmation to become `minted`.

---

## Complete Deployment Example

```javascript
async function progDeploy(deploys, activeHeight) {
  try {
    // Get wallet information
    const accounts = await window.unisat.getAccounts();
    const address = accounts[0];
    const pubkey = await window.unisat.getPublicKey();

    // 1. Create order
    console.log("Step 1: Creating prog deploy order...");
    const createResponse = await fetch(
      "https://open-api.unisat.io/v2/inscribe/order/create",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiveAddress: address,
          feeRate: 1,
          outputValue: 546,
          brc20_prog_deploy: {
            deploys: deploys,
            activeHeight: activeHeight,
          },
        }),
      }
    );
    const { data: orderData } = await createResponse.json();
    console.log("Order created:", orderData.orderId);

    // 2. Request commit transaction
    console.log("Step 2: Requesting commit transaction...");
    const commitResponse = await fetch(
      "https://open-api.unisat.io/v2/inscribe/order/request-commit",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderData.orderId,
          payerAddress: address,
          payerPubkey: pubkey,
        }),
      }
    );
    const { data: commitData } = await commitResponse.json();

    // 3. Sign
    console.log("Step 3: Signing transaction...");
    const signedPsbt = await window.unisat.signPsbt(commitData.psbtHex, {
      autoFinalized: false,
    });

    // 4. Submit signature
    console.log("Step 4: Submitting signature...");
    const signResponse = await fetch(
      "https://open-api.unisat.io/v2/inscribe/order/sign-commit",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderData.orderId,
          psbt: signedPsbt,
        }),
      }
    );
    const { data: inscriptionId } = await signResponse.json();

    console.log("✅ Deploy successful!");
    console.log("Inscription ID:", inscriptionId);

    return {
      orderId: orderData.orderId,
      inscriptionId,
    };
  } catch (error) {
    console.error("❌ Deploy failed:", error);
    throw error;
  }
}

// Usage example
await progDeploy(
  [
    {
      tick: "unisat", // 6 characters
      max: "21000000",
      lim: "1000",
      dec: "18",
      self_mint: false,
    },
  ],
  920000 // Activation height
);
```

### Notes

- Token ticker **must be 6 characters** (e.g., `unisat`, `abcdef`)
- Deployment requires PSBT signing process
- Can set activation height (`activeHeight`)
- Can control minting permissions through `self_mint`

---

## ⚒️ Mint - Public Mode (self_mint = false)

### Endpoint

`POST /v2/inscribe/order/create`

### Description

When the token's `self_mint` is set to `false`, anyone can mint. The minting process is the same as standard 4-byte tokens.

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
| ticker    | string | Yes      | BRC-20 token ticker            |
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
      "ticker": "unisat",
      "amount": "1000"
    },
    "count": 10
  }'
```

### Payment Process

Standard payment process:

1. Create order
2. Pay `amount` to `payAddress`
3. Wait for order to become `minted`

### Notes

- Can only mint after `activeHeight`
- Anyone can mint
- Subject to `lim` and `max` limits

---

## 🔐 Mint - Authorized Mode (self_mint = true)

### Endpoints

1. Create order: `POST /v2/inscribe/order/create`
2. Request Commit: `POST /v2/inscribe/order/request-commit`
3. Submit Commit signature: `POST /v2/inscribe/order/sign-commit`
4. Submit Reveal signature: `POST /v2/inscribe/order/sign-reveal`

### Description

When the token's `self_mint` is set to `true`, only the deployer can mint. Requires complete PSBT signing process.

---

## Authorized Minting Complete Process

### Step 1: Create Mint Order

#### Request Parameters

| Parameter      | Type    | Required | Description                                   |
| -------------- | ------- | -------- | --------------------------------------------- |
| receiveAddress | string  | Yes      | Bitcoin address to receive the inscription    |
| feeRate        | number  | Yes      | Transaction fee rate (sat/vB)                 |
| outputValue    | integer | Yes      | UTXO amount for inscription (recommended 546) |
| brc20_mint     | object  | Yes      | BRC-20 mint parameter object                  |
| count          | integer | Yes      | Repeat mint count (default 1)                 |
| devAddress     | string  | No       | Developer address                             |
| devFee         | integer | No       | Developer fee                                 |

#### brc20_mint Object Structure

| Parameter | Type   | Required | Description                    |
| --------- | ------ | -------- | ------------------------------ |
| ticker    | string | Yes      | BRC-20 token ticker            |
| amount    | string | Yes      | Amount to mint per transaction |

#### Example Request

```bash
curl -X POST "https://open-api.unisat.io/v2/inscribe/order/create" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "receiveAddress": "bc1p...",
    "feeRate": 10,
    "outputValue": 546,
    "brc20_mint": {
      "ticker": "unisat",
      "amount": "5000"
    },
    "count": 1
  }'
```

### Step 2: Request Commit Transaction

```bash
curl -X POST "https://open-api.unisat.io/v2/inscribe/order/request-commit" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "202511-MINT-XYZ789",
    "payerAddress": "bc1q...",
    "payerPubkey": "02a1b2c3d4..."
  }'
```

**Important:** `payerAddress` and `payerPubkey` **must be the deployer's address and public key**.

### Step 3: Sign and Submit Commit

```javascript
// Sign using deployer wallet
const signedCommitPsbt = await window.unisat.signPsbt(commitPsbtHex, {
  autoFinalized: false,
});

// Submit signature
await fetch("https://open-api.unisat.io/v2/inscribe/order/sign-commit", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    orderId: "202511-MINT-XYZ789",
    psbt: signedCommitPsbt,
  }),
});
```

### Step 4: Sign and Submit Reveal

```javascript
// Continue using deployer wallet to sign
const signedRevealPsbt = await window.unisat.signPsbt(revealPsbtHex, {
  autoFinalized: false,
});

// Submit signature
await fetch("https://open-api.unisat.io/v2/inscribe/order/sign-reveal", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    orderId: "202511-MINT-XYZ789",
    psbt: signedRevealPsbt,
  }),
});
```

---

## Authorized Minting Complete Example

```javascript
async function mintWithAuthorization(ticker, amount) {
  try {
    // Get deployer wallet information
    const accounts = await window.unisat.getAccounts();
    const deployerAddress = accounts[0];
    const deployerPubkey = await window.unisat.getPublicKey();

    // 1. Create order
    console.log("Step 1: Creating mint order...");
    const createResponse = await fetch(
      "https://open-api.unisat.io/v2/inscribe/order/create",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiveAddress: deployerAddress,
          feeRate: 10,
          outputValue: 546,
          brc20_mint: {
            ticker: ticker,
            amount: amount,
          },
          count: 1,
        }),
      }
    );
    const { data: orderData } = await createResponse.json();
    const orderId = orderData.orderId;
    console.log("Order created:", orderId);

    // 2. Request Commit transaction
    console.log("Step 2: Requesting commit...");
    const commitRequestResponse = await fetch(
      "https://open-api.unisat.io/v2/inscribe/order/request-commit",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderId,
          payerAddress: deployerAddress,
          payerPubkey: deployerPubkey,
        }),
      }
    );
    const { data: commitData } = await commitRequestResponse.json();

    // 3. Sign Commit
    console.log("Step 3: Signing commit...");
    const signedCommitPsbt = await window.unisat.signPsbt(commitData.psbtHex, {
      autoFinalized: false,
    });

    // 4. Submit Commit signature
    console.log("Step 4: Submitting commit...");
    const commitSignResponse = await fetch(
      "https://open-api.unisat.io/v2/inscribe/order/sign-commit",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderId,
          psbt: signedCommitPsbt,
        }),
      }
    );
    const { data: revealData } = await commitSignResponse.json();

    // 5. Sign Reveal
    console.log("Step 5: Signing reveal...");
    const signedRevealPsbt = await window.unisat.signPsbt(revealData.psbtHex, {
      autoFinalized: false,
    });

    // 6. Submit Reveal signature
    console.log("Step 6: Submitting reveal...");
    const revealSignResponse = await fetch(
      "https://open-api.unisat.io/v2/inscribe/order/sign-reveal",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderId,
          psbt: signedRevealPsbt,
        }),
      }
    );
    const { data: inscriptionId } = await revealSignResponse.json();

    console.log("✅ Mint successful!");
    console.log("Inscription ID:", inscriptionId);

    return { orderId, inscriptionId };
  } catch (error) {
    console.error("❌ Mint failed:", error);
    throw error;
  }
}

// Usage example
await mintWithAuthorization("unisat", "5000");
```

---

## 💸 Transfer (Transfer Inscription)

### Endpoint

`POST /v2/inscribe/order/create`

### Description

Create a BRC-20 6-byte token transfer inscription. **The transfer process is exactly the same as standard BRC-20**, no authorization signature required.

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
      "ticker": "unisat",
      "amount": "100"
    }
  }'
```

### Payment Process

Standard payment process (same as 4-byte):

1. Create order
2. Pay `amount` to `payAddress`
3. Wait for order to become `minted`
4. Use wallet to send inscription to target address

---

## 📊 Parameter Details

### activeHeight (Activation Height)

- Token activates at specified block height
- Cannot mint before activation
- Used to implement fair launch

**Example:**

```javascript
{
  "activeHeight": 920000  // Activates at block 920000
}
```

### self_mint (Minting Permission)

| Value   | Description        | Minting Method                        |
| ------- | ------------------ | ------------------------------------- |
| `false` | Public minting     | Anyone can mint (standard payment)    |
| `true`  | Authorized minting | Only deployer can mint (PSBT signing) |

### dec (Decimal Places)

- Range: 0-18
- Determines token precision
- Example: `dec: "18"` means 18 decimal places

### deploys Array

**Current limitation:** The `deploys` array currently **supports only one element**.

```javascript
{
  "deploys": [
    { "tick": "unisat", "max": "21000000", "lim": "1000", "dec": "18" }
    // ❌ Multiple elements not supported
  ]
}
```

**Note:** Each deployment can only create one token. To deploy multiple tokens, create multiple orders.

---

## 📊 Process Comparison Table

| Operation    | self_mint = false      | self_mint = true       |
| ------------ | ---------------------- | ---------------------- |
| **Deploy**   | PSBT signing (3 steps) | PSBT signing (3 steps) |
| **Mint**     | Standard payment       | PSBT signing (4 steps) |
| **Transfer** | Standard payment       | Standard payment       |

---

## ⚠️ Notes

### About Activation Height

- Must be greater than current block height
- Nobody can mint before activation
- Can mint immediately after activation (based on self_mint setting)

### About self_mint

- Set during deployment, cannot be changed
- When `true`, only deployer can mint
- When `false`, anyone can mint
- Does not affect Transfer operation

### About Public Key

- Must use compressed public key (33 bytes)
- Format: Starting with `02` or `03`
- How to get: `await window.unisat.getPublicKey()`

---

## ⚠️ FAQ

### Q: What's the difference between 6-byte and 4-byte/5-byte?

A:
| Feature | 4-byte | 5-byte | 6-byte |
|---------|--------|--------|--------|
| Token ticker | 4 characters | 5 characters | 6 characters |
| Deploy method | Standard payment | Standard payment | PSBT signing |
| Activation height | ❌ | ❌ | ✅ |
| Minting control | Public | Deployer only | Configurable (self_mint) |

### Q: Why does 6-byte Deploy require PSBT signing?

A: 6-byte tokens provide activation height and minting permission control features, requiring PSBT signing to ensure security and authorization.

### Q: Can activation height be modified?

A: No. Activation height is set during deployment and cannot be changed.

### Q: Can self_mint be modified later?

A: No. Minting permissions are determined during deployment and are permanent.

---

## 🔗 Related Resources

- [BRC-20 4-byte Guide](./brc20-4byte-guide-en.md) - Standard 4-character tokens
- [BRC-20 5-byte Guide](./brc20-5byte-guide-en.md) - 5-character authorized tokens
- [Inscribe Main Guide](./inscribe-guide-en.md) - Return to main documentation
- [Fee Rules](./btc-inscribe-fee-rules.md) - Inscription fee details

---

Return to [Inscribe Service Guide](./inscribe-guide-en.md)
