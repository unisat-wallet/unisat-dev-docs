# BRC-20 (5-byte) Protocol Guide

## 📖 Overview

BRC-20 (5-byte) is a special BRC-20 token protocol with a ticker consisting of 5 characters. Unlike 4-byte, minting 5-byte tokens requires the deployer's signature authorization, providing stronger control.

**Features:**

- ✅ Token ticker: 5 characters
- 🔐 Authorized minting: Requires deployer signature
- 🔧 PSBT signing process: Commit + Reveal

---

## 🚀 Deploy (Deploy Token)

### Endpoint

`POST /v2/inscribe/order/create`

### Description

Create a new 5-byte BRC-20 token. The deployment process is the same as 4-byte, but subsequent minting requires deployer authorization.

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

| Parameter | Type    | Required | Description                                                                |
| --------- | ------- | -------- | -------------------------------------------------------------------------- |
| ticker    | string  | Yes      | BRC-20 token ticker (**5 characters**)                                     |
| max       | string  | Yes      | Maximum supply                                                             |
| limit     | string  | Yes      | Mint limit per transaction                                                 |
| decimal   | string  | No       | Decimal places (default "18", range 0-18)                                  |
| selfMint  | boolean | No       | Whether only deployer can mint (5-byte tokens default true, deployer only) |

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
      "ticker": "pizza",
      "max": "21000000",
      "limit": "1000",
      "decimal": "18"
    }
  }'
```

### Generated Inscription Content

```json
{
  "p": "brc-20",
  "op": "deploy",
  "tick": "pizza",
  "max": "21000000",
  "lim": "1000",
  "dec": "18"
}
```

### Payment Process

Same as 4-byte, direct payment:

1. After creating order, obtain `payAddress` and `amount`
2. Pay `amount` sats to `payAddress`
3. Wait for order to become `minted` status

### Notes

- Token ticker **must be 5 characters** (e.g., `pizza`, `names`)
- After deployment, **only the deployer can mint** this token
- Must save deployer's private key for subsequent minting authorization
- **decimal**: Specifies the number of decimal places for the token (0-18). Default is "18". This determines the token's precision.

---

## ⚒️ Mint (Authorized Minting)

### Endpoints

5-byte Mint requires a multi-step PSBT signing process:

1. Create order: `POST /v2/inscribe/order/create`
2. Request Commit transaction: `POST /v2/inscribe/order/request-commit`
3. Submit Commit signature: `POST /v2/inscribe/order/sign-commit`
4. Submit Reveal signature: `POST /v2/inscribe/order/sign-reveal`

### Description

Minting 5-byte BRC-20 tokens requires deployer's signature authorization. This process involves two transactions:

- **Commit transaction**: Pay fees, create commitment
- **Reveal transaction**: Reveal inscription content

---

## Complete Minting Process

### Step 1: Create Mint Order

#### Request Parameters

| Parameter       | Type    | Required | Description                                            |
| --------------- | ------- | -------- | ------------------------------------------------------ |
| deployerAddress | string  | Yes      | **Deployer address** (must be the address from deploy) |
| deployerPubkey  | string  | Yes      | **Deployer public key** (compressed format)            |
| receiveAddress  | string  | Yes      | Bitcoin address to receive the inscription             |
| feeRate         | number  | Yes      | Transaction fee rate (sat/vB)                          |
| outputValue     | integer | Yes      | UTXO amount for inscription (recommended 546)          |
| brc20_mint      | object  | Yes      | BRC-20 mint parameter object                           |
| devAddress      | string  | No       | Developer address                                      |
| devFee          | integer | No       | Developer fee                                          |

#### brc20_mint Object Structure

| Parameter | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| ticker    | string | Yes      | BRC-20 token ticker (5 characters) |
| amount    | string | Yes      | Mint amount (amt)                  |

#### Example Request

```bash
curl -X POST "https://open-api.unisat.io/v2/inscribe/order/create" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "deployerAddress": "bc1p...",
    "deployerPubkey": "02a1b2c3d4e5f6...",
    "receiveAddress": "bc1p...",
    "feeRate": 10,
    "outputValue": 546,
    "brc20_mint": {
      "ticker": "pizza",
      "amount": "1000"
    }
  }'
