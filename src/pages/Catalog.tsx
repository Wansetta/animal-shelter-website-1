import { useState } from "react";
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

// Расширенные моковые данные
const mockPets: PetInfo[] = [
  {
    id: "1",
    name: "Барон",
    type: "dog",
    breed: "Немецкая овчарка",
    age: "3 года",
    gender: "male",
    description:
      "Дружелюбный и активный пес, любит играть с мячом и обожает долгие прогулки.",
    image: "https://images.unsplash.com/photo-1551717743-49959800b1f6",
    status: "available",
  },
  {
    id: "2",
    name: "Муся",
    type: "cat",
    breed: "Сибирская",
    age: "2 года",
    gender: "female",
    description:
      "Спокойная и ласковая кошка. Любит сидеть на коленях и мурлыкать.",
    image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce",
    status: "available",
  },
  {
    id: "3",
    name: "Рекс",
    type: "dog",
    breed: "Дворняжка",
    age: "5 лет",
    gender: "male",
    description: "Верный и преданный пес. Отлично подойдет для охраны дома.",
    image: "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80",
    status: "reserved",
  },
  {
    id: "4",
    name: "Лиза",
    type: "cat",
    breed: "Британская короткошерстная",
    age: "1 год",
    gender: "female",
    description: "Игривая молодая кошка, любит внимание и ласку.",
    image: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e",
    status: "available",
  },
  {
    id: "5",
    name: "Бобик",
    type: "dog",
    breed: "Лабрадор",
    age: "2 года",
    gender: "male",
    description: "Энергичный и дружелюбный лабрадор, обожает плавать.",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d",
    status: "available",
  },
  {
    id: "6",
    name: "Маня",
    type: "cat",
    breed: "Мейн-кун",
    age: "4 года",
    gender: "female",
    description: "Крупная и пушистая кошка с мягким характером.",
    image: "https://images.unsplash.com/photo-1571566882372-1598d88abd90",
    status: "adopted",
  },
];

const Catalog = () => {
  const [pets, setPets] = useState<PetInfo[]>(mockPets);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");

  // Функция фильтрации и сортировки
  const getFilteredAndSortedPets = () => {
    let filtered = mockPets.filter((pet) => {
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
        case "breed":
          return a.breed.localeCompare(b.breed);
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
                <SelectItem value="adopted">Нашел дом</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">По имени</SelectItem>
                <SelectItem value="age">По возрасту</SelectItem>
                <SelectItem value="breed">По породе</SelectItem>
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
              <PetCard key={pet.id} pet={pet} />
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
