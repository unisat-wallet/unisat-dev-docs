# BRC20 Swap API

BRC20 Swap API provides a set of Fractal-only interfaces for BRC20 Swap and InSwap services. BRC20 Swap and InSwap are equivalent product names; user requests that mention InSwap should be routed to these /v1/brc20-swap/* endpoints. It allows users to interact with the BRC20 Swap ecosystem, including balance checks, pool information, liquidity management, quote/preparation steps, liquidity operations, swap operations, and token transfers.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [GET `/v1/brc20-swap/config`](#get-inswap-module-fee-tick-and-deposit-confirmation-config) | Get InSwap module, fee tick, and deposit confirmation config |
| [GET `/v1/brc20-swap/balance`](#get-an-addresss-inswap-balance-for-one-tick) | Get an address's InSwap balance for one tick |
| [GET `/v1/brc20-swap/all_balance`](#list-all-inswap-balances-for-an-address) | List all InSwap balances for an address |
| [GET `/v1/brc20-swap/pool_info`](#get-pool-liquidity-volume-and-reward-details-for-a-pair) | Get pool liquidity, volume, and reward details for a pair |
| [GET `/v1/brc20-swap/select`](#list-address-ticks-available-for-inswap-trading) | List address ticks available for InSwap trading |
| [GET `/v1/brc20-swap/pre_deploy_pool`](#prepare-signatures-and-fees-for-deploying-an-inswap-pool) | Prepare signatures and fees for deploying an InSwap pool |
| [POST `/v1/brc20-swap/deploy_pool`](#submit-a-signed-inswap-pool-deployment) | Submit a signed InSwap pool deployment |
| [GET `/v1/brc20-swap/pre_add_liq`](#prepare-signatures-and-fee-data-for-adding-liquidity) | Prepare signatures and fee data for adding liquidity |
| [POST `/v1/brc20-swap/add_liq`](#submit-a-signed-inswap-add-liquidity-operation) | Submit a signed InSwap add-liquidity operation |
| [GET `/v1/brc20-swap/pre_remove_liq`](#prepare-signatures-and-fee-data-for-removing-liquidity) | Prepare signatures and fee data for removing liquidity |
| [POST `/v1/brc20-swap/remove_liq`](#submit-a-signed-inswap-remove-liquidity-operation) | Submit a signed InSwap remove-liquidity operation |
| [GET `/v1/brc20-swap/pre_send`](#prepare-signatures-and-fees-for-an-inswap-token-transfer) | Prepare signatures and fees for an InSwap token transfer |
| [POST `/v1/brc20-swap/pre_batch_send`](#prepare-signatures-and-fees-for-batch-inswap-transfers) | Prepare signatures and fees for batch InSwap transfers |
| [GET `/v1/brc20-swap/pre_swap`](#prepare-signatures-and-fees-for-an-inswap-token-swap) | Prepare signatures and fees for an InSwap token swap |
| [POST `/v1/brc20-swap/send`](#submit-a-signed-inswap-token-transfer) | Submit a signed InSwap token transfer |
| [POST `/v1/brc20-swap/batch_send`](#submit-signed-batch-inswap-token-transfers) | Submit signed batch InSwap token transfers |
| [POST `/v1/brc20-swap/swap`](#submit-a-signed-inswap-token-swap) | Submit a signed InSwap token swap |
| [GET `/v1/brc20-swap/pool_list`](#list-inswap-pools-with-tvl-volume-and-reserves) | List InSwap pools with TVL, volume, and reserves |
| [GET `/v1/brc20-swap/my_pool_list`](#list-an-addresss-inswap-liquidity-positions) | List an address's InSwap liquidity positions |
| [GET `/v1/brc20-swap/my_pool`](#get-an-addresss-inswap-position-in-one-pool) | Get an address's InSwap position in one pool |
| [GET `/v1/brc20-swap/overview`](#get-inswap-liquidity-volume-transaction-and-pair-totals) | Get InSwap liquidity, volume, transaction, and pair totals |
| [GET `/v1/brc20-swap/gas_history`](#list-inswap-gas-fee-history) | List InSwap gas fee history |
| [GET `/v1/brc20-swap/send_history`](#list-inswap-token-transfer-history) | List InSwap token transfer history |
| [GET `/v1/brc20-swap/liq_history`](#list-inswap-addremove-liquidity-history) | List InSwap add/remove liquidity history |
| [GET `/v1/brc20-swap/swap_history`](#list-inswap-token-swap-history) | List InSwap token swap history |
| [GET `/v1/brc20-swap/rollup_history`](#list-inswap-rollup-inscription-history) | List InSwap rollup inscription history |
| [GET `/v1/brc20-swap/deposit_list`](#list-inswap-deposit-records-for-an-address) | List InSwap deposit records for an address |
| [GET `/v1/brc20-swap/create_deposit`](#build-an-inswap-deposit-psbt-or-bridge-deposit-draft) | Build an InSwap deposit PSBT or bridge deposit draft |
| [POST `/v1/brc20-swap/confirm_deposit`](#submit-a-signed-inswap-deposit-confirmation) | Submit a signed InSwap deposit confirmation |
| [GET `/v1/brc20-swap/system_status`](#check-whether-inswap-rollup-committing-is-active) | Check whether InSwap rollup committing is active |
| [GET `/v1/brc20-swap/withdraw_history`](#list-inswap-withdrawal-records-for-an-address) | List InSwap withdrawal records for an address |
| [GET `/v1/brc20-swap/create_retry_withdraw`](#build-payment-and-approve-psbts-for-retrying-a-withdrawal) | Build payment and approve PSBTs for retrying a withdrawal |
| [POST `/v1/brc20-swap/confirm_retry_withdraw`](#submit-signed-psbts-to-retry-an-inswap-withdrawal) | Submit signed PSBTs to retry an InSwap withdrawal |
| [GET `/v1/brc20-swap/create_withdraw`](#build-inswap-withdrawal-signing-data) | Build InSwap withdrawal signing data |
| [POST `/v1/brc20-swap/confirm_withdraw`](#submit-a-signed-inswap-withdrawal-confirmation) | Submit a signed InSwap withdrawal confirmation |
| [GET `/v1/brc20-swap/withdraw_process`](#get-confirmation-progress-for-an-inswap-withdrawal) | Get confirmation progress for an InSwap withdrawal |
| [GET `/v1/brc20-swap/quote_swap`](#quote-expected-output-for-an-inswap-token-swap) | Quote expected output for an InSwap token swap |
| [GET `/v1/brc20-swap/quote_add_liq`](#quote-required-amounts-and-lp-for-adding-liquidity) | Quote required amounts and LP for adding liquidity |
| [GET `/v1/brc20-swap/quote_remove_liq`](#quote-token-outputs-for-removing-inswap-liquidity) | Quote token outputs for removing InSwap liquidity |
| [GET `/v1/brc20-swap/pre_stake`](#prepare-signatures-and-fees-for-staking-inswap-lp) | Prepare signatures and fees for staking InSwap LP |
| [GET `/v1/brc20-swap/pre_unstake`](#prepare-signatures-and-fees-for-unstaking-inswap-lp) | Prepare signatures and fees for unstaking InSwap LP |
| [GET `/v1/brc20-swap/pre_claim`](#prepare-signatures-and-fees-for-claiming-inswap-rewards) | Prepare signatures and fees for claiming InSwap rewards |
| [GET `/v1/brc20-swap/pre_send_lp`](#prepare-signatures-and-fees-for-transferring-lp-tokens) | Prepare signatures and fees for transferring LP tokens |
| [POST `/v1/brc20-swap/send_lp`](#submit-a-signed-inswap-lp-token-transfer) | Submit a signed InSwap LP token transfer |
| [POST `/v1/brc20-swap/stake`](#submit-a-signed-inswap-lp-stake-operation) | Submit a signed InSwap LP stake operation |
| [POST `/v1/brc20-swap/unstake`](#submit-a-signed-inswap-lp-unstake-operation) | Submit a signed InSwap LP unstake operation |
| [POST `/v1/brc20-swap/claim`](#submit-a-signed-inswap-reward-claim) | Submit a signed InSwap reward claim |
| [GET `/v1/brc20-swap/lp_reward_history`](#list-lp-reward-history-for-an-inswap-pool-position) | List LP reward history for an InSwap pool position |
| [GET `/v1/brc20-swap/stake_history`](#list-inswap-stake-unstake-and-claim-history) | List InSwap stake, unstake, and claim history |
| [GET `/v1/brc20-swap/stake_list`](#list-active-inswap-staking-campaigns-and-reward-pools) | List active InSwap staking campaigns and reward pools |
| [GET `/v1/brc20-swap/stake_item`](#get-one-inswap-staking-campaign-by-event-id) | Get one InSwap staking campaign by event id |
| [GET `/v1/brc20-swap/stake_user_info`](#get-staking-related-inswap-user-information) | Get staking-related InSwap user information |
| [GET `/v1/brc20-swap/user_info`](#get-an-addresss-default-inswap-fee-payment-settings) | Get an address's default InSwap fee payment settings |
| [GET `/v1/brc20-swap/select_deposit`](#get-deposit-selection-data-for-an-inswap-address) | Get deposit selection data for an InSwap address |
| [GET `/v1/brc20-swap/func_info`](#get-execution-details-for-one-inswap-function-id) | Get execution details for one InSwap function id |
| [GET `/v1/brc20-swap/deposit_balance`](#get-depositable-balance-data-for-one-tick) | Get depositable balance data for one tick |
| [GET `/v1/brc20-swap/deposit_process`](#get-confirmation-progress-for-an-inswap-deposit) | Get confirmation progress for an InSwap deposit |
| [GET `/v1/brc20-swap/tick_price`](#get-the-current-inswap-price-for-one-tick) | Get the current InSwap price for one tick |
| [GET `/v1/brc20-swap/address_gas`](#get-an-addresss-available-fee-tick-gas-amount) | Get an address's available fee-tick gas amount |
| [GET `/v1/brc20-swap/price_line`](#get-historical-inswap-price-points-for-a-pair) | Get historical InSwap price points for a pair |
| [GET `/v1/brc20-swap/tick_holders`](#list-top-holders-for-an-inswap-tick) | List top holders for an InSwap tick |
| [GET `/v1/brc20-swap/pool_holders`](#list-lp-holders-for-an-inswap-pool) | List LP holders for an InSwap pool |
| [GET `/v1/brc20-swap/reward_curve`](#get-inswap-reward-curve-data-for-a-pool-position) | Get InSwap reward curve data for a pool position |
| [GET `/v1/brc20-swap/send_lp_history`](#list-inswap-lp-token-transfer-history) | List InSwap LP token transfer history |
| [GET `/v1/brc20-swap/burn_history`](#list-inswap-lp-burn-history-and-burn-totals) | List InSwap LP burn history and burn totals |
| [GET `/v1/brc20-swap/task_list`](#list-inswap-task-completion-items-for-an-address) | List InSwap task completion items for an address |
| [GET `/v1/brc20-swap/address_usd`](#get-an-addresss-inswap-asset-and-lp-usd-values) | Get an address's InSwap asset and LP USD values |
| [GET `/v1/brc20-swap/pre_lock_lp`](#prepare-signatures-and-fees-for-locking-inswap-lp) | Prepare signatures and fees for locking InSwap LP |
| [POST `/v1/brc20-swap/lock_lp`](#submit-a-signed-inswap-lp-lock-operation) | Submit a signed InSwap LP lock operation |
| [GET `/v1/brc20-swap/pre_unlock_lp`](#prepare-signatures-and-fees-for-unlocking-inswap-lp) | Prepare signatures and fees for unlocking InSwap LP |
| [POST `/v1/brc20-swap/unlock_lp`](#submit-a-signed-inswap-lp-unlock-operation) | Submit a signed InSwap LP unlock operation |
| [GET `/v1/brc20-swap/lock_lp_history`](#list-inswap-lp-lock-history) | List InSwap LP lock history |
| [GET `/v1/brc20-swap/unlock_lp_history`](#list-inswap-lp-unlock-history) | List InSwap LP unlock history |
| [GET `/v1/brc20-swap/export_lock_lp_history`](#export-inswap-lp-lock-history-as-csv) | Export InSwap LP lock history as CSV |
| [GET `/v1/brc20-swap/my_lock_lp`](#get-an-addresss-locked-and-available-lp-for-a-pool) | Get an address's locked and available LP for a pool |
| [GET `/v1/brc20-swap/select_pool`](#list-routed-pool-candidates-for-an-inswap-trade) | List routed pool candidates for an InSwap trade |
| [GET `/v1/brc20-swap/pre_multi_swap`](#prepare-signatures-and-fees-for-a-multi-hop-inswap-swap) | Prepare signatures and fees for a multi-hop InSwap swap |
| [POST `/v1/brc20-swap/multi_swap`](#submit-signed-multi-hop-inswap-swaps) | Submit signed multi-hop InSwap swaps |
| [GET `/v1/brc20-swap/quote_multi_swap`](#quote-expected-output-and-route-amounts-for-a-multi-hop-swap) | Quote expected output and route amounts for a multi-hop swap |
| [GET `/v1/brc20-swap/multi_swap_history`](#list-inswap-multi-hop-swap-history) | List InSwap multi-hop swap history |
| [POST `/v1/brc20-swap/batch_history`](#fetch-multiple-inswap-history-categories-in-one-request) | Fetch multiple InSwap history categories in one request |

---

## Swap-BRC20

### Get InSwap module, fee tick, and deposit confirmation config
<a id="get-inswap-module-fee-tick-and-deposit-confirmation-config"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/config`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapConfig)  

#### Description
Returns Fractal BRC20 Swap service settings, including module id, service gas tick, and confirmation thresholds for direct and matching deposits.

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `moduleId` (string):
  - `serviceGasTick` (string): The tick used for the second layer gas.
  - `pendingDepositDirectNum` (number): Number of confirmations required for direct deposit.
  - `pendingDepositMatchingNum` (number): Number of confirmations required for matching deposit.


---

### Get an address's InSwap balance for one tick
<a id="get-an-addresss-inswap-balance-for-one-tick"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/balance`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapBalance)  

#### Description
Returns module, swap, pending-swap, and pending-available balances plus decimal precision for a specific address and token tick.

#### Parameters
- `address` (query, string) **(required)**: 
- `tick` (query, string) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `balance` (object):
    - `module` (string): Confirmed module balance.
    - `swap` (string): Confirmed swap balance.
    - `pendingSwap` (string): The balance converted from pending to swap.
    - `pendingAvailable` (string): The balance converted from pending to module.
  - `decimal` (string):


---

### List all InSwap balances for an address
<a id="list-all-inswap-balances-for-an-address"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/all_balance`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapAllBalances)  

#### Description
Returns a ticker-keyed balance map with module, swap, pending balances, decimals, asset type, network type, and optional price metadata.

#### Parameters
- `address` (query, string) **(required)**: 
- `pubkey` (query, string): 

#### Response (200)
Successful response returning all token balances for the address.

- `code` (number): required
- `msg` (string): required
- `data` (object): required; A map where each key is a token ticker symbol.


---

### Get pool liquidity, volume, and reward details for a pair
<a id="get-pool-liquidity-volume-and-reward-details-for-a-pair"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pool_info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapPoolInfo)  

#### Description
Returns pair-level pool metadata, including whether the pool exists, token reserves, LP supply, TVL, recent volume, reward fields, and per-token asset metadata.

#### Parameters
- `tick0` (query, string): 
- `tick1` (query, string): 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `existed` (boolean): Is the pool existed
  - `addLiq` (boolean): Has LP been added to the pool
  - `tick0` (string):
  - `tick1` (string):
  - `lp` (string): Quantity of pool lp
  - `tvl` (string):
  - `volume24h` (string):
  - `volume7d` (string):
  - `reward0` (string):
  - `reward1` (string):
  - `activedPid` (string): Active pool ID
  - `marketCap` (number): Market cap
  - `marketCapTick` (string): Market cap tick
  - `networkType0` (string): Network type for tick0
  - `networkType1` (string): Network type for tick1
  - `assetType0` (string): Asset type for tick0
  - `assetType1` (string): Asset type for tick1
  - `l1Tick0` (string): L1 tick0
  - `l1Tick1` (string): L1 tick1
  - `amount0` (string): Amount of tick0
  - `amount1` (string): Amount of tick1
  - `volume30d` (string): 30 days volume


---

### List address ticks available for InSwap trading
<a id="list-address-ticks-available-for-inswap-trading"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/select`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapSelect)  

#### Description
Returns BRC-20 ticks available to an address for swap operations, including decimal precision, module balance, and swap balance.

#### Parameters
- `address` (query, string) **(required)**: 
- `search` (query, string): Fuzzy matching

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (array):
  - `tick` (string):
  - `decimal` (string):
  - `brc20Balance` (string): Module balance (not participate in swap calculations)
  - `swapBalance` (string): Swap balance


---

### Prepare signatures and fees for deploying an InSwap pool
<a id="prepare-signatures-and-fees-for-deploying-an-inswap-pool"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pre_deploy_pool`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapPreDeployPool)  

#### Description
Returns signature ids, sign messages, fee amount, fee tick price, fee balance, and USD fee value needed before submitting a pool deployment.

#### Parameters
- `address` (query, string) **(required)**: 
- `tick0` (query, string) **(required)**: 
- `tick1` (query, string) **(required)**: 
- `ts` (query, number) **(required)**: Timestamp (seconds)
- `feeTick` (query, string) **(required)**: Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
- `payType` (query, string): Pay type. Allowed values are tick and freeQuota.; enum: `tick`, `freeQuota`

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `ids` (array): User signature id
  - `signMsgs` (array): User signature information
  - `feeAmount` (string): The fee that the user needs to pay
  - `feeTickPrice` (string): The price of fee tick
  - `feeBalance` (string): The user's fee tick balance
  - `usdPrice` (string): The dollar value of the fee
  - `feeTick` (string): Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
  - `totalFreeQuota` (string): Total free quota
  - `remainingFreeQuota` (string): Remaining free quota
  - `totalUsedFreeQuota` (string): Total used free quota
  - `usageFreeQuota` (string): Usage free quota
  - `hasVoucher` (boolean): Has voucher
  - `assetFeeAmount` (string): Asset fee amount
  - `assetFeeTick` (string): Asset fee tick
  - `assetFeeTickPrice` (string): Asset fee tick price
  - `assetFeeTickBalance` (string): Asset fee tick balance


---

### Submit a signed InSwap pool deployment
<a id="submit-a-signed-inswap-pool-deployment"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/deploy_pool`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/postBrc20SwapDeployPool)  

#### Description
Creates a new swap pool using prepared signature data, token pair, timestamp, fee tick, and fee payment fields. Review the pair, fee amount, and signatures before submission.

#### Request Body
Content-Type: `application/json` **(required)**

- `address` (string): required
- `tick0` (string): required
- `tick1` (string): required
- `ts` (number): required; Timestamp (seconds)
- `feeTick` (string): required; Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
- `feeAmount` (string): required; The fee that the user needs to pay
- `feeTickPrice` (string): required; The price of fee tick
- `sigs` (array): User signature
- `payType` (string): Pay type. Allowed values are tick and freeQuota.; enum: `tick`, `freeQuota`
- `rememberPayType` (boolean):

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):


---

### Prepare signatures and fee data for adding liquidity
<a id="prepare-signatures-and-fee-data-for-adding-liquidity"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pre_add_liq`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapPreAddLiq)  

#### Description
Returns signature ids, sign messages, fee fields, and pool-share preparation data for adding two token amounts into an InSwap liquidity pool.

#### Parameters
- `address` (query, string) **(required)**: 
- `tick0` (query, string) **(required)**: 
- `tick1` (query, string) **(required)**: 
- `amount0` (query, string) **(required)**: Input amount of tick0
- `amount1` (query, string) **(required)**: Input amount of tick1
- `lp` (query, string) **(required)**: Expect amount of lp
- `slippage` (query, string) **(required)**: 
- `ts` (query, number) **(required)**: Timestamp (seconds)
- `feeTick` (query, string) **(required)**: Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
- `payType` (query, string): Pay type. Allowed values are tick and freeQuota.; enum: `tick`, `freeQuota`

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `ids` (array): User signature id
  - `signMsgs` (array): User signature information
  - `feeAmount` (string): The fee that the user needs to pay
  - `feeTickPrice` (string): The price of fee tick
  - `feeBalance` (string): The user's fee tick balance
  - `usdPrice` (string): The dollar value of the fee
  - `feeTick` (string): Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
  - `totalFreeQuota` (string): Total free quota
  - `remainingFreeQuota` (string): Remaining free quota
  - `totalUsedFreeQuota` (string): Total used free quota
  - `usageFreeQuota` (string): Usage free quota
  - `hasVoucher` (boolean): Has voucher
  - `assetFeeAmount` (string): Asset fee amount
  - `assetFeeTick` (string): Asset fee tick
  - `assetFeeTickPrice` (string): Asset fee tick price
  - `assetFeeTickBalance` (string): Asset fee tick balance


---

### Submit a signed InSwap add-liquidity operation
<a id="submit-a-signed-inswap-add-liquidity-operation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/add_liq`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/postBrc20SwapAddLiq)  

#### Description
Adds token amounts to a liquidity pool using prepared signatures, fee fields, and slippage controls. Review both token amounts, expected LP, fee payment, and signatures before submission.

#### Request Body
Content-Type: `application/json` **(required)**

- `address` (string): required
- `tick0` (string): required
- `tick1` (string): required
- `amount0` (string): required; Input amount of tick0
- `amount1` (string): required; Input amount of tick1
- `lp` (string): required
- `slippage` (string): required
- `ts` (number): required; Timestamp (seconds)
- `feeTick` (string): required; Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
- `feeAmount` (string): required; The fee that the user needs to pay
- `feeTickPrice` (string): required; The price of fee tick
- `sigs` (array): User signature
- `payType` (string): Pay type. Allowed values are tick and freeQuota.; enum: `tick`, `freeQuota`
- `rememberPayType` (boolean):

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `id` (string): Function id
  - `rollupInscriptionId` (string): The rollup inscription id where the function is located
  - `address` (string):
  - `type` (string):
  - `tick0` (string):
  - `tick1` (string):
  - `amount0` (string): required; Input amount of tick0
  - `amount1` (string): required; Input amount of tick1
  - `lp` (string):
  - `ts` (number):
  - `success` (boolean): Operation success status
  - `value` (number): Operation value
  - `preResult` (object): Pre-operation result
  - `result` (object): Operation result


---

### Prepare signatures and fee data for removing liquidity
<a id="prepare-signatures-and-fee-data-for-removing-liquidity"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pre_remove_liq`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapPreRemoveLiq)  

#### Description
Returns signature ids, sign messages, fee fields, and expected token amounts for removing LP from an InSwap liquidity pool.

#### Parameters
- `address` (query, string) **(required)**: 
- `tick0` (query, string) **(required)**: 
- `tick1` (query, string) **(required)**: 
- `amount0` (query, string) **(required)**: Input amount of tick0
- `amount1` (query, string) **(required)**: Input amount of tick1
- `lp` (query, string) **(required)**: 
- `slippage` (query, string) **(required)**: 
- `ts` (query, number) **(required)**: 
- `feeTick` (query, string) **(required)**: Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
- `payType` (query, string): Pay type. Allowed values are tick and freeQuota.; enum: `tick`, `freeQuota`

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `ids` (array): User signature id
  - `signMsgs` (array): User signature information
  - `feeAmount` (string): The fee that the user needs to pay
  - `feeTickPrice` (string): The price of fee tick
  - `feeBalance` (string): The user's fee tick balance
  - `usdPrice` (string): The dollar value of the fee
  - `feeTick` (string): Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
  - `totalFreeQuota` (string): Total free quota
  - `remainingFreeQuota` (string): Remaining free quota
  - `totalUsedFreeQuota` (string): Total used free quota
  - `usageFreeQuota` (string): Usage free quota
  - `hasVoucher` (boolean): Has voucher
  - `assetFeeAmount` (string): Asset fee amount
  - `assetFeeTick` (string): Asset fee tick
  - `assetFeeTickPrice` (string): Asset fee tick price
  - `assetFeeTickBalance` (string): Asset fee tick balance
  - `reward0` (string): Reward amount for tick0
  - `reward1` (string): Reward amount for tick1


---

### Submit a signed InSwap remove-liquidity operation
<a id="submit-a-signed-inswap-remove-liquidity-operation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/remove_liq`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/postBrc20SwapRemoveLiq)  

#### Description
Removes LP from a liquidity pool using prepared signatures and fee fields, returning execution metadata. Review LP amount, expected token outputs, fee payment, and signatures before submission.

#### Request Body
Content-Type: `application/json` **(required)**

- `address` (string): required
- `tick0` (string): required
- `tick1` (string): required
- `lp` (string): required
- `amount0` (string): required; Input amount of tick0
- `amount1` (string): required; Input amount of tick1
- `slippage` (string): required
- `ts` (number): required; Timestamp (seconds)
- `feeTick` (string): required; Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
- `feeAmount` (string): required; The fee that the user needs to pay
- `feeTickPrice` (string): required; The price of fee tick
- `sigs` (array): User signature
- `payType` (string): Pay type. Allowed values are tick and freeQuota.; enum: `tick`, `freeQuota`
- `rememberPayType` (boolean):

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `id` (string): Function id
  - `rollupInscriptionId` (string): The rollup inscription id where the function is located
  - `address` (string):
  - `type` (string):
  - `tick0` (string):
  - `tick1` (string):
  - `amount0` (string): required; Input amount of tick0
  - `amount1` (string): required; Input amount of tick1
  - `lp` (string):
  - `ts` (number):
  - `success` (boolean): Operation success status
  - `value` (number): Operation value
  - `preResult` (object): Pre-operation result
  - `result` (object): Operation result


---

### Prepare signatures and fees for an InSwap token transfer
<a id="prepare-signatures-and-fees-for-an-inswap-token-transfer"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pre_send`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapPreSend)  

#### Description
Returns signature ids, sign messages, fee amount, fee tick price, fee balance, and USD fee value for transferring a tick amount to a recipient.

#### Parameters
- `address` (query, string) **(required)**: 
- `tick` (query, string) **(required)**: Send tick
- `amount` (query, string) **(required)**: The amount of send tick
- `to` (query, string) **(required)**: The receiver of send tick
- `ts` (query, number) **(required)**: Timestamp (seconds)
- `feeTick` (query, string) **(required)**: Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
- `payType` (query, string): Pay type. Allowed values are tick and freeQuota.; enum: `tick`, `freeQuota`

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `ids` (array): User signature id
  - `signMsgs` (array): User signature information
  - `feeAmount` (string): The fee that the user needs to pay
  - `feeTickPrice` (string): The price of fee tick
  - `feeBalance` (string): The user's fee tick balance
  - `usdPrice` (string): The dollar value of the fee


---

### Prepare signatures and fees for batch InSwap transfers
<a id="prepare-signatures-and-fees-for-batch-inswap-transfers"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/pre_batch_send`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/postBrc20SwapPreBatchSend)  

#### Description
Returns per-item signature ids, sign messages, and fee metadata for transferring multiple tick amounts to recipients in one batch workflow.

#### Request Body
Content-Type: `application/json` **(required)**

- `address` (string): required
- `tick` (string): required; Send tick
- `amount` (string): The amount of send tick. Either amount or amountList must be provided.
- `amountList` (array): Optional per-recipient amounts. When provided, its length must match to.
- `to` (array): The receiver of send tick
- `ts` (number): required; Timestamp (seconds)
- `feeTick` (string): required; Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
- `payType` (string): Pay type. Allowed values are tick and freeQuota.; enum: `tick`, `freeQuota`

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `ids` (array): User signature id
  - `signMsgs` (array): User signature information
  - `feeAmount` (string): The fee that the user needs to pay
  - `feeTickPrice` (string): The price of fee tick
  - `feeBalance` (string): The user's fee tick balance
  - `usdPrice` (string): The dollar value of the fee


---

### Prepare signatures and fees for an InSwap token swap
<a id="prepare-signatures-and-fees-for-an-inswap-token-swap"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pre_swap`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapPreSwap)  

#### Description
Returns signature ids, sign messages, fee fields, and fee-balance metadata for a quoted swap between input and output ticks.

#### Parameters
- `address` (query, string) **(required)**: 
- `tickIn` (query, string) **(required)**: Input tick
- `tickOut` (query, string) **(required)**: Output tick
- `amountIn` (query, string) **(required)**: The amount of input tick
- `amountOut` (query, string) **(required)**: The amount of output tick
- `slippage` (query, string) **(required)**: 
- `exactType` (query, string) **(required)**: enum: `exactIn`, `exactOut`; example: `"exactIn"`
- `ts` (query, number) **(required)**: Timestamp(seconds)
- `feeTick` (query, string) **(required)**: Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
- `payType` (query, string): Pay type. Allowed values are tick, freeQuota, and assetFeeTick.; enum: `tick`, `freeQuota`, `assetFeeTick`

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `ids` (array): User signature id
  - `signMsgs` (array): User signature information
  - `feeAmount` (string): The fee that the user needs to pay
  - `feeTickPrice` (string): The price of fee tick
  - `feeBalance` (string): The user's fee tick balance
  - `usdPrice` (string): The dollar value of the fee


---

### Submit a signed InSwap token transfer
<a id="submit-a-signed-inswap-token-transfer"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/send`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/postBrc20SwapSend)  

#### Description
Transfers a tick amount from an address to one or more recipients using prepared signatures and fee fields. Review recipients, amounts, fee payment, and signatures before submission.

#### Request Body
Content-Type: `application/json` **(required)**

- `address` (string): required
- `tick` (string): required; Send tick
- `amount` (string): The amount of send tick. Either amount or amountList must be provided.
- `amountList` (array): Optional per-recipient amounts. When provided, its length must match to.
- `to` (string): required; The receiver of send tick
- `ts` (number): required; Timestamp (seconds)
- `feeTick` (string): required; Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
- `feeAmount` (string): required; The fee that the user needs to pay
- `feeTickPrice` (string): required; The price of fee tick
- `sigs` (array): User signature
- `payType` (string): Pay type. Allowed values are tick and freeQuota.; enum: `tick`, `freeQuota`
- `rememberPayType` (boolean):

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):


---

### Submit signed batch InSwap token transfers
<a id="submit-signed-batch-inswap-token-transfers"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/batch_send`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/postBrc20SwapBatchSend)  

#### Description
Executes multiple prepared tick transfers in one request using per-item signatures and fee fields. Review every recipient, amount, fee payment, and signature before submission.

#### Request Body
Content-Type: `application/json` **(required)**

- `address` (string): required
- `tick` (string): required; Send tick
- `amount` (string): required; The amount of send tick
- `to` (array): The receiver of send tick
- `ts` (number): required; Timestamp (seconds)
- `feeTick` (string): required; Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
- `feeAmount` (string): required; The fee that the user needs to pay
- `feeTickPrice` (string): required; The price of fee tick
- `sigs` (array): User signature
- `payType` (string): Pay type. Allowed values are tick and freeQuota.; enum: `tick`, `freeQuota`
- `rememberPayType` (boolean):

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):


---

### Submit a signed InSwap token swap
<a id="submit-a-signed-inswap-token-swap"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/swap`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/postBrc20SwapSwap)  

#### Description
Executes a prepared swap between input and output ticks with exact-in or exact-out semantics. Review quoted amounts, slippage, fee payment, and signatures before submission.

#### Request Body
Content-Type: `application/json` **(required)**

- `address` (string): required
- `tickIn` (string): required; Input tick
- `tickOut` (string): required; Output tick
- `amountIn` (string): required; The amount of input tick
- `amountOut` (string): required; The amount of output tick
- `feeTick` (string): required; Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
- `slippage` (string): required
- `exactType` (string): required; enum: `exactIn`, `exactOut`
- `ts` (number): required; Timestamp (seconds)
- `feeAmount` (string): required; The fee that the user needs to pay
- `feeTickPrice` (string): required; The price of fee tick
- `sigs` (array): User signature
- `payType` (string): Pay type. Allowed values are tick, freeQuota, and assetFeeTick.; enum: `tick`, `freeQuota`, `assetFeeTick`
- `rememberPayType` (boolean):
- `assetFeeTick` (string): Required when payType is assetFeeTick. Used as the fee asset tick for swap.
- `assetFeeAmount` (string): Required when payType is assetFeeTick. Fee amount charged in assetFeeTick.
- `assetFeeTickPrice` (string): Required when payType is assetFeeTick. Price of assetFeeTick.

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `id` (string): Function id
  - `rollupInscriptionId` (string): The rollup inscription id where the function is located
  - `address` (string):
  - `tickIn` (string):
  - `tickOut` (string):
  - `amountIn` (string):
  - `amountOut` (string):
  - `exactType` (string):
  - `ts` (number):
  - `success` (boolean): Operation success status
  - `value` (number): Operation value
  - `preResult` (object): Pre-operation result
  - `result` (object): Operation result


---

### List InSwap pools with TVL, volume, and reserves
<a id="list-inswap-pools-with-tvl-volume-and-reserves"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pool_list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapPoolList)  

#### Description
Returns paginated pool pairs with LP token, TVL, 24h/7d/30d volume, and reserve amounts for each token.

#### Parameters
- `search` (query, string): Fuzzy matching
- `start` (query, number) **(required)**: 
- `limit` (query, number) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `total` (number):
  - `list` (array):
    - `tick0` (string):
    - `tick1` (string):
    - `lp` (string):
    - `tvl` (string): Total pool value
    - `volume24h` (string):
    - `volume7d` (string):
    - `volume30d` (string): 30 days volume
    - `amount0` (string): Amount of tick0
    - `amount1` (string): Amount of tick1


---

### List an address's InSwap liquidity positions
<a id="list-an-addresss-inswap-liquidity-positions"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/my_pool_list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapMyPoolList)  

#### Description
Returns paginated pool positions for an address, including LP amount, pool share, token amounts, and claimed or unclaimed rewards.

#### Parameters
- `address` (query, string) **(required)**: 
- `tick` (query, string): 
- `start` (query, number) **(required)**: 
- `limit` (query, number) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `total` (number):
  - `list` (array):
    - `lp` (string):
    - `shareOfPool` (string):
    - `tick0` (string):
    - `tick1` (string):
    - `amount0` (string): required; Amount of tick0
    - `amount1` (string): required; Amount of tick1
    - `claimedReward0` (string):
    - `claimedReward1` (string):
    - `unclaimedReward0` (string):
    - `unclaimedReward1` (string):


---

### Get an address's InSwap position in one pool
<a id="get-an-addresss-inswap-position-in-one-pool"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/my_pool`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapMyPool)  

#### Description
Returns LP amount, pool share, token amounts, locked LP, and claimed or unclaimed rewards for a specific address and token pair.

#### Parameters
- `address` (query, string) **(required)**: 
- `tick0` (query, string) **(required)**: 
- `tick1` (query, string) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `lp` (string):
  - `shareOfPool` (string):
  - `tick0` (string):
  - `tick1` (string):
  - `amount0` (string): required; Amount of tick0
  - `amount1` (string): required; Amount of tick1
  - `lockedLp` (string): Locked LP amount
  - `claimedReward0` (string): Claimed reward for tick0
  - `claimedReward1` (string): Claimed reward for tick1
  - `unclaimedReward0` (string): Unclaimed reward for tick0
  - `unclaimedReward1` (string): Unclaimed reward for tick1


---

### Get InSwap liquidity, volume, transaction, and pair totals
<a id="get-inswap-liquidity-volume-transaction-and-pair-totals"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/overview`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapOverview)  

#### Description
Returns protocol overview metrics including total liquidity, 24h and 7d volume, 24h transaction count, and number of active pairs.

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `liquidity` (string): Total value of all pools
  - `volume7d` (string): 7 days volume
  - `volume24h` (string): 24 hours volume
  - `transactions` (number): Number of transactions in 24 hours
  - `pairs` (number):


---

### List InSwap gas fee history
<a id="list-inswap-gas-fee-history"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/gas_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapGasHistory)  

#### Description
Returns paginated gas-fee records with function type, token pair, gas amount, fee tick, recipient address, and timestamp.

#### Parameters
- `address` (query, string): 
- `start` (query, number) **(required)**: 
- `limit` (query, number) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `total` (number):
  - `list` (array):
    - `funcType` (string): Function type; example: `"swap"`
    - `tickA` (string):
    - `tickB` (string):
    - `gas` (string):
    - `tick` (string): Fee tick
    - `to` (string): Recipient address
    - `ts` (number):


---

### List InSwap token transfer history
<a id="list-inswap-token-transfer-history"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/send_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapSendHistory)  

#### Description
Returns paginated transfer records filtered by address or tick, including token tick, amount, recipient, and timestamp.

#### Parameters
- `address` (query, string): 
- `tick` (query, string): 
- `start` (query, number) **(required)**: 
- `limit` (query, number) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `total` (number):
  - `list` (array):
    - `tick` (string):
    - `amount` (string):
    - `to` (string):
    - `ts` (number):


---

### List InSwap add/remove liquidity history
<a id="list-inswap-addremove-liquidity-history"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/liq_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapLiqHistory)  

#### Description
Returns paginated liquidity records with action type, token pair, token amounts, rewards, LP amount, and timestamp.

#### Parameters
- `address` (query, string): 
- `tick` (query, string): 
- `type` (query, string): Optional liquidity history type filter.; enum: `add`, `remove`
- `start` (query, number) **(required)**: 
- `limit` (query, number) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `total` (number):
  - `list` (array):
    - `type` (string):
    - `tick0` (string):
    - `tick1` (string):
    - `amount0` (string):
    - `amount1` (string):
    - `reward0` (string): Reward amount for tick0
    - `reward1` (string): Reward amount for tick1
    - `lp` (string):
    - `ts` (number):


---

### List InSwap token swap history
<a id="list-inswap-token-swap-history"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/swap_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapSwapHistory)  

#### Description
Returns paginated swap records filtered by address or tick, including input/output ticks, amounts, exact type, and timestamp.

#### Parameters
- `address` (query, string): 
- `tick` (query, string): 
- `start` (query, number) **(required)**: 
- `limit` (query, number) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `total` (number):
  - `list` (array):
    - `tickIn` (string): required; Input tick
    - `tickOut` (string): required; Output tick
    - `amountIn` (string): required; The amount of input tick
    - `amountOut` (string): required; The amount of output tick
    - `exactType` (string):
    - `ts` (number):


---

### List InSwap rollup inscription history
<a id="list-inswap-rollup-inscription-history"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/rollup_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapRollupHistory)  

#### Description
Returns paginated rollup records with transaction id, block height, transaction count, inscription id, inscription number, and timestamp.

#### Parameters
- `start` (query, number) **(required)**: 
- `limit` (query, number) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `total` (number):
  - `list` (array):
    - `txid` (string):
    - `height` (number):
    - `transactionNum` (number): Number of transactions in the inscription
    - `inscriptionId` (string): Rollup inscription id
    - `inscriptionNumber` (number): Rollup inscription number
    - `ts` (number):


---

### List InSwap deposit records for an address
<a id="list-inswap-deposit-records-for-an-address"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/deposit_list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapDepositList)  

#### Description
Returns paginated deposit records with tick, amount, current and required confirmations, timestamp, txid, and deposit type.

#### Parameters
- `address` (query, string) **(required)**: 
- `tick` (query, string): 
- `start` (query, number) **(required)**: 
- `limit` (query, number) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `total` (number):
  - `list` (array):
    - `tick` (string):
    - `amount` (string):
    - `cur` (number): Current number of confirmations
    - `sum` (number): Total number of confirmations
    - `ts` (number):
    - `txid` (string):
    - `type` (string):


---

### Build an InSwap deposit PSBT or bridge deposit draft
<a id="build-an-inswap-deposit-psbt-or-bridge-deposit-draft"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/create_deposit`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapCreateDeposit)  

#### Description
Returns deposit signing material such as PSBT, deposit type, expiration timestamp, and recommended deposit amount for direct, matching, or bridge deposit flows.

#### Parameters
- `inscriptionId` (query, string): 
- `pubkey` (query, string) **(required)**: 
- `address` (query, string) **(required)**: 
- `amount` (query, string): Required for bridge deposits.
- `tick` (query, string): Required for bridge deposits.
- `assetType` (query, string): Asset type. Required for bridge deposits.; enum: `btc`, `brc20`, `runes`, `alkanes`
- `networkType` (query, string): Network type. Required for bridge deposits.; enum: `FRACTAL_BITCOIN_MAINNET`, `FRACTAL_BITCOIN_TESTNET`, `BITCOIN_MAINNET`, `BITCOIN_TESTNET`, `BITCOIN_TESTNET4`, `BITCOIN_SIGNET`
- `feeRate` (query, number): 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `psbt` (string):
  - `type` (string): Deposit type.; enum: `direct`, `matching`, `bridge`
  - `expiredTimestamp` (number):
  - `recommendDeposit` (string):


---

### Submit a signed InSwap deposit confirmation
<a id="submit-a-signed-inswap-deposit-confirmation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/confirm_deposit`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/postBrc20SwapConfirmDeposit)  

#### Description
Confirms a prepared deposit using the signed PSBT and optional bridge metadata, returning the transaction id and remaining pending-confirmation count.

#### Request Body
Content-Type: `application/json` **(required)**

- `psbt` (string): required
- `inscriptionId` (string):
- `pubkey` (string):
- `address` (string):
- `amount` (string):
- `tick` (string):
- `assetType` (string): enum: `btc`, `brc20`, `runes`, `alkanes`
- `networkType` (string): enum: `FRACTAL_BITCOIN_MAINNET`, `FRACTAL_BITCOIN_TESTNET`, `BITCOIN_MAINNET`, `BITCOIN_TESTNET`, `BITCOIN_TESTNET4`, `BITCOIN_SIGNET`
- `feeRate` (number):

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `txid` (string): Transaction ID
  - `pendingNum` (number): Number of pending confirmations


---

### Check whether InSwap rollup committing is active
<a id="check-whether-inswap-rollup-committing-is-active"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/system_status`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapSystemStatus)  

#### Description
Returns the current system committing flag so clients can decide whether rollup-related operations are temporarily in progress.

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `committing` (boolean): Is rollup inscription committing


---

### List InSwap withdrawal records for an address
<a id="list-inswap-withdrawal-records-for-an-address"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/withdraw_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapWithdrawHistory)  

#### Description
Returns paginated withdrawal records with id, tick, total and completed amounts, confirmation progress, status, type, and timestamp.

#### Parameters
- `address` (query, string) **(required)**: 
- `start` (query, number) **(required)**: 
- `limit` (query, number) **(required)**: 
- `tick` (query, string): 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `total` (number):
  - `list` (array):
    - `id` (string):
    - `tick` (string):
    - `totalAmount` (string): Total amount withdrawal
    - `completedAmount` (string): The number of withdrawal completed
    - `ts` (number):
    - `totalConfirmedNum` (number): The current number of confirmations
    - `totalNum` (number): The total number of confirmations
    - `status` (string):
    - `type` (string):


---

### Build payment and approve PSBTs for retrying a withdrawal
<a id="build-payment-and-approve-psbts-for-retrying-a-withdrawal"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/create_retry_withdraw`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapCreateRetryWithdraw)  

#### Description
Returns payment PSBT, approve-inscription PSBT, and network fee required to retry a previously created withdrawal order.

#### Parameters
- `id` (query, string) **(required)**: 
- `pubkey` (query, string) **(required)**: 
- `address` (query, string) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `paymentPsbt` (string): The user psbt with payment
  - `approvePsbt` (string): The user psbt with approve insctiption
  - `networkFee` (number):


---

### Submit signed PSBTs to retry an InSwap withdrawal
<a id="submit-signed-psbts-to-retry-an-inswap-withdrawal"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/confirm_retry_withdraw`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/postBrc20SwapConfirmRetryWithdraw)  

#### Description
Confirms a retry withdrawal order by submitting its id with signed payment and approve PSBTs. Verify the order id and both signed PSBTs before submission.

#### Request Body
Content-Type: `application/json` **(required)**

- `id` (string): required; The withdraw order id
- `paymentPsbt` (string): required
- `approvePsbt` (string): required

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):


---

### Build InSwap withdrawal signing data
<a id="build-inswap-withdrawal-signing-data"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/create_withdraw`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapCreateWithdraw)  

#### Description
Prepares withdrawal data for a tick amount, fee tick, payment type, and optional bridge asset metadata before the signed confirmation step.

#### Parameters
- `pubkey` (query, string) **(required)**: 
- `address` (query, string) **(required)**: 
- `tick` (query, string) **(required)**: 
- `amount` (query, string) **(required)**: 
- `ts` (query, number) **(required)**: 
- `feeTick` (query, string) **(required)**: Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
- `payType` (query, string) **(required)**: Withdraw creation currently only supports tick.; enum: `tick`
- `feeRate` (query, number): 
- `assetType` (query, string): Required for bridge withdrawals.; enum: `btc`, `brc20`, `runes`, `alkanes`
- `networkType` (query, string): Required for bridge withdrawals.; enum: `FRACTAL_BITCOIN_MAINNET`, `FRACTAL_BITCOIN_TESTNET`, `BITCOIN_MAINNET`, `BITCOIN_TESTNET`, `BITCOIN_TESTNET4`, `BITCOIN_SIGNET`

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):


---

### Submit a signed InSwap withdrawal confirmation
<a id="submit-a-signed-inswap-withdrawal-confirmation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/confirm_withdraw`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/postBrc20SwapConfirmWithdraw)  

#### Description
Confirms a withdrawal order using payment and approve PSBTs plus fee and signature fields. Review order id, amount, tick, fee payment, and signed PSBTs before submission.

#### Request Body
Content-Type: `application/json` **(required)**

- `id` (string): required; The withdraw order id
- `paymentPsbt` (string): required
- `approvePsbt` (string): required
- `feeTick` (string): required; Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
- `feeAmount` (string): The fee that the user needs to pay
- `feeTickPrice` (string): The price of fee tick
- `sigs` (array): User signature
- `payType` (string): required; Withdraw confirmation currently only supports tick.; enum: `tick`
- `rememberPayType` (boolean):
- `ts` (number):
- `pubkey` (string):
- `address` (string):
- `amount` (string):
- `tick` (string):
- `assetType` (string): enum: `btc`, `brc20`, `runes`, `alkanes`
- `networkType` (string): enum: `FRACTAL_BITCOIN_MAINNET`, `FRACTAL_BITCOIN_TESTNET`, `BITCOIN_MAINNET`, `BITCOIN_TESTNET`, `BITCOIN_TESTNET4`, `BITCOIN_SIGNET`

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):


---

### Get confirmation progress for an InSwap withdrawal
<a id="get-confirmation-progress-for-an-inswap-withdrawal"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/withdraw_process`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapWithdrawProcess)  

#### Description
Returns withdrawal status details including confirmation counts, rollup/payment/inscribe/approve txids, completed amount, and match history.

#### Parameters
- `id` (query, string) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `id` (string):
  - `tick` (string):
  - `amount` (string):
  - `ts` (number):
  - `status` (string):
  - `totalConfirmedNum` (number):
  - `totalNum` (number): Total number of confirmations (rollUp + approve)
  - `rollUpConfirmNum` (number):
  - `rollUpTotalNum` (number): Total number of rollUp confirmations
  - `approveConfirmNum` (number):
  - `approveTotalNum` (number): Total number of approve confirmations
  - `cancelConfirmedNum` (number):
  - `cancelTotalNum` (number):
  - `rollUpTxid` (string): Decrease operation is required to withdraw, which in rollup inscription
  - `paymentTxid` (string):
  - `inscribeTxid` (string):
  - `approveTxid` (string):
  - `completedAmount` (string):
  - `matchHistory` (array):
    - `approveInscriptionId` (string): Withdraw inscription
    - `transferInscriptionId` (string): Deposit inscription
    - `tick` (string):
    - `consumeAmount` (string):
    - `remainAmount` (string): Residual cash withdrawal
    - `approveAddress` (string): Withdraw user address
    - `transferAddress` (string): Deposit user address
    - `txid` (string): Matching txid
    - `ts` (number):


---

### Quote expected output for an InSwap token swap
<a id="quote-expected-output-for-an-inswap-token-swap"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/quote_swap`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapQuoteSwap)  

#### Description
Estimates swap result values for exact-in or exact-out requests, including input USD value, expected USD value, and expected token amount.

#### Parameters
- `address` (query, string) **(required)**: 
- `tickIn` (query, string) **(required)**: Input tick
- `tickOut` (query, string) **(required)**: Output tick
- `amount` (query, string) **(required)**: If it is exactIn, it is the amount of input tick, else is the amount of output tick
- `exactType` (query, string) **(required)**: Exact input or exact output; enum: `exactIn`, `exactOut`; example: `"exactIn"`

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `amountUSD` (string): Input amount of usd value
  - `expectUSD` (string): Estimated amount of usd value
  - `expect` (string): Estimated amount


---

### Quote required amounts and LP for adding liquidity
<a id="quote-required-amounts-and-lp-for-adding-liquidity"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/quote_add_liq`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapQuoteAddLiq)  

#### Description
Estimates real token amounts, USD values, LP minted, pair exchange ratios, and resulting pool share for an add-liquidity request.

#### Parameters
- `address` (query, string) **(required)**: 
- `tick0` (query, string) **(required)**: 
- `tick1` (query, string) **(required)**: 
- `amount0` (query, string): The expect amount of tick0
- `amount1` (query, string): The expect amount of tick1

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `amount0` (string): The real amount of tick0
  - `amount1` (string): The real amount of tick1
  - `amount0USD` (string): The usd value of amount0
  - `amount1USD` (string): The usd value of amount1
  - `lp` (string): Estimated lp
  - `tick0PerTick1` (string): tick0/tick1
  - `tick1PerTick0` (string): tick1/tick0
  - `shareOfPool` (string): The proportion of the injected quantity in the pool


---

### Quote token outputs for removing InSwap liquidity
<a id="quote-token-outputs-for-removing-inswap-liquidity"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/quote_remove_liq`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapQuoteRemoveLiq)  

#### Description
Estimates the token pair amounts and USD values returned when removing a specified LP amount from a pool.

#### Parameters
- `address` (query, string) **(required)**: 
- `tick0` (query, string) **(required)**: 
- `tick1` (query, string) **(required)**: 
- `lp` (query, string) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `tick0` (string):
  - `tick1` (string):
  - `amount0` (string): required; Amount of tick0
  - `amount1` (string): required; Amount of tick1
  - `amount0USD` (string):
  - `amount1USD` (string):


---

### Prepare signatures and fees for staking InSwap LP
<a id="prepare-signatures-and-fees-for-staking-inswap-lp"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pre_stake`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapPreStake)  

#### Description
Returns signature ids, sign messages, fee amount, fee tick price, fee balance, and USD fee value for staking an LP amount in a reward pool.

#### Parameters
- `pid` (query, string) **(required)**: 
- `address` (query, string) **(required)**: 
- `amount` (query, string) **(required)**: The amount of send tick
- `ts` (query, number) **(required)**: Timestamp (seconds)
- `feeTick` (query, string) **(required)**: Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
- `payType` (query, string): Pay type. Allowed values are tick and freeQuota.; enum: `tick`, `freeQuota`

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `ids` (array): User signature id
  - `signMsgs` (array): User signature information
  - `feeAmount` (string): The fee that the user needs to pay
  - `feeTickPrice` (string): The price of fee tick
  - `feeBalance` (string): The user's fee tick balance
  - `usdPrice` (string): The dollar value of the fee


---

### Prepare signatures and fees for unstaking InSwap LP
<a id="prepare-signatures-and-fees-for-unstaking-inswap-lp"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pre_unstake`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapPreUnstake)  

#### Description
Returns signature ids, sign messages, fee amount, fee tick price, fee balance, and USD fee value for unstaking an LP amount from a reward pool.

#### Parameters
- `pid` (query, string) **(required)**: 
- `address` (query, string) **(required)**: 
- `amount` (query, string) **(required)**: The amount of send tick
- `ts` (query, number) **(required)**: Timestamp (seconds)
- `feeTick` (query, string) **(required)**: Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
- `payType` (query, string): Pay type. Allowed values are tick and freeQuota.; enum: `tick`, `freeQuota`

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `ids` (array): User signature id
  - `signMsgs` (array): User signature information
  - `feeAmount` (string): The fee that the user needs to pay
  - `feeTickPrice` (string): The price of fee tick
  - `feeBalance` (string): The user's fee tick balance
  - `usdPrice` (string): The dollar value of the fee


---

### Prepare signatures and fees for claiming InSwap rewards
<a id="prepare-signatures-and-fees-for-claiming-inswap-rewards"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pre_claim`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapPreClaim)  

#### Description
Returns signature ids, sign messages, fee amount, fee tick price, fee balance, and USD fee value for claiming rewards from a staking pool.

#### Parameters
- `pid` (query, string) **(required)**: 
- `address` (query, string) **(required)**: 
- `ts` (query, number) **(required)**: Timestamp (seconds)
- `feeTick` (query, string) **(required)**: Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
- `payType` (query, string): Pay type. Allowed values are tick and freeQuota.; enum: `tick`, `freeQuota`

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `ids` (array): User signature id
  - `signMsgs` (array): User signature information
  - `feeAmount` (string): The fee that the user needs to pay
  - `feeTickPrice` (string): The price of fee tick
  - `feeBalance` (string): The user's fee tick balance
  - `usdPrice` (string): The dollar value of the fee


---

### Prepare signatures and fees for transferring LP tokens
<a id="prepare-signatures-and-fees-for-transferring-lp-tokens"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pre_send_lp`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapPreSendLp)  

#### Description
Returns signature ids, sign messages, fee fields, LP token conversion data, and fee-balance metadata for sending LP tokens to another address.

#### Parameters
- `address` (query, string) **(required)**: 
- `tick0` (query, string) **(required)**: Lp tick0
- `tick1` (query, string) **(required)**: Lp tick1
- `amount` (query, string) **(required)**: The amount of send tick
- `to` (query, string) **(required)**: The receiver of send tick
- `ts` (query, number) **(required)**: Timestamp (seconds)
- `feeTick` (query, string) **(required)**: Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
- `payType` (query, string): Pay type. Allowed values are tick and freeQuota.; enum: `tick`, `freeQuota`

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `ids` (array): User signature id
  - `signMsgs` (array): User signature information
  - `feeAmount` (string): The fee that the user needs to pay
  - `feeTickPrice` (string): The price of fee tick
  - `feeBalance` (string): The user's fee tick balance
  - `usdPrice` (string): The dollar value of the fee
  - `amount0PerLp` (string):
  - `amount1PerLp` (string):


---

### Submit a signed InSwap LP token transfer
<a id="submit-a-signed-inswap-lp-token-transfer"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/send_lp`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/postBrc20SwapSendLp)  

#### Description
Transfers LP tokens for a token pair to another address using prepared signatures and fee fields. Review recipient, LP amount, fee payment, and signatures before submission.

#### Request Body
Content-Type: `application/json` **(required)**

- `address` (string): required
- `tick0` (string): required; Lp tick0
- `tick1` (string): required; Lp tick1
- `amount` (string): required; The amount of send tick
- `to` (string): required; The receiver of send tick
- `ts` (number): required; Timestamp (seconds)
- `feeTick` (string): required; Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
- `feeAmount` (string): required; The fee that the user needs to pay
- `feeTickPrice` (string): required; The price of fee tick
- `sigs` (array): User signature
- `payType` (string): Pay type. Allowed values are tick and freeQuota.; enum: `tick`, `freeQuota`
- `rememberPayType` (boolean):

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):


---

### Submit a signed InSwap LP stake operation
<a id="submit-a-signed-inswap-lp-stake-operation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/stake`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/postBrc20SwapStake)  

#### Description
Stakes an LP amount in a reward pool using prepared signatures and fee fields. Review pool id, amount, fee payment, and signatures before submission.

#### Request Body
Content-Type: `application/json` **(required)**

- `pid` (string): required
- `address` (string): required
- `amount` (string): required; The amount of send tick
- `ts` (number): required; Timestamp (seconds)
- `feeTick` (string): required; Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
- `feeAmount` (string): required; The fee that the user needs to pay
- `feeTickPrice` (string): required; The price of fee tick
- `sigs` (array): User signature
- `payType` (string): Pay type. Allowed values are tick and freeQuota.; enum: `tick`, `freeQuota`
- `rememberPayType` (boolean):

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):


---

### Submit a signed InSwap LP unstake operation
<a id="submit-a-signed-inswap-lp-unstake-operation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/unstake`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/postBrc20SwapUnstake)  

#### Description
Unstakes an LP amount from a reward pool using prepared signatures and fee fields. Review pool id, amount, fee payment, and signatures before submission.

#### Request Body
Content-Type: `application/json` **(required)**

- `pid` (string): required
- `address` (string): required
- `amount` (string): required; The amount of send tick
- `ts` (number): required; Timestamp (seconds)
- `feeTick` (string): required; Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
- `feeAmount` (string): required; The fee that the user needs to pay
- `feeTickPrice` (string): required; The price of fee tick
- `sigs` (array): User signature
- `payType` (string): Pay type. Allowed values are tick and freeQuota.; enum: `tick`, `freeQuota`
- `rememberPayType` (boolean):

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):


---

### Submit a signed InSwap reward claim
<a id="submit-a-signed-inswap-reward-claim"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/claim`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/postBrc20SwapClaim)  

#### Description
Claims rewards from a staking pool using prepared signatures and fee fields, returning the claimed reward amount when available.

#### Request Body
Content-Type: `application/json` **(required)**

- `pid` (string): required
- `address` (string): required
- `ts` (number): required; Timestamp (seconds)
- `feeTick` (string): required; Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
- `feeAmount` (string): required; The fee that the user needs to pay
- `feeTickPrice` (string): required; The price of fee tick
- `sigs` (array): User signature
- `payType` (string): Pay type. Allowed values are tick and freeQuota.; enum: `tick`, `freeQuota`
- `rememberPayType` (boolean):

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `amount` (string): Claimed reward amount


---

### List LP reward history for an InSwap pool position
<a id="list-lp-reward-history-for-an-inswap-pool-position"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/lp_reward_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapLpRewardHistory)  

#### Description
Returns paginated LP reward records for an address and token pair, including reward amounts, event type, and timestamp.

#### Parameters
- `address` (query, string) **(required)**: 
- `tick0` (query, string) **(required)**: 
- `tick1` (query, string) **(required)**: 
- `start` (query, number) **(required)**: 
- `limit` (query, number) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `total` (number):
  - `list` (array):
    - `id` (string):
    - `type` (string):
    - `address` (string):
    - `tick0` (string):
    - `tick1` (string):
    - `reward0` (string):
    - `reward1` (string):
    - `ts` (number):


---

### List InSwap stake, unstake, and claim history
<a id="list-inswap-stake-unstake-and-claim-history"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/stake_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapStakeHistory)  

#### Description
Returns paginated staking records for an address, filtered by pool, search text, and action type, with pool pair, amount, reward tick, and timestamp.

#### Parameters
- `pid` (query, string): 
- `search` (query, string): 
- `address` (query, string) **(required)**: 
- `type` (query, string) **(required)**: Stake history type.; enum: `all`, `stake`, `unstake`, `claim`
- `start` (query, number) **(required)**: 
- `limit` (query, number) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `total` (number):
  - `list` (array):
    - `pid` (string):
    - `address` (string):
    - `poolTick0` (string):
    - `poolTick1` (string):
    - `type` (string):
    - `amount` (string):
    - `tick` (string):
    - `ts` (number):


---

### List active InSwap staking campaigns and reward pools
<a id="list-active-inswap-staking-campaigns-and-reward-pools"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/stake_list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapStakeList)  

#### Description
Returns staking campaign windows with reward pool summaries, including pool id, pool pair, reward tick, current total LP, base reward, and staged reward thresholds.

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `list` (array):
    - `startBlock` (number):
    - `endBlock` (number):
    - `stakePools` (array):
      - `summary` (object):
        - `pid` (string):
        - `poolTick0` (string):
        - `poolTick1` (string):
        - `rewardTick` (string):
        - `curTotalLp` (string):
        - `baseReward` (string):
        - `stageNeedLp` (array):
        - `stageAddedRewards` (array):


---

### Get one InSwap staking campaign by event id
<a id="get-one-inswap-staking-campaign-by-event-id"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/stake_item`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapStakeItem)  

#### Description
Returns a staking campaign item plus newest indexed height, including reward pool summaries, staged LP requirements, and staged added rewards.

#### Parameters
- `eid` (query, string) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `item` (object):
    - `startBlock` (number):
    - `endBlock` (number):
    - `stakePools` (array):
      - `summary` (object):
        - `pid` (string):
        - `poolTick0` (string):
        - `poolTick1` (string):
        - `rewardTick` (string):
        - `curTotalLp` (string):
        - `baseReward` (string):
        - `stageNeedLp` (array):
        - `stageAddedRewards` (array):
  - `newestHeight` (number):


---

### Get staking-related InSwap user information
<a id="get-staking-related-inswap-user-information"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/stake_user_info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapStakeUserInfo)  

#### Description
Returns staking user data for an address. The response is extensible because the server may include campaign-specific or user-specific fields.

#### Parameters
- `address` (query, string): 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object): required


---

### Get an address's default InSwap fee payment settings
<a id="get-an-addresss-default-inswap-fee-payment-settings"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/user_info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapUserInfo)  

#### Description
Returns the user's remembered fee payment preference, including default pay type and whether the preference should be remembered.

#### Parameters
- `address` (query, string) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `defaultPayType` (string): User default pay type.; enum: `tick`, `freeQuota`, `assetFeeTick`
  - `rememberPayType` (boolean):


---

### Get deposit selection data for an InSwap address
<a id="get-deposit-selection-data-for-an-inswap-address"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/select_deposit`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapSelectDeposit)  

#### Description
Returns server-provided deposit selection data for a pubkey and address. The schema is intentionally open to support direct, matching, or bridge deposit choices.

#### Parameters
- `pubkey` (query, string) **(required)**: 
- `address` (query, string) **(required)**: 
- `v` (query, string): 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object): required


---

### Get execution details for one InSwap function id
<a id="get-execution-details-for-one-inswap-function-id"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/func_info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapFuncInfo)  

#### Description
Returns server-side function execution data for a submitted operation id. The response is open because details vary by operation type.

#### Parameters
- `id` (query, string) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object): required


---

### Get depositable balance data for one tick
<a id="get-depositable-balance-data-for-one-tick"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/deposit_balance`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapDepositBalance)  

#### Description
Returns server-provided deposit balance data for a pubkey, address, and tick. The response shape is open to support multiple deposit modes.

#### Parameters
- `pubkey` (query, string) **(required)**: 
- `address` (query, string) **(required)**: 
- `tick` (query, string) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object): required


---

### Get confirmation progress for an InSwap deposit
<a id="get-confirmation-progress-for-an-inswap-deposit"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/deposit_process`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapDepositProcess)  

#### Description
Returns deposit progress by txid, including tick, amount, current and required confirmations, timestamp, type, and status.

#### Parameters
- `txid` (query, string) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `tick` (string):
  - `amount` (string):
  - `cur` (number): Current number of confirmations
  - `sum` (number): Total number of confirmations
  - `ts` (number):
  - `txid` (string):
  - `type` (string):
  - `status` (string):


---

### Get the current InSwap price for one tick
<a id="get-the-current-inswap-price-for-one-tick"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/tick_price`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapTickPrice)  

#### Description
Returns the latest price value for a tick as used by InSwap quote, valuation, or portfolio views.

#### Parameters
- `tick` (query, string) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `price` (number):


---

### Get an address's available fee-tick gas amount
<a id="get-an-addresss-available-fee-tick-gas-amount"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/address_gas`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapAddressGas)  

#### Description
Returns the total available fee-token amount for an address and fee tick, useful before preparing fee-paying swap operations.

#### Parameters
- `address` (query, string) **(required)**: 
- `feeTick` (query, string) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `total` (number):


---

### Get historical InSwap price points for a pair
<a id="get-historical-inswap-price-points-for-a-pair"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/price_line`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapPriceLine)  

#### Description
Returns time-series price and USD price points for a token pair over a selected range such as 24h, 7d, 30d, 90d, or all.

#### Parameters
- `tick0` (query, string) **(required)**: 
- `tick1` (query, string) **(required)**: 
- `timeRange` (query, string) **(required)**: Time range for price line aggregation.; enum: `24h`, `7d`, `30d`, `90d`, `all`

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `list` (array):
    - `price` (number):
    - `usdPrice` (number):
    - `ts` (number):


---

### List top holders for an InSwap tick
<a id="list-top-holders-for-an-inswap-tick"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/tick_holders`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapTickHolders)  

#### Description
Returns paginated holder records for a tick, including address, amount, overall percentage, and relative percentage.

#### Parameters
- `tick` (query, string) **(required)**: 
- `start` (query, number) **(required)**: 
- `limit` (query, number) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `total` (number):
  - `list` (array):
    - `address` (string):
    - `amount` (string):
    - `percentage` (number):
    - `relativePercentage` (number):


---

### List LP holders for an InSwap pool
<a id="list-lp-holders-for-an-inswap-pool"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pool_holders`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapPoolHolders)  

#### Description
Returns paginated LP holder records for a token pair, including token amounts, LP amount, pool share, and locked LP breakdown.

#### Parameters
- `tick0` (query, string) **(required)**: 
- `tick1` (query, string) **(required)**: 
- `start` (query, number) **(required)**: 
- `limit` (query, number) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `total` (number):
  - `list` (array):
    - `address` (string):
    - `amount0` (string):
    - `amount1` (string):
    - `lp` (string):
    - `shareOfPool` (string):
    - `lockLp` (object):
      - `lp` (string):
      - `amount0` (string):
      - `amount1` (string):


---

### Get InSwap reward curve data for a pool position
<a id="get-inswap-reward-curve-data-for-a-pool-position"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/reward_curve`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapRewardCurve)  

#### Description
Returns reward-curve data for an address and token pair over a time range. The response is open because curve series fields may vary by campaign.

#### Parameters
- `address` (query, string) **(required)**: 
- `tick0` (query, string) **(required)**: 
- `tick1` (query, string) **(required)**: 
- `startTime` (query, number) **(required)**: 
- `endTime` (query, number) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object): required


---

### List InSwap LP token transfer history
<a id="list-inswap-lp-token-transfer-history"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/send_lp_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapSendLpHistory)  

#### Description
Returns paginated LP transfer records filtered by address or tick, including tick, amount, recipient, and timestamp.

#### Parameters
- `address` (query, string): 
- `tick` (query, string): 
- `fuzzySearch` (query, boolean): 
- `start` (query, number) **(required)**: 
- `limit` (query, number) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `total` (number):
  - `list` (array):
    - `tick` (string):
    - `amount` (string):
    - `to` (string):
    - `ts` (number):


---

### List InSwap LP burn history and burn totals
<a id="list-inswap-lp-burn-history-and-burn-totals"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/burn_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapBurnHistory)  

#### Description
Returns paginated burn records plus total LP and burned LP amounts, with optional address, tick, fuzzy-search, and timestamp filters.

#### Parameters
- `address` (query, string): 
- `tick` (query, string): 
- `fuzzySearch` (query, boolean): 
- `start` (query, number) **(required)**: 
- `limit` (query, number) **(required)**: 
- `ts` (query, number): 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `total` (number):
  - `totalLp` (string): Total LP amount
  - `burnedLp` (string): Burned LP amount
  - `list` (array):
    - `tick` (string):
    - `amount` (string):
    - `to` (string):
    - `ts` (number):


---

### List InSwap task completion items for an address
<a id="list-inswap-task-completion-items-for-an-address"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/task_list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapTaskList)  

#### Description
Returns task metadata for an address, including task id, item ids, completion flags, and task start/end times when available.

#### Parameters
- `tid` (query, string): default: `1`
- `address` (query, string) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `tid` (string):
  - `list` (array):
    - `tid` (string):
    - `itemId` (string):
    - `address` (string):
    - `done` (boolean):


---

### Get an address's InSwap asset and LP USD values
<a id="get-an-addresss-inswap-asset-and-lp-usd-values"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/address_usd`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapAddressUsd)  

#### Description
Returns USD valuation entries for an address, separating token asset value and LP position value.

#### Parameters
- `address` (query, string) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (array):
  - `assetsUSD` (string):
  - `lpUSD` (string):


---

### Prepare signatures and fees for locking InSwap LP
<a id="prepare-signatures-and-fees-for-locking-inswap-lp"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pre_lock_lp`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapPreLockLp)  

#### Description
Returns signature ids, sign messages, fee fields, LP token conversion data, and fee-balance metadata for locking LP tokens for a selected duration.

#### Parameters
- `address` (query, string) **(required)**: 
- `lockDay` (query, string) **(required)**: 
- `tick0` (query, string) **(required)**: Lp tick0
- `tick1` (query, string) **(required)**: Lp tick1
- `amount` (query, string) **(required)**: The amount of lock tick
- `ts` (query, number) **(required)**: Timestamp (seconds)
- `feeTick` (query, string) **(required)**: Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
- `payType` (query, string): Pay type. Allowed values are tick and freeQuota.; enum: `tick`, `freeQuota`

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `ids` (array): User signature id
  - `signMsgs` (array): User signature information
  - `feeAmount` (string): The fee that the user needs to pay
  - `feeTickPrice` (string): The price of fee tick
  - `feeBalance` (string): The user's fee tick balance
  - `usdPrice` (string): The dollar value of the fee
  - `amount0PerLp` (string):
  - `amount1PerLp` (string):


---

### Submit a signed InSwap LP lock operation
<a id="submit-a-signed-inswap-lp-lock-operation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/lock_lp`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/postBrc20SwapLockLp)  

#### Description
Locks LP tokens for a token pair and lock duration using prepared signatures and fee fields. Review lock duration, LP amount, fee payment, and signatures before submission.

#### Request Body
Content-Type: `application/json` **(required)**

- `address` (string): required
- `lockDay` (string): required
- `tick0` (string): required
- `tick1` (string): required
- `amount` (string): required; The amount of lock tick
- `ts` (number): required; Timestamp (seconds)
- `feeTick` (string): required; Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
- `feeAmount` (string): required; The fee that the user needs to pay
- `feeTickPrice` (string): required; The price of fee tick
- `sigs` (array): User signature
- `payType` (string): Pay type. Allowed values are tick and freeQuota.; enum: `tick`, `freeQuota`
- `rememberPayType` (boolean):

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):


---

### Prepare signatures and fees for unlocking InSwap LP
<a id="prepare-signatures-and-fees-for-unlocking-inswap-lp"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pre_unlock_lp`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapPreUnlockLp)  

#### Description
Returns signature ids, sign messages, fee fields, LP token conversion data, and fee-balance metadata for unlocking previously locked LP tokens.

#### Parameters
- `address` (query, string) **(required)**: 
- `tick0` (query, string) **(required)**: Lp tick0
- `tick1` (query, string) **(required)**: Lp tick1
- `amount` (query, string) **(required)**: The amount of unlock tick
- `ts` (query, number) **(required)**: Timestamp (seconds)
- `feeTick` (query, string) **(required)**: Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
- `payType` (query, string): Pay type. Allowed values are tick and freeQuota.; enum: `tick`, `freeQuota`

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `ids` (array): User signature id
  - `signMsgs` (array): User signature information
  - `feeAmount` (string): The fee that the user needs to pay
  - `feeTickPrice` (string): The price of fee tick
  - `feeBalance` (string): The user's fee tick balance
  - `usdPrice` (string): The dollar value of the fee
  - `amount0PerLp` (string):
  - `amount1PerLp` (string):


---

### Submit a signed InSwap LP unlock operation
<a id="submit-a-signed-inswap-lp-unlock-operation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/unlock_lp`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/postBrc20SwapUnlockLp)  

#### Description
Unlocks LP tokens for a token pair using prepared signatures and fee fields. Review LP amount, fee payment, and signatures before submission.

#### Request Body
Content-Type: `application/json` **(required)**

- `address` (string): required
- `tick0` (string): required
- `tick1` (string): required
- `amount` (string): required; The amount of unlock tick
- `ts` (number): required; Timestamp (seconds)
- `feeTick` (string): required; Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
- `feeAmount` (string): required; The fee that the user needs to pay
- `feeTickPrice` (string): required; The price of fee tick
- `sigs` (array): User signature
- `payType` (string): Pay type. Allowed values are tick and freeQuota.; enum: `tick`, `freeQuota`
- `rememberPayType` (boolean):

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):


---

### List InSwap LP lock history
<a id="list-inswap-lp-lock-history"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/lock_lp_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapLockLpHistory)  

#### Description
Returns paginated LP lock records with address, pair, LP amount, token amounts, USD values, lock duration, unlock time, pool share, and timestamp.

#### Parameters
- `tick` (query, string): 
- `tick0` (query, string): 
- `tick1` (query, string): 
- `start` (query, number) **(required)**: 
- `limit` (query, number) **(required)**: 
- `address` (query, string): 
- `lockDay` (query, number): 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `total` (number):
  - `list` (array):
    - `id` (string):
    - `address` (string):
    - `tick0` (string):
    - `tick1` (string):
    - `lp` (string):
    - `amount0` (string):
    - `amount1` (string):
    - `amount0USD` (string):
    - `amount1USD` (string):
    - `lockDay` (number):
    - `unlockTime` (string):
    - `ts` (number):
    - `shareOfPool` (string):


---

### List InSwap LP unlock history
<a id="list-inswap-lp-unlock-history"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/unlock_lp_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapUnlockLpHistory)  

#### Description
Returns paginated LP unlock records with address, pair, LP amount, token amounts, USD values, and timestamp.

#### Parameters
- `tick` (query, string): 
- `tick0` (query, string): 
- `tick1` (query, string): 
- `start` (query, number) **(required)**: 
- `limit` (query, number) **(required)**: 
- `address` (query, string): 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `total` (number):
  - `list` (array):
    - `id` (string):
    - `address` (string):
    - `tick0` (string):
    - `tick1` (string):
    - `lp` (string):
    - `amount0` (string):
    - `amount1` (string):
    - `amount0USD` (string):
    - `amount1USD` (string):
    - `ts` (number):


---

### Export InSwap LP lock history as CSV
<a id="export-inswap-lp-lock-history-as-csv"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/export_lock_lp_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapExportLockLpHistory)  

#### Description
Downloads CSV-formatted LP lock records for a token pair, optionally filtered by lock duration or lock time.

#### Parameters
- `tick0` (query, string) **(required)**: 
- `tick1` (query, string) **(required)**: 
- `lockDay` (query, number): 
- `lockTime` (query, number): 

#### Response (200)
CSV file download


---

### Get an address's locked and available LP for a pool
<a id="get-an-addresss-locked-and-available-lp-for-a-pool"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/my_lock_lp`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapMyLockLp)  

#### Description
Returns total LP, locked LP, available LP, available underlying token amounts, and pool share for one address and token pair.

#### Parameters
- `tick0` (query, string) **(required)**: 
- `tick1` (query, string) **(required)**: 
- `address` (query, string) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `lp` (string):
  - `lockLp` (string):
  - `availableLp` (string):
  - `availableAmount0` (string):
  - `availableAmount1` (string):
  - `shareOfPool` (string):


---

### List routed pool candidates for an InSwap trade
<a id="list-routed-pool-candidates-for-an-inswap-trade"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/select_pool`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapSelectPool)  

#### Description
Returns swappable tick candidates for an address with decimals, module balance, swap balance, and available route ticks.

#### Parameters
- `address` (query, string) **(required)**: 
- `tickIn` (query, string): 
- `tickOut` (query, string): 
- `search` (query, string): 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (array):
  - `tick` (string):
  - `decimal` (string):
  - `brc20Balance` (string): Module balance (not participate in swap calculations)
  - `swapBalance` (string): Swap balance
  - `routes` (array): Available routes for swapping


---

### Prepare signatures and fees for a multi-hop InSwap swap
<a id="prepare-signatures-and-fees-for-a-multi-hop-inswap-swap"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pre_multi_swap`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapPreMultiSwap)  

#### Description
Returns per-route signature ids, sign messages, fee fields, and fee-balance metadata for a multi-hop swap between input and output ticks.

#### Parameters
- `address` (query, string) **(required)**: 
- `tickIn` (query, string) **(required)**: Input tick
- `tickOut` (query, string) **(required)**: Output tick
- `amountIn` (query, string) **(required)**: The amount of input tick
- `amountOut` (query, string) **(required)**: The amount of output tick
- `slippage` (query, string) **(required)**: 
- `exactType` (query, string) **(required)**: enum: `exactIn`, `exactOut`; example: `"exactIn"`
- `ts` (query, number) **(required)**: Timestamp(seconds)
- `feeTick` (query, string) **(required)**: Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
- `payType` (query, string): Pay type. Allowed values are tick, freeQuota, and assetFeeTick.; enum: `tick`, `freeQuota`, `assetFeeTick`

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (array):
  - `ids` (array): User signature id
  - `signMsgs` (array): User signature information
  - `feeAmount` (string): The fee that the user needs to pay
  - `feeTickPrice` (string): The price of fee tick
  - `feeBalance` (string): The user's fee tick balance
  - `usdPrice` (string): The dollar value of the fee


---

### Submit signed multi-hop InSwap swaps
<a id="submit-signed-multi-hop-inswap-swaps"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/multi_swap`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/postBrc20SwapMultiSwap)  

#### Description
Executes one or more prepared multi-hop swap items and returns per-item success, amounts, exact type, value, timestamp, and failure reason when applicable.

#### Request Body
Content-Type: `application/json` **(required)**

- `items` (array):
  - `address` (string): required
  - `tickIn` (string): required; Input tick
  - `tickOut` (string): required; Output tick
  - `amountIn` (string): required; The amount of input tick
  - `amountOut` (string): required; The amount of output tick
  - `feeTick` (string): required; Tick used as fee. Use /v1/brc20-swap/config to fetch available feeTicks.
  - `slippage` (string): required
  - `exactType` (string): required; enum: `exactIn`, `exactOut`
  - `ts` (number): required; Timestamp (seconds)
  - `feeAmount` (string): required; The fee that the user needs to pay
  - `feeTickPrice` (string): required; The price of fee tick
  - `sigs` (array): User signature
  - `payType` (string): Pay type. Allowed values are tick, freeQuota, and assetFeeTick.; enum: `tick`, `freeQuota`, `assetFeeTick`
  - `rememberPayType` (boolean):
  - `assetFeeTick` (string): Required when payType is assetFeeTick. Used as the fee asset tick for swap.
  - `assetFeeAmount` (string): Required when payType is assetFeeTick. Fee amount charged in assetFeeTick.
  - `assetFeeTickPrice` (string): Required when payType is assetFeeTick. Price of assetFeeTick.

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (array):
  - `address` (string):
  - `tickIn` (string):
  - `tickOut` (string):
  - `success` (boolean):
  - `amountIn` (string):
  - `amountOut` (string):
  - `exactType` (string):
  - `value` (number):
  - `ts` (number):
  - `failureReason` (string):


---

### Quote expected output and route amounts for a multi-hop swap
<a id="quote-expected-output-and-route-amounts-for-a-multi-hop-swap"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/quote_multi_swap`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapQuoteMultiSwap)  

#### Description
Estimates a multi-hop swap with input USD value, expected USD value, expected output amount, and per-route expected amounts.

#### Parameters
- `address` (query, string) **(required)**: 
- `tickIn` (query, string) **(required)**: Input tick
- `tickOut` (query, string) **(required)**: Output tick
- `amount` (query, string) **(required)**: If it is exactIn, it is the amount of input tick, else is the amount of output tick
- `exactType` (query, string) **(required)**: Exact input or exact output; enum: `exactIn`, `exactOut`; example: `"exactIn"`

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `amountUSD` (string): Input amount of usd value
  - `expectUSD` (string): Estimated amount of usd value
  - `expect` (string): Estimated amount
  - `routesExpect` (array): Estimated amounts for each route


---

### List InSwap multi-hop swap history
<a id="list-inswap-multi-hop-swap-history"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/multi_swap_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/getBrc20SwapMultiSwapHistory)  

#### Description
Returns paginated multi-hop swap records with aggregate input/output amounts, value, route details, route success flags, and failure reasons.

#### Parameters
- `address` (query, string): 
- `tick` (query, string): 
- `fuzzySearch` (query, boolean): 
- `start` (query, number) **(required)**: 
- `limit` (query, number) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `total` (number):
  - `list` (array):
    - `address` (string):
    - `tickIn` (string): required; Input tick
    - `tickOut` (string): required; Output tick
    - `amountIn` (string): required; The amount of input tick
    - `amountOut` (string): required; The amount of output tick
    - `exactType` (string):
    - `ts` (number):
    - `value` (number): Swap value
    - `route0` (object): First route details
      - `id` (string):
      - `tickIn` (string):
      - `tickOut` (string):
      - `amountIn` (string):
      - `amountOut` (string):
      - `exactType` (string):
      - `ts` (number):
      - `success` (boolean):
      - `failureReason` (string):
    - `route1` (object): Second route details
      - `id` (string):
      - `tickIn` (string):
      - `tickOut` (string):
      - `amountIn` (string):
      - `amountOut` (string):
      - `exactType` (string):
      - `ts` (number):
      - `success` (boolean):
      - `failureReason` (string):


---

### Fetch multiple InSwap history categories in one request
<a id="fetch-multiple-inswap-history-categories-in-one-request"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/batch_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/Swap-BRC20/postBrc20SwapBatchHistory)  

#### Description
Returns selected history groups for an address, such as gas, send, liquidity, swap, withdrawal, stake, LP transfer, burn, LP lock, LP unlock, and multi-hop swap records.

#### Request Body
Content-Type: `application/json` **(required)**

- `start` (number): required; Start index for pagination
- `limit` (number): required; Maximum number of items to return
- `address` (string): required; User address
- `types` (array): Array of history types to query

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `gas` (object): Gas history data (if requested)
    - `total` (number):
    - `list` (array):
      - `funcType` (string): Function type; example: `"swap"`
      - `tickA` (string):
      - `tickB` (string):
      - `gas` (string):
      - `tick` (string): Fee tick
      - `to` (string): Recipient address
      - `ts` (number):
  - `send` (object): Send history data (if requested)
    - `total` (number):
    - `list` (array):
      - `tick` (string):
      - `amount` (string):
      - `to` (string):
      - `ts` (number):
  - `liq` (object): Liquidity history data (if requested)
    - `total` (number):
    - `list` (array):
      - `type` (string):
      - `tick0` (string):
      - `tick1` (string):
      - `amount0` (string):
      - `amount1` (string):
      - `reward0` (string): Reward amount for tick0
      - `reward1` (string): Reward amount for tick1
      - `lp` (string):
      - `ts` (number):
  - `swap` (object): Swap history data (if requested)
    - `total` (number):
    - `list` (array):
      - `tickIn` (string): required; Input tick
      - `tickOut` (string): required; Output tick
      - `amountIn` (string): required; The amount of input tick
      - `amountOut` (string): required; The amount of output tick
      - `exactType` (string):
      - `ts` (number):
  - `withdraw` (object): Withdraw history data (if requested)
    - `total` (number):
    - `list` (array):
      - `id` (string):
      - `tick` (string):
      - `totalAmount` (string): Total amount withdrawal
      - `completedAmount` (string): The number of withdrawal completed
      - `ts` (number):
      - `totalConfirmedNum` (number): The current number of confirmations
      - `totalNum` (number): The total number of confirmations
      - `status` (string):
      - `type` (string):
  - `stake` (object): Stake history data (if requested)
    - `total` (number):
    - `list` (array):
      - `pid` (string):
      - `address` (string):
      - `poolTick0` (string):
      - `poolTick1` (string):
      - `type` (string):
      - `amount` (string):
      - `tick` (string):
      - `ts` (number):
  - `send_lp` (object): Send LP history data (if requested)
    - `total` (number):
    - `list` (array):
      - `tick` (string):
      - `amount` (string):
      - `to` (string):
      - `ts` (number):
  - `burn` (object): Burn history data (if requested)
    - `total` (number):
    - `totalLp` (string): Total LP amount
    - `burnedLp` (string): Burned LP amount
    - `list` (array):
      - `tick` (string):
      - `amount` (string):
      - `to` (string):
      - `ts` (number):
  - `lock_lp` (object): Lock LP history data (if requested)
    - `total` (number):
    - `list` (array):
      - `id` (string):
      - `address` (string):
      - `tick0` (string):
      - `tick1` (string):
      - `lp` (string):
      - `amount0` (string):
      - `amount1` (string):
      - `amount0USD` (string):
      - `amount1USD` (string):
      - `lockDay` (number):
      - `unlockTime` (string):
      - `ts` (number):
      - `shareOfPool` (string):
  - `unlock_lp` (object): Unlock LP history data (if requested)
    - `total` (number):
    - `list` (array):
      - `id` (string):
      - `address` (string):
      - `tick0` (string):
      - `tick1` (string):
      - `lp` (string):
      - `amount0` (string):
      - `amount1` (string):
      - `amount0USD` (string):
      - `amount1USD` (string):
      - `ts` (number):
  - `multi_swap` (object): Multi swap history data (if requested)
    - `total` (number):
    - `list` (array):
      - `address` (string):
      - `tickIn` (string): required; Input tick
      - `tickOut` (string): required; Output tick
      - `amountIn` (string): required; The amount of input tick
      - `amountOut` (string): required; The amount of output tick
      - `exactType` (string):
      - `ts` (number):
      - `value` (number): Swap value
      - `route0` (object): First route details
        - `id` (string):
        - `tickIn` (string):
        - `tickOut` (string):
        - `amountIn` (string):
        - `amountOut` (string):
        - `exactType` (string):
        - `ts` (number):
        - `success` (boolean):
        - `failureReason` (string):
      - `route1` (object): Second route details
        - `id` (string):
        - `tickIn` (string):
        - `tickOut` (string):
        - `amountIn` (string):
        - `amountOut` (string):
        - `exactType` (string):
        - `ts` (number):
        - `success` (boolean):
        - `failureReason` (string):


---

