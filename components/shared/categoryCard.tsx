import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
    id: number
    name: string
    count: string
    title: string
    imageUrl: string
    link: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({id, name, count, imageUrl, title, link }) => {
        return (
        <Link href={link}>
            <div className="w-32 h-40 sm:w-40 sm:h-44 md:w-48 md:h-50 lg:w-52 lg:h-56 flex flex-col items-center p-4 bg-white border rounded-lg shadow-md hover:text-orange-500 transition-all">
                <div className="relative w-full h-24 sm:h-28 md:h-32 lg:h-36 mb-2">
                    <Image
                        src={imageUrl}
                        alt={name}
                        layout="fill"
                        className="object-contain rounded-lg"
                    />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-semibold">{title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm md:text-base">({count})</p>
            </div>
        </Link>
    );
};
