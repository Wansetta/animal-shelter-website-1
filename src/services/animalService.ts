import { supabase } from "@/lib/supabase";

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
    try {
      const { data, error } = await supabase
        .from("animals")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching animals:", error);
        return [];
      }

      return (
        data?.map((animal) => ({
          id: animal.id,
          name: animal.name,
          type: animal.type,
          breed: animal.breed,
          age: animal.age,
          gender: animal.gender,
          description: animal.description,
          image: animal.image_url || animal.image,
          status: animal.status,
          vaccination: animal.vaccination,
          microchipped: animal.microchipped,
          admission_date: animal.admission_date,
          dateAdded: animal.created_at || new Date().toISOString(),
        })) || []
      );
    } catch (error) {
      console.error("Error in getAllAnimals:", error);
      return [];
    }
  }

  async getAnimalById(id: string): Promise<Animal | undefined> {
    try {
      const { data, error } = await supabase
        .from("animals")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching animal by id:", error);
        return undefined;
      }

      if (!data) return undefined;

      return {
        id: data.id,
        name: data.name,
        type: data.type,
        breed: data.breed,
        age: data.age,
        gender: data.gender,
        description: data.description,
        image: data.image_url || data.image,
        status: data.status,
        vaccination: data.vaccination,
        microchipped: data.microchipped,
        admission_date: data.admission_date,
        dateAdded: data.created_at || new Date().toISOString(),
      };
    } catch (error) {
      console.error("Error in getAnimalById:", error);
      return undefined;
    }
  }

  async getAvailableAnimals(): Promise<Animal[]> {
    try {
      const { data, error } = await supabase
        .from("animals")
        .select("*")
        .eq("status", "available")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching available animals:", error);
        return [];
      }

      return (
        data?.map((animal) => ({
          id: animal.id,
          name: animal.name,
          type: animal.type,
          breed: animal.breed,
          age: animal.age,
          gender: animal.gender,
          description: animal.description,
          image: animal.image_url || animal.image,
          status: animal.status,
          vaccination: animal.vaccination,
          microchipped: animal.microchipped,
          admission_date: animal.admission_date,
          dateAdded: animal.created_at || new Date().toISOString(),
        })) || []
      );
    } catch (error) {
      console.error("Error in getAvailableAnimals:", error);
      return [];
    }
  }

  async getAnimalsByType(type: "dog" | "cat" | "other"): Promise<Animal[]> {
    try {
      const { data, error } = await supabase
        .from("animals")
        .select("*")
        .eq("type", type)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching animals by type:", error);
        return [];
      }

      return (
        data?.map((animal) => ({
          id: animal.id,
          name: animal.name,
          type: animal.type,
          breed: animal.breed,
          age: animal.age,
          gender: animal.gender,
          description: animal.description,
          image: animal.image_url || animal.image,
          status: animal.status,
          vaccination: animal.vaccination,
          microchipped: animal.microchipped,
          admission_date: animal.admission_date,
          dateAdded: animal.created_at || new Date().toISOString(),
        })) || []
      );
    } catch (error) {
      console.error("Error in getAnimalsByType:", error);
      return [];
    }
  }
}

export const animalService = new AnimalService();
