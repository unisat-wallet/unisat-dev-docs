# Sign and broadcast Transaction

UniSat Wallet provides functionality for signing individual PSBTs, batch signing multiple PSBTs, and broadcasting transactions.

## Method

### signPsbt

```
unisat.signPsbt(psbtHex[, options])
```

Sign PSBT

This method will traverse all inputs that match the current address to sign.

**Parameters**

- `psbtHex` - `string`: the hex string of psbt to sign
- options
  - `autoFinalized` - `boolean`: whether finalize psbt after signing, default is true
  - `toSignInputs` - `array`:
    - `index` - `number`: which input to sign
    - `address` - `string`: (at least specify either an address or a publicKey) Which corresponding private key to use for signing
    - `publicKey` - `string`: (at least specify either an address or a publicKey) Which corresponding private key to use for signing
    - `sighashTypes` - `number[]`: (optionals) sighashTypes
    - `disableTweakSigner` - `boolean` :(optionals) Default value is false. Setting it true allows the use of the original private key when signing taproot inputs. (deprecated)
    - `useTweakedSigner` - `boolean` :(optionals) . By setting useTweakedSigner, you can forcibly decide whether or not to use tweakedSigner. It has a higher priority than disableTweakSigner.

**Returns**

`Promise` - `string`: the hex string of signed psbt

**Example**

```javascript
try {
  let res = await window.unisat.signPsbt("70736274ff01007d....", {
    autoFinalized: false,
    toSignInputs: [
      {
        index: 0,
        address: "tb1q8h8....mjxzny",
      },
      {
        index: 1,
        publicKey: "tb1q8h8....mjxzny",
        sighashTypes: [1],
      },
      {
        index: 2,
        publicKey: "02062...8779693f",
      },
    ],
  });
  console.log(res);
} catch (e) {
  console.log(e);
}

unisat.signPsbt("xxxxxxxx", {
  toSignInputs: [{ index: 0, publicKey: "xxxxxx", disableTweakSigner: true }],
  autoFinalized: false,
});
```

**Additional Note**

---

### signPsbts

```
unisat.signPsbts(psbtHexs[, options])
```

Sign Multiple PSBTs at once

This method will traverse all inputs that match the current address to sign.

**Parameters**

- `psbtHexs` - `string[]`: the hex strings of psbt to sign
- `options` - `object[]`: the options of signing psbt
  - `autoFinalized` - `boolean`: whether finalize psbt after signing, default is true
  - `toSignInputs` - `array`:
    - `index` - `number`: which input to sign
    - `address` - `string`: (at least specify either an address or a publicKey) Which corresponding private key to use for signing
    - `publicKey` - `string`: (at least specify either an address or a publicKey) Which corresponding private key to use for signing
    - `sighashTypes` - `number[]`: (optionals) sighashTypes
    - `useTweakedSigner` - `boolean` :(optionals) . By setting useTweakedSigner, you can forcibly decide whether or not to use tweakedSigner. It has a higher priority than disableTweakSigner.

**Returns**

`Promise` - `string[]`: the hex strings of signed psbt

**Example**

```javascript
try {
  let res = await window.unisat.signPsbts([
    "70736274ff01007d...",
    "70736274ff01007d...",
  ]);
  console.log(res);
} catch (e) {
  console.log(e);
}
```

**Additional Note**

- Batch signing can improve user experience, but it also introduces security risks. Therefore, we require users to review the transaction details one by one before signing.
  We do provide a convenient "Sign All" button, but it's currently only available for trusted applications. If you need this feature, please open an issue to apply for access.

### pushPsbt

```
unisat.pushPsbt(psbtHex)
```

You can use this API to broadcast a fully signed PSBT.

**Parameters**

- `psbtHex` - `string`: the hex string of psbt to push

**Returns**

- `Promise` - `string`: txid

**Example**

```javascript
try {
  let res = await window.unisat.pushPsbt("70736274ff01007d....");
  console.log(res);
} catch (e) {
  console.log(e);
}
```

### pushTx

```
unisat.pushTx(options)
```

You can use this API to broadcast a fully signed transaction. Please note that `rawtx` and `PSBT` are completely different formats.

**Parameters**

- `options` - `Object`:
  - `rawtx` - `string`: rawtx to push

**Returns**

- `Promise` - `string`: txid

**Example**

```javascript
try {
  let txid = await window.unisat.pushTx({
    rawtx: "0200000000010135bd7d...",
  });
  console.log(txid);
} catch (e) {
  console.log(e);
}
```

**Additional Note**

- You can also broadcast transactions via
  https://open-api.unisat.io/v1/indexer/local_pushtx or
  https://mempool.space/api/tx.
