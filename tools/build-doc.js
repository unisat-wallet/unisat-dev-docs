const fs = require("node:fs");
const path = require("node:path");
const yaml = require("js-yaml");
const { getMediaExamples } = require("./openapi-examples");
const { resolveSchema, parameterRows, schemaRows } = require("./openapi-fields");
const { endpointSidebarLabel } = require("./endpoint-labels");

const swaggerBaseUrl = "https://open-api.unisat.io/#/";
const errorDocumentation =
  "For failed requests, see [Open API Errors](/docs/developer-support/api-key-errors).";

function successfulResponses(operation) {
  return Object.entries(operation.responses || {}).filter(([status]) =>
    /^2(?:\d{2}|XX)$/i.test(status),
  );
}

function escapeMdxText(route) {
  if (!route) return route;
  return route.replace(/{([^}]+)}/g, "($1)");
}

function escapeMdx(value) {
  return String(value).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatSchemaType(schema, schemas) {
  const resolved = resolveSchema(schema, schemas) || {};
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

function formatSchemaMeta(schema, schemas) {
  const resolved = resolveSchema(schema, schemas) || {};
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

function getParameters(params = [], schemas = {}) {
  if (!params.length) return "";
  return params
    .map((p) => {
      const required = p.required ? " **(required)**" : "";
      const schema = resolveSchema(p.schema, schemas) || {};
      const type = formatSchemaType(schema, schemas);
      const meta = [p.description ? escapeMdx(p.description) : "", formatSchemaMeta(schema, schemas)].filter(Boolean).join("; ");
      return `- \`${p.name}\` (${p.in}, ${type})${required}: ${meta}`;
    })
    .join("\n");
}

function renderSchema(schema, schemas, indent = 0, name = "", required = false, ancestors = new Set()) {
  const resolved = resolveSchema(schema, schemas);
  if (!resolved) return "";

  const lines = [];
  const prefix = "  ".repeat(indent);
  const label = name ? `\`${name}\` ` : "";
  const type = formatSchemaType(resolved, schemas);
  const meta = [required ? "**required**" : "", formatSchemaMeta(resolved, schemas)].filter(Boolean).join("; ");
  if (ancestors.has(resolved)) return `${prefix}- ${label}(${type}): recursive schema`;
  ancestors = new Set([...ancestors, resolved]);
  const requiredFields = new Set(Array.isArray(resolved.required) ? resolved.required : []);

  if (resolved.allOf || resolved.oneOf || resolved.anyOf) {
    const variants = resolved.allOf || resolved.oneOf || resolved.anyOf;
    if (name) lines.push(`${prefix}- ${label}(${type}): ${meta}`.trimEnd());
    variants.forEach((item) => {
      const rendered = renderSchema(item, schemas, indent + (name ? 1 : 0), "", false, ancestors);
      if (rendered) lines.push(rendered);
    });
    return lines.join("\n");
  }

  if (resolved.type === "array" && resolved.items) {
    lines.push(`${prefix}- ${label}(array): ${meta}`.trimEnd());
    const rendered = renderSchema(resolved.items, schemas, indent + 1, "items", false, ancestors);
    if (rendered) lines.push(rendered);
    return lines.join("\n");
  }

  if (resolved.properties) {
    if (name) lines.push(`${prefix}- ${label}(${type}): ${meta}`.trimEnd());
    for (const [key, val] of Object.entries(resolved.properties)) {
      const child = resolveSchema(val, schemas) || val;
      const childMeta = [requiredFields.has(key) ? "required" : "", formatSchemaMeta(child, schemas)]
        .filter(Boolean)
        .join("; ");
      const childType = formatSchemaType(child, schemas);

      if (child.properties || child.items || child.allOf || child.oneOf || child.anyOf || child.$ref) {
        const rendered = renderSchema(child, schemas, indent + (name ? 1 : 0), key, requiredFields.has(key), ancestors);
        if (rendered) lines.push(rendered);
      } else {
        lines.push(`${prefix}${name ? "  " : ""}- \`${key}\` (${childType}): ${childMeta}`.trimEnd());
      }
    }
    return lines.join("\n");
  }

  if (resolved.additionalProperties) {
    lines.push(`${prefix}- ${label}(object): ${meta}`.trimEnd());
    const rendered = renderSchema(resolved.additionalProperties, schemas, indent + 1, "additional properties", false, ancestors);
    if (rendered) lines.push(rendered);
    return lines.join("\n");
  }

  if (name || resolved.type) {
    lines.push(`${prefix}- ${label}(${type})${meta ? `: ${meta}` : ""}`);
  }

  return lines.join("\n");
}

function getRequestBody(operation, schemas) {
  const requestBody = operation.requestBody;
  if (!requestBody) return "";
  const content = requestBody.content || {};
  const json = content["application/json"] || content["multipart/form-data"] || content["application/x-www-form-urlencoded"];
  if (!json?.schema) return "";
  const required = requestBody.required ? " **(required)**" : "";
  const rendered = renderSchema(json.schema, schemas);
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

function collectEndpoints(swagger) {
  const endpoints = [];
  for (const [route, methods] of Object.entries(swagger.paths || {})) {
    for (const [method, operation] of Object.entries(methods)) {
      if (!["get", "put", "post", "delete", "options", "head", "patch", "trace"].includes(method)) continue;
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

function generateMarkdown(swagger, endpoints) {
  const schemas = swagger.components?.schemas || {};
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

    for (const {
      opId,
      summary,
      description,
      method,
      route,
      operation,
    } of eps) {
      const anchor = normalizeAnchor(summary);

      output += `### ${summary}\n`;
      output += `<a id="${anchor}"></a>\n\n`;
      output += `**Method**: \`${method.toUpperCase()}\`  \n`;
      output += `**Path**: \`${route}\`  \n`;
      output += `**Swagger Link**: [View in Swagger UI](${swaggerLink(operation, opId)})  \n\n`;

      if (description) {
        output += `#### Description\n${description}\n\n`;
      }

      if (operation.parameters?.length) {
        output += `#### Parameters\n${getParameters(operation.parameters, schemas)}\n\n`;
      }

      const requestBody = getRequestBody(operation, schemas);
      if (requestBody) {
        output += `#### Request Body\n${requestBody}\n\n`;
      }

      for (const [statusCode, response] of successfulResponses(operation)) {
        output += `#### Response (${statusCode})\n`;
        if (response.description) {
          output += `${escapeMdx(response.description)}\n\n`;
        }
        const content = response.content?.["application/json"];
        const rendered = renderSchema(content?.schema, schemas);
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

function endpointParameters({ pathItem, operation }) {
  const entries = new Map();
  for (const parameter of [...(pathItem.parameters || []), ...(operation.parameters || [])]) {
    entries.set(`${parameter.in}:${parameter.name}`, parameter);
  }
  return [...entries.values()];
}

function fieldTable(rows, caption, fieldLabel) {
  if (!rows.length) return "";
  return `<ApiFieldTable {...${JSON.stringify({ rows, caption, fieldLabel })}} />`;
}

function renderAuthorization(security, securitySchemes) {
  const anonymous = security.some((option) => !Object.keys(option).length);
  const rows = security.flatMap((requirement, index) =>
    Object.entries(requirement).map(([name, scopes]) => {
      const scheme = securitySchemes[name];
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
  return [note, fieldTable(rows, "Authorization", "Credential")].filter(Boolean).join("\n\n");
}

function requestSnippet(endpoint, parameters, security, securitySchemes, server, schemas, examples) {
  let requestPath = endpoint.route;
  const query = [];
  for (const parameter of parameters) {
    const schema = resolveSchema(parameter.schema, schemas) || {};
    const value = parameter.example ?? schema.example ?? schema.default;
    if (value === undefined || value === null || typeof value === "object") {
      if (parameter.in === "query" && parameter.required) {
        query.push(`${encodeURIComponent(parameter.name)}={${parameter.name}}`);
      }
      continue;
    }
    if (parameter.in === "path") {
      requestPath = requestPath.replaceAll(`{${parameter.name}}`, encodeURIComponent(value));
    } else if (parameter.in === "query") {
      query.push(`${encodeURIComponent(parameter.name)}=${encodeURIComponent(value)}`);
    }
  }

  const url = new URL(server);
  const basePath = url.pathname.replace(/\/$/, "");
  const target = `${basePath}${requestPath}${query.length ? `?${query.join("&")}` : ""}`;
  const lines = [`${endpoint.method.toUpperCase()} ${target} HTTP/1.1`, `Host: ${url.host}`];
  const requirement = security.find((option) => Object.keys(option).length === 0) || security[0] || {};
  for (const name of Object.keys(requirement)) {
    const scheme = securitySchemes[name];
    if (scheme?.type === "http" && scheme.scheme === "bearer") {
      lines.push("Authorization: Bearer YOUR_API_KEY");
    } else if (scheme?.type === "apiKey" && scheme.in === "header") {
      lines.push(`${scheme.name}: YOUR_API_KEY`);
    }
  }

  const [[, response] = []] = successfulResponses(endpoint.operation);
  const [accept] = Object.keys(response?.content || {});
  if (accept) lines.push(`Accept: ${accept}`);
  const [request] = Object.entries(endpoint.operation.requestBody?.content || {});
  if (request) {
    const [type, media] = request;
    lines.push(`Content-Type: ${type}`);
    const sample = getMediaExamples(media, schemas, examples, type, "request")[0];
    lines.push("", type === "application/json" && sample ? sample.example : "<request body>");
  }
  return lines.join("\n");
}

function generateEndpointPage(endpoint, swagger, root) {
  const { operation, opId, summary, method, route, pathItem } = endpoint;
  const schemas = swagger.components?.schemas || {};
  const examples = swagger.components?.examples || {};
  const security = operation.security ?? swagger.security ?? root.security ?? [];
  const securitySchemes = { ...root.components?.securitySchemes, ...swagger.components?.securitySchemes };
  const server = (operation.servers || pathItem.servers || swagger.servers || root.servers)?.[0]?.url;
  const parameters = endpointParameters(endpoint);
  const sections = [
    endpoint.description || "See the request parameters and response fields below.",
    `## Authorization\n\n${renderAuthorization(security, securitySchemes)}`,
  ];

  for (const [location, heading] of [["path", "Path Parameters"], ["query", "Query Parameters"], ["header", "Headers"], ["cookie", "Cookies"]]) {
    const fields = parameters.filter((parameter) => parameter.in === location);
    if (fields.length) sections.push(`## ${heading}\n\n${fieldTable(parameterRows(fields, schemas), heading, "Parameter")}`);
  }

  if (operation.requestBody) {
    const required = operation.requestBody.required ? " **(required)**" : "";
    const body = Object.entries(operation.requestBody.content || {}).map(([type, media]) =>
      `Content-Type: \`${type}\`${required}\n\n${fieldTable(schemaRows(media.schema, schemas, "request"), `Request body fields for ${type}`)}`.trimEnd()
    );
    sections.push(["## Request Body", operation.requestBody.description || "", ...body].filter(Boolean).join("\n\n"));
  }

  const responses = [];
  const responseSections = ["## Responses"];
  for (const [status, response] of successfulResponses(operation)) {
    const description = response.description || "";
    const fields = [`### ${status}`, escapeMdx(description)];
    const content = Object.entries(response.content || {});
    if (!content.length) responses.push({ status, description });
    for (const [mediaType, media] of content) {
      fields.push(`\`${mediaType}\``, fieldTable(schemaRows(media.schema, schemas, "response"), `${status} response fields for ${mediaType}`));
      const samples = getMediaExamples(media, schemas, examples, mediaType);
      for (const sample of samples.length ? samples : [{}]) {
        responses.push({ status, description, mediaType, ...sample });
      }
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
    requestExample: requestSnippet(endpoint, parameters, security, securitySchemes, server, schemas, examples),
    responses,
  };
  return [
    "---",
    `title: ${JSON.stringify(summary)}`,
    "hide_table_of_contents: true",
    "---",
    'import ApiEndpointReference from "@site/src/components/ApiEndpointReference";',
    'import ApiFieldTable from "@site/src/components/ApiEndpointReference/ApiFieldTable";',
    "",
    `<ApiEndpointReference {...${JSON.stringify(props)}}>`,
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
  const config = yaml.load(fs.readFileSync("tools/build-config.yaml", "utf8"));
  const readSpec = (name) => yaml.load(fs.readFileSync(`specs/openapi/${name}.yaml`, "utf8"));
  const root = readSpec("main");
  const docDir = ".generated/docs/open-api";
  const legacyDir = path.join(docDir, "auto-generated/docs");
  fs.mkdirSync(legacyDir, { recursive: true });

  const sidebar = config.doc.map((module) => {
    const swagger = readSpec(module);
    const endpoints = collectEndpoints(swagger);
    const endpointDir = path.join(docDir, module);
    fs.mkdirSync(endpointDir, { recursive: true });
    const ids = new Set();
    for (const endpoint of endpoints) {
      if (!/^[a-zA-Z0-9_-]+$/.test(endpoint.opId)) throw new Error(`Invalid operationId: ${endpoint.opId}`);
      const id = endpoint.opId.toLowerCase();
      if (ids.has(id)) throw new Error(`Duplicate operationId in ${module}: ${endpoint.opId}`);
      ids.add(id);
      fs.writeFileSync(path.join(endpointDir, `${endpoint.opId}.mdx`), generateEndpointPage(endpoint, swagger, root));
    }

    fs.writeFileSync(path.join(docDir, `${module}.md`), generateGroupOverview(swagger, module, endpoints));
    fs.writeFileSync(path.join(legacyDir, `${module}.md`), generateMarkdown(swagger, endpoints));
    console.log(`Generated ${endpoints.length} endpoint pages for ${module}`);
    return {
      type: "category",
      label: swagger.info.title,
      link: { type: "doc", id: `open-api/${module}` },
      items: endpoints.map((endpoint) => ({
        type: "doc",
        id: `open-api/${module}/${endpoint.opId}`,
        label: endpointSidebarLabel(module, endpoint),
      })),
    };
  });
  fs.writeFileSync(".generated/endpoint-sidebar.json", JSON.stringify(sidebar));
} catch (error) {
  console.error("Failed to generate API documentation:", error);
  process.exitCode = 1;
}
