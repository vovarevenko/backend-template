FROM node:14

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g yarn
RUN yarn install

CMD ["yarn", "dev"]
