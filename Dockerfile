# Root Multistage Dockerfile for SynoCommerce Core Platform
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json tsconfig.json ./

FROM base AS dependencies
RUN npm ci

FROM dependencies AS build
COPY . .
RUN node node_modules/typescript/bin/tsc --noEmit

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app ./

EXPOSE 3000
CMD ["npm", "start"]
