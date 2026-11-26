const fs = require("node:fs");
const path = require("node:path");
const { getMediaExamples } = require("./openapi-examples");
const { parameterRows, schemaRows } = require("./openapi-fields");
const { endpointSidebarLabel } = require("./endpoint-labels");
const { writeEndpointRedirects } = require("./openapi-doc-redirects");
const { loadOpenApiSpecs, resolveOpenApiReference } = require("./openapi-spec");

const swaggerBaseUrl = "https://open-api.unisat.io/#/";
const errorDocumentation =
  "For failed requests, see [Open API Errors](/docs/developer-support/api-key-errors).";

function documentedResponses(operation, bundle) {
  return Object.entries(operation.responses || {})
    .map(([status, response]) => [status, resolveOpenApiReference(response, bundle)])
    .filter(([, response]) => response["x-doc-shared-error"] !== true);
}

function escapeMdxText(route) {
  if (!route) return route;
  return route.replace(/{([^}]+)}/g, "($1)");
}

function escapeMdx(value) {
  return String(value).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatSchemaType(schema, bundle) {
  const resolved = resolveOpenApiReference(schema, bundle) || {};
  if (resolved.type === "array") {
    return "array";
  }
  if (resolved.type) {
    return resolved.format ? `${escapeMdx(resolved.type)} (${escapeMdx(resolved.format)})` : escapeMdx(resolved.type);
  }
  if (resolved.properties || resolved.allOf || resolved.oneOf || resolved.anyOf) {
    return "object";
  }
  return "any";
}

function formatSchemaMeta(schema, bundle) {
  const resolved = resolveOpenApiReference(schema, bundle) || {};
  const meta = [];
  if (resolved.description) meta.push(escapeMdx(resolved.description));
  if (resolved.enum) meta.push(`enum: ${resolved.enum.map((v) => `\`${escapeMdx(v)}\``).join(", ")}`);
  if (resolved.default !== undefined) meta.push(`default: \`${escapeMdx(resolved.default)}\``);
  if (resolved.example !== undefined) meta.push(`example: \`${escapeMdx(JSON.stringify(resolved.example))}\``);
  for (const constraint of ["minimum", "maximum", "minLength", "maxLength", "minItems", "maxItems"]) {
    if (resolved[constraint] !== undefined) meta.push(`${constraint}: \`${resolved[constraint]}\``);
  }
  if (resolved.nullable) meta.push("nullable");
  return meta.join("; ");
}

function getParameters(params, bundle) {
  if (!params.length) return "";
  return params
    .map((p) => {
      const required = p.required ? " **(required)**" : "";
      const schema = resolveOpenApiReference(p.schema, bundle) || {};
      const type = formatSchemaType(schema, bundle);
      const meta = [p.description ? escapeMdx(p.description) : "", formatSchemaMeta(schema, bundle)].filter(Boolean).join("; ");
      return `- \`${p.name}\` (${p.in}, ${type})${required}: ${meta}`;
    })
    .join("\n");
}

