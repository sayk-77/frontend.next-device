'use client'
import React from 'react'
import { ProductCard, Title } from './index';
import { cn } from '@/lib/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface Props {
    title: string
    items: any[]
    categoryId: number
    listClassName?: string;
    className?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
    title,
    items,
    categoryId,
    listClassName,
    className
}) => {

    return (
        <div className={className} id={title}>
            <Title text={title} size='lg' className='font-extrabold mb-5'/>

            <Swiper
                slidesPerView={4}
                loop={true}
                className={cn(listClassName)}
            >
                {
                    items.map((product, i) => (
                        <SwiperSlide key={product.id}>
                            <ProductCard 
                                id={product.id}
                                name={product.name}
                                imageUrl={product.imageUrl}
                                price={product.items[0].price}
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}
