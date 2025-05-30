'use client';

import Link from 'next/link';
import React from 'react';
import { Title } from './index';
import { Button } from '../ui';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useFavoritesStore } from '@/store/favoriteStore';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'react-toastify';

interface Props {
    id: number;
    imageUrl: string;
    name: string;
    searchName: string;
    description: string;
    discountPrice: number;
    price: number;
    className?: string;
}

const API_URL_IMAGE_PRODUCT = process.env.NEXT_PUBLIC_API_URL_IMAGE_PRODUCT;

export const ProductCard: React.FC<Props> = (
    {
     className,
     imageUrl,
     name,
     searchName,
     price,
     id,
     description,
     discountPrice,
    }) => {
    const { favorites, addFavorite, removeFavorite } = useFavoritesStore();
    const addItem = useCartStore(state => state.addItem);

    const isFavorite = favorites.includes(id);

    const handleFavoriteToggle = () => {
        if (isFavorite) {
            removeFavorite(id);
        } else {
            addFavorite(id);
            toast.info('Товар добавлен в избранное');
        }
    };

    const handleAddToCart = () => {
        addItem(id, 1, price - discountPrice);
        toast.info('Товар добавлен в корзину');
    };

    return (
        <div className={`${className} mx-auto flex relative flex-col min-w-[200px] sm:min-w-[250px] max-w-[280px] w-full h-[470px] sm:h-[520px] justify-between p-3 rounded-lg overflow-hidden`}>
            <Link href={`/product/${searchName}`}>
                <div className="flex justify-center items-center h-[200px] sm:h-[250px] mb-3 mt-3">
                    {discountPrice > 0 && (
                        <p className='absolute top-[10px] right-[5px] bg-red-600 text-white px-2 py-1 rounded-full text-sm font-bold shadow-md'>
                            Скидка
                        </p>)
                    }
                    <Image
                        width={200}
                        height={200}
                        className="object-contain"
                        src={`${API_URL_IMAGE_PRODUCT}${imageUrl}`}
                        alt={searchName}
                    />
                </div>
            </Link>

            <div className="flex flex-col items-center justify-between text-center gap-2">
                <Title text={name} className="font-bold text-sm sm:text-base" />
                <p className='text-[11px] sm:text-sm text-gray-400'>
                    {description.length > 100 ? `${description.substring(0, 50)}...` : description}
                </p>

                <div className='relative flex flex-col'>
                    {discountPrice > 0 && (
                        <span className='text-gray-500 line-through'>
                            {price}
                        </span>)
                    }
                    <span className='text-[16px] sm:text-[18px]'>
                        <b>{price - discountPrice} ₽</b>
                    </span>
                </div>

                <div className='flex flex-row gap-3 mt-2'>
                    <Button
                        variant={isFavorite ? 'outline' : "secondary"}
                        className="rounded-[10px] p-2"
                        onClick={handleFavoriteToggle}
                    >
                        <Heart size={20} color={isFavorite ? "red" : 'gray'} />
                    </Button>
                    <Button
                        variant="secondary"
                        className='rounded-[10px] p-2 text-gray-500'
                        onClick={handleAddToCart}
                    >
                        В корзину
                    </Button>
                </div>
            </div>
        </div>
    );
};
