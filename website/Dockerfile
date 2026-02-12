# Build stage
FROM node:20-alpine AS builder

# Build argument for URL base
ARG URL_BASE=/

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the entire project
COPY . ./

# Copy parent directory content needed for build
COPY ../open-api ../open-api
COPY ../package.json ../package.json
COPY ../package-lock.json ../package-lock.json

# Update baseUrl in docusaurus.config.ts if URL_BASE is provided
RUN if [ "$URL_BASE" != "/" ]; then \
        sed -i "s|baseUrl: \"/\"|baseUrl: \"$URL_BASE\"|g" docusaurus.config.ts; \
    fi

# Build the website
RUN chmod +x build-website.sh && ./build-website.sh

# Production stage
FROM node:20-alpine

# Install serve to run the built website
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/build /app/build

# Expose port
EXPOSE 3000

# Serve the website
CMD ["serve", "-s", "build", "-l", "3000"]
