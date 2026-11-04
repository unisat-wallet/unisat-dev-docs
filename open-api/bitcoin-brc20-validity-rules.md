# Bitcoin BRC-20 Validity and Troubleshooting Guide

This guide explains the most common reasons a BRC-20 inscription is ignored by indexers on Bitcoin, with special attention to reinscriptions caused by reusing an already-inscribed satoshi.

> **Network scope:** This page applies to Bitcoin. Fractal Bitcoin has different BRC-20 rules and should be checked against separate Fractal-specific documentation.

Creating and confirming an Ordinals inscription does not guarantee that its BRC-20 operation is valid. A transaction can confirm, and its inscription can be viewable, while the BRC-20 `deploy`, `mint`, or `transfer` operation is ignored by the BRC-20 indexer.

## Preflight Checklist

Before broadcasting a BRC-20 reveal transaction, verify all of the following:

1. The satoshi that will receive the inscription has not already been inscribed.
2. The content type, JSON encoding, field names, and field values follow BRC-20 rules.
3. The ticker and operation are valid for the current indexed BRC-20 state.
4. The amount respects the ticker's deployment rules and the sender's available balance.
5. The commit and reveal transactions do not send the BRC-20 operation to miner fees.

Passing the UTXO offset check described below only rules out one common reinscription problem. It does not guarantee that the resulting BRC-20 operation will be valid.

## Critical Check: Do Not Reuse an Inscribed First Satoshi

In a conventional commit/reveal construction, the BRC-20 inscription is placed on the first satoshi of the commit UTXO, at offset `0`.

If that satoshi already has an inscription, the new inscription is a reinscription. BRC-20 does not recognize cursed inscriptions as valid BRC-20 operations, so the reveal transaction may confirm while the `deploy`, `mint`, or `transfer` has no BRC-20 effect.

Use the following endpoint before constructing the commit transaction:

```http
GET /v1/indexer/utxo-nft-offset/{txid}/{index}
Authorization: Bearer YOUR_API_KEY
```

- `txid`: Transaction ID of the candidate UTXO.
- `index`: Output index (`vout`) of the candidate UTXO.

Example:

```bash
curl --request GET \
  --url "https://open-api.unisat.io/v1/indexer/utxo-nft-offset/0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef/0" \
  --header "Authorization: Bearer YOUR_API_KEY"
```

Example response that must be rejected for a conventional offset-`0` inscription:

```json
{
  "code": 0,
  "msg": "ok",
  "data": [0, 546]
}
```

The `0` means the first satoshi of this UTXO has already been inscribed. Do not use that first satoshi for a BRC-20 inscription. Select another UTXO or change the transaction construction and track the exact satoshi that will receive the inscription.

Example response with no recorded inscription at offset `0`:

```json
{
  "code": 0,
  "msg": "ok",
  "data": [546]
}
```

An empty `data` array also means that the indexer found no inscription offsets for the UTXO:

```json
{
  "code": 0,
  "msg": "ok",
  "data": []
}
```

### Safe Application Check

