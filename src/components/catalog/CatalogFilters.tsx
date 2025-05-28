import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface CatalogFiltersProps {
  typeFilter: string;
  genderFilter: string;
  statusFilter: string;
  sortBy: string;
  onTypeChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onReset: () => void;
}

const CatalogFilters = ({
  typeFilter,
  genderFilter,
  statusFilter,
  sortBy,
  onTypeChange,
  onGenderChange,
  onStatusChange,
  onSortChange,
  onReset,
}: CatalogFiltersProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Icon name="Filter" size={20} />
          <span className="font-medium">Фильтры:</span>
        </div>

        <Select value={typeFilter} onValueChange={onTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Тип животного" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все животные</SelectItem>
            <SelectItem value="dog">Собаки</SelectItem>
            <SelectItem value="cat">Кошки</SelectItem>
          </SelectContent>
        </Select>

        <Select value={genderFilter} onValueChange={onGenderChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Пол" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Любой пол</SelectItem>
            <SelectItem value="male">Мальчик</SelectItem>
            <SelectItem value="female">Девочка</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Любой статус</SelectItem>
            <SelectItem value="available">Ищет дом</SelectItem>
            <SelectItem value="reserved">Зарезервирован</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Сортировка" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">По имени</SelectItem>
            <SelectItem value="age">По возрасту</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={onReset} className="ml-auto">
          <Icon name="RotateCcw" size={16} className="mr-2" />
          Сбросить
        </Button>
      </div>
    </div>
  );
};

export default CatalogFilters;
