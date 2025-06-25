// Сервис для управления животными с синхронизацией состояния
import animalsData from "@/data/animals.json";

export interface Animal {
  id: string;
  name: string;
  type: "dog" | "cat" | "other";
  breed: string;
  age: string;
  gender: "male" | "female";
  description?: string;
  image: string;
  status: "available" | "reserved" | "adopted";
  vaccination: boolean;
  microchipped: boolean;
  admission_date: string;
  dateAdded: string;
}

// Список подписчиков для обновлений
type Subscriber = () => void;

class AnimalService {
  private animals: Animal[] = [];
  private subscribers: Subscriber[] = [];

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    this.animals = animalsData.map((animal) => ({
      id: animal.id,
      name: animal.name,
      type: animal.type as "dog" | "cat" | "other",
      breed: animal.breed,
      age: animal.age,
      gender: animal.gender as "male" | "female",
      description: animal.description,
      image: animal.image_url,
      status: animal.status as "available" | "reserved" | "adopted",
      vaccination: animal.vaccination,
      microchipped: animal.microchipped,
      admission_date: animal.admission_date,
      dateAdded: new Date().toISOString(),
    }));
  }

  // Подписка на изменения
  subscribe(callback: Subscriber): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub !== callback);
    };
  }

  private notifySubscribers() {
    this.subscribers.forEach((callback) => callback());
  }

  async getAllAnimals(): Promise<Animal[]> {
    return [...this.animals];
  }

  async getAnimalById(id: string): Promise<Animal | undefined> {
    return this.animals.find((animal) => animal.id === id);
  }

  async getAvailableAnimals(): Promise<Animal[]> {
    return this.animals.filter((animal) => animal.status === "available");
  }

  async getAnimalsByType(type: "dog" | "cat" | "other"): Promise<Animal[]> {
    return this.animals.filter((animal) => animal.type === type);
  }

  // CRUD операции
  async createAnimal(
    animalData: Omit<Animal, "id" | "dateAdded">,
  ): Promise<Animal> {
    const newAnimal: Animal = {
      ...animalData,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString(),
    };

    this.animals.push(newAnimal);
    this.notifySubscribers();
    return newAnimal;
  }

  async updateAnimal(
    id: string,
    updates: Partial<Animal>,
  ): Promise<Animal | null> {
    const index = this.animals.findIndex((animal) => animal.id === id);
    if (index === -1) return null;

    this.animals[index] = { ...this.animals[index], ...updates };
    this.notifySubscribers();
    return this.animals[index];
  }

  async deleteAnimal(id: string): Promise<boolean> {
    const index = this.animals.findIndex((animal) => animal.id === id);
    if (index === -1) return false;

    this.animals.splice(index, 1);
    this.notifySubscribers();
    return true;
  }
}

export const animalService = new AnimalService();
