---
slug: faq
---

# FAQ

## How can I begin using UniSat API?

Visit the [Developer Center](https://developer.unisat.io/account/login) to register and get a free API key. New accounts receive a monthly quota of 60,000 calls (2,000 calls per day). For higher limits for personal or commercial projects, upgrade to a paid plan. See [How to Acquire a UniSat API Key](https://docs.unisat.io/dev-center/developer-center/how-to-acquire-a-unisat-api-key) for details.

## What is the UniSat API for?

UniSat API provides indexed data for Bitcoin and Fractal Bitcoin, including blockchain information, balances, transaction histories, and UTXO data. It also supports asset protocols such as BRC-20, Runes, and Alkanes, with balance, holder, and transaction-history queries.

The API also supports inscription data and on-chain activity, allowing developers to deploy inscription minting services. UniSat products, including the inscription service, Marketplace, and InSwap, can be accessed programmatically for minting and trading assets.

## Is Fractal Bitcoin's API completely free, and what can it be used for?

Fractal Bitcoin API access is free, and its data structures and API interfaces are aligned with Bitcoin's. Developers can use Fractal for development and testing before moving to a paid Bitcoin mainnet API plan when they are ready for production use.

## Which API plan should I choose?

UniSat offers four API plans for different use cases:

- **Free:** For research, experimentation, and short-term testing.
- **Specialist:** For developers running larger scripts and blockchain startups with a growing user base; it may also suit certain Bitcoin-network arbitrage workflows.
- **Enterprise:** For wallets, exchanges, and growth-stage startups, including market makers running high-frequency strategies across Bitcoin and centralized exchanges.
- **Custom API:** For requirements that exceed the request or rate limits of standard plans. Contact the UniSat team to discuss a tailored API solution.

## What are the rate limits for UniSat API?

The Free and Specialist plans are limited to 5 requests per second. The Enterprise plan allows 10 requests per second. Custom Enterprise plans can provide higher throughput, with top-tier exchanges eligible for up to 500 requests per second. Contact the UniSat team to discuss your requirements.

## What if my API usage exceeds my current plan, and will I lose the remaining value if I upgrade?

If you exceed your plan's usage limit, you can purchase additional usage through a pay-as-you-go package or upgrade to a higher-tier plan. When you upgrade, the remaining value of your current plan is calculated to the minute and applied as credit toward the new plan.

## Is BRC2.0 API data supported?

Yes. UniSat supports BRC2.0 data, including BRC2.0-related balance queries through its existing API services.

## Can I query UTXOs at low fee rates?

Yes. The API supports UTXO queries in sub-1 sat/vB mode and returns up to 500 UTXOs per request.

## Can I use the API for commercial projects?

Yes, provided your use complies with the [API Terms of Use](/docs/developer-support/api-terms-of-use). Contact UniSat to discuss the appropriate plan, commercial requirements, and any custom limits for your project.

## What payment options are available?

You can pay via PayPal, BTC, or USDT (TRON or Ethereum). BTC payments are screened through our on-chain KYT system; high-risk funds will be returned.

## Is the API subscription auto-renewed?

After purchasing a plan, you can manually enable auto-renewal from your account page and cancel it at any time. Payments are non-refundable, and UniSat does not provide refunds for services that have already been paid for.
