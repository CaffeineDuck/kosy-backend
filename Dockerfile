FROM node:14-alpine

WORKDIR /app

COPY package.json /app/package.json

RUN yarn install

COPY . /app

RUN ["chmod", "+x", "entrypoint.sh"]

ENTRYPOINT ["entrypoint.sh"]