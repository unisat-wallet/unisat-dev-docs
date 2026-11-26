const fs = require("node:fs");
const path = require("node:path");
const { isDeepStrictEqual } = require("node:util");
const yaml = require("js-yaml");

const bundledReferencesKey = "x-unisat-bundled-references";
const objectMaps = new Set([
  "callbacks", "content", "dependentSchemas", "encoding", "examples", "headers", "links",
  "parameters", "pathItems", "paths", "patternProperties", "properties", "requestBodies", "responses",
  "schemas", "securitySchemes", "variables",
]);
const literalValues = new Set(["const", "default", "enum", "example"]);

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isInside(directory, filename) {
  const relative = path.relative(directory, filename);
  return relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}

function pointerPart(part) {
  return String(part).replaceAll("~", "~0").replaceAll("/", "~1");
}

function readPointer(fragment) {
  const decoded = decodeURIComponent(fragment);
  if (decoded === "") return [];
  if (!decoded.startsWith("/") || /~(?![01])/.test(decoded)) throw new Error("expected a JSON Pointer fragment");
  return decoded.slice(1).split("/").map((part) => part.replaceAll("~1", "/").replaceAll("~0", "~"));
}

function formatPointer(parts) {
  return `#${parts.map((part) => `/${encodeURIComponent(pointerPart(part))}`).join("")}`;
}

function lookupPointer(value, parts) {
  for (const part of parts) {
    if (value === null || typeof value !== "object" || !Object.hasOwn(value, part)) return undefined;
    if (Array.isArray(value) && !/^(?:0|[1-9]\d*)$/.test(part)) return undefined;
    value = value[part];
  }
  return value;
}

function followReferences(value, bundle) {
  const seen = new Set();
  while (isObject(value) && Object.hasOwn(value, "$ref")) {
    const reference = value.$ref;
    if (typeof reference !== "string" || !reference.startsWith("#")) {
      throw new Error("expected a local string reference");
    }
    if (seen.has(reference)) {
      throw new Error(`circular reference aliases: ${[...seen, reference].join(" -> ")}`);
    }
    seen.add(reference);
    value = lookupPointer(bundle, readPointer(reference.slice(1)));
    if (value === undefined) throw new Error(`target ${reference} not found in the merged OpenAPI document`);
  }
  return value;
}

function resolveOpenApiReference(value, bundle) {
  try {
    return followReferences(value, bundle);
  } catch (_error) {
    return undefined;
  }
}

function mergeComponents(components, additions) {
  const merged = { ...components };
  for (const [section, entries] of Object.entries(additions)) {
    const existing = Object.hasOwn(merged, section) ? merged[section] : undefined;
    if (section.startsWith("x-")) {
      if (existing !== undefined && !isDeepStrictEqual(existing, entries)) {
        throw new Error(`Components extension ${section} already exists with a different definition`);
      }
      merged[section] = entries;
      continue;
    }
    if (!isObject(entries)) throw new Error(`Expected a mapping for components.${section}`);
    for (const [name, definition] of Object.entries(entries)) {
      if (Object.hasOwn(existing || {}, name) && !isDeepStrictEqual(existing[name], definition)) {
        const label = section === "schemas" ? `Schema ${name}` : `Component ${section}.${name}`;
        throw new Error(`${label} already exists with a different definition`);
      }
    }
    merged[section] = { ...existing, ...entries };
  }
  return merged;
}

function mergeSpecs(root, modules) {
  const tags = [...(root.tags || [])];
  const tagNames = new Set(tags.map(({ name }) => name));
  const paths = { ...root.paths };
  let components = { ...root.components };

  for (const spec of modules) {
    const serverUrls = spec.servers?.map(({ url }) => url);
    for (const tag of spec.tags || []) {
      if (tagNames.has(tag.name)) throw new Error(`Tag ${tag.name} already exists`);
      tagNames.add(tag.name);
      tags.push(serverUrls?.length ? { ...tag, urls: serverUrls } : tag);
    }
    for (const [route, pathItem] of Object.entries(spec.paths || {})) {
      if (Object.hasOwn(paths, route)) throw new Error(`Path ${route} already exists`);
      paths[route] = pathItem;
    }
    components = mergeComponents(components, spec.components || {});
  }

  return { ...root, tags, paths, components };
}

function readModuleNames(configPath) {
  const config = yaml.load(fs.readFileSync(configPath, "utf8"));
  if (!Array.isArray(config?.modules)) throw new Error(`${configPath} must define a modules list`);
  const seen = new Set(["main"]);
  for (const name of config.modules) {
    if (typeof name !== "string" || !/^[a-zA-Z0-9_-]+$/.test(name)) {
      throw new Error(`Invalid OpenAPI module name: ${name}`);
    }
    const normalized = name.toLowerCase();
    if (seen.has(normalized)) throw new Error(`Duplicate or reserved OpenAPI module name: ${name}`);
    seen.add(normalized);
  }
  return config.modules;
}

