# build environment
FROM node:17.1.0 as build

# Copy App
WORKDIR /app
COPY . /app

# Build 
RUN yarn install
RUN yarn build --mode=production

# production environment
FROM nginx:stable-alpine

## Install
# RUN apk add python3


## add permissions for nginx user
COPY --from=build /app/build /usr/share/nginx/html

## Cooy Nginx
COPY .docker/nginx/ /etc/nginx/

## Copy Scripts
COPY  .docker/scripts/ /etc/scripts/

## Server setup
EXPOSE 80

## Run Scripts
CMD ["sh","/etc/scripts/startup.sh"]
