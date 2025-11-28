#!/bin/bash

# Script to update website documentation from source files
# This script copies documentation from the source directories to the Docusaurus website

set -e  # Exit on any error

echo "Updating website documentation..."

# Define source and destination directories
SOURCE_OPEN_API="../open-api"
SOURCE_WALLET_API="../wallet-api"
SOURCE_ERRORS="../errors"
WEBSITE_DOCS="docs"

# Create docs directories if they don't exist
mkdir -p "$WEBSITE_DOCS/open-api"
mkdir -p "$WEBSITE_DOCS/open-api/release-notes"
mkdir -p "$WEBSITE_DOCS/open-api/auto-generated/docs"
mkdir -p "$WEBSITE_DOCS/wallet-api"
mkdir -p "$WEBSITE_DOCS/errors"

# Copy Open API documentation
echo "Copying Open API documentation..."
cp "$SOURCE_OPEN_API"/*.md "$WEBSITE_DOCS/open-api/" 2>/dev/null || true

# Copy Open API auto-generated documentation
echo "Copying auto-generated Open API documentation..."
cp "$SOURCE_OPEN_API/auto-generated/docs"/*.md "$WEBSITE_DOCS/open-api/" 2>/dev/null || true

# Copy release notes
echo "Copying release notes..."
cp "$SOURCE_OPEN_API/release-notes"/*.md "$WEBSITE_DOCS/open-api/release-notes/" 2>/dev/null || true

# Copy Wallet API documentation
echo "Copying Wallet API documentation..."
cp "$SOURCE_WALLET_API/api-docs"/*.md "$WEBSITE_DOCS/wallet-api/" 2>/dev/null || true

# Copy errors documentation
echo "Copying errors documentation..."
cp "$SOURCE_ERRORS/README.md" "$WEBSITE_DOCS/errors/" 2>/dev/null || true
cp "$SOURCE_ERRORS/open-api-errors"/*.yaml "$WEBSITE_DOCS/errors/" 2>/dev/null || true

# Create/update intro files if they don't exist
if [ ! -f "$WEBSITE_DOCS/open-api/intro.md" ]; then
    cat > "$WEBSITE_DOCS/open-api/intro.md" << 'EOF'
---
sidebar_position: 1
---

# Open API Documentation

Welcome to the UniSat Open API documentation. This section contains comprehensive guides and reference materials for using the UniSat API services.

## Available APIs

- **Blockchain Indexer**: APIs for retrieving blockchain data
- **Inscription Indexer**: APIs for working with inscriptions
- **BRC-20 APIs**: APIs for BRC-20 token operations
- **Runes APIs**: APIs for Runes protocol operations
- **Marketplace APIs**: APIs for marketplace functionality
- **Inscribe Service**: APIs for creating inscriptions
- **Fractal APIs**: APIs for fractal Bitcoin operations

## Guides

For implementation guides and tutorials, see our [API Guides](./brc20-balance-and-transfer) section.
EOF
fi

if [ ! -f "$WEBSITE_DOCS/wallet-api/intro.md" ]; then
    cat > "$WEBSITE_DOCS/wallet-api/intro.md" << 'EOF'
---
sidebar_position: 1
---

# Wallet API Documentation

Welcome to the UniSat Wallet API documentation. This section provides comprehensive guides and reference materials for integrating with the UniSat wallet.

## Wallet Integration

The UniSat wallet provides a variety of APIs for dApp integration:

- **Connection**: APIs for connecting to the wallet
- **Account Management**: APIs for accessing accounts and addresses
- **Asset Management**: APIs for managing digital assets
- **Transaction Signing**: APIs for signing transactions
- **Message Signing**: APIs for signing messages
- **Network Management**: APIs for switching between networks

## Getting Started

To integrate with the UniSat wallet, start with our [Connection Guide](./connect-extension).
EOF
fi

# Update README files
cp "$SOURCE_OPEN_API/README.md" "$WEBSITE_DOCS/open-api/" 2>/dev/null || true
cp "$SOURCE_WALLET_API/README.md" "$WEBSITE_DOCS/wallet-api/" 2>/dev/null || true

echo "Documentation update completed successfully!"

# Optionally, rebuild the site if needed
read -p "Do you want to build the website now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Building website..."
    yarn build
    echo "Website built successfully!"
fi