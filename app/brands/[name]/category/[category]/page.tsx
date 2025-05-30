'use client'

import { useEffect, useState } from "react";
import { Container, ProductCard, Title } from "@/components/shared";
import useBrandStore from "@/store/storeBrand";
import axios from "axios";
import Breadcrumbs from "@/components/shared/breadCrumb";
import { LoadingSpinner } from "@/components/shared/loadinSpinner";

interface Products {
    id: number;
    name: string;
    description: string;
    searchName: string;
    discountPrice: number;
    image: string;
    price: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function BrandCategoryPage({ params }: { params: { category: string } }) {
    const { category } = params;
    const { brandId, brandName } = useBrandStore();
    const decodedCategory = decodeURIComponent(category);

    const [product, setProduct] = useState<Products[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await axios.get(`${API_URL}/products/category`, {
                    params: { brand_id: brandId, category: decodedCategory, offset: 0, limit: 30 }
                });
                setProduct(response.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        if (brandId && decodedCategory) {
            getProduct();
        } else {
            setLoading(false);
        }
    }, [decodedCategory, brandId, category, brandName]);

    if (loading) {
        return <LoadingSpinner fullPage={true} text="Загрузка..." />;
    }

    return (
        <Container>
            <Breadcrumbs className="pt-[10px]" />
            <Title text={decodedCategory} className="text-[14px] sm:text-[16px] md:text-[26px] pl-4 pt-[20px]" />

            <div className="flex gap-[30px] flex-wrap pt-[40px] pb-[40px]">
                {product && product.length > 0 ? (
                    product.map((prod) => (
                        <ProductCard
                            key={prod.id}
                            id={prod.id}
                            price={prod.price}
                            description={prod.description}
                            discountPrice={prod.discountPrice}
                            name={prod.name}
                            searchName={prod.searchName}
                            imageUrl={prod.image}
                        />
                    ))
                ) : (
                    <p>Товаров нет</p>
                )}
            </div>
        </Container>
    );
}