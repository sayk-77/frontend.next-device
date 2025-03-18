import React from 'react';
import { Skeleton } from '../ui';

interface ProductDetailsProps {
  details?: {
    processor: string;
    ram: string;
    storage: string;
    display: string;
    camera: string;
    battery: string;
    os: string;
    dimensions: string;
    weight: string;
  };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ details }) => {
  const specs = [
    { label: 'Процессор', value: details?.processor },
    { label: 'Оперативная память', value: details?.ram },
    { label: 'Память', value: details?.storage },
    { label: 'Дисплей', value: details?.display },
    { label: 'Основная камера', value: details?.camera },
    { label: 'Батарея', value: details?.battery },
    { label: 'Операционная система', value: details?.os },
    { label: 'Размеры', value: details?.dimensions },
    { label: 'Вес', value: details?.weight },
  ];

  return (
      <div className="space-y-2 mt-6">
        {specs.map(({ label, value }, index) => (
            <div key={index} className="space-y-2">
              <p className="text-black font-bold text-base md:text-[20px]">{label}</p>
              <div>
                {value ? (
                    <p className="text-gray-600 text-[18px] md:text-[20px]">{value}</p>
                ) : (
                    <Skeleton className="w-full h-6 mx-auto" />
                )}
              </div>
            </div>
        ))}
      </div>
  );
};

export default ProductDetails;