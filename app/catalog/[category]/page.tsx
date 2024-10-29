'use client'

import { Container, Filters, ProductCard, Title } from "@/components/shared";
import { ProductCardSkeleton } from "@/components/shared/skeletonCard";
import { Skeleton } from "@/components/ui";
import axios from "axios";
import { time } from "console";
import { useEffect, useState } from "react";

interface Product {
    id: number;
    name: string;
    searchName: string;
    description: string;
    categoryTitle: string;
    discountPrice: number
    image: string;
    price: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL
const skeletonCardCount = new Array(15).fill(0)


export default function CatalogCategoryPage({ params }: { params: { category: string } }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [categoryTitle, setCategoryTitle] = useState<string>("");
  
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
  
    return (
      <Container>
        <Title text={categoryTitle} className="text-[28px] pt-[10px]" />
        <div className="flex pt-[40px] pb-[40px] gap-[80px]">
          <Filters onFilterChange={handleFilterChange} />
          <div className="flex gap-[20px] flex-wrap">
            {products && products.length > 0 ? products.map((product) => (
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
            )) : (
              skeletonCardCount.map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            )}
          </div>
        </div>
      </Container>
    );
  }
  