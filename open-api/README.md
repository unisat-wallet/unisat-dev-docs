# UniSat OPEN API

Welcome to the UniSat Open API documentation repository. This directory contains API specifications and resources for interacting with UniSat ecosystem services programmatically.

---

## Overview

UniSat Open APIs offer standardized RESTful interfaces to access blockchain data, token info, marketplace operations, and more. These APIs enable developers to build wallets, explorers, marketplaces, and other integrations.

---

## Available API Specifications

| API Name            | Description                              | Spec File                  |
| ------------------- | ---------------------------------------- | -------------------------- |
| Basic Indexer       | Core blockchain and transaction indexing | `basic-indexer.yaml`       |
| Inscription Indexer | Indexing of inscriptions                 | `inscription-indexer.yaml` |
| BRC20 Indexer       | Indexing and data for BRC20 tokens       | `brc20-indexer.yaml`       |
| Runes Indexer       | Indexing for Runes tokens                | `runes-indexer.yaml`       |
| Collection Indexer  | NFT collections indexing                 | `collection-indexer.yaml`  |
| Inscribe            | Inscription creation and management      | `inscribe.yaml`            |
| Marketplace         | NFT marketplace operations               | `marketplace.yaml`         |
| BRC20 Swap          | Swap functionality for BRC20 tokens      | `brc20-swap.yaml`          |
| CAT20 DEX           | Decentralized exchange for CAT20 tokens  | `cat20-dex.yaml`           |
| Fractal             | Fractal network related APIs             | `fractal.yaml`             |

---

## Accessing API Documentation

We provide an online interactive Swagger UI for quick exploration and testing:

[https://open-api.unisat.io](https://open-api.unisat.io)

You can also load the OpenAPI YAML files into your favorite API client tools such as Postman, Insomnia, or generate client SDKs.

---

## Usage

1. Choose the API and version you want to work with.
2. Review the endpoint definitions, parameters, and response schemas in the OpenAPI YAML files.
3. Use the Swagger UI or client tools to test API calls.
4. Authenticate as required by the API (see each API’s security section).
5. Handle error codes and messages as per the [error codes documentation](../errors/README.md).

---

## Contact & Support

For questions, support, or discussions, please open an issue in this repository or contact the UniSat developer support channels.

---

Thank you for using UniSat Open API!
