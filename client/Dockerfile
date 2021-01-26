# Build project
FROM node:10-alpine AS build-env
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install -g @angular/cli && npm install

COPY . .
RUN ng build --prod

# Build runtime image
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
#!/bin/sh

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from dist
WORKDIR /usr/share/nginx/html
COPY --from=build-env usr/src/app/dist/client .
EXPOSE 4200 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]