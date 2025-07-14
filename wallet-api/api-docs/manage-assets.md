## Bitcoin Assets

The following provides several methods to list the wallet's assets and construct corresponding send transactions.

### getBalanceV2

```
unisat.getBalanceV2()
```

Get BTC balance

**Parameters**

none

**Returns**

- `Promise` - `Object`:
  - `available` - `number` : the available satoshis
  - `unavailable` - `number` : the unavailable satoshis
  - `total` - `number` : the total satoshis

**Example**

```javascript
try {
    let res = await window.unisat.getBalanceV2();
    console.log(res)
} catch (e) {
    console.log(e);
}

> {"available":10000,"unavailable":546,"total":10546}

```

### getBalance

```
unisat.getBalance()
```

Get BTC balance

**Parameters**

none

**Returns**

- `Promise` - `Object`:
  - `confirmed` - `number` : the confirmed satoshis
  - `unconfirmed` - `number` : the unconfirmed satoshis
  - `total` - `number` : the total satoshis

**Example**

```javascript
try {
    let res = await window.unisat.getBalance();
    console.log(res)
} catch (e) {
    console.log(e);
}

> {
    "confirmed":0,
    "unconfirmed":100000,
    "total":100000
}

```

### getBitcoinUtxos

```
unisat.getBitcoinUtxos(cursor,size)
```

GetBitcoinUTXOS

**Parameters**

**Returns**

- `Promise` - `object`:
  - `txid` - `string`:
  - `vout` - `integer`:

### sendBitcoin

```
unisat.sendBitcoin(toAddress, satoshis, options)
```

Send BTC

**Parameters**

- `toAddress` - `string`: the address to send
- `satoshis` - `number`: the satoshis to send
- `options` - `object`: (optional)
  - `feeRate` - `number`: the network fee rate
  - `memo` - `string`: (optional) The data content of OP_RETURN, which needs to be in UTF-8 or HEX encoded format.
  - `memos` - `string[]`: (optional) The data content of OP_RETURN, which needs to be in UTF-8 or HEX encoded format, provided in the form of an array.

**Returns**

- `Promise` - `string`: txid

**Example**

```javascript
try {
  let txid = await window.unisat.sendBitcoin(
    "tb1qrn7tvhdf6wnh790384ahj56u0xaa0kqgautnnz",
    1000
  );
  console.log(txid);
} catch (e) {
  console.log(e);
}
```

## Inscription & BRC20 Assets

### getInscriptions

```
unisat.getInscriptions(cursor,size)
```

List inscriptions of current account

**Parameters**

none

**Returns**

- `Promise` - `Object`:
  - `total` - `number` : the total count
  - `list` - `Object[]` :
  - `inscriptionId` - `string` : the id of inscription.
  - `inscriptionNumber` - `string` : the number of inscription.
  - `address` - `string` : the address of inscription.
  - `outputValue` - `string` : the output value of inscription.
  - `content` - `string` : the content url of inscription.
  - `contentLength` - `string` : the content length of inscription.
  - `contentType` - `number` : the content type of inscription.
  - `preview` - `number` : the preview link
  - `timestamp` - `number` : the blocktime of inscription.
  - `offset` - `number` : the offset of inscription.
  - `genesisTransaction` - `string` : the txid of genesis transaction
  - `location` - `string` : the txid and vout of current location

**Example**

```javascript
try {
    let res = await window.unisat.getInscriptions(0,10);
    console.log(res)
} catch (e) {
    console.log(e);
}

> {
    "total":10,
    "list":[
    {
      inscriptionId: '6037b17df2f48cf87f6b6e6ff89af416f6f21dd3d3bc9f1832fb1ff560037531i0',
      inscriptionNumber: 959941,
      address: 'bc1q8h8s4zd9y0lkrx334aqnj4ykqs220ss735a3gh',
      outputValue: 546,
      preview: 'https://ordinals.com/preview/6037b17df2f48cf87f6b6e6ff89af416f6f21dd3d3bc9f1832fb1ff560037531i0',
      content: 'https://ordinals.com/content/6037b17df2f48cf87f6b6e6ff89af416f6f21dd3d3bc9f1832fb1ff560037531i0',
      contentLength: 53,
      contentType: 'text/plain;charset=utf-8',
      timestamp: 1680865285,
      genesisTransaction: '6037b17df2f48cf87f6b6e6ff89af416f6f21dd3d3bc9f1832fb1ff560037531',
      location: '6037b17df2f48cf87f6b6e6ff89af416f6f21dd3d3bc9f1832fb1ff560037531:0:0',
      output: '6037b17df2f48cf87f6b6e6ff89af416f6f21dd3d3bc9f1832fb1ff560037531:0',
      offset: 0
    }

]
}
```

---

### sendInscription

```
unisat.sendInscription(address, inscriptionId, options)
```

Send Inscription

**Parameters**

- `address` - `string`: the receiver address.
- `inscriptionId` - `string`: the id of Inscription
- `options` - `Object`: (optional)
  - `feeRate` - `number`: the network fee rate

**Returns**

- `Promise` - `Object`:
  - `txid` - `string` : the txid

**Example**

```javascript
try {
  let txid = await window.unisat.sendInscription(
    "tb1q8h8s4zd9y0lkrx334aqnj4ykqs220ss7mjxzny",
    "e9b86a063d78cc8a1ed17d291703bcc95bcd521e087ab0c7f1621c9c607def1ai0",
    { feeRate: 15 }
  );
  console.log(
    "send Inscription 204 to tb1q8h8s4zd9y0lkrx334aqnj4ykqs220ss7mjxzny",
    txid
  );
} catch (e) {
  console.log(e);
}
```

### inscribeTransfer

```
unisat.inscribeTransfer(ticker, amount)
```

Inscribe BRC-20 TRANSFER Inscription

**Parameters**

- `ticker` - `string`: BRC-20 ticker
- `amount` - `string`: the amount to inscribe

**Returns**

- `Promise` - `void`:

**Example**

```javascript
window.unisat.inscribeTransfer("ordi", "100");
```

## Runes Assets

### sendRunes

```
unisat.sendRunes(address, runeid, amount, options)
```

Send Runes

**Parameters**

- `address` - `string`: the receiver address.
- `runeid` - `string`: the runeid
- `amount` - `string`: the amount to send
- `options` - `Object`: (optional)
  - `feeRate` - `number`: the network fee rate

**Returns**

- `Promise` - `Object`:
  - `txid` - `string` : the txid

**Example**

```javascript
try {
  let txid = await window.unisat.sendRunes(
    "tb1q8h8s4zd9y0lkrx334aqnj4ykqs220ss7mjxzny",
    "63104:1",
    10,
    { feeRate: 15 }
  );
  console.log(txid);
} catch (e) {
  console.log(e);
}
```
