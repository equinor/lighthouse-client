
FROM node:20-alpine as build
# Get build secrets from Radix
#ARG VITE_JC_CONFIG
#ARG VITE_AUTH_CONFIG
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

# Install packages, exclude devDependencies
RUN npm i -g pnpm && pnpm install 
RUN chmod 777 ./

# env vars
#ENV VITE_JC_CONFIG=$VITE_JC_CONFIG
#ENV VITE_AUTH_CONFIG=$VITE_AUTH_CONFIG
# RUN export VITE_JC_CONFIG=$(echo $VITE_JC_CONFIG|base64 -d)
# RUN export VITE_AUTH_CONFIG=$(echo $VITE_AUTH_CONFIG|base64 -d)
# Vite build
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
