# Fractal OpenAPI Fee Rules: July 22 – Sep 30, 2024 Event

## Event Scope

- **Network:** Fractal
- **Protocols:** Ordinals (including standard inscriptions, BRC20, Runes)
- **Event Period:** July 22, 2024 – September 30, 2024

---

## Minting Quantity Limit (During Event)

- **Maximum inscriptions per order:** 1000 (increased from 100)

---

## File and Network Fee Limits

- **Maximum file size per inscription:** 390 KB
- **Maximum network fee rate:** 10,000 sat/vB

---

## Event Fee Rules

- **For n ≤ 6:** 100,000 sats per inscription
- **For n > 6:**  
  **Fee = 0.005 FB + n × 0.00025 FB, capped at the fee for 500 inscriptions**  
  (i.e., maximum fee is 0.13 FB per order)

> **Notes:**  
> - 1 FB = 100,000,000 sats (1 BTC)  
> - The fee is always rounded up to the nearest satoshi  
> - For orders above 500 inscriptions, the fee is capped at 0.13 FB

---

## Fee Calculation Formula

- **n ≤ 6:**  
  `Fee = n × 100,000 sats`
- **n > 6:**  
  `Fee = 0.005 FB + min(n, 500) × 0.00025 FB`

---

## Fee Examples

| Quantity | Fee (FB) | Fee (sats) | Notes                |
|----------|----------|------------|----------------------|
| 6        | 0.006    | 600,000    | Standard rate        |
| 10       | 0.0075   | 750,000    | Event discount       |
| 100      | 0.03     | 3,000,000  | Event discount       |
| 500      | 0.13     | 13,000,000 | Event discount, cap  |
| 1000     | 0.13     | 13,000,000 | Capped at 500 limit  |


---

**Summary:**  
During the July 22 – Sep 30, 2024 event period, Fractal OpenAPI applies a bulk discount for n > 6 and increases the minting limit to 1000 per order. After the event, standard rules will apply (see Standard Fee Rules documentation).
