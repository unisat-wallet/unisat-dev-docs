const fs = require("fs");
const crypto = require("crypto");
const childProcess = require("child_process");
const yaml = require("js-yaml");

const projectName = "open-api";

const projectSourceDir = `./open-api`;
const projectOutputDir = `./dist/${projectName}`;

const configFile = fs.readFileSync(`./tools/build-config.yaml`, "utf8");
const config = yaml.load(configFile);

if (config.swagger === undefined) {
  console.log(`skip build swagger for ${projectName}`);
  return;
} else {
  console.log(`build swagger for ${projectName}`);
}

function loadSwaggerFile(filename) {
  const file = fs.readFileSync(
    `${projectSourceDir}/swagger-source/${filename}.yaml`,
    "utf8"
  );
  return yaml.load(file);
}

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

const mainSwagger = loadSwaggerFile("main");

const components = config.swagger.map((v) => loadSwaggerFile(v));

components.forEach((other) => {
  // check if the tag already exists, and merge them
  other.tags = other.tags || [];

  other.servers = other.servers || [];

  if (other.servers.length > 0) {
    other.tags.forEach((tag) => {
      tag.urls = other.servers.map((server) => server.url);
    });
  }

  other.tags.forEach((tag) => {
    if (mainSwagger.tags.find((t) => t.name === tag.name)) {
      throw new Error(`Tag ${tag.name} already exists`);
    }
  });
  mainSwagger.tags = [...mainSwagger.tags, ...other.tags];

  // check if the path already exists, and merge them
  other.paths = other.paths || {};
  Object.keys(other.paths).forEach((path) => {
    if (mainSwagger.paths[path]) {
      throw new Error(`Path ${path} already exists`);
    }
  });
  mainSwagger.paths = { ...mainSwagger.paths, ...other.paths };

  // check if the component already exists, and merge them
  other.components.schemas = other.components.schemas || {};
  Object.keys(other.components.schemas).forEach((schema) => {
    if (mainSwagger.components.schemas[schema]) {
      // check if the schema is the same
      if (
        JSON.stringify(mainSwagger.components.schemas[schema]) !==
        JSON.stringify(other.components.schemas[schema])
      ) {
        throw new Error(
          `Schema ${schema} already exists with a different definition`
        );
      }
    }
  });
  mainSwagger.components.schemas = {
    ...mainSwagger.components.schemas,
    ...other.components.schemas,
  };
});

const str = yaml.dump(mainSwagger);

const swaggerDir = `${projectOutputDir}/swagger`;
fs.mkdirSync(swaggerDir, { recursive: true });
fs.cpSync("./build", swaggerDir, { recursive: true });
fs.writeFileSync(`${swaggerDir}/swagger.yaml`, str);

const openApiSwaggerPath = `./open-api/auto-generated/swagger/openapi-swagger.yaml`;
const websiteSwaggerDir = `./website/static/swagger`;
const websiteSwaggerPath = `${websiteSwaggerDir}/swagger.yaml`;
const legacyWebsiteSwaggerPath = `${websiteSwaggerDir}/openapi-swagger.yaml`;
const websiteSwaggerFilesDir = `${websiteSwaggerDir}/files`;

fs.mkdirSync(`./open-api/auto-generated/swagger`, { recursive: true });
fs.mkdirSync(websiteSwaggerDir, { recursive: true });
fs.writeFileSync(openApiSwaggerPath, str);
fs.writeFileSync(websiteSwaggerPath, str);
// Keep the old public path during the migration window.
fs.writeFileSync(legacyWebsiteSwaggerPath, str);

fs.rmSync(websiteSwaggerFilesDir, { recursive: true, force: true });
fs.mkdirSync(websiteSwaggerFilesDir, { recursive: true });

const publishedSourceNames = ["main", ...config.swagger];
const publishedFiles = publishedSourceNames.map((name) => {
  const sourcePath = `${projectSourceDir}/swagger-source/${name}.yaml`;
  const content = fs.readFileSync(sourcePath);
  const relativePath = `files/${name}.yaml`;

  fs.writeFileSync(`${websiteSwaggerDir}/${relativePath}`, content);

  return {
    name,
    path: relativePath,
    sha256: sha256(content),
    size: content.length,
  };
});

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
console.log(`wrote ${openApiSwaggerPath}`);
console.log(`wrote ${websiteSwaggerPath}`);
console.log(`wrote ${websiteSwaggerDir}/manifest.json`);
