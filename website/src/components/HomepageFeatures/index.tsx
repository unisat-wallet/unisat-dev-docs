import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  image: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Comprehensive & Cost-Efficient APIs",
    image: require("@site/static/img/api-scene-one.png").default,
    description: (
      <ul className={styles.featureList}>
        <li>Full coverage of Bitcoin & Fractal Bitcoin (mainnet + testnet)</li>
        <li>Native support for BRC20, Runes, Alkanes, BRC2.0</li>
        <li>Unified access to Minting, Marketplace, and Inswap</li>
        <li>
          220+ endpoints for blocks, transactions, UTXOs, and protocol assets
        </li>
      </ul>
    ),
  },
  {
    title: "Proven in Production",
    image: require("@site/static/img/api-scene-two.png").default,
    description: (
      <ul className={styles.featureList}>
        <li>Trusted by 12,000+ active API keys</li>
        <li>Used by Binance, OKX, Bybit, CoinMarketCap, CoinGecko</li>
        <li>Stable under high-frequency and complex workloads</li>
        <li>99.5% uptime SLA with synchronized indexing updates</li>
      </ul>
    ),
  },
  {
    title: "Seamless Bitcoin & Fractal Support",
    image: require("@site/static/img/api-scene-three.png").default,
    description: (
      <ul className={styles.featureList}>
        <li>Fractal Bitcoin APIs are completely free</li>
        <li>Identical data structures and interfaces to Bitcoin</li>
        <li>Develop on Fractal, migrate to mainnet effortlessly</li>
        <li>Lower costs, lower risk, faster iteration</li>
      </ul>
    ),
  },
];

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4", styles.featureCard)}>
      <div className={styles.featureHeader}>
        <img
          src={image}
          className={styles.featureImage}
          alt={title}
          loading="lazy"
        />
        <Heading as="h3" className={styles.featureTitle}>
          {title}
        </Heading>
      </div>

      <div className={styles.featureContent}>{description}</div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
