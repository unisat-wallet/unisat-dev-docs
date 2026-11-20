# UniSat Wallet API — dApp Integration Guide

The `window.unisat` object is injected by the UniSat Wallet extension into every web page. dApps use this API to interact with the user's Bitcoin wallet.

Experimental RGB interfaces are documented separately because they have different method names, amount types, capabilities, and error codes:

- [Native RGB API (`window.unisat.rgb`)](./api-docs/rgb.md)
- [WebRGB v1 Provider (`window.rgb`)](./api-docs/webrgb.md)

## Getting Started

1. [Detect the extension](./api-docs/browser-detection.md)
2. [Connect and request accounts](./api-docs/connect-extension.md)
3. [Access account info](./api-docs/access-accounts.md)

## Reference

| Topic | Description |
| --- | --- |
| [Browser Detection](./api-docs/browser-detection.md) | Check if UniSat is installed |
| [Connect Extension](./api-docs/connect-extension.md) | Request wallet connection and accounts |
| [Access Accounts](./api-docs/access-accounts.md) | Get current account, address, public key |
| [Address Types](./api-docs/address-types.md) | Supported address formats |
| [Manage Assets](./api-docs/manage-assets.md) | Send BTC, inscriptions, Runes, BRC-20 |
| [Native RGB API (Experimental)](./api-docs/rgb.md) | UniSat-specific issuance, receive, payment, and RGB/BTC swap API |
| [WebRGB v1 Provider](./api-docs/webrgb.md) | Standard provider discovery, receive, send, transfer tracking, events, and errors |
| [Manage Networks](./api-docs/manage-networks.md) | Switch networks, listen for changes |
| [Derive Context Hash (Experimental)](./api-docs/derive-context-hash.md) | Deterministic secret derivation from wallet seed (experimental) |
| [Sign Message](./api-docs/sign-message.md) | BIP-322 and ECDSA message signing |
| [Sign Transaction](./api-docs/sign-transaction.md) | PSBT signing and transaction broadcasting |
| [Mobile Integration](./api-docs/mobile-integration.md) | Deep-link integration for mobile dApps |
