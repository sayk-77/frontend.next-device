'use client'

import { cn } from '@/lib/utils'
import axios from 'axios'
import { Search } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { useClickAway, useDebounce } from 'react-use'
import Image from 'next/image'
import useBrandStore from '@/store/storeBrand'
import { useRouter } from 'next/navigation'

interface Props {
    className?: string
}

interface SearchResult {
    id: number
    name: string
    title?: string
    image?: string
    imageUrl?: string
    categoryImage?: string
    searchName?: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

const fetchSearchResults = async (query: string) => {
    try {
        const response = await axios.get(`${API_URL}/search`, {
            params: { query, limit: 10, offset: 0 }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching search results:", error);
        throw error;
    }
};

export const SearchInput: React.FC<Props> = ({ className }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [focused, setFocused] = useState<boolean>(false);
    const [results, setResults] = useState<{
        products: SearchResult[]
        brands: SearchResult[]
        categories: SearchResult[]
    }>({
        products: [],
        brands: [],
        categories: []
    });
    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter()
    
    const setBrandId = useBrandStore(state => state.setBrandId);
    const setBrandName = useBrandStore(state => state.setBrandName);
    
    const pressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && searchQuery.trim()) {
            router.push(`/search/${searchQuery}`);
            setSearchQuery('');
            setFocused(false);
            setResults({ products: [], brands: [], categories: [] });
        }
    };
    
    const handleBrandClick = (id: number, name: string) => {
        setBrandId(id);
        setBrandName(name);
        onClickItem()
    };
    
    useDebounce(
        async () => {
            const fetchResults = async () => {
                if (searchQuery) {
                    try {
                        const data = await fetchSearchResults(searchQuery);
                        console.log(data?.brands)
                        setResults(data);
                    } catch (error) {
                        console.error(error);
                        setResults({ products: [], brands: [], categories: [] });
                    }
                } else {
                    setResults({ products: [], brands: [], categories: [] });
                }
            };
            fetchResults();
        }, 250, [searchQuery]
    );

    useClickAway(ref, () => {
        setFocused(false);
    });

    const onClickItem = () => {
        setFocused(false);
        setSearchQuery('');
        setResults({ products: [], brands: [], categories: [] });
    }
    
    const hasResults = results?.products?.length > 0 || results?.brands?.length > 0 || results?.categories?.length > 0;

    return (
        <div className='relative z-40'>
            {focused && (
                <div className="fixed inset-0 bg-black opacity-30 z-20" />
            )}
            <div className={cn(className, 'flex rounded-2xl flex-1 justify-between relative h-11 z-30')} ref={ref}>
                <Search className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400' />
                <input
                    type="text"
                    name="searchInput"
                    className='rounded-2xl outline-none w-full bg-gray-100 pl-11'
                    placeholder='Поиск...'
                    onFocus={() => setFocused(true)}
                    value={searchQuery}
                    autoComplete="off"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={pressEnter}
                />
                
                {focused && hasResults && (
                    <div
                        className={cn(
                            'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 z-30',
                            focused ? 'visible opacity-100' : 'invisible opacity-0'
                        )}>
                        {results.products && results.products.length > 0 && results.products.slice(0, 10).map((item) => (
                            <Link href={`/product/${item.searchName}`} key={item.id} onClick={onClickItem}>
                                <div className='py-4 px-4 hover:bg-gray-100 cursor-pointer flex items-center'>
                                    {item.image && (
                                        <Image 
                                            src={`${API_URL}/images/product/${item.image}`} 
                                            alt={item.name} 
                                            className='h-10 w-10 mr-2 object-contain'
                                            width={40}
                                            height={40}
                                        />
                                    )}
                                    <span>{item.name}</span>
                                </div>
                            </Link>
                        ))}
    
                        {results.brands && results.brands.length > 0 && results.brands.slice(0, 10).map((item) => (
                            <Link href={`/brands/${item.name}`} key={item.id} onClick={() => handleBrandClick(item.id, item.name)}>
                                <div className='py-4 px-4 hover:bg-gray-100 cursor-pointer flex items-center'>
                                    {item.imageUrl && (
                                        <Image 
                                            src={`${API_URL}/images/brand/${item.imageUrl}`} 
                                            alt={item.name} 
                                            className='h-10 w-10 mr-2 object-contain'
                                            width={40} 
                                            height={40} 
                                        />
                                    )}
                                    <span>{item.name}</span>
                                </div>
                            </Link>
                        ))}
    
                        {results.categories && results.categories.length > 0 && results.categories.slice(0, 10).map((item) => (
                            <Link href={`/category/${item.name}`} key={item.id} onClick={onClickItem}>
                                <div className='py-4 px-4 hover:bg-gray-100 cursor-pointer flex items-center'>
                                    {item.categoryImage && (
                                        <Image 
                                            src={`${API_URL}/images/category/${item.categoryImage}`} 
                                            alt={item.name} 
                                            className='h-10 w-10 mr-2 object-contain'
                                            width={40} 
                                            height={40} 
                                        />
                                    )}
                                    <span>{item.title}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}