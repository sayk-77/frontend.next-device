import Link from 'next/link'
import React from 'react'
import { Title } from './index'
import { Button } from '../ui'
import { Plus } from 'lucide-react'

interface Props {
    id: number
    imageUrl: string
    name: string
    price: number
    className?: string
}

export const ProductCard:React.FC<Props> = ({className, imageUrl, name, price, id}) => {
  return (
    <div className={className}>
        <Link href={`/product/${id}`}>
            <div className="flex justify-center p-6 rounded-lg h-[260px]">
                <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
            </div>

            <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

            <p className='text-sm text-gray-400'>
                ядер - 8x(2 ГГц), 2 ГБ, 2 SIM, IPS, 1600x720, камера 13 Мп, 4G, GPS, FM, 5000 мА*ч
            </p>

            <div className='flex justify-between items-center mt-4'>
                <span className='text-[20px]'>
                    от <b>{price} Р</b>
                </span>

                <Button variant="default" className='text-base font-bold'>
                    <Plus size={20} className='mr-1' />
                    Добавить
                </Button>
            </div>
        </Link>
    </div>
  )
}