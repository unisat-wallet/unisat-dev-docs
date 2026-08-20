# Inscribe FAQ

## How to pay after creating an order?
The order will start inscribing once the "payAddress" receives the required "amount". For example, if an order requires 3000 satoshis, you have to send 3000 satoshis to the payAddress. After that, the inscription will be processed.

## How is the open-api order charged?
Please refer to the current [Inscribe API V5 Fee Guide](./inscribe-v5-fee-guide.md) for the active Bitcoin OpenAPI and Fractal OpenAPI fee configuration. The older V2 fee-rule documents are retained for historical reference.

## Are the orders on the open-api and the UniSat website interoperable?
No. Open API and UniSat website inscribing services do not share data. This ensures the stability of the Open API interface and prevents it from being affected by frequent changes to the website inscribing service. For similar reasons, the orders on open-api do not enjoy discounts from the OG card or .unisat domain.

## How many files can I submit for each order?
- **Fractal/BTC:** Up to 1000 inscriptions per order, with each file up to 390 KB.
- For more details, see the corresponding fee rules documentation.

## How to calculate the total amount to pay for an order?
The total amount is:
**Total = minUtxoTotal + networkSats + serviceFee + devFee**

- **minUtxoTotal**: The total minimum UTXO required for all inscriptions (e.g., 546 sats × file count)
- **networkSats**: Estimated miner fee (depends on file size, content type, fee rate)
- **serviceFee**: Platform fee, see the [Inscribe API V5 Fee Guide](./inscribe-v5-fee-guide.md)
- **devFee**: Developer fee (if any)

## How to estimate the service fee?
Use the formulas in the [Inscribe API V5 Fee Guide](./inscribe-v5-fee-guide.md) only for planning. For programmatic estimation, call the matching V5 quote endpoint and use its `payableAmount`.

## What are the file and network fee limits?
- **Maximum file size per inscription:** 390 KB
- **Maximum network fee rate:** 10,000 sat/vB

For more details, always refer to the latest fee rules documentation. 

## Example: Estimate Total Payment in JavaScript

Below is a sample JavaScript function to estimate the total amount to pay for an inscribe order. Please ensure the service fee calculation matches the latest fee rules for your chosen network (Fractal or Bitcoin).

```js
// Parameters
const fileCount = 1000; // number of inscriptions/files
const minUtxoPerInscription = 546; // minimum UTXO per inscription (sats)
const fileSize = 1000000; // total size of all files in bytes
const contentTypeSize = 100; // total size of content types in bytes
const feeRate = 10; // network fee rate (sat/vB)
const devFee = 1000; // developer fee (if any)

// 1. Calculate minUtxoTotal
const minUtxoTotal = minUtxoPerInscription * fileCount;

// 2. Estimate networkSats (miner fee)
// This is a simplified estimation. Actual calculation may vary by implementation.
const baseSize = 88;
const addrSize = 25 + 1; // adjust if using different address types
const networkSats = Math.ceil(((fileSize + contentTypeSize) / 4 + (baseSize + 8 + addrSize + 8 + 23)) * feeRate);

// 3. Calculate serviceFee (platform fee)
// You must implement this function according to the latest fee rules for your network.
function calculateServiceFee({ fileCount, networkType }) {
  if (networkType === 'bitcoin') {
    // Example: Bitcoin V2 rules (see btc-inscribe-fee-rules.md)
    if (fileCount <= 20) return 0;
    return Math.min(3000 + (fileCount - 20) * 150, 4999);
  } else if (networkType === 'fractal') {
    // Example: Fractal event rules (see fractal-openapi-inscribe-fee-rules.md)
    if (fileCount <= 6) return fileCount * 100000;
    // 1 FB = 100,000,000 sats
    const fb = 100000000;
    const fee = 0.005 * fb + Math.min(fileCount, 500) * 0.00025 * fb;
    return Math.ceil(fee);
  }
  // Add more networks as needed
  return 0;
}

const networkType = 'bitcoin'; // or 'fractal'
const serviceFee = calculateServiceFee({ fileCount, networkType });

// 4. Add devFee if applicable

// 5. Calculate total amount
const totalAmount = minUtxoTotal + networkSats + serviceFee + devFee;

console.log('Total amount to pay:', totalAmount);
```

> **Note:**
> - The above code is for reference only. Please always check the latest fee rules documentation for accurate calculation.
> - For production use, you should handle address type, file size, and fee rate more precisely. 
