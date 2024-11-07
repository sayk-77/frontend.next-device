import React from 'react';
import { useCartStore } from '@/store/cartStore';
import { Button } from '../ui';
import { CartItem } from './cartItem';
import Link from 'next/link';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
    const { items, clearCart } = useCartStore();

    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div 
            className={`fixed top-0 z-40 right-0 h-full bg-white transition-all duration-500 ease-in-out transform ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} shadow-lg`}
        >
            <div className="p-4 overflow-y-auto max-h-[99vh] scrollbar-hide">
                <div className='flex items-center gap-[15px] justify-between'>
                    <h2 className="text-lg font-bold">Корзина ({totalItems})</h2>
                    {items.length > 0 && (
                        <div className='flex gap-[10px]'>
                            <Button variant="ghost" onClick={clearCart}>Очистить корзину</Button>
                        </div>
                    )}
                    <Button variant="link" onClick={onClose}>Закрыть</Button>
                </div>
                <div className="mt-2">
                    {items.length > 0 ? (
                        items.map(item => (
                            <CartItem 
                                key={item.productId} 
                                productId={item.productId} 
                                quantity={item.quantity} 
                            />
                        ))
                    ) : (
                        <div className="flex items-center justify-center h-full">Корзина пуста</div>
                    )}
                </div>
                {items.length > 0 && (
                    <div className="mt-4 flex justify-between">
                        <h3 className="font-bold text-[26px]">Итого: {totalPrice} Р</h3>
                        <Link href="/order">
                            <Button onClick={onClose}>Оформит заказ</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;