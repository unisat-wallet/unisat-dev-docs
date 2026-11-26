import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { ThemeClassNames, useThemeConfig } from "@docusaurus/theme-common";
import type { Props } from "@theme/Footer/Layout";
import styles from "./styles.module.css";

export default function FooterLayout({ links, copyright }: Props) {
  const { navbar } = useThemeConfig();
  const { siteConfig } = useDocusaurusContext();
  const logoSrc = useBaseUrl(navbar.logo?.src ?? "img/logo.svg");
  const buildLabel = siteConfig.customFields?.footerBuildLabel;

  return (
    <footer id="site-footer" className={`${ThemeClassNames.layout.footer.container} ${styles.footer}`}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <Link className={styles.brand} to="/docs/home">
            <img className={styles.logo} src={logoSrc} alt="" width={34} height={34} loading="lazy" />
            <span className={styles.brandText}>
              <span className={styles.brandName}>UniSat</span>
              <span className={styles.brandSubtitle}>API Documentation</span>
            </span>
          </Link>
          {links && <nav className={styles.navigation} aria-label="Footer navigation">{links}</nav>}
        </div>
        <div className={styles.bottom}>
          {copyright}
          {typeof buildLabel === "string" && buildLabel && <span className={styles.build}>{buildLabel}</span>}
        </div>
      </div>
    </footer>
  );
}
