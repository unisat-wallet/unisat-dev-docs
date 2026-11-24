# Inscribe API V5 Fee Guide

This guide documents the active fee configuration for the public V5 inscription service. Fees and limits can change with a deployment, so use the matching V5 quote endpoint as the final source of the amount to pay.

## Total Amount

For a direct-payment order, the service calculates:

```text
payableAmount = outputValueFee + minerFee + serviceFee + devFee
```

- `outputValueFee`: Bitcoin value placed in the order's receiving outputs.
- `minerFee`: the sum of `ceil(virtualSize * feeRate)` for the order transactions.
- `serviceFee`: platform fee after any applicable OpenAPI allowance, promotion, or credit handling.
- `devFee`: an optional developer fee. It is added only when both `devAddress` is set and `devFee > 0`.

Quote responses return `baseServiceFee`, `serviceFee`, `minerFee`, `outputValueFee`, `devFee`, and `payableAmount`. Always pay the returned `payableAmount`, not a locally calculated estimate.

## Active Network Configuration

| Setting                           | Bitcoin OpenAPI | Fractal OpenAPI |
| --------------------------------- | --------------: | --------------: |
| Fee version                       |              V3 |              V3 |
| Base service fee                  |      3,000 sats |          0 sats |
| Per-inscription service fee       |        150 sats |    100,000 sats |
| Maximum counted inscriptions      |              33 |          10,000 |
| Maximum inscriptions per order    |           1,000 |             100 |
| Configured first-order free count |               0 |               0 |

Both environments use V3, which has no separate network service-fee surcharge. Miner fees are still charged from the actual virtual transaction sizes and requested `feeRate`.

## Standard V3 Service Fee

This applies to ordinary inscriptions, standard BRC-20 content inscriptions, Runes etch and Runes mint orders, unless a protocol-specific rule below applies.

Let `n` be the order count after any configured first-order-free allowance. In the current public configurations that allowance is zero.

### Bitcoin OpenAPI

```text
serviceFee = 3,000 + 150 * min(n, 33), for n > 0
serviceFee = 0, for n = 0
```

|       Count | Service fee |
| ----------: | ----------: |
|           1 |  3,150 sats |
|          20 |  6,000 sats |
|          33 |  7,950 sats |
| 34 to 1,000 |  7,950 sats |

`brc20_prog_deploy`, `brc20_prog_wrap`, and `brc20_prog_unwrap` use their configured fixed service fee of 3,000 sats on Bitcoin OpenAPI.

### Fractal OpenAPI

```text
serviceFee = 100,000 * n
```

The configuration counts up to 10,000 inscriptions, while the public Fractal order limit is 100. Therefore, within the public limit there is no service-fee cap.

| Count |     Service fee |
| ----: | --------------: |
|     1 |    100,000 sats |
|    10 |  1,000,000 sats |
|   100 | 10,000,000 sats |

## Protocol-Specific Service Fees

The following service-fee rules are implemented independently of the V3 values above and apply on both public environments.

### Alkanes Deploy

| Order type     | Service fee |
| -------------- | ----------: |
| Alkanes deploy |  2,000 sats |

### Alkanes Mint

| Count         |                Service fee |
| ------------- | -------------------------: |
| 1-16          | `1,000 + 150 * count` sats |
| 17-50         |  `2,500 + 80 * count` sats |
| 51-100        |  `3,500 + 80 * count` sats |
| More than 100 |                11,500 sats |

### Multi-Protocol Mint

Supported combinations are Alkanes + Runes and Alkanes + BRC-20 + Runes.

| Count         |           Alkanes + Runes |  Alkanes + BRC-20 + Runes |
| ------------- | ------------------------: | ------------------------: |
| 1-100         | `3,000 + 60 * count` sats | `3,000 + 80 * count` sats |
| 101-300       | `5,000 + 50 * count` sats | `5,000 + 65 * count` sats |
| 301-500       | `5,000 + 40 * count` sats | `5,000 + 50 * count` sats |
| More than 500 |               25,000 sats |               30,000 sats |

Bitcoin OpenAPI has a configured promotion for the Alkanes + Runes combination only. When enabled, the order has no BRC-20 mint, and the asset IDs match Runes `1:0` and Alkanes `2:0`, its base service fee is zero from `1787068800000` through `1789833599999` (exclusive end time). The quote response determines whether the promotion is active.

## Output Value Fee

The `outputValue` parameter is not a platform fee. It is Bitcoin value assigned to receive outputs and is included in the amount to pay as follows:

| Order type                           | `outputValueFee`                                                                      |
| ------------------------------------ | ------------------------------------------------------------------------------------- |
| Ordinary inscription                 | `outputValue * count`                                                                 |
| Runes etch                           | `outputValue`; plus one extra `outputValue` when the etch includes a logo inscription |
| Runes mint or Alkanes mint           | `outputValue * (1 + ceil((count - 1) / 24))`                                          |
| Alkanes deploy                       | 0                                                                                     |
| Multi-protocol mint, Alkanes + Runes | `outputValue * 2`                                                                     |
| Multi-protocol mint with BRC-20      | `outputValue * (count + 2)`                                                           |

## Quote Before Creating

Use the quote endpoint corresponding to the intended order type before creating an order:

- Ordinary inscription: `POST /v5/inscribe/order/estimate-fee`
- Runes: `POST /v5/inscribe/order/quote/runes-etch` or `POST /v5/inscribe/order/quote/runes-mint`
- Alkanes: `POST /v5/inscribe/order/quote/alkanes-deploy` or `POST /v5/inscribe/order/quote/alkanes-mint`
- Multi-protocol mint: `POST /v5/inscribe/order/quote/multi-protocol-mint`
- Repeat mint: `POST /v5/inscribe/order/quote/repeat` or `POST /v5/inscribe/order/quote/repeat/multi-protocol-mint`

Send the same `receiver`, `feeRate`, `outputValue`, `count`, `devAddress`, and `devFee` values that will be used for order creation. Quote endpoints do not create an order or consume order state.

## Discounts and Credits

The returned `serviceFee` and `payableAmount` can differ from the formulas above when a configured OpenAPI free-order allowance, Gallery promotion, or `useCredit` is applied. In particular, credit can cover the service fee while the quote still reports it as `serviceFee`. These are runtime checks, so the quote response is authoritative.
