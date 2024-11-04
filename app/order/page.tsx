'use client';

import { Container } from '@/components/shared';
import { CartItem } from '@/components/shared/cartItem';
import { CheckoutButton } from '@/components/shared/stipeButton';
import { Button } from '@/components/ui';
import { useCartStore } from '@/store/cartStore';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const OrderPage = () => {
  const { items } = useCartStore();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    
    const fetchUserData = async () => {
      if (!storedToken) {
        return;
      }
      
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          }
        });
        const { user } = response.data;

        setUserInfo({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        });
        setAddresses(user.addresses.map((addr: any) => ({
          id: addr.id,
          country: addr.country,
          city: addr.city,
          street: addr.street,
          postalCode: addr.postalCode
        })));
      } catch (error) {
        console.error("Ошибка при загрузке данных пользователя:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSelectAddress = (address: string) => {
    setSelectedAddress(address);
  };

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
          {items.length > 0 && !token && ( 
            <p className="text-[20px] mb-6">Чтобы оформить заказ, вам необходимо 
              <Button variant="link">
                <Link href='/auth' className='text-[20px]'>
                  войти в аккаунт.
                </Link>
              </Button>
            </p>
          )}
          {token && userInfo && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Личные данные</h2>
              <div className="mb-2">
                <span className="font-medium">Имя:</span> {userInfo.firstName}
              </div>
              <div className="mb-2">
                <span className="font-medium">Фамилия:</span> {userInfo.lastName}
              </div>
              <div className="mb-2">
                <span className="font-medium">Электронная почта:</span> {userInfo.email}
              </div>
            </div>
          )}
          {token && addresses.length > 0 && ( 
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Адрес доставки</h2>
              <select 
                value={selectedAddress} 
                onChange={(e) => handleSelectAddress(e.target.value)} 
                className="rounded-2xl outline-none w-full p-[15px] bg-gray-100 pl-11 mb-4"
              >
                <option value="" disabled>Выберите адрес</option>
                {addresses.map((address, index) => (
                  <option key={index} value={`${address.id}`}>
                    {address.country}, г.{address.city}, ул.{address.street}, {address.postalCode}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className='flex gap-[10px] items-center'>
            <CheckoutButton orderItems={items} totalPrice={totalPrice}/>
            <p>Перед оплатой внимательно проверьте свои данные!</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OrderPage;