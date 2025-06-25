import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { Animal, animalService } from "@/services/animalService";

const Admin = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAnimalData, setNewAnimalData] = useState({
    name: "",
    type: "dog" as "dog" | "cat" | "other",
    breed: "",
    age: "",
    gender: "male" as "male" | "female",
    description: "",
    image: "",
    vaccination: false,
    microchipped: false,
    admission_date: "",
  });
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
    loadAnimals();
  }, []);

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
    console.log("Сохранение данных:", formData);
    setSelectedAnimal(null);
  };

  const handleCancel = () => {
    setSelectedAnimal(null);
  };

  const handleAddAnimal = () => {
    // Генерируем новый ID
    const newId = Date.now().toString();
    const newAnimal: Animal = {
      ...newAnimalData,
      id: newId,
      status: "available",
      dateAdded: new Date().toISOString(),
    };

    setAnimals([...animals, newAnimal]);
    setNewAnimalData({
      name: "",
      type: "dog",
      breed: "",
      age: "",
      gender: "male",
      description: "",
      image: "",
      vaccination: false,
      microchipped: false,
      admission_date: "",
    });
    setIsAddDialogOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setNewAnimalData({ ...newAnimalData, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Панель администратора
          </h1>
          <p className="text-gray-600">Управление приютом "Преданность"</p>
        </div>

        {/* Быстрые действия - удаляем секцию */}

        {/* Редактирование каталога */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Список питомцев */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Каталог питомцев</CardTitle>
                <Dialog
                  open={isAddDialogOpen}
                  onOpenChange={setIsAddDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Icon name="Plus" size={16} />
                      Добавить питомца
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Добавить нового питомца</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Имя</Label>
                          <Input
                            id="name"
                            value={newAnimalData.name}
                            onChange={(e) =>
                              setNewAnimalData({
                                ...newAnimalData,
                                name: e.target.value,
                              })
                            }
                            placeholder="Имя питомца"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="type">Тип</Label>
                          <Select
                            value={newAnimalData.type}
                            onValueChange={(value: "dog" | "cat" | "other") =>
                              setNewAnimalData({
                                ...newAnimalData,
                                type: value,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите тип" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dog">Собака</SelectItem>
                              <SelectItem value="cat">Кошка</SelectItem>
                              <SelectItem value="other">Другое</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="breed">Порода</Label>
                          <Input
                            id="breed"
                            value={newAnimalData.breed}
                            onChange={(e) =>
                              setNewAnimalData({
                                ...newAnimalData,
                                breed: e.target.value,
                              })
                            }
                            placeholder="Порода"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="age">Возраст</Label>
                          <Input
                            id="age"
                            value={newAnimalData.age}
                            onChange={(e) =>
                              setNewAnimalData({
                                ...newAnimalData,
                                age: e.target.value,
                              })
                            }
                            placeholder="Возраст"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="gender">Пол</Label>
                          <Select
                            value={newAnimalData.gender}
                            onValueChange={(value: "male" | "female") =>
                              setNewAnimalData({
                                ...newAnimalData,
                                gender: value,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите пол" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Мужской</SelectItem>
                              <SelectItem value="female">Женский</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="admission_date">
                            Дата поступления
                          </Label>
                          <Input
                            id="admission_date"
                            type="date"
                            value={newAnimalData.admission_date}
                            onChange={(e) =>
                              setNewAnimalData({
                                ...newAnimalData,
                                admission_date: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Описание</Label>
                        <Textarea
                          id="description"
                          value={newAnimalData.description}
                          onChange={(e) =>
                            setNewAnimalData({
                              ...newAnimalData,
                              description: e.target.value,
                            })
                          }
                          placeholder="Описание питомца"
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="image">Фото питомца</Label>
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="cursor-pointer"
                        />
                        {newAnimalData.image && (
                          <div className="mt-2">
                            <img
                              src={newAnimalData.image}
                              alt="Предпросмотр"
                              className="w-32 h-32 object-cover rounded-lg border"
                            />
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="vaccination"
                            checked={newAnimalData.vaccination}
                            onCheckedChange={(checked) =>
                              setNewAnimalData({
                                ...newAnimalData,
                                vaccination: checked as boolean,
                              })
                            }
                          />
                          <Label htmlFor="vaccination">Вакцинирован</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="microchipped"
                            checked={newAnimalData.microchipped}
                            onCheckedChange={(checked) =>
                              setNewAnimalData({
                                ...newAnimalData,
                                microchipped: checked as boolean,
                              })
                            }
                          />
                          <Label htmlFor="microchipped">Чипирован</Label>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button onClick={handleAddAnimal} className="flex-1">
                          Добавить питомца
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsAddDialogOpen(false)}
                          className="flex-1"
                        >
                          Отмена
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
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
                        <Icon
                          name="Heart"
                          size={16}
                          className="text-blue-600"
                        />
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
            </CardContent>
          </Card>

          {/* Форма редактирования */}
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedAnimal
                  ? `Редактирование: ${selectedAnimal.name}`
                  : "Редактирование питомца"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedAnimal ? (
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
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                          <Icon name="Trash2" size={16} className="mr-2" />
                          Удалить
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Подтвердите удаление
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Вы действительно хотите удалить питомца{" "}
                            {formData.name}? Это действие нельзя отменить.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Отмена</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              const updatedPets = pets.filter(
                                (p) => p.id !== selectedPet?.id,
                              );
                              setPets(updatedPets);
                              setSelectedPet(null);
                              setIsEditing(false);
                            }}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Удалить
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
