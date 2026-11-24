const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

process.chdir(path.resolve(__dirname, ".."));

// Recreate the disposable document tree so removed pages cannot survive a build.
fs.rmSync(".generated/docs", { recursive: true, force: true });
fs.cpSync("docs", ".generated/docs", { recursive: true });
fs.cpSync("specs/wallet-api", ".generated/docs/wallet-api", { recursive: true });
fs.mkdirSync(".generated/docs/errors", { recursive: true });
fs.copyFileSync("errors/README.md", ".generated/docs/errors/README.md");

for (const script of ["build-doc.js", "build-swagger.js", "build-error.js"]) {
  execFileSync(process.execPath, [path.join(__dirname, script)], { stdio: "inherit" });
}
