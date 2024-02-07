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
COPY .radix/nginx/ /etc/nginx/

## Copy Scripts
COPY  .radix/scripts/ /etc/scripts/

## Server setup
EXPOSE 80
# USER 0

#
# RUN mkdir -p /var/cache/nginx && chown -R ${USER}:${GROUP} /var/cache/nginx && \
#     mkdir -p /var/log/nginx  && chown -R ${USER}:${GROUP} /var/log/nginx && \
#     mkdir -p /var/lib/nginx  && chown -R ${USER}:${GROUP} /var/lib/nginx && \
#     touch /run/nginx.pid && chown -R ${USER}:${GROUP} /run/nginx.pid && \
#     mkdir -p /etc/nginx/templates /etc/nginx/ssl/certs && \
#     chown -R ${USER}:${GROUP} /etc/nginx && \
#     chmod -R 777 /etc/nginx/conf.d

# disable nginx user cuz running as non-root
RUN sed -i 's/user nginx;/#user nginx;/g' /etc/nginx/nginx.conf

# RUN chown -R nginx /usr/share/nginx \
#   && chown -R nginx /var/cache/nginx \
#   && chown -R nginx /usr/share/nginx \
#   && chmod +x /etc/scripts/startup.sh 
# Replac env
CMD ["sh", "etc/scripts/env-replace.sh"]
# USER 1001
## Run Scripts
CMD ["sh","/etc/scripts/startup.sh"]
