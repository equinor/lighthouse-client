FROM node:18.0.0-slim as build

WORKDIR /app
COPY . /app

RUN npm i -g pnpm@8.0.0
RUN pnpm install
RUN pnpm build:radix

FROM docker.io/nginxinc/nginx-unprivileged:1.25.2-alpine
WORKDIR /app
COPY --from=build /app/dist /app

COPY --from=build /app/dist /usr/share/nginx/html
COPY .radix/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
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

USER 0
RUN chown -R nginx /etc/nginx/conf.d \
    && chown -R nginx /app \
    && chown -R nginx /usr/share/nginx/html \
    && chmod +x run-nginx.sh 
USER 101
CMD ["sh","run-nginx.sh"]

