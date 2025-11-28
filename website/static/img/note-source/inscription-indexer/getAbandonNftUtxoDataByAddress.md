### Notes

**Background:**

In previous versions, the `inscription-utxo-data` endpoint returned all inscription UTXOs. After a recent upgrade, UTXOs corresponding to "abandoned inscriptions" are now filtered out for efficiency.

**What are abandoned inscriptions?**
- BRC20 MINT inscriptions
- BRC20 TRANSFER inscriptions that have already been transferred

These inscriptions do not carry BRC20 assets and account for a large proportion of the index. To improve efficiency and reduce unnecessary data, they are now excluded from the normal inscription list.

**How to access abandoned inscription UTXOs?**
If you still need access to these UTXOs, please use the new `/abandon-nft-utxo-data` endpoint. This endpoint specifically returns UTXOs for abandoned inscriptions as defined above.

**Summary:**
- `/inscription-utxo-data` now only returns active inscription UTXOs (excluding abandoned ones)
- `/abandon-nft-utxo-data` returns UTXOs for abandoned inscriptions

If you have any questions about this change, please contact the UniSat developer support team. 