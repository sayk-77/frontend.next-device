'use client';

import { Container } from '@/components/shared';
import { CartItem } from '@/components/shared/cartItem';
import { Button } from '@/components/ui';
import { useCartStore } from '@/store/cartStore';
import React from 'react';

const OrderPage = () => {
  const { items, clearCart } = useCartStore();
  
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Container>
      <div className="relative py-3">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-semibold mb-6">Оформление заказа</h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Ваша корзина</h2>
            {items.length > 0 ? (
              items.map(item => (
                <CartItem 
                  key={item.productId} 
                  productId={item.productId} 
                  quantity={item.quantity} 
                />
              ))
            ) : (
              <p className="text-center text-gray-500 mt-4">Корзина пуста</p>
            )}
          </div>
          <h3 className="font-bold text-end text-[26px]">Итого: {totalPrice} Р</h3>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Личные данные</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
                  type="text"
                  className='rounded-2xl outline-none w-full p-[15px] bg-gray-100 pl-11'
                  placeholder='Имя'
              />
              <input
                  type="text"
                  className='rounded-2xl outline-none w-full p-[15px] bg-gray-100 pl-11'
                  placeholder='Фамилия'
              />
              <input
                  type="text"
                  className='rounded-2xl outline-none w-full p-[15px] bg-gray-100 pl-11'
                  placeholder='Электронная почта'
              />
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Адрес доставки</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
                  type="text"
                  className='rounded-2xl outline-none w-full p-[15px] bg-gray-100 pl-11'
                  placeholder='Город'
              />
              <input
                  type="text"
                  className='rounded-2xl outline-none w-full p-[15px] bg-gray-100 pl-11'
                  placeholder='Улица'
              />
              <input
                  type="text"
                  className='rounded-2xl outline-none w-full p-[15px] bg-gray-100 pl-11'
                  placeholder='Дом'
              />
            </div>
          </div>

          <Button>Оплатить</Button>
        </div>
      </div>
    </Container>
  );
};

export default OrderPage;