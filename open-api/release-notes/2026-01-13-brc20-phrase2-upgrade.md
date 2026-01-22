# UniSat Open API Upgrade Notice (BRC20 Indexer 2.0)

## Background

UniSat is planning an upgrade to the **BRC20 indexing service (Indexer 2.0)**.
This upgrade focuses on improving **indexing stability, data consistency, and long-term maintainability**.

Based on our current assessment, **this upgrade does NOT affect core deposit and withdrawal workflows**.
However, as some APIs will be deprecated and certain fields will be retired, **technical confirmation and adaptation by partner teams is still required**.

---

## Upgrade Plan

- **Activation Height**: `2026-02-01`
- **Early API Upgrade**:
  The new indexer APIs will be rolled out **approximately one week before the activation height** to allow partners to perform integration testing and validation.
- **Full Activation**:
  After the activation height, the new indexing logic will become the default behavior.

---

## Staging Environment

To support partner testing and smooth migration, a **new staging endpoint** will be provided:

- **Production Endpoint**

```
https://open-api.unisat.io
```

- **Staging Endpoint (for upgrade testing)**

```
https://open-api-staging.unisat.io
```

The `staging` environment is intended for:

- API upgrade validation
- Field and behavior compatibility checks
- Pre-production integration testing

> The changes described below are **not yet live in production**, but are **already available on the staging endpoint** and are expected to be released to production within **1–2 weeks**.

---

## Major Changes

### 1. BRC20 Token Recognition No Longer Supports Mempool Transactions

- **Change**
  BRC20 token recognition will **no longer include mempool (unconfirmed) transactions**.
- **Impact**
- Only **confirmed on-chain transactions** will be indexed
- Unconfirmed mempool transactions will not affect BRC20 state
- **Rationale**
- Improve data consistency
- Avoid state inconsistencies caused by mempool reorgs or dropped transactions

---

### 2. BRC20-prog Route Interface Deprecation

- **Change**
  The previous `/brc20-prog/` route interface will be **deprecated** (will be retained for 1-2 weeks) and merged into `/brc20/` related interfaces.
- **Timeline**
  The `/brc20-prog/` route will be available for **1-2 weeks** before complete removal.
- **Migration**
  Partners should migrate to the corresponding `/brc20/` interfaces.

---

### 3. New Tick Filter Parameter for Selective BRC20 Queries

The following APIs now support a `tick_filter` parameter to control which BRC20 token lengths are returned:

- `/brc20/status`
- `/brc20/list`
- `/address/{address}/brc20/summary`
- `/address/{address}/brc20/summary-by-height/{height}`

#### Tick Filter Type Enum

```
enum TickFilterType {
  TICK_4_BYTE = 8,   // 0b1000
  TICK_5_BYTE = 16,  // 0b10000
  TICK_6_BYTE = 32   // 0b100000
}
```

#### Usage Examples

- `tick_filter=8` - Returns only 4-character BRC20 tokens
- `tick_filter=24` - Returns 4 and 5-character BRC20 tokens (bitwise combination: 8 | 16)
- `tick_filter=56` - Returns 4, 5, and 6-character BRC20 tokens (bitwise combination: 8 | 16 | 32)

> Note:

1. The default value for `tick_filter` is 8, meaning it defaults to returning only 4-character BRC20 tokens.
2. All other interfaces will continue to return all BRC20 token lengths (4, 5, 6 characters) by default.

---

### 4. Deprecated APIs (Will Be Removed)

The following APIs will be **sunset and removed** as part of this upgrade.
Partners are advised to migrate away from them in advance.

#### 4.1 BRC20 Module History API

- **Path**
  `/v1/indexer/brc20-module/{module}/history`

- **Swagger**
  https://open-api.unisat.io/#/BRC-20/getBrc20ModuleHistoryByAddress

---

#### 4.2 BRC20 Withdraw History API

- **Path**

```
/v1/indexer/brc20-module/withdraw-history
```

- **Swagger**
  https://open-api.unisat.io/#/BRC-20/getBrc20WithdrawHistory

---

#### 4.3 BRC20 History by Tx API

- **Path**

```
/v1/indexer/brc20/{ticker}/tx/{txid}/history
```

- **Swagger**
  https://open-api.unisat.io/#/BRC-20/getBrc20HistoryByTickerAndTxid

---

### 5. Field Deprecation in Existing API

#### 5.1 BRC20 History by Height/ticker
```
/brc20/history-by-height
/brc20/:ticker/history
```

#### Field Changes

The following fields will **no longer return meaningful business values** and are retained **only for backward compatibility**:

- `satoshi`
- `fee`
- `overallBalance`
- `transferBalance`
- `availableBalance`
- `h`

#### 5.2 BRC20 History by address
```
/address/:address/brc20/history
```

#### Field Changes

The following fields will **no longer return meaningful business values** and are retained **only for backward compatibility**:

- `satoshi`
- `fee`
- `h`

#### 5.3 Address ticker info
```
/address/:address/brc20/:ticker/info
```

#### Field Changes

The following fields will **no longer return meaningful business values** and are retained **only for backward compatibility**:

- `historyCount`
- `historyInscriptions`

#### Return Behavior

- Fields will remain present in the response
- Values will be:
  - `0` for numeric fields
  - Empty strings for string fields
  - Empty strings list from []string fields
- These fields should **no longer be used for business logic**

Partners are strongly encouraged to **remove dependencies on these fields**.

## Stability & Risk Notice

During the **early phase of the upgrade**, the BRC20 Indexer 2.0 may require:

- Data corrections
- Hotfix releases
- Short-term maintenance operations

If such actions are required, **UniSat will notify partners as early as possible**.

We recommend partners:

- Prepare appropriate **risk-control and monitoring measures**
- Avoid strong dependency on **non-core index data** during the upgrade window

---

## Summary

- Core deposit and withdrawal flows are **not impacted**
- Some APIs will be **deprecated and removed**
- Certain fields will be **retired but backward-compatible**
- A **staging environment** is available for early testing

Please complete your upgrade validation and reach out to the UniSat technical team if any clarification is required.
