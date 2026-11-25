---
sidebar_position: 1
---

# UniSat Wallet dApp Integration

Integrate your dApp with UniSat Wallet through client-side wallet providers. The browser extension injects `window.unisat`, allowing users to connect their wallet, share account information, approve signatures, and submit transactions. Mobile dApps can use the supported deep-link flow.

These wallet integration APIs are separate from the UniSat Open API: they are not backend REST endpoints and do not require an Open API key.

## dApp Integration

UniSat Wallet provides APIs for:

- **Connection**: APIs for connecting to the wallet
- **Account Management**: APIs for accessing accounts and addresses
- **Asset Management**: APIs for managing digital assets
- **Transaction Signing**: APIs for signing transactions
- **Message Signing**: APIs for signing messages
- **Network Management**: APIs for switching between networks
- **RGB (Experimental)**: Native RGB and WebRGB provider APIs, including RGB/BTC swaps

## Getting Started

Start with the [Connection Guide](./connect-extension) for browser extension integration, or see [Mobile Integration](./mobile-integration) for mobile dApps.

See the [UniSat Wallet extension source](https://github.com/unisat-wallet/extension), the [Web3 demo source](https://github.com/unisat-wallet/unisat-web3-demo), or the [live demo](https://demo.unisat.io).

## Experimental RGB APIs

- [Native RGB API](./rgb)
- [RGB Instant Swap](./rgb-instant-swap)
- [WebRGB v1 Provider](./webrgb)
- [Backend-coordinated RGB swaps](./rgb-swap-backend)
- [Pure P2P RGB swaps](./rgb-swap-p2p)
