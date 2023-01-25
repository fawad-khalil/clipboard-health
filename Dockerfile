FROM node:14-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build
RUN yarn run migrate

