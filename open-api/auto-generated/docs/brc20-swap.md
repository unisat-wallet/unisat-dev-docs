# BRC20 Swap API

BRC20 Swap API provides a set of interfaces for BRC20 Swap and InSwap services. It allows users to interact with the BRC20 Swap ecosystem, including balance checks, pool information, liquidity management, and token transfers.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---
## 📑 Table of Contents

| Route | Summary |
| ----- | ------- |
| [GET `/v1/brc20-swap/config`](#swaps-global-configuration-information) | Swap's global configuration information. |
| [GET `/v1/brc20-swap/balance`](#gets-the-balance-for-the-specified-address-and-tick) | Gets the balance for the specified address and tick. |
| [GET `/v1/brc20-swap/all_balance`](#gets-all-brc20-token-balances-for-a-specified-address) | Gets all BRC20 token balances for a specified address. |
| [GET `/v1/brc20-swap/pool_info`](#get-pool-information-based-on-trade-pair) | Get Pool information based on trade pair. |
| [GET `/v1/brc20-swap/select`](#select-the-tick-information-that-you-can-use-based-on-the-address) | Select the tick information that you can use based on the address. |
| [GET `/v1/brc20-swap/pre_deploy_pool`](#prepare-deploy-pool-operation) | Prepare deploy pool operation |
| [POST `/v1/brc20-swap/deploy_pool`](#deploy-the-pool-operation) | Deploy the pool operation. |
| [GET `/v1/brc20-swap/pre_add_liq`](#prepare-add-liquidity-operation) | Prepare add liquidity operation |
| [POST `/v1/brc20-swap/add_liq`](#add-the-liquidity-operation) | Add the liquidity operation |
| [GET `/v1/brc20-swap/pre_remove_liq`](#prepare-remove-liquidity-operation) | Prepare remove liquidity operation |
| [POST `/v1/brc20-swap/remove_liq`](#remove-the-liquidity-operation) | Remove the liquidity operation |
| [GET `/v1/brc20-swap/pre_send`](#prepare-send-operation) | Prepare send operation |
| [POST `/v1/brc20-swap/pre_batch_send`](#prepare-batch-send-operation) | Prepare batch send operation |
| [GET `/v1/brc20-swap/pre_swap`](#prepare-swap-operation) | Prepare swap operation |
| [POST `/v1/brc20-swap/send`](#the-send-operation) | The send operation. |
| [POST `/v1/brc20-swap/batch_send`](#the-batch-send-operation) | The batch send operation. |
| [POST `/v1/brc20-swap/swap`](#the-swap-operation) | The swap operation. |
| [GET `/v1/brc20-swap/pool_list`](#gets-the-pool-list-information) | Gets the pool list information. |
| [GET `/v1/brc20-swap/my_pool_list`](#gets-the-users-pool-list-information) | Gets the user's pool list information. |
| [GET `/v1/brc20-swap/my_pool`](#gets-the-user-pool-information-for-the-specified-pair) | Gets the user pool information for the specified pair. |
| [GET `/v1/brc20-swap/overview`](#an-overview-of-swap-information) | An overview of swap information |
| [GET `/v1/brc20-swap/gas_history`](#gets-the-gas-consumption-records-for-a-user-aggregation-operation) | Gets the gas consumption records for a user aggregation operation. |
| [GET `/v1/brc20-swap/send_history`](#gets-the-history-of-send-transaction) | Gets the history of send transaction. |
| [GET `/v1/brc20-swap/liq_history`](#gets-the-history-of-a-pair-addition-pool) | Gets the history of a pair addition pool. |
| [GET `/v1/brc20-swap/swap_history`](#gets-the-history-of-swap) | Gets the history of swap. |
| [GET `/v1/brc20-swap/rollup_history`](#get-chain-history-of-rollup-inscription) | Get chain history of rollup inscription. |
| [GET `/v1/brc20-swap/deposit_list`](#gets-the-deposit-list-for-a-user) | Gets the deposit list for a user. |
| [GET `/v1/brc20-swap/create_deposit`](#create-a-deposit-psbt-to-be-signed-by-the-user) | Create a deposit psbt to be signed by the user. |
| [POST `/v1/brc20-swap/confirm_deposit`](#user-signature-deposit-psbt-submit-confirmation) | User signature deposit psbt, submit confirmation. |
| [GET `/v1/brc20-swap/system_status`](#gets-the-current-system-state) | Gets the current system state. |
| [GET `/v1/brc20-swap/withdraw_history`](#gets-the-user-withdrawal-history) | Gets the user withdrawal history. |
| [GET `/v1/brc20-swap/create_retry_withdraw`](#retry-create-a-withdraw-psbt-to-be-signed-by-the-user) | Retry create a withdraw psbt to be signed by the user. |
| [POST `/v1/brc20-swap/confirm_retry_withdraw`](#user-signature-withdraw-psbt-submit-confirmation) | User signature withdraw psbt, submit confirmation. |
| [GET `/v1/brc20-swap/create_withdraw`](#create-a-withdraw-psbt-to-be-signed-by-the-user) | Create a withdraw psbt to be signed by the user. |
| [POST `/v1/brc20-swap/confirm_withdraw`](#user-signature-withdraw-psbt-submit-confirmation) | User signature withdraw psbt, submit confirmation. |
| [GET `/v1/brc20-swap/withdraw_process`](#gets-the-withdrawal-progress-for-the-specified-id) | Gets the withdrawal progress for the specified ID. |
| [GET `/v1/brc20-swap/quote_swap`](#returns-the-estimated-number-of-swaps-based-on-the-input-and-exact-type) | Returns the estimated number of swaps based on the input and exact type. |
| [GET `/v1/brc20-swap/quote_add_liq`](#based-on-the-pair-to-get-the-actual-addition-ratio-lp-number-and-other-information) | Based on the pair to get the actual addition ratio, LP number and other information. |
| [GET `/v1/brc20-swap/quote_remove_liq`](#estimate-the-number-of-ticks-you-can-get-by-typing-lp) | Estimate the number of ticks you can get by typing LP. |
| [GET `/v1/brc20-swap/pre_stake`](#prepare-stake-operation) | Prepare stake operation |
| [GET `/v1/brc20-swap/pre_unstake`](#prepare-unstake-operation) | Prepare unstake operation |
| [GET `/v1/brc20-swap/pre_claim`](#prepare-claim-operation) | Prepare claim operation |
| [GET `/v1/brc20-swap/pre_send_lp`](#prepare-send-lp-operation) | Prepare send LP operation |
| [POST `/v1/brc20-swap/send_lp`](#the-send-lp-operation) | The send LP operation. |
| [POST `/v1/brc20-swap/stake`](#the-stake-operation) | The stake operation. |
| [POST `/v1/brc20-swap/unstake`](#the-unstake-operation) | The unstake operation. |
| [POST `/v1/brc20-swap/claim`](#the-claim-operation) | The claim operation. |
| [GET `/v1/brc20-swap/lp_reward_history`](#gets-the-user-pool-information-for-the-specified-pair) | Gets the user pool information for the specified pair. |
| [GET `/v1/brc20-swap/stake_history`](#gets-the-stake-history) | Gets the stake history. |
| [GET `/v1/brc20-swap/stake_list`](#gets-the-stake-list) | Gets the stake list. |
| [GET `/v1/brc20-swap/stake_item`](#gets-the-stake-item) | Gets the stake item. |
| [GET `/v1/brc20-swap/stake_user_info`](#gets-the-user-info) | Gets the user info. |
| [GET `/v1/brc20-swap/user_info`](#gets-the-user-info) | Gets the user info. |
| [GET `/v1/brc20-swap/select_deposit`](#select-deposit-information) | Select deposit information |
| [GET `/v1/brc20-swap/func_info`](#gets-the-func-info) | Gets the func info. |
| [GET `/v1/brc20-swap/deposit_balance`](#gets-the-deposit-balance) | Gets the deposit balance |
| [GET `/v1/brc20-swap/deposit_process`](#gets-the-deposit-process) | Gets the deposit process. |
| [GET `/v1/brc20-swap/tick_price`](#gets-the-tick-price) | Gets the tick price |
| [GET `/v1/brc20-swap/address_gas`](#gets-the-addresss-total-tick-fee) | Gets the address's total tick fee |
| [GET `/v1/brc20-swap/price_line`](#gets-the-price-line) | Gets the price line. |
| [GET `/v1/brc20-swap/tick_holders`](#gets-the-tick-holders) | Gets the tick holders. |
| [GET `/v1/brc20-swap/pool_holders`](#gets-the-pool-holders) | Gets the pool holders. |
| [GET `/v1/brc20-swap/reward_curve`](#get-reward-curve-data) | Get reward curve data. |
| [GET `/v1/brc20-swap/send_lp_history`](#gets-the-history-of-send-lp-transaction) | Gets the history of send lp transaction. |
| [GET `/v1/brc20-swap/burn_history`](#gets-the-history-of-burn-transaction) | Gets the history of burn transaction. |
| [GET `/v1/brc20-swap/task_list`](#get-task-list-for-address) | Get task list for address. |
| [GET `/v1/brc20-swap/address_usd`](#get-address-usd) | Get address usd. |
| [GET `/v1/brc20-swap/pre_lock_lp`](#prepare-lock-lp-operation) | Prepare lock LP operation |
| [POST `/v1/brc20-swap/lock_lp`](#the-lock-lp-operation) | The lock lp operation. |
| [GET `/v1/brc20-swap/pre_unlock_lp`](#prepare-unlock-lp-operation) | Prepare unlock LP operation |
| [POST `/v1/brc20-swap/unlock_lp`](#the-unlock-lp-operation) | The unlock lp operation. |
| [GET `/v1/brc20-swap/lock_lp_history`](#gets-the-history-of-lock-lp-transaction) | Gets the history of lock lp transaction. |
| [GET `/v1/brc20-swap/unlock_lp_history`](#gets-the-history-of-unlock-lp-transaction) | Gets the history of unlock lp transaction. |
| [GET `/v1/brc20-swap/export_lock_lp_history`](#export-lock-lp-history-to-csv-file) | Export lock lp history to CSV file. |
| [GET `/v1/brc20-swap/my_lock_lp`](#gets-the-user-lock-lp) | Gets the user lock lp. |
| [GET `/v1/brc20-swap/select_pool`](#select-the-tick-information-that-you-can-swap) | Select the tick information that you can swap. |
| [GET `/v1/brc20-swap/pre_multi_swap`](#prepare-multi-swap-operation) | Prepare multi swap operation |
| [POST `/v1/brc20-swap/multi_swap`](#the-multi-swap-operation) | The multi swap operation. |
| [GET `/v1/brc20-swap/quote_multi_swap`](#returns-the-estimated-number-of-multi-swaps-based-on-the-input-and-exact-type) | Returns the estimated number of multi swaps based on the input and exact type. |
| [GET `/v1/brc20-swap/multi_swap_history`](#gets-the-history-of-multi-swap) | Gets the history of multi swap. |
| [POST `/v1/brc20-swap/batch_history`](#batch-query-multiple-history-types-in-a-single-request) | Batch query multiple history types in a single request. |

---

## brc20-swap

### Swap's global configuration information.
<a id="swaps-global-configuration-information"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/config`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapConfig)  

#### Description
This interface provides the global configuration information for the BRC20 Swap service. It includes details such as the module ID, service gas tick, and pending deposit confirmation numbers.

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

### Gets the balance for the specified address and tick.
<a id="gets-the-balance-for-the-specified-address-and-tick"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/balance`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapBalance)  

#### Description
This interface retrieves the balance for a specific address and tick in the BRC20 Swap service. It returns the confirmed module balance, swap balance, pending swap balance, and pending available balance.

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

### Gets all BRC20 token balances for a specified address.
<a id="gets-all-brc20-token-balances-for-a-specified-address"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/all_balance`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapAllBalances)  

#### Description
This interface retrieves the complete list of all BRC20 token balances for a specific wallet address in the BRC20 Swap service. For each tick, it returns detailed balance information including the confirmed module balance, swap balance, pending swap balance, and pending available balance.

#### Parameters
- `address` (query, string) **(required)**: 
- `pubkey` (query, string): 

#### Response (200)
Successful response returning all token balances for the address.

- `code` (number): required
- `msg` (string): required
- `data` (object): required; A map where each key is a token ticker symbol.


---

### Get Pool information based on trade pair.
<a id="get-pool-information-based-on-trade-pair"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pool_info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapPoolInfo)  

#### Description
This interface retrieves the pool information for a specific trade pair in the BRC20 Swap service. It includes details such as whether the pool exists, if liquidity has been added, tick prices, LP quantity, TVL, volume, and rewards.

#### Parameters
- `tick0` (query, string): 
- `tick1` (query, string): 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `existed` (boolean): Whether the pool exists
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

### Select the tick information that you can use based on the address.
<a id="select-the-tick-information-that-you-can-use-based-on-the-address"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/select`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapSelect)  

#### Description
This interface retrieves the tick information that can be used for swapping based on the provided address. It returns the tick, decimal, BRC20 balance, and swap balance for each available tick.

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

### Prepare deploy pool operation
<a id="prepare-deploy-pool-operation"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pre_deploy_pool`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapPreDeployPool)  

#### Description
This interface pre-loads the /deploy_pool operation, providing the signature content, gas, and byte information required for deploying a pool in the BRC20 Swap service.

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

### Deploy the pool operation.
<a id="deploy-the-pool-operation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/deploy_pool`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/postBrc20SwapDeployPool)  

#### Description
This interface deploys a pool in the BRC20 Swap service. It requires the address, tick0, tick1, timestamp, fee tick, and user signatures to complete the operation.

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

### Prepare add liquidity operation
<a id="prepare-add-liquidity-operation"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pre_add_liq`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapPreAddLiq)  

#### Description
This interface pre-loads the /add_liq operation, providing the signature content, gas, and byte information required for adding liquidity in the BRC20 Swap service.

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

### Add the liquidity operation
<a id="add-the-liquidity-operation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/add_liq`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/undefined)  

#### Description
This interface adds liquidity to a pool in the BRC20 Swap service. It requires the address, tick0, tick1, amounts, LP, slippage, timestamp, fee tick, and user signatures to complete the operation.

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

### Prepare remove liquidity operation
<a id="prepare-remove-liquidity-operation"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pre_remove_liq`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapPreRemoveLiq)  

#### Description
This interface pre-loads the /remove_liq operation, providing the signature content, gas, and byte information required for removing liquidity in the BRC20 Swap service.

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

### Remove the liquidity operation
<a id="remove-the-liquidity-operation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/remove_liq`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/undefined)  

#### Description
This interface removes liquidity from a pool in the BRC20 Swap service. It requires the address, tick0, tick1, amounts, LP, slippage, timestamp, fee tick, and user signatures to complete the operation.

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

### Prepare send operation
<a id="prepare-send-operation"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pre_send`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapPreSend)  

#### Description
This interface pre-loads the /send operation, providing the signature content, gas, and byte information required for sending a tick in the BRC20 Swap service.

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

### Prepare batch send operation
<a id="prepare-batch-send-operation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/pre_batch_send`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/undefined)  

#### Description
This interface pre-loads the /batch_send operation, providing the signature content, gas, and byte information required for sending multiple ticks in the BRC20 Swap service. The request can provide either a shared amount or an amountList aligned with the recipients.

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

### Prepare swap operation
<a id="prepare-swap-operation"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pre_swap`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapPreSwap)  

#### Description
This interface pre-loads the /swap operation, providing the signature content, gas, and byte information required for swapping ticks in the BRC20 Swap service.

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

### The send operation.
<a id="the-send-operation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/send`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/postBrc20SwapSend)  

#### Description
This interface sends a tick in the BRC20 Swap service. It requires the address, tick, amount, receiver, timestamp, fee tick, and user signatures to complete the operation.

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

### The batch send operation.
<a id="the-batch-send-operation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/batch_send`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/postBrc20SwapBatchSend)  

#### Description
This interface sends multiple ticks in the BRC20 Swap service. It requires the address, tick, amount or amountList, receivers, timestamp, fee tick, and user signatures to complete the operation.

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

### The swap operation.
<a id="the-swap-operation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/swap`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/postBrc20SwapSwap)  

#### Description
This interface swaps ticks in the BRC20 Swap service. It requires the address, input tick, output tick, input amount, output amount, slippage, exact type, timestamp, fee tick, and user signatures to complete the operation.

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

### Gets the pool list information.
<a id="gets-the-pool-list-information"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pool_list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapPoolList)  

#### Description
This interface retrieves the pool list information in the BRC20 Swap service. It supports filtering by address, tick, and fuzzy matching, and allows pagination through start and limit parameters.

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

### Gets the user's pool list information.
<a id="gets-the-users-pool-list-information"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/my_pool_list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapMyPoolList)  

#### Description
This interface retrieves the user's pool list information in the BRC20 Swap service. It supports filtering by address, tick, and pagination through start and limit parameters.

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

### Gets the user pool information for the specified pair.
<a id="gets-the-user-pool-information-for-the-specified-pair"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/my_pool`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapMyPool)  

#### Description
This interface retrieves the user pool information for a specific pair in the BRC20 Swap service. It requires the address, tick0, and tick1 parameters to identify the pool.

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

### An overview of swap information
<a id="an-overview-of-swap-information"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/overview`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapOverview)  

#### Description
This interface provides an overview of the swap information in the BRC20 Swap service, including total liquidity, 7-day volume, 24-hour volume, number of transactions, and number of pairs.

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

### Gets the gas consumption records for a user aggregation operation.
<a id="gets-the-gas-consumption-records-for-a-user-aggregation-operation"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/gas_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapGasHistory)  

#### Description
This interface retrieves the gas consumption records for a user aggregation operation in the BRC20 Swap service. It supports filtering by address and pagination through start and limit parameters.

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

### Gets the history of send transaction.
<a id="gets-the-history-of-send-transaction"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/send_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapSendHistory)  

#### Description
This interface retrieves the history of send transactions in the BRC20 Swap service. It supports filtering by address, tick, and pagination through start and limit parameters.

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

### Gets the history of a pair addition pool.
<a id="gets-the-history-of-a-pair-addition-pool"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/liq_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapLiqHistory)  

#### Description
This interface retrieves the history of pair addition pools in the BRC20 Swap service. It supports filtering by address, tick, type (add or remove), and pagination through start and limit parameters.

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

### Gets the history of swap.
<a id="gets-the-history-of-swap"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/swap_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapSwapHistory)  

#### Description
This interface retrieves the history of swap transactions in the BRC20 Swap service. It supports filtering by address, tick, and pagination through start and limit parameters.

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

### Get chain history of rollup inscription.
<a id="get-chain-history-of-rollup-inscription"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/rollup_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapRollupHistory)  

#### Description
This interface retrieves the chain history of rollup inscriptions in the BRC20 Swap service. It supports filtering by inscription ID and pagination through start and limit parameters.

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

### Gets the deposit list for a user.
<a id="gets-the-deposit-list-for-a-user"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/deposit_list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapDepositList)  

#### Description
This interface retrieves the deposit list for a user in the BRC20 Swap service. It supports filtering by address, tick, and pagination through start and limit parameters.

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

### Create a deposit psbt to be signed by the user.
<a id="create-a-deposit-psbt-to-be-signed-by-the-user"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/create_deposit`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapCreateDeposit)  

#### Description
This interface creates a deposit PSBT to be signed by the user in the BRC20 Swap service. Fractal BRC20 deposits only require the public key and address, while bridge deposits also require amount, tick, assetType, and networkType.

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

### User signature deposit psbt, submit confirmation.
<a id="user-signature-deposit-psbt-submit-confirmation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/confirm_deposit`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/postBrc20SwapConfirmDeposit)  

#### Description
This interface allows the user to sign the deposit PSBT and submit the confirmation in the BRC20 Swap service. It always requires the PSBT. Bridge deposits also require the deposit context fields such as pubkey, address, amount, tick, assetType, and networkType.

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

### Gets the current system state.
<a id="gets-the-current-system-state"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/system_status`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapSystemStatus)  

#### Description
This interface retrieves the current system state of the BRC20 Swap service, including whether rollup inscription committing is enabled.

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `committing` (boolean): Is rollup inscription committing


---

### Gets the user withdrawal history.
<a id="gets-the-user-withdrawal-history"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/withdraw_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapWithdrawHistory)  

#### Description
This interface retrieves the user withdrawal history in the BRC20 Swap service. It supports filtering by address, pagination through start and limit parameters, and an optional tick parameter.

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

### Retry create a withdraw psbt to be signed by the user.
<a id="retry-create-a-withdraw-psbt-to-be-signed-by-the-user"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/create_retry_withdraw`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapCreateRetryWithdraw)  

#### Description
This interface retries to create a withdrawal PSBT to be signed by the user in the BRC20 Swap service. It requires the withdrawal order ID, public key, and address parameters to generate the PSBT.

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

### User signature withdraw psbt, submit confirmation.
<a id="user-signature-withdraw-psbt-submit-confirmation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/confirm_retry_withdraw`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/postBrc20SwapConfirmRetryWithdraw)  

#### Description
This interface allows the user to sign the retry withdrawal PSBT and submit the confirmation in the BRC20 Swap service. It requires the withdrawal order ID, payment PSBT, and approve PSBT to complete the operation.

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

### Create a withdraw psbt to be signed by the user.
<a id="create-a-withdraw-psbt-to-be-signed-by-the-user"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/create_withdraw`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapCreateWithdraw)  

#### Description
This interface creates a withdrawal PSBT to be signed by the user in the BRC20 Swap service. It requires the public key, address, tick, amount, timestamp, fee tick, and payType parameters to generate the PSBT.

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

### User signature withdraw psbt, submit confirmation.
<a id="user-signature-withdraw-psbt-submit-confirmation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/confirm_withdraw`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/postBrc20SwapConfirmWithdraw)  

#### Description
This interface allows the user to sign the withdrawal PSBT and submit the confirmation in the BRC20 Swap service. It requires the withdrawal order ID, payment PSBT, approve PSBT, fee tick, and payType. Bridge withdrawals also carry assetType and networkType.

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

### Gets the withdrawal progress for the specified ID.
<a id="gets-the-withdrawal-progress-for-the-specified-id"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/withdraw_process`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapWithdrawProcess)  

#### Description
This interface retrieves the withdrawal progress for a specific ID in the BRC20 Swap service. It requires the ID parameter to identify the withdrawal order.

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
  - `rollUpTxid` (string): Transaction ID of the rollup inscription required for a withdrawal decrease operation.
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

### Returns the estimated number of swaps based on the input and exact type.
<a id="returns-the-estimated-number-of-swaps-based-on-the-input-and-exact-type"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/quote_swap`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapQuoteSwap)  

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

### Based on the pair to get the actual addition ratio, LP number and other information.
<a id="based-on-the-pair-to-get-the-actual-addition-ratio-lp-number-and-other-information"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/quote_add_liq`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapQuoteAddLiq)  

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

### Estimate the number of ticks you can get by typing LP.
<a id="estimate-the-number-of-ticks-you-can-get-by-typing-lp"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/quote_remove_liq`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapQuoteRemoveLiq)  

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

### Prepare stake operation
<a id="prepare-stake-operation"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pre_stake`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapPreStake)  

#### Description
This interface pre-loads the /stake operation, providing the signature content, gas, and byte information required for staking in the BRC20 Swap service.

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

### Prepare unstake operation
<a id="prepare-unstake-operation"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pre_unstake`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapPreUnstake)  

#### Description
This interface pre-loads the /unstake operation, providing the signature content, gas, and byte information required for unstaking in the BRC20 Swap service.

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

### Prepare claim operation
<a id="prepare-claim-operation"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pre_claim`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapPreClaim)  

#### Description
This interface pre-loads the /claim operation, providing the signature content, gas, and byte information required for claiming rewards in the BRC20 Swap service.

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

### Prepare send LP operation
<a id="prepare-send-lp-operation"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pre_send_lp`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapPreSendLp)  

#### Description
This interface pre-loads the /send_lp operation, providing the signature content, gas, and byte information required for sending LP in the BRC20 Swap service.

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

### The send LP operation.
<a id="the-send-lp-operation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/send_lp`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/postBrc20SwapSendLp)  

#### Description
This interface sends LP in the BRC20 Swap service. It requires the address, tick0, tick1, amount, receiver, timestamp, fee tick, and user signatures to complete the operation.

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

### The stake operation.
<a id="the-stake-operation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/stake`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/postBrc20SwapStake)  

#### Description
This interface stakes LP in the BRC20 Swap service. It requires the pid, address, amount, timestamp, fee tick, and user signatures to complete the operation.

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

### The unstake operation.
<a id="the-unstake-operation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/unstake`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/postBrc20SwapUnstake)  

#### Description
This interface unstakes LP in the BRC20 Swap service. It requires the pid, address, amount, timestamp, fee tick, and user signatures to complete the operation.

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

### The claim operation.
<a id="the-claim-operation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/claim`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/postBrc20SwapClaim)  

#### Description
This interface claims rewards in the BRC20 Swap service. It requires the pid, address, timestamp, fee tick, and user signatures to complete the operation.

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

### Gets the user pool information for the specified pair.
<a id="gets-the-user-pool-information-for-the-specified-pair"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/lp_reward_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapLpRewardHistory)  

#### Description
This interface retrieves the LP reward history for a specific pair in the BRC20 Swap service. It requires the address, tick0, tick1, and pagination parameters.

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

### Gets the stake history.
<a id="gets-the-stake-history"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/stake_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapStakeHistory)  

#### Description
This interface retrieves the stake history in the BRC20 Swap service. It supports filtering by pid, address, type, and pagination through start and limit parameters.

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

### Gets the stake list.
<a id="gets-the-stake-list"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/stake_list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapStakeList)  

#### Description
This interface retrieves the stake list in the BRC20 Swap service.

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

### Gets the stake item.
<a id="gets-the-stake-item"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/stake_item`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapStakeItem)  

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

### Gets the user info.
<a id="gets-the-user-info"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/stake_user_info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapStakeUserInfo)  

#### Description
This interface retrieves the stake user information in the BRC20 Swap service.

#### Parameters
- `address` (query, string): 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object): required


---

### Gets the user info.
<a id="gets-the-user-info"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/user_info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapUserInfo)  

#### Description
This interface retrieves the user information in the BRC20 Swap service.

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

### Select deposit information
<a id="select-deposit-information"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/select_deposit`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapSelectDeposit)  

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

### Gets the func info.
<a id="gets-the-func-info"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/func_info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapFuncInfo)  

#### Parameters
- `id` (query, string) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object): required


---

### Gets the deposit balance
<a id="gets-the-deposit-balance"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/deposit_balance`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapDepositBalance)  

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

### Gets the deposit process.
<a id="gets-the-deposit-process"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/deposit_process`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapDepositProcess)  

#### Description
This interface retrieves the deposit process for a specific transaction ID in the BRC20 Swap service.

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

### Gets the tick price
<a id="gets-the-tick-price"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/tick_price`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapTickPrice)  

#### Description
This interface retrieves the price for a specific tick in the BRC20 Swap service.

#### Parameters
- `tick` (query, string) **(required)**: 

#### Response (200)
Default Response

- `code` (number): required
- `msg` (string): required
- `data` (object):
  - `price` (number):


---

### Gets the address's total tick fee
<a id="gets-the-addresss-total-tick-fee"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/address_gas`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapAddressGas)  

#### Description
This interface retrieves the total gas consumption for a specific address and fee tick in the BRC20 Swap service.

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

### Gets the price line.
<a id="gets-the-price-line"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/price_line`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapPriceLine)  

#### Description
This interface retrieves the price line data for a specific pair in the BRC20 Swap service.

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

### Gets the tick holders.
<a id="gets-the-tick-holders"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/tick_holders`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapTickHolders)  

#### Description
This interface retrieves the list of tick holders for a specific tick in the BRC20 Swap service.

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

### Gets the pool holders.
<a id="gets-the-pool-holders"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pool_holders`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapPoolHolders)  

#### Description
This interface retrieves the list of pool holders for a specific pair in the BRC20 Swap service.

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

### Get reward curve data.
<a id="get-reward-curve-data"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/reward_curve`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapRewardCurve)  

#### Description
This interface retrieves the reward curve data for a specific pair and time range in the BRC20 Swap service.

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

### Gets the history of send lp transaction.
<a id="gets-the-history-of-send-lp-transaction"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/send_lp_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapSendLpHistory)  

#### Description
This interface retrieves the history of send LP transactions in the BRC20 Swap service. It supports filtering by address, tick, and pagination through start and limit parameters.

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

### Gets the history of burn transaction.
<a id="gets-the-history-of-burn-transaction"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/burn_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapBurnHistory)  

#### Description
This interface retrieves the history of burn transactions in the BRC20 Swap service. It supports filtering by address, tick, and pagination through start and limit parameters.

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

### Get task list for address.
<a id="get-task-list-for-address"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/task_list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapTaskList)  

#### Description
This interface retrieves the task list for a specific address in the BRC20 Swap service.

#### Parameters
- `tid` (query, string): 
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

### Get address usd.
<a id="get-address-usd"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/address_usd`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapAddressUsd)  

#### Description
This interface retrieves the USD value of assets for a specific address in the BRC20 Swap service.

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

### Prepare lock LP operation
<a id="prepare-lock-lp-operation"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pre_lock_lp`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapPreLockLp)  

#### Description
This interface pre-loads the /lock_lp operation, providing the signature content, gas, and byte information required for locking LP in the BRC20 Swap service.

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

### The lock lp operation.
<a id="the-lock-lp-operation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/lock_lp`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/postBrc20SwapLockLp)  

#### Description
This interface locks LP in the BRC20 Swap service. It requires the address, lockDay, tick0, tick1, amount, timestamp, fee tick, and user signatures to complete the operation.

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

### Prepare unlock LP operation
<a id="prepare-unlock-lp-operation"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pre_unlock_lp`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapPreUnlockLp)  

#### Description
This interface pre-loads the /unlock_lp operation, providing the signature content, gas, and byte information required for unlocking LP in the BRC20 Swap service.

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

### The unlock lp operation.
<a id="the-unlock-lp-operation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/unlock_lp`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/postBrc20SwapUnlockLp)  

#### Description
This interface unlocks LP in the BRC20 Swap service. It requires the address, tick0, tick1, amount, timestamp, fee tick, and user signatures to complete the operation.

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

### Gets the history of lock lp transaction.
<a id="gets-the-history-of-lock-lp-transaction"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/lock_lp_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapLockLpHistory)  

#### Description
This interface retrieves the history of lock LP transactions in the BRC20 Swap service. It supports filtering by address, tick, lockDay, and pagination through start and limit parameters.

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

### Gets the history of unlock lp transaction.
<a id="gets-the-history-of-unlock-lp-transaction"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/unlock_lp_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapUnlockLpHistory)  

#### Description
This interface retrieves the history of unlock LP transactions in the BRC20 Swap service. It supports filtering by address, tick, and pagination through start and limit parameters.

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

### Export lock lp history to CSV file.
<a id="export-lock-lp-history-to-csv-file"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/export_lock_lp_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapExportLockLpHistory)  

#### Description
This interface exports the lock LP history to a CSV file in the BRC20 Swap service.

#### Parameters
- `tick0` (query, string) **(required)**: 
- `tick1` (query, string) **(required)**: 
- `lockDay` (query, number): 
- `lockTime` (query, number): 

#### Response (200)
CSV file download


---

### Gets the user lock lp.
<a id="gets-the-user-lock-lp"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/my_lock_lp`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapMyLockLp)  

#### Description
This interface retrieves the user's lock LP information for a specific pair in the BRC20 Swap service.

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

### Select the tick information that you can swap.
<a id="select-the-tick-information-that-you-can-swap"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/select_pool`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapSelectPool)  

#### Description
This interface retrieves the tick information that can be used for swapping based on the provided address and optional filters.

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

### Prepare multi swap operation
<a id="prepare-multi-swap-operation"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pre_multi_swap`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapPreMultiSwap)  

#### Description
This interface pre-loads the /multi_swap operation, providing the signature content and gas information required for multi swapping in the BRC20 Swap service.

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

### The multi swap operation.
<a id="the-multi-swap-operation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/multi_swap`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/postBrc20SwapMultiSwap)  

#### Description
This interface performs multi swaps in the BRC20 Swap service. It requires an array of swap items, each with address, input tick, output tick, amounts, slippage, exact type, timestamp, fee tick, and user signatures to complete the operation.

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

### Returns the estimated number of multi swaps based on the input and exact type.
<a id="returns-the-estimated-number-of-multi-swaps-based-on-the-input-and-exact-type"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/quote_multi_swap`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapQuoteMultiSwap)  

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

### Gets the history of multi swap.
<a id="gets-the-history-of-multi-swap"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/multi_swap_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapMultiSwapHistory)  

#### Description
This interface retrieves the history of multi swap transactions in the BRC20 Swap service. It supports filtering by address, tick, and pagination through start and limit parameters.

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

### Batch query multiple history types in a single request.
<a id="batch-query-multiple-history-types-in-a-single-request"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/batch_history`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/postBrc20SwapBatchHistory)  

#### Description
This interface retrieves multiple history types in a single request in the BRC20 Swap service. It supports querying multiple history types (gas, send, liq, swap, withdraw, stake, send_lp, burn, lock_lp, unlock_lp, multi_swap) with shared pagination parameters (start, limit, address).

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

