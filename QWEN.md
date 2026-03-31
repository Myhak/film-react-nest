# QWEN.md — Контекст проекта «Film!»

## Обзор проекта

**Film!** — fullstack-приложение для афиши киносеансов и покупки билетов. Проект создан в рамках Яндекс Практикума.

### Архитектура

- **Backend**: NestJS 10 + TypeScript + PostgreSQL/TypeORM
- **Frontend**: React 18 + TypeScript + Vite + SCSS
- **API Spec**: OpenAPI 3.0.0 (файл `film.yml`)

### Структура проекта

```
film-react-nest/
├── backend/                    # NestJS backend
│   ├── src/
│   │   ├── films/              # Модуль фильмов
│   │   │   ├── dto/            # DTO для фильмов
│   │   │   ├── entities/       # TypeORM сущности
│   │   │   │   ├── film.entity.ts
│   │   │   │   └── schedule.entity.ts
│   │   │   ├── films.controller.ts
│   │   │   ├── films.service.ts
│   │   │   └── films.repository.ts
│   │   ├── order/              # Модуль заказов
│   │   │   ├── dto/            # DTO для заказов
│   │   │   ├── order.controller.ts
│   │   │   └── order.service.ts
│   │   ├── repository/         # Репозитории
│   │   │   └── orders.repository.ts
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   └── seed.ts             # Скрипт загрузки данных
│   ├── public/content/afisha/  # Статические файлы (афиши)
│   ├── test/
│   │   ├── init.sql            # SQL: создание таблиц
│   │   ├── films.sql           # SQL: тестовые фильмы
│   │   └── schedules.sql       # SQL: тестовые сеансы
│   ├── .env.example
│   └── package.json
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/         # UI компоненты
│   │   │   ├── App/
│   │   │   ├── Basket/
│   │   │   ├── FilmInfo/
│   │   │   ├── FilmPreview/
│   │   │   ├── FilmsGallery/
│   │   │   ├── Header/
│   │   │   ├── Modal/
│   │   │   ├── SelectPlaces/
│   │   │   ├── SelectSession/
│   │   │   └── ...
│   │   ├── hooks/              # Кастомные хуки
│   │   │   └── useAppState.tsx
│   │   ├── utils/              # Утилиты
│   │   │   ├── api.ts          # API клиент
│   │   │   ├── state.ts        # State management
│   │   │   └── constants.ts
│   │   ├── scss/               # Стили
│   │   ├── assets/             # Ресурсы
│   │   └── stories/            # Storybook
│   ├── .env.example
│   └── package.json
├── film.yml                    # OpenAPI спецификация
├── film.postman.json           # Postman коллекция
└── README.md
```

---

## Технологии

### Backend

| Технология | Версия | Назначение |
|------------|--------|------------|
| NestJS | ^10.0.0 | Backend фреймворк |
| TypeScript | ^5.1.3 | Язык |
| TypeORM | ^0.3.28 | ORM для PostgreSQL |
| @nestjs/typeorm | ^11.0.0 | Интеграция TypeORM |
| @nestjs/config | ^3.2.3 | Конфигурация |
| @nestjs/serve-static | ^4.0.2 | Статические файлы |
| pg | ^8.20.0 | PostgreSQL драйвер |
| class-validator | ^0.15.1 | Валидация DTO |
| class-transformer | ^0.5.1 | Трансформация DTO |

### Frontend

| Технология | Версия | Назначение |
|------------|--------|------------|
| React | ^18.3.1 | UI библиотека |
| TypeScript | ^5.2.2 | Язык |
| Vite | ^5.3.1 | Сборщик |
| Sass | ^1.77.6 | CSS препроцессор |
| Storybook | ^8.1.11 | Документирование компонентов |
| dayjs | ^1.11.11 | Работа с датой |
| clsx | ^2.1.1 | Утилиты className |

---

## Сборка и запуск

### Предварительные требования

- **Node.js** (LTS 18+)
- **PostgreSQL** (локально на порту 5432 или через Docker)

### Backend

```bash
cd backend

# Установка зависимостей
npm ci

# Создание .env из примера
cp .env.example .env
# Отредактируйте .env:
# DATABASE_URL=postgres://postgres:postgres@localhost:5432/films
# DATABASE_USERNAME=postgres
# DATABASE_PASSWORD=postgres

# Инициализация базы данных (выполнить один раз)
# Через psql:
psql -U postgres -d films -f test/init.sql
psql -U postgres -d films -f test/films.sql
psql -U postgres -d films -f test/schedules.sql

# Или через Docker:
# docker-compose up -d

# Запуск в режиме разработки
npm run start:dev

# Другие команды:
npm run build        # Сборка в dist/
npm run start        # Запуск из dist/
npm run start:debug  # Запуск с отладкой
npm run start:prod   # Продакшен режим
npm run lint         # ESLint с автоисправлением
npm run test         # Jest тесты
npm run test:e2e     # E2E тесты
```

### Frontend

```bash
cd frontend

# Установка зависимостей
npm install

# Создание .env из примера
cp .env.example .env
# Для локальной разработки:
# VITE_API_URL=http://localhost:3000/api/afisha
# VITE_CDN_URL=http://localhost:3000/content/afisha

# Запуск dev-сервера
npm run dev

# Другие команды:
npm run build          # Сборка
npm run preview        # Предпросмотр сборки
npm run lint           # ESLint
npm run storybook      # Storybook (порт 6006)
npm run build-storybook # Сборка Storybook
npm run component <Name> # Создание компонента
```

