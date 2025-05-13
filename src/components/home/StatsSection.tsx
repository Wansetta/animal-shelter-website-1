
import { Clock, Users, Heart, Home } from 'lucide-react';

const StatsSection = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Статистика - Лет работы */}
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={32} className="text-white" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">5+</div>
            <div className="text-white/80">Лет работы</div>
          </div>
          
          {/* Статистика - Спасено животных */}
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={32} className="text-white" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">500+</div>
            <div className="text-white/80">Спасено животных</div>
          </div>
          
          {/* Статистика - Нашли дом */}
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home size={32} className="text-white" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">300+</div>
            <div className="text-white/80">Нашли новый дом</div>
          </div>
          
          {/* Статистика - Волонтеров */}
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-white" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">50+</div>
            <div className="text-white/80">Волонтеров</div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
