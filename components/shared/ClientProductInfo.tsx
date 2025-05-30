'use client';

import React from 'react';
import { Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui';
import { useFavoritesStore } from '@/store/favoriteStore';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'react-toastify';
import ProductDetails from '@/components/shared/productDetails';
import {Title} from "@/components/shared/title";

export function ClientProductInfo({ product }: { product: any }) {
    const { favorites, addFavorite, removeFavorite } = useFavoritesStore();
    const addItem = useCartStore((state) => state.addItem);

    const isFavorite = favorites.includes(product.id);

    const handleFavoriteToggle = () => {
        if (isFavorite) {
            removeFavorite(product.id);
        } else {
            addFavorite(product.id);
            toast.info('Товар добавлен в избранное');
        }
    };

    const handleAddToCart = () => {
        addItem(product.id, 1, product.price - product.discountPrice);
        toast.info('Товар добавлен в корзину');
    };

    return (
        <div className="flex-1 pr-0 md:pr-10 flex flex-col justify-between m-auto max-w-[800px]">
            <div>
                <Title text={product.name} className="text-xl mt-10 md:text-[32px] pb-[10px] text-center" />
            </div>

            <ProductDetails details={product.details} />

            <div className="flex flex-col pt-5">
                <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm md:px-6">
                    <div className="flex items-center gap-1 text-sm md:text-base text-gray-700">
                        <span className="font-medium">Рейтинг:</span>
                        <span className="font-semibold text-yellow-500">5</span>
                        <Star size={18} color="orange" />
                    </div>
                    <span className="text-sm md:text-base font-semibold text-green-600">
            В наличии: {product.stock} шт.
          </span>
                </div>

                <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-4 mt-8 py-4 shadow-sm md:px-6">
                    <div className="relative text-left">
                        {product.discountPrice > 0 && (
                            <span className="absolute -top-5 left-0 text-sm text-gray-400 line-through">
                {product.price.toLocaleString()} ₽
              </span>
                        )}
                        <span className="text-base md:text-lg text-gray-800">
              Цена:{' '}
                            <strong className="text-lg md:text-xl text-green-600">
                {(product.price - product.discountPrice).toLocaleString()} ₽
              </strong>
            </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            className={`rounded-xl p-2 transition-all ${
                                isFavorite ? 'bg-red-100 text-red-500' : 'hover:bg-gray-100 text-gray-500'
                            }`}
                            onClick={handleFavoriteToggle}
                        >
                            <Heart size={20} fill={isFavorite ? 'red' : 'none'} />
                        </Button>

                        <Button
                            variant="outline"
                            className="rounded-xl px-5 py-2 font-semibold text-gray-700 border border-gray-300 hover:bg-gray-100 transition"
                            onClick={handleAddToCart}
                        >
                            В корзину
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}