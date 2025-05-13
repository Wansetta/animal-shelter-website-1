
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Пользователь пытался получить доступ к несуществующему маршруту:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="text-center max-w-lg">
          <img 
            src="https://cdn.poehali.dev/files/b627b5b9-c57e-4ec6-9e93-dce4bf70d2aa.png" 
            alt="Логотип Преданность" 
            className="h-24 mx-auto mb-4 opacity-50"
          />
          <h1 className="text-4xl font-bold mb-4 text-primary">404</h1>
          <p className="text-xl text-gray-600 mb-8">
            Ой! Такой страницы не существует. Возможно, она потерялась, как и наши питомцы когда-то.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-primary text-white hover:bg-primary-light px-6 py-3 rounded-md font-medium transition-colors"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
