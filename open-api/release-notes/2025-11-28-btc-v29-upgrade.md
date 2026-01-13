# UniSat API & Core System Update Notes

**Release Date: 2025-11-28**

This update includes a full upgrade of the Bitcoin node to **Bitcoin Core v29**, adds support for low-fee-rate transactions, and introduces several improvements to UTXO-related APIs and the Inscription order workflow.

---

## 1. Broadcast API Updates

The `local_pushtx` API now supports broadcasting **low-fee-rate transactions**

This enhancement ensures that low-fee transactions are handled more efficiently and are more likely to be reflected accurately on third-party mempool explorers.

Documentation:

- [/v1/indexer/local_pushtx](../auto-generated/docs/blockchain-indexer.md#push-rawtx-to-bitcoin-node)

---

## 2. UTXO API Updates

With Bitcoin Core v29, UTXOs from low-fee transactions are now tracked and optionally exposed via the API.

### 2.1 `/utxo-data`

- This endpoint **now returns low-fee UTXOs by default**.
- No additional parameters are required.

Documentation:

- [/v1/indexer/address/:address/utxo-data](../auto-generated/docs/blockchain-indexer.md#get-btcutxo-list-by-address)
- [BTC Balance and UTXO](../btc-balance-utxo.md)

---

### 2.2 `/available-utxo-data`

- This endpoint **does not return low-fee UTXOs by default**, for compatibility with existing logic.
- To include low-fee UTXOs, clients must explicitly set:

```
?withLowFee=true
```

Example:

```
GET /v1/indexer/address/:address/available-utxo-data?withLowFee=true
```

Documentation:

- [/v1/indexer/address/:address/available-utxo-data](../auto-generated/docs/blockchain-indexer.md#get-available-utxo-list-by-address)
- [BTC Balance and UTXO](../btc-balance-utxo.md)

---

## 3. Inscription Order API Enhancements (`/inscribe`)

The inscription-related workflow, including BRC20 minting, has been significantly improved in this update.

### Key changes:

#### 3.1 Low-Fee-Rate Support

- Inscription orders now support **submitting transactions with low fee rates**.
- The fee estimation and transaction-building pipeline has been further optimized for reliability.

#### 3.2 BRC20 Minting Optimization

- Enhanced support for BRC20 minting operations, improving success rate and transaction construction.
- Reduces failures caused by insufficient fee coverage and unbalanced UTXO selection.

#### 3.3 Added Support for 6-Byte "brc2.0" Format

- Added support for the **6-byte brc2.0 inscription format**, enabling next-generation BRC20-like minting patterns.
- Fully compatible with the updated inscription engine.

Documentation: [inscribe-guide.md](../inscribe-guide.md)

---

## 4. Compatibility Notes

- All changes are backward compatible.
- Existing integrations will behave exactly the same unless `withLowFee=true` is explicitly used.
- Low-fee UTXOs may affect balance display or UTXO selection strategies; developers should update handling logic if needed.
