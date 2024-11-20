'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import { ProductCard } from "./product_card"
import { Container } from "./container";
import Link from "next/link";
import { Button } from "../ui";
import { AdminEditProductCard } from "./adminProductEdit";
import { Plus } from "lucide-react";

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
        <Container className="m-auto max-w-[1000px]">
             <div className="flex justify-between">
                <p>Все товары</p>
                <Link href='/dashboard/product/create'>
                    <Plus/>
                </Link>
            </div>
            <div className="flex flex-wrap gap-[30px]">
                {products && products.length > 0 ? products.map((product) => (
                    <AdminEditProductCard
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
            </div>
        </Container>
    )
}