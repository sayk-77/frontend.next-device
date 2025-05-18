'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, User, LogOut, Heart, Menu, X } from 'lucide-react';
import { useFavoritesStore } from '@/store/favoriteStore';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';
import { Container, SearchInput } from './index';
import { Button } from '../ui';
import CartDrawer from './cartDrawer';
import { FavoritesDrawer } from './favoriteDrawer';
import Logo from "@/components/shared/logo";
import {OfflineNotification} from "@/components/shared/offline-not";

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
    const { favorites, initializeFavorites } = useFavoritesStore();
    const { items, initializeCart } = useCartStore();
    const { isAuthenticated, login, logout } = useAuthStore();

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        initializeFavorites();
        initializeCart();

        if (localStorage.getItem('token')) {
            login();
        }
    }, [initializeFavorites, initializeCart, login]);

    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleCartToggle = () => setIsCartOpen((prev) => !prev);
    const handleFavoritesToggle = () => setIsFavoritesOpen((prev) => !prev);
    const handleLogout = () => {
        localStorage.removeItem('token');
        logout();
    };
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            <header className={cn("bg-white shadow-md sticky top-0 z-10", className)}>
                <Container className="flex items-center justify-between py-4 lg:py-6">
                    <Logo />

                    <Link href="/catalog" className={"hidden lg:flex"}>
                        <Button variant="outline" className="ml-5">
                            Каталог
                        </Button>
                    </Link>

                    <div className="flex-1 max-w-xs sm:max-w-md mx-4">
                        <SearchInput />
                    </div>

                    <div className="lg:hidden">
                        <Button onClick={toggleMenu} variant="secondary" className={"mr-4"}>
                            {isMenuOpen ? <X size={16} className="z-10" /> : <Menu size={16} />}
                        </Button>
                    </div>

                    <div className="hidden lg:flex items-center gap-3 lg:gap-6">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-2">
                                <Link href="/profile">
                                    <Button variant="outline" className="flex items-center gap-1">
                                        <User size={16} />
                                        Профиль
                                    </Button>
                                </Link>
                                <Button variant="outline" onClick={handleLogout} className="flex items-center gap-1">
                                    <LogOut size={16} />
                                    Выйти
                                </Button>
                            </div>
                        ) : (
                            <Link href="/auth">
                                <Button variant="outline" className="flex items-center gap-1">
                                    <User size={16} />
                                    Войти
                                </Button>
                            </Link>
                        )}

                        <Button variant="outline" onClick={handleFavoritesToggle} className="relative">
                            <Heart size={24} />
                            {favorites.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
                  {favorites.length}
                </span>
                            )}
                        </Button>

                        <div className={"mr-2"}>
                            <Button variant="outline" onClick={handleCartToggle} className="relative flex items-center gap-2">
                                <ShoppingCart size={20} />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full px-1">
                    {totalItems}
                  </span>
                                )}
                                <b>{totalPrice} Р</b>
                            </Button>
                        </div>
                    </div>
                </Container>
                <OfflineNotification />
            </header>


            <div
                className={`fixed inset-0 z-20 bg-black bg-opacity-50 flex justify-end transition-opacity duration-300 lg:hidden ${
                    isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onClick={closeMenu}
            >
                <div className="w-2/5 bg-white h-full p-4" onClick={(e) => e.stopPropagation()}>
                    <Button
                        variant="secondary"
                        onClick={closeMenu}
                        className="absolute top-4 right-4 z-30"
                    >
                        <X size={16} />
                    </Button>
                    <div className="flex flex-col gap-4 mt-[50px]">
                        <Link href="/catalog">
                            <Button variant="link" className="w-full" onClick={closeMenu}>Каталог</Button>
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link href="/profile">
                                    <Button variant="link" className="w-full" onClick={closeMenu}>Профиль</Button>
                                </Link>
                                <Button variant="link" onClick={() => { handleLogout(); closeMenu(); }} className="w-full">
                                    Выйти
                                </Button>
                            </>
                        ) : (
                            <Link href="/auth">
                                <Button variant="link" className="w-full" onClick={closeMenu}>Войти</Button>
                            </Link>
                        )}
                        <Button variant="link" onClick={handleFavoritesToggle} className="w-full">
                            Избранное
                        </Button>
                        <Button variant="link" onClick={handleCartToggle} className="w-full">
                            Корзина
                        </Button>
                    </div>
                </div>
            </div>

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