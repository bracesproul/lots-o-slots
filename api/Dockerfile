FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN apk add --update --no-cache python3 build-base gcc && ln -sf /usr/bin/python3 /usr/bin/python

RUN yarn install

FROM node:16-alpine AS dev

WORKDIR /app
COPY --from=builder /app/ /app/
COPY . .
RUN yarn build:api

EXPOSE 8000

CMD ["yarn", "dev"]