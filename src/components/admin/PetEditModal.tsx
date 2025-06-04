import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Animal } from "@/lib/database";
import { animalService } from "@/services/animalService";

interface PetEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PetEditModal = ({ isOpen, onClose }: PetEditModalProps) => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    description: "",
    vaccination: false,
    microchipped: false,
    admission_date: "",
    status: "available" as const,
  });

  useEffect(() => {
    if (isOpen) {
      loadAnimals();
    }
  }, [isOpen]);

  const loadAnimals = async () => {
    try {
      const data = await animalService.getAllAnimals();
      setAnimals(data);
    } catch (error) {
      console.error("Ошибка загрузки животных:", error);
    }
  };

  const selectAnimal = (animal: Animal) => {
    setSelectedAnimal(animal);
    setFormData({
      name: animal.name,
      breed: animal.breed,
      age: animal.age,
      description: animal.description || "",
      vaccination: animal.vaccination,
      microchipped: animal.microchipped,
      admission_date: animal.admission_date,
      status: animal.status,
    });
  };

  const handleSave = () => {
    // Здесь будет логика сохранения данных
    console.log("Сохранение данных:", formData);
    setSelectedAnimal(null);
  };

  const handleCancel = () => {
    setSelectedAnimal(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Редактирование каталога питомцев</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Список питомцев */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Выберите питомца</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {animals.map((animal) => (
                <Card
                  key={animal.id}
                  className={`cursor-pointer transition-colors ${
                    selectedAnimal?.id === animal.id
                      ? "bg-blue-50 border-blue-300"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => selectAnimal(animal)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Icon name="Heart" size={16} className="text-blue-600" />
                      <div>
                        <p className="font-medium">{animal.name}</p>
                        <p className="text-sm text-gray-600">
                          {animal.breed} • {animal.age}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Форма редактирования */}
          <div>
            {selectedAnimal ? (
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Редактирование: {selectedAnimal.name}
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="breed">Порода</Label>
                    <Input
                      id="breed"
                      value={formData.breed}
                      onChange={(e) =>
                        setFormData({ ...formData, breed: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="age">Возраст</Label>
                    <Input
                      id="age"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="admission_date">Дата поступления</Label>
                    <Input
                      id="admission_date"
                      type="date"
                      value={formData.admission_date}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          admission_date: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="status">Статус</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        setFormData({ ...formData, status: value as any })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Доступен</SelectItem>
                        <SelectItem value="reserved">Зарезервирован</SelectItem>
                        <SelectItem value="adopted">Пристроен</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="vaccination"
                        checked={formData.vaccination}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, vaccination: !!checked })
                        }
                      />
                      <Label htmlFor="vaccination">Вакцинирован</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="microchipped"
                        checked={formData.microchipped}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, microchipped: !!checked })
                        }
                      />
                      <Label htmlFor="microchipped">Чипирован</Label>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSave}>Сохранить</Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Отмена
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <Icon
                  name="Edit"
                  size={48}
                  className="mx-auto mb-4 text-gray-400"
                />
                <p>Выберите питомца для редактирования</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PetEditModal;
