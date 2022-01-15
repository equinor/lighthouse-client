# build environment
FROM node:16.10.0 as build

ARG env=dev

# Copy App
WORKDIR /app
COPY . /app

# Build 
RUN yarn install
RUN yarn build --mode dev

# production environment
FROM nginx:stable-alpine

## Install
# RUN apk add python3


## add permissions for nginx user
COPY --from=build /app/dist /usr/share/nginx/html

## Cooy Nginx
COPY .docker/nginx/ /etc/nginx/

## Copy Scripts
COPY  .docker/scripts/ /etc/scripts/

## Server setup
EXPOSE 80

## Run Scripts
CMD ["sh","/etc/scripts/startup.sh"]
