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
      <div className="mt-8 w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Характеристики</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          {specs.map(({ label, value }, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">{label}</span>
                {value ? (
                    <span className="text-base font-semibold text-gray-800">{value}</span>
                ) : (
                    <Skeleton className="w-full h-5 mt-1" />
                )}
              </div>
          ))}
        </div>
      </div>
  );
};

export default ProductDetails;
