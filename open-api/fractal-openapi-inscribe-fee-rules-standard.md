# Fractal OpenAPI Standard Inscribe Service Fee Rules

> **Note:**
> This document describes only the service fee (platform fee) for inscribe orders. The total amount to pay for an order also includes the minimum UTXO required for all inscriptions (minUtxoTotal), the estimated miner fee (networkSats), and any developer fee (devFee). For the full payment formula, see the [Inscribe FAQ](./inscribe-faq.md).

## Scope

- **Network:** Fractal
- **Protocols:** Ordinals (including standard inscriptions, BRC20, Runes)

---

## Minting Quantity Limit

- **Maximum inscriptions per order:** 100

---

## File and Network Fee Limits

- **Maximum file size per inscription:** 390 KB
- **Maximum network fee rate:** 10,000 sat/vB

---

## Service Fee Rules (Standard)

- **For all orders:** 100,000 sats per inscription

> **Notes:**  
> - 1 FB = 100,000,000 sats   
> - The fee is always rounded up to the nearest satoshi

---

## Fee Calculation Formula

`Fee = n × 100,000 sats`

---

## Fee Examples

| Quantity | Fee (FB) | Fee (sats) |
|----------|----------|------------|
| 1        | 0.001    | 100,000    |
| 6        | 0.006    | 600,000    |
| 10       | 0.01     | 1,000,000  |
| 100      | 0.1      | 10,000,000 |

---

## Additional Notes

- No client type distinction: Web and App use the same rule
- No special discount for high-point users
- Points rule: 1 point per 100 inscriptions
- All fees are settled in sats, rounded up

---

**Summary:**  
This document describes only the service fee (platform fee) for inscribe orders. The total amount to pay also includes minUtxoTotal, networkSats, and devFee. For the full payment formula, see the [Inscribe FAQ](./inscribe-faq.md). For event-specific rules, refer to the relevant event documentation. 