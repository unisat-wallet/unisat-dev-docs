FROM node:22-alpine AS builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY tools ./tools
COPY specs ./specs
COPY docs ./docs
COPY src ./src
COPY static ./static
COPY docusaurus.config.ts sidebars.ts tsconfig.json ./

ARG GIT_COMMIT
ARG VERSION
RUN GITHUB_SHA="${GIT_COMMIT:-unknown}" \
    OPENAPI_VERSION="${VERSION:-${GIT_COMMIT:-unknown}}" \
    npm run build
RUN test -s build/swagger/swagger.yaml && test -s build/swagger/manifest.json

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build/ /usr/share/nginx/html/
RUN nginx -t
EXPOSE 80
