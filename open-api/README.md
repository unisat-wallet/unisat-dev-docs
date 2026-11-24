# UniSat OPEN API

Welcome to the UniSat Open API documentation repository. This directory contains API specifications and resources for programmatic access to the UniSat ecosystem services.

---

## Overview

UniSat Open APIs provide standardized RESTful interfaces for accessing blockchain data, token information, marketplace operations, and more. These APIs empower developers to build wallets, explorers, marketplaces, and other blockchain-integrated applications.

---

## Available API Documentation

**Recommended Reading:** [BTC Assets and Other Protocol Assets Overview](../docs/open-api/btc-and-protocol-assets.md)

**UTXO Safety:** [BTC Balance and UTXO](../docs/open-api/btc-balance-utxo.md) · [UTXO Lock and Unlock Guide](../docs/open-api/utxo-lock-unlock.md)

**BRC-20 Safety:** [Bitcoin Validity and Troubleshooting](../docs/open-api/bitcoin-brc20-validity-rules.md) · [Fractal Validity and Reinscription](../docs/open-api/fractal-brc20-validity-rules.md)

### Blockchain Indexing API

| API Category      | Description                                     | Documentation Link                                                       |
| ----------------- | ----------------------------------------------- | ------------------------------------------------------------------------ |
| Blockchain Level  | Core blockchain and transaction indexing        | [`blockchain-indexer.md`](https://api-docs.unisat.io/docs/open-api/blockchain-indexer)   |
| Inscription Level | Indexing of inscriptions                        | [`inscription-indexer.md`](https://api-docs.unisat.io/docs/open-api/inscription-indexer) |
| BRC20             | Indexing and data for BRC20 tokens              | [`brc20-indexer.md`](https://api-docs.unisat.io/docs/open-api/brc20-indexer)             |
| Runes             | Indexing for Runes tokens                       | [`runes-indexer.md`](https://api-docs.unisat.io/docs/open-api/runes-indexer)             |
| Alkanes           | Developer-friendly API built on Alkanes indexer | [`alkanes-indexer.md`](https://api-docs.unisat.io/docs/open-api/alkanes-indexer)         |
| Collection        | NFT collections indexing                        | [`collection-indexer.md`](https://api-docs.unisat.io/docs/open-api/collection-indexer)   |

### UniSat Services API

| API Category           | Description                         | Documentation Link                                                                            |
| ---------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------- |
| UniSat Inscribe        | Inscription creation and management | [`inscribe.md`](https://api-docs.unisat.io/docs/open-api/inscribe) [`inscribe-guide.md`](../docs/open-api/inscribe-guide.md) |
| BRC20 Marketplace      | BRC20 marketplace                   | [`brc20-marketplace.md`](https://api-docs.unisat.io/docs/open-api/brc20-marketplace)                          |
| Runes Marketplace      | Runes marketplace                   | [`runes-marketplace.md`](https://api-docs.unisat.io/docs/open-api/runes-marketplace)                          |
| Alkanes Marketplace    | Alkanes marketplace                 | [`alkanes-marketplace.md`](https://api-docs.unisat.io/docs/open-api/alkanes-marketplace)                      |
| Collection Marketplace | Ordinals Collection marketplace     | [`collection-marketplace.md`](https://api-docs.unisat.io/docs/open-api/collection-marketplace)                |
| Domain Marketplace     | Ordinals Domain marketplace         | [`domain-marketplace.md`](https://api-docs.unisat.io/docs/open-api/domain-marketplace)                        |

### Fractal Bitcoin Specific API

| API Category | Description                             | Documentation Link                                     |
| ------------ | --------------------------------------- | ------------------------------------------------------ |
| Fractal      | Fractal network related APIs            | [`fractal.md`](https://api-docs.unisat.io/docs/open-api/fractal)       |
| BRC20 Swap   | Swap functionality for BRC20 tokens     | [`brc20-swap.md`](https://api-docs.unisat.io/docs/open-api/brc20-swap) |
| CAT20 DEX    | Decentralized exchange for CAT20 tokens | [`cat20-dex.md`](https://api-docs.unisat.io/docs/open-api/cat20-dex)   |

## Fractal OpenAPI Inscribe Fee Rules

- **[Event Inscribe Fee Rules (July 22 – Sep 30, 2024)](../docs/open-api/fractal-openapi-inscribe-fee-rules.md)**
  Special rules and discounts during the event period.
- **[Standard Inscribe Fee Rules](../docs/open-api/fractal-openapi-inscribe-fee-rules-standard.md)**
  Regular rules effective outside of event periods.

## Bitcoin OpenAPI Inscribe Fee Rules

- **[Bitcoin Inscribe Fee Rules](../docs/open-api/btc-inscribe-fee-rules.md)**
  Service fee and per-inscription fee details for Bitcoin Mainnet.

---

## Accessing API Documentation

We provide an online interactive Swagger UI for quick exploration and testing:

[https://open-api.unisat.io](https://open-api.unisat.io)

Alternatively, you can load the OpenAPI YAML files into popular API client tools such as Postman or Insomnia, or generate client SDKs for your preferred language.

Public machine-readable artifacts:

- Complete Swagger: `https://api-docs.unisat.io/swagger/swagger.yaml`
- Artifact manifest and split-file index: `https://api-docs.unisat.io/swagger/manifest.json`
- Legacy complete Swagger URL: `https://api-docs.unisat.io/swagger/openapi-swagger.yaml`

---

## Usage

For terminal and AI agent workflows, see [UniSat AI Kit](../docs/open-api/openapi-cli.md).

1. Choose the API and version you want to work with.
2. Review the endpoint definitions, parameters, and response schemas in the OpenAPI YAML files or generated Markdown docs.
3. Use the Swagger UI or client tools to test API calls.
4. Authenticate as required by each API (refer to the security section).
5. Handle error codes and messages according to the [error codes documentation](../errors/README.md).

---

## Contact & Support

For questions, support, or discussions, please open an issue in this repository or contact UniSat developer support channels.

---

Thank you for using UniSat Open API!
