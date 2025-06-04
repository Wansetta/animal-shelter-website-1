import { InMemoryDatabase, Animal, Guardian, Transfer } from "@/lib/database";
import animalsData from "@/data/animals.json";

class AnimalService {
  private db = new InMemoryDatabase();
  private initialized = false;

  async initialize() {
    if (this.initialized) return;

    // Загружаем данные из JSON
    for (const animalData of animalsData) {
      const animal: Animal = {
        id: animalData.id,
        name: animalData.name,
        type: animalData.type as "dog" | "cat" | "other",
        breed: animalData.breed,
        age: animalData.age,
        gender: animalData.gender as "male" | "female",
        description: animalData.description,
        image: animalData.image_url,
        status: animalData.status as "available" | "reserved" | "adopted",
        vaccination: animalData.vaccination,
        microchipped: animalData.microchipped,
        admission_date: animalData.admission_date,
        dateAdded: new Date().toISOString(),
      };
      this.db.createAnimal(animal);
    }

    this.initialized = true;
  }

  async getAllAnimals(): Promise<Animal[]> {
    await this.initialize();
    return this.db.getAllAnimals();
  }

  async getAnimalById(id: string): Promise<Animal | undefined> {
    await this.initialize();
    return this.db.getAnimalById(id);
  }

  async getAvailableAnimals(): Promise<Animal[]> {
    await this.initialize();
    return this.db.getAnimalsByStatus("available");
  }

  async getAnimalsByType(type: "dog" | "cat" | "other"): Promise<Animal[]> {
    await this.initialize();
    return this.db.getAnimalsByType(type);
  }

  async createGuardian(
    guardian: Omit<Guardian, "id" | "registrationDate">,
  ): Promise<Guardian> {
    await this.initialize();
    const newGuardian: Guardian = {
      ...guardian,
      id: Date.now().toString(),
      registrationDate: new Date().toISOString(),
    };
    return this.db.createGuardian(newGuardian);
  }

  async reserveAnimal(animalId: string, guardianId: string): Promise<void> {
    await this.initialize();
    this.db.updateAnimalStatus(animalId, "reserved");

    const transfer: Transfer = {
      id: Date.now().toString(),
      animalId,
      guardianId,
      transferDate: new Date().toISOString(),
      status: "pending",
    };
    this.db.createTransfer(transfer);
  }
}

export const animalService = new AnimalService();
