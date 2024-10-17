'use client';
import React, { useEffect } from 'react';
import { Container, ProductCard, Title } from './index';
import { cn } from '@/lib/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Button, Skeleton } from '../ui';
import Link from 'next/link';

interface Product {
    id: number;
    name: string;
    description: string;
    searchName: string
    image: string;
    price: number;
}

interface Props {
    products: Product[]
    className?: string;
    title: string;
    loading?: boolean;
    categoryUrl: string
}

export const ProductsGroupList: React.FC<Props> = ({ products, className, title, categoryUrl }) => {
    if (!products || products.length === 0) {
        return (<Skeleton />)
    }
    
    return (
        <div className={className}>
            <div className='flex items-center justify-between'>
                <Title text={title} className='text-[26px] pb-[10px]' />
                <div className='flex justify-center pr-[30px]'>
                {!categoryUrl.includes('new') && !categoryUrl.includes('discount') && (
                    <Button variant="link" className=''>
                        <Link href={categoryUrl}>Показать еще</Link>
                    </Button>
                )}
                </div>
            </div>

            <Swiper
                slidesPerView={4}
                loop={false}
                className={cn('my-swiper')}
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <ProductCard
                            id={product.id}
                            name={product.name}
                            imageUrl={product.image}
                            price={product.price}
                            searchName={product.searchName}
                            description={product.description}
                        />
                    </SwiperSlide>
                    
                ))}
            </Swiper>
        </div>
    );
};
