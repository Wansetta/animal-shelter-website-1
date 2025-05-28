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
                      Новости
                    </Link>
                  </li>
                  <li>
                    <span className="text-gray-700">Профиль</span>
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>
                        <span className="text-gray-600 text-sm">
                          Личные сообщения
                        </span>
                      </li>
                      <li>
                        <span className="text-gray-600 text-sm">
                          Изменение анкеты
                        </span>
                      </li>
                      <li>
                        <span className="text-gray-600 text-sm">
                          Смена пароля для входа
                        </span>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span className="text-gray-600 text-sm">Мои подписки</span>
                  </li>
                </ul>
              </div>

              {/* Каталог */}
              <div>
                <h2 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                  <Icon name="Grid3X3" size={20} />
                  Каталог
                </h2>
                <ul className="ml-6 space-y-2">
                  <li>
                    <Link
                      to="/catalog"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Баннеры
                    </Link>
                  </li>
                  <li>
                    <span className="text-gray-700">Зоны</span>
                  </li>
                  <li>
                    <span className="text-gray-700">Компании</span>
                  </li>
                </ul>
              </div>

              {/* О нас */}
              <div>
                <h2 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                  <Icon name="Info" size={20} />О нас
                </h2>
                <ul className="ml-6 space-y-2">
                  <li>
                    <Link
                      to="/about"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Обмен купшами
                    </Link>
                  </li>
                  <li>
                    <span className="text-gray-700">Магазин</span>
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>
                        <span className="text-gray-600 text-sm">
                          Каталог товаров
                        </span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              {/* Нашел питомца */}
              <div>
                <h2 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                  <Icon name="Heart" size={20} />
                  Нашел питомца
                </h2>
                <ul className="ml-6 space-y-2">
                  <li>
                    <Link
                      to="/found-pet"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Карта сайта
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Поддержать нас */}
              <div>
                <h2 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                  <Icon name="HandHeart" size={20} />
                  Поддержать нас
                </h2>
                <ul className="ml-6 space-y-2">
                  <li>
                    <Link
                      to="/support"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Форум v2
                    </Link>
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>
                        <span className="text-gray-600 text-sm">
                          Часто задаваемые вопросы
                        </span>
                      </li>
                      <li>
                        <span className="text-gray-600 text-sm">
                          Карта по расширению функционала
                        </span>
                      </li>
                      <li>
                        <span className="text-gray-600 text-sm">
                          Возможности форума
                        </span>
                      </li>
                      <li>
                        <span className="text-gray-600 text-sm">
                          Природные и человеческие катастрофы
                        </span>
                      </li>
                      <li>
                        <span className="text-gray-600 text-sm">
                          Защита от космоса – наиболее эффективные решения
                        </span>
                      </li>
                    </ul>
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
