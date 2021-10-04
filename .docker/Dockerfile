# build environment
FROM node:14.17.0 as build
WORKDIR /app
COPY . /app
RUN yarn install
RUN yarn build --mode=production

