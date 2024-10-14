'use client'

import Image from 'next/image';
import Link from 'next/link';

import useBrandStore from '@/store/storeBrand';

interface CategoryCardProps {
    id: number
    name: string
    count: string
    title: string
    imageUrl: string
}

export const CategoryCard: React.FC<CategoryCardProps> = ({id, name, count, imageUrl, title }) => {
    const {brandId, brandName} = useBrandStore()
    
    return (
        <Link href={`/brands/${brandName}/category/${name}`}>
            <div className="flex flex-col items-center p-4 bg-white border rounded-lg shadow-md w-52 h-52 hover:text-orange-500">
                    <div className="relative w-full h-32 mb-2">
                        <Image
                            src={imageUrl}
                            alt={name}
                            layout="fill"
                            className="object-contain rounded-lg"
                        />
                    </div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-gray-500">({count})</p>
            </div>
        </Link>
    );
};
