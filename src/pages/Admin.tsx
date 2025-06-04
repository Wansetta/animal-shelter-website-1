import { useState } from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import PetEditModal from "@/components/admin/PetEditModal";

const Admin = () => {
  const [isPetEditModalOpen, setIsPetEditModalOpen] = useState(false);

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

        {/* Быстрые действия */}
        <Card>
          <CardHeader>
            <CardTitle>Быстрые действия</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-16 flex flex-col gap-2">
                <Icon name="Plus" size={20} />
                Добавить питомца
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-2">
                <Icon name="Mail" size={20} />
                Просмотреть заявки
              </Button>
              <Button
                variant="outline"
                className="h-16 flex flex-col gap-2"
                onClick={() => setIsPetEditModalOpen(true)}
              >
                <Icon name="Edit" size={20} />
                Редактирование каталога
              </Button>
            </div>
          </CardContent>
        </Card>

        <PetEditModal
          isOpen={isPetEditModalOpen}
          onClose={() => setIsPetEditModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Admin;
