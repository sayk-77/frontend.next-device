'use client';

import { Container, ProductCarousel, Title } from "@/components/shared";
import Breadcrumbs from "@/components/shared/breadCrumb";
import ProductDetails from "@/components/shared/productDetails";
import { Button, Skeleton } from "@/components/ui";
import useBrandStore from "@/store/storeBrand";
import axios from "axios";
import { Star, ShoppingBasket, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Review = dynamic(() => import('@/components/shared/productReviews'), { ssr: false });

export default function ProductPage({ params: { searchName } }: { params: { searchName: string } }) {
    const [product, setProduct] = useState<Product>({} as Product);
    const setBrandId = useBrandStore(state => state.setBrandId);
    const setBrandName = useBrandStore(state => state.setBrandName);
    const [loading, setLoading] = useState(true);

    const handleBrandClick = (id: number, name: string) => {
        setBrandId(id);
        setBrandName(name);
    };

    useEffect(() => {
        const getProductById = async (searchName: string) => {
            try {
                const response = await axios.get(`${API_URL}/products/${searchName}`);
                setProduct(response.data);
                handleBrandClick(response.data.brand.id, response.data.brand.name);
                console.log(response.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false); 
            }
        };
        getProductById(searchName);
    }, [searchName]);

    const customBreadCrumbs = [
        { label: product.brand?.name, href: `/brands/${product.brand?.name}` },
        { label: product.category?.title || 'Категория', href: `/brands/${product.brand?.name}/category/${product.category?.title}` },
        { label: product.name, href: `/product/${product.searchName}` },
    ];

    if (loading) {
        return (
            <div className="p-6">
                <Container>
                    <Skeleton />
                </Container>
            </div>
        );
    }

    return (
        <div className="p-6">
            <Container>
                <Breadcrumbs customBreadcrumbs={customBreadCrumbs} />
                <div className="flex flex-col md:flex-row pt-[30px]">
                    <div className="flex-1">
                        <ProductCarousel carouselItems={product.images} />
                    </div>

                    <div className="flex-1 pr-10 flex-col justify-between max-w-[800px]">
                        <div>
                            <Title text={product.name} className="text-[32px] pb-[10px]" />
                        </div>

                        <ProductDetails details={product.details} />

                        <div className="flex flex-col pt-5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-[5px]">Рейтинг: 5 <Star color="orange" size={16} /></div>
                                <span className="text-green-600 font-semibold">В наличии: {product.stock} шт.</span>
                            </div>

                            <div className="flex gap-[30px] items-center justify-between pt-[20px]">
                                <div className="flex flex-col relative">
                                    {product.discountPrice > 0 && (<span className="text-end text-[18px] line-through absolute top-[-20px] right-0">{product.price}</span>)}
                                    <span className="text-2xl">Цена: <strong>{product.price - product.discountPrice}</strong></span>
                                </div>
                                <div className="flex items-center gap-5">
                                    <Button className="rounded-[10px]"><ShoppingBasket size={24} /></Button>
                                    <Button className="rounded-[10px]"><Heart size={24} /></Button>
                                    <Button className="rounded-[10px]">Купить</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-10 mx-auto">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Описание:</h3>
                    <p className="text-gray-700 leading-relaxed p-4 border border-gray-200 rounded-md shadow-sm">
                        {product.description}
                    </p>
                </div>

                {product.id && <Review productId={product.id} />}
            </Container>
        </div>
    );
}