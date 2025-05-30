"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/shared";
import Breadcrumbs from "@/components/shared/breadCrumb";
import {
    AutoScrollCarousel,
    CategoryCard,
    ProductsGroupList,
    Title,
} from "@/components/shared";
import useBrandStore from "@/store/storeBrand";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface BrandCategory {
    category: {
        id: number;
        name: string;
        title: string;
    };
    count: number;
    images_category: string;
}

interface BrandBanner {
    id: number;
    title: string;
    imageUrl: string;
}

interface BrandInfo {
    id: number;
    name: string;
    imageUrl: string;
    banners: BrandBanner[];
}

interface Product {
    id: number;
    name: string;
    searchName: string;
    description: string;
    discountPrice: number;
    price: number;
    image: string;
}

interface ClientBrandPageProps {
    brandInfo: BrandInfo;
    brandCategories: BrandCategory[];
    discountProducts: Product[];
    brandName: string;
    brandId: number;
}

export default function ClientBrandPage({
    brandInfo,
    brandCategories,
    discountProducts,
    brandName,
    brandId,
}: ClientBrandPageProps) {
    const setBrandId = useBrandStore((state) => state.setBrandId);
    const setBrandName = useBrandStore((state) => state.setBrandName);

    useEffect(() => {
        setBrandId(brandId);
        setBrandName(brandName);
    }, [brandId, brandName, setBrandId, setBrandName]);

    return (
        <Container>
            <Breadcrumbs className="pt-[10px]" />
            <div className="flex flex-col items-center">
                <Image
                    src={`${API_URL}/images/brand/${brandInfo.imageUrl}`}
                    className="m-auto pt-[10px]"
                    width={300}
                    height={300}
                    alt={`${brandInfo.name} logo`}
                    priority
                />
            </div>

            <div className={"mx-1"}>
                {brandInfo.banners && brandInfo.banners.length > 0 && (
                    <AutoScrollCarousel carouselItems={brandInfo.banners} />
                )}
            </div>

            <Title
                className="pt-[50px] pl-4 pb-[30px] text-[14px] sm:text-[16px] md:text-[26px]"
                text="Категории"
            />

            <div className="flex text-center flex-wrap gap-[50px] pb-[50px] justify-center">
                {brandCategories.map((item) => (
                    <div key={item.category.id}>
                        <CategoryCard
                            id={item.category.id}
                            name={item.category.name}
                            count={item.count.toString()}
                            title={item.category.title}
                            link={`/brands/${brandName}/category/${item.category.title}`}
                            imageUrl={`${API_URL}/images/product/${item.images_category}`}
                        />
                    </div>
                ))}
            </div>

            <ProductsGroupList
                title="Скидки"
                products={discountProducts}
                categoryUrl="/brands/new"
                className="pb-[30px]"
            />
        </Container>
    );
}
