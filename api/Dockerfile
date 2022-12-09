# FROM node:16-alpine AS build

# WORKDIR /app
# RUN yarn global add turbo
# COPY package*.json ./
# COPY . .
# RUN turbo prune --docker

# FROM node:16-alpine AS installer

# WORKDIR /app
# COPY .gitignore .gitignore
# COPY --from=build /app/out/json/ .
# COPY --from=build /app/out/yarn.lock ./yarn.lock
# COPY .yarn/ .yarn
# COPY .yarnrc.yml .
# RUN yarn install


FROM node:16-alpine AS dev

WORKDIR /app
COPY . .
WORKDIR /app/api
RUN yarn install
RUN yarn build

EXPOSE 8000

CMD ["yarn", "dev"]