```javascript
async function assertBrc20CommitUtxoIsUsable(txid, vout, apiKey) {
  const response = await fetch(
    `https://open-api.unisat.io/v1/indexer/utxo-nft-offset/${txid}/${vout}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`UTXO offset check failed with HTTP ${response.status}`);
  }

  const result = await response.json();
  if (result.code !== 0 || !Array.isArray(result.data)) {
    throw new Error(result.msg || "UTXO offset check failed");
  }

  if (result.data.includes(0)) {
    throw new Error(
      "Do not use this UTXO: its first satoshi has already been inscribed.",
    );
  }

  return result.data;
}
```

Do not treat an API error, timeout, or unavailable indexer as a successful check. Fail closed and retry or select a different UTXO.

### Important Limitations

- The endpoint returns at most the first 10 recorded inscription offsets.
- Stripped inscription records are included because a historical inscription still matters when detecting reuse of an inscribed satoshi.
- For the conventional construction described here, check specifically for `data.includes(0)`. A non-zero offset does not by itself mean the first satoshi is unusable.
- Custom input ordering, pointers, or satoshi routing can place the new inscription somewhere other than offset `0`. In that case, track the actual destination satoshi instead of relying only on this simplified check.
- The endpoint result does not validate the BRC-20 JSON or current ticker state.

## Content and JSON Rules

The following checklist summarizes the base BRC-20 indexing rules for Bitcoin:

- Use a base MIME type of `text/plain` or `application/json`.
- The inscription body must be valid JSON. JSON5 features and trailing commas are not accepted.
- The required fields are `p`, `op`, and `tick`.
- `p` must be the string `brc-20`.
- `op` must be one of `deploy`, `mint`, or `transfer`.
- Field names and operation values must be lowercase.
- A `deploy` operation requires `max`; `lim` and `dec` are optional.
- A `mint` or `transfer` operation requires `amt`.
- Required BRC-20 field values must be JSON strings. Numeric JSON values are not accepted for `max`, `lim`, `amt`, or `dec`.
- Numeric strings must not be empty, signed, or written with leading or trailing decimal points.
- Numeric strings other than `dec` must be greater than zero.
- The number of decimal places in `max`, `lim`, or `amt` must not exceed the ticker's `dec`, even when the extra digits are zero.
- `dec` must not exceed 18.
- Numeric fields must not exceed the unsigned 64-bit maximum.
- Standard BRC-20 tickers covered by these base rules are 4 or 5 bytes wide. Measure UTF-8 bytes, not character count.

Do not apply permissive language conversions such as `parseInt` or floating-point parsing to decide whether a value is valid. Validate the original string exactly, and use integer or decimal arithmetic that does not lose precision.

## State-Dependent Rules

A syntactically correct inscription may still be ignored because validity also depends on the indexed BRC-20 state and transaction lifecycle:

- A ticker can only be deployed once, case-insensitively.
- A mint whose `amt` exceeds the deployment's per-mint limit is ignored.
- Minting stops when the ticker reaches its maximum supply.
- A transfer inscription cannot exceed the owner's available balance when it is created.
- A transfer inscription becomes used after its first valid transfer and cannot transfer the amount again.
- Sending a deploy, mint, or transfer inscription to miner fees while inscribing causes the operation to be ignored.
- BRC-20 balances follow indexed protocol state; merely receiving an inscription does not prove that a valid BRC-20 balance transfer occurred.

For balance and deposit verification, see [BRC20 Balance and Transfer](./brc20-balance-and-transfer.md).

## Troubleshooting an Invalid BRC-20 Inscription

| Symptom | What to check |
| --- | --- |
| The inscription exists, but no BRC-20 event appears | Check the commit UTXO for offset `0`, then validate MIME type and the original JSON body. |
| A deploy is ignored | Check whether the ticker was already deployed, and validate `max`, `lim`, `dec`, and ticker byte length. |
| A mint is ignored | Check the ticker's deploy state, mint limit, maximum supply, decimal precision, and whether the inscription was sent to fees. |
| A transfer inscription is invalid | Check available balance at inscription time and validate `amt` and decimal precision. |
| A transfer worked once but not again | Transfer inscriptions are single-use after their first valid transfer. |
| Local validation passes but the indexer disagrees | Compare the exact on-chain content bytes and indexed state; do not validate a normalized or parsed-and-reserialized payload. |

When reporting a problem, collect the following information:

- Network and reveal transaction ID.
- Inscription ID.
- Commit UTXO `txid` and `vout`.
- Raw response from `/v1/indexer/utxo-nft-offset/{txid}/{index}`.
- Exact inscription content type and raw body.
- Expected operation and the relevant ticker state.

## References

- [UniSat Inscription Indexer API](./auto-generated/docs/inscription-indexer.md)
- [Layer1 Foundation BRC-20 Indexing Rules](https://layer1.gitbook.io/layer1-foundation/protocols/brc-20/indexing)
- [BRC20 Balance and Transfer](./brc20-balance-and-transfer.md)

