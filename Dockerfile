FROM docker.io/node:20.9-alpine as builder
WORKDIR /app
COPY package*.json ./ 
RUN npm i -g pnpm && pnpm install 
COPY . .
RUN pnpm build:radix

FROM docker.io/nginxinc/nginx-unprivileged:1.25.2-alpine
WORKDIR /app
RUN export NODE_OPTIONS=--max-old-space-size=8192
COPY --from=builder /app/build /app
COPY nginx/server.conf /default.conf
COPY nginx/run_nginx.sh run_nginx.sh
USER 0
RUN chown -R nginx /etc/nginx/conf.d \
    && chown -R nginx /app \
    && chmod +x run_nginx.sh
USER 101
CMD /bin/sh -c ". run_nginx.sh"

