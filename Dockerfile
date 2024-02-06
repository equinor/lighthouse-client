
FROM node:20-alpine as build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# Get build secrets from Radix
ARG JC_CONFIG
# Setup and get files needed for build
RUN mkdir -p /home/node/app/node_modules
RUN chown -R root /home/node/app

WORKDIR /home/node/app
COPY package*.json ./
COPY public/ public/
COPY src/ src/
# echo3d
COPY packages/ packages/
COPY vite.config.ts .
COPY index.html .
COPY deployment/tsconfig.json .

# RUN npm i -g pnpm@8.0.0


# Install packages, exclude devDependencies
# RUN chown -R 1000:1000 /root/.npm/*
# RUN pnpm install
RUN npm i -g pnpm && pnpm install 

# Build app
RUN chmod 777 /home/node/app/tsconfig.json
RUN export VITE_JC_CONFIG=$(echo $JC_CONFIG|base64 -d)
# RUN export VITE_TENANT_ID=$(echo $TENANT_ID|base64 -d) && \
#     export VITE_THELMA_CLIENT_ID=$(echo $THELMA_CLIENT_ID|base64 -d) && \
#     export VITE_AG_GRID_LICENSE=$(echo $THELMA_AGGRID_LICENSE|base64 -d) && \
#     export VITE_PROD_APPINSIGHTS_CONNECTION_STRING=$(echo $VITE_PROD_APPINSIGHTS_CONNECTION_STRING|base64 -d) && \
#     export VITE_DEV_APPINSIGHTS_CONNECTION_STRING=$(echo $VITE_DEV_APPINSIGHTS_CONNECTION_STRING|base64 -d) && \
#     export VITE_QA_APPINSIGHTS_CONNECTION_STRING=$(echo $VITE_QA_APPINSIGHTS_CONNECTION_STRING|base64 -d) && \
#     export VITE_TEST_APPINSIGHTS_CONNECTION_STRING=$(echo $VITE_TEST_APPINSIGHTS_CONNECTION_STRING|base64 -d) && \
#     npm run build:prod --production
#

RUN pnpm build:radix


# Copy the app to a new clean container and run in express on port 3000
FROM node:20-alpine as deployment

RUN deluser --remove-home node \
    && addgroup -S node -g 1001 \
    && adduser -S -G node -u 1001 node

WORKDIR /home/node/app

COPY deployment .
RUN npm i

COPY --from=build /home/node/app/dist .
RUN chown -R node:node /home/node/app/*
RUN chmod -R 755 /home/node/app/*

USER 1001
EXPOSE 3000
CMD ["node", "app.js"]
