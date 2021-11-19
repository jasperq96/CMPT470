FROM node:16.10-alpine as base

WORKDIR /dello-box-client

ENV PATH="./node_modules/.bin:$PATH"

COPY package.json ./

RUN npm install

COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build

CMD ["npm", "start"]