---

## API Спецификация

Базовый путь: `/api/afisha`

| Метод | Путь | Описание |
|-------|------|----------|
| GET | `/films` | Список фильмов |
| GET | `/films/:id/schedule` | Расписание для фильма |
| POST | `/order` | Бронирование билетов |
| GET | `/content/afisha/*` | Статические файлы (афиши) |

### Примеры ответов

**GET /films**
```json
{
  "total": 6,
  "items": [
    {
      "id": "uuid",
      "title": "Архитекторы общества",
      "rating": 2.9,
      "director": "Итан Райт",
      "tags": ["Документальный"],
      "about": "...",
      "description": "...",
      "image": "/bg1s.jpg",
      "cover": "/bg1c.jpg"
    }
  ]
}
```

**GET /films/:id/schedule**
```json
{
  "total": 9,
  "items": [
    {
      "id": "uuid",
      "daytime": "2024-06-28T07:00:53.000Z",
      "hall": "0",
      "rows": 5,
      "seats": 10,
      "price": 350,
      "taken": ["1:2", "3:5"]
    }
  ]
}
```

**POST /order**
```json
{
  "email": "test@test.ru",
  "phone": "+7 (000) 000-00-00",
  "tickets": [
    {
      "film": "uuid",
      "session": "uuid",
      "daytime": "2024-06-28T07:00:53.000Z",
      "row": 1,
      "seat": 2,
      "price": 350
    }
  ]
}
```

---

## Ключевые компоненты

### Backend

**TypeORM сущности:**
- `Film` — фильмы с полями: id, title, rating, director, tags, about, description, image, cover
- `Schedule` — сеансы с полями: id, daytime, hall, rows, seats, price, taken, filmId
- Связь: один Film → много Schedule (one-to-many)

**Репозитории:**
- `FilmsRepository` — работа с фильмами и сеансами через TypeORM
- `OrdersRepository` — хранение заказов в памяти

**Сервисы:**
- `FilmsService` — получение фильмов и расписания
- `OrderService` — бронирование с защитой от дублей

**Контроллеры:**
- `FilmsController` — GET /films, GET /films/:id/schedule
- `OrderController` — POST /order

### Frontend

**State Management:**
- `useReducer` с кастомным reducer
- `AppState` включает: films, selectedFilm, schedule, selectedSession, basket, contacts, modal

**Основные компоненты:**
- `App` — корневой компонент
- `FilmsGallery` — список фильмов
- `FilmPreview` — превью выбранного фильма
- `SelectSession` — выбор сеанса
- `SelectPlaces` — выбор мест (визуальная схема зала)
- `Basket` — корзина с выбранными билетами
- `ContactsForm` — форма контактов
- `Modal` — модальное окно

**API Клиент:**
- `FilmAPI` класс с методами: getFilms(), getFilmSchedule(), orderTickets()

---

## Конвенции разработки

### Код-стайл

**Backend:**
- ESLint + Prettier
- Конфигурация: `.eslintrc.js`, `.prettierrc`
- Автоисправление: `npm run lint`

**Frontend:**
- ESLint с плагинами: TypeScript, React, Storybook
- Конфигурация: `.eslintrc.cjs`
- Автоисправление: `npm run lint`

### Тестирование

**Backend:**
- Jest для unit-тестов (`*.spec.ts`)
- Supertest для E2E тестов
- Запуск: `npm test`, `npm run test:e2e`

**Frontend:**
- Storybook для документирования компонентов
- Запуск: `npm run storybook`

### Создание компонентов (Frontend)

```bash
npm run component <ComponentName>
```
Скрипт копирует шаблон из `.template/` в `src/components/`.

---

## Переменные окружения

### Backend (.env)

```env
DATABASE_DRIVER="mongodb"
DATABASE_URL="mongodb://localhost:27017/practicum"
DEBUG=*
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000/api/afisha
VITE_CDN_URL=http://localhost:3000/content/afisha
```

---

## Тестовые данные

SQL файлы в `backend/test/` содержат тестовые данные:
- `init.sql` — создание таблиц films и schedules
- `films.sql` — 6 фильмов
- `schedules.sql` — 54 сеанса (9 для каждого фильма)

Инициализация БД:
```bash
psql -U postgres -d films -f test/init.sql
psql -U postgres -d films -f test/films.sql
psql -U postgres -d films -f test/schedules.sql
```

Или используйте Docker (см. POSTGRES_SETUP.md).

---

## Полезные ссылки

- [OpenAPI спецификация](film.yml)
- [Postman коллекция](film.postman.json)
- [Storybook](http://localhost:6006) (после запуска `npm run storybook`)

---

## Примечания

- PostgreSQL должна быть запущена перед стартом backend
- Для настройки аутентификации PostgreSQL см. `backend/POSTGRES_SETUP.md`
- Backend работает на порту 3000
- Frontend работает на порту 5173 (Vite dev server)
- CORS включён на backend
- Валидация DTO через class-validator
- Статические файлы обслуживаются через @nestjs/serve-static
- `synchronize: true` используется только для разработки!
