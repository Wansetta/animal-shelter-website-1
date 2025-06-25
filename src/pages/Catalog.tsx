import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import PetCard, { PetInfo } from "@/components/home/PetCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useAnimals } from "@/hooks/useAnimals";

const Catalog = () => {
  const { animals: pets, loading } = useAnimals();
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");

  // Функция фильтрации и сортировки
  const getFilteredAndSortedPets = () => {
    let filtered = pets.filter((pet) => {
      if (typeFilter !== "all" && pet.type !== typeFilter) return false;
      if (genderFilter !== "all" && pet.gender !== genderFilter) return false;
      if (statusFilter !== "all" && pet.status !== statusFilter) return false;
      return true;
    });

    // Сортировка
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "age":
          return parseInt(a.age) - parseInt(b.age);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredPets = getFilteredAndSortedPets();

  const resetFilters = () => {
    setTypeFilter("all");
    setGenderFilter("all");
    setStatusFilter("all");
    setSortBy("name");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Icon
              name="Loader2"
              size={48}
              className="animate-spin mx-auto mb-4 text-gray-400"
            />
            <p className="text-gray-600">Загрузка питомцев...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Каталог питомцев
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Найдите своего идеального компаньона среди наших замечательных
            питомцев
          </p>
        </div>

        {/* Фильтры */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Icon name="Filter" size={20} />
              <span className="font-medium">Фильтры:</span>
            </div>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Тип животного" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все животные</SelectItem>
                <SelectItem value="dog">Собаки</SelectItem>
                <SelectItem value="cat">Кошки</SelectItem>
              </SelectContent>
            </Select>

            <Select value={genderFilter} onValueChange={setGenderFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Пол" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Любой пол</SelectItem>
                <SelectItem value="male">Мальчик</SelectItem>
                <SelectItem value="female">Девочка</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Любой статус</SelectItem>
                <SelectItem value="available">Ищет дом</SelectItem>
                <SelectItem value="reserved">Зарезервирован</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">По имени</SelectItem>
                <SelectItem value="age">По возрасту</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={resetFilters}
              className="ml-auto"
            >
              <Icon name="RotateCcw" size={16} className="mr-2" />
              Сбросить
            </Button>
          </div>
        </div>

        {/* Результаты */}
        <div className="mb-6">
          <p className="text-gray-600">
            Найдено питомцев:{" "}
            <span className="font-semibold">{filteredPets.length}</span>
          </p>
        </div>

        {/* Сетка питомцев */}
        {filteredPets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={{
                  id: pet.id,
                  name: pet.name,
                  type: pet.type,
                  breed: pet.breed,
                  age: pet.age,
                  gender: pet.gender,
                  description: pet.description || "",
                  image: pet.image,
                  status: pet.status,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon
              name="Search"
              size={48}
              className="mx-auto text-gray-400 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Питомцы не найдены
            </h3>
            <p className="text-gray-500 mb-6">
              Попробуйте изменить параметры фильтрации
            </p>
            <Button onClick={resetFilters}>Сбросить фильтры</Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Catalog;
