# Sign Message

### signMessage

```
unisat.signMessage(msg[, type])
```

Sign a message with the current account's private key.

**Parameters**

- `msg` - `string`: a string to sign
- `type` - `string`: (Optional) "ecdsa" | "bip322-simple". default is "ecdsa"

**Returns**

- `Promise` - `string`: the signature (Base64 encoded).

---

## Signature Types

### ECDSA (Default)

The default signature type uses **RFC6979 Deterministic ECDSA** with Bitcoin's standard message signing format.

**How it works:**

1. **Message Hashing**: The message is prefixed with `"Bitcoin Signed Message:\n"` and double SHA256 hashed:
   ```
   hash = SHA256(SHA256(varint(prefix.length) + prefix + varint(msg.length) + msg))
   ```

2. **Deterministic Signing (RFC6979)**: Instead of using a random nonce `k`, the signature uses HMAC-DRBG to deterministically generate `k` from the private key and message hash. This ensures:
   - Same private key + same message = same signature (deterministic)
   - No risk of private key leakage due to weak random number generation

3. **Output Format**: Bitcoin compact signature format (65 bytes, Base64 encoded)
   - 1 byte header: `27 + recovery_id + 4` (for compressed public key)
   - 32 bytes `r` value
   - 32 bytes `s` value (low-S, BIP-62/BIP-146 compliant)

**Supported Address Types**: P2PKH, P2SH-P2WPKH, P2WPKH, P2TR

### BIP-322 Simple

BIP-322 is a generic message signing standard that works with all Bitcoin address types, including Taproot (P2TR).

**How it works:**

1. Creates a virtual "to_sign" transaction that spends from a "to_spend" transaction
2. The witness/scriptSig of the "to_sign" transaction serves as the signature
3. Supports all address types natively, including P2TR with Schnorr signatures

**Output Format**: Base64 encoded witness stack

**Recommended for**: Taproot addresses (P2TR) or when cross-wallet compatibility is required.

---

**Example**

```javascript
// sign by ecdsa
try {
    let res = await window.unisat.signMessage("abcdefghijk123456789");
    console.log(res)
} catch (e) {
    console.log(e);
}

> G+LrYa7T5dUMDgQduAErw+i6ebK4GqTXYVWIDM+snYk7Yc6LdPitmaqM6j+iJOeID1CsMXOJFpVopvPiHBdulkE=

// verify by ecdsa
import { verifyMessage } from "@unisat/wallet-utils";
const pubkey = "026887958bcc4cb6f8c04ea49260f0d10e312c41baf485252953b14724db552aac";
const message = "abcdefghijk123456789";
const signature = "G+LrYa7T5dUMDgQduAErw+i6ebK4GqTXYVWIDM+snYk7Yc6LdPitmaqM6j+iJOeID1CsMXOJFpVopvPiHBdulkE=";
const result = verifyMessage(pubkey,message,signature);
console.log(result);

> true

// sign by bip322-simple
try {
    let res = await window.unisat.signMessage("abcdefghijk123456789","bip322-simple");
    console.log(res)
} catch (e) {
    console.log(e);
}

> AkcwRAIgeHUcjr0jODaR7GMM8cenWnIj0MYdGmmrpGyMoryNSkgCICzVXWrLIKKp5cFtaCTErY7FGNXTFe6kuEofl4G+Vi5wASECaIeVi8xMtvjATqSSYPDRDjEsQbr0hSUpU7FHJNtVKqw=

```

---

### verifyMessageOfBIP322Simple

```
unisat.verifyMessageOfBIP322Simple(address, message, signature[, network])
```

Verify a BIP-322 simple signature.

**Parameters**

- `address` - `string`: the Bitcoin address that signed the message
- `message` - `string`: the original message
- `signature` - `string`: the Base64-encoded BIP-322 signature to verify
- `network` - `number`: (optional) network type

**Returns**

- `Promise` - `boolean`: `true` if the signature is valid

**Example**

```javascript
try {
  let valid = await window.unisat.verifyMessageOfBIP322Simple(
    "bc1p....",
    "hello world",
    "AkcwRAIg...."
  );
  console.log(valid); // true
} catch (e) {
  console.log(e);
}
```

---

### multiSignMessage

```
unisat.multiSignMessage(messages)
```

Sign multiple messages at once with the current account's private key.

**Parameters**

- `messages` - `object[]`:
  - `text` - `string`: the message to sign
  - `type` - `string`: `"ecdsa"` | `"bip322-simple"`. Default is `"ecdsa"`

**Returns**

- `Promise` - `string[]`: array of Base64-encoded signatures

**Example**

```javascript
try {
  let res = await window.unisat.multiSignMessage([
    { text: "hello", type: "ecdsa" },
    { text: "world", type: "bip322-simple" },
  ]);
  console.log(res);
} catch (e) {
  console.log(e);
}
```
