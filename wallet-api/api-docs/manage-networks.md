# Manage Networks

UniSat Wallet currently supports the following network types, which can be obtained through unisat.getChain, and switched through the `unisat.switchChain` method.

| name                    | enum                    | uni  | network |
| ----------------------- | ----------------------- | ---- | ------- |
| Bitcoin Mainnet         | BITCOIN_MAINNET         | BTC  | livenet |
| Bitcoin Testnet         | BITCOIN_TESTNET         | tBTC | testnet |
| Bitcoin Testnet4        | BITCOIN_TESTNET4        | tBTC | testnet |
| Bitcoin Signet          | BITCOIN_SIGNET          | sBTC | testnet |
| Fractal Bitcoin Mainnet | FRACTAL_BITCOIN_MAINNET | FB   | livenet |
| Fractal Bitcoin Testnet | FRACTAL_BITCOIN_TESTNET | tFB  | livenet |

Please note that the term "network" refers to the Bitcoin address format. For example, in the case of Fractal Bitcoin Testnet, the returned network is livenet.

## Method

### getChain

```
unisat.getChain()
```

get chain

**Parameters**

none

**Returns**

- `Promise` - `Object`:
  - `enum` - `string` : the enum of chain
  - `name` - `string` : the name of chain
  - `network` - `string` : livenet or testnet

**Example**

```javascript
try {
  let res = await window.unisat.getChain();
  console.log(res)
} catch (e) {
  console.log(e);
}

>  {enum: 'BITCOIN_MAINNET', name: 'Bitcoin Mainnet', network: 'livenet'}
```

---

### switchChain

```
unisat.switchChain(chain)
```

switch chain

**Parameters**

- `chain` - `string`: the chain. BITCOIN_MAINNET or BITCOIN_TESTNET or FRACTAL_BITCOIN_MAINNET

**Returns**

- `Promise` - `Object`:
  - `enum` - `string` : the enum of chain
  - `name` - `string` : the name of chain
  - `network` - `string` : livenet or testnet

**Example**

```javascript
try {
    let res = await window.unisat.switchChain("BITCOIN_MAINNET");
    console.log(res)
} catch (e) {
    console.log(e);
}

> {enum: 'BITCOIN_MAINNET', name: 'Bitcoin Mainnet', network: 'livenet'}
```

---

### getNetwork (deprecated)

```
unisat.getNetwork()
```

get network

> Please note that this method only supports bitcoin mainnet and bitcoin testnet. Due to the support for more networks, please switch to the getChain method.

**Parameters**

none

**Returns**

- `Promise` - `string`: the network. livenet and testnet

**Example**

```javascript
try {
  let res = await window.unisat.getNetwork();
  console.log(res)
} catch (e) {
  console.log(e);
}


> 0
```

### chainChanged

```javascript
unisat.on('chainChanged', handler: (network: string) => void);

unisat.removeListener('chainChanged', handler: (network: string) => void);
```

The `chainChanged` will be emitted whenever the user's network changes.

### networkChanged (deprecated)

```javascript
unisat.on('networkChanged', handler: (network: string) => void);

unisat.removeListener('networkChanged', handler: (network: string) => void);
```

The `networkChanged` will be emitted whenever the user's network changes.
