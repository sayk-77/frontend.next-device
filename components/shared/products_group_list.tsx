'use client';
import React from 'react';
import { ProductCard, Title } from './index';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from 'react-slick';
import { Button, Skeleton } from '../ui';
import Link from 'next/link';

interface Product {
    id: number;
    name: string;
    description: string;
    searchName: string;
    discountPrice: number;
    image: string;
    price: number;
}

interface Props {
    products: Product[];
    className?: string;
    title: string;
    loading?: boolean;
    categoryUrl: string;
}

export const ProductsGroupList: React.FC<Props> = ({ products, className, title, categoryUrl }) => {
    if (!products || products.length === 0) {
        return <Skeleton />;
    }

    const settings = {
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: false,
        responsive: [
            {
                breakpoint: 1350,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 520,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className={`w-full flex justify-center ${className}`}>
            <div className="max-w-[1260px] w-full">
                <div className="flex items-center justify-between px-4">
                    <Title text={title} className="text-[14px] sm:text-[16px] md:text-[26px]" />
                    <div className="flex justify-center">
                        {!categoryUrl.includes('new') && !categoryUrl.includes('discount') && (
                            <Button variant="link">
                                <Link href={categoryUrl}>Показать еще</Link>
                            </Button>
                        )}
                    </div>
                </div>

                <div className="flex justify-around">
                    <div className="w-[85%] max-w-[1260px]">
                        <Slider {...settings} className="w-full">
                            {products.map((product) => (
                                <div key={product.id} className="flex justify-center items-center">
                                    <ProductCard
                                        id={product.id}
                                        name={product.name}
                                        imageUrl={product.image}
                                        price={product.price}
                                        discountPrice={product.discountPrice}
                                        searchName={product.searchName}
                                        description={product.description}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};