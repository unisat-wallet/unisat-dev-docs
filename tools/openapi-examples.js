const { resolveOpenApiReference } = require("./openapi-spec");

const has = (object, key) => Object.hasOwn(object, key);
const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

function sampleString(schema) {
  const formats = {
    date: "2025-01-01",
    "date-time": "2025-01-01T00:00:00Z",
    email: "user@example.com",
    uri: "https://example.com",
    uuid: "00000000-0000-4000-8000-000000000000",
    byte: "dGV4dA==",
    ipv4: "192.0.2.1",
    ipv6: "2001:db8::1",
  };
  // A common transaction ID pattern in the UniSat specs.
  if (schema.pattern === "^[0-9a-fA-F]{64}$") return "0".repeat(64);

  const sample = has(formats, schema.format) ? formats[schema.format] : "string";
  const min = Math.min(schema.minLength ?? 0, 256);
  const max = schema.maxLength ?? Infinity;
  return sample.padEnd(min, "x").slice(0, max);
}

function sampleNumber(schema, integer) {
  let lower = schema.minimum ?? -Infinity;
  let upper = schema.maximum ?? Infinity;
  const exclusiveLower = typeof schema.exclusiveMinimum === "number"
    ? schema.exclusiveMinimum
    : schema.exclusiveMinimum === true ? lower : undefined;
  const exclusiveUpper = typeof schema.exclusiveMaximum === "number"
    ? schema.exclusiveMaximum
    : schema.exclusiveMaximum === true ? upper : undefined;

  if (integer) {
    if (exclusiveLower !== undefined) lower = Math.max(lower, Math.floor(exclusiveLower) + 1);
    if (exclusiveUpper !== undefined) upper = Math.min(upper, Math.ceil(exclusiveUpper) - 1);
    return Math.min(Math.floor(upper), Math.max(0, Math.ceil(lower)));
  }

  if (exclusiveLower !== undefined) lower = Math.max(lower, exclusiveLower);
  if (exclusiveUpper !== undefined) upper = Math.min(upper, exclusiveUpper);
  const sample = Math.min(upper, Math.max(0, lower));
  if (sample !== exclusiveLower && sample !== exclusiveUpper) return sample;
  if (Number.isFinite(lower) && Number.isFinite(upper)) return lower / 2 + upper / 2;
  return sample === exclusiveLower ? sample + 1 : sample - 1;
}

function sampleSchema(input, bundle, direction, ancestors = []) {
  const schema = resolveOpenApiReference(input, bundle);
  if (!isObject(schema) || ancestors.includes(schema) || ancestors.length >= 24) return undefined;
  const next = [...ancestors, schema];
  const read = (value) => sampleSchema(value, bundle, direction, next);

  if (has(schema, "example")) return schema.example;
  if (Array.isArray(schema.examples) && schema.examples.length) return schema.examples[0];
  if (has(schema, "const")) return schema.const;
  if (has(schema, "default")) return schema.default;
  if (schema.enum?.length) return schema.enum[0];

  if (schema.allOf?.length) {
    const { allOf, ...base } = schema;
    const baseHasShape = base.type || base.properties || base.items || base.additionalProperties;
    const parts = [...(baseHasShape ? [read(base)] : []), ...allOf.map(read)]
      .filter((sample) => sample !== undefined);
    const objects = parts.filter(isObject);
    return objects.length ? Object.assign(Object.create(null), ...objects) : parts.at(-1);
  }

  const choices = schema.oneOf || schema.anyOf;
  if (choices?.length) {
    const { oneOf, anyOf, ...base } = schema;
    for (const choice of choices) {
      const branch = resolveOpenApiReference(choice, bundle);
      if (!isObject(branch) || next.includes(branch)) continue;
      const required = [...new Set([...(base.required || []), ...(branch.required || [])])];
      const properties = { ...base.properties, ...branch.properties };
      // Include the selected branch's required fields first. Optional fields
      // can belong to another mutually exclusive request variant.
      const selected = required.length
        ? Object.fromEntries(required.map((key) => [key, has(properties, key) ? properties[key] : {}]))
        : properties;
      const sample = read({
        ...base,
        ...branch,
        ...(Object.keys(selected).length ? { properties: selected, required } : {}),
      });
      if (sample !== undefined) return sample;
    }
    return schema.nullable ? null : undefined;
  }

  const type = Array.isArray(schema.type)
    ? schema.type.find((value) => value !== "null") ?? "null"
    : schema.type;
  if (type === "null") return null;
  if (type === "string") return sampleString(schema);
  if (type === "integer" || type === "number") return sampleNumber(schema, type === "integer");
  if (type === "boolean") return true;
  if (type === "array" || schema.items) {
    const item = read(schema.items);
    const count = Math.min(Math.max(1, schema.minItems ?? 0), schema.maxItems ?? Infinity, 3);
    return item === undefined ? [] : Array.from({ length: count }, () => item);
  }
  if (type === "object" || schema.properties || schema.additionalProperties) {
    const properties = [];
    for (const [name, definition] of Object.entries(schema.properties || {})) {
      const field = resolveOpenApiReference(definition, bundle);
      if (direction === "request" ? field?.readOnly : field?.writeOnly) continue;
      const sample = read(definition);
      if (sample !== undefined) properties.push([name, sample]);
    }
    if (properties.length || !isObject(schema.additionalProperties)) return Object.fromEntries(properties);
    const sample = read(schema.additionalProperties);
    return sample === undefined ? {} : { key: sample };
  }
  return schema.nullable ? null : {};
}

function getMediaExamples(media, bundle, mediaType, direction = "response") {
  if (!isObject(media)) return [];
  const json = /(?:\+|\/)json(?:\s*;|$)/i.test(mediaType);
  const format = (value) => typeof value === "string" && !json ? value : JSON.stringify(value, null, 2);

  if (has(media, "example")) return [{ example: format(media.example), generated: false }];

  const authored = [];
  for (const [name, definition] of Object.entries(media.examples || {})) {
    const example = resolveOpenApiReference(definition, bundle);
    if (isObject(example) && has(example, "value")) {
      authored.push({ name, example: format(example.value), generated: false });
    }
  }
  if (authored.length) return authored;

  const schema = resolveOpenApiReference(media.schema, bundle);
  if (!isObject(schema)) return [];
  if (has(schema, "example")) return [{ example: format(schema.example), generated: false }];
  if (Array.isArray(schema.examples) && schema.examples.length) {
    return schema.examples.map((value) => ({ example: format(value), generated: false }));
  }

  const sample = sampleSchema(schema, bundle, direction);
  return sample === undefined ? [] : [{ example: format(sample), generated: true }];
}

module.exports = { getMediaExamples };
