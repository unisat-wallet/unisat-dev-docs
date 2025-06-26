const fs = require("fs");
const yaml = require("js-yaml");
const path = require("path");

const swaggerBaseUrl = "https://open-api.unisat.io/#/";

function getParameters(params = []) {
  if (!params.length) return "";
  return params
    .map((p) => {
      const required = p.required ? "**(required)**" : "";
      return `- \`${p.name}\` (${p.in}) ${required}: ${p.description || ""}`;
    })
    .join("\n");
}

function renderSchema(schema, schemas, indent = 0) {
  if (!schema) return "";
  const lines = [];
  const prefix = "  ".repeat(indent);

  if (schema.$ref) {
    const refName = schema.$ref.split("/").pop();
    return renderSchema(schemas[refName], schemas, indent);
  }

  if (schema.type === "array" && schema.items) {
    lines.push(`${prefix}- (array):`);
    lines.push(renderSchema(schema.items, schemas, indent + 1));
    return lines.join("\n");
  }

  if (schema.type === "object" && schema.properties) {
    for (const [key, val] of Object.entries(schema.properties)) {
      if (val.$ref) {
        lines.push(`${prefix}- \`${key}\` (object):`);
        lines.push(renderSchema({ $ref: val.$ref }, schemas, indent + 1));
      } else if (val.type === "array") {
        lines.push(`${prefix}- \`${key}\` (array):`);
        lines.push(renderSchema(val.items, schemas, indent + 1));
      } else if (val.type === "object" && val.properties) {
        lines.push(`${prefix}- \`${key}\` (object):`);
        lines.push(renderSchema(val, schemas, indent + 1));
      } else {
        const example =
          val.example !== undefined ? ` (example: \`${val.example}\`)` : "";
        lines.push(
          `${prefix}- \`${key}\` (${val.type || "object"}): ${
            val.description || ""
          }${example}`
        );
      }
    }
  }

  return lines.join("\n");
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
    output += `| [${method.toUpperCase()} ${route}](#${anchor}) | ${summary} |\n`;
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
        output += `#### Parameters\n${getParameters(operation.parameters)}\n\n`;
      }

      const responses = operation.responses || {};
      if (responses["200"]) {
        output += `#### Response (200)\n`;
        const content = responses["200"].content?.["application/json"];
        const ref = content?.schema?.$ref;
        const directSchema = content?.schema;

        if (ref) {
          const refName = ref.split("/").pop();
          const schema = schemas[refName];
          output += `${renderSchema(schema, schemas)}\n\n`;
        } else if (directSchema) {
          output += `${renderSchema(directSchema, schemas)}\n\n`;
        }
      }

      const notes = getExtraNotes(extraNotesDir, opId);
      if (notes) {
        output += `${notes.trim()}\n\n`;
      }

      output += `---\n\n`;
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
