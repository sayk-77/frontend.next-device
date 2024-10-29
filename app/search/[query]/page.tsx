'use client';

import { Container } from '@/components/shared';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface SearchResult {
    id: number;
    name: string;
    title?: string;
    image?: string;
    imageUrl?: string;
    categoryImage?: string;
    searchName?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchSearchResults = async (query: string) => {
    try {
        const response = await axios.get(`${API_URL}/search`, {
            params: { query, limit: 20, offset: 0 }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching search results:", error);
        return { products: [], brands: [], categories: [] };
    }
};

interface Props {
    params: {
        query: string;
    };
}

const SearchResultsPage = ({ params }: Props) => {
    const { query } = params;
    const [results, setResults] = useState<{
        products: SearchResult[];
        brands: SearchResult[];
        categories: SearchResult[];
    }>({ products: [], brands: [], categories: [] });

    useEffect(() => {
        const fetchResults = async () => {
            if (query) {
                const data = await fetchSearchResults(query);
                setResults(data);
            }
        };
        fetchResults();
    }, [query]);

    return (
        <Container>
            <h1 className="text-2xl font-semibold mt-[20px] mb-[20px]">Результаты поиска для: "{query}"</h1>

            <div className="space-y-8">
                {results.products && results.products.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-[10px]">Товары</h2>
                        <div className="flex flex-wrap gap-[100px]">
                            {results.products.map(item => (
                                <Link href={`/product/${item.searchName}`} key={item.id} className="flex flex-col items-center w-[150px]">
                                    {item.image && (
                                        <Image
                                            src={`${API_URL}/images/product/${item.image}`}
                                            alt={item.name}
                                            className='h-[150px] w-[150px] object-contain'
                                            width={150} 
                                            height={150} 
                                        />
                                    )}
                                    <span className="text-center font-medium mt-2">{item.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {results.brands && results.brands.length > 0 && (
                    <div className=''>
                        <h2 className="text-xl font-semibold mb-2">Бренды</h2>
                        <div className="flex flex-wrap gap-4 mb-[50px]">
                            {results.brands.map(item => (
                                <Link href={`/brands/${item.name}`} key={item.id} className="flex flex-col items-center w-[150px]">
                                    {item.imageUrl && (
                                        <Image
                                            src={`${API_URL}/images/brand/${item.imageUrl}`}
                                            alt={item.name}
                                            width={150}
                                            height={150}
                                            className="object-contain"
                                        />
                                    )}
                                    <span className="text-center font-medium mt-2">{item.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {results.categories && results.categories.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Категории</h2>
                        <div className="flex flex-wrap gap-4">
                            {results.categories.map(item => (
                                <Link href={`/category/${item.name}`} key={item.id} className="flex flex-col items-center w-[150px]">
                                    <div className="">
                                        {item.categoryImage && (
                                            <Image
                                                src={`${API_URL}/images/category/${item.categoryImage}`}
                                                alt={item.name}
                                                width={150}
                                                height={150}
                                                className="object-contain"
                                            />
                                        )}
                                        <span className="text-center font-medium mt-2">{item.title || item.name}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default SearchResultsPage;