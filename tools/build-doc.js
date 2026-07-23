const fs = require("fs");
const yaml = require("js-yaml");
const path = require("path");

const swaggerBaseUrl = "https://open-api.unisat.io/#/";
const swaggerSpecUrl = "swagger/openapi-swagger.yaml";

function escapeMdxText(route) {
  if (!route) return route;
  return route.replace(/{([^}]+)}/g, "($1)");
}

function escapeMdx(value) {
  return String(value).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function resolveSchema(schema, schemas) {
  if (!schema) return schema;
  if (schema.$ref) {
    const refName = schema.$ref.split("/").pop();
    return resolveSchema(schemas[refName], schemas);
  }
  return schema;
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
  return "object";
}

function formatSchemaMeta(schema, schemas) {
  const resolved = resolveSchema(schema, schemas) || {};
  const meta = [];
  if (resolved.description) meta.push(escapeMdx(resolved.description));
  if (resolved.enum) meta.push(`enum: ${resolved.enum.map((v) => `\`${escapeMdx(v)}\``).join(", ")}`);
  if (resolved.default !== undefined) meta.push(`default: \`${escapeMdx(resolved.default)}\``);
  if (resolved.example !== undefined) meta.push(`example: \`${escapeMdx(JSON.stringify(resolved.example))}\``);
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

function renderSchema(schema, schemas, indent = 0, name = "") {
  const resolved = resolveSchema(schema, schemas);
  if (!resolved) return "";

  const lines = [];
  const prefix = "  ".repeat(indent);
  const label = name ? `\`${name}\` ` : "";
  const type = formatSchemaType(resolved, schemas);
  const meta = formatSchemaMeta(resolved, schemas);
  const requiredFields = new Set(Array.isArray(resolved.required) ? resolved.required : []);

  if (resolved.allOf || resolved.oneOf || resolved.anyOf) {
    const variants = resolved.allOf || resolved.oneOf || resolved.anyOf;
    if (name) lines.push(`${prefix}- ${label}(${type}): ${meta}`.trimEnd());
    variants.forEach((item) => {
      const rendered = renderSchema(item, schemas, indent + (name ? 1 : 0));
      if (rendered) lines.push(rendered);
    });
    return lines.join("\n");
  }

  if (resolved.type === "array" && resolved.items) {
    lines.push(`${prefix}- ${label}(array): ${meta}`.trimEnd());
    const rendered = renderSchema(resolved.items, schemas, indent + 1);
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
        const rendered = renderSchema(child, schemas, indent + (name ? 1 : 0), key);
        if (rendered) lines.push(rendered);
      } else {
        lines.push(`${prefix}${name ? "  " : ""}- \`${key}\` (${childType}): ${childMeta}`.trimEnd());
      }
    }
    return lines.join("\n");
  }

  if (resolved.additionalProperties) {
    lines.push(`${prefix}- ${label}(object): ${meta}`.trimEnd());
    const rendered = renderSchema(resolved.additionalProperties, schemas, indent + 1);
    if (rendered) lines.push(rendered);
    return lines.join("\n");
  }

  if (name) {
    lines.push(`${prefix}- ${label}(${type}): ${meta}`.trimEnd());
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

function getExtraNotes(extraNotesDir, operationId) {
  const notesPath = path.join(extraNotesDir, `${operationId}.md`);
  if (fs.existsSync(notesPath)) {
    return fs.readFileSync(notesPath, "utf8");
  }
  return "";
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

function generateMarkdown(swagger, extraNotesDir) {
  const schemas = swagger.components?.schemas || {};
  const paths = swagger.paths;
  const endpoints = [];

  // 1. Gather all endpoints
  for (const [route, methods] of Object.entries(paths)) {
    for (const [method, operation] of Object.entries(methods)) {
      const opId = operation.operationId;
      const summary = operation.summary || opId;
      const description = operation.description || "";
      endpoints.push({
        opId,
        summary,
        description,
        method,
        route,
        operation,
      });
    }
  }

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
    const tagAnchor = normalizeAnchor(tagDisplay);
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
      output += `**Swagger Link**: [View in Swagger UI](${swaggerBaseUrl}${operation.tags[0]}/${opId})  \n\n`;

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

      const responses = operation.responses || {};
      for (const [statusCode, response] of Object.entries(responses)) {
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

      const notes = getExtraNotes(extraNotesDir, opId);
      if (notes) {
        output += `${notes.trim()}\n\n`;
      }

      output += `\n---\n\n`;

      //       output += `
      // #### Try it out

      // <SwaggerEndpoint
      //   specUrl="${swaggerSpecUrl}"
      //   path="${route}"
      //   method="${method.toLowerCase()}"
      // />

      // ---

      // `;
    }
  }

  return output;
}

try {
  const configFile = fs.readFileSync(`./tools/build-config.yaml`, "utf8");
  const config = yaml.load(configFile);

  config.doc.forEach((item) => {
    const doc = yaml.load(
      fs.readFileSync(`./open-api/swagger-source/${item}.yaml`, "utf8")
    );
    const extraNotesDir = path.join(`./open-api/note-source/${item}`);
    const markdown = generateMarkdown(doc, extraNotesDir);
    fs.writeFileSync(
      `./open-api/auto-generated/docs/${item}.md`,
      markdown,
      "utf8"
    );
    console.log(`✅ ${item}.md generated successfully!`);
  });
} catch (e) {
  console.error("❌ Failed to generate documentation:", e);
}
