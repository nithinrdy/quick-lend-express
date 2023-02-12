FROM node:18-alpine

WORKDIR /working

COPY package.json package-lock.json ./

RUN npm install --quiet

COPY . .

ENV NODE_ENV=production

WORKDIR /working/src

RUN npm i ts-node -g

CMD ["ts-node", "server.ts"]