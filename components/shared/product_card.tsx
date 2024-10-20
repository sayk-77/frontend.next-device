'use client'

import Link from 'next/link';
import React, { useEffect } from 'react';
import { Title } from './index';
import { Button } from '../ui';
import { Heart } from 'lucide-react';
import Image from 'next/image';

interface Props {
    id: number;
    imageUrl: string;
    name: string;
    searchName: string
    description: string;
    discountPrice: number
    price: number;
    className?: string;
}

const API_URL_IMAGE_PRODUCT = process.env.NEXT_PUBLIC_API_URL_IMAGE_PRODUCT;

export const ProductCard: React.FC<Props> = ({ className, imageUrl, name, searchName, price, id, description, discountPrice }) => {
    
    useEffect(() => {
        console.log(price, discountPrice)
    }, [])
    
    return (
        <div className={`${className} flex relative flex-col border min-w-[280px] max-w-[280px] w-full h-[470px] justify-between p-3 rounded-lg overflow-hidden`}>
            <Link href={`/product/${searchName}`}>
                <div className="flex justify-center items-center h-[200px] mb-3 mt-3">
                <p className='absolute top-[10px] right-[5px] bg-red-600 text-white px-2 py-1 rounded-full text-sm font-bold shadow-md'>
                  Скидка
                </p>
                    <Image 
                        width={200}
                        height={200} 
                        className="object-contain" 
                        src={`${API_URL_IMAGE_PRODUCT}${imageUrl}`} 
                        alt={searchName}
                    />
                </div>
            </Link>
            
            <div className="flex flex-col items-center justify-between text-center gap-2 ">
                <Title text={name} className="font-bold text-sm" />
                <p className='text-[11px] text-gray-400'>
                    {description}
                </p>
                
                <div className='relative flex flex-col'>
                    <span className='text-gray-500 line-through'>
                        {price}
                    </span>
                    <span className='text-[18px]'>
                        <b>{price - discountPrice} Р</b>
                    </span>
                </div>

                <div className='flex flex-row gap-3 mt-2'>
                    <Button variant="outline" className="rounded-[10px] p-2"><Heart size={20} /></Button>
                    <Button variant="outline" className='rounded-[10px] p-2'>Купить</Button>
                </div>
            </div>
        </div>
    );
};
