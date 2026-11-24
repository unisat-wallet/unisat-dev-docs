// generate-errors.js
const fs = require("fs");
const yaml = require("js-yaml");

const INPUT_YAMLS = ["./specs/errors/marketplace-errors.yaml"];
const OUTPUT_JSON = "./errors/auto-generated/open-api-errors.json";

function generateErrorJSON() {
  try {
    const result = {
      metadata: {
        version: "1.0",
        last_updated: new Date().toISOString(),
      },
      errors: {},
    };

    INPUT_YAMLS.forEach((inputYaml) => {
      const yamlData = yaml.load(fs.readFileSync(inputYaml, "utf8"));
      if (!yamlData || !yamlData.errors) {
        console.warn(`No errors found in ${inputYaml}`);
        return;
      }
      yamlData.errors.forEach((error) => {
        result.errors[error.code] = {
          key: error.key,
          message: error.message,
          service: yamlData.service || "unknown",
          ...(error.has_variable && { has_variable: true }),
        };
      });
    });
    const json = JSON.stringify(result, null, 2);
    fs.mkdirSync("./.generated", { recursive: true });
    fs.writeFileSync("./.generated/open-api-errors.json", json, "utf8");
    // Preserve the repository download path.
    fs.mkdirSync("./errors/auto-generated", { recursive: true });
    fs.writeFileSync(OUTPUT_JSON, json, "utf8");

    console.log(`Successfully generated ${OUTPUT_JSON}`);
  } catch (err) {
    console.error("Error generating JSON:", err);
    process.exit(1);
  }
}

generateErrorJSON();
