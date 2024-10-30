'use client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Title, CheckboxFiltersGroup, RangeSlider } from './index';
import { Button, Input } from '../ui';
import axios from 'axios';

interface Props {
  className?: string;
  onFilterChange: (filteredProducts: Product[]) => void;
}

interface Product {
  id: number;
  name: string;
  searchName: string;
  description: string;
  categoryTitle: string;
  discountPrice: number;
  image: string;
  price: number;
}

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

interface ScreenSizeProps {
  screenFrom: number;
  screenTo: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const LaptopFilters: React.FC<Props> = ({ className, onFilterChange }) => {
  const [prices, setPrice] = useState<PriceProps>({ priceFrom: 0, priceTo: 200000 });
  const [screenSize, setScreenSize] = useState<ScreenSizeProps>({ screenFrom: 10, screenTo: 17 });
  const [brands, setBrands] = useState<Set<string>>(new Set());
  const [memories, setMemories] = useState<Set<string>>(new Set());
  const [ram, setRam] = useState<Set<string>>(new Set());
  const [gpuType, setGpuType] = useState<Set<string>>(new Set());
  const [cpuType, setCpuType] = useState<Set<string>>(new Set()); // Новое состояние для типа процессора

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice({ ...prices, [name]: value });
  };

  const updateScreenSize = (name: keyof ScreenSizeProps, value: number) => {
    setScreenSize({ ...screenSize, [name]: value });
  };

  const toggleCheckbox = (
    set: React.Dispatch<React.SetStateAction<Set<string>>>,
    value: string | number
  ) => {
    set((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(String(value))) {
        newSet.delete(String(value));
      } else {
        newSet.add(String(value));
      }
      return newSet;
    });
  };

  const fetchFilteredProducts = async () => {
    const currentUrl = window.location.href;
    const category = window.location.pathname.split('/').pop();

    const filters = {
      priceFrom: prices.priceFrom,
      priceTo: prices.priceTo,
      screenFrom: screenSize.screenFrom,
      screenTo: screenSize.screenTo,
      brands: Array.from(brands),
      memories: Array.from(memories),
      ram: Array.from(ram),
      gpuType: Array.from(gpuType),
      cpuType: Array.from(cpuType), // Добавление типа процессора в фильтры
    };

    try {
      const response = await axios.post(`${API_URL}/product/${category}/query`, filters);
      onFilterChange(response.data);
    } catch (error) {
      console.error('Ошибка при отправке фильтров:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFilteredProducts();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  const resetFilters = () => {
    setPrice({ priceFrom: 0, priceTo: 200000 });
    setScreenSize({ screenFrom: 10, screenTo: 17 });
    setBrands(new Set());
    setMemories(new Set());
    setRam(new Set());
    setGpuType(new Set());
    setCpuType(new Set());
  };

  return (
    <div className={cn('', className)}>
      <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

      <form onSubmit={handleSubmit}>
        <div className="mt-4 border-t border-t-neutral-100 py-4">
          <Title size='xs' className='font-medium' text='Цена от и до:' />
          <div className='flex gap-2 mb-4'>
            <Input
              type='number'
              placeholder='0'
              min={0}
              max={200000}
              value={String(prices.priceFrom)}
              onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
              className='w-24'
            />
            <Input
              type='number'
              min={1000}
              max={200000}
              placeholder='200000'
              value={String(prices.priceTo)}
              onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
              className='w-24'
            />
          </div>
        </div>

        <div className="mb-4">
          <Title text='Бренд' size='xs' className='font-medium' />
          <CheckboxFiltersGroup
            name='brands'
            items={[
              { text: 'Honor', value: 'Honor' },
              { text: 'Acer', value: 'Acer' },
              { text: 'Samsung', value: 'Samsung' },
            ]}
            selectedValues={brands}
            onCheckboxChange={(value) => toggleCheckbox(setBrands, value)}
          />
        </div>

        <div className="mb-4">
          <Title text='Размер экрана от и до:' size='xs' className='font-medium' />
          <div className='flex gap-2 mb-4'>
            <Input
              type='number'
              placeholder='От'
              min={10}
              max={17}
              step="0.1"
              value={String(screenSize.screenFrom)}
              onChange={(e) => updateScreenSize('screenFrom', Number(e.target.value))}
              className='w-24'
            />
            <Input
              type='number'
              min={10}
              max={17}
              step="0.1"
              placeholder='До'
              value={String(screenSize.screenTo)}
              onChange={(e) => updateScreenSize('screenTo', Number(e.target.value))}
              className='w-24'
            />
          </div>
        </div>

        <div className="mt-4">
          <Title text='Оперативная память' size='xs' className='font-medium' />
          <CheckboxFiltersGroup
            name='ram'
            items={[
              { text: '4 GB', value: '4' },
              { text: '8 GB', value: '8' },
              { text: '16 GB', value: '16' },
              { text: '32 GB', value: '32' },
            ]}
            selectedValues={ram}
            onCheckboxChange={(value) => toggleCheckbox(setRam, value)}
          />
        </div>

        <div className="mt-4">
          <Title text='Постоянная память' size='xs' className='font-medium' />
          <CheckboxFiltersGroup
            name='memories'
            items={[
              { text: '128 GB', value: '128' },
              { text: '256 GB', value: '256' },
              { text: '512 GB', value: '512' },
              { text: '1 ТБ', value: '1024' },
              { text: '2 ТБ', value: '2048' },
            ]}
            selectedValues={memories}
            onCheckboxChange={(value) => toggleCheckbox(setMemories, value)}
          />
        </div>
        
        <div className="mt-4">
          <Title text='Тип процессора' size='xs' className='font-medium' />
          <CheckboxFiltersGroup
            name='cpuType'
            items={[
              { text: 'Intel', value: 'Intel' },
              { text: 'AMD', value: 'AMD' },
            ]}
            selectedValues={cpuType}
            onCheckboxChange={(value) => toggleCheckbox(setCpuType, value)}
          />
        </div>

        <div className="mt-4">
          <Title text='Тип видеокарты' size='xs' className='font-medium' />
          <CheckboxFiltersGroup
            name='gpuType'
            items={[
              { text: 'Интегрированная', value: 'integrated' },
              { text: 'Дискретная', value: 'discrete' },
            ]}
            selectedValues={gpuType}
            onCheckboxChange={(value) => toggleCheckbox(setGpuType, value)}
          />
        </div>

        <div className='mt-6 flex justify-between'>
          <Button type='submit'>
            Применить 
          </Button>
          <Button variant="link" onClick={resetFilters}>
            Сбросить
          </Button>
        </div>
      </form>
    </div>
  );
};