import { Container, ProductCarousel, Title } from '@/components/shared';
import Breadcrumbs from '@/components/shared/breadCrumb';
import dynamic from 'next/dynamic';
import React from 'react';
import { ClientProductInfo } from "@/components/shared/ClientProductInfo";
import Review from "@/components/shared/productReviews";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ProductPageProps {
    params: Promise<{ searchName: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { searchName } = await params;
    let product;

    try {
        const res = await fetch(`${API_URL}/products/${searchName}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        product = await res.json();
    } catch (error) {
        return (
            <div className="p-4 text-red-500">
                Ошибка загрузки товара
            </div>
        );
    }

    const customBreadCrumbs = [
        { label: product.brand?.name, href: `/brands/${product.brand?.name}` },
        { label: product.category?.title || 'Категория', href: `/brands/${product.brand?.name}/category/${product.category?.title}` },
        { label: product.name, href: `/product/${product.searchName}` },
    ];

    return (
        <div className="p-4 md:p-6">
            <Container>
                <Breadcrumbs customBreadcrumbs={customBreadCrumbs} />

                <div className="flex flex-col lg:flex-row pt-6">
                    <div className="flex-1 mb-4 md:mb-0">
                        <ProductCarousel carouselItems={product.images} />
                    </div>

                    <ClientProductInfo product={product} />
                </div>

                <div className="pt-6 md:pt-10 mx-auto">
                    <h3 className="text-lg md:text-2xl font-semibold mb-4 text-gray-800">Описание:</h3>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed p-4 border border-gray-200 rounded-md shadow-sm">
                        {product.description}
                    </p>
                </div>

                {product.id && <Review productId={product.id} />}
            </Container>
        </div>
    );
}