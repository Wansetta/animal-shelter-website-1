import { useState } from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Admin = () => {
  const [stats] = useState({
    totalPets: 42,
    adoptedThisMonth: 8,
    pendingApplications: 15,
    volunteers: 23,
  });

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

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Питомцы"
            value={stats.totalPets}
            icon="Heart"
            color="text-blue-600"
          />
          <StatCard
            title="Пристроено за месяц"
            value={stats.adoptedThisMonth}
            icon="Home"
            color="text-green-600"
          />
          <StatCard
            title="Заявки на рассмотрении"
            value={stats.pendingApplications}
            icon="FileText"
            color="text-orange-600"
          />
          <StatCard
            title="Волонтёры"
            value={stats.volunteers}
            icon="Users"
            color="text-purple-600"
          />
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
              <Button variant="outline" className="h-16 flex flex-col gap-2">
                <Icon name="Settings" size={20} />
                Настройки сайта
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  color: string;
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
          <Icon name={icon} size={24} className={color} />
        </div>
      </CardContent>
    </Card>
  );
};

export default Admin;
