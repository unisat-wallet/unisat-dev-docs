import React from "react";
import clsx from "clsx";
import { useDocsSidebar } from "@docusaurus/plugin-content-docs/client";
import { ThemeClassNames, useThemeConfig } from "@docusaurus/theme-common";
import FooterCopyright from "@theme/Footer/Copyright";
import type { Props } from "@theme/DocRoot/Layout/Main";
import styles from "./styles.module.css";

export default function DocRootLayoutMain({ hiddenSidebarContainer, children }: Props) {
  const sidebar = useDocsSidebar();
  const copyright = useThemeConfig().footer?.copyright;
  const expandedContainer = hiddenSidebarContainer && styles.expandedContainer;

  return (
    <div className={clsx(styles.column, (hiddenSidebarContainer || !sidebar) && styles.expandedColumn)}>
      <main className={styles.main}>
        <div className={clsx("container padding-top--md padding-bottom--lg", expandedContainer)}>
          {children}
        </div>
      </main>
      {copyright && (
        <footer id="site-footer" className={ThemeClassNames.layout.footer.container}>
          <div className={clsx("container", expandedContainer)}>
            <div className="row">
              <div className={clsx("col", styles.footerContent)}>
                <div className={styles.footerBar}>
                  <FooterCopyright copyright={copyright} />
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
