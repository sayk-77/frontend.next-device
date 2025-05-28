import { Container, ProductCard, Title } from "@/components/shared";
import axios from "axios";
import CatalogClient from "@/components/shared/CatalogClient";

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

async function getProductsByCategory(category: string): Promise<Product[]> {
    try {
        const response = await axios.get(`${API_URL}/catalog/${category}`);
        return response.data;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export default async function CatalogCategoryPage({ params }: { params: { category: string } }) {
    const products = await getProductsByCategory(params.category);
    const categoryTitle = products.length > 0 ? products[0].categoryTitle : "";

    return (
        <Container>
            <div className={"flex items-center gap-3 pt-[20px] pl-2 justify-between"}>
                <Title text={categoryTitle} className="text-[28px]" />
            </div>

            <CatalogClient category={params.category} initialProducts={products} />
        </Container>
    );
}