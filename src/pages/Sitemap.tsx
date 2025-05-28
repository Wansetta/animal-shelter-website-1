import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Icon from "@/components/ui/icon";

const Sitemap = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Карта сайта</h1>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="space-y-6">
              {/* Главная */}
              <div>
                <h2 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                  <Icon name="Home" size={20} />
                  Главная
                </h2>
                <ul className="ml-6 space-y-2">
                  <li>
                    <Link
                      to="/"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Главная страница
                    </Link>
                  </li>
                  <li>
                    <span className="text-gray-600 text-sm">
                      Поиск питомцев
                    </span>
                  </li>
                  <li>
                    <span className="text-gray-600 text-sm">
                      Истории успеха
                    </span>
                  </li>
                </ul>
              </div>

              {/* Каталог питомцев */}
              <div>
                <h2 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                  <Icon name="Heart" size={20} />
                  Каталог питомцев
                </h2>
                <ul className="ml-6 space-y-2">
                  <li>
                    <Link
                      to="/catalog"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Все питомцы
                    </Link>
                  </li>
                  <li>
                    <span className="text-gray-600 text-sm">
                      Фильтры поиска
                    </span>
                  </li>
                  <li>
                    <span className="text-gray-600 text-sm">
                      Детальная информация
                    </span>
                  </li>
                </ul>
              </div>

              {/* О проекте */}
              <div>
                <h2 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                  <Icon name="Info" size={20} />О проекте
                </h2>
                <ul className="ml-6 space-y-2">
                  <li>
                    <Link
                      to="/about"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Наша миссия
                    </Link>
                  </li>
                  <li>
                    <span className="text-gray-600 text-sm">
                      Как мы помогаем
                    </span>
                  </li>
                  <li>
                    <span className="text-gray-600 text-sm">
                      Команда проекта
                    </span>
                  </li>
                </ul>
              </div>

              {/* Нашёл питомца */}
              <div>
                <h2 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                  <Icon name="MapPin" size={20} />
                  Нашёл питомца
                </h2>
                <ul className="ml-6 space-y-2">
                  <li>
                    <Link
                      to="/found-pet"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Сообщить о находке
                    </Link>
                  </li>
                  <li>
                    <span className="text-gray-600 text-sm">Форма с фото</span>
                  </li>
                  <li>
                    <span className="text-gray-600 text-sm">
                      Указание местоположения
                    </span>
                  </li>
                </ul>
              </div>

              {/* Поддержка */}
              <div>
                <h2 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                  <Icon name="HandHeart" size={20} />
                  Поддержка
                </h2>
                <ul className="ml-6 space-y-2">
                  <li>
                    <Link
                      to="/support"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Связаться с нами
                    </Link>
                  </li>
                  <li>
                    <span className="text-gray-600 text-sm">
                      Часто задаваемые вопросы
                    </span>
                  </li>
                  <li>
                    <span className="text-gray-600 text-sm">
                      Помощь проекту
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
            >
              <Icon name="ArrowLeft" size={16} />
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
