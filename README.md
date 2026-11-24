# Developer Resources

Welcome to the UniSat developer resource hub. Here you will find all the essential API specifications, wallet integration guides, and tools to help you build and integrate with UniSat Wallet and related services.

## Available API Documentation

Use Node.js 22 or later and install dependencies with `yarn install --frozen-lockfile`.
Run `npm start` to preview the documentation or `npm run build` to generate
the production site in `build/`. Both commands prepare the Docusaurus inputs
in `.generated/`. Build the container from the repository root with
`docker build -t unisat-dev-docs .`.

Maintain REST API definitions in `specs/openapi/`. Use the
`x-doc-notes` field on an operation for Markdown shown in its API reference.
Maintain error code definitions in `specs/errors/` and edit the
Wallet API Markdown directly in `specs/wallet-api/`. Edit guides and release notes in `docs/open-api/`, and support pages in `docs/developer-support/`.

[`Open API README.md`](./open-api/README.md)

**Recommended Reading:** [BTC Assets and Other Protocol Assets Overview](docs/open-api/btc-and-protocol-assets.md)

### Blockchain Indexing API

| API Category      | Description                                     | Documentation Link                                                                |
| ----------------- | ----------------------------------------------- | --------------------------------------------------------------------------------- |
| Blockchain Level  | Core blockchain and transaction indexing        | [`blockchain-indexer.md`](https://api-docs.unisat.io/docs/open-api/blockchain-indexer)   |
| Inscription Level | Indexing of inscriptions                        | [`inscription-indexer.md`](https://api-docs.unisat.io/docs/open-api/inscription-indexer) |
| BRC20             | Indexing and data for BRC20 tokens              | [`brc20-indexer.md`](https://api-docs.unisat.io/docs/open-api/brc20-indexer)             |
| Runes             | Indexing for Runes tokens                       | [`runes-indexer.md`](https://api-docs.unisat.io/docs/open-api/runes-indexer)             |
| Alkanes           | Developer-friendly API built on Alkanes indexer | [`alkanes-indexer.md`](https://api-docs.unisat.io/docs/open-api/alkanes-indexer)         |
| Collection        | NFT collections indexing                        | [`collection-indexer.md`](https://api-docs.unisat.io/docs/open-api/collection-indexer)   |

### UniSat Services API

| API Category           | Description                         | Documentation Link                                                                      |
| ---------------------- | ----------------------------------- | --------------------------------------------------------------------------------------- |
| UniSat Inscribe        | Inscription creation and management | [`inscribe.md`](https://api-docs.unisat.io/docs/open-api/inscribe)                             |
| BRC20 Marketplace      | BRC20 marketplace                   | [`brc20-marketplace.md`](https://api-docs.unisat.io/docs/open-api/brc20-marketplace)           |
| Runes Marketplace      | Runes marketplace                   | [`runes-marketplace.md`](https://api-docs.unisat.io/docs/open-api/runes-marketplace)           |
| Alkanes Marketplace    | Alkanes marketplace                 | [`alkanes-marketplace.md`](https://api-docs.unisat.io/docs/open-api/alkanes-marketplace)       |
| Collection Marketplace | Ordinals Collection marketplace     | [`collection-marketplace.md`](https://api-docs.unisat.io/docs/open-api/collection-marketplace) |
| Domain Marketplace     | Ordinals Domain marketplace         | [`domain-marketplace.md`](https://api-docs.unisat.io/docs/open-api/domain-marketplace)         |

### Fractal Bitcoin Specific API

| API Category | Description                             | Documentation Link                                              |
| ------------ | --------------------------------------- | --------------------------------------------------------------- |
| Fractal      | Fractal network related APIs            | [`fractal.md`](https://api-docs.unisat.io/docs/open-api/fractal)       |
| BRC20 Swap   | Swap functionality for BRC20 tokens     | [`brc20-swap.md`](https://api-docs.unisat.io/docs/open-api/brc20-swap) |
| CAT20 DEX    | Decentralized exchange for CAT20 tokens | [`cat20-dex.md`](https://api-docs.unisat.io/docs/open-api/cat20-dex)   |

### 🔧 Wallet dApp Integration

Comprehensive documentation for integrating with UniSat Wallet:

See [wallet-api/README.md](./wallet-api/README.md)

### ⚠️ Error Codes

Download the latest error code definitions for handling API errors programmatically:

```bash
# Download the latest Open API error codes
curl -O https://raw.githubusercontent.com/unisat-wallet/unisat-dev-support/main/errors/auto-generated/open-api-errors.json


```
