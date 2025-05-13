
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PetCard, { PetInfo } from './PetCard';

// Моковые данные о питомцах
const mockPets: PetInfo[] = [
  {
    id: '1',
    name: 'Барон',
    type: 'dog',
    breed: 'Немецкая овчарка',
    age: '3 года',
    gender: 'male',
    description: 'Дружелюбный и активный пес, любит играть с мячом и обожает долгие прогулки. Хорошо ладит с детьми и другими животными.',
    image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6',
    status: 'available'
  },
  {
    id: '2',
    name: 'Муся',
    type: 'cat',
    breed: 'Сибирская',
    age: '2 года',
    gender: 'female',
    description: 'Спокойная и ласковая кошка. Любит сидеть на коленях и мурлыкать. Приучена к лотку и когтеточке.',
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce',
    status: 'available'
  },
  {
    id: '3',
    name: 'Рекс',
    type: 'dog',
    breed: 'Дворняжка',
    age: '5 лет',
    gender: 'male',
    description: 'Верный и преданный пес. Отлично подойдет для охраны дома. Любит детей и будет прекрасным компаньоном для семьи.',
    image: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80',
    status: 'reserved'
  },
  {
    id: '4',
    name: 'Лиза',
    type: 'cat',
    breed: 'Британская короткошерстная',
    age: '1 год',
    gender: 'female',
    description: 'Игривая и любопытная кошечка. Обожает игрушки и активные игры. Очень ласковая и общительная.',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
    status: 'available'
  },
  {
    id: '5',
    name: 'Тобик',
    type: 'dog',
    breed: 'Лабрадор',
    age: '4 года',
    gender: 'male',
    description: 'Умный и послушный пес. Хорошо поддается дрессировке, знает базовые команды. Любит плавать и играть с мячом.',
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d',
    status: 'adopted'
  },
  {
    id: '6',
    name: 'Соня',
    type: 'cat',
    breed: 'Мейн-кун',
    age: '3 года',
    gender: 'female',
    description: 'Крупная и очень ласковая кошка. Любит внимание и общение. Отлично ладит с другими животными.',
    image: 'https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6',
    status: 'available'
  },
];

const PetsSection = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'dog' | 'cat'>('all');
  
  // Фильтруем питомцев по типу
  const filteredPets = activeFilter === 'all' 
    ? mockPets 
    : mockPets.filter(pet => pet.type === activeFilter);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="section-title text-center">Наши питомцы ищут дом</h2>
        
        {/* Фильтры */}
        <div className="flex justify-center gap-4 mb-8">
          <button 
            onClick={() => setActiveFilter('all')} 
            className={`px-4 py-2 rounded-full ${
              activeFilter === 'all' 
                ? 'bg-primary text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            } transition-colors`}
          >
            Все питомцы
          </button>
          <button 
            onClick={() => setActiveFilter('dog')} 
            className={`px-4 py-2 rounded-full ${
              activeFilter === 'dog' 
                ? 'bg-primary text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            } transition-colors`}
          >
            Собаки
          </button>
          <button 
            onClick={() => setActiveFilter('cat')} 
            className={`px-4 py-2 rounded-full ${
              activeFilter === 'cat' 
                ? 'bg-primary text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            } transition-colors`}
          >
            Кошки
          </button>
        </div>
        
        {/* Карточки питомцев */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map(pet => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
        
        {/* Кнопка "Смотреть всех" */}
        <div className="text-center mt-10">
          <Link 
            to="/pets" 
            className="inline-block bg-primary text-white hover:bg-primary-light px-6 py-3 rounded-md font-medium transition-colors"
          >
            Смотреть всех питомцев
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PetsSection;
