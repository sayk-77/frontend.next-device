'use client'
import { cn } from '@/lib/utils'
import React from 'react'
import { FilterCheckbox } from './filter_checkbox'
import { Skeleton } from '../ui'

interface Item {
  text: string
  value: string
}

interface Props {
  title: string
  items: Item[]
  limit?: number
  loading?: boolean
  className?: string
  name?: string
  selectedValues?: Set<string>
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  limit = 5,
  loading,
  className,
  name,
  selectedValues = new Set(),
}) => {
  const handleCheckboxChange = (value: string) => {
    const newSelectedValues = new Set(selectedValues)
    if (newSelectedValues.has(value)) {
      newSelectedValues.delete(value)
    } else {
      newSelectedValues.add(value)
    }
  }

  if (loading) {
    return (
      <div className={className}>
        <p className='font-bold mb-3'>{title}</p>
        {Array(limit)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className='w-28 h-6 mb-5 rounded-[8px]' />
          ))}
      </div>
    )
  }

  return (
    <div className={cn('', className)}>
      <p className='font-bold mb-3'>{title}</p>

      <div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
        {items.slice(0, limit).map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            checked={selectedValues.has(item.value)}
          />
        ))}
      </div>

      {items.length > limit && (
        <div>
          <button className='text-primary mt-3'>Показать все</button>
        </div>
      )}
    </div>
  )
}
