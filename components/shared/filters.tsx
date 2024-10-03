'use client'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Title, FilterCheckbox, RangeSlider, CheckboxFiltersGroup } from './index'
import { Input } from '../ui'

interface Props {
  className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
  const [isBrandsOpen, setIsBrandsOpen] = useState(true)
  const [isDeviceTypeOpen, setIsDeviceTypeOpen] = useState(true)
  const [isScreenSizesOpen, setIsScreenSizesOpen] = useState(true)
  const [isMemoryOpen, setIsMemoryOpen] = useState(true)

  const toggleBrands = () => setIsBrandsOpen(!isBrandsOpen)
  const toggleDeviceType = () => setIsDeviceTypeOpen(!isDeviceTypeOpen)
  const toggleScreenSizes = () => setIsScreenSizesOpen(!isScreenSizesOpen)
  const toggleMemory = () => setIsMemoryOpen(!isMemoryOpen)

  return (
    <div className={cn('', className)}>
      <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

      <div className="mb-5">
        <div className='flex justify-between items-center'>
          <Title text='Бренд' size='sm' className='font-bold' />
          <button onClick={toggleBrands}>{isBrandsOpen ? 'Свернуть' : 'Развернуть'}</button>
        </div>
        {isBrandsOpen && (
          <CheckboxFiltersGroup
            name='brands'
            title='Производитель'
            items={[
              { text: 'Apple', value: 'apple' },
              { text: 'Samsung', value: 'samsung' },
              { text: 'Xiaomi', value: 'xiaomi' },
            ]}
          />
        )}
      </div>

      <div className="mb-5">
        <div className='flex justify-between items-center'>
          <Title text='Тип устройства' size='sm' className='font-bold' />
          <button onClick={toggleDeviceType}>{isDeviceTypeOpen ? 'Свернуть' : 'Развернуть'}</button>
        </div>
        {isDeviceTypeOpen && (
          <CheckboxFiltersGroup
            name='deviceType'
            title='Тип устройства'
            items={[
              { text: 'Смартфоны', value: 'smartphones' },
              { text: 'Ноутбуки', value: 'laptops' },
              { text: 'Компьютеры', value: 'computers' },
            ]}
          />
        )}
      </div>
      
      <div className="mb-5">
        <div className='flex justify-between items-center'>
          <Title text='Размер экрана' size='sm' className='font-bold' />
          <button onClick={toggleScreenSizes}>{isScreenSizesOpen ? 'Свернуть' : 'Развернуть'}</button>
        </div>
        {isScreenSizesOpen && (
          <CheckboxFiltersGroup
            name='screenSizes'
            title='Размер экрана'
            items={[
              { text: '5-6 дюймов', value: '5-6' },
              { text: '6-7 дюймов', value: '6-7' },
              { text: 'Более 7 дюймов', value: '7+' },
            ]}
          />
        )}
      </div>

      <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
        <p>Цена от и до:</p>
        <div className='flex gap-3 mb-5'>
          <Input type='number' placeholder='0' min={0} max={10000} />
          <Input type='number' min={100} max={10000} placeholder='10000' />
        </div>
        <RangeSlider className='cursor-pointer' min={0} max={10000} step={100} />
      </div>

      <div className="mt-5">
        <div className='flex justify-between items-center'>
          <Title text='Оперативная память' size='sm' className='font-bold' />
          <button onClick={toggleMemory}>{isMemoryOpen ? 'Свернуть' : 'Развернуть'}</button>
        </div>
        {isMemoryOpen && (
          <CheckboxFiltersGroup
            name='memory'
            title='Оперативаная память'
            items={[
              { text: '4 GB', value: '4gb' },
              { text: '8 GB', value: '8gb' },
              { text: '16 GB', value: '16gb' },
            ]}
          />
        )}
      </div>
    </div>
  )
}
