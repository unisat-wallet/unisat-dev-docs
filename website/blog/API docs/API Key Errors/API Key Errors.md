# API Key Errors

API key authentication, permissions, and request limits can cause a request to fail. Error responses include an HTTP status and a JSON body:

```http
HTTP/1.1 429 Too Many Requests
Content-Type: application/json; charset=utf-8

{
  "code": -2005,
  "msg": "Requests per second limit exceeded. Reduce the request rate and retry.",
  "data": null
}
```

Check both the HTTP status and the numeric `code`. Use `code` for client-side handling and `msg` for the explanation; messages can vary with the authentication method or quota involved. A successful HTTP response alone does not guarantee business success.

## API keys, permissions, and quotas

| Code | HTTP status | Meaning | What to do |
| --- | --- | --- | --- |
| `-2002` | 403 | Invalid API key or malformed authorization header. | Send `Authorization: Bearer <API_KEY>`. Check that the key is valid for the selected network. |
| `-2003` | 503 | API key quota configuration is unavailable. | Retry with backoff. Contact support if it persists; changing request parameters will not resolve this error. |
| `-2004` | 403 | Request quota is exhausted. | Review your plan and available request credits. |
| `-2005` | 429 | Requests-per-second limit exceeded. | Reduce concurrency and request frequency; retry with backoff and jitter. |
| `-2006` | 429 | Daily request quota exhausted. | Wait for the daily reset at **00:00 UTC**, upgrade your plan, or add eligible request credits where supported for the selected network. |
| `-2007` | 403 | The API key does not have access to the requested resource or client feature. | Check the required permissions. For CLI/MCP access, use an eligible plan or add credits that support CLI/MCP. |
| `-2008` | 429 | Rate limit exceeded for this endpoint. | Reduce requests to the affected endpoint, even if your overall key usage is below its limit. |
| `-2009` | 429 | Monthly request quota exhausted. | Wait until **00:00 UTC on the first day of the next month**, upgrade your plan, or add eligible request credits where supported for the selected network. |
| `-2011` | 403 | Request credits are unavailable or exhausted, including credits required for CLI/MCP. | Check both your available credits and their CLI/MCP eligibility. Add suitable credits or upgrade your plan. |

See [API key setup](/docs/developer-support/how-to-acquire-a-unisat-api-key) and [Plans](/docs/developer-support/plans).

### Anonymous requests

Requests without an `Authorization` header currently use anonymous access and its limits. A malformed or invalid header returns `-2002`; it does not fall back to anonymous access.

For anonymous requests, `-2005` can indicate the anonymous or IP requests-per-second limit, and `-2006` indicates the anonymous daily quota. The message asks you to reduce the request rate or provide `Authorization: Bearer <API_KEY>` to use your account quota.

### CLI and MCP access

CLI/MCP permission and request credits are separate checks:

- `-2007`: no available access for the client. The message identifies CLI or MCP and directs you to a plan with CLI/MCP access or suitable request credits.
- `-2011`: the credit check failed. The default message is `CLI/MCP request credits are exhausted. Add credits that support CLI/MCP or upgrade your plan.`

Despite that message, `-2011` can also occur when an ordinary API request requires request credits and the total credit balance is exhausted. Check both the total balance and any required CLI/MCP credits; this code alone does not identify which balance failed.

Repeated immediate retries will not restore permissions or credits. Review the selected network, plan, and eligible credit balance before retrying. See [OpenAPI CLI & MCP](/docs/open-api/openapi-cli) for client configuration.

## Internal errors

The `-3000` series represents internal service errors. HTTP 5xx responses use the message `internal server error`. Retry safe requests with backoff and contact support if the error persists.

## Reserved codes

| Code | HTTP status mapping | Meaning | Current use |
| --- | --- | --- | --- |
| `-2000` | 403 | Missing API key. | Reserved. Missing authorization currently uses anonymous access rather than this error. |

## Handling errors in your client

1. Read the HTTP status and, when present, the JSON `code` and `msg`. Handle non-JSON errors separately.
2. For HTTP 403 errors, check the code: correct API key configuration for `-2002`, verify permissions for `-2007`, and review quota or eligible credits for `-2004` and `-2011`.
3. For `-2005` and `-2008`, reduce request frequency and retry with bounded exponential backoff and jitter. For `-2006` and `-2009`, wait for the quota reset or obtain more capacity.
4. Retry temporary HTTP 5xx failures only when the operation is safe to repeat. A timeout does not prove that a state-changing operation failed; check its status before resubmitting.
5. If the issue persists, provide support with the request time and timezone, method, endpoint, HTTP status, error code, and message. Remove API keys, authorization headers, and other sensitive data from logs you share.
