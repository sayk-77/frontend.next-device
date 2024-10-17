'use client'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { FilterCheckbox } from './filter_checkbox'
import { Skeleton, Input } from '../ui'

interface Item {
  text: string
  value: string
}

interface Props {
  title?: string
  items: Item[]
  limit?: number
  loading?: boolean
  className?: string
  selectedValues: Set<string>
  onCheckboxChange: (value: string) => void
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  limit = 5,
  loading,
  className,
  selectedValues,
  onCheckboxChange,
}) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [showAll, setShowAll] = useState<boolean>(false)

  const filteredItems = items.filter(item => 
    item.text.toLowerCase().includes(searchValue.toLowerCase())
  )

  const limitItems = showAll ? filteredItems : filteredItems.slice(0, limit)

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value)
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

      {showAll && (
        <div className='mb-5'>
          <Input
            onChange={onChangeSearchInput}
            placeholder='Поиск...'
            className='bg-gray-50 border-none'
          />
        </div>
      )}

      <div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
        {limitItems.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            checked={selectedValues.has(item.value)}
            onCheckedChange={() => onCheckboxChange(item.value)}
            name={title}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button onClick={() => setShowAll(!showAll)} className='text-primary mt-3'>
            {showAll ? 'Скрыть' : 'Показать все'}
          </button>
        </div>
      )}
    </div>
  )
}