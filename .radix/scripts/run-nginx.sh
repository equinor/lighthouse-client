#!/bin/sh
echo "Starting NGINX"
envsubst '
  ${JC_CONFIG}
  ${SERVICE_MESSAGE}
  ' </usr/share/nginx/html/index.html >/usr/share/nginx/html/tmp.html
mv /usr/share/nginx/html/tmp.html /usr/share/nginx/html/index.html
export VITE_AUTH_CONFIG = ${VITE_AUTH_CONFIG}
nginx -g 'daemon off;'
