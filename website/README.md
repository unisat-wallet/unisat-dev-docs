# UniSat API Documentation Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator. It hosts the complete API documentation for UniSat services.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static content hosting service.

## Updating Documentation

To update the documentation with the latest content from the source directories:

```bash
./update-docs.sh
```

To run the complete build process (generate docs from source, copy to website, and build the site):

```bash
./build-website.sh
```

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Structure

- `docs/` - Contains all documentation files organized by category
  - `open-api/` - Open API documentation (guides and auto-generated API docs)
  - `wallet-api/` - Wallet API documentation
- `src/` - Custom React components and pages
- `static/` - Static assets like images
- `blog/` - Blog posts (if needed)
- `docusaurus.config.ts` - Main configuration file
- `sidebars.ts` - Navigation sidebar configuration
