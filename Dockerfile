FROM node:20-alpine

WORKDIR /usr/src/app

# Копируем package.json и lock
COPY package*.json ./

# Установка зависимостей
RUN yarn install

# Копируем исходный код
COPY . .

# Собираем
RUN yarn run build

# Открываем порт
EXPOSE 3000

# Запуск
CMD ["node", "dist/src/main.js"]
