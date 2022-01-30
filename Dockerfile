FROM node:16-bullseye-slim

WORKDIR /app

COPY package.json /app/package.json

RUN apt update && apt update && apt install git -y
RUN yarn install

COPY . /app

RUN ["chmod", "+x", "entrypoint.sh"]

ENTRYPOINT ["entrypoint.sh"]