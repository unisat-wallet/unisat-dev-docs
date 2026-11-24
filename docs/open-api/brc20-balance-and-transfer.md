# BRC20 Balance and Transfer

This document describes all endpoints and details related to BRC20 token balance, TRANSFER inscriptions, and transfer mechanism in UniSat OpenAPI.

---

## 1. BRC20 Model Overview

BRC20 uses an **account-based model** rather than a simple UTXO model. Transfers are not performed by directly moving UTXOs, but by minting a `TRANSFER` inscription and then sending this `TRANSFER` inscription. **Once a `TRANSFER` inscription is spent (transferred), it no longer holds value.**

> **Important:**
> You cannot simply determine whether a BRC20 token has been received by checking if a `TRANSFER` inscription has arrived at an address. After the first transfer, the `TRANSFER` inscription becomes invalid for further transfers, and the BRC20 balance is updated in the account model.

---

## 2. BRC20 Balance Endpoints

- `/v1/indexer/address/{address}/brc20/summary`: Get BRC20 balances (transferable and available).
- `/v1/indexer/address/{address}/brc20/{ticker}/transferable-inscriptions`: Get the current valid `TRANSFER` inscriptions for a specific ticker at an address. These are the inscriptions that can be used to send BRC20 tokens.

---

## 3. BRC20 Balance Structure

- `transferableBalance`: The portion of BRC20 balance currently locked in valid `TRANSFER` inscriptions. These can be used for sending BRC20 tokens. Once a `TRANSFER` inscription is spent, its value is removed from `transferableBalance`.
- `availableBalance`: The portion of BRC20 balance that can be inscribed as a new `TRANSFER` inscription. When a `TRANSFER` inscription is spent, the corresponding BRC20 amount is credited to the recipient's `availableBalance`.
- `overallBalance`: Sum of both.

---

## 4. Usage Scenarios and Special Cases

- Use protocol-specific endpoints for BRC20 balances.
- To send BRC20 tokens, you must use a valid `TRANSFER` inscription, which can be queried via `/v1/indexer/address/{address}/brc20/{ticker}/transferable-inscriptions`.
- After a `TRANSFER` inscription is spent, the BRC20 amount is no longer in `transferableBalance` and is credited to the recipient's `availableBalance`.
- Pay attention to protocol upgrades and asset locks.

---

## 5. FAQ

**Q: How do I get my BRC20 token balances?**
A: Use `/v1/indexer/address/{address}/brc20/summary` to get both transferable and available balances.

**Q: What is the difference between transferable and available balance?**
A: `transferableBalance` is the amount currently locked in valid `TRANSFER` inscriptions and can be sent. Once a `TRANSFER` inscription is spent, its value is removed from `transferableBalance` and credited to the recipient's `availableBalance`, which can then be inscribed as a new `TRANSFER` inscription for further transfers.

**Q: How do I get the current valid TRANSFER inscriptions for sending BRC20?**
A: Use `/v1/indexer/address/{address}/brc20/{ticker}/transferable-inscriptions` to get all valid `TRANSFER` inscriptions for a specific ticker at an address.

**Q: Can I determine a BRC20 deposit by checking if a TRANSFER inscription is received?**
A: No. After the first transfer, the `TRANSFER` inscription is no longer valid, and the BRC20 balance is managed by the account model. Always use the recommended event history endpoints and balance queries for accurate results.

---

## 6. References

- For more details, refer to the [Swagger UI](https://open-api.unisat.io/#/). 

---

## 7. How to Verify a BRC20 Deposit (Recharge) is Successful

To accurately verify whether a BRC20 deposit (recharge) is successful, **do not rely solely on checking if a BRC20 inscription has been received by an address**—this can lead to false positives. Instead, use the following recommended methods based on event history:

### Method 1: Query by Address

- Use `/v1/indexer/address/{address}/brc20/history` to get all BRC20 events for the address.
- If you need to check a specific ticker, use `/v1/indexer/address/{address}/brc20/{ticker}/history`.
- In the returned events, a deposit is considered successful if **all** the following conditions are met:
  - `type == "receive"`
  - `valid == true`
  - `currentHeight - height > 3` (on Fractal, it is recommended to use `> 60` for more security)

### Method 2: Query by Block Height

- Use `/v1/indexer/brc20/history-by-height/{height}?start={start}&limit={limit}` to get all BRC20 events at a specific block height.
- If you need to check a specific ticker, use `/v1/indexer/brc20/{ticker}/history?height={height}&start={start}&limit={limit}`.
- In the returned events, a deposit is considered successful if **all** the following conditions are met:
  - `type == "transfer"`
  - `valid == true`
  - `currentHeight - height > 3` (on Fractal, it is recommended to use `> 60` for more security)

### Important Notes
- **Do not attempt to verify a BRC20 deposit by simply checking if an address has received a BRC20 inscription.** This approach can result in false positives and is not reliable.
- Always use the event history endpoints and the above criteria for accurate deposit verification.
- The confirmation threshold (`currentHeight - height > 3` or `> 60` on Fractal) is important to ensure the transaction is deeply confirmed and not at risk of reorg.

### Example Verification Flow

1. User deposits BRC20 to an address and provides the txid (optional).
2. Backend queries the appropriate event history endpoint.
3. Backend checks for a matching event with the correct type, validity, and sufficient confirmations.
4. Only after all criteria are met, the deposit is considered successful and credited. 

---

## 8. Indexer Height and Data Lag

- The BRC20 indexer analysis height may lag behind the actual Bitcoin block height. You can use `/v1/indexer/brc20/bestheight` to get the current height up to which the API has analyzed BRC20 data.
- When verifying deposits or querying balances, always consider the indexer's best height to avoid confusion caused by data lag. 