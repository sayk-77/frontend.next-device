'use client'
import { AutoScrollCarousel, CategoryCard, Container, ProductsGroupList, Title } from "@/components/shared";
import Breadcrumbs from "@/components/shared/breadCrumb";
import useBrandStore from "@/store/storeBrand";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Category {
    id: number
    name: string
    title: string
}

interface BrandCategory {
    category: Category
    count: number
    images_category: string
}

interface BrandBanner {
    id: number
    title: string
    imageUrl: string
}

interface BrandInfo {
    id: number
    name: string
    imageUrl: string
    banners: BrandBanner[]
}

interface Product {
    id: number
    name: string
    searchName: string
    description: string
    price: number
    image: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function PageBrand() {
    const [brandCategory, setBrandCategory] = useState<BrandCategory[]>([])
    const [brandInfo, setBrandInfo] = useState<BrandInfo>({} as BrandInfo)
    const [discrountProduct, setDiscountProduct] = useState<Product[]>([])
    
    const {brandId, brandName} = useBrandStore();
    
    useEffect(() => {
        const getBrandCategory = async () => {
            try {
                const response = await axios.get(`${API_URL}/brands/${brandId}/category`)
                setBrandCategory(response.data.categories)
                console.log(response.data.categories)
            } catch (err) {
                console.log(err)
            }
        }
        const getBrandInfo = async () => {
            try {
                const response = await axios.get(`${API_URL}/brands/${brandId}`)
                setBrandInfo(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        const getNewProduct = async () => {
            try {
                const response = await axios.get(`${API_URL}/catalog/discounts`, {
                    params: {limit: 5}
                })
                setDiscountProduct(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        
        getBrandCategory()
        getBrandInfo()
        getNewProduct()
    }, [brandId, brandName])

    return (
        <Container>
            <Breadcrumbs className="pt-[10px]"/>
            <div className="flex flex-col items-center">
                <Image 
                    src={`${API_URL}/images/brand/${brandInfo.imageUrl}`}
                    className="m-auto pt-[10px]"
                    width={300}
                    height={300}
                    alt={`${brandInfo.name} logo`}
                />
                <Title text={brandName} className="text-[32px] font-extrabold"/>
            </div>
            {
                brandInfo.banners && brandInfo.banners.length > 0 && <AutoScrollCarousel carouselItems={brandInfo.banners}/>
            }
            
            <Title className="pt-[50px] pb-[30px] text-[32px]" text="Категории"/>
            
            <div className="flex text-center gap-[50px] pb-[50px]">
                {brandCategory.map((item) => (
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
                products={discrountProduct}
                categoryUrl="/brands/new"
                className="pb-[30px]"
            />
        </Container>
    )
}