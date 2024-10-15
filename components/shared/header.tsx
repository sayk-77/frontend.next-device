import { cn } from '@/lib/utils'
import { Container, SearchInput, TopBar } from './index'
import React from 'react'
import Image from 'next/image'
import { Button } from '../ui'
import { ArrowRight, Heart, ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'

interface Props {
    className?: string
}

export const Header: React.FC<Props> = ({className}) => {
  return (
    <header className={cn("bg-white border-b sticky top-0 z-10", className)}>
        <Container className='flex items-center justify-between py-8'>
            <Link href='/'>
                <div className='flex items-center gap-4'>
                    <Image src="/logo.png" alt="logo" width={130} height={55}/>
                </div>
            </Link>
            
            <Link href="/catalog">
                <Button variant="outline" className='ml-5'>
                    Каталог    
                </Button>
            </Link>
            
            <div className='mx-10 flex-1'>
                <SearchInput />
            </div>
            
            <div className='flex items-center gap-3'>
                <Button variant="outline" className='flex items-center gap-1'>
                    <User size={16}/>
                    Войти
                </Button>
                
                <Button variant="outline">
                    <Link href='/like'>
                        <Heart size={24}/>
                    </Link>
                </Button>
                
                <div>
                    <Link href='/cart'>
                        <Button className='group relative'>
                            <b>15200 Р</b>
                            <span className='h-full w-[1px] bg-white/30 mx-3'/>
                            <div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
                                <ShoppingCart className='h-4 w-4 relative' strokeWidth={2} />
                                <b>2</b>
                            </div>
                            <ArrowRight className='w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'/>
                        </Button>
                    </Link>
                </div>
                
            </div>
        </Container>
    </header>
  )
}