
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* О приюте */}
          <div>
            <h3 className="text-xl font-bold mb-4">Приют "Преданность"</h3>
            <p className="mb-4">
              Мы помогаем бездомным животным найти новый дом и заботливых хозяев. 
              Наша миссия — дарить животным вторую жизнь и шанс на счастье.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="https://vk.com/predannost" target="_blank" rel="noopener noreferrer" 
                className="hover:text-accent-light transition-colors" 
                aria-label="Мы ВКонтакте">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15.5 9c1 0 1 .5 1 1.5l-1 2.5h2l-.5 2h-2L15 22h-3l-.5-7H9l.5-2h2l.5-3c0-2 0-3 2.5-3Z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-accent-light transition-colors" aria-label="Мы в Instagram">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-accent-light transition-colors" aria-label="Мы в Facebook">
                <Facebook size={24} />
              </a>
            </div>
          </div>
          
          {/* Навигация */}
          <div>
            <h3 className="text-xl font-bold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-accent-light transition-colors">Главная</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-accent-light transition-colors">О нас</Link>
              </li>
              <li>
                <Link to="/found-pet" className="hover:text-accent-light transition-colors">Нашел питомца</Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-accent-light transition-colors">Поддержать нас</Link>
              </li>
            </ul>
          </div>
          
          {/* Контакты */}
          <div>
            <h3 className="text-xl font-bold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone size={18} />
                <a href="tel:+7XXXXXXXXXX" className="hover:text-accent-light transition-colors">
                  +7 (XXX) XXX-XX-XX
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} />
                <a href="mailto:predannost@example.com" className="hover:text-accent-light transition-colors">
                  predannost@example.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-1" />
                <span>Адрес приюта, город, улица, дом</span>
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} Приют для животных "Преданность". Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
