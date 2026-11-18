# What Can It Do

From answering on-chain questions to building an address explorer, UniSat AI Kit helps turn API data into useful results and applications. Here are two examples using the CLI through an AI agent.

The following examples use an agent with terminal access to `unisat-openapi-cli`. They do not require MCP configuration or an Agent Skill. To run them, install the CLI and configure an API key in the agent’s environment.

## Example 1: Largest ORDI Holder and 30-Day Balance Changes

Ask an agent to identify the largest ORDI holder on Bitcoin and visualize how that address’s balance changed over time.

```text
Use unisat-openapi-cli to find the address holding the most ORDI on Bitcoin and plot its balance changes over the last 30 days as a line chart.
```

[![ChatGPT desktop conversation and chart preview, accelerated playback — click to view at full resolution](/examples/openapi-cli/agent-ordi.gif)](/examples/openapi-cli/agent-ordi.gif)

## Example 2: Build a Bitcoin Address Explorer

Go beyond individual queries and ask an agent to create a read-only Bitcoin address explorer with multiple asset categories and transaction history.

```text
Use unisat-openapi-cli to build a Bitcoin address explorer with BTC, BRC-20, Runes, inscriptions, asset search, and paginated transaction history with details. Include loading and error states, keep API keys server-side, and use read-only queries. Run it, test with a real address, and open it for preview.
```

[![ChatGPT desktop conversation and website demo, accelerated playback — click to view at full resolution](/examples/openapi-cli/agent-explorer.gif)](/examples/openapi-cli/agent-explorer.gif)

## Get Started

Ready to try it? Continue to [Two Ways to Use It](./how-to-use-unisat-cli-mcp.md) for setup instructions, API key configuration, and your first request. Choose the CLI for terminal access or MCP for a compatible AI client.
