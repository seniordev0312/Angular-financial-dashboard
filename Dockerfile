# Stage 1
FROM node:14.15.4 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/insurance-power-house /usr/share/nginx/html
COPY --from=node /app/nginx.default.conf /etc/nginx/conf.d/default.conf
COPY --from=node /app/nginx.conf /etc/nginx/nginx.conf


CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
