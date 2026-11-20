# Derive Context Hash

> [!WARNING]
> **Experimental API**: `deriveContextHash` is experimental and may change in future versions.
> Use feature detection and provide a fallback path in production integrations.

### deriveContextHash

```
unisat.deriveContextHash(appName, context)
```

Derive a deterministic 32-byte value from the wallet's key material, the wallet's current Bitcoin network, the currently-connected public key, an application name, and an application-supplied context string. The derivation uses HKDF-SHA-256 (RFC 5869).

**Requires user approval** — the wallet shows a confirmation dialog displaying the application name, the connected account address, the current Bitcoin network, the requesting origin, and the context string before deriving the value.

**Supported keyring types**: HD wallets (mnemonic), HD wallets (xpriv), and imported private keys.

**Parameters**

- `appName` — `string`: Application identifier (1–64 bytes, lowercase letters, digits, and hyphens only: `[a-z0-9\-]`). Provides mandatory app-level domain separation. Examples: `"babylon-vault"`, `"ordinals-market"`.
- `context` — `string`: Hex-encoded byte string (even-length, lowercase, no `0x` prefix, max 2048 hex characters / 1024 bytes). Application-specific data that determines the output within the app's namespace. Must not be empty.

**Returns**

- `Promise<string>`: Hex-encoded 32-byte derived value (64 lowercase hex characters).

**Derivation Scheme (v2.0)**

```
ikm    = BIP-32 private key at m/73681862' (32 bytes)
salt   = "derive-context-hash"
info   = SHA-256(UTF8(appName))                  (32B)
      || SHA-256(UTF8(canonicalNetworkName))     (32B)
      || connectedPubkey                          (33B, compressed SEC1)
      || decode_hex(context)                      (variable)
output = HKDF-SHA-256(ikm, salt, info, 32)
```

Where:

- `ikm` is:
  - For mnemonic/xpriv wallets: the 32-byte private key scalar at BIP-32 path `m/73681862'` (hardened), derived from the wallet's HD root.
  - For imported key wallets: the raw 32-byte private key directly (no BIP-32 derivation, since imported keys lack a BIP-32 hierarchy).
- `canonicalNetworkName` is one of `"bitcoin-mainnet" | "bitcoin-testnet" | "bitcoin-signet"`. Bitcoin Testnet3 and Testnet4 both map to `"bitcoin-testnet"` because BIP-32 derivation is identical across them. Fractal chains are NOT supported — see Errors below.
- `connectedPubkey` is the 33-byte SEC1 compressed encoding (parity prefix `0x02` or `0x03`) of the wallet's currently-connected account public key.
- The wallet injects `canonicalNetworkName` and `connectedPubkey` automatically — dApps **do not** need to encode either in `context`.

**Account/network resolution.** The wallet uses the currently selected account and network at the time the controller processes the request, matching how `signMessage` resolves the signer. If the user switches account or network between the dApp call and approving, the derivation reflects the post-switch state. The approval dialog displays the account address and network so the user can confirm before signing.

---

**Example**

```javascript
try {
  const appName = "test-app";
  const context = "deadbeef"; // hex-encoded context
  const hash = await window.unisat.deriveContextHash(appName, context);
  console.log(hash);
  // For the canonical "abandon × 11 about" BIP-39 mnemonic on Bitcoin mainnet
  // with the default BIP-44 receive account, this returns exactly:
  // => "f82ced3be0e29591a7863ece03d65f79fb494fe0de7203549855f462455df008"
} catch (e) {
  if (e.code === 4901) {
    // UnsupportedNetwork: prompt user to switch wallet to a supported Bitcoin network.
    console.log("switch wallet to a supported Bitcoin network");
  } else {
    console.log(e);
  }
}
```

---

**Errors**

- `code 4001` — User rejected the approval dialog.
- `code 4901` — **UnsupportedNetwork**. The wallet's current Bitcoin network is not in the supported set (mainnet / testnet / signet). Currently raised for Fractal chains. dApps should surface a message asking the user to switch the wallet to a supported Bitcoin network.
- Invalid input — `appName` is empty, exceeds 64 bytes, or contains characters outside `[a-z0-9\-]`; `context` is empty, odd-length, contains uppercase hex, has a `0x` prefix, or exceeds 2048 hex characters.
- Method not supported by current keyring (Keystone, cold wallet, watch-only, etc.).

---

**Security**

- HKDF is a formally proven extract-then-expand KDF (Krawczyk, Crypto 2010; RFC 5869).
- The Extract step ensures even structured inputs (e.g., secp256k1 keys) produce a uniformly random pseudorandom key.
- The Expand step is a PRF — revealing many outputs for different `(appName, network, connectedPubkey, context)` tuples does not leak the seed or private key.
- The fixed salt `"derive-context-hash"` provides domain separation from BIP-32 and other HMAC uses.
- `SHA-256(appName)` prefix in `info` provides mandatory app-level domain separation; `SHA-256(canonicalNetworkName)` provides per-network rotation; `connectedPubkey` provides per-account rotation.
- All intermediate key material is zeroed after use within the wallet.

**Use Cases**

- **HTLC preimages**: Derive a deterministic secret `s` for atomic swap flows. Commit `SHA256(s)` on-chain, reveal `s` later.
- **Deterministic key generation**: Use the output as seed material for application-specific cryptographic schemes (e.g., Lamport, WOTS signatures).
