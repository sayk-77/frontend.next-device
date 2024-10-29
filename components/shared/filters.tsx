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
  discountPrice: number
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

export const Filters: React.FC<Props> = ({ className, onFilterChange }) => {
  const [prices, setPrice] = useState<PriceProps>({ priceFrom: 0, priceTo: 1000000 });
  const [screenSize, setScreenSize] = useState<ScreenSizeProps>({ screenFrom: 0, screenTo: 10 });
  const [brands, setBrands] = useState<Set<string>>(new Set());
  const [memories, setMemories] = useState<Set<string>>(new Set());
  const [ram, setRam] = useState<Set<string>>(new Set());
  const [cameraQualities, setCameraQualities] = useState<Set<string>>(new Set());
  const [os, setOs] = useState<Set<string>>(new Set());

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
      cameraQualities: Array.from(cameraQualities),
      os: Array.from(os),
    };

    console.log('Отправка фильтров:', filters);

    try {
      const response = await axios.post(`${API_URL}/product/${category}/query`, filters);
      onFilterChange(response.data);
      console.log('Ответ от сервера:', response.data);
    } catch (error) {
      console.error('Ошибка при отправке фильтров:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFilteredProducts();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
  };

  return (
    <div className={cn('', className)}>
      <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Title text='Бренд' size='xs' className='font-medium' />
          <CheckboxFiltersGroup
            name='brands'
            items={[
              { text: 'Apple', value: 'Apple' },
              { text: 'Samsung', value: 'Samsung' },
              { text: 'Xiaomi', value: 'Xiaomi' },
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
              min={0}
              max={10}
              step="0.1"
              value={String(screenSize.screenFrom)}
              onChange={(e) => updateScreenSize('screenFrom', Number(e.target.value))}
              className='w-24'
            />
            <Input
              type='number'
              min={0}
              max={10}
              step="0.1"
              placeholder='До'
              value={String(screenSize.screenTo)}
              onChange={(e) => updateScreenSize('screenTo', Number(e.target.value))}
              className='w-24'
            />
          </div>
        </div>

        <div className="mt-4 border-t border-t-neutral-100 py-4">
          <Title size='xs' className='font-medium' text='Цена от и до:' />
          <div className='flex gap-2 mb-4'>
            <Input
              type='number'
              placeholder='0'
              min={0}
              max={1000000}
              value={String(prices.priceFrom)}
              onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
              className='w-24'
            />
            <Input
              type='number'
              min={100}
              max={1000000}
              placeholder='1000000'
              value={String(prices.priceTo)}
              onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
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
              { text: '64 GB', value: '64' },
              { text: '128 GB', value: '128' },
              { text: '256 GB', value: '256' },
              { text: '512 GB', value: '512' },
              { text: '1 ТБ', value: '1024' },
            ]}
            selectedValues={memories}
            onCheckboxChange={(value) => toggleCheckbox(setMemories, value)}
          />
        </div>

        <div className="mt-4">
          <Title text='Качество камеры' size='xs' className='font-medium' />
          <CheckboxFiltersGroup
            name='cameraQualities'
            items={[
              { text: '12 MP', value: '12' },
              { text: '48 MP', value: '48' },
              { text: '108 MP', value: '108' },
            ]}
            selectedValues={cameraQualities}
            onCheckboxChange={(value) => toggleCheckbox(setCameraQualities, value)}
          />
        </div>

        <div className="mt-4">
          <Title text='Операционная система' size='xs' className='font-medium' />
          <CheckboxFiltersGroup
            name='os'
            items={[
              { text: 'Android', value: 'Android' },
              { text: 'IOS', value: 'iOS' },
            ]}
            selectedValues={os}
            onCheckboxChange={(value) => toggleCheckbox(setOs, value)}
          />
        </div>

        <div className='mt-6'>
          <Button type='submit' className='w-full'>
            Применить фильтры
          </Button>
        </div>
      </form>
    </div>
  );
};