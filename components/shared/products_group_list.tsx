'use client';
import React from 'react';
import { ProductCard, Title } from './index';
import { cn } from '@/lib/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Skeleton } from '../ui';

interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
}

interface Props {
    products: Product[]
    className?: string;
    title: string;
    loading: boolean;
}

export const ProductsGroupList: React.FC<Props> = ({ products, className, title, loading }) => {
    if (!products || products.length === 0) {
        return (<Skeleton />)
    }
    
    return (
        <div className={className}>
            <Title text={title} size='lg' className='font-extrabold mb-5' /> 

            <Swiper
                slidesPerView={4}
                loop={true}
                className={cn('my-swiper')}
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <ProductCard
                            id={product.id}
                            name={product.name}
                            imageUrl={product.image}
                            price={product.price}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
