# Sign Message

### signMessage

```
unisat.signMessage(msg[, type])
```

sign message

**Parameters**

- `msg` - `string`: a string to sign
- `type` - `string`: (Optional) "ecdsa" | "bip322-simple". default is "ecdsa"

**Returns**

- `Promise` - `string`: the signature.

**Example**

```javascript
// sign by ecdsa
try {
    let res = await window.unisat.signMessage("abcdefghijk123456789");
    console.log(res)
} catch (e) {
    console.log(e);
}

> G+LrYa7T5dUMDgQduAErw+i6ebK4GqTXYVWIDM+snYk7Yc6LdPitmaqM6j+iJOeID1CsMXOJFpVopvPiHBdulkE=

// verify by ecdsa
import { verifyMessage } from "@unisat/wallet-utils";
const pubkey = "026887958bcc4cb6f8c04ea49260f0d10e312c41baf485252953b14724db552aac";
const message = "abcdefghijk123456789";
const signature = "G+LrYa7T5dUMDgQduAErw+i6ebK4GqTXYVWIDM+snYk7Yc6LdPitmaqM6j+iJOeID1CsMXOJFpVopvPiHBdulkE=";
const result = verifyMessage(pubkey,message,signature);
console.log(result);

> true

// sign by bip322-simple
try {
    let res = await window.unisat.signMessage("abcdefghijk123456789","bip322-simple");
    console.log(res)
} catch (e) {
    console.log(e);
}

> AkcwRAIgeHUcjr0jODaR7GMM8cenWnIj0MYdGmmrpGyMoryNSkgCICzVXWrLIKKp5cFtaCTErY7FGNXTFe6kuEofl4G+Vi5wASECaIeVi8xMtvjATqSSYPDRDjEsQbr0hSUpU7FHJNtVKqw=

```
