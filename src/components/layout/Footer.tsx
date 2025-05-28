import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* О приюте */}
          <div>
            <h3 className="text-xl font-bold mb-4">Приют "Преданность"</h3>
            <p className="mb-4">
              Мы помогаем бездомным животным найти новый дом и заботливых
              хозяев. Наша миссия — дарить животным вторую жизнь и шанс на
              счастье.
            </p>
          </div>

          {/* Навигация */}
          <div>
            <h3 className="text-xl font-bold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-accent-light transition-colors"
                >
                  Главная
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-accent-light transition-colors"
                >
                  О нас
                </Link>
              </li>
              <li>
                <Link
                  to="/found-pet"
                  className="hover:text-accent-light transition-colors"
                >
                  Нашел питомца
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="hover:text-accent-light transition-colors"
                >
                  Поддержать нас
                </Link>
              </li>
              <li>
                <Link
                  to="/sitemap"
                  className="hover:text-accent-light transition-colors"
                >
                  Карта сайта
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-xl font-bold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone size={18} />
                <a
                  href="tel:+7XXXXXXXXXX"
                  className="hover:text-accent-light transition-colors"
                >
                  +7 (903) 912-27-75
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} />
                <a
                  href="mailto:predannost-biysk@mail.ru
"
                  className="hover:text-accent-light transition-colors"
                >
                  predannost-biysk@mail.ru
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-1" />
                <span>п. Сорокино, ул. Майская, 20, корп. 7</span>
              </li>
              <li>
                <Link
                  to="/sitemap"
                  className="hover:text-accent-light transition-colors"
                >
                  Карта сайта
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm">
          <p>
            © {new Date().getFullYear()} Приют для животных "Преданность". Все
            права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
