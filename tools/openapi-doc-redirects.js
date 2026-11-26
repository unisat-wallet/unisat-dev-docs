const { createHash } = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const docsBase = "/docs";
const endpointBase = `${docsBase}/open-api`;
const endpointPath = /^\/docs\/open-api\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/;
const redirectFilename = /^redirect-[a-f0-9]{64}\.mdx$/;

function renderRedirect(from, to) {
  return [
    "---",
    'title: "Endpoint moved"',
    `slug: ${JSON.stringify(from.slice(docsBase.length))}`,
    "unlisted: true",
    "hide_title: true",
    "hide_table_of_contents: true",
    "---",
    'import Link from "@docusaurus/Link";',
    'import { Redirect, useLocation } from "@docusaurus/router";',
    "",
    `export const target = ${JSON.stringify(to)};`,
    "",
    "export function EndpointRedirect() {",
    "  const { search, hash } = useLocation();",
    "  return <Redirect to={{ pathname: target, search, hash }} />;",
    "}",
    "",
    "<EndpointRedirect />",
    "",
    "This endpoint has moved. <Link to={target}>Open endpoint</Link>.",
    "",
  ].join("\n");
}

function writeEndpointRedirects(docDir, groups) {
  const endpoints = groups.flatMap(({ module, endpoints }) =>
    endpoints.map(({ opId, operation }) => ({
      path: `${endpointBase}/${module}/${opId}`,
      aliases: operation["x-doc-redirect-from"],
    })),
  );
  const canonicalPaths = new Set(endpoints.map(({ path }) => path.toLowerCase()));
  const redirects = new Map();

  for (const { path: to, aliases } of endpoints) {
    if (aliases === undefined) continue;
    if (!Array.isArray(aliases)) {
      throw new Error(`x-doc-redirect-from for ${to} must be a list of old endpoint paths.`);
    }

    for (const from of aliases) {
      if (typeof from !== "string" || !endpointPath.test(from)) {
        throw new Error(`Invalid x-doc-redirect-from for ${to}: ${JSON.stringify(from)}. Expected /docs/open-api/<module>/<operationId>.`);
      }
      const key = from.toLowerCase();
      if (canonicalPaths.has(key)) {
        throw new Error(`Redirect ${from} to ${to} conflicts with a generated endpoint page.`);
      }
      if (redirects.has(key)) {
        throw new Error(`Duplicate endpoint redirect ${from}: ${redirects.get(key).to} and ${to}.`);
      }
      redirects.set(key, { from, to });
    }
  }

  const outputDir = path.join(docDir, "endpoint-redirects");
  const files = new Map();
  for (const [key, { from, to }] of redirects) {
    const hash = createHash("sha256").update(key).digest("hex");
    files.set(`redirect-${hash}.mdx`, renderRedirect(from, to));
  }
  if (files.size) fs.mkdirSync(outputDir, { recursive: true });
  if (!fs.existsSync(outputDir)) return;

  for (const filename of fs.readdirSync(outputDir)) {
    if (redirectFilename.test(filename) && !files.has(filename)) {
      fs.unlinkSync(path.join(outputDir, filename));
    }
  }
  for (const [filename, content] of files) {
    fs.writeFileSync(path.join(outputDir, filename), content);
  }
}

module.exports = { writeEndpointRedirects };
