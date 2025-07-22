# Bitcoin OpenAPI Fee Rules

## Scope

- **Network:** Bitcoin Mainnet
- **Protocols:** Ordinals (including standard inscriptions, BRC20, Runes)

---

## Minting Quantity Limit

- **Maximum inscriptions per order:** 1000

---

## File and Network Fee Limits

- **Maximum file size per inscription:** 390 KB
- **Maximum network fee rate:** 10,000 sat/vB

---

## Fee Rules

- **Base service fee:** 3000 sats
- **Per-inscription fee:** 150 sats for each inscription above the free quota
- **Free quota:** First 20 inscriptions in each order are free
- **Maximum service fee per order:** 4999 sats

---

## Fee Calculation Formula

- If n ≤ 20:  
  `Fee = 0`
- If n > 20:  
  `Fee = min(3000 + (n - 20) × 150, 4999)`

---

## Fee Examples

| Quantity | Fee (sats) | Notes                                 |
|----------|------------|---------------------------------------|
| 10       | 0          | Within free quota                     |
| 20       | 0          | Within free quota                     |
| 21       | 3150       | 3000 + 1×150                          |
| 30       | 4500       | 3000 + 10×150                         |
| 40       | 4999       | 3000 + 20×150 = 6000, capped at 4999  |
| 100      | 4999       | Capped at 4999                        |
| 1000     | 4999       | Capped at 4999                        |

---

## Summary

- The first 20 inscriptions in each order are free.
- After the free quota, each additional inscription costs 150 sats, with a base fee of 3000 sats.
- The maximum service fee per order is capped at 4999 sats.
- Maximum 1000 inscriptions per order.

---