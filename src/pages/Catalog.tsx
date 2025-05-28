import { useState } from "react";
import Header from "@/components/layout/Header";
import PetCard, { PetInfo } from "@/components/home/PetCard";
import CatalogFilters from "@/components/catalog/CatalogFilters";
import EmptyState from "@/components/catalog/EmptyState";
import { mockPets } from "@/data/mockPets";

const Catalog = () => {
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
        <CatalogFilters
          typeFilter={typeFilter}
          genderFilter={genderFilter}
          statusFilter={statusFilter}
          sortBy={sortBy}
          onTypeChange={setTypeFilter}
          onGenderChange={setGenderFilter}
          onStatusChange={setStatusFilter}
          onSortChange={setSortBy}
          onReset={resetFilters}
        />

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
          <EmptyState onReset={resetFilters} />
        )}
      </main>
    </div>
  );
};

export default Catalog;
