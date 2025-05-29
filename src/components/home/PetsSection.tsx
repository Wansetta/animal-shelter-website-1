import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PetCard from "./PetCard";
import { animalService } from "@/services/animalService";
import { Animal } from "@/lib/database";

const PetsSection = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"all" | "dog" | "cat">(
    "all",
  );

  useEffect(() => {
    const loadAnimals = async () => {
      try {
        const data = await animalService.getAllAnimals();
        setAnimals(data);
      } catch (error) {
        console.error("Ошибка загрузки животных:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAnimals();
  }, []);

  // Фильтруем питомцев по типу
  const filteredAnimals =
    activeFilter === "all"
      ? animals
      : animals.filter((animal) => animal.type === activeFilter);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <p>Загрузка питомцев...</p>
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
          {filteredAnimals.map((animal) => (
            <PetCard key={animal.id} pet={animal} />
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