function renderSchema(schema, bundle, indent = 0, name = "", required = false, ancestors = new Set()) {
  const resolved = resolveOpenApiReference(schema, bundle);
  if (!resolved) return "";

  const lines = [];
  const prefix = "  ".repeat(indent);
  const label = name ? `\`${name}\` ` : "";
  const type = formatSchemaType(resolved, bundle);
  const meta = [required ? "**required**" : "", formatSchemaMeta(resolved, bundle)].filter(Boolean).join("; ");
  if (ancestors.has(resolved)) return `${prefix}- ${label}(${type}): recursive schema`;
  ancestors = new Set([...ancestors, resolved]);
  const requiredFields = new Set(Array.isArray(resolved.required) ? resolved.required : []);

  if (resolved.allOf || resolved.oneOf || resolved.anyOf) {
    const variants = resolved.allOf || resolved.oneOf || resolved.anyOf;
    if (name) lines.push(`${prefix}- ${label}(${type}): ${meta}`.trimEnd());
    variants.forEach((item) => {
      const rendered = renderSchema(item, bundle, indent + (name ? 1 : 0), "", false, ancestors);
      if (rendered) lines.push(rendered);
    });
    return lines.join("\n");
  }

  if (resolved.type === "array" && resolved.items) {
    lines.push(`${prefix}- ${label}(array): ${meta}`.trimEnd());
    const rendered = renderSchema(resolved.items, bundle, indent + 1, "items", false, ancestors);
    if (rendered) lines.push(rendered);
    return lines.join("\n");
  }

  if (resolved.properties) {
    if (name) lines.push(`${prefix}- ${label}(${type}): ${meta}`.trimEnd());
    for (const [key, val] of Object.entries(resolved.properties)) {
      const child = resolveOpenApiReference(val, bundle) || val;
      const childMeta = [requiredFields.has(key) ? "required" : "", formatSchemaMeta(child, bundle)]
        .filter(Boolean)
        .join("; ");
      const childType = formatSchemaType(child, bundle);

      if (child.properties || child.items || child.allOf || child.oneOf || child.anyOf || child.$ref) {
        const rendered = renderSchema(child, bundle, indent + (name ? 1 : 0), key, requiredFields.has(key), ancestors);
        if (rendered) lines.push(rendered);
      } else {
        lines.push(`${prefix}${name ? "  " : ""}- \`${key}\` (${childType}): ${childMeta}`.trimEnd());
      }
    }
    return lines.join("\n");
  }

  if (resolved.additionalProperties) {
    lines.push(`${prefix}- ${label}(object): ${meta}`.trimEnd());
    const rendered = renderSchema(resolved.additionalProperties, bundle, indent + 1, "additional properties", false, ancestors);
    if (rendered) lines.push(rendered);
    return lines.join("\n");
  }

  if (name || resolved.type) {
    lines.push(`${prefix}- ${label}(${type})${meta ? `: ${meta}` : ""}`);
  }

  return lines.join("\n");
}

function getRequestBody(operation, bundle) {
  const requestBody = resolveOpenApiReference(operation.requestBody, bundle);
  if (!requestBody) return "";
  const content = requestBody.content || {};
  const json = content["application/json"] || content["multipart/form-data"] || content["application/x-www-form-urlencoded"];
  if (!json?.schema) return "";
  const required = requestBody.required ? " **(required)**" : "";
  const rendered = renderSchema(json.schema, bundle);
  return `Content-Type: \`${Object.keys(content)[0]}\`${required}\n\n${rendered}`;
}