function loadOpenApiSpecs({
  specDir = path.resolve(__dirname, "../specs/openapi"),
  configPath = path.resolve(__dirname, "build-config.yaml"),
} = {}) {
  const directory = fs.realpathSync(specDir);
  const files = new Map();
  const dependencies = new Set();
  const embeddedReferences = new Map();
  const references = [];

  function readFile(sourcePath) {
    if (files.has(sourcePath)) return files.get(sourcePath);
    if (!isInside(directory, sourcePath) || !/\.(?:ya?ml|json)$/i.test(sourcePath)) {
      throw new Error("expected a YAML or JSON file inside the OpenAPI spec directory");
    }
    if (!isInside(directory, fs.realpathSync(sourcePath))) {
      throw new Error("reference file resolves outside the OpenAPI spec directory");
    }
    const contents = fs.readFileSync(sourcePath);
    const relativePath = path.relative(directory, sourcePath).split(path.sep).join("/");
    const raw = yaml.load(contents.toString("utf8"), { filename: relativePath });
    const file = { sourcePath, relativePath, contents, raw };
    files.set(sourcePath, file);
    return file;
  }

  function readSpec(name) {
    const file = readFile(path.join(directory, `${name}.yaml`));
    const { raw } = file;
    if (!isObject(raw) || typeof raw.openapi !== "string" || !isObject(raw.info)) {
      throw new Error(`${file.relativePath} must be an OpenAPI document`);
    }
    if (Object.hasOwn(raw, bundledReferencesKey)) throw new Error(`${file.relativePath} uses reserved field ${bundledReferencesKey}`);
    return file;
  }

  const root = readSpec("main");
  const modules = readModuleNames(configPath).map(readSpec);
  const registered = new Set([root, ...modules]);
  const rawBundle = mergeSpecs(root.raw, modules.map(({ raw }) => raw));

  function canUseMergedPointer(parts) {
    return (parts[0] === "components" && parts.length >= 3) || (parts[0] === "paths" && parts.length >= 2);
  }

  function normalizeReference(reference, origin, isExample) {
    const hash = reference.indexOf("#");
    const relative = decodeURIComponent(hash < 0 ? reference : reference.slice(0, hash));
    const parts = readPointer(hash < 0 ? "" : reference.slice(hash + 1));
    let target = origin;
    if (relative) {
      if (/^[a-z][a-z\d+.-]*:|[\\?]/i.test(relative) || path.isAbsolute(relative)) {
        throw new Error("expected a relative YAML or JSON reference");
      }
      target = readFile(path.resolve(path.dirname(origin.sourcePath), relative));
      if (!registered.has(target)) dependencies.add(target);
    } else if (hash < 0) {
      throw new Error("expected a file or fragment reference");
    }

    const value = lookupPointer(target.raw, parts);
    if (value === undefined) {
      if (!relative && canUseMergedPointer(parts) && lookupPointer(rawBundle, parts) !== undefined) return formatPointer(parts);
      throw new Error(`target not found in ${target.relativePath}`);
    }
    if (target === root || (registered.has(target) && canUseMergedPointer(parts))) return formatPointer(parts);

    const key = `${target.relativePath}${formatPointer(parts)}`;
    if (!embeddedReferences.has(key)) {
      embeddedReferences.set(key, undefined);
      embeddedReferences.set(key, normalize(target, value, parts, "", isExample));
    }
    return formatPointer([bundledReferencesKey, key]);
  }

  function normalize(file, value, parts = [], dictionary = "", isExample = false, seen = new WeakMap()) {
    if (value === null || typeof value !== "object") return value;
    if (value instanceof Date || Buffer.isBuffer(value)) return value;
    if (seen.has(value)) return seen.get(value);
    if (Array.isArray(value)) {
      const result = [];
      seen.set(value, result);
      value.forEach((item, index) => result.push(normalize(file, item, [...parts, index], "", false, seen)));
      return result;
    }

    const result = {};
    seen.set(value, result);
    const entries = Object.entries(value).map(([key, child]) => {
      if (!dictionary && key === "$ref") {
        const location = `${file.relativePath}${formatPointer([...parts, key])}`;
        if (typeof child !== "string") throw new Error(`${location}: expected a string reference`);
        try {
          const normalized = normalizeReference(child, file, isExample);
          references.push({ location, original: child, normalized });
          return [key, normalized];
        } catch (error) {
          throw new Error(`${location}: ${child} (${error.message})`);
        }
      }
      if (!dictionary && (literalValues.has(key) || key.startsWith("x-") ||
        (key === "value" && isExample) || (key === "examples" && Array.isArray(child)))) {
        return [key, child];
      }
      const nextDictionary = !dictionary && objectMaps.has(key) && isObject(child) ? key : "";
      return [key, normalize(file, child, [...parts, key], nextDictionary, dictionary === "examples", seen)];
    });
    for (const [key, child] of entries) {
      Object.defineProperty(result, key, { value: child, writable: true, enumerable: true, configurable: true });
    }
    return result;
  }

  const normalizedRoot = normalize(root, root.raw);
  const normalizedModules = modules.map((file) => ({
    name: path.basename(file.relativePath, ".yaml"),
    spec: normalize(file, file.raw),
    sourcePath: file.sourcePath,
    contents: file.contents,
  }));
  const bundle = mergeSpecs(normalizedRoot, normalizedModules.map(({ spec }) => spec));
  if (embeddedReferences.size) bundle[bundledReferencesKey] = Object.fromEntries(embeddedReferences);
  // Resolve reference aliases without walking the resolved object, so recursive schema properties stay valid.
  for (const { location, original, normalized } of references) {
    try {
      followReferences({ $ref: normalized }, bundle);
    } catch (error) {
      throw new Error(`${location}: ${original} (${error.message})`);
    }
  }

  return {
    root: normalizedRoot,
    rootSource: { name: "main", sourcePath: root.sourcePath, contents: root.contents },
    modules: normalizedModules,
    bundle,
    dependencies: [...dependencies].map(({ relativePath, contents }) => ({ relativePath, contents })),
  };
}

module.exports = { loadOpenApiSpecs, resolveOpenApiReference };
