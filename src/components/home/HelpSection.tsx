import { Link } from "react-router-dom";
import { Heart, Dog, Search, Home } from "lucide-react";

const HelpSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="section-title text-center">Как вы можете помочь</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Существует множество способов помочь бездомным животным и поддержать
          работу нашего приюта "Преданность". Выберите тот, который подходит
          именно вам.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Карточка "Взять питомца" */}
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Home size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Взять питомца</h3>
            <p className="text-gray-600 mb-4">
              Подарите дом и любовь одному из наших подопечных. Это самая
              большая помощь!
            </p>
            <Link
              to="/#pets"
              className="text-primary hover:text-primary-dark font-medium"
            >
              Посмотреть питомцев →
            </Link>
          </div>

          {/* Карточка "Сообщить о животном" */}
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Сообщить о животном</h3>
            <p className="text-gray-600 mb-4">
              Если вы нашли бездомное животное, сообщите нам, и мы постараемся
              помочь.
            </p>
            <Link
              to="/found-pet"
              className="text-primary hover:text-primary-dark font-medium"
            >
              Сообщить →
            </Link>
          </div>

          {/* Карточка "Сделать пожертвование" */}
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center">
            <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Сделать пожертвование</h3>
            <p className="text-gray-600 mb-4">
              Финансовая поддержка помогает нам обеспечивать животных питанием,
              лечением и крышей над головой.
            </p>
            <Link
              to="/support"
              className="text-accent hover:text-accent-dark font-medium"
            >
              Поддержать →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpSection;
