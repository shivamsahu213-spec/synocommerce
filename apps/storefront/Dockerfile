# Dockerfile for Headless Storefront Application
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm ci
COPY . .

EXPOSE 3002
CMD ["npm", "run", "dev"]
