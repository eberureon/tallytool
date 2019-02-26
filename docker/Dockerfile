FROM node:10.15.1-alpine AS build
RUN mkdir /app
WORKDIR /app
COPY ./package.json ./yarn.lock ./
COPY . ./
RUN apk add --no-cache --virtual .gyp \
  g++ \
  make \
  ruby ruby-dev \
  && yarn global add sass \
  && sass --update --no-source-map --no-embed-source-map ./assets/style/scss/main.scss:./assets/style/css/main.min.css --style compressed \
  && yarn
RUN apk del .gyp
COPY . ./

FROM nginx:1.15-alpine
COPY --from=build ./app /var/www/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
