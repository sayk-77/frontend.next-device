import ClientBrandPage from "@/components/shared/ClientBrandPage";


interface BrandCategory {
    category: {
        id: number;
        name: string;
        title: string;
    };
    count: number;
    images_category: string;
}

interface BrandBanner {
    id: number;
    title: string;
    imageUrl: string;
}

interface BrandInfo {
    id: number;
    name: string;
    imageUrl: string;
    banners: BrandBanner[];
}

interface Product {
    id: number;
    name: string;
    searchName: string;
    description: string;
    discountPrice: number;
    price: number;
    image: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface PageBrandProps {
    params: {
        name: string;
    };
}

export default async function PageBrand({ params }: PageBrandProps) {
    const { name } = params;

    const brandRes = await fetch(`${API_URL}/brands/${name}`);
    if (!brandRes.ok) throw new Error("Не удалось получить бренд");
    const brandInfo: BrandInfo = await brandRes.json();

    const brandId = brandInfo.id;

    const [categoryRes, productRes] = await Promise.all([
        fetch(`${API_URL}/brands/${brandId}/category`),
        fetch(`${API_URL}/catalog/discounts?limit=5&brand=${name}`),
    ]);

    if (!categoryRes.ok || !productRes.ok) throw new Error("Ошибка загрузки данных");

    const categoryData = await categoryRes.json();
    const discountProducts: Product[] = await productRes.json();

    const brandCategories: BrandCategory[] = categoryData.categories;

    return (
        <ClientBrandPage
            brandInfo={brandInfo}
            brandCategories={brandCategories}
            discountProducts={discountProducts}
            brandName={name}
            brandId={brandId}
        />
    );
}
