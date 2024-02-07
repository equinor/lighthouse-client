# FROM docker.io/node:20.9-alpine as builder
# WORKDIR /app
# COPY package*.json ./ 
# RUN npm i -g pnpm && pnpm install 
# COPY . .
# RUN export NODE_OPTIONS=--max-old-space-size=32768
# RUN pnpm build:radix
#
# FROM docker.io/nginxinc/nginx-unprivileged:1.25.2-alpine
# WORKDIR /app
# COPY --from=builder /app/build /app
# COPY --from=builder /app/build /usr/share/nginx/html
# COPY nginx/server.conf default.conf
# COPY nginx/run_nginx.sh run_nginx.sh
# USER 0
# RUN chown -R nginx /etc/nginx/conf.d \
#     && chown -R nginx /app \
#     && chmod +x run_nginx.sh
# USER 101
# CMD /bin/sh -c ". run_nginx.sh"
# uild environment
FROM node:18.0.0 as build

# Copy App
WORKDIR /app
COPY . /app

# Build
RUN npm i -g pnpm@8.0.0
RUN pnpm install
# RUN pnpm test
RUN pnpm bundle 

# Production environment
FROM nginx:1.20.2-alpine

## Install
# RUN apk add python3

# Dynatrace setup
# ARG DYNATRACE_ADDRESS
# ARG DYNATRACE_ENVIRONMENT_ID
# ARG DYNATRACE_PAAS_TOKEN
# ENV DT_ADDRESS=$DYNATRACE_ADDRESS
# ENV DT_ENVIRONMENT_ID=$DYNATRACE_ENVIRONMENT_ID
# ENV DT_PAAS_TOKEN=$DYNATRACE_PAAS_TOKEN
# RUN curl -o /tmp/installer.sh -s "https://$DT_ADDRESS/e/$DT_ENVIRONMENT_ID/api/v1/deployment/installer/agent/unix/paas-sh/latest?Api-Token=$DT_PAAS_TOKEN&arch=x86&flavor=musl" && sh /tmp/installer.sh /home
# ENV LD_PRELOAD /home/dynatrace/oneagent/agent/lib64/liboneagentproc.so

## Add permissions for nginx user
COPY --from=build /app/dist /usr/share/nginx/html

## Cooy Nginx
COPY .docker/nginx/ /etc/nginx/

## Copy Scripts
COPY  .docker/scripts/ /etc/scripts/

## Copy Env
# COPY .env /etc/scripts/

## Server setup
EXPOSE 80

## Run Scripts
CMD ["sh","/etc/scripts/startup.sh"]
