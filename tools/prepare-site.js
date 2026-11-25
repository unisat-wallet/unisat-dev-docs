const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

process.chdir(path.resolve(__dirname, ".."));

const cliAssets = path.resolve("docs/open-api/assets/cli");

// Recreate the disposable document tree so removed pages cannot survive a build.
fs.rmSync(".generated/docs", { recursive: true, force: true });
fs.cpSync("docs", ".generated/docs", {
  recursive: true,
  filter: (source) => path.resolve(source) !== cliAssets,
});
fs.cpSync("specs/wallet-api", ".generated/docs/wallet-api", { recursive: true });

// Publish these assets at the URLs already used by docs and OpenAPI clients.
for (const [source, target] of [
  [cliAssets, ".generated/static/examples/openapi-cli"],
  ["specs/openapi/assets", ".generated/static/img/note-source"],
]) {
  fs.rmSync(target, { recursive: true, force: true });
  fs.cpSync(source, target, { recursive: true });
}

for (const script of ["build-doc.js", "build-swagger.js", "build-error.js"]) {
  execFileSync(process.execPath, [path.join(__dirname, script)], { stdio: "inherit" });
}
