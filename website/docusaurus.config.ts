import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "UniSat API Documentation",
  tagline:
    "Explore our Open API: Runes, brc-20, BRC20-Swap, Inscribe, Marketplace, and UniSat Wallet. Seamlessly manage asset transactions in the blockchain world.",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://unisat.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "unisat-wallet", // Usually your GitHub org/user name.
  projectName: "unisat-dev-docs", // Usually your repo name.

  onBrokenLinks: "warn", // Changed from 'throw' to 'warn' to handle broken links more gracefully
  onBrokenMarkdownLinks: "warn",
  markdown: {
    format: "mdx",
    mermaid: true,
    hooks: {
      onBrokenMarkdownImages: "warn",
    },
    mdx1Compat: {
      comments: true,
      admonitions: true,
      headingIds: true,
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
    // locales: ["en", "zh-HK"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: "UniSat API Documentation",
      logo: {
        alt: "UniSat Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Docs",
        },
        {
          href: "https://github.com/unisat-wallet/unisat-dev-docs",
          label: "GitHub",
          position: "right",
        },
        // {
        //   type: "localeDropdown",
        // },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Open API",
              to: "/docs/open-api/intro",
            },
            {
              label: "UniSat Wallet Docs",
              to: "/docs/wallet-api/intro",
            },
            {
              label: "FAQ",
              to: "/docs/developer-support/faq",
            },
            {
              label: "Get a UniSat API Key",
              to: "/docs/developer-support/how-to-acquire-a-unisat-api-key",
            },
            {
              label: "Plans",
              to: "/docs/developer-support/plans",
            },
            {
              label: "Enable Two-Factor Authentication",
              to: "/docs/developer-support/enable-two-factor-authentication",
            },
          ],
        },
        // {
        //   title: "Community",
        //   items: [
        //     {
        //       label: "GitHub",
        //       href: "https://github.com/unisat-wallet/unisat-dev-docs",
        //     },
        //   ],
        // },
        {
          title: "More",
          items: [
            // {
            //   label: "Blog",
            //   to: "/blog",
            // },
            {
              label: "GitHub",
              href: "https://github.com/unisat-wallet/unisat-dev-docs",
            },
          ],
        },
        {
          title: "Legal",
          items: [
            {
              label: "API Terms of Use",
              to: "/docs/developer-support/api-terms-of-use",
            },
            {
              label: "Developer Service Legal Disclaimer",
              to: "/docs/developer-support/developer-service-legal-disclaimer",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} UniSat. `,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
