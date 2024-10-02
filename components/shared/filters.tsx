'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import { Title, FilterCheckbox, RangeSlider, CheckboxFiltersGroup } from './index'
import { Input } from '../ui'

interface Props {
  className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('', className)}>
      <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

      <CheckboxFiltersGroup
        name='brands'
        className='mb-5'
        title='Бренд'
        items={[
          { text: 'Apple', value: 'apple' },
          { text: 'Samsung', value: 'samsung' },
          { text: 'Xiaomi', value: 'xiaomi' },
        ]}
      />

      <CheckboxFiltersGroup
        name='deviceType'
        className='mb-5'
        title='Тип устройства'
        items={[
          { text: 'Смартфоны', value: 'smartphones' },
          { text: 'Ноутбуки', value: 'laptops' },
          { text: 'Компьютеры', value: 'computers' },
        ]}
      />

      <CheckboxFiltersGroup
        name='screenSizes'
        className='mb-5'
        title='Размер экрана'
        items={[
          { text: '5-6 дюймов', value: '5-6' },
          { text: '6-7 дюймов', value: '6-7' },
          { text: 'Более 7 дюймов', value: '7+' },
        ]}
      />

      <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
        <p>Цена от и до:</p>
        <div className='flex gap-3 mb-5'>
          <Input type='number' placeholder='0' min={0} max={10000} />
          <Input type='number' min={100} max={10000} placeholder='10000' />
        </div>

        <RangeSlider
          className='cursor-pointer'
          min={0}
          max={10000}
          step={100}
        />
      </div>

      <CheckboxFiltersGroup
        name='memory'
        title='Оперативная память'
        className='mt-5'
        items={[
          { text: '4 GB', value: '4gb' },
          { text: '8 GB', value: '8gb' },
          { text: '16 GB', value: '16gb' },
        ]}
      />
    </div>
  )
}
