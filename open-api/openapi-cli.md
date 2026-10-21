# OpenAPI CLI

Use `unisat-openapi-cli` to discover and call UniSat Open API from a terminal, a script, or an AI agent with terminal access. It supports Bitcoin and Fractal mainnet with separate API keys.

## Install

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

## Use the CLI through an agent

Install the CLI and configure your key in the environment where the agent runs. A remote or container-based agent needs its own accessible installation and configuration. These examples use the agent's terminal access and require no MCP configuration or Agent Skill.

### Example 1: Largest ORDI holder and 30-day balance changes

```text
Use unisat-openapi-cli to find the address holding the most ORDI on Bitcoin and plot its balance changes over the last 30 days as a line chart.
```

[![ChatGPT desktop conversation and chart preview, accelerated playback — click to view at full resolution](/examples/openapi-cli/agent-ordi.gif)](/examples/openapi-cli/agent-ordi.gif)

### Example 2: Compare blocks and fee rates

```text
Use unisat-openapi-cli to compare Bitcoin blocks H-1, H-2, and H-3, where H is the latest indexed height. Show transaction counts and sizes in bytes, calculate both averages, and summarize recommended fee rates in sat/vB. Keep the answer concise, flag missing or inconsistent data, and use read-only queries.
```

[![Actual Codex conversation screen recording, accelerated playback](/examples/openapi-cli/agent-blocks.gif)](/examples/openapi-cli/agent-blocks.gif)

## Troubleshooting

| Situation | Next step |
| --- | --- |
| Command not found | Check installation and PATH in the agent's terminal, or use the executable's full path. |
| Missing API key | Run `config status --env bitcoin --format json`, or select `fractal`, and configure that network's key. |
| API rejects a request | Check the business code and message, selected network, key permissions, and quota. |
| Missing or invalid parameters | Run the command with `--help`, correct the inputs, and preview with `--dry-run`. |

For operations requiring confirmation, use `--confirm` only after the user explicitly authorizes that operation. The examples above are read-only queries.

See the [CLI source and package documentation](https://github.com/unisat-wallet/unisat-ai-kit/tree/main/packages/cli) for additional usage details.
