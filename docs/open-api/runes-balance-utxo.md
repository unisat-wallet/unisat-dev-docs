# Runes Balance and UTXO

This document describes all endpoints and details related to Runes token balance and UTXO management in UniSat OpenAPI.

---

## 1. Runes Model Overview

Runes uses a **UTXO-based model**: assets are attached directly to UTXOs. The Runes indexer does **not** support mempool (unconfirmed transaction) recognition. This means:
- If a UTXO is unconfirmed, it may still contain Runes assets.
- If you treat such an unconfirmed UTXO as a normal BTC UTXO and spend it, you may accidentally send the Runes assets attached to it to another party.

> **Warning:**
> Always be cautious when spending UTXOs that may contain Runes assets, especially if they are unconfirmed. The indexer cannot detect Runes in mempool transactions, so asset loss may occur if not handled properly.

---

## 2. Runes Balance & UTXO Endpoints

- `/v1/indexer/address/{address}/runes/balance-list`: Get all Runes balances for an address.
- `/v1/indexer/address/{address}/runes/{runeid}/balance`: Get a specific Rune balance.
- `/v1/indexer/runes/utxo/{txid}/{index}/balance`: Get Rune balance on a specific UTXO.
- `/v1/indexer/address/{address}/runes/{runeid}/utxo`: Get UTXO distribution for a specific Rune.

---

## 3. Usage Scenarios and Special Cases

- Runes balances and UTXOs are protocol-specific and require dedicated endpoints.
- **Do not spend unconfirmed UTXOs as BTC if they may contain Runes assets.** The indexer cannot recognize Runes in mempool, and you may lose your Runes if the UTXO is spent as BTC.
- - If you want to obtain pure BTC UTXOs (UTXOs that do not contain Runes assets), use `/v1/indexer/address/{address}/available-utxo-data`. This endpoint effectively filters out UTXOs containing Runes assets.
- Pay attention to protocol upgrades, asset locks, and forks.

---

## 4. FAQ

**Q: How do I get all my Runes balances?**
A: Use `/v1/indexer/address/{address}/runes/balance-list` to get all Runes balances for an address.

**Q: How do I get the UTXO distribution for a specific Rune?**
A: Use `/v1/indexer/address/{address}/runes/{runeid}/utxo`.

**Q: What should I be careful about when spending UTXOs?**
A: Never spend unconfirmed UTXOs as BTC if they may contain Runes assets. The indexer cannot detect Runes in mempool, and you risk sending your Runes to someone else by mistake.

**Q: How do I get pure BTC UTXOs (excluding Runes assets)?**
A: Use `/v1/indexer/address/{address}/available-utxo-data` to get UTXOs that do not contain Runes assets. This endpoint is designed to help you safely select UTXOs for BTC transactions without risking accidental transfer of Runes.

---

## 5. References

- For more details, refer to the [Swagger UI](https://open-api.unisat.io/#/). 

---

## 6. Indexer Height and Data Lag

- The Runes indexer analysis height may lag behind the actual Bitcoin block height. You can use `/v1/indexer/runes/status` to get the `bestHeight` value, which indicates the current block height up to which the API has indexed Runes data.
- When verifying balances or making decisions based on UTXO state, always consider the indexer's best height to avoid confusion caused by data lag. 