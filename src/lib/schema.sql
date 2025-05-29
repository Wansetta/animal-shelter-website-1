
-- Схема базы данных приюта для животных

-- Таблица животных
CREATE TABLE animals (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('dog', 'cat')),
  breed TEXT NOT NULL,
  age TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),
  description TEXT,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'adopted')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Таблица сотрудников
CREATE TABLE employees (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Таблица опекунов/усыновителей
CREATE TABLE guardians (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Таблица передач животных
CREATE TABLE transfers (
  id TEXT PRIMARY KEY,
  animal_id TEXT NOT NULL,
  guardian_id TEXT NOT NULL,
  employee_id TEXT NOT NULL,
  transfer_date DATETIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (animal_id) REFERENCES animals(id),
  FOREIGN KEY (guardian_id) REFERENCES guardians(id),
  FOREIGN KEY (employee_id) REFERENCES employees(id)
);

-- Индексы для оптимизации запросов
CREATE INDEX idx_animals_type ON animals(type);
CREATE INDEX idx_animals_status ON animals(status);
CREATE INDEX idx_transfers_animal ON transfers(animal_id);
CREATE INDEX idx_transfers_guardian ON transfers(guardian_id);
