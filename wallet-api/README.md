# UniSat Wallet dApp Integration Guide

The `window.unisat` object is injected by the UniSat Wallet extension into every web page. dApps use this client-side provider to interact with the user's Bitcoin wallet. It is separate from the backend UniSat Open API and does not require an Open API key.

Experimental RGB interfaces are documented separately because they have different method names, amount types, capabilities, and error codes:

- [Native RGB API (`window.unisat.rgb`)](../specs/wallet-api/rgb.md)
- [WebRGB v1 Provider (`window.rgb`)](../specs/wallet-api/webrgb.md)

## Getting Started

1. [Detect the extension](../specs/wallet-api/browser-detection.md)
2. [Connect and request accounts](../specs/wallet-api/connect-extension.md)
3. [Access account info](../specs/wallet-api/access-accounts.md)

## Related Repositories

- [UniSat Wallet Extension](https://github.com/unisat-wallet/extension) — The official UniSat browser wallet extension.
- [UniSat Web3 Demo](https://github.com/unisat-wallet/unisat-web3-demo) — A simple example showing how to integrate with UniSat.
  - [Live Demo](https://demo.unisat.io)

## Reference

| Topic | Description |
| --- | --- |
| [Browser Detection](../specs/wallet-api/browser-detection.md) | Check if UniSat is installed |
| [Connect Extension](../specs/wallet-api/connect-extension.md) | Request wallet connection and accounts |
| [Access Accounts](../specs/wallet-api/access-accounts.md) | Get current account, address, public key |
| [Address Types](../specs/wallet-api/address-types.md) | Supported address formats |
| [Manage Assets](../specs/wallet-api/manage-assets.md) | Send BTC, inscriptions, Runes, BRC-20 |
| [Native RGB API (Experimental)](../specs/wallet-api/rgb.md) | UniSat-specific issuance, receive, payment, and RGB/BTC swap API |
| [RGB Instant Swap](../specs/wallet-api/rgb-instant-swap.md) | Reusable NIA seller listings completed and broadcast by a BTC buyer |
| [WebRGB v1 Provider](../specs/wallet-api/webrgb.md) | Standard provider discovery, receive, send, transfer tracking, events, and errors |
| [Manage Networks](../specs/wallet-api/manage-networks.md) | Switch networks, listen for changes |
| [Derive Context Hash (Experimental)](../specs/wallet-api/derive-context-hash.md) | Deterministic secret derivation from wallet seed (experimental) |
| [Sign Message](../specs/wallet-api/sign-message.md) | BIP-322 and ECDSA message signing |
| [Sign Transaction](../specs/wallet-api/sign-transaction.md) | PSBT signing and transaction broadcasting |
| [Mobile Integration](../specs/wallet-api/mobile-integration.md) | Deep-link integration for mobile dApps |
