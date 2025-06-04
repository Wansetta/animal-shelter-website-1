import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PetCard, { PetInfo } from "./PetCard";
import { animalService } from "@/services/animalService";

const PetsSection = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | "dog" | "cat">(
    "all",
  );
  const [pets, setPets] = useState<PetInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      try {
        const animals = await animalService.getAllAnimals();
        const petInfo: PetInfo[] = animals.map((animal) => ({
          id: animal.id,
          name: animal.name,
          type: animal.type,
          breed: animal.breed,
          age: animal.age,
          gender: animal.gender,
          description: animal.description,
          image: animal.image,
          status: animal.status,
        }));
        setPets(petInfo);
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  // Фильтруем питомцев по типу
  const filteredPets =
    activeFilter === "all"
      ? pets
      : pets.filter((pet) => pet.type === activeFilter);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="section-title text-center">Наши питомцы ищут дом</h2>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Загружаем питомцев...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="section-title text-center">Наши питомцы ищут дом</h2>

        {/* Фильтры */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-full ${
              activeFilter === "all"
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } transition-colors`}
          >
            Все питомцы
          </button>
          <button
            onClick={() => setActiveFilter("dog")}
            className={`px-4 py-2 rounded-full ${
              activeFilter === "dog"
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } transition-colors`}
          >
            Собаки
          </button>
          <button
            onClick={() => setActiveFilter("cat")}
            className={`px-4 py-2 rounded-full ${
              activeFilter === "cat"
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } transition-colors`}
          >
            Кошки
          </button>
        </div>

        {/* Карточки питомцев */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>

        {/* Убираем кнопку "Смотреть всех" - теперь показываем всех питомцев */}
        <div className="text-center mt-10">
          <Link to="/catalog" className="btn-primary">
            Смотреть всех питомцев
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PetsSection;
