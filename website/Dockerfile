# Build stage
FROM node:20-alpine AS builder

# Build argument for URL base
ARG URL_BASE=/

# Set working directory to project root
WORKDIR /app

# Copy parent package files
COPY package.json ./

# Copy website directory structure first (for better caching)
COPY website/package.json website/yarn.lock website/

# Install parent dependencies
RUN npm install

# Install website dependencies
WORKDIR /app/website
RUN yarn install --frozen-lockfile

# Copy the entire project
WORKDIR /app
COPY . ./

# Update baseUrl in docusaurus.config.ts if URL_BASE is provided
RUN if [ "$URL_BASE" != "/" ]; then \
        sed -i "s|baseUrl: \"/\"|baseUrl: \"$URL_BASE\"|g" website/docusaurus.config.ts; \
    fi

# Build the website
WORKDIR /app/website
RUN chmod +x build-website.sh && ./build-website.sh

# Production stage
FROM node:20-alpine

# Install serve to run the built website
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/website/build /app/build

# Expose port
EXPOSE 3000

# Serve the website
CMD ["serve", "-s", "build", "-l", "3000"]
