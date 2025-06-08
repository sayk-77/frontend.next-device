'use client'

import { Filters, ProductCard } from "@/components/shared";
import { ProductCardSkeleton } from "@/components/shared/skeletonCard";
import { Button } from "@/components/ui";
import { useState } from "react";
import {LaptopFilters} from "@/components/shared/laptopFilters";

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

interface Props {
    category: string;
    initialProducts: Product[];
}

const skeletonCardCount = new Array(15).fill(0);

export default function CatalogClient({ category, initialProducts }: Props) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const handleFilterChange = (filteredProducts: Product[]) => {
        setProducts(filteredProducts);
    };

    const closeFilters = () => {
        setIsFiltersOpen(false);
    };

    return (
        <div className="flex flex-col md:flex-row pt-[40px] pb-[40px] gap-[80px]">
            <div className="hidden md:block">
                {category === 'laptop' ? (
                    <LaptopFilters onFilterChange={handleFilterChange} />
                ) : (
                    <Filters onFilterChange={handleFilterChange} closeFilter={closeFilters} />
                )}
            </div>

            <div className="md:hidden">
                <Button
                    onClick={() => setIsFiltersOpen(true)}
                    variant={"link"}
                    className="text-[20px]"
                >
                    Фильтры
                </Button>
                {isFiltersOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
                        <div className="bg-white w-3/4 h-full p-4 overflow-y-auto">
                            <button
                                onClick={closeFilters}
                                className="absolute text-gray-500 hover:text-gray-700 top-5 right-10"
                            >
                                ✕
                            </button>
                            {category === 'laptop' ? (
                                <LaptopFilters onFilterChange={handleFilterChange} />
                            ) : (
                                <Filters onFilterChange={handleFilterChange} closeFilter={closeFilters} />
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex gap-[20px] flex-wrap">
                {products?.length > 0 ? (
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
                    <div className="text-[20px]">Ничего не найдено</div>
                )}
            </div>
        </div>
    );
}