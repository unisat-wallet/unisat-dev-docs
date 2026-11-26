const { resolveOpenApiReference } = require("./openapi-spec");

const constraints = {
  format: "Format",
  enum: "Allowed values",
  default: "Default",
  example: "Example",
  minimum: "Minimum",
  maximum: "Maximum",
  exclusiveMinimum: "Exclusive minimum",
  exclusiveMaximum: "Exclusive maximum",
  minLength: "Min. length",
  maxLength: "Max. length",
  minItems: "Min. items",
  maxItems: "Max. items",
  multipleOf: "Multiple of",
  pattern: "Pattern",
};

function schemaType(schema, bundle) {
  if (schema.type === "array" || schema.items) {
    const item = resolveOpenApiReference(schema.items, bundle);
    const type = typeof item?.type === "string" ? item.type : item?.properties ? "object" : "any";
    return type === "array" ? "array" : `${type}[]`;
  }
  if (Array.isArray(schema.type)) return schema.type.join(" | ");
  if (schema.type) return schema.type;
  if (schema.properties || schema.additionalProperties || schema.allOf) return "object";
  return "any";
}

function valueText(value) {
  return typeof value === "string" ? value : JSON.stringify(value);
}

function schemaDetails(schema) {
  const details = [];
  for (const [key, label] of Object.entries(constraints)) {
    if (schema[key] === undefined) continue;
    const value = key === "enum" ? schema[key].map(valueText).join(", ") : valueText(schema[key]);
    details.push({ label, value });
  }
  if (schema.nullable) details.push({ label: "Nullable", value: "Yes" });
  return details;
}

function parameterRows(parameters, bundle) {
  return parameters.map((parameter) => {
    const media = Object.values(parameter.content || {})[0];
    const schema = resolveOpenApiReference(parameter.schema ?? media?.schema, bundle) || {};
    const exampleSource = media ?? parameter;
    return {
      field: parameter.name,
      type: schemaType(schema, bundle),
      required: parameter.in === "path" || Boolean(parameter.required),
      description: parameter.description || schema.description,
      details: schemaDetails({
        ...schema,
        example: Object.hasOwn(exampleSource, "example") ? exampleSource.example : schema.example,
      }),
    };
  });
}

function schemaRows(input, bundle, direction) {
  const rows = [];

  function visit(input, { field, name, parentIndex }, required, ancestors, extraDetails = []) {
    const schema = resolveOpenApiReference(input, bundle);
    if (!schema || (direction === "request" ? schema.readOnly : schema.writeOnly)) return;
    const recursive = ancestors.includes(schema);
    const choices = schema.oneOf || schema.anyOf || [];
    const properties = Object.entries(schema.properties || {});
    const parts = schema.allOf || [];
    const details = [...extraDetails, ...schemaDetails(schema)];
    if (choices.length) {
      details.push({ label: "Variants", value: schema.oneOf ? "Exactly one option" : "One or more options" });
    }
    const plainObjectItem = field.endsWith("[]") && properties.length && !recursive;
    let childParentIndex = parentIndex;
    if ((field && !plainObjectItem) || (!properties.length && !parts.length) || details.length || schema.description) {
      const row = {
        field: field || "Body",
        type: schemaType(schema, bundle),
        required,
        description: recursive ? schema.description || "Recursive reference." : schema.description,
        details,
      };
      if (direction === "response") {
        row.parentIndex = parentIndex ?? null;
        row.name = name;
      }
      childParentIndex = rows.length;
      rows.push(row);
    }
    if (recursive) return;
    const next = [...ancestors, schema];
    const child = (name) => ({
      field: field ? `${field}.${name}` : name,
      name,
      parentIndex: childParentIndex,
    });

    for (const part of parts) {
      visit(part, { field, name, parentIndex: childParentIndex }, required, next);
    }
    for (const [name, definition] of properties) {
      const options = choices.flatMap((choice, index) =>
        resolveOpenApiReference(choice, bundle)?.required?.includes(name) ? [`Option ${index + 1}`] : [],
      );
      const isRequired = schema.required?.includes(name) || false;
      visit(
        definition,
        child(name),
        options.length && !isRequired ? undefined : isRequired,
        next,
        options.length && !isRequired ? [{ label: "Required in", value: options.join(", ") }] : [],
      );
    }
    for (const [index, choice] of choices.entries()) {
      const variant = resolveOpenApiReference(choice, bundle);
      if (!variant) continue;
      const option = `Option ${index + 1}`;
      const requirements = [];
      if (variant.required?.length) requirements.push({ label: "Requires", value: variant.required.join(", ") });
      const excluded = [variant.not, ...(variant.not?.anyOf || [])].flatMap((rule) => rule?.required || []);
      if (excluded.length) requirements.push({ label: "Excludes", value: excluded.join(", ") });
      visit(variant, child(option), undefined, next, requirements);
    }
    if (schema.items) {
      visit(schema.items, { field: `${field}[]`, name: "[]", parentIndex: childParentIndex }, undefined, next);
    }
    if (typeof schema.additionalProperties === "object" && schema.additionalProperties) {
      visit(schema.additionalProperties, child("{key}"), undefined, next);
    }
  }

  visit(input, { field: "", name: "Body" }, undefined, []);
  return rows;
}

module.exports = { parameterRows, schemaRows };
