# Mojud API image (also used by the one-off `migrate` service).
# Build context: the repository root (docker-compose.yml sets it).

# --- build: compile @mojud/contracts and @mojud/api with TypeScript ---
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY packages/contracts/package.json packages/contracts/
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
RUN npm ci
COPY tsconfig.base.json ./
COPY packages/contracts packages/contracts
COPY apps/api apps/api
RUN npx tsc -b apps/api

# --- runtime: production dependencies only, runs as the unprivileged node user ---
FROM node:22-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json ./
COPY packages/contracts/package.json packages/contracts/
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
RUN npm ci --omit=dev --workspace @mojud/api --workspace @mojud/contracts \
  && npm cache clean --force
COPY --from=build /app/packages/contracts/dist packages/contracts/dist
COPY --from=build /app/apps/api/dist apps/api/dist
COPY apps/api/migrations apps/api/migrations
USER node
WORKDIR /app/apps/api
EXPOSE 3000
CMD ["node", "dist/server.js"]
