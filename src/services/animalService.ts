// Упрощенный сервис без базы данных
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

class AnimalService {
  async getAllAnimals(): Promise<Animal[]> {
    return animalsData.map((animal) => ({
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

  async getAnimalById(id: string): Promise<Animal | undefined> {
    const animals = await this.getAllAnimals();
    return animals.find((animal) => animal.id === id);
  }

  async getAvailableAnimals(): Promise<Animal[]> {
    const animals = await this.getAllAnimals();
    return animals.filter((animal) => animal.status === "available");
  }

  async getAnimalsByType(type: "dog" | "cat" | "other"): Promise<Animal[]> {
    const animals = await this.getAllAnimals();
    return animals.filter((animal) => animal.type === type);
  }
}

export const animalService = new AnimalService();
