import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Main sidebar for the documentation
  docsSidebar: [
    {
      type: "category",
      label: "Open API",
      items: [
        "open-api/intro",
        {
          type: "link",
          label: "Open API Swagger",
          href: "https://open-api.unisat.io/",
        },
        {
          type: "category",
          label: "All Open API Endpoints",
          items: [
            "open-api/blockchain-indexer",
            "open-api/inscription-indexer",
            "open-api/brc20-indexer",
            "open-api/runes-indexer",
            "open-api/alkanes-indexer",
            "open-api/inscribe",
            "open-api/brc20-marketplace",
            "open-api/runes-marketplace",
            "open-api/alkanes-marketplace",
            "open-api/collection-marketplace",
            "open-api/domain-marketplace",
            "open-api/brc20-swap",
            "open-api/fractal",
            "open-api/cat20-dex",
            "open-api/collection-indexer",
          ],
        },

        {
          type: "category",
          label: "BTC And Assets",
          items: [
            "open-api/btc-and-protocol-assets",
            "open-api/btc-balance-utxo",
            "open-api/brc20-balance-and-transfer",
            "open-api/runes-balance-utxo",
            "open-api/alkanes-balance-utxo",
          ],
        },
        {
          type: "category",
          label: "Inscribe API Guides",
          items: [
            "open-api/inscribe-guide",
            "open-api/inscribe-faq",
            "open-api/brc20-4byte-guide",
            "open-api/brc20-5byte-guide",
            "open-api/brc20-6byte-guide",
            "open-api/btc-inscribe-fee-rules",
            "open-api/fractal-openapi-inscribe-fee-rules",
            "open-api/fractal-openapi-inscribe-fee-rules-standard",
          ],
        },

        {
          type: "category",
          label: "Release Notes",
          items: ["open-api/release-notes/2025-11-28-btc-v29-upgrade"],
        },
      ],
    },
    {
      type: "category",
      label: "UniSat Wallet",
      items: [
        "wallet-api/intro",
        {
          type: "category",
          label: "Wallet Integration",
          items: [
            "wallet-api/connect-extension",
            "wallet-api/mobile-integration",
            "wallet-api/browser-detection",
            "wallet-api/address-types",
            "wallet-api/access-accounts",
            "wallet-api/manage-assets",
            "wallet-api/manage-networks",
            "wallet-api/sign-message",
            "wallet-api/sign-transaction",
          ],
        },
      ],
    },
  ],
};

export default sidebars;
