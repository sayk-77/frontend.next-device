'use client'
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import qs from 'qs'
import { Title, CheckboxFiltersGroup, RangeSlider } from './index'
import { Input } from '../ui'

interface Props {
  className?: string
}

interface PriceProps {
  priceFrom: number; // Обязательно
  priceTo: number;   // Обязательно
}

export const Filters: React.FC<Props> = ({ className }) => {
  const [prices, setPrice] = useState<PriceProps>({ priceFrom: 0, priceTo: 10000 });
  const [brands, setBrands] = useState<Set<string>>(new Set());
  const [screenSizes, setScreenSizes] = useState<Set<string>>(new Set());
  const [memories, setMemories] = useState<Set<string>>(new Set());
  const [ram, setRam] = useState<Set<string>>(new Set());
  const [ratings, setRatings] = useState<Set<string>>(new Set());
  const [cameraQualities, setCameraQualities] = useState<Set<string>>(new Set());

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice({ ...prices, [name]: value });
  }

  const toggleCheckbox = (set: React.Dispatch<React.SetStateAction<Set<string>>>, value: string) => {
    set((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return newSet;
    });
  }

  useEffect(() => {
    const filters = {
      ...prices,
      brands: Array.from(brands),
      screenSizes: Array.from(screenSizes),
      memories: Array.from(memories),
      ram: Array.from(ram),
      ratings: Array.from(ratings),
      cameraQualities: Array.from(cameraQualities),
    };

    const queryString = qs.stringify(filters, { arrayFormat: 'comma' });
    window.history.replaceState(null, '', `?${queryString}`);
  }, [prices, brands, screenSizes, memories, ram, ratings, cameraQualities]);

  return (
    <div className={cn('', className)}>
      <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

      <div className="mb-4">
        <Title text='Бренд' size='xs' className='font-medium' />
        <CheckboxFiltersGroup
          name='brands'
          items={[
            { text: 'Apple', value: 'apple' },
            { text: 'Samsung', value: 'samsung' },
            { text: 'Xiaomi', value: 'xiaomi' },
          ]}
          selectedValues={brands}
          onCheckboxChange={(value) => toggleCheckbox(setBrands, value)}
        />
      </div>

      <div className="mb-4">
        <Title text='Размер экрана' size='xs' className='font-medium' />
        <CheckboxFiltersGroup
          name='screenSizes'
          items={[
            { text: '5-6 дюймов', value: '5-6' },
            { text: '6-7 дюймов', value: '6-7' },
            { text: 'Более 7 дюймов', value: '7+' },
          ]}
          selectedValues={screenSizes}
          onCheckboxChange={(value) => toggleCheckbox(setScreenSizes, value)}
        />
      </div>

      <div className="mt-4 border-t border-t-neutral-100 py-4">
        <Title size='xs' className='font-medium' text='Цена от и до:' />
        <div className='flex gap-2 mb-4'>
          <Input
            type='number'
            placeholder='0'
            min={0}
            max={10000}
            value={String(prices.priceFrom)}
            onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
            className='w-24'
          />
          <Input
            type='number'
            min={100}
            max={10000}
            placeholder='10000'
            value={String(prices.priceTo)}
            onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
            className='w-24'
          />
        </div>
        <RangeSlider
          className='cursor-pointer'
          min={0}
          max={10000}
          step={100}
          value={[prices.priceFrom, prices.priceTo]}
          onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })}
        />
      </div>

      <div className="mt-4">
        <Title text='Оперативная память' size='xs' className='font-medium' />
        <CheckboxFiltersGroup
          name='ram'
          items={[
            { text: '4 GB', value: '4gb' },
            { text: '8 GB', value: '8gb' },
            { text: '16 GB', value: '16gb' },
          ]}
          selectedValues={ram}
          onCheckboxChange={(value) => toggleCheckbox(setRam, value)}
        />
      </div>

      <div className="mt-4">
        <Title text='Емкость батареи' size='xs' className='font-medium' />
        <CheckboxFiltersGroup
          name='memories'
          items={[
            { text: '64 GB', value: '64gb' },
            { text: '128 GB', value: '128gb' },
            { text: '256 GB', value: '256gb' },
            { text: '512 GB', value: '512gb' },
            { text: '1 ТБ', value: '1tb' },
          ]}
          selectedValues={memories}
          onCheckboxChange={(value) => toggleCheckbox(setMemories, value)}
        />
      </div>

      <div className="mt-4">
        <Title text='Рейтинг' size='xs' className='font-medium' />
        <CheckboxFiltersGroup
          name='ratings'
          items={[
            { text: '5', value: '5' },
            { text: '4.5 и выше', value: '4.5' },
            { text: '4 и выше', value: '4' },
          ]}
          selectedValues={ratings}
          onCheckboxChange={(value) => toggleCheckbox(setRatings, value)}
        />
      </div>

      <div className="mt-4">
        <Title text='Качество камеры' size='xs' className='font-medium' />
        <CheckboxFiltersGroup
          name='cameraQualities'
          items={[
            { text: '12 MP', value: '12mp' },
            { text: '48 MP', value: '48mp' },
            { text: '108 MP', value: '108mp' },
          ]}
          selectedValues={cameraQualities}
          onCheckboxChange={(value) => toggleCheckbox(setCameraQualities, value)}
        />
      </div>
    </div>
  )
}