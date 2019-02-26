FROM node:10.15.1-alpine AS build
RUN mkdir /app
WORKDIR /app
COPY ./package.json ./yarn.lock ./
COPY . ./
ENTRYPOINT ["yarn global add sass", "sass --update --no-source-map ./assets/style/scss/main.scss:./assets/style/css/main.min.css --style compressed", "yarn"]
COPY ./assets/style/css ./assets/style/css

FROM nginx:1.15-alpine
COPY --from=build ./app /var/www/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
