'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Container } from '@/components/shared';
import { CartItem } from '@/components/shared/cartItem';
import { CheckoutButton } from '@/components/shared/stipeButton';
import { Button } from '@/components/ui';
import { useCartStore } from '@/store/cartStore';

const OrderPage = () => {
  const { items } = useCartStore();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);

    const fetchUserData = async () => {
      if (!storedToken) return;
      
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        const { user } = response.data;
        setUserInfo({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        });
        setAddresses(
          user.addresses.map((addr: any) => ({
            id: addr.id,
            country: addr.country,
            city: addr.city,
            street: addr.street,
            postalCode: addr.postalCode,
          }))
        );
      } catch (error) {
        console.error("Ошибка при загрузке данных пользователя:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSelectAddress = (address: string) => {
    setSelectedAddress(address);
    setHasError(false); 
  }

  const handleCheckout = () => {
    if (!selectedAddress) {
      setHasError(true);
    }
  };

  return (
    <Container>
      <div className="relative py-3">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-semibold mb-6">Оформление заказа</h1>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Ваша корзина</h2>
            {items.length > 0 ? (
              items.map((item) => (
                <CartItem key={item.productId} productId={item.productId} quantity={item.quantity} />
              ))
            ) : (
              <p className="text-center text-gray-500 mt-4">Корзина пуста</p>
            )}
          </div>
          {items.length > 0 && !token && (
            <p className="text-[20px] mb-6">
              Чтобы оформить заказ, вам необходимо
              <Button variant="link">
                <Link href="/auth" className="text-[20px]">
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
          {token && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Адрес доставки</h2>
              {addresses.length === 0 && <div>Нет доступных адресов. Пожалуйста, добавьте его в профиле.</div>}
              {addresses.length >= 1 && (
                <select
                  value={selectedAddress}
                  onChange={(e) => handleSelectAddress(e.target.value)}
                  className={`rounded-2xl outline-none w-full p-[15px] bg-gray-100 pl-11 mb-4 ${
                    hasError ? 'border-2 border-red-500' : ''
                  }`}
                >
                  <option value="" disabled>
                    Выберите адрес
                  </option>
                  {addresses.map((address) => (
                    <option key={address.id} value={`${address.id}`}>
                      {address.country}, г.{address.city}, ул.{address.street}, {address.postalCode}
                    </option>
                  ))}
                </select>
              )}
              {hasError && <p className="text-red-500">Пожалуйста, выберите адрес доставки</p>}
            </div>
          )}
          <div className="flex justify-between">
            <p>Перед оплатой внимательно проверьте свои данные!</p>
            <div className='flex flex-col items-end'>
              <p className="font-medium text-end text-[26px]">Итого: {totalPrice} Р</p>
              <Button variant="outline" onClick={handleCheckout}>
                {selectedAddress ? <CheckoutButton orderItems={items} totalPrice={totalPrice} address={Number(selectedAddress)} /> : 'Оплатить'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OrderPage;