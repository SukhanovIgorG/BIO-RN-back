FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install --frozen-lockfile --production

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "dist/src/main.js"]
