# Alkanes Balance and UTXO

This document describes all endpoints and details related to Alkanes token balance and UTXO management in UniSat OpenAPI.

---

## 1. Alkanes Model Overview

Alkanes uses a **UTXO-based model**: assets are attached directly to UTXOs. Alkanes assets are generally divided into multiple types, most commonly **token** and **NFT**. The Alkanes indexer does **not** support mempool (unconfirmed transaction) recognition. This means:
- If a UTXO is unconfirmed, it may still contain Alkanes assets.
- If you treat such an unconfirmed UTXO as a normal BTC UTXO and spend it, you may accidentally send the Alkanes assets attached to it to another party.

> **Warning:**
> Always be cautious when spending UTXOs that may contain Alkanes assets, especially if they are unconfirmed. The indexer cannot detect Alkanes in mempool transactions, so asset loss may occur if not handled properly.

---

## 2. Alkanes Balance & UTXO Endpoints

- `/v1/indexer/alkanes/utxo/{txid}/{index}/balance`: Get Alkanes balance on a specific UTXO.
- `/v1/indexer/address/{address}/alkanes/{alkaneid}/utxo`: Get UTXO distribution for a specific Alkane.
- `/v1/indexer/address/{address}/alkanes/token-list`: Get all token balances for an address.

---

## 3. Usage Scenarios and Special Cases

- Alkanes balances and UTXOs are protocol-specific and require dedicated endpoints.
- **Do not spend unconfirmed UTXOs as BTC if they may contain Alkanes assets.** The indexer cannot recognize Alkanes in mempool, and you may lose your Alkanes if the UTXO is spent as BTC.
- If you want to obtain pure BTC UTXOs (UTXOs that do not contain Alkanes assets), use `/v1/indexer/address/{address}/available-utxo-data`. This endpoint effectively filters out UTXOs containing Alkanes assets.
- Pay attention to protocol upgrades, asset locks, and forks.

---

## 4. FAQ

**Q: How do I get all my Alkanes balances?**
A: Use `/v1/indexer/address/{address}/alkanes/{alkaneid}/utxo` to get UTXO distribution for a specific Alkane.

**Q: What should I be careful about when spending UTXOs?**
A: Never spend unconfirmed UTXOs as BTC if they may contain Alkanes assets. The indexer cannot detect Alkanes in mempool, and you risk sending your Alkanes to someone else by mistake.

**Q: How do I get pure BTC UTXOs (excluding Alkanes assets)?**
A: Use `/v1/indexer/address/{address}/available-utxo-data` to get UTXOs that do not contain Alkanes assets. This endpoint is designed to help you safely select UTXOs for BTC transactions without risking accidental transfer of Alkanes.

---

## 5. References

- For more details, refer to the [Swagger UI](https://open-api.unisat.io/#/).

---

## 6. Indexer Height and Data Lag

- The Alkanes indexer analysis height may lag behind the actual Bitcoin block height. You can use `/v1/indexer/alkanes/status` to get the `bestHeight` value, which indicates the current block height up to which the API has indexed Alkanes data.
- When verifying balances or making decisions based on UTXO state, always consider the indexer's best height to avoid confusion caused by data lag. 