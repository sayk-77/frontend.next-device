'use client';

import React from 'react';
import { useCartStore } from '@/store/cartStore';
import { Button } from '../ui';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
    const { items, clearCart } = useCartStore();

    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className={`fixed top-0 z-40 right-0 h-full bg-white transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} shadow-lg`}>
            <div className="p-4">
                <h2 className="text-lg font-bold">Корзина</h2>
                <div className="mt-2">
                    {items.map(item => (
                        <div key={item.productId} className="flex justify-between">
                            <span>Товар ID: {item.productId}</span>
                            <span>{item.quantity} x {item.price} Р</span>
                        </div>
                    ))}
                </div>
                <div className="mt-4">
                    <h3 className="font-bold">Итого: {totalPrice} Р</h3>
                </div>
                <Button variant="secondary" className="mt-4" onClick={clearCart}>Очистить корзину</Button>
                <Button variant="secondary" className="mt-4" onClick={onClose}>Закрыть</Button>
            </div>
        </div>
    );
};

export default CartDrawer;
