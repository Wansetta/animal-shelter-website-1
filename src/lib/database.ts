// Интерфейсы для работы с базой данных

export interface Animal {
  id: string;
  name: string;
  type: "dog" | "cat";
  breed: string;
  age: string;
  gender: "male" | "female";
  description?: string;
  image_url?: string;
  status: "available" | "reserved" | "adopted";
  vaccination: boolean;
  microchipped: boolean;
  admission_date: string;
  created_at?: string;
  updated_at?: string;
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  phone?: string;
  email?: string;
  created_at?: string;
}

export interface Guardian {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  created_at?: string;
}

export interface Transfer {
  id: string;
  animal_id: string;
  guardian_id: string;
  employee_id: string;
  transfer_date: string;
  status: "pending" | "completed" | "cancelled";
  notes?: string;
  created_at?: string;
}

// Простое хранилище в памяти (позже можно заменить на SQLite)
class InMemoryDatabase {
  private animals: Animal[] = [];
  private employees: Employee[] = [];
  private guardians: Guardian[] = [];
  private transfers: Transfer[] = [];

  // Методы для работы с животными
  async getAnimals(): Promise<Animal[]> {
    return this.animals;
  }

  async getAnimalById(id: string): Promise<Animal | null> {
    return this.animals.find((animal) => animal.id === id) || null;
  }

  async createAnimal(
    animal: Omit<Animal, "created_at" | "updated_at">,
  ): Promise<Animal> {
    const newAnimal: Animal = {
      ...animal,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.animals.push(newAnimal);
    return newAnimal;
  }

  async updateAnimal(
    id: string,
    updates: Partial<Animal>,
  ): Promise<Animal | null> {
    const index = this.animals.findIndex((animal) => animal.id === id);
    if (index === -1) return null;

    this.animals[index] = {
      ...this.animals[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    return this.animals[index];
  }

  // Методы фильтрации
  async getAnimalsByType(type: "dog" | "cat"): Promise<Animal[]> {
    return this.animals.filter((animal) => animal.type === type);
  }

  async getAnimalsByStatus(status: Animal["status"]): Promise<Animal[]> {
    return this.animals.filter((animal) => animal.status === status);
  }

  // Инициализация данных
  async seedData(animals: Animal[]): Promise<void> {
    this.animals = animals;
  }
}

export const database = new InMemoryDatabase();
