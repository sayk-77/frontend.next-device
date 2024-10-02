'use client'
import { useEffect, useState } from "react";

interface CarouselItem {
  id: number;
  imagePath: string;
  title: string;
}

interface AutoScrollCarouselProps {
  carouselItems: CarouselItem[];
}

export const AutoScrollCarousel: React.FC<AutoScrollCarouselProps> = ({ carouselItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselItems.length]);

  return (
    <div className="relative w-full max-w-[1200px] h-[600px] overflow-hidden rounded-2xl mt-10 mx-auto">
      {carouselItems.map((item, index) => (
        <div
          key={item.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={item.imagePath}
            alt={item.title}
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
