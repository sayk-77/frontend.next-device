'use client'

import { Card, Container } from "@/components/shared";
import useBrandStore from "@/store/storeBrand";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Brand {
    id: number
    imageUrl: string
    name: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function BrandsPage() {
    const [brands, setBrands] = useState<Brand[]>([])
    
    const setBrandId = useBrandStore(state => state.setBrandId);
    const setBrandName = useBrandStore(state => state.setBrandName);
    
    const handleBrandClick = (id: number, name: string) => {
        setBrandId(id);
        setBrandName(name);
    };
    
    useEffect(() => {
        const getBrands = async () => {
            try {
                const response = await axios.get(`${API_URL}/brands`)
                setBrands(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        getBrands()
    }, [])
    
    return (
        <Container>
            <div className="flex gap-2 flex-wrap justify-around pt-4">
                {
                    brands && brands.length > 0 && brands.map(brand => (
                        <Link href={`/brands/${brand.name}`} key={brand.id} onClick={() => handleBrandClick(brand.id, brand.name)}>
                            <Card
                              imageUrl={`${API_URL}/images/brand/${brand.imageUrl}`}
                              name={brand.name}
                            />
                          </Link>
                    ))
                }
            </div>
        </Container>
    )
}