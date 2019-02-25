FROM node:10.15.1-alpine AS builder
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && yarn \
    && apk del .gyp
COPY ./ ./

FROM nginx:1.15-alpine
COPY --from=builder ./app/ /var/www/html
COPY ./docker_conf/nginx.conf /etc/nginx/conf.d/default.conf
