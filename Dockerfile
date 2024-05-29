FROM node:20.0.0-slim as build

WORKDIR /app
COPY . /app

RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    rm -rf /var/lib/apt/lists/*

RUN npm i -g pnpm@9.0.5
RUN pnpm install
RUN pnpm build:radix

FROM docker.io/nginxinc/nginx-unprivileged:1.25.2-alpine
WORKDIR /app
COPY --from=build /app/dist /app

COPY --from=build /app/dist /usr/share/nginx/html
COPY .radix/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY .radix/scripts/run-nginx.sh run-nginx.sh

USER 0
RUN chown -R nginx /etc/nginx/conf.d \
    && chown -R nginx /app \
    && chown -R nginx /usr/share/nginx/html \
    && chmod +x run-nginx.sh 
USER 101
CMD ["sh","run-nginx.sh"]

