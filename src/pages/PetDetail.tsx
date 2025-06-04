import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Heart, Calendar, User } from "lucide-react";
import { PetInfo } from "@/components/home/PetCard";
import { animalService } from "@/services/animalService";

const PetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pet, setPet] = useState<PetInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const fetchPet = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const animal = await animalService.getAnimalById(id);
        if (animal) {
          const petInfo: PetInfo = {
            id: animal.id,
            name: animal.name,
            type: animal.type,
            breed: animal.breed,
            age: animal.age,
            gender: animal.gender,
            description: animal.description,
            image: animal.image,
            status: animal.status,
          };
          setPet(petInfo);
        }
      } catch (error) {
        console.error("Error fetching pet:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
    setShowForm(false);
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!pet) {
    return (
      <Layout>
        <div className="container mx-auto py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Питомец не найден</h1>
          <Button onClick={() => navigate("/")}>Вернуться на главную</Button>
        </div>
      </Layout>
    );
  }

  const statusColors = {
    available: "bg-green-100 text-green-800",
    reserved: "bg-yellow-100 text-yellow-800",
  };

  const statusText = {
    available: "Ищет дом",
    reserved: "Зарезервирован",
  };

  const petType = {
    dog: "Собака",
    cat: "Кошка",
    other: "Другое животное",
  };

  const genderText = {
    male: "Мальчик",
    female: "Девочка",
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад к питомцам
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Фото питомца */}
          <div className="relative">
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
            />
            <div className="absolute top-4 right-4">
              <Badge className={statusColors[pet.status]}>
                {statusText[pet.status]}
              </Badge>
            </div>
          </div>

          {/* Информация о питомце */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{pet.name}</h1>

            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md">
                <span className="font-medium">{petType[pet.type]}</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md">
                <Calendar className="h-4 w-4" />
                <span>{pet.age}</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md">
                <User className="h-4 w-4" />
                <span>{genderText[pet.gender]}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Порода</h3>
              <p className="text-gray-700">{pet.breed}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">Описание</h3>
              <p className="text-gray-700 leading-relaxed">{pet.description}</p>
            </div>

            {pet.status === "available" && !showForm && (
              <Button
                onClick={() => setShowForm(true)}
                className="w-full"
                size="lg"
              >
                <Heart className="mr-2 h-5 w-5" />
                Подать заявку
              </Button>
            )}

            {pet.status === "reserved" && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">
                  Этот питомец уже зарезервирован.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Форма заявки */}
        {showForm && (
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-2xl font-bold mb-6">Заявка на {pet.name}</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ваше имя *
                  </label>
                  <Input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Введите ваше имя"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Телефон *
                  </label>
                  <Input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Сообщение
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Расскажите о себе..."
                    rows={4}
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="submit" className="flex-1">
                    Отправить заявку
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    Отмена
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PetDetail;
