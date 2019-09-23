# ------------------------------------------------------------------------- #
#                               Build image                                 #
# ------------------------------------------------------------------------- #
FROM node:12.10-alpine AS build
RUN mkdir /app
WORKDIR /app
COPY ./package*.json ./
COPY ./assets/style/scss ./assets/style/scss
RUN npm ci; \
    node_modules/.bin/sass --update ./assets/style/scss/main.scss:./assets/style/css/main.min.css --style=compressed --no-source-map; \
    node_modules/.bin/sass --update ./assets/style/scss/disclaimer.scss:./assets/style/css/disclaimer.min.css --style=compressed --no-source-map
COPY . ./

RUN npm prune --production

# ------------------------------------------------------------------------- #
#                               Prod image                                  #
# ------------------------------------------------------------------------- #
FROM nginx:1.17.3-alpine AS server
COPY --from=build /app /var/www/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
