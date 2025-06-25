import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export interface PetInfo {
  id: string;
  name: string;
  type: "dog" | "cat" | "other";
  breed: string;
  age: string;
  gender: "male" | "female";
  description: string;
  image: string;
  status: "available" | "reserved";
  vaccination: boolean;
  microchipped: boolean;
  admission_date: string;
}

interface PetCardProps {
  pet: PetInfo;
}

const PetCard = ({ pet }: PetCardProps) => {
  // Определяем цвет статуса
  const statusColors = {
    available: "bg-green-100 text-green-800",
    reserved: "bg-yellow-100 text-yellow-800",
  };

  // Переводим статус на русский
  const statusText = {
    available: "Ищет дом",
    reserved: "Зарезервирован",
  };

  // Переводим тип животного на русский
  const petType = {
    dog: "Собака",
    cat: "Кошка",
    other: "Другое животное",
  };

  // Переводим пол животного на русский
  const genderText = {
    male: "Мальчик",
    female: "Девочка",
  };

  return (
    <div className="pet-card group">
      <div className="relative overflow-hidden">
        <img
          src={pet.image}
          alt={`${pet.name} - ${petType[pet.type]}`}
          className="pet-card-image group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <Badge className={`${statusColors[pet.status]}`}>
            {statusText[pet.status]}
          </Badge>
        </div>
      </div>

      <div className="pet-card-content">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold">{pet.name}</h3>
          <span className="text-sm text-gray-600">{petType[pet.type]}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-sm bg-gray-100 px-2 py-1 rounded-md">
            {pet.breed}
          </span>
          <span className="text-sm bg-gray-100 px-2 py-1 rounded-md">
            {pet.age}
          </span>
          <span className="text-sm bg-gray-100 px-2 py-1 rounded-md">
            {genderText[pet.gender]}
          </span>
        </div>

        <p className="text-gray-700 mb-4 line-clamp-2">{pet.description}</p>

        <div
          className="text-xs flex items-center gap-3 mt-2"
          style={{ display: "none" }}
        >
          <Badge
            className={
              pet.vaccination
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }
          >
            {pet.vaccination ? "💉 Привит" : "💉 Не привит"}
          </Badge>
          <Badge
            className={
              pet.microchipped
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-600"
            }
          >
            {pet.microchipped ? "🔗 Чипирован" : "🔗 Не чипирован"}
          </Badge>
        </div>

        <Link
          to={`/pet/${pet.id}`}
          className="block text-center bg-primary text-white hover:bg-primary-light py-2 rounded-md transition-colors"
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
};

export default PetCard;
