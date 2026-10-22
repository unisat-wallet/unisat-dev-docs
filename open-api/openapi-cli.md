# OpenAPI CLI & MCP

UniSat AI Kit provides two ways to discover and call UniSat Open API. Both support Bitcoin and Fractal mainnet with separate API keys.

| Interface | Use it when |
| --- | --- |
| [CLI](#install-the-cli) | Running commands in a terminal, scripts, or an AI agent with terminal access. |
| [MCP](#connect-an-agent-via-mcp) | Connecting an AI agent through a client that supports MCP servers over stdio. |

## Install the CLI

### With npm

Install [Node.js](https://nodejs.org/) 18 or later, including npm, then run:

```bash
npm install -g @unisat/openapi-cli --registry=https://registry.npmjs.org/
unisat-openapi-cli --help
```

### Without Node.js

Download the CLI archive for your operating system and CPU from [UniSat AI Kit releases](https://github.com/unisat-wallet/unisat-ai-kit/releases), then extract it. The standalone executable includes the runtime and API definitions.

| Installation | Command |
| --- | --- |
| Global npm installation, or executable on PATH | `unisat-openapi-cli --help` |
| Extracted macOS/Linux executable | `./unisat-openapi-cli --help` |
| Extracted Windows executable in PowerShell | `.\unisat-openapi-cli.exe --help` |

The examples below use `unisat-openapi-cli`. Add the executable directory to PATH, or substitute the appropriate local path. An agent must be able to run the same command in its terminal environment.

## Configure an API key

Get an API key from the [UniSat Developer Center](https://developer.unisat.io/). See [How to acquire a UniSat API key](/docs/developer-support/how-to-acquire-a-unisat-api-key) for account setup.

Replace the placeholder locally and configure the network you need:

```bash
unisat-openapi-cli config bitcoin-key --api-key YOUR_BITCOIN_API_KEY
unisat-openapi-cli config status --env bitcoin --format json
```

For Fractal, use:

```bash
unisat-openapi-cli config fractal-key --api-key YOUR_FRACTAL_API_KEY
unisat-openapi-cli config status --env fractal --format json
```

These commands save keys in your user configuration. You can also supply `UNISAT_BITCOIN_API_KEY` or `UNISAT_FRACTAL_API_KEY` through your environment. Key precedence is `--api-key`, environment variable, then user configuration. `config status` checks local configuration; it does not verify online access.

Keep keys out of prompts and source control. API keys provide API access; these examples do not require a wallet, private key, or seed phrase.

## Make your first request

Query the latest indexed Bitcoin block height:

```bash
unisat-openapi-cli getBlockchainInfo --env bitcoin --format json
```

The API response is under `response.body`; the indexed height is `response.body.data.blocks`. A successful request has exit code `0`, `response.ok: true`, and business `response.body.code: 0`. HTTP status alone is insufficient to determine success.

Use `--env fractal` with your Fractal key to query Fractal. Both environments are mainnets; Bitcoin is the default.

## Find and use commands

Discover a business category, then inspect a command's parameters:

```bash
unisat-openapi-cli commands domains
unisat-openapi-cli commands --domain blockchain
unisat-openapi-cli getBalanceByAddress --help
```

Domains such as `blockchain` are API categories. Select the network separately with `--env`. Use text output for discovery and `--format json` for scripts and agents.

Preview a request without an API key or network call:

```bash
unisat-openapi-cli getBalanceByAddress --address YOUR_ADDRESS --env bitcoin --dry-run --format json
```

Replace `YOUR_ADDRESS` with the address to inspect, then run the query:

```bash
unisat-openapi-cli getBalanceByAddress --address YOUR_ADDRESS --env bitcoin --format json
```

You can also call an exact API path:

```bash
unisat-openapi-cli api call --env bitcoin --path "/v1/indexer/address/{address}/balance" --path-param address=YOUR_ADDRESS --format json
```

Use repeated `--query-param name=value` options for query parameters. Inspect `api call --help` for request body options. A dry-run only previews the request; it does not verify API access or return live data.

## Connect an agent via MCP

MCP (Model Context Protocol) lets an agent discover API operations, inspect their parameters, and make requests through tools. The UniSat MCP server runs locally over stdio; configure it as a command in your MCP client.

### Configure the server

Install Node.js 18 or later, including npm. Add the following server configuration to your client's MCP settings, replacing the API key locally. The settings location and configuration format depend on the client.

```json
{
  "mcpServers": {
    "unisat-ai": {
      "command": "npx",
      "args": ["-y", "--registry=https://registry.npmjs.org/", "@unisat/openapi-mcp"],
      "env": {
        "UNISAT_BITCOIN_API_KEY": "YOUR_BITCOIN_API_KEY",
        "UNISAT_FRACTAL_API_KEY": "YOUR_FRACTAL_API_KEY"
      }
    }
  }
}
```

Replace the placeholders for the networks you use and remove any unused key entry. Select `fractal` when calling a tool for Fractal. Each network requires its own key. Keep keys in local client settings and out of prompts or source control.

Reconnect the server after saving the configuration. The first launch downloads the package from npm. The MCP process can also use keys saved by the CLI when both run under the same user and environment; a remote or container-based server needs its own configuration.

Alternatively, install the server globally:

```bash
npm install -g @unisat/openapi-mcp --registry=https://registry.npmjs.org/
```

Then use `"command": "unisat-openapi-mcp"` and omit `args` in the configuration above. The command must be available in the MCP client's environment.

Without Node.js, download and extract the MCP portable archive from [UniSat AI Kit releases](https://github.com/unisat-wallet/unisat-ai-kit/releases). Set `command` to the launcher's absolute path and omit `args`:

| Operating system | Example command path |
| --- | --- |
| macOS / Linux | `/absolute/path/to/unisat-openapi-mcp` |
| Windows | `C:/absolute/path/to/unisat-openapi-mcp.cmd` |

### Discover and call APIs

Once connected, the agent has four tools:

| Tool | Purpose |
| --- | --- |
| `get_status` | Check the local server, CLI capability, and API definitions. This does not verify online API access. |
| `list_operations` | Find operations by `query` or `domain`, with paginated results. |
| `get_operation` | Inspect an operation's parameters and confirmation requirements. |
| `call_api` | Call an exact API path with the selected network and request parameters. |

Try this prompt:

```text
Use UniSat MCP to get the latest indexed Bitcoin block height.
```

The agent can find the operation with `list_operations`, inspect it with `get_operation`, then invoke `call_api` with:

```json
{
  "path": "/v1/indexer/blockchain/info",
  "environment": "bitcoin"
}
```

Results include JSON text in `content` and a structured payload in `structuredContent`. The indexed height is at `structuredContent.response.body.data.blocks`. Check the tool's `isError`, `response.ok`, and business `response.body.code` before using the result. A successful API response has `response.ok: true` and business code `0`.

Use `"environment": "fractal"` for Fractal; Bitcoin is the default. A discovery `domain` is an API category, not a network selector.

## Use the CLI through an agent

Install the CLI and configure your key in the environment where the agent runs. A remote or container-based agent needs its own accessible installation and configuration. These examples use the agent's terminal access and require no MCP configuration or Agent Skill.

### Example 1: Largest ORDI holder and 30-day balance changes

```text
Use unisat-openapi-cli to find the address holding the most ORDI on Bitcoin and plot its balance changes over the last 30 days as a line chart.
```

[![ChatGPT desktop conversation and chart preview, accelerated playback — click to view at full resolution](/examples/openapi-cli/agent-ordi.gif)](/examples/openapi-cli/agent-ordi.gif)

### Example 2: Build a Bitcoin address explorer

```text
Use unisat-openapi-cli to build a Bitcoin address explorer with BTC, BRC-20, Runes, inscriptions, asset search, and paginated transaction history with details. Include loading and error states, keep API keys server-side, and use read-only queries. Run it, test with a real address, and open it for preview.
```

[![ChatGPT desktop conversation and website demo, accelerated playback — click to view at full resolution](/examples/openapi-cli/agent-explorer.gif)](/examples/openapi-cli/agent-explorer.gif)

## Troubleshooting

| Situation | Next step |
| --- | --- |
| Command not found | Check installation and PATH in the agent's terminal, or use the executable's full path. |
| MCP server does not start | Check Node.js/npm for the npx setup, or the installed command's absolute path and executable permissions. |
| MCP tools do not appear | Reconnect the server in the client, inspect its server logs, and check `get_status` once connected. |
| Missing API key | Run `config status --env bitcoin --format json`, or select `fractal`, and configure that network's key. |
| CLI works but MCP reports a missing key | Configure the key in the MCP server's environment; the client may run under a different user or environment. |
| API rejects a request | Check the business code and message, selected network, key permissions, and quota. |
| Missing or invalid parameters | Run the command with `--help`, correct the inputs, and preview with `--dry-run`. |

Non-GET MCP requests require explicit user confirmation. For operations requiring confirmation, use CLI `--confirm` or MCP `confirm: true` only after the user explicitly authorizes that operation. The examples above use read-only queries.

For authentication, CLI/MCP permissions, or request quotas, see [API Key Errors](/docs/developer-support/api-key-errors).

See the [CLI documentation](https://github.com/unisat-wallet/unisat-ai-kit/tree/main/packages/cli) and [MCP setup guide](https://github.com/unisat-wallet/unisat-ai-kit/blob/main/docs/mcp-setup.md) for additional usage details.
