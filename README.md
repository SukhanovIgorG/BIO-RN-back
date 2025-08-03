Инструкция по запуску

1. Добавить .env

```
# App
PORT=3000

# PostgreSQL
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=0000
POSTGRES_DB=nest_auth_db
```

Запуск в режиме разработки
yarn start:dev

Запуск в режиме продакшена
yarn start:prod

Описание эндпонтов доступно на http://localhost:3000/swagger
