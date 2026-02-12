FROM node:20-alpine AS builder

WORKDIR /app


# Copy website package files
COPY website/package.json website/yarn.lock /app/

# Install dependencies
RUN yarn install --frozen-lockfile


COPY open-api/auto-generated/docs/*.md docs/open-api/auto-generated/docs/ 
COPY open-api/note-source docs/open-api/

RUN yarn build


FROM nginx:stable-alpine

COPY --from=builder /app/build/ /usr/share/nginx/html/

EXPOSE 80
