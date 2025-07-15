# BTC Balance and UTXO

This document describes all endpoints and details related to Bitcoin (BTC) balance and UTXO management in UniSat OpenAPI.

---

## 1. BTC Balance Endpoints

- `/v1/indexer/address/{address}/available-balance`: Get the sum of all BTC UTXOs that are currently available for spending by this address, applying the same filtering rules as `/available-utxo-data`: protocol asset UTXOs (such as inscriptions, Runes, Alkanes), dust (<600 sat), and (in some cases) mempool UTXOs are excluded. This is the recommended way to determine your true spendable BTC balance.
- `/v1/indexer/address/{address}/available-utxo-data`: Get spendable UTXOs (excludes protocol assets and dust UTXOs < 600 sat). **(Recommended, see special rules below)** The sum of all UTXOs returned by this endpoint equals the `available` field in the `available-balance` endpoint.
- `/v1/indexer/address/{address}/utxo-data`: Get UTXOs without inscriptions for an address. *(Legacy, see notes below)*
- `/v1/indexer/address/{address}/all-utxo-data`: Get all UTXOs for an address (including protocol assets).
- `/v1/indexer/utxo/{txid}/{index}`: Get details of a single UTXO by txid and index.

---

## 2. Usage Scenarios and Special Rules for `available-utxo-data`

- **Recommended:** Always use `/v1/indexer/address/{address}/available-utxo-data` to get spendable BTC UTXOs. This endpoint is designed to maximize safety and compatibility as more protocol assets are supported.
- **Special Rules:**
  1. This endpoint excludes UTXOs that carry protocol assets such as inscriptions, Runes, Alkanes, etc.
  2. It excludes UTXOs with less than 600 satoshis ("dust"), as many protocol assets are attached to small-value UTXOs (e.g., 546 sat). This protects users even if new protocols are not yet recognized.
  3. By default, it returns UTXOs from both the blockchain and mempool. However, if the address holds assets from protocols that do not support mempool recognition (such as Runes and Alkanes), mempool UTXOs will not be returned.
  4. Through the [UTXO management tool](https://unisat.io/utxo), users can explicitly unlock specific UTXOs via wallet signature authorization. In this case, the endpoint will return these UTXOs as available, even if they contain protocol assets (inscriptions, Runes, Alkanes, etc.). This is considered a user-authorized action to treat these UTXOs as spendable BTC.
- **Legacy Design:** Originally, `utxo-data` and `inscription-utxo-data` were provided to cover all UTXOs for an address. As more protocols (Runes, Alkanes, etc.) are supported, this design is now outdated and not recommended for new integrations.

---

## 3. Quick Comparison Table

| Endpoint | Description | Special Notes |
|----------|-------------|--------------|
| `/v1/indexer/address/{address}/available-balance` | Get spendable balance | Excludes protocol-locked |
| `/v1/indexer/address/{address}/available-utxo-data` | Get available UTXOs | Excludes protocol assets, dust, and (in some cases) mempool |
| `/v1/indexer/address/{address}/utxo-data` | Get normal UTXOs | Excludes protocol assets *(legacy)* |
| `/v1/indexer/address/{address}/all-utxo-data` | Get all UTXOs | Includes protocol assets |
| `/v1/indexer/utxo/{txid}/{index}` | Get single UTXO | Three possible states |

---

## 4. Deprecated API: `/v1/indexer/address/{address}/balance`

> **Deprecated:**
> The endpoint `/v1/indexer/address/{address}/balance` is deprecated and not recommended for use.
> It only distinguishes between BTC balance and inscription balance, and does **not** recognize Runes or Alkanes assets.
> For accurate and up-to-date spendable balance, please use [`/v1/indexer/address/{address}/available-balance`](#) instead.

---

## 5. About Abandoned Inscriptions and UTXO Data

**Background:**

In previous versions, the `inscription-utxo-data` endpoint returned all inscription UTXOs. After a recent upgrade, UTXOs corresponding to "abandoned inscriptions" are now filtered out for efficiency.

**What are abandoned inscriptions?**
- BRC20 MINT inscriptions
- BRC20 TRANSFER inscriptions that have already been transferred

These inscriptions do not carry BRC20 assets and account for a large proportion of the index. To improve efficiency and reduce unnecessary data, they are now excluded from the normal inscription list.

**How to access abandoned inscription UTXOs?**
If you still need access to these UTXOs, please use the new `/abandon-nft-utxo-data` endpoint. This endpoint specifically returns UTXOs for abandoned inscriptions as defined above.

**Balance Calculation Change:**
- **Old version:**
  - `Total balance = utxo-data + inscription-utxo-data`
- **Current version:**
  - `Total balance = utxo-data + inscription-utxo-data + abandon-nft-utxo-data`

If you have any questions about this change, please contact the UniSat developer support team.

---

## 6. FAQ

**Q: Why is my total balance different from my available balance?**
A: Total balance includes all assets, including those locked by protocols (inscriptions, Runes, Alkanes, etc.), while available balance only counts spendable BTC.

**Q: Why can't I spend some UTXOs?**
A: UTXOs may be locked by protocols, unconfirmed, or too small (dust). Use the available UTXO endpoint to get spendable UTXOs.

**Q: What is the safest way to get BTC UTXOs for spending?**
A: Always use `/v1/indexer/address/{address}/available-utxo-data`. This endpoint applies multiple safety rules to avoid protocol asset loss and is updated as new protocols are supported.

**Q: How does available-utxo-data relate to available-balance?**
A: The sum of all UTXOs returned by `/v1/indexer/address/{address}/available-utxo-data` is exactly the `available` value in `/v1/indexer/address/{address}/available-balance`.

**Q: Why are some small UTXOs (less than 600 sat) not returned?**
A: Many protocol assets are attached to small-value UTXOs (e.g., 546 sat). Filtering these out helps protect your BTC from accidental protocol asset loss.

**Q: Why are some mempool UTXOs not returned?**
A: If your address holds assets from protocols that do not support mempool recognition (such as Runes and Alkanes), mempool UTXOs are excluded to prevent asset loss.

**Q: Can I spend UTXOs that contain protocol assets?**
A: Only if you explicitly unlock them using the [UTXO management tool](https://unisat.io/utxo) and authorize via wallet signature. Otherwise, these UTXOs are excluded for your safety.

Alternatively, you can use `/v1/indexer/address/{address}/all-utxo-data` to retrieve all UTXOs (including those with protocol assets) for spending. However, this approach is only recommended if you are certain that the protocol assets on these UTXOs are no longer valuable to you, as spending them will transfer or destroy the attached protocol assets. Proceed with caution.

**Q: Should I use utxo-data and inscription-utxo-data for new integrations?**
A: No. These endpoints are legacy and do not account for all protocol assets. Use `available-utxo-data` for new development.


---

## 6. Change Log & References

- UTXO endpoint updated on 2025-05-20: BRC20 TRANSFER/MINT inscriptions with no value are no longer queryable.
- For more details, refer to the [Swagger UI](https://open-api.unisat.io/#/). 