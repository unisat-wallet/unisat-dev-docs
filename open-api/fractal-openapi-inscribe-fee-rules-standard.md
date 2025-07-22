# Fractal OpenAPI Standard Fee Rules

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

## Standard Fee Rules

- **For all orders:** 100,000 sats per inscription

> **Notes:**  
> - 1 FB = 100,000,000 sats (1 BTC)  
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

**Summary:**  
These are the standard Fractal OpenAPI fee rules, effective outside of special event periods. For event-specific rules, refer to the relevant event documentation. 