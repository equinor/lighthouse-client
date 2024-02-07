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
FROM docker.io/nginxinc/nginx-unprivileged:1.25.2-alpine
WORKDIR /app
COPY --from=build /app/dist /app
# CMD ["sh", "env-replace.sh"]

COPY --from=build /app/dist /usr/share/nginx/html
COPY .radix/nginx/conf.d/default.conf /default.conf
COPY .radix/scripts/env-replace.sh env-replace.sh
COPY .radix/scripts/run-nginx.sh run-nginx.sh

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
# COPY --from=build /app/dist /usr/share/nginx/html

## Cooy Nginx
# COPY .radix/nginx/ /etc/nginx/

## Copy Scripts
# COPY  .radix/scripts/ /etc/scripts/


USER 0
RUN chown -R nginx /etc/nginx/conf.d \
    && chown -R nginx /app \
    && chown -R nginx /usr/share/nginx/html \
    && chmod +x run-nginx.sh \
    && chmod +x env-replace.sh
## Server setup
USER 101

# disable nginx user cuz running as non-root
# RUN sed -i 's/user nginx;/#user nginx;/g' /etc/nginx/nginx.conf

# Replac env
# USER 1001
## Run Scripts
CMD ["sh","run-nginx.sh"]

