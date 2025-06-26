# UniSat OPEN API

Welcome to the UniSat Open API documentation repository. This directory contains API specifications and resources for programmatic access to the UniSat ecosystem services.

---

## Overview

UniSat Open APIs provide standardized RESTful interfaces for accessing blockchain data, token information, marketplace operations, and more. These APIs empower developers to build wallets, explorers, marketplaces, and other blockchain-integrated applications.

---

## Available API Specifications

| API Name               | Description                                     | Spec File                     | Documentation Link                                                             |
| ---------------------- | ----------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------ |
| Basic Indexer          | Core blockchain and transaction indexing        | `basic-indexer.yaml`          | [`basic-indexer.md`](./auto-generated/docs/basic-indexer.md)                   |
| Inscription Indexer    | Indexing of inscriptions                        | `inscription-indexer.yaml`    | [`inscription-indexer.md`](./auto-generated/docs/inscription-indexer.md)       |
| BRC20 Indexer          | Indexing and data for BRC20 tokens              | `brc20-indexer.yaml`          | [`brc20-indexer.md`](./auto-generated/docs/brc20-indexer.md)                   |
| Runes Indexer          | Indexing for Runes tokens                       | `runes-indexer.yaml`          | [`runes-indexer.md`](./auto-generated/docs/runes-indexer.md)                   |
| Alkanes Indexer        | Developer-friendly API built on Alkanes indexer | `alkanes-indexer.yaml`        | [`alkanes-indexer.md`](./auto-generated/docs/alkanes-indexer.md)               |
| Collection Indexer     | NFT collections indexing                        | `collection-indexer.yaml`     | [`collection-indexer.md`](./auto-generated/docs/collection-indexer.md)         |
| Inscribe               | Inscription creation and management             | `inscribe.yaml`               | [`inscribe.md`](./auto-generated/docs/inscribe.md)                             |
| BRC20 Marketplace      | BRC20 marketplace                               | `brc20-marketplace.yaml`      | [`brc20-marketplace.md`](./auto-generated/docs/brc20-marketplace.md)           |
| Runes Marketplace      | Runes marketplace                               | `runes-marketplace.yaml`      | [`runes-marketplace.md`](./auto-generated/docs/runes-marketplace.md)           |
| Alkanes Marketplace    | Alkanes marketplace                             | `alkanes-marketplace.yaml`    | [`alkanes-marketplace.md`](./auto-generated/docs/alkanes-marketplace.md)       |
| Collection Marketplace | Ordinals Collection marketplace                 | `collection-marketplace.yaml` | [`collection-marketplace.md`](./auto-generated/docs/collection-marketplace.md) |
| Domain Marketplace     | Ordinals Domain marketplace                     | `domain-marketplace.yaml`     | [`domain-marketplace.md`](./auto-generated/docs/domain-marketplace.md)         |
| BRC20 Swap             | Swap functionality for BRC20 tokens             | `brc20-swap.yaml`             | [`brc20-swap.md`](./auto-generated/docs/brc20-swap.md)                         |
| CAT20 DEX              | Decentralized exchange for CAT20 tokens         | `cat20-dex.yaml`              | [`cat20-dex.md`](./auto-generated/docs/cat20-dex.md)                           |
| Fractal                | Fractal network related APIs                    | `fractal.yaml`                | [`fractal.md`](./auto-generated/docs/fractal.md)                               |

---

## Accessing API Documentation

We provide an online interactive Swagger UI for quick exploration and testing:

[https://open-api.unisat.io](https://open-api.unisat.io)

Alternatively, you can load the OpenAPI YAML files into popular API client tools such as Postman or Insomnia, or generate client SDKs for your preferred language.

---

## Usage

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
