import Link from 'next/link';
import React from 'react';
import { Title } from './index';
import { Button } from '../ui';
import { Heart, Plus, ShoppingBasket } from 'lucide-react';

interface Props {
    id: number;
    imageUrl: string;
    name: string;
    price: number;
    className?: string;
}

export const ProductCard: React.FC<Props> = ({ className, imageUrl, name, price, id }) => {
    return (
        <div className={`${className} flex flex-col border justify-between p-5 rounded-lg overflow-hidden`}>
            <Link href={`/product/${id}`}>
                <div className="flex p-4">
                    <img className="w-[100px] h-[100px] object-scale-down" src={imageUrl} alt={name} />
                    <div className="ml-4 flex flex-col justify-between">
                        <div>
                            <Title text={name} size="sm" className="mb-1 font-bold" />
                            <p className='text-sm text-gray-400'>
                                ядер - 8x(2 ГГц), 2 ГБ, 2 SIM, IPS, 1600x720, камера 13 Мп, 4G, GPS, FM, 5000 мА*ч
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
            
            <div className='flex flex-col gap-5'>
                <div className='flex justify-between items-center mt-4'>
                    <span className='text-[20px]'>
                        от <b>{price} Р</b>
                    </span>
                </div>
                <div className='flex flex-row gap-5'>
                    <Button className="rounded-[10px]"><Heart size={24}/></Button>
                    <Button className='rounded-[10px]'>Купить</Button>
                </div>
            </div>
        </div>
    );
};
