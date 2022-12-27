FROM node:16-alpine AS prod_builder

WORKDIR /app
COPY yarn.lock ./
COPY ./api/package.json ./api/package.json
RUN yarn install

FROM node:16-alpine AS prod

WORKDIR /app
COPY --from=prod_builder /app/ /app/
COPY . .
RUN yarn build:api

EXPOSE 8000

CMD ["yarn", "start"]