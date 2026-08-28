import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
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
];

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
            ({ title, description, to, href, cta }) => (
              <div className="col col--4" key={title}>
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
      <main>
        <QuickStart />
      </main>
    </Layout>
  );
}
