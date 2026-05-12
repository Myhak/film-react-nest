# FILM!

## Ссылки

- **Приложение:** http://111.88.156.117
- **pgAdmin:** http://111.88.156.117:8080

## Запуск через Docker

Скопируй `.env.example` в `.env` и при необходимости измени значения:

```bash
cp .env.example .env
```

Собери и запусти все сервисы:

```bash
docker compose up -d --build
```

Проверь статус контейнеров:

```bash
docker compose ps
```

После запуска:
- Приложение: http://localhost
- pgAdmin: http://localhost:8080 (логин: `admin@admin.com`, пароль: `admin`)

Для заполнения базы данных выполни SQL-файлы из `backend/test/` в Query Tool pgAdmin:
1. `init.sql`
2. `films.sql`
3. `schedules.sql`

## Локальная разработка

### Бэкенд

```bash
cd backend
cp .env.example .env
npm install
npm run start:dev
```

### Фронтенд

```bash
cd frontend
npm install
npm run dev
```
