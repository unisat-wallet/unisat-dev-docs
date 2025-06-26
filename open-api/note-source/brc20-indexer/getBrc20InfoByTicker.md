### Notes

![image](./brc20_p1.avif)

Due to the inability to transmit special characters on the router, for tickers containing special characters, please use the hexadecimal encoding format.

```typescript
export function stringToHex(stringToEncode: string) {
  return Buffer.from(stringToEncode).toString("hex");
}
```

![image](./brc20_p2.avif)
