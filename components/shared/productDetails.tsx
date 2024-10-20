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
    <div className="space-y-3 mt-[10px]">
      {specs.map(({ label, value }, index) => (
        <div className="flex items-center" key={label}>
          <p className="flex-none text-lg text-gray-800">{label}:</p>
          <div className="flex-grow flex items-center relative ml-2">
            <div className="flex-grow border-b border-dotted border-gray-400 mr-2" />
            <p className="relative z-10 text-right whitespace-nowrap">
              {value ? value : <Skeleton className="w-1/2" />}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDetails;