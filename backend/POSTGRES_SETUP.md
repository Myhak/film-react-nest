# Инструкция по настройке PostgreSQL для проекта Film!

## Вариант 1: Использовать Docker (рекомендуется)

Это самый простой способ запустить PostgreSQL с правильными настройками.

1. Установите Docker Desktop для Windows

2. Перейдите в папку backend:
   ```
   cd backend
   ```

3. Запустите PostgreSQL с тестовыми данными:
   ```
   docker-compose up -d
   ```

4. Проверьте что контейнер запущен:
   ```
   docker-compose ps
   ```

5. Для остановки:
   ```
   docker-compose down
   ```

**Преимущества:**
- Не нужно настраивать pg_hba.conf
- Тестовые данные загружаются автоматически
- Изолированная среда разработки

## Вариант 2: Локальная установка PostgreSQL

1. Найдите файл pg_hba.conf (обычно в `C:\Program Files\PostgreSQL\18\data\pg_hba.conf`)

2. Откройте файл от имени администратора

3. Найдите строки:
   ```
   # IPv4 local connections:
   host    all             all             127.0.0.1/32            sspi
   # IPv6 local connections:
   host    all             all             ::1/128                 sspi
   ```

4. Замените `sspi` на `md5` или `scram-sha-256`:
   ```
   # IPv4 local connections:
   host    all             all             127.0.0.1/32            md5
   # IPv6 local connections:
   host    all             all             ::1/128                 md5
   ```

5. Перезапустите службу PostgreSQL:
   ```
   net stop postgresql-x64-18
   net start postgresql-x64-18
   ```
   (Или через Services.msc)

6. Установите пароль для пользователя postgres:
   ```sql
   ALTER USER postgres WITH PASSWORD 'postgres';
   ```

### Вариант 2: Использовать Docker

1. Установите Docker Desktop

2. Создайте docker-compose.yml:
   ```yaml
   version: '3.8'
   services:
     postgres:
       image: postgres:15
       environment:
         POSTGRES_USER: postgres
         POSTGRES_PASSWORD: postgres
         POSTGRES_DB: films
       ports:
         - "5432:5432"
       volumes:
         - postgres_data:/var/lib/postgresql/data
         - ./test/init.sql:/docker-entrypoint-initdb.d/1-init.sql
         - ./test/films.sql:/docker-entrypoint-initdb.d/2-films.sql
         - ./test/schedules.sql:/docker-entrypoint-initdb.d/3-schedules.sql

   volumes:
     postgres_data:
   ```

3. Запустите:
   ```
   docker-compose up -d
   ```

### Вариант 3: Создать нового пользователя без пароля (не рекомендуется для production)

```sql
CREATE USER filmuser WITH SUPERUSER;
```

## Проверка подключения

После настройки проверьте подключение:
```
psql -U postgres -d films -h localhost
```

Введите пароль: `postgres`

## Переменные окружения

Убедитесь, что .env файл содержит:
```
DATABASE_DRIVER="postgres"
DATABASE_URL="postgres://postgres:postgres@localhost:5432/films"
DATABASE_USERNAME="postgres"
DATABASE_PASSWORD="postgres"
```
