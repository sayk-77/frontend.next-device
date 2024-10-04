'use client'
import React, { useEffect } from 'react'
import { ProductCard, Title } from './index';
import { cn } from '@/lib/utils';

interface Props {
    title: string
    items: any[]
    categoryId: number
    listClassName?: string;
    className?: string;
}

export const ProductsGroupList:React.FC<Props> = ({
    title,
    items,
    categoryId,
    listClassName,
    className
}) => {

    return (
        <div className={className} id={title}>
            <Title text={title} size='lg' className='font-extrabold mb-5'/>

            <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
                {
                    items.map((product, i) => (
                        <ProductCard 
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            imageUrl={product.imageUrl}
                            price={product.items[0].price}
                        />
                    ))
                }
            </div>
        </div>
    );
}