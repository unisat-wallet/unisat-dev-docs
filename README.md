# Developer Resources

Welcome to the UniSat developer resource hub. Here you will find all the essential API specifications, wallet integration guides, and tools to help you build and integrate with UniSat Wallet and related services.

## Available API Documentation

[`Open API README.md`](./open-api/README.md)

**Recommended Reading:** [BTC Assets and Other Protocol Assets Overview](open-api/btc-and-protocol-assets.md)

### Blockchain Indexing API

| API Category      | Description                                     | Documentation Link                                                                |
| ----------------- | ----------------------------------------------- | --------------------------------------------------------------------------------- |
| Blockchain Level  | Core blockchain and transaction indexing        | [`blockchain-indexer.md`](./open-api/auto-generated/docs/blockchain-indexer.md)   |
| Inscription Level | Indexing of inscriptions                        | [`inscription-indexer.md`](./open-api/auto-generated/docs/inscription-indexer.md) |
| BRC20             | Indexing and data for BRC20 tokens              | [`brc20-indexer.md`](./open-api/auto-generated/docs/brc20-indexer.md)             |
| Runes             | Indexing for Runes tokens                       | [`runes-indexer.md`](./open-api/auto-generated/docs/runes-indexer.md)             |
| Alkanes           | Developer-friendly API built on Alkanes indexer | [`alkanes-indexer.md`](./open-api/auto-generated/docs/alkanes-indexer.md)         |
| Collection        | NFT collections indexing                        | [`collection-indexer.md`](./open-api/auto-generated/docs/collection-indexer.md)   |

### UniSat Services API

| API Category           | Description                         | Documentation Link                                                                      |
| ---------------------- | ----------------------------------- | --------------------------------------------------------------------------------------- |
| UniSat Inscribe        | Inscription creation and management | [`inscribe.md`](./open-api/auto-generated/docs/inscribe.md)                             |
| BRC20 Marketplace      | BRC20 marketplace                   | [`brc20-marketplace.md`](./open-api/auto-generated/docs/brc20-marketplace.md)           |
| Runes Marketplace      | Runes marketplace                   | [`runes-marketplace.md`](./open-api/auto-generated/docs/runes-marketplace.md)           |
| Alkanes Marketplace    | Alkanes marketplace                 | [`alkanes-marketplace.md`](./open-api/auto-generated/docs/alkanes-marketplace.md)       |
| Collection Marketplace | Ordinals Collection marketplace     | [`collection-marketplace.md`](./open-api/auto-generated/docs/collection-marketplace.md) |
| Domain Marketplace     | Ordinals Domain marketplace         | [`domain-marketplace.md`](./open-api/auto-generated/docs/domain-marketplace.md)         |

### Fractal Bitcoin Specific API

| API Category | Description                             | Documentation Link                                              |
| ------------ | --------------------------------------- | --------------------------------------------------------------- |
| Fractal      | Fractal network related APIs            | [`fractal.md`](./open-api/auto-generated/docs/fractal.md)       |
| BRC20 Swap   | Swap functionality for BRC20 tokens     | [`brc20-swap.md`](./open-api/auto-generated/docs/brc20-swap.md) |
| CAT20 DEX    | Decentralized exchange for CAT20 tokens | [`cat20-dex.md`](./open-api/auto-generated/docs/cat20-dex.md)   |

### 🔧 Wallet Integration

Comprehensive documentation for integrating with UniSat Wallet:

See [wallet-api/README.md](./wallet-api/README.md)

### ⚠️ Error Codes

Download the latest error code definitions for handling API errors programmatically:

```bash
# Download the latest Open API error codes
curl -O https://raw.githubusercontent.com/unisat-wallet/unisat-dev-support/main/errors/auto-generated/open-api-errors.json


```
