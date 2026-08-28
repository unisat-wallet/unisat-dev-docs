import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

const quickStartItems = [
  {
    title: "Explore the API",
    description:
      "Browse endpoints for Bitcoin, Fractal Bitcoin, BRC-20, Runes, Alkanes, inscriptions, and marketplaces.",
    to: "/docs/open-api/intro",
    cta: "Read API docs",
  },
  {
    title: "Try Swagger UI",
    description:
      "Inspect request and response schemas and test supported endpoints from the interactive API explorer.",
    href: "https://open-api.unisat.io/",
    cta: "Open Swagger UI",
  },
  {
    title: "Get an API key",
    description:
      "Create a Developer Center account, choose a plan, and manage your API key and request usage.",
    to: "/docs/developer-support/how-to-acquire-a-unisat-api-key",
    cta: "Get an API key",
  },
  {
    title: "Plans and support",
    description:
      "Compare plans, find answers to common questions, and enable two-factor authentication for your account.",
    to: "/docs/developer-support/plans",
    cta: "View plans",
    secondaryTo: "/docs/developer-support/faq",
    secondaryCta: "Read FAQ",
    additionalTo: "/docs/developer-support/enable-two-factor-authentication",
    additionalCta: "Set up 2FA",
  },
];

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/open-api/intro"
          >
            Explore API Docs
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            href="https://open-api.unisat.io/"
          >
            Open Swagger UI
          </Link>
        </div>
      </div>
    </header>
  );
}

function QuickStart(): ReactNode {
  return (
    <section className={styles.quickStart}>
      <div className="container">
        <div className={styles.quickStartIntro}>
          <Heading as="h2">Start building with UniSat API</Heading>
          <p>
            Choose a path below to explore the API, set up your account, or get
            help with your integration.
          </p>
        </div>
        <div className="row">
          {quickStartItems.map(
            ({
              title,
              description,
              to,
              href,
              cta,
              secondaryTo,
              secondaryCta,
              additionalTo,
              additionalCta,
            }) => (
              <div className="col col--3" key={title}>
                <article className={styles.quickStartCard}>
                  <Heading as="h3">{title}</Heading>
                  <p>{description}</p>
                  <div className={styles.quickStartLinks}>
                    {href ? (
                      <Link className={styles.quickStartLink} href={href}>
                        {cta}
                      </Link>
                    ) : (
                      <Link className={styles.quickStartLink} to={to!}>
                        {cta}
                      </Link>
                    )}
                    {secondaryTo && secondaryCta && (
                      <Link className={styles.secondaryLink} to={secondaryTo}>
                        {secondaryCta}
                      </Link>
                    )}
                    {additionalTo && additionalCta && (
                      <Link className={styles.secondaryLink} to={additionalTo}>
                        {additionalCta}
                      </Link>
                    )}
                  </div>
                </article>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <QuickStart />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
