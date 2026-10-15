FROM node:22-alpine AS builder

WORKDIR /app
RUN apk add --no-cache bash

# Install dependencies before copying source to keep these layers cacheable.
# The root prepare script runs the build, so skip it until source is present.
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY website/package.json website/yarn.lock ./website/
RUN cd website && yarn install --frozen-lockfile

COPY tools ./tools
COPY build ./build
COPY open-api ./open-api
COPY errors ./errors
COPY wallet-api ./wallet-api
COPY website ./website

# Pass these from CI so the published manifest identifies the source revision.
ARG GIT_COMMIT
ARG VERSION
WORKDIR /app/website
RUN GITHUB_SHA="${GIT_COMMIT:-unknown}" \
    OPENAPI_VERSION="${VERSION:-${GIT_COMMIT:-unknown}}" \
    ./build-website.sh
RUN test -s build/swagger/swagger.yaml && test -s build/swagger/manifest.json

FROM nginx:stable-alpine

COPY website/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/website/build/ /usr/share/nginx/html/
RUN nginx -t

EXPOSE 80
