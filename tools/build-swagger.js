const fs = require("fs");
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
    `${projectSourceDir}/swagger/${filename}.yaml`,
    "utf8"
  );
  return yaml.load(file);
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

fs.writeFileSync(`./open-api/auto-generated/openapi-swagger.yaml`, str);

console.log("build swagger success");
