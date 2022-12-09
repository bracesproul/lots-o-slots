FROM node:16-alpine AS dev

WORKDIR /app
COPY package*.json ./
COPY . .

RUN yarn install

EXPOSE 3000

CMD ["yarn", "dev"]