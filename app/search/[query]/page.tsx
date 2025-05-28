import { Container } from '@/components/shared';
import Image from 'next/image';
import Link from 'next/link';

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

interface Props {
    params: {
        query: string;
    };
}

async function fetchSearchResults(query: string) {
    try {
        const res = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}&limit=20&offset=0`);
        if (!res.ok) {
            throw new Error('Failed to fetch');
        }
        return await res.json();
    } catch (e) {
        console.error("Error fetching search results:", e);
        return { products: [], brands: [], categories: [] };
    }
}

const SearchResultsPage = async ({ params }: Props) => {
    const query = decodeURIComponent(params.query);
    const results = await fetchSearchResults(query);

    return (
        <Container className="flex flex-col items-center">
            <h1 className="text-2xl font-semibold mt-[20px] mb-[20px]">Результаты поиска для: "{query}"</h1>

            <div className="space-y-8">
                {results.products?.length > 0 && (
                    <div>
                        <h2 className="text-[20px] font-semibold mb-[10px] ml-[30px]">Товары</h2>
                        <div className="flex flex-wrap gap-[100px] justify-center">
                            {results.products.map((item: SearchResult) => (
                                <Link href={`/product/${item.searchName}`} key={item.id} className="flex flex-col items-center w-[150px]">
                                    {item.image && (
                                       <div className="relative w-[150px] h-[150px]">
                                           <Image
                                               src={`${API_URL}/images/product/${item.image}`}
                                               alt={item.name}
                                               fill
                                               style={{ objectFit: 'contain' }}
                                               sizes="150px"
                                               priority={false}
                                           />
                                       </div>
                                    )}
                                    <span className="text-center font-medium mt-2">{item.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {results.brands?.length > 0 && (
                    <div>
                        <h2 className="text-[20px] ml-[30px] font-semibold mb-2">Бренды</h2>
                        <div className="flex flex-wrap gap-4 mb-[50px] justify-center">
                            {results.brands.map((item: SearchResult) => (
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

                {results.categories?.length > 0 && (
                    <div>
                        <h2 className="text-[20px] ml-[30px] font-semibold mb-2">Категории</h2>
                        <div className="flex flex-wrap gap-4 justify-center">
                            {results.categories.map((item: SearchResult) => (
                                <Link href={`/category/${item.name}`} key={item.id} className="flex flex-col items-center w-[150px]">
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
