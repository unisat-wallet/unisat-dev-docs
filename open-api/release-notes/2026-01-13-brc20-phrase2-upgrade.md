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

### 2. Deprecated APIs (Will Be Removed)

The following APIs will be **sunset and removed** as part of this upgrade.  
Partners are advised to migrate away from them in advance.

#### 2.1 BRC20 Module History API

- **Path**
  `/v1/indexer/brc20-module/{module}/history`

- **Swagger**
  https://open-api.unisat.io/#/BRC-20/getBrc20ModuleHistoryByAddress

---

#### 2.2 BRC20 Withdraw History API

- **Path**

```
/v1/indexer/brc20-module/withdraw-history
```

- **Swagger**
  https://open-api.unisat.io/#/BRC-20/getBrc20WithdrawHistory

---

#### 2.3 BRC20 History by Tx API

- **Path**

```
/v1/indexer/brc20/{ticker}/tx/{txid}/history
```

- **Swagger**
  https://open-api.unisat.io/#/BRC-20/getBrc20HistoryByTickerAndTxid

---

### 3. Field Deprecation in Existing API

#### Affected API

```
/brc20/history-by-height
```

#### Field Changes

The following fields will **no longer return meaningful business values** and are retained **only for backward compatibility**:

- `satoshi`
- `fee`
- `overallBalance`
- `transferBalance`
- `availableBalance`
- `txidx`
- `h`

#### Return Behavior

- Fields will remain present in the response
- Values will be:
  - `0` for numeric fields
  - Empty strings for string fields
- These fields should **no longer be used for business logic**

Partners are strongly encouraged to **remove dependencies on these fields**.

---

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
