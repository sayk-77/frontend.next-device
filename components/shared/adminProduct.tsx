'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import { ProductCard } from "./product_card"
import { Container } from "./container";

interface Product {
    id: number;
    name: string;
    description: string;
    searchName: string
    discountPrice: number
    image: string;
    price: number;
  }
  
const API_URL = process.env.NEXT_PUBLIC_API_URL

export const AdminProduct = () => {
    const [products, setProducts] = useState<Product[]>([])
    
    useEffect(() => {
        const getProducts = async () => {
            const response = await axios.get(`${API_URL}/products`, 
                {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
            )
            setProducts(response.data)
        }
        getProducts()
    }, [])
    
    return (
        <Container className="flex flex-wrap gap-[30px] m-auto max-w-[1000px]">
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
            )) : (<div>Продуктов нет</div>)}
        </Container>
    )
}