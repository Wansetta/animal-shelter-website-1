import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { emailService } from "@/services/emailService";
import { animalService } from "@/services/animalService";
import { useToast } from "@/hooks/use-toast";

interface GuardianFormProps {
  animalId: string;
  animalName: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const GuardianForm = ({
  animalId,
  animalName,
  onSuccess,
  onCancel,
}: GuardianFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    experience: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Отправляем email с данными заявки
      const emailSent = await emailService.sendGuardianApplication({
        petName: animalName,
        petId: animalId,
        userName: formData.name,
        userPhone: formData.phone,
        userEmail: formData.email,
        address: formData.address,
        experience: formData.experience,
        message: formData.message,
      });

      if (emailSent) {
        // Создаем опекуна в системе
        const guardian = await animalService.createGuardian({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          experience: formData.experience,
        });

        await animalService.reserveAnimal(animalId, guardian.id);

        toast({
          title: "Заявка отправлена!",
          description:
            "Мы получили вашу заявку и свяжемся с вами в ближайшее время.",
          duration: 5000,
        });
        onSuccess();
      } else {
        toast({
          title: "Ошибка отправки",
          description: "Откроется почтовый клиент для ручной отправки.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Ошибка отправки заявки:", error);
      toast({
        title: "Произошла ошибка",
        description: "Попробуйте еще раз или свяжитесь с нами по телефону.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-2xl font-bold mb-6">
        Заявка на опекунство - {animalName}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Ваше имя *</label>
          <Input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Введите ваше полное имя"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Телефон *</label>
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
          <label className="block text-sm font-medium mb-2">Email *</label>
          <Input
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Адрес *</label>
          <Input
            type="text"
            required
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            placeholder="Город, улица, дом"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Опыт содержания животных
          </label>
          <Textarea
            value={formData.experience}
            onChange={(e) =>
              setFormData({ ...formData, experience: e.target.value })
            }
            placeholder="Расскажите о вашем опыте с животными..."
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Дополнительная информация
          </label>
          <Textarea
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            placeholder="Расскажите о себе и условиях содержания питомца..."
            rows={4}
          />
        </div>

        <div className="flex gap-3">
          <Button type="submit" className="flex-1" disabled={submitting}>
            {submitting ? "Отправляем..." : "Отправить заявку"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={submitting}
          >
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GuardianForm;
