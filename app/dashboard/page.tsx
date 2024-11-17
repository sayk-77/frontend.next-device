'use client'

import { AdminProduct } from '@/components/shared/adminProduct';
import { isAdmin } from '@/lib/isAdmin';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import OrderPage from '../order/page';
import AdminOrder from '@/components/shared/adminOrder';
import AdminReview from '@/components/shared/adminReview';

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const [activePage, setActivePage] = useState('products');

    const handleNavigation = (page: string) => {
        setActivePage(page);
    };
  
    useEffect(() => {
      if (!isAdmin()) {
        router.push('/');
      } else {
        setIsLoading(false);
      }
    }, []);
  
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-screen">
            <div>Loading...</div>
        </div>
      )
    }


  return (
    <div className="flex ml-[20px]">
      <div className="w-64 bg-white text-gray-700 p-4">
        <h2 className="text-2xl text-center font-bold mb-8 text-orange-500">Админ панель</h2>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => handleNavigation('products')}
            className={`px-4 py-2 rounded-lg border-2 ${
              activePage === 'products'
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-white text-gray-700 border-orange-400 hover:bg-orange-500 hover:text-white'
            }`}
          >
            Товары
          </button>
          <button
            onClick={() => handleNavigation('orders')}
            className={`px-4 py-2 rounded-lg border-2 ${
              activePage === 'orders'
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-white text-gray-700 border-orange-400 hover:bg-orange-500 hover:text-white'
            }`}
          >
            Заказы
          </button>
          <button
            onClick={() => handleNavigation('reviews')}
            className={`px-4 py-2 rounded-lg border-2 ${
              activePage === 'reviews'
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-white text-gray-700 border-orange-400 hover:bg-orange-500 hover:text-white'
            }`}
          >
            Отзывы
          </button>
        </div>
      </div>

      <div className="flex-1 p-8">
        {activePage === 'products' && <AdminProduct />}
        {activePage === 'orders' && <AdminOrder />}
        {activePage === 'reviews' && <AdminReview />}
      </div>
    </div>
  );
};

export default Dashboard;
