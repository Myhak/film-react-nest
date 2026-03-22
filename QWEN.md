# QWEN.md — Контекст проекта «Film!»

## Обзор проекта

**Film!** — это fullstack-приложение для афиши киносеансов и покупки билетов. Проект состоит из:

- **Backend**: NestJS (TypeScript) + MongoDB/Mongoose
- **Frontend**: React 18 + TypeScript + Vite + SCSS

Проект создан в рамках Яндекс Практикума. API спецификация описана в [`film.yml`](film.yml) (OpenAPI 3.0.0).

---

## Структура проекта

```
film-react-nest/
├── backend/           # NestJS backend
│   ├── src/
│   │   ├── films/     # Модуль фильмов (TODO: добавить контроллер и сервис)
│   │   ├── order/     # Модуль заказов (TODO: добавить контроллер и сервис)
│   │   ├── repository # Репозиторий для работы с БД
│   │   ├── app.module.ts
│   │   ├── app.config.provider.ts
│   │   └── main.ts
│   ├── .env.example
│   └── package.json
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/  # UI-компоненты (App, Basket, Button, Card, FilmInfo, и др.)
│   │   ├── hooks/       # Кастомные React-хуки
│   │   ├── assets/      # Статические ресурсы
│   │   ├── scss/        # Стили
│   │   ├── stories/     # Storybook истории
│   │   └── utils/       # Утилиты
│   ├── .storybook/      # Конфигурация Storybook
│   ├── .env.example
│   └── package.json
├── film.yml             # OpenAPI спецификация
├── film.postman.json    # Postman коллекция для тестирования API
└── README.md            # Основная документация
```

---

## Технологии

### Backend
| Технология | Версия | Назначение |
|------------|--------|------------|
| NestJS | ^10.0.0 | Фреймворк |
| TypeScript | ^5.1.3 | Язык |
| Mongoose | ^8.4.4 | ODM для MongoDB |
| @nestjs/config | ^3.2.3 | Конфигурация |
| dotenv | ^16.4.5 | Переменные окружения |

### Frontend
| Технология | Версия | Назначение |
|------------|--------|------------|
| React | ^18.3.1 | UI-библиотека |
| TypeScript | ^5.2.2 | Язык |
| Vite | ^5.3.1 | Сборщик |
| SCSS | ^1.77.6 | Стили |
| Storybook | ^8.1.11 | Документирование компонентов |
| clsx | ^2.1.1 | Утилиты для className |
| dayjs | ^1.11.11 | Работа с датой |

---

## Сборка и запуск

### Предварительные требования
- **Node.js** (версия не указана, рекомендуется LTS 18+)
- **MongoDB** (локально или через Docker)

### Backend

```bash
cd backend

# Установка зависимостей
npm ci
# или
yarn install --frozen-lockfile

# Создание .env из примера
cp .env.example .env
# Отредактируйте .env:
# DATABASE_DRIVER=mongodb
# DATABASE_URL=mongodb://127.0.0.1:27017/practicum
# DEBUG=*

# Запуск в режиме разработки (с отладкой)
npm start:debug

# Другие команды:
npm run build        # Сборка
npm run start:dev    # Разработка с watch
npm run start:prod   # Продакшен
npm run lint         # ESLint с автоисправлением
npm run test         # Jest тесты
npm run test:cov     # Тесты с покрытием
npm run test:e2e     # E2E тесты
```

### Frontend

```bash
cd frontend

# Установка зависимостей
npm ci
# или (используется pnpm)
pnpm install

# Создание .env из примера
cp .env.example .env
# VITE_API_URL=https://stub.practicum-team.ru/api/afisha
# VITE_CDN_URL=https://stub.practicum-team.ru/content/afisha

# Запуск dev-сервера
npm run dev

# Другие команды:
npm run build          # Сборка
npm run preview        # Предпросмотр сборки
npm run lint           # ESLint
npm run storybook      # Storybook dev (порт 6006)
npm run build-storybook # Сборка Storybook
npm run component <Name> # Создание нового компонента
```

---

## API Спецификация

Основные эндпоинты (описаны в [`film.yml`](film.yml)):

| Метод | Путь | Описание |
|-------|------|----------|
| GET | `/films` | Список фильмов на текущей неделе |
| GET | `/films/{id}/schedule` | Расписание для выбранного фильма |
| POST | `/order` | Покупка билетов |

### Примеры моделей данных

**Film**:
```json
{
  "id": "uuid",
  "rating": 2.9,
  "director": "Итан Райт",
  "tags": ["Документальный"],
  "title": "Архитекторы общества",
  "about": "...",
  "description": "...",
  "image": "/images/bg1s.jpg",
  "cover": "/images/bg1c.jpg"
}
```

**Schedule**:
```json
{
  "id": "uuid",
  "daytime": "2023-05-29T10:30:00.001Z",
  "hall": "2",
  "rows": 5,
  "seats": 10,
  "price": 350,
  "taken": ["1:2"]
}
```

---

## Разработка

### Код-стайл

**Backend**:
- ESLint + Prettier
- Конфигурация в `.eslintrc.js`, `.prettierrc`
- Автоисправление: `npm run lint`

**Frontend**:
- ESLint с плагинами для TypeScript, React, Storybook
- Конфигурация в `.eslintrc.cjs`
- Автоисправление: `npm run lint`

### Тестирование

**Backend**:
- Jest для unit-тестов (`*.spec.ts`)
- Supertest для E2E тестов
- Запуск: `npm test`, `npm run test:e2e`

**Frontend**:
- Storybook для документирования и тестирования компонентов
- Запуск: `npm run storybook`

### Создание компонентов (Frontend)

Используйте скрипт для создания нового компонента:
```bash
npm run component <ComponentName>
```
Скрипт копирует шаблон из `.template/` в `src/components/`.

---

## Текущий статус разработки

### Backend (TODO)
- [ ] Добавить контроллер и сервис для работы с фильмами (`src/films/TODO.md`)
- [ ] Добавить контроллер и сервис для работы с заказами (`src/order/TODO.md`)
- [ ] Настроить раздачу статических файлов из public (`app.module.ts`)
- [ ] Подключить MongoDB через Mongoose

### Frontend
- [ ] Интеграция с backend API (сейчас используется stub `stub.practicum-team.ru`)
- [ ] Реализация корзины и покупки билетов

---

## Полезные ссылки

- [OpenAPI спецификация](film.yml)
- [Postman коллекция](film.postman.json)
- [Storybook](http://localhost:6006) (после запуска `npm run storybook`)

---

## Примечания

- MongoDB должна быть установлена и запущена перед запуском backend
- Для initial setup MongoDB выполните скрипт `test/mongodb_initial_stub.js` в консоли `mongo`
- Проект использует pnpm как package manager для frontend (указано в `packageManager`)
