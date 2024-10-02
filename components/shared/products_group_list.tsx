'use client'
import React, { useEffect } from 'react'
import { ProductCard, Title } from './index';
import { cn } from '@/lib/utils';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/store/category'

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
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

    const intersectionRef = React.useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4
    })

    useEffect(() => {
        if (intersection && intersection.isIntersecting) {
            setActiveCategoryId(categoryId)
        }
    }, [categoryId, intersection?.isIntersecting, title])

    return (
        <div className={className} id={title} ref={intersectionRef}>
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