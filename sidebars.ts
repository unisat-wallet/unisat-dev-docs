import { readFileSync } from "node:fs";
import { join } from "node:path";
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
const endpointGroups = JSON.parse(
  readFileSync(join(__dirname, ".generated/endpoint-sidebar.json"), "utf8"),
);

const sidebars: SidebarsConfig = {
  // Main sidebar for the documentation
  docsSidebar: [
    {
      type: "doc",
      id: "home",
      label: "Home",
      className: "sidebar-icon sidebar-icon-home",
    },
    {
      type: "category",
      label: "Open API",
      className: "sidebar-icon sidebar-icon-reference",
      items: [
        {
          type: "doc",
          id: "open-api/intro",
          className: "open-api-sidebar-link",
        },
        {
          type: "link",
          label: "Open API Swagger",
          href: "https://open-api.unisat.io/",
          className: "open-api-sidebar-link",
        },
        {
          type: "category",
          label: "All Open API Endpoints",
          items: endpointGroups,
        },

        {
          type: "category",
          label: "BTC And Assets",
          items: [
            "open-api/btc-and-protocol-assets",
            "open-api/btc-balance-utxo",
            "open-api/utxo-lock-unlock",
            "open-api/runes-balance-utxo",
            "open-api/alkanes-balance-utxo",
          ],
        },
        {
          type: "category",
          label: "BRC-20 Guides",
          items: [
            "open-api/bitcoin-brc20-validity-rules",
            "open-api/fractal-brc20-validity-rules",
            "open-api/brc20-balance-and-transfer",
            "open-api/brc20-4byte-guide",
            "open-api/brc20-5byte-guide",
            "open-api/brc20-6byte-guide",
          ],
        },
        {
          type: "category",
          label: "Inscribe API Guides",
          items: [
            "open-api/inscribe-v5-migration",
            "open-api/inscribe-v5-fee-guide",
            "open-api/multi-protocol-mint-guide",
            "open-api/inscribe-guide",
            "open-api/inscribe-faq",
            "open-api/btc-inscribe-fee-rules",
            "open-api/fractal-openapi-inscribe-fee-rules",
            "open-api/fractal-openapi-inscribe-fee-rules-standard",
          ],
        },

        {
          type: "category",
          label: "Release Notes",
          items: [
            "open-api/release-notes/2026-01-13-brc20-phrase2-upgrade",
            "open-api/release-notes/2025-11-28-btc-v29-upgrade",
          ],
        },
      ],
    },
    {
      type: "doc",
      id: "open-api/openapi-cli",
      label: "UniSat AI Kit",
      className: "sidebar-icon sidebar-icon-ai",
    },
    {
      type: "category",
      label: "Plans and Pricing",
      className: "sidebar-icon sidebar-icon-pricing",
      items: [
        {
          type: "doc",
          id: "developer-support/plans",
          label: "Open API Base Plans",
        },
        {
          type: "doc",
          id: "open-api/openapi-cli-pricing-plans",
          label: "CLI & MCP Plans",
        },
      ],
    },
    {
      type: "category",
      label: "UniSat Wallet",
      className: "sidebar-icon sidebar-icon-wallet",
      items: [
        "wallet-api/intro",
        {
          type: "category",
          label: "dApp Integration",
          items: [
            "wallet-api/connect-extension",
            "wallet-api/mobile-integration",
            "wallet-api/browser-detection",
            "wallet-api/address-types",
            "wallet-api/access-accounts",
            "wallet-api/manage-assets",
            "wallet-api/manage-networks",
            "wallet-api/derive-context-hash",
            "wallet-api/sign-message",
            "wallet-api/sign-transaction",
          ],
        },
        {
          type: "category",
          label: "RGB (Experimental)",
          items: [
            "wallet-api/rgb",
            "wallet-api/rgb-instant-swap",
            "wallet-api/webrgb",
            "wallet-api/rgb-swap-backend",
            "wallet-api/rgb-swap-p2p",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Developer Support",
      className: "sidebar-icon sidebar-icon-support",
      items: [
        "developer-support/how-to-acquire-a-unisat-api-key",
        "developer-support/api-key-errors",
        "developer-support/enable-two-factor-authentication",
      ],
    },
    {
      type: "doc",
      id: "developer-support/faq",
      className: "sidebar-icon sidebar-icon-faq",
    },
    {
      type: "doc",
      id: "developer-support/api-terms-of-use",
      className: "sidebar-icon sidebar-icon-terms",
    },
    {
      type: "doc",
      id: "developer-support/developer-service-legal-disclaimer",
      className: "sidebar-icon sidebar-icon-legal",
    },
  ],
};

export default sidebars;
