#!/bin/sh
echo "Starting NGINX"
envsubst '
  ${JC_CONFIG}
  ${AUTH_CONFIG}
  ' </usr/share/nginx/html/index.html >/usr/share/nginx/html/tmp.html
mv /usr/share/nginx/html/tmp.html /usr/share/nginx/html/index.html
nginx -g 'daemon off;'
