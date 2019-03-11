FROM node:10.15.1-alpine AS build
RUN mkdir /app
WORKDIR /app
COPY ./package.json ./yarn.lock ./
COPY . ./
RUN yarn; \
    node_modules/.bin/sass --update ./assets/style/scss/main.scss:./assets/style/css/main.min.css --style compressed --no-source-map

FROM nginx:1.15-alpine
COPY --from=build ./app /var/www/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
