'use client'

import { Card } from "@/components/shared";
import Link from "next/link";
import useBrandStore from "@/store/storeBrand";

interface Brand {
    id: number;
    imageUrl: string;
    name: string;
}

interface BrandsClientProps {
    brands: Brand[];
}

export default function BrandsClient({ brands }: BrandsClientProps) {
    const setBrandId = useBrandStore(state => state.setBrandId);
    const setBrandName = useBrandStore(state => state.setBrandName);

    const handleBrandClick = (id: number, name: string) => {
        setBrandId(id);
        setBrandName(name);
    };

    return (
        <div className="flex gap-2 flex-wrap justify-around pt-4">
            {brands.map(brand => (
                <Link
                    href={`/brands/${brand.name}`}
                    key={brand.id}
                    onClick={() => handleBrandClick(brand.id, brand.name)}
                >
                    <Card
                        imageUrl={`${process.env.NEXT_PUBLIC_API_URL}/images/brand/${brand.imageUrl}`}
                        name={brand.name}
                    />
                </Link>
            ))}
        </div>
    );
}