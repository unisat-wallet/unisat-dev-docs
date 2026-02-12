#!/bin/bash

# UniSat Open API SDK Generator
# This script regenerates the API types and client from the OpenAPI spec

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SWAGGER_FILE="$SCRIPT_DIR/../../open-api/auto-generated/swagger/openapi-swagger.yaml"
OUTPUT_DIR="$SCRIPT_DIR/src"

echo "🔄 Generating API types from OpenAPI spec..."
echo "   Source: $SWAGGER_FILE"
echo "   Output: $OUTPUT_DIR"

# Check if swagger file exists
if [ ! -f "$SWAGGER_FILE" ]; then
  echo "❌ Error: Swagger file not found at $SWAGGER_FILE"
  echo "   Please run 'npm run build:openapi-swagger' first"
  exit 1
fi

# Generate the API file
npx swagger-typescript-api generate \
  --path "$SWAGGER_FILE" \
  --output "$OUTPUT_DIR" \
  --name "api.ts" \
  --modular \
  --singleHttpClient \
  --extractRequestParams \
  --extractRequestBody \
  --extractResponseParams \
  --extractResponseBody \
  --moduleNameFirstTag \
  --enum \
  --axios

# Rename to api.ts if it generated as Api.ts
if [ -f "$OUTPUT_DIR/Api.ts" ]; then
  mv "$OUTPUT_DIR/Api.ts" "$OUTPUT_DIR/api.ts"
fi

echo "✅ API types generated successfully!"
echo "   File: $OUTPUT_DIR/api.ts"
