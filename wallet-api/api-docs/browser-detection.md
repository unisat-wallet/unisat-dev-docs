# Browser Detection

To verify if the browser is running UniSat Wallet, copy and paste the code snippet below in the developer console of your web browser:

```javascript
if (typeof window.unisat !== "undefined") {
  console.log("UniSat Wallet is installed!");
}
```

You can review the full API for the `window.unisat` object

Additionally, since many wallets have forked UniSat's code, multiple window.unisat objects may conflict with each other. To avoid such conflicts, we have introduced a new unisat_wallet object.

```javascript
if (typeof window.unisat_wallet !== "undefined") {
  console.log("UniSat Wallet is installed!");
}
```
