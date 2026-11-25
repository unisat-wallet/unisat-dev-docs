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

function resolveSchema(schema, schemas, seen = new Set()) {
  if (!schema?.$ref) return schema;
  const prefix = "#/components/schemas/";
  const { $ref } = schema;
  if (!$ref.startsWith(prefix) || seen.has($ref)) return undefined;
  seen.add($ref);
  const name = $ref.slice(prefix.length).replace(/~1/g, "/").replace(/~0/g, "~");
  return Object.hasOwn(schemas, name) ? resolveSchema(schemas[name], schemas, seen) : undefined;
}

function schemaType(input, schemas) {
  const schema = resolveSchema(input, schemas) || {};
  if (schema.type === "array" || schema.items) {
    const item = resolveSchema(schema.items, schemas);
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

function parameterRows(parameters, schemas) {
  return parameters.map((parameter) => {
    const schema = resolveSchema(parameter.schema, schemas) || {};
    return {
      field: parameter.name,
      type: schemaType(schema, schemas),
      required: parameter.in === "path" || Boolean(parameter.required),
      description: parameter.description || schema.description,
      details: schemaDetails({
        ...schema,
        example: Object.hasOwn(parameter, "example") ? parameter.example : schema.example,
      }),
    };
  });
}

function schemaRows(input, schemas, direction) {
  const rows = [];

  function visit(input, field, required, ancestors, extraDetails = []) {
    const schema = resolveSchema(input, schemas);
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
    if ((field && !plainObjectItem) || (!properties.length && !parts.length) || details.length || schema.description) {
      rows.push({
        field: field || "Body",
        type: schemaType(schema, schemas),
        required,
        description: recursive ? schema.description || "Recursive reference." : schema.description,
        details,
      });
    }
    if (recursive) return;
    const next = [...ancestors, schema];
    const child = (name) => field ? `${field}.${name}` : name;

    for (const part of parts) visit(part, field, required, next);
    for (const [name, definition] of properties) {
      const options = choices.flatMap((choice, index) =>
        resolveSchema(choice, schemas)?.required?.includes(name) ? [`Option ${index + 1}`] : [],
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
      const variant = resolveSchema(choice, schemas);
      if (!variant) continue;
      const option = `Option ${index + 1}`;
      const requirements = [];
      if (variant.required?.length) requirements.push({ label: "Requires", value: variant.required.join(", ") });
      const excluded = [variant.not, ...(variant.not?.anyOf || [])].flatMap((rule) => rule?.required || []);
      if (excluded.length) requirements.push({ label: "Excludes", value: excluded.join(", ") });
      visit(variant, child(option), undefined, next, requirements);
    }
    if (schema.items) visit(schema.items, `${field}[]`, undefined, next);
    if (typeof schema.additionalProperties === "object" && schema.additionalProperties) {
      visit(schema.additionalProperties, child("{key}"), undefined, next);
    }
  }

  visit(input, "", undefined, []);
  return rows;
}

module.exports = { resolveSchema, parameterRows, schemaRows };