function normalizeAnchor(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

function groupEndpointsByTag(endpoints) {
  const groups = {};
  endpoints.forEach((ep) => {
    const tags =
      ep.operation.tags && ep.operation.tags.length
        ? ep.operation.tags
        : ["_untagged"];
    tags.forEach((tag) => {
      if (!groups[tag]) groups[tag] = [];
      groups[tag].push(ep);
    });
  });
  return groups;
}

function collectEndpoints(swagger, bundle) {
  const endpoints = [];
  for (const [route, pathItem] of Object.entries(swagger.paths || {})) {
    const methods = resolveOpenApiReference(pathItem, bundle);
    for (const [method, operation] of Object.entries(methods)) {
      if (!["get", "put", "post", "delete", "options", "head", "patch", "trace"].includes(method)) continue;
      if (operation.deprecated === true) continue;
      const opId = operation.operationId || normalizeAnchor(`${method}-${route}`);
      const summary = operation.summary || opId;
      const description = operation.description || "";
      endpoints.push({
        opId,
        summary,
        description,
        method,
        route,
        operation,
        pathItem: methods,
      });
    }
  }
  return endpoints;
}

function generateMarkdown(swagger, endpoints, bundle) {
  // 2. Group endpoints by tags
  const groupedEndpoints = groupEndpointsByTag(endpoints);

  // 3. Generate Table of Contents
  let output = `# ${swagger.info.title}

${swagger.info.description}

👉 [View Swagger UI](${swaggerBaseUrl})

---
`;

  output += `## 📑 Table of Contents\n\n`;
  output += `| Route | Summary |\n`;
  output += `| ----- | ------- |\n`;

  endpoints.forEach(({ summary, method, route }) => {
    const anchor = summary
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
    output += `| [${method.toUpperCase()} \`${escapeMdxText(
      route
    )}\`](#${anchor}) | ${summary} |\n`;
  });

  output += `\n---\n\n`;

  // 4. Generate detailed API docs by tag group
  for (const [tag, eps] of Object.entries(groupedEndpoints)) {
    const tagDisplay = tag === "_untagged" ? "Other APIs" : tag;
    output += `## ${tagDisplay}\n\n`;

    for (const endpoint of eps) {
      const { opId, summary, description, method, route, operation } = endpoint;
      const anchor = normalizeAnchor(summary);

      output += `### ${summary}\n`;
      output += `<a id="${anchor}"></a>\n\n`;
      output += `**Method**: \`${method.toUpperCase()}\`  \n`;
      output += `**Path**: \`${route}\`  \n`;
      output += `**Swagger Link**: [View in Swagger UI](${swaggerLink(operation, opId)})  \n\n`;

      if (description) {
        output += `#### Description\n${description}\n\n`;
      }

      const parameters = endpointParameters(endpoint, bundle);
      if (parameters.length) {
        output += `#### Parameters\n${getParameters(parameters, bundle)}\n\n`;
      }

      const requestBody = getRequestBody(operation, bundle);
      if (requestBody) {
        output += `#### Request Body\n${requestBody}\n\n`;
      }

      for (const [statusCode, response] of documentedResponses(operation, bundle)) {
        output += `#### Response (${statusCode})\n`;
        if (response.description) {
          output += `${escapeMdx(response.description)}\n\n`;
        }
        const content = response.content?.["application/json"];
        const rendered = renderSchema(content?.schema, bundle);
        if (rendered) {
          output += `${rendered}\n\n`;
        }
      }
      output += `${errorDocumentation}\n\n`;

      const notes = operation["x-doc-notes"];
      if (notes) {
        output += `${notes.trim()}\n\n`;
      }

      output += `\n---\n\n`;

    }
  }

  return output;
}

function swaggerLink(operation, opId) {
  const tag = operation.tags?.[0] || "default";
  return `${swaggerBaseUrl}${encodeURIComponent(tag)}/${encodeURIComponent(opId)}`;
}

function endpointParameters({ pathItem, operation }, bundle) {
  const entries = new Map();
  for (const definition of [...(pathItem.parameters || []), ...(operation.parameters || [])]) {
    const parameter = resolveOpenApiReference(definition, bundle);
    entries.set(`${parameter.in}:${parameter.name}`, parameter);
  }
  return [...entries.values()];
}

function fieldTable(rows, caption, options) {
  if (!rows.length) return "";
  return `<ApiFieldTable {...${JSON.stringify({ rows, caption, ...options })}} />`;
}

function renderRequestBody(requestBody, bundle) {
  const required = requestBody.required === true;
  const content = Object.entries(requestBody.content || {}).flatMap(([type, media]) => [
    fieldTable([{ field: "Content-Type", type, required }], `Request body content type ${type}`, { variant: "headers" }),
    fieldTable(schemaRows(media.schema, bundle, "request"), `Request body fields for ${type}`, { variant: "schema" }),
  ]);
  return ["## Request Body", requestBody.description, ...content].filter(Boolean).join("\n\n");
}

function renderAuthorization(security, bundle) {
  const anonymous = security.some((option) => !Object.keys(option).length);
  const rows = security.flatMap((requirement, index) =>
    Object.entries(requirement).map(([name, scopes]) => {
      const scheme = resolveOpenApiReference(bundle.components?.securitySchemes?.[name], bundle);
      const details = [];
      if (security.length > 1) details.push({ label: "Option", value: String(index + 1) });
      if (scopes.length) details.push({ label: "Scopes", value: scopes.join(", ") });
      const row = { field: name, type: scheme?.type || "Authentication", required: security.length === 1 ? true : undefined, details };
      if (scheme?.type === "http" && scheme.scheme === "bearer") {
        details.push({ label: "Example", value: "Bearer YOUR_API_KEY" });
        return { ...row, field: "Authorization", type: "Bearer token", description: "Send your API key in the Authorization header." };
      }
      if (scheme?.type === "apiKey") {
        return { ...row, field: scheme.name, type: "API key", description: `Send your API key in the ${scheme.in}.` };
      }
      return row;
    }),
  );
  if (!rows.length) return "No authorization required.";
  const note = anonymous
    ? "Authorization is optional."
    : security.length > 1 ? "Use one of the authorization options below." : "";
  return [note, fieldTable(rows, "Authorization", { fieldLabel: "Credential" })].filter(Boolean).join("\n\n");
}

function generateEndpointPage(endpoint, swagger, root, bundle) {
  const { operation, opId, summary, method, route, pathItem } = endpoint;
  const title = endpointSidebarLabel(endpoint);
  const security = operation.security ?? swagger.security ?? root.security ?? [];
  const server = (operation.servers || pathItem.servers || swagger.servers || root.servers)?.[0]?.url;
  const parameters = endpointParameters(endpoint, bundle);
  const intro = endpoint.description || (summary !== title ? `<p>{${JSON.stringify(summary)}}</p>` : "");
  const sections = [`<h1>{${JSON.stringify(title)}}</h1>`];
  if (intro) sections.push(`<div className="api-endpoint-intro">\n\n${intro}\n\n</div>`);
  sections.push(
    "<ApiEndpointPath {...endpoint} />",
    `## Authorization\n\n${renderAuthorization(security, bundle)}`,
  );

  for (const [location, heading] of [["path", "Path Parameters"], ["query", "Query Parameters"], ["header", "Headers"], ["cookie", "Cookies"]]) {
    const fields = parameters.filter((parameter) => parameter.in === location);
    if (fields.length) sections.push(`## ${heading}\n\n${fieldTable(parameterRows(fields, bundle), heading, { fieldLabel: "Parameter" })}`);
  }

  const requestBody = resolveOpenApiReference(operation.requestBody, bundle);
  if (requestBody) sections.push(renderRequestBody(requestBody, bundle));

  const responseSections = ["## Responses"];
  for (const [status, response] of documentedResponses(operation, bundle)) {
    const description = response.description || "";
    const content = Object.entries(response.content || {});
    const mediaLabel = content.length === 1 ? `\`${content[0][0]}\`` : "";
    const heading = ['<div className="api-response-heading">', `### ${status}`, mediaLabel, "</div>"];
    const fields = [heading.filter(Boolean).join("\n\n")];
    if (description.trim() !== "Successful operation") fields.push(escapeMdx(description));
    for (const [mediaType, media] of content) {
      if (!mediaLabel) fields.push(`\`${mediaType}\``);
      const body = {
        status,
        mediaType,
        rows: schemaRows(media.schema, bundle, "response"),
        examples: getMediaExamples(media, bundle, mediaType),
      };
      fields.push(`<ApiResponseBody {...${JSON.stringify(body)}} />`);
    }
    responseSections.push(fields.filter(Boolean).join("\n\n"));
  }
  responseSections.push(errorDocumentation);
  sections.push(responseSections.join("\n\n"));
  if (operation["x-doc-notes"]) sections.push(operation["x-doc-notes"].trim());

  const props = {
    method,
    path: route,
    testUrl: swaggerLink(operation, opId),
    server,
  };
  return [
    "---",
    `title: ${JSON.stringify(summary)}`,
    "hide_title: true",
    "hide_table_of_contents: true",
    "---",
    'import ApiEndpointReference, { ApiEndpointPath, ApiResponseBody } from "@site/src/components/ApiEndpointReference";',
    'import ApiFieldTable from "@site/src/components/ApiEndpointReference/ApiFieldTable";',
    "",
    `export const endpoint = ${JSON.stringify(props)};`,
    "",
    "<ApiEndpointReference>",
    "",
    sections.join("\n\n"),
    "",
    "</ApiEndpointReference>",
    "",
  ].join("\n");
}

function generateGroupOverview(swagger, module, endpoints) {
  const lines = [
    `# ${swagger.info.title}`,
    swagger.info.description,
    `[View in Swagger UI](${swaggerBaseUrl})`,
  ];
  const seenAnchors = new Set();
  for (const [tag, group] of Object.entries(groupEndpointsByTag(endpoints))) {
    lines.push(`## ${tag === "_untagged" ? "Other APIs" : tag}`);
    lines.push([
      "| Method | Path | Endpoint |",
      "| --- | --- | --- |",
      ...group.map(({ method, route, summary, opId }) => {
        const anchor = normalizeAnchor(summary);
        const legacyAnchor = seenAnchors.has(anchor) ? "" : `<a id="${anchor}"></a>`;
        seenAnchors.add(anchor);
        return `| \`${method.toUpperCase()}\` | \`${route}\` | ${legacyAnchor}[${summary.replaceAll("|", "\\|")}](./${module}/${opId}.mdx) |`;
      }),
    ].join("\n"));
  }
  return lines.filter(Boolean).join("\n\n") + "\n";
}

try {
  const { root, modules, bundle } = loadOpenApiSpecs();
  const docDir = ".generated/docs/open-api";
  const legacyDir = path.join(docDir, "auto-generated/docs");
  const groups = modules.map(({ name: module, spec: swagger }) => ({
    module,
    swagger,
    endpoints: collectEndpoints(swagger, bundle),
  }));
  writeEndpointRedirects(docDir, groups);

  fs.mkdirSync(legacyDir, { recursive: true });
  const sidebar = groups.map(({ module, swagger, endpoints }) => {
    const endpointDir = path.join(docDir, module);
    fs.mkdirSync(endpointDir, { recursive: true });
    const ids = new Set();
    for (const endpoint of endpoints) {
      if (!/^[a-zA-Z0-9_-]+$/.test(endpoint.opId)) throw new Error(`Invalid operationId: ${endpoint.opId}`);
      const id = endpoint.opId.toLowerCase();
      if (ids.has(id)) throw new Error(`Duplicate operationId in ${module}: ${endpoint.opId}`);
      ids.add(id);
      fs.writeFileSync(path.join(endpointDir, `${endpoint.opId}.mdx`), generateEndpointPage(endpoint, swagger, root, bundle));
    }

    fs.writeFileSync(path.join(docDir, `${module}.md`), generateGroupOverview(swagger, module, endpoints));
    fs.writeFileSync(path.join(legacyDir, `${module}.md`), generateMarkdown(swagger, endpoints, bundle));
    console.log(`Generated ${endpoints.length} endpoint pages for ${module}`);
    return {
      type: "category",
      label: swagger.info.title,
      link: { type: "doc", id: `open-api/${module}` },
      items: endpoints.map((endpoint) => ({
        type: "doc",
        id: `open-api/${module}/${endpoint.opId}`,
        label: endpointSidebarLabel(endpoint),
      })),
    };
  });
  fs.writeFileSync(".generated/endpoint-sidebar.json", JSON.stringify(sidebar));
} catch (error) {
  console.error("Failed to generate API documentation:", error);
  process.exitCode = 1;
}
