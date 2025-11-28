#!/bin/bash

# Build script for UniSat documentation website
# This script orchestrates the entire process of updating documentation and building the website

set -e  # Exit on any error

echo "Starting UniSat documentation website build process..."

# Step 1: Update documentation from source directories
echo "Step 1: Updating documentation from source directories..."
./update-docs.sh

# Step 2: Run the original build process to generate auto-generated docs
echo "Step 2: Running original documentation generation..."
cd ..
npm run build
cd website

# Step 3: Copy the newly generated auto-generated docs to website
echo "Step 3: Copying auto-generated documentation to website..."
mkdir -p docs/open-api/auto-generated/docs
cp ../open-api/auto-generated/docs/*.md docs/open-api/auto-generated/docs/ 2>/dev/null || true

# Step 4: Copy image assets that are referenced in the documentation
echo "Step 4: Copying image assets..."
mkdir -p static/img
# Copy note-source images that are referenced in documentation
cp -r ../open-api/note-source/* docs/open-api/ 2>/dev/null || true

# Step 5: Build the Docusaurus website
echo "Step 5: Building Docusaurus website..."
yarn build

echo "Build completed successfully!"
echo "The built website is available in the build/ directory"
echo "To serve locally, run: npx serve build"