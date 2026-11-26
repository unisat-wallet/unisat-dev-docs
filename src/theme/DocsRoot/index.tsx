import React from "react";
import renderRoutes from "@docusaurus/renderRoutes";
import { matchPath, useLocation } from "@docusaurus/router";
import { HtmlClassNameProvider, ThemeClassNames } from "@docusaurus/theme-common";
import type { Props } from "@theme/DocsRoot";
import Layout from "@theme/Layout";

export default function DocsRoot({ route }: Props) {
  const { pathname } = useLocation();
  const hasDocMain = route.routes?.some((versionRoute) =>
    versionRoute.routes?.some((groupRoute) =>
      groupRoute.routes?.some((docRoute) => matchPath(pathname, docRoute)),
    ),
  ) ?? false;

  return (
    <HtmlClassNameProvider className={ThemeClassNames.wrapper.docsPages}>
      <Layout noFooter={hasDocMain}>{renderRoutes(route.routes)}</Layout>
    </HtmlClassNameProvider>
  );
}
