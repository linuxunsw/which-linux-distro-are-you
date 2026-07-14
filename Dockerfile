FROM node:24-slim

USER node

WORKDIR /home/node/app

# Dependencies
COPY .npmrc .
COPY package.json .
COPY package-lock.json .
RUN npm ci

# Configuration
COPY vite.config.ts .
COPY tsconfig.json .

# Source code
COPY src src
COPY static static

RUN ls -al /home/node/app

# Build server
RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "node", "build" ]
