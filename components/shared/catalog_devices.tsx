'use client'

import { CategoryCard} from "@/components/shared"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Categories {
    category: {
        id: number
        name: string
        title: string
        categoryImage: string
    }
    count: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const CatalogDevices = () => {
    const [category, setCategory] = useState<Categories[]>([])
    
    useEffect(() => {
        const getCategory = async () => {
            try {
                const response = await axios.get(`${API_URL}/categories/count`)
                setCategory(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        getCategory()
    }, [])
    
    return (
        <div className="flex flex-wrap gap-5 justify-between">
            {category.map(category => (
                <Link
                    href={`/catalog/${category.category.title}`}
                    key={category.category.id}
                    className="hover:text-orange-500"
                >
                        <CategoryCard
                            id={category.category.id}
                            name={category.category.name}
                            title={category.category.title}
                            count={category.count}
                            link={`/catalog/${category.category.name}`}
                            imageUrl={`${API_URL}/images/category/${category.category.categoryImage}`}
                        />
                </Link>
            ))}
        </div>
    )
}