```

#### Response

```json
{
  "code": 0,
  "msg": "OK",
  "data": {
    "orderId": "202511-BRC20-ABC123",
    "status": "pending",
    ...
  }
}
```

---

### Step 2: Request Commit Transaction

#### Request Parameters

| Parameter    | Type   | Required | Description                          |
| ------------ | ------ | -------- | ------------------------------------ |
| orderId      | string | Yes      | Order ID                             |
| payerAddress | string | Yes      | Payer address (for paying fees)      |
| payerPubkey  | string | Yes      | Payer public key (compressed format) |

#### Example Request

```bash
curl -X POST "https://open-api.unisat.io/v2/inscribe/order/request-commit" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "202511-BRC20-ABC123",
    "payerAddress": "bc1p...",
    "payerPubkey": "02a1b2c3d4e5f6..."
  }'
```

#### Response

```json
{
  "code": 0,
  "msg": "OK",
  "data": {
    "psbtHex": "70736274ff01007d02000000...",
    "inputsToSign": [
      {
        "address": "bc1p...",
        "signingIndexes": [0]
      }
    ]
  }
}
```

---

### Step 3: Sign Commit Transaction

#### Sign Using Wallet

**Important: Must use the deployer's wallet to sign**

```javascript
// Sign using UniSat wallet
const signedCommitPsbt = await window.unisat.signPsbt(psbtHex, {
  autoFinalized: false, // Must be set to false
});
```

#### Submit Signature

```bash
curl -X POST "https://open-api.unisat.io/v2/inscribe/order/sign-commit" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "202511-BRC20-ABC123",
    "psbt": "70736274ff01007d02000000...signed..."
  }'
```

#### Response

```json
{
  "code": 0,
  "msg": "OK",
  "data": {
    "psbtHex": "70736274ff01007d02000000...",  // Reveal PSBT
    "inputsToSign": [...]
  }
}
```

---

### Step 4: Sign Reveal Transaction

#### Sign Using Wallet

```javascript
// Continue using deployer wallet to sign Reveal transaction
const signedRevealPsbt = await window.unisat.signPsbt(revealPsbtHex, {
  autoFinalized: false,
});
```

#### Submit Signature

```bash
curl -X POST "https://open-api.unisat.io/v2/inscribe/order/sign-reveal" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "202511-BRC20-ABC123",
    "psbt": "70736274ff01007d02000000...signed..."
  }'
```

#### Response

```json
{
  "code": 0,
  "msg": "OK",
  "data": {
    "inscriptionId": "a1b2c3d4...i0"
  }
}
```

At this point, the order status changes to `inscribing`, waiting for block confirmation to become `minted`.

---

## Complete Frontend Integration Example

```javascript
// Complete 5-byte Mint process
async function mint5ByteBRC20(ticker, amount, deployerAddress, deployerPubkey) {
  try {
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
          deployerAddress,
          deployerPubkey,
          receiveAddress: deployerAddress,
          feeRate: 10,
          outputValue: 546,
          brc20_mint: {
            ticker: ticker,
            amount: amount,
          },
        }),
      }
    );
    const { data: orderData } = await createResponse.json();
    const orderId = orderData.orderId;
    console.log("Order created:", orderId);

    // 2. Request Commit transaction
    console.log("Step 2: Requesting commit transaction...");
    const commitRequestResponse = await fetch(
      "https://open-api.unisat.io/v2/inscribe/order/request-commit",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          payerAddress: deployerAddress,
          payerPubkey: deployerPubkey,
        }),
      }
    );
    const { data: commitData } = await commitRequestResponse.json();

    // 3. Sign Commit transaction
    console.log("Step 3: Signing commit transaction...");
    const signedCommitPsbt = await window.unisat.signPsbt(commitData.psbtHex, {
      autoFinalized: false,
    });

    // 4. Submit Commit signature
    console.log("Step 4: Submitting commit signature...");
    const commitSignResponse = await fetch(
      "https://open-api.unisat.io/v2/inscribe/order/sign-commit",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          psbt: signedCommitPsbt,
        }),
      }
    );
    const { data: revealData } = await commitSignResponse.json();

    // 5. Sign Reveal transaction
    console.log("Step 5: Signing reveal transaction...");
    const signedRevealPsbt = await window.unisat.signPsbt(revealData.psbtHex, {
      autoFinalized: false,
    });

    // 6. Submit Reveal signature
    console.log("Step 6: Submitting reveal signature...");
    const revealSignResponse = await fetch(
      "https://open-api.unisat.io/v2/inscribe/order/sign-reveal",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          psbt: signedRevealPsbt,
        }),
      }
    );
    const { data: inscriptionId } = await revealSignResponse.json();

    console.log("✅ Mint successful!");
    console.log("Inscription ID:", inscriptionId);
    console.log("Order is now inscribing, waiting for confirmation...");

    return { orderId, inscriptionId };
  } catch (error) {
    console.error("❌ Mint failed:", error);
    throw error;
  }
}

