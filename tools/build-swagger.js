const fs = require("node:fs");
const path = require("node:path");
const crypto = require("crypto");
const childProcess = require("child_process");
const yaml = require("js-yaml");

const { loadOpenApiSpecs } = require("./openapi-spec");

function sha256(content) {
  return crypto.createHash("sha256").update(content).digest("hex");
}

function gitOutput(args, fallback = "unknown") {
  try {
    return childProcess.execFileSync("git", args, {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch (_error) {
    return fallback;
  }
}

console.log("build swagger for open-api");
const { rootSource, modules, bundle, dependencies } = loadOpenApiSpecs();
const str = yaml.dump(bundle);

const websiteSwaggerDir = `./.generated/static/swagger`;
const websiteSwaggerPath = `${websiteSwaggerDir}/swagger.yaml`;
const legacyWebsiteSwaggerPath = `${websiteSwaggerDir}/openapi-swagger.yaml`;
const websiteSwaggerFilesDir = `${websiteSwaggerDir}/files`;

fs.mkdirSync(websiteSwaggerDir, { recursive: true });
fs.writeFileSync(websiteSwaggerPath, str);
// Keep the old public path during the migration window.
fs.writeFileSync(legacyWebsiteSwaggerPath, str);

fs.rmSync(websiteSwaggerFilesDir, { recursive: true, force: true });
fs.mkdirSync(websiteSwaggerFilesDir, { recursive: true });

const publishedFiles = [rootSource, ...modules].map(({ name, contents }) => {
  const relativePath = `files/${name}.yaml`;
  fs.writeFileSync(path.join(websiteSwaggerDir, relativePath), contents);
  return {
    name,
    path: relativePath,
    sha256: sha256(contents),
    size: contents.length,
  };
});
for (const { relativePath, contents } of dependencies) {
  const filename = path.join(websiteSwaggerFilesDir, relativePath);
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  fs.writeFileSync(filename, contents);
}

const commit = process.env.GITHUB_SHA || gitOutput(["rev-parse", "HEAD"]);
const version =
  process.env.OPENAPI_VERSION ||
  (process.env.GITHUB_REF_TYPE === "tag" && process.env.GITHUB_REF_NAME) ||
  gitOutput(["rev-parse", "--short", "HEAD"]);
const bundleContent = Buffer.from(str, "utf8");
const manifest = {
  schemaVersion: 1,
  version,
  generatedAt: new Date().toISOString(),
  source: {
    repository: "unisat-wallet/unisat-dev-docs",
    commit,
  },
  bundle: {
    path: "swagger.yaml",
    sha256: sha256(bundleContent),
    size: bundleContent.length,
  },
  files: publishedFiles,
};

fs.writeFileSync(
  `${websiteSwaggerDir}/manifest.json`,
  `${JSON.stringify(manifest, null, 2)}\n`
);

console.log("build swagger success");
console.log(`wrote ${websiteSwaggerPath}`);
console.log(`wrote ${websiteSwaggerDir}/manifest.json`);
