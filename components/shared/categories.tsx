'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

interface Props {
    className?: string
}

const cats = [
  { id: 11, name: 'Все', path: '/catalog/'},
  { id: 2, name: 'Мобильные телефоны' , path: '/catalog/mobile-phone'},
  { id: 3, name: 'Ноутбуки', path: '/catalog/laptop' },
  { id: 4, name: 'Планшенты', path: '/catalog/tablet' },
  { id: 5, name: 'Умные часы', path: '/catalog/smart-watch' },
  { id: 6, name: 'Компьютеры', path: '/catalog/computer' },
  { id: 7, name: 'Аксессуары', path: '/catalog/other' },
]

export const Categories:React.FC<Props> = ({className}) => {

  return (
    <div className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}>
        {
            cats.map(({id, name, path}) => (
                <Link href={`/#${path}`} key={id} className={cn('flex items-center font-bold h-11 rounded-2xl px-5'
                )}>
                    {name}
                </Link>
            ))
        }
    </div>
  )
}