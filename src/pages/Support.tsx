
import Layout from '@/components/layout/Layout';
import { Heart, Coffee, Droplet, Box, Camera, DollarSign, CreditCard, Bank } from 'lucide-react';

const Support = () => {
  return (
    <Layout>
      <div className="container mx-auto py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="page-title text-center">Поддержите наш приют</h1>
          
          <p className="text-center text-lg text-gray-700 mb-12">
            Благодаря вашей поддержке мы можем продолжать спасать животных и находить для них новые семьи. 
            Любая помощь, финансовая или материальная, очень важна для нас.
          </p>
          
          {/* Финансовая помощь */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-accent/10 text-accent rounded-full p-2">
                <Heart size={24} />
              </div>
              <h2 className="text-2xl font-bold">Финансовая поддержка</h2>
            </div>
            
            <p className="text-gray-700 mb-6">
              Ваши пожертвования помогут нам оплатить:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="bg-gray-100 rounded-full p-2 mt-1">
                  <Coffee size={18} className="text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Корм и питание</h3>
                  <p className="text-sm text-gray-600">
                    Качественное питание для здоровья наших питомцев
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-gray-100 rounded-full p-2 mt-1">
                  <Droplet size={18} className="text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Лечение и вакцинация</h3>
                  <p className="text-sm text-gray-600">
                    Ветеринарная помощь и необходимые медикаменты
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-gray-100 rounded-full p-2 mt-1">
                  <Box size={18} className="text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Содержание приюта</h3>
                  <p className="text-sm text-gray-600">
                    Обеспечение комфортных условий для животных
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-gray-100 rounded-full p-2 mt-1">
                  <Camera size={18} className="text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Информационную работу</h3>
                  <p className="text-sm text-gray-600">
                    Помощь в поиске новых хозяев для наших питомцев
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl font-semibold mb-4">Способы пожертвования</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Банковская карта */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <CreditCard size={20} className="text-primary" />
                    <h4 className="font-medium">Банковская карта</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Вы можете перевести пожертвование на карту приюта
                  </p>
                  <div className="bg-gray-50 rounded p-2 text-center">
                    <span className="text-sm font-medium">5555 5555 5555 5555</span>
                  </div>
                </div>
                
                {/* Счет организации */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <Bank size={20} className="text-primary" />
                    <h4 className="font-medium">Счет организации</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Реквизиты для юридических лиц
                  </p>
                  <button className="w-full text-sm text-primary border border-primary rounded-md py-1 hover:bg-primary/5 transition-colors">
                    Показать реквизиты
                  </button>
                </div>
                
                {/* Электронные платежи */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign size={20} className="text-primary" />
                    <h4 className="font-medium">Электронные деньги</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Пожертвования через платежные системы
                  </p>
                  <button className="w-full text-sm bg-primary text-white rounded-md py-1 hover:bg-primary-light transition-colors">
                    Перейти к оплате
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Другие виды помощи */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Другие способы помочь</h2>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-semibold text-lg mb-3">Материальная помощь</h3>
                <p className="text-gray-700 mb-3">
                  Мы всегда рады следующим товарам для наших питомцев:
                </p>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Корма для кошек и собак (сухие и влажные)</li>
                  <li>Наполнители для кошачьих туалетов</li>
                  <li>Ошейники, поводки, миски</li>
                  <li>Игрушки для животных</li>
                  <li>Лежанки, домики, переноски</li>
                  <li>Медикаменты (по согласованию)</li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">
                  Вы можете привезти вещи непосредственно в приют в часы работы или связаться с нами для организации доставки.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-semibold text-lg mb-3">Помощь транспортом</h3>
                <p className="text-gray-700">
                  Нам часто нужна помощь с перевозкой животных в ветеринарные клиники, к новым хозяевам или на выставки-пристройства. 
                  Если у вас есть возможность помочь с транспортировкой, пожалуйста, свяжитесь с нами.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-3">Информационная поддержка</h3>
                <p className="text-gray-700 mb-3">
                  Расскажите о нашем приюте друзьям и знакомым, поделитесь информацией о наших питомцах в социальных сетях. 
                  Чем больше людей узнает о нас, тем больше шансов у наших подопечных найти новый дом.
                </p>
                <div className="flex gap-3">
                  <button className="flex items-center gap-1 text-sm bg-[#4C75A3] text-white px-3 py-1 rounded-md hover:bg-opacity-90 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15.5 9c1 0 1 .5 1 1.5l-1 2.5h2l-.5 2h-2L15 22h-3l-.5-7H9l.5-2h2l.5-3c0-2 0-3 2.5-3Z"/>
                    </svg>
                    Поделиться ВК
                  </button>
                  <button className="flex items-center gap-1 text-sm bg-[#3b5998] text-white px-3 py-1 rounded-md hover:bg-opacity-90 transition-colors">
                    <Facebook size={16} />
                    Поделиться в Facebook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Support;
