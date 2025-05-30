import React, { useEffect, useState } from 'react';
import { Button, Skeleton } from '../ui';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useFavoritesStore } from '@/store/favoriteStore';
import Link from 'next/link';
import {toast} from "react-toastify";
import {useCartStore} from "@/store/cartStore";

interface Props {
    id: number;
}

interface Product {
    id: number;
    name: string;
    description: string;
    searchName: string;
    discountPrice: number;
    images: {
        id: number;
        imageUrl: string;
        isMain: boolean;
    }[];
    price: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const FavoriteItem: React.FC<Props> = ({ id }) => {
    const { removeFavorite } = useFavoritesStore();
    const [product, setProduct] = useState<Product>({} as Product);
    const [loading, setLoading] = useState(true);

    const addItem = useCartStore(state => state.addItem);
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${API_URL}/products/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleRemoveFavorite = () => {
        removeFavorite(id);
    };

    const handleAddToCart = () => {
        addItem(product.id, 1, product.price - product.discountPrice);
        toast.info('Товар добавлен в корзину');
    };

    if (loading) return <Skeleton />;

    if (!product) return <p>Product not found</p>;

    return (
        <div className="flex flex-col relative border justify-around p-2 rounded-lg overflow-hidden w-[200px] h-[370px]">
            <Link href={`/product/${product.searchName}`}>
                <div className="flex justify-center items-center h-[150px] mb-2 mt-2">
                    {product.discountPrice > 0 && (
                        <p className='absolute top-[5px] right-[5px] bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md'>
                            Скидка
                        </p>
                    )}
                    <Image
                        width={150} 
                        height={150}
                        className="object-contain"
                        src={`${API_URL}/images/product/${product.images[0].imageUrl}`}
                        alt={product.searchName}
                    />
                </div>
                <div className="flex flex-col items-center justify-between text-center gap-1">
                    <h3 className="font-bold text-sm">{product.name}</h3>
                    <div className='relative flex flex-col'>
                        {product.price > product.discountPrice && (
                            <span className='text-gray-500 line-through text-xs'>{product.price} Р</span>
                        )}
                        <span className='text-[16px]'>
                            <b>{product.price - product.discountPrice} Р</b>
                        </span>
                    </div>
                </div>
            </Link>
            <div className="flex justify-center gap-3">
                <Button
                    variant="ghost"
                    className={`rounded-xl p-2 transition-all bg-red-100 text-red-500`}
                    onClick={handleRemoveFavorite}
                >
                    <Heart size={20} fill={'red'} />
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
    );
};