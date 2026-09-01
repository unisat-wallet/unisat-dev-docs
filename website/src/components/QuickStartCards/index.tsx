import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";

import styles from "./styles.module.css";

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

export default function QuickStartCards() {
  return (
    <div className={styles.cards}>
      {quickStartItems.map(({ title, description, to, href, cta }) => (
        <article className={styles.card} key={title}>
          <Heading as="h2" className={styles.title}>
            {title}
          </Heading>
          <p>{description}</p>
          {href ? (
            <Link className={styles.link} href={href}>
              {cta}
            </Link>
          ) : (
            <Link className={styles.link} to={to!}>
              {cta}
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}
