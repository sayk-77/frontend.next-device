'use client'

import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { useClickAway, useDebounce } from 'react-use'

interface Props {
    className?: string
}

export const SearchInput: React.FC<Props> = ({className}) => {
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [focused, setFocused] = useState<boolean>(false)
    const ref = useRef(null)

    useClickAway(ref, () => {
        setFocused(false)
        setSearchQuery('')
    })

    const onClickItem = () => {
        setFocused(false)
        setSearchQuery('')
    }

    return (
        <div className={cn(className, 'flex rounded-2xl flex-1 justify-between relative h-11 z-30')} ref={ref}>
            <Search className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400' />
            <input
                type="text"
                className='rounded-2xl outline-none w-full bg-gray-100 pl-11'
                placeholder='Поиск...'
                onFocus={() => setFocused(true)}
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            />

            <div
                className={cn(
                    'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 z-30',
                    focused ? 'visible opacity-100' : 'invisible opacity-0'
                )}>
            </div>
        </div>
    )
}