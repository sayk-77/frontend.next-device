'use client'
import Image from "next/image";
import { useEffect, useState } from "react";

interface CarouselItem {
  id: number;
  imageUrl: string;
  title: string;
}

interface AutoScrollCarouselProps {
  carouselItems: CarouselItem[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL_IMAGE_BANNER

export const AutoScrollCarousel: React.FC<AutoScrollCarouselProps> = ({ carouselItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselItems.length]);

  return (
    <div className="relative w-full max-w-[1000px] h-[500px] overflow-hidden rounded-2xl mt-10 mx-auto">
      {carouselItems.map((item, index) => (
        <div
          key={item.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={`${API_URL}${item.imageUrl}`}
            alt={item.title}
            fill
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
            <h2 className="text-[16px] font-bold">{item.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};
