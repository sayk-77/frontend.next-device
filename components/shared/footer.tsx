import { cn } from '@/lib/utils'
import { Container } from './index'
import React from 'react'
import Image from 'next/image'
import { Button } from '../ui'
import Link from 'next/link'

interface Props {
    className?: string
}

export const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer className={cn("border border-t", className)}>
      <Container className='flex items-center justify-between py-8'>
        <Link href='/'>
          <div className='flex items-center gap-4'>
            <Image src="/logo.png" alt="logo" width={130} height={55} />
          </div>
        </Link>

        <div className='flex items-center gap-4'>
          <Link href="/about">
            <Button variant="outline" className='flex items-center gap-1'>
              О нас
            </Button>
          </Link>
          <Link href="/privacy">
            <Button variant="outline" className='flex items-center gap-1'>
              Политика конфиденциальности
            </Button>
          </Link>
        </div>
      </Container>
    </footer>
  )
}
