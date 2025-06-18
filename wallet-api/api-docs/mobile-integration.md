# UniSat Mobile Wallet Integration

If you want to authorize login through our wallet application, you need to use deeplink for interaction. Here are the description of the deeplink’s format and parameters respectively:

## Request Methods

### Connect wallet:

App developers can use the following URL format to request connection authorization from the wallet:

```
unisat://request?method=connect&from=yourAppName&nonce=xxxxx
```

In this case, yourAppScheme needs to be replaced with your deeplink scheme, yourAppName replaced with your application name, and xxxxx replaced with your nonce.

### Switch Chain:

App developers can use the following URL format to request a network switch from the wallet:

```
unisat://request?method=switchChain&data=[chain]&from=yourAppName&nonce=xxxxx
```

**Parameter Description**

Chain: `BITCOIN_MAINNET`, `BITCOIN_TESTNET`, `BITCOIN_TESTNET4`, `BITCOIN_SIGNET`, `FRACTAL_BITCOIN_MAINNET`, `FRACTAL_BITCOIN_TESTNET`

And the chain is a based64 emcpded JSON array. For example, data=toBase64(JSON.stringify([FRACTAL_BITCOIN_MAINNET]))

### Signing Message:

When requesting the wallet to sign a message, use the following URL format:

```
unisat://request?method=signMessage&data=[text,type]from=yourAppName&nonce=xxxxx
```

Here, data is a based64 emcpded JSON array. For example, data=toBase64(JSON.stringify([text,type]))

### Signing PSBT:

To request the wallet to sign a PSBT, use the following URL format:

```
unisat://request?method=signPsbt&data=[psbtHex,options]&from=yourAppName&nonce=xxxxx
```

Here, data is a based64 emcpded JSON array. For example, data=toBase64(JSON.stringify([psbtHex, options]))

## Return datas

After interacting in the wallet application, if the user confirms the relevant operations, a deeplink will be returned in the following format:

```
unisat://response?data=xxxxx&nonce=xxxxx
```

Here, xxxxx is the base64 encoded data.

If the user declines the related operations, a deeplink is returned in the following format:

```
unisat://response?error=xxxxx&nonce=xxxxx
```

Here, xxxxx is the base64 encoded error information.

> Note: the nonce parameter is provided by the application side, facilitating the application in matching each request with its corresponding response result. nonce will be returned in result responses.
