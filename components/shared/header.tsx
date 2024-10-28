'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Heart, ShoppingCart, User } from 'lucide-react';
import { useFavoritesStore } from '@/store/favoriteStore';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';
import { Container, SearchInput } from './index';
import { Button } from '../ui';
import CartDrawer from './cartDrawer';
import { FavoritesDrawer } from './favoriteDrawer';

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
    const { favorites, initializeFavorites } = useFavoritesStore();
    const { items, initializeCart } = useCartStore();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

    useEffect(() => {
        initializeFavorites();
        initializeCart();
    }, [initializeFavorites, initializeCart]);

    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleCartToggle = () => {
        setIsCartOpen((prev) => !prev);
    };

    const handleFavoritesToggle = () => {
        setIsFavoritesOpen((prev) => !prev);
    };

    return (
        <>
            <header className={cn("bg-white border-b sticky top-0 z-10", className)}>
                <Container className="flex items-center justify-between py-8">
                    <Link href="/">
                        <div className="flex items-center gap-4">
                            <Image src="/logo.png" alt="logo" width={130} height={55} />
                        </div>
                    </Link>

                    <Link href="/catalog">
                        <Button variant="outline" className="ml-5">
                            Каталог
                        </Button>
                    </Link>

                    <div className="mx-10 flex-1">
                        <SearchInput />
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href='/auth'>
                            <Button variant="outline" className="flex items-center gap-1">
                                <User size={16} />
                                Войти
                            </Button>
                        </Link>

                        <Button variant="outline" onClick={handleFavoritesToggle}>
                            <div className="relative">
                                <Heart size={24} />
                                {favorites.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
                                        {favorites.length}
                                    </span>
                                )}
                            </div>
                        </Button>

                        <div>
                            <Button className="group relative" onClick={handleCartToggle}>
                                <b>{totalPrice} Р</b>
                                <span className="h-full w-[1px] bg-white/30 mx-3" />
                                <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                                    <ShoppingCart className="h-4 w-4 relative" strokeWidth={2} />
                                    <b>{totalItems}</b>
                                </div>
                                <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
                            </Button>
                        </div>
                    </div>
                </Container>
            </header>

            <div
                className={`fixed inset-0 z-20 bg-black bg-opacity-50 flex justify-end transition-opacity duration-300 ${
                    isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
            >
                <CartDrawer isOpen={isCartOpen} onClose={handleCartToggle} />
            </div>

            <div
                className={`fixed inset-0 z-20 bg-black bg-opacity-50 flex justify-end transition-opacity duration-300 ${
                    isFavoritesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
            >
                <FavoritesDrawer isOpen={isFavoritesOpen} onClose={handleFavoritesToggle} />
            </div>
        </>
    );
};