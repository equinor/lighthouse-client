#!/bin/sh
envsubst '
  ${JC_CONFIG}
  ${AUTH_CONFIG}
  ' </usr/share/nginx/html/index.html >/usr/share/nginx/html/tmp.html
mv /usr/share/nginx/html/tmp.html /usr/share/nginx/html/index.html
echo "Starting NGINX"
nginx -g 'daemon off;'
