# Access a user's accounts

Once the dApp successfully connects to the wallet, you can use the following method to obtain the wallet's address and public key.

## Method

### getAccounts

```
unisat.getAccounts()
```

Get address of current account

**Parameters**

none

**Returns**

- `Promise` - `string`: address of current account

**Example**

```javascript
try {
    let res = await window.unisat.getAccounts();
    console.log(res)
} catch (e) {
    console.log(e);
}

> ["tb1qrn7tvhdf6wnh790384ahj56u0xaa0kqgautnnz"]
```

**Additional Note**

- Although this API returns an array, it currently returns at most one record, which represents the wallet's currently active address.

- When the wallet is not connected, it returns an empty array.

---

### getPublicKey

```
 unisat.getPublicKey()
```

Get publicKey of current account.

**Parameters**

none

**Returns**

- `Promise` - `string`: publicKey

**Example**

```javascript
try {
    let res = await window.unisat.getPublicKey();
    console.log(res)
} catch (e) {
    console.log(e);
}

> 03cbaedc26f03fd3ba02fc936f338e980c9e2172c5e23128877ed46827e935296f

```

**Additional Note**

- For P2TR addresses, the returned value will be the original public key, not the tweaked one

---

### accountsChanged

```javascript
unisat.on('accountsChanged', handler: (accounts: Array<string>) => void);
unisat.removeListener('accountsChanged', handler: (accounts: Array<string>) => void);
```

The `accountsChanged` will be emitted whenever the user's exposed account address changes.
