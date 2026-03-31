-- Инициализация базы данных для проекта Film!
-- Создаёт таблицы films и schedules

-- Таблица фильмов
CREATE TABLE IF NOT EXISTS films (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    rating DECIMAL(3, 1),
    director VARCHAR(255),
    tags TEXT[],
    about TEXT,
    description TEXT,
    image VARCHAR(255),
    cover VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Таблица сеансов
CREATE TABLE IF NOT EXISTS schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    film_id UUID NOT NULL REFERENCES films(id) ON DELETE CASCADE,
    daytime TIMESTAMP WITH TIME ZONE NOT NULL,
    hall VARCHAR(50) NOT NULL,
    rows INTEGER NOT NULL,
    seats INTEGER NOT NULL,
    price INTEGER NOT NULL,
    taken TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для улучшения производительности
CREATE INDEX IF NOT EXISTS idx_schedules_film_id ON schedules(film_id);
CREATE INDEX IF NOT EXISTS idx_schedules_daytime ON schedules(daytime);
CREATE INDEX IF NOT EXISTS idx_films_title ON films(title);
