import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface EmptyStateProps {
  onReset: () => void;
}

const EmptyState = ({ onReset }: EmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <Icon name="Search" size={48} className="mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-600 mb-2">
        Питомцы не найдены
      </h3>
      <p className="text-gray-500 mb-6">
        Попробуйте изменить параметры фильтрации
      </p>
      <Button onClick={onReset}>Сбросить фильтры</Button>
    </div>
  );
};

export default EmptyState;
