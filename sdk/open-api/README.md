# @unisat/open-api

> TypeScript SDK for UniSat Open API

## Installation

```bash
npm install @unisat/open-api
```

```bash
yarn add @unisat/open-api
```

```bash
pnpm add @unisat/open-api
```

## Usage

### Basic Usage

```typescript
import { createClient } from '@unisat/open-api';

const client = createClient({
  apiKey: 'your-api-key',
});

// Get blockchain info
const info = await client.blockchain.getBlockchainInfo();
console.log(info);

// Get recommended fees
const fees = await client.fees.getRecommendedFees();
console.log(fees);

// Get block by height
const block = await client.blocks.getBlockByHeight({ height: 800000 });
console.log(block);
```

### Custom Base URL

```typescript
import { createClient } from '@unisat/open-api';

// For testnet
const testnetClient = createClient({
  baseUrl: 'https://open-api-testnet.unisat.io',
  apiKey: 'your-api-key',
});
```

### With Custom Axios Instance

```typescript
import axios from 'axios';
import { createClient } from '@unisat/open-api';

const axiosInstance = axios.create({
  timeout: 10000,
});

const client = createClient({
  axios: axiosInstance,
});
```

## Available Base URLs

| Network | URL |
|---------|-----|
| Bitcoin Mainnet | `https://open-api.unisat.io` |
| Bitcoin Staging | `https://open-api-staging.unisat.io` |
| Bitcoin Testnet | `https://open-api-testnet.unisat.io` |
| Bitcoin Testnet4 | `https://open-api-testnet4.unisat.io` |
| Bitcoin Signet | `https://open-api-signet.unisat.io` |
| Fractal Mainnet | `https://open-api-fractal.unisat.io` |
| Fractal Testnet | `https://open-api-fractal-testnet.unisat.io` |

## API Modules

The SDK is organized into modules based on API tags:

- `blockchain` - Blockchain info
- `blocks` - Block data
- `transactions` / `tx` - Transaction data
- `addresses` / `address` - Address info, balance, UTXO
- `inscriptions` / `inscription` - Inscription data
- `brc20` - BRC-20 token operations
- `runes` - Runes operations
- `alkanes` - Alkanes operations
- `marketplace` - Marketplace operations
- And more...

## Development

### Regenerate API Types

To regenerate the API types from the OpenAPI spec:

```bash
npm run generate
```

This script uses the latest OpenAPI spec from `../../open-api/auto-generated/swagger/openapi-swagger.yaml`.

### Build

```bash
npm run build
```

### Watch Mode

```bash
npm run dev
```

## License

Apache-2.0

## Links

- [UniSat Developer Center](https://developer.unisat.io)
- [Documentation](https://github.com/unisat-wallet/unisat-dev-docs)
