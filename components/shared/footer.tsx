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
      <footer className={cn("border border-t px-4", className)}>
        <Container className='flex flex-col sm:flex-row items-center justify-between py-8'>
          <Link href='/'>
            <div className='flex items-center gap-4 mb-4 sm:mb-0'>
              <Image src="/logo.png" alt="logo" width={130} height={55} />
            </div>
          </Link>

          <div className='flex flex-col sm:flex-row items-center'>
            <Link href="/about">
              <Button variant="link" className='flex items-center gap-1'>
                О нас
              </Button>
            </Link>
            <Link href="/privacy">
              <Button variant="link" className='flex items-center gap-1'>
                Политика конфиденциальности
              </Button>
            </Link>
          </div>
        </Container>
      </footer>
  )
}
