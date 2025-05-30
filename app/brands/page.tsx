import { Container } from "@/components/shared";
import BrandsClient from "@/components/shared/BrandsClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getBrands() {
    const res = await fetch(`${API_URL}/brands`);
    if (!res.ok) throw new Error("Failed to fetch brands");
    return res.json();
}

export default async function BrandsPage() {
    const brands = await getBrands();

    return (
        <Container>
            <BrandsClient brands={brands} />
        </Container>
    );
}