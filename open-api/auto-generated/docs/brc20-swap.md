# BRC20 Swap API

BRC20 Swap API provides a set of interfaces for BRC20 Swap and PizzaSwap services. It allows users to interact with the BRC20 Swap ecosystem, including balance checks, pool information, liquidity management, and token transfers.

👉 [View Swagger UI](https://open-api.unisat.io/#/)

---

## 📑 Table of Contents

- [brc20-swap](#brc20-swap)
  - [/v1/brc20-swap/config (Swap's global configuration information.) ](#swaps-global-configuration-information)
  - [/v1/brc20-swap/balance (Gets the balance for the specified address and tick.) ](#gets-the-balance-for-the-specified-address-and-tick)
  - [/v1/brc20-swap/pool_info (Get Pool information based on trade pair.) ](#get-pool-information-based-on-trade-pair)
  - [/v1/brc20-swap/select (Select the tick information that you can use based on the address.) ](#select-the-tick-information-that-you-can-use-based-on-the-address)
  - [/v1/brc20-swap/pre_deploy_pool (Prepare deploy pool operation) ](#prepare-deploy-pool-operation)
  - [/v1/brc20-swap/deploy_pool (Deploy the pool operation.) ](#deploy-the-pool-operation)
  - [/v1/brc20-swap/pre_add_liq (Prepare add liquidity operation) ](#prepare-add-liquidity-operation)
  - [/v1/brc20-swap/add_liq (Add the liquidity operation) ](#add-the-liquidity-operation)
  - [/v1/brc20-swap/pre_remove_liq (Prepare remove liquidity operation) ](#prepare-remove-liquidity-operation)
  - [/v1/brc20-swap/remove_liq (Remove the liquidity operation) ](#remove-the-liquidity-operation)
  - [/v1/brc20-swap/pre_send (Prepare send operation) ](#prepare-send-operation)
  - [/v1/brc20-swap/pre_batch_send (Prepare batch send operation) ](#prepare-batch-send-operation)
  - [/v1/brc20-swap/pre_swap (Prepare swap operation) ](#prepare-swap-operation)
  - [/v1/brc20-swap/send (The send operation.) ](#the-send-operation)
  - [/v1/brc20-swap/batch_send (The batch send operation.) ](#the-batch-send-operation)
  - [/v1/brc20-swap/swap (The swap operation.) ](#the-swap-operation)
  - [/v1/brc20-swap/pool_list (Gets the pool list information.) ](#gets-the-pool-list-information)
  - [/v1/brc20-swap/my_pool_list (Gets the user's pool list information.) ](#gets-the-users-pool-list-information)
  - [/v1/brc20-swap/my_pool (Gets the user pool information for the specified pair.) ](#gets-the-user-pool-information-for-the-specified-pair)
  - [/v1/brc20-swap/overview (An overview of swap information) ](#an-overview-of-swap-information)
  - [/v1/brc20-swap/gas_history (Gets the gas consumption records for a user aggregation operation.) ](#gets-the-gas-consumption-records-for-a-user-aggregation-operation)
  - [/v1/brc20-swap/send_history (Gets the history of send transaction.) ](#gets-the-history-of-send-transaction)
  - [/v1/brc20-swap/liq_history (Gets the history of a pair addition pool.) ](#gets-the-history-of-a-pair-addition-pool)
  - [/v1/brc20-swap/swap_history (Gets the history of swap.) ](#gets-the-history-of-swap)
  - [/v1/brc20-swap/rollup_history (Get chain history of rollup inscription.) ](#get-chain-history-of-rollup-inscription)
  - [/v1/brc20-swap/deposit_list (Gets the deposit list for a user.) ](#gets-the-deposit-list-for-a-user)
  - [/v1/brc20-swap/create_deposit (Create a deposit psbt to be signed by the user.) ](#create-a-deposit-psbt-to-be-signed-by-the-user)
  - [/v1/brc20-swap/confirm_deposit (User signature deposit psbt, submit confirmation.) ](#user-signature-deposit-psbt-submit-confirmation)
  - [/v1/brc20-swap/system_status (Gets the current system state.) ](#gets-the-current-system-state)
  - [/v1/brc20-swap/withdraw_history (Gets the user withdrawal history.) ](#gets-the-user-withdrawal-history)
  - [/v1/brc20-swap/create_retry_withdraw (Retry create a withdraw psbt to be signed by the user.) ](#retry-create-a-withdraw-psbt-to-be-signed-by-the-user)
  - [/v1/brc20-swap/confirm_retry_withdraw (User signature withdraw psbt, submit confirmation.) ](#user-signature-withdraw-psbt-submit-confirmation)
  - [/v1/brc20-swap/create_withdraw (Create a withdraw psbt to be signed by the user.) ](#create-a-withdraw-psbt-to-be-signed-by-the-user)
  - [/v1/brc20-swap/confirm_withdraw (User signature withdraw psbt, submit confirmation.) ](#user-signature-withdraw-psbt-submit-confirmation)
  - [/v1/brc20-swap/withdraw_process (Gets the withdrawal progress for the specified ID.) ](#gets-the-withdrawal-progress-for-the-specified-id)

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
- `code` (number): 
- `msg` (string): 
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
- `address` (query) **(required)**: 
- `tick` (query) **(required)**: 

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `balance` (object):
    - `module` (string): Confirmed module balance.
    - `swap` (string): Confirmed swap balance.
    - `pendingSwap` (string): The balance converted from pending to swap.
    - `pendingAvailable` (string): The balance converted from pending to module.
  - `decimal` (string): 

---

### Get Pool information based on trade pair.
<a id="get-pool-information-based-on-trade-pair"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pool_info`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapPoolInfo)  

#### Description
This interface retrieves the pool information for a specific trade pair in the BRC20 Swap service. It includes details such as whether the pool exists, if liquidity has been added, tick prices, LP quantity, TVL, volume, and rewards.

#### Parameters
- `tick0` (query) : 
- `tick1` (query) : 

#### Response (200)
- `code` (number): 
- `msg` (string): 
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

---

### Select the tick information that you can use based on the address.
<a id="select-the-tick-information-that-you-can-use-based-on-the-address"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/select`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapSelect)  

#### Description
This interface retrieves the tick information that can be used for swapping based on the provided address. It returns the tick, decimal, BRC20 balance, and swap balance for each available tick.

#### Parameters
- `address` (query) **(required)**: 
- `search` (query) : Fuzzy matching

#### Response (200)
- `code` (number): 
- `msg` (string): 
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
- `address` (query) **(required)**: 
- `tick0` (query) **(required)**: 
- `tick1` (query) **(required)**: 
- `ts` (query) **(required)**: Timestamp (seconds)
- `feeTick` (query) **(required)**: Tick used as fee
- `payType` (query) : Pay Type: tick, freeQuota

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `ids` (array):

  - `signMsgs` (array):

  - `feeAmount` (string): The fee that the user needs to pay
  - `feeTickPrice` (string): The price of fee tick
  - `feeBalance` (string): The user's fee tick balance
  - `usdPrice` (string): The dollar value of the fee

---

### Deploy the pool operation.
<a id="deploy-the-pool-operation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/deploy_pool`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/postBrc20SwapDeployPool)  

#### Description
This interface deploys a pool in the BRC20 Swap service. It requires the address, tick0, tick1, timestamp, fee tick, and user signatures to complete the operation.

#### Response (200)
- `code` (number): 
- `msg` (string): 
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
- `address` (query) **(required)**: 
- `tick0` (query) **(required)**: 
- `tick1` (query) **(required)**: 
- `amount0` (query) **(required)**: Input amount of tick0
- `amount1` (query) **(required)**: Input amount of tick1
- `lp` (query) **(required)**: Expect amount of lp
- `slippage` (query) **(required)**: 
- `ts` (query) **(required)**: Timestamp (seconds)
- `feeTick` (query) **(required)**: Tick used as fee
- `payType` (query) : Pay Type: tick, freeQuota

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `ids` (array):

  - `signMsgs` (array):

  - `feeAmount` (string): The fee that the user needs to pay
  - `feeTickPrice` (string): The price of fee tick
  - `feeBalance` (string): The user's fee tick balance

---

### Add the liquidity operation
<a id="add-the-liquidity-operation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/add_liq`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/undefined)  

#### Description
This interface adds liquidity to a pool in the BRC20 Swap service. It requires the address, tick0, tick1, amounts, LP, slippage, timestamp, fee tick, and user signatures to complete the operation.

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `id` (string): Function id
  - `rollupInscriptionId` (string): The rollup inscription id where the function is located
  - `address` (string): 
  - `type` (string): 
  - `tick0` (string): 
  - `tick1` (string): 
  - `amount0` (string): Input amount of tick0
  - `amount1` (string): Input amount of tick1
  - `lp` (string): 
  - `ts` (number): 

---

### Prepare remove liquidity operation
<a id="prepare-remove-liquidity-operation"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pre_remove_liq`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapPreRemoveLiq)  

#### Description
This interface pre-loads the /remove_liq operation, providing the signature content, gas, and byte information required for removing liquidity in the BRC20 Swap service.

#### Parameters
- `address` (query) **(required)**: 
- `tick0` (query) **(required)**: 
- `tick1` (query) **(required)**: 
- `amount0` (query) **(required)**: Input amount of tick0
- `amount1` (query) **(required)**: Input amount of tick1
- `lp` (query) **(required)**: 
- `slippage` (query) **(required)**: 
- `ts` (query) **(required)**: 
- `feeTick` (query) **(required)**: Tick used as fee
- `payType` (query) : Pay Type: tick, freeQuota

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `ids` (array):

  - `signMsgs` (array):

  - `feeAmount` (string): The fee that the user needs to pay
  - `feeTickPrice` (string): The price of fee tick
  - `feeBalance` (string): The user's fee tick balance
  - `usdPrice` (string): The dollar value of the fee

---

### Remove the liquidity operation
<a id="remove-the-liquidity-operation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/remove_liq`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/undefined)  

#### Description
This interface removes liquidity from a pool in the BRC20 Swap service. It requires the address, tick0, tick1, amounts, LP, slippage, timestamp, fee tick, and user signatures to complete the operation.

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `id` (string): Function id
  - `rollupInscriptionId` (string): The rollup inscription id where the function is located
  - `address` (string): 
  - `type` (string): 
  - `tick0` (string): 
  - `tick1` (string): 
  - `amount0` (string): Input amount of tick0
  - `amount1` (string): Input amount of tick1
  - `lp` (string): 
  - `ts` (number): 

---

### Prepare send operation
<a id="prepare-send-operation"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pre_send`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapPreSend)  

#### Description
This interface pre-loads the /send operation, providing the signature content, gas, and byte information required for sending a tick in the BRC20 Swap service.

#### Parameters
- `address` (query) **(required)**: 
- `tick` (query) **(required)**: Send tick
- `amount` (query) **(required)**: The amount of send tick
- `to` (query) **(required)**: The receiver of send tick
- `ts` (query) **(required)**: Timestamp (seconds)
- `feeTick` (query) **(required)**: Tick used as fee
- `payType` (query) : Pay Type: tick, freeQuota

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `ids` (array):

  - `signMsgs` (array):

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
This interface pre-loads the /batch_send operation, providing the signature content, gas, and byte information required for sending multiple ticks in the BRC20 Swap service.

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `ids` (array):

  - `signMsgs` (array):

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
- `address` (query) **(required)**: 
- `tickIn` (query) **(required)**: Input tick
- `tickOut` (query) **(required)**: Output tick
- `amountIn` (query) **(required)**: The amount of input tick
- `amountOut` (query) **(required)**: The amount of output tick
- `slippage` (query) **(required)**: 
- `exactType` (query) **(required)**: 
- `ts` (query) **(required)**: Timestamp(seconds)
- `feeTick` (query) **(required)**: Tick used as fee
- `payType` (query) : Pay Type: tick, freeQuota

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `ids` (array):

  - `signMsgs` (array):

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

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):


---

### The batch send operation.
<a id="the-batch-send-operation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/batch_send`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/postBrc20SwapBatchSend)  

#### Description
This interface sends multiple ticks in the BRC20 Swap service. It requires the address, tick, amount, receivers, timestamp, fee tick, and user signatures to complete the operation.

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):


---

### The swap operation.
<a id="the-swap-operation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/swap`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/postBrc20SwapSwap)  

#### Description
This interface swaps ticks in the BRC20 Swap service. It requires the address, input tick, output tick, input amount, output amount, slippage, exact type, timestamp, fee tick, and user signatures to complete the operation.

#### Response (200)
- `code` (number): 
- `msg` (string): 
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

---

### Gets the pool list information.
<a id="gets-the-pool-list-information"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/pool_list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapPoolList)  

#### Description
This interface retrieves the pool list information in the BRC20 Swap service. It supports filtering by address, tick, and fuzzy matching, and allows pagination through start and limit parameters.

#### Parameters
- `search` (query) : Fuzzy matching
- `start` (query) **(required)**: 
- `limit` (query) **(required)**: 

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `total` (number): 
  - `list` (array):
    - `tick0` (string): 
    - `tick1` (string): 
    - `lp` (string): 
    - `tvl` (string): Total pool value
    - `volume24h` (string): 
    - `volume7d` (string): 

---

### Gets the user's pool list information.
<a id="gets-the-users-pool-list-information"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/my_pool_list`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapMyPoolList)  

#### Description
This interface retrieves the user's pool list information in the BRC20 Swap service. It supports filtering by address, tick, and pagination through start and limit parameters.

#### Parameters
- `address` (query) **(required)**: 
- `tick` (query) : 
- `start` (query) **(required)**: 
- `limit` (query) **(required)**: 

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `total` (number): 
  - `list` (array):
    - `lp` (string): 
    - `shareOfPool` (string): 
    - `tick0` (string): 
    - `tick1` (string): 
    - `amount0` (string): Amount of tick0
    - `amount1` (string): Amount of tick1
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
- `address` (query) **(required)**: 
- `tick0` (query) **(required)**: 
- `tick1` (query) **(required)**: 

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `lp` (string): 
  - `shareOfPool` (string): 
  - `tick0` (string): 
  - `tick1` (string): 
  - `amount0` (string): Amount of tick0
  - `amount1` (string): Amount of tick1

---

### An overview of swap information
<a id="an-overview-of-swap-information"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/overview`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapOverview)  

#### Description
This interface provides an overview of the swap information in the BRC20 Swap service, including total liquidity, 7-day volume, 24-hour volume, number of transactions, and number of pairs.

#### Response (200)
- `code` (number): 
- `msg` (string): 
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
- `address` (query) : 
- `start` (query) **(required)**: 
- `limit` (query) **(required)**: 

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `total` (number): 
  - `list` (array):
    - `funcType` (string): Function type (example: `swap`)
    - `tickA` (string): 
    - `tickB` (string): 
    - `gas` (string): 
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
- `address` (query) : 
- `tick` (query) : 
- `start` (query) **(required)**: 
- `limit` (query) **(required)**: 

#### Response (200)
- `code` (number): 
- `msg` (string): 
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
- `address` (query) : 
- `tick` (query) : 
- `type` (query) : Optional: add, remove
- `start` (query) **(required)**: 
- `limit` (query) **(required)**: 

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `total` (number): 
  - `list` (array):
    - `type` (string): 
    - `tick0` (string): 
    - `tick1` (string): 
    - `amount0` (string): 
    - `amount1` (string): 
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
- `address` (query) : 
- `tick` (query) : 
- `start` (query) **(required)**: 
- `limit` (query) **(required)**: 

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `total` (number): 
  - `list` (array):
    - `tickIn` (string): Input tick
    - `tickOut` (string): Output tick
    - `amountIn` (string): The amount of input tick
    - `amountOut` (string): The amount of output tick
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
- `start` (query) **(required)**: 
- `limit` (query) **(required)**: 

#### Response (200)
- `code` (number): 
- `msg` (string): 
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
- `address` (query) **(required)**: 
- `tick` (query) : 
- `start` (query) **(required)**: 
- `limit` (query) **(required)**: 

#### Response (200)
- `code` (number): 
- `msg` (string): 
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
This interface creates a deposit PSBT to be signed by the user in the BRC20 Swap service. It requires the inscription ID, public key, and address parameters to generate the PSBT.

#### Parameters
- `inscriptionId` (query) **(required)**: 
- `pubkey` (query) **(required)**: 
- `address` (query) **(required)**: 

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):
  - `psbt` (string): 
  - `type` (string): Direct or matching
  - `expiredTimestamp` (number): 
  - `recommendDeposit` (string): 

---

### User signature deposit psbt, submit confirmation.
<a id="user-signature-deposit-psbt-submit-confirmation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/confirm_deposit`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/postBrc20SwapConfirmDeposit)  

#### Description
This interface allows the user to sign the deposit PSBT and submit the confirmation in the BRC20 Swap service. It requires the PSBT and inscription ID to complete the operation.

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):


---

### Gets the current system state.
<a id="gets-the-current-system-state"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/system_status`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapSystemStatus)  

#### Description
This interface retrieves the current system state of the BRC20 Swap service, including whether rollup inscription committing is enabled.

#### Response (200)
- `code` (number): 
- `msg` (string): 
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
- `address` (query) **(required)**: 
- `start` (query) **(required)**: 
- `limit` (query) **(required)**: 
- `tick` (query) : 

#### Response (200)
- `code` (number): 
- `msg` (string): 
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
- `id` (query) **(required)**: 
- `pubkey` (query) **(required)**: 
- `address` (query) **(required)**: 

#### Response (200)
- `code` (number): 
- `msg` (string): 
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

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):


---

### Create a withdraw psbt to be signed by the user.
<a id="create-a-withdraw-psbt-to-be-signed-by-the-user"></a>

**Method**: `GET`  
**Path**: `/v1/brc20-swap/create_withdraw`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/getBrc20SwapCreateWithdraw)  

#### Description
This interface creates a withdrawal PSBT to be signed by the user in the BRC20 Swap service. It requires the public key, address, tick, amount, timestamp, and fee tick parameters to generate the PSBT.

#### Parameters
- `pubkey` (query) **(required)**: 
- `address` (query) **(required)**: 
- `tick` (query) **(required)**: 
- `amount` (query) **(required)**: 
- `ts` (query) **(required)**: 
- `feeTick` (query) **(required)**: 

#### Response (200)
- `code` (number): 
- `msg` (string): 
- `data` (object):


---

### User signature withdraw psbt, submit confirmation.
<a id="user-signature-withdraw-psbt-submit-confirmation"></a>

**Method**: `POST`  
**Path**: `/v1/brc20-swap/confirm_withdraw`  
**Swagger Link**: [View in Swagger UI](https://open-api.unisat.io/#/brc20-swap/postBrc20SwapConfirmWithdraw)  

#### Description
This interface allows the user to sign the withdrawal PSBT and submit the confirmation in the BRC20 Swap service. It requires the withdrawal order ID, payment PSBT, approve PSBT, fee tick, and optional fee amount to complete the operation.

#### Response (200)
- `code` (number): 
- `msg` (string): 
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
- `id` (query) **(required)**: 

#### Response (200)
- `code` (number): 
- `msg` (string): 
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

