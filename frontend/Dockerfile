# Use an official Node.js runtime as base image for build stage
FROM node:18-alpine AS build

WORKDIR /app

ENV PORT=80

COPY package.json ./
COPY package-lock.json ./
RUN npm install && \
    npm cache clean --force && \
    rm -rf /var/lib/apt/lists/*

COPY . ./
RUN npm run build

# Remove unnecessary files
# RUN rm -rf node_modules && \
#     rm -rf src && \
#     rm -rf rollup.config.js && \
#     rm -rf package*.json && \
#     rm -rf .gitignore && \
#     rm -rf .npmignore && \
#     rm -rf .editorconfig && \
#     rm -rf README.md && \
#     rm -rf Dockerfile

# Expose the port your app runs on (default is 80)
EXPOSE 80

CMD ["node", "build/index.js"]

# NGINX starts automatically when the container runs, no need for CMD
