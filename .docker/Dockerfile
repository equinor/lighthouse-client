# uild environment
FROM node:17.3.1 as build

# Copy App
WORKDIR /app
COPY . /app

# Build 
RUN yarn install
RUN yarn build 

# Production environment
FROM nginx:stable-alpine

## Install
RUN apk add python3

# Dynatrace setup
ARG DYNATRACE_ADDRESS
ARG DYNATRACE_ENVIRONMENT_ID
ARG DYNATRACE_PAAS_TOKEN
ENV DT_ADDRESS=$DYNATRACE_ADDRESS
ENV DT_ENVIRONMENT_ID=$DYNATRACE_ENVIRONMENT_ID
ENV DT_PAAS_TOKEN=$DYNATRACE_PAAS_TOKEN
RUN curl -o /tmp/installer.sh -s "https://$DT_ADDRESS/e/$DT_ENVIRONMENT_ID/api/v1/deployment/installer/agent/unix/paas-sh/latest?Api-Token=$DT_PAAS_TOKEN&arch=x86&flavor=musl" && sh /tmp/installer.sh /home
ENV LD_PRELOAD /home/dynatrace/oneagent/agent/lib64/liboneagentproc.so

## Add permissions for nginx user
COPY --from=build /app/dist /usr/share/nginx/html

## Cooy Nginx
COPY .docker/nginx/ /etc/nginx/

## Copy Scripts
COPY  .docker/scripts/ /etc/scripts/

## Copy Env
COPY .env /etc/scripts/

## Server setup
EXPOSE 80

## Run Scripts
CMD ["sh","/etc/scripts/startup.sh"]
