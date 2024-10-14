import Link from 'next/link';
import React from 'react';
import { Title } from './index';
import { Button } from '../ui';
import { Heart } from 'lucide-react';
import Image from 'next/image';

interface Props {
    id: number;
    imageUrl: string;
    name: string;
    description: string;
    price: number;
    className?: string;
}

const API_URL_IMAGE_PRODUCT = process.env.NEXT_PUBLIC_API_URL_IMAGE_PRODUCT;

export const ProductCard: React.FC<Props> = ({ className, imageUrl, name, price, id, description }) => {
    return (
        <div className={`${className} flex flex-col border min-w-[280px] max-w-[280px] w-full h-[450px] justify-between p-3 rounded-lg overflow-hidden`}>
            <Link href={`/product/${id}`}>
                <div className="relative flex justify-center items-center h-[200px] mb-3">
                    <Image 
                        width={200} 
                        height={200} 
                        className="object-contain" 
                        src={`${API_URL_IMAGE_PRODUCT}${imageUrl}`} 
                        alt={name} 
                    />
                </div>
            </Link>
            
            <div className="flex flex-col items-center justify-between text-center gap-2 ">
                <Title text={name} className="font-bold text-sm" />
                <p className='text-[11px] text-gray-400'>
                    {description}
                </p>
                
                <span className='text-[18px]'>
                    от <b>{price} Р</b>
                </span>

                <div className='flex flex-row gap-3 mt-2'>
                    <Button variant="outline" className="rounded-[10px] p-2"><Heart size={20} /></Button>
                    <Button variant="outline" className='rounded-[10px] p-2'>Купить</Button>
                </div>
            </div>
        </div>
    );
};
