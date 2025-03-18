'use client'

import { Container, Filters, ProductCard, Title } from "@/components/shared";
import { LaptopFilters } from "@/components/shared/laptopFilters";
import { ProductCardSkeleton } from "@/components/shared/skeletonCard";
import {Button, Skeleton} from "@/components/ui";
import axios from "axios";
import { useEffect, useState } from "react";

interface Product {
    id: number;
    name: string;
    searchName: string;
    description: string;
    categoryTitle: string;
    discountPrice: number;
    image: string;
    price: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const skeletonCardCount = new Array(15).fill(0);

export default function CatalogCategoryPage({ params }: { params: { category: string } }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [categoryTitle, setCategoryTitle] = useState<string>("");
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    useEffect(() => {
        const getProductByCategory = async () => {
            try {
                const response = await axios.get(`${API_URL}/catalog/${params.category}`);
                setProducts(response.data);
                setCategoryTitle(response.data[0].categoryTitle);
                console.log(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        getProductByCategory();
    }, [params]);

    const handleFilterChange = (filteredProducts: Product[]) => {
        setProducts(filteredProducts);
    };

    const closeFilters = () => {
        setIsFiltersOpen(false)
    }

    return (
        <Container>
            <div className={"flex items-center gap-3 pt-[20px] pl-2 justify-between"}>
                <Title text={categoryTitle} className="text-[28px]" />
                <Button
                    onClick={() => setIsFiltersOpen(true)}
                    variant={"link"}
                    className="md:hidden text-[20px]"
                >
                    Фильтры
                </Button>
            </div>
            <div className="flex pt-[40px] pb-[40px] gap-[80px]">
                <div className="hidden md:block">
                    {params.category === 'laptop' ? (
                        <LaptopFilters onFilterChange={handleFilterChange} />
                    ) : (
                        <Filters onFilterChange={handleFilterChange} closeFilter={closeFilters}/>
                    )}
                </div>
                {isFiltersOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
                        <div className="bg-white w-3/4 h-full p-4 overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                                <button
                                    onClick={() => closeFilters()}
                                    className="absolute text-gray-500 hover:text-gray-700 top-5 right-10"
                                >
                                    ✕
                                </button>
                            </div>
                            {params.category === 'laptop' ? (
                                <LaptopFilters onFilterChange={handleFilterChange} />
                            ) : (
                                <Filters onFilterChange={handleFilterChange} closeFilter={closeFilters} />
                            )}
                        </div>
                    </div>
                )}
                <div className="flex gap-[20px] flex-wrap">
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                imageUrl={product.image}
                                description={product.description}
                                discountPrice={product.discountPrice}
                                price={product.price}
                                searchName={product.searchName}
                            />
                        ))
                    ) : (
                        skeletonCardCount.map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))
                    )}
                </div>
            </div>
        </Container>
    );
}