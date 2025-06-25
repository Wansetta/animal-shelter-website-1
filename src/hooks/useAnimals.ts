import { useState, useEffect } from "react";
import { Animal, animalService } from "@/services/animalService";

export const useAnimals = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAnimals = async () => {
    try {
      setLoading(true);
      const data = await animalService.getAllAnimals();
      setAnimals(data);
    } catch (error) {
      console.error("Ошибка загрузки животных:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnimals();

    // Подписываемся на изменения
    const unsubscribe = animalService.subscribe(() => {
      loadAnimals();
    });

    return unsubscribe;
  }, []);

  return { animals, loading, refresh: loadAnimals };
};
