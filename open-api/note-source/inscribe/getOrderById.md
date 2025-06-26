### Notes

```typescript
enum OrderStatus {
  // when create order
  pending = "pending",

  // pay not enough, need pay more
  payment_notenough = "payment_notenough",

  // pay over, need choose continue or refund
  payment_overpay = "payment_overpay",

  // there is an inscription in payment transaction, need refund
  payment_withinscription = "payment_withinscription",

  // in some case, payment transaction need be confirmed
  payment_waitconfirmed = "payment_waitconfirmed",

  // payment success
  payment_success = "payment_success",

  // ready to inscribe
  ready = "ready",
  inscribing = "inscribing",
  minted = "minted",
  closed = "closed",
  refunded = "refunded",
  cancel = "cancel",
}

enum InscriptionStatus {
  pending = "pending",
  unconfirmed = "unconfirmed",
  confirmed = "confirmed",
}
```