// Usage example
async function example() {
  // Get deployer information
  const deployerAddress = await window.unisat.getAccounts()[0];
  const deployerPubkey = await window.unisat.getPublicKey();

  // Mint 1000 pizza tokens
  await mint5ByteBRC20("pizza", "1000", deployerAddress, deployerPubkey);
}
```

---

## 💸 Transfer (Transfer Inscription)

### Endpoint

`POST /v2/inscribe/order/create`

### Description

Create a 5-byte BRC-20 transfer inscription. **The transfer process is exactly the same as 4-byte**, no authorization signature required.

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

| Parameter | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| ticker    | string | Yes      | BRC-20 token ticker (5 characters) |
| amount    | string | Yes      | Transfer amount (amt)              |

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
      "ticker": "pizza",
      "amount": "500"
    }
  }'
```

### Payment Process

Standard payment process:

1. Create order
2. Pay `amount` to `payAddress`
3. Wait for order to become `minted`
4. Use wallet to send inscription to target address

---

## 📊 Process Comparison Table

| Operation    | 4-byte                    | 5-byte                       |
| ------------ | ------------------------- | ---------------------------- |
| **Deploy**   | Standard payment          | Standard payment             |
| **Mint**     | Standard payment (anyone) | PSBT signing (deployer only) |
| **Transfer** | Standard payment          | Standard payment             |

---

## ⚠️ Notes

### About Deployer

- Deployer address and public key are determined during Deploy
- Only the deployer can mint 5-byte tokens
- **Must securely store deployer's private key**, losing it means unable to mint

### About Public Key Format

- Must use **compressed public key format** (33 bytes)
- Format: Hexadecimal string starting with `02` or `03`
- How to get: `await window.unisat.getPublicKey()`

### About Signing

- Both Commit and Reveal must be signed using **deployer's wallet**
- Must set `autoFinalized: false` when signing
- Cannot use wallet from other addresses

### About Fee Payment

- All fees are paid by the **deployer**
- Includes network fees, service fees, UTXO costs
- Automatically deducted from deployer's address during signing

---

## ⚠️ FAQ

### Q: Can minting rights be transferred to others?

A: **Yes!** Minting rights follow the holder of the deploy inscription:

- Whoever holds the deploy inscription has minting rights
- By transferring the deploy inscription, you can transfer minting rights to others
- The new holder uses their own address and public key as `deployerAddress` and `deployerPubkey` to mint

**Transfer process:**

1. Send the deploy inscription to the target address
2. After the target address holds the deploy inscription, they gain minting rights
3. Use the target address's private key to sign for minting operations

### Q: Can I batch mint?

A: Currently not supported. Each mint requires the complete 4-step process.

---

## 🔗 Related Resources

- [BRC-20 4-byte Guide](./brc20-4byte-guide-en.md) - Standard 4-character tokens
- [BRC-20 6-byte Guide](./brc20-6byte-guide-en.md) - 6-character tokens
- [Inscribe Main Guide](./inscribe-guide-en.md) - Return to main documentation
- [Fee Rules](./btc-inscribe-fee-rules.md) - Inscription fee details

---

Return to [Inscribe Service Guide](./inscribe-guide-en.md)
