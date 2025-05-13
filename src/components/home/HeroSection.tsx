
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const HeroSection = () => {
  return (
    <section className="relative">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          <CarouselItem>
            <div className="relative h-[500px] w-full">
              <img 
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b" 
                alt="Собаки в приюте" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center">
                <div className="container mx-auto px-4 md:px-6 text-white">
                  <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                      Подарите дом и любовь
                    </h1>
                    <p className="text-lg md:text-xl mb-6">
                      Наши питомцы ждут своих новых хозяев. 
                      Станьте тем, кто подарит им заботу и семью.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link to="/pets" className="bg-primary hover:bg-primary-light px-6 py-3 rounded-md font-medium transition-colors">
                        Смотреть питомцев
                      </Link>
                      <Link to="/support" className="bg-accent hover:bg-accent-light px-6 py-3 rounded-md font-medium transition-colors">
                        Поддержать приют
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
          
          <CarouselItem>
            <div className="relative h-[500px] w-full">
              <img 
                src="https://images.unsplash.com/photo-1543852786-1cf6624b9987" 
                alt="Кошки в приюте" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center">
                <div className="container mx-auto px-4 md:px-6 text-white">
                  <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                      Каждый питомец достоин любви
                    </h1>
                    <p className="text-lg md:text-xl mb-6">
                      В нашем приюте "Преданность" мы заботимся о бездомных животных и помогаем им найти новую семью.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link to="/about" className="bg-primary hover:bg-primary-light px-6 py-3 rounded-md font-medium transition-colors">
                        О нашем приюте
                      </Link>
                      <Link to="/found-pet" className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors">
                        Нашли питомца?
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default HeroSection;
