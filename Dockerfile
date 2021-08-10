FROM node:14.15.4-alpine3.12

RUN apk add --no-cache bash

RUN npm i -g @nestjs/cli@8.0.0

WORKDIR /usr/src/app

