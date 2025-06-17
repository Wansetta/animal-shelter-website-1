import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, MapPin, Upload } from "lucide-react";
import MapSelector from "@/components/MapSelector";
import { emailService } from "@/services/emailService";

const FoundPet = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null);
  const [addressValue, setAddressValue] = useState("");

  // Обработчик сообщений от iframe карты
  const handleMapMessage = (event: MessageEvent) => {
    if (event.origin !== "https://yandex.ru") return;

    if (event.data && event.data.address) {
      setAddressValue(event.data.address);
      setSelectedLocation({
        lat: event.data.lat || 0,
        lng: event.data.lng || 0,
        address: event.data.address,
      });
    }
  };

  // Подписка на сообщения от карты
  React.useEffect(() => {
    window.addEventListener("message", handleMapMessage);
    return () => window.removeEventListener("message", handleMapMessage);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const success = await emailService.sendFoundPetReport({
        userName: formData.get("name") as string,
        userPhone: formData.get("phone") as string,
        userEmail: (formData.get("email") as string) || undefined,
        location: addressValue,
        petType: formData.get("petType") as string,
        petAge: (formData.get("petAge") as string) || undefined,
        description: formData.get("description") as string,
        additionalInfo: (formData.get("additionalInfo") as string) || undefined,
      });

      if (success) {
        setFormSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        alert("Произошла ошибка при отправке сообщения. Попробуйте еще раз.");
      }
    } catch (error) {
      console.error("Ошибка отправки сообщения:", error);
      alert("Произошла ошибка при отправке сообщения. Попробуйте еще раз.");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="page-title text-center">Нашли питомца?</h1>

          {formSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 rounded-full p-2">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-green-800">
                  Спасибо за вашу заботу!
                </h2>
              </div>
              <p className="text-green-700 mb-4">
                Ваше сообщение о найденном животном успешно отправлено. Наш
                сотрудник свяжется с вами в ближайшее время.
              </p>
              <Button
                onClick={() => setFormSubmitted(false)}
                className="bg-green-600 hover:bg-green-700"
              >
                Отправить еще сообщение
              </Button>
            </div>
          ) : (
            <>
              <p className="text-center text-lg text-gray-700 mb-8">
                Если вы нашли бездомное или потерявшееся животное, пожалуйста,
                заполните форму ниже. Мы постараемся помочь животному и,
                возможно, найти его хозяев.
              </p>

              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ваше имя *
                      </label>
                      <Input name="name" required placeholder="Иван Иванов" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Телефон *
                      </label>
                      <Input
                        name="phone"
                        required
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Адрес электронной почты
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="example@mail.ru"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Где вы нашли животное? *
                    </label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        required
                        placeholder="Укажите адрес или район"
                        className="flex-grow"
                        value={addressValue}
                        onChange={(e) => setAddressValue(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => {
                          const mapFrame = document.getElementById(
                            "yandex-map",
                          ) as HTMLIFrameElement;
                          if (mapFrame) {
                            mapFrame.focus();
                          }
                        }}
                      >
                        <MapPin size={16} /> Указать на карте
                      </Button>
                    </div>
                    <div className="rounded-md overflow-hidden shadow-sm">
                      <iframe
                        id="yandex-map"
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3A0859f700c79c518b5f770a711324b7bc66bd004cd68a87231b197b440b8f6a1d&amp;source=constructor"
                        width="100%"
                        height="526"
                        frameBorder="0"
                        title="Карта для указания места находки питомца"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Тип животного *
                      </label>
                      <select
                        name="petType"
                        required
                        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Выберите тип</option>
                        <option value="Собака">Собака</option>
                        <option value="Кошка">Кошка</option>
                        <option value="Другое животное">Другое животное</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Примерный возраст
                      </label>
                      <select
                        name="petAge"
                        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Выберите возраст</option>
                        <option value="Детеныш">Детеныш</option>
                        <option value="Молодое животное">
                          Молодое животное
                        </option>
                        <option value="Взрослое животное">
                          Взрослое животное
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Описание животного *
                    </label>
                    <Textarea
                      required
                      name="description"
                      placeholder="Опишите внешний вид животного (окрас, размер, особые приметы и т.д.)"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Фотографии животного
                    </label>
                    <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">
                        Перетащите фотографии сюда или нажмите, чтобы выбрать
                        файлы
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        JPG, PNG или GIF. Максимум 5 файлов по 5 МБ каждый.
                      </p>
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/*"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Дополнительная информация
                    </label>
                    <Textarea
                      name="additionalInfo"
                      placeholder="Укажите любую дополнительную информацию, которая может быть полезна (состояние животного, поведение и т.д.)"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      className="bg-primary hover:bg-primary-light px-8 py-2"
                    >
                      Отправить сообщение
                    </Button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FoundPet;
