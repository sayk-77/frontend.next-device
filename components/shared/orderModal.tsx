import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '../ui';
import Image from 'next/image';
import { Package, ShoppingCart } from 'lucide-react';

interface OrderItem {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
    products: Product;
}
  
interface Product {
    id: number;
    name: string;
    images: ProductImage[];
}
  
interface ProductImage {
    id: number;
    productId: number;
    imageUrl: string;
    isMain: boolean;
}
  
interface Address {
    id: number;
    userId: number;
    country: string;
    city: string;
    street: string;
    postalCode: string;
}
  
interface Order {
    id: number;
    userId: number;
    totalPrice: number;
    status: string;
    addressId: number;
    createdAt: string;
    orderItems: OrderItem[];
    address: Address;
}
  
interface OrderModalProps {
    orderId: number | null;
    onClose: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

const OrderModal: React.FC<OrderModalProps> = ({ orderId, onClose }) => {
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      if (orderId) {
        const fetchOrder = async () => {
          setLoading(true);
          setError(null);
  
          try {
            const response = await axios.get(`${API_URL}/order/${orderId}`, {
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
              },
            });
            setOrder(response.data);
          } catch (err) {
            setError('Не удалось загрузить данные заказа');
          } finally {
            setLoading(false);
          }
        };
  
        fetchOrder();
      }
    }, [orderId]);
  
    if (!orderId) return null;
  
    return (
      <div className="z-50 fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full relative overflow-y-auto max-h-[99vh] scrollbar-hide">
          <Button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" variant="link">
            <span className="text-xl font-semibold">×</span>
          </Button>
  
          {loading ? (
            <div className="text-center py-4 text-gray-700">Загрузка...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : order ? (
            <>
              <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                <Package className="inline-block mr-2" /> Детали заказа №{order.id}
              </h2>
  
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  <ShoppingCart className="mr-2 inline-block" /> Информация о заказе
                </h3>
                <div className="space-y-2">
                  <p><strong>Адрес для доставки:</strong> {order.address.country}, {order.address.city}, {order.address.street}, {order.address.postalCode}</p>
                  <p><strong>Оплачено:</strong> {order.totalPrice} руб.</p>
                  <p><strong>Дата создания:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                </div>
              </div>
  
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  <Package className="mr-2 inline-block" /> Товары
                </h3>
                {order.orderItems.map(item => {
                  const mainImage = item.products.images.find(img => img.isMain);
                  return (
                    <div key={item.productId} className="flex items-center mb-6 border-b pb-6">
                      <div className="mr-6">
                        <Image
                          src={`${API_URL}/images/product/${mainImage?.imageUrl}`}
                          alt={item.products.name}
                          width={140}
                          height={140}
                          className="shadow-md"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-lg text-gray-800">{item.products.name}</p>
                        <p className="text-gray-600">Количество: {item.quantity}</p>
                        <p className="text-gray-600">Цена: {item.price} руб.</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : null}
        </div>
      </div>
    );
  };
  
  export default OrderModal;