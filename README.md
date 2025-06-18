# Developer Resources

Welcome to the UniSat developer resource hub. Here you will find all the essential API specifications, wallet integration guides, and tools to help you build and integrate with UniSat Wallet and related services.

## Getting Start

### 🚀 Open APIs

Explore our officially supported APIs to interact with the UniSat ecosystem:

See [open-api/README.md](./open-api/README.md)

### 🔧 Wallet Integration

Comprehensive documentation for integrating with UniSat Wallet:

See [wallet-api/README.md](./wallet-api/README.md)

### ⚠️ Error Codes

Download the latest error code definitions for handling API errors programmatically:

```bash
# Download the latest Open API error codes
curl -O https://raw.githubusercontent.com/unisat-wallet/unisat-dev-support/main/errors/auto-generated/open-api-errors.json


```

## build

Clone the repository and install dependencies:

```
git clone https://github.com/unisat-wallet/unisat-dev-support
yarn install

```

Build OpenAPI swagger files:

```bash
yarn build:openapi-swagger
```

Build error codes:

```bash
yarn build:error-codes
```

## Contribute

We welcome contributions! Please follow these steps to contribute:

- Fork the repository
- Create a feature branch
  ```
  git checkout -b feature/your-feature
  ```
- Commit your changes
  ```
  git commit -m 'Add some feature'
  ```
- Push to the branch
  ```
  git push origin feature/your-feature
  ```
- Open a Pull Request on GitHub
