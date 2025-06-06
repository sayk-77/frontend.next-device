'use client'

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Breadcrumb {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  customBreadcrumbs?: Breadcrumb[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ customBreadcrumbs, className }) => {
  const [pathSegments, setPathSegments] = useState<string[]>([]);

  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split('/').filter((segment) => segment);
    const filteredSegments = segments.filter((segment) => !['category'].includes(segment));
    setPathSegments(filteredSegments);
  }, []);

  const dynamicNames: { [key: string]: string } = {
    brands: 'Бренды',
    category: 'Категория',
  };

  const truncatePath = (segments: string[], maxLength: number): string[] => {
    if (segments.length <= maxLength) return segments;

    const firstSegment = segments[0];
    const lastSegment = segments[segments.length - 1];
    return [firstSegment, '...', lastSegment];
  };

  if (customBreadcrumbs) {
    return (
        <nav aria-label="Breadcrumb" className={cn('text-xs sm:text-sm md:text-base no-underline', className)}>
          <ol className="flex flex-wrap items-center space-x-2 text-gray-600">
            <li className="flex items-center">
              <Link href="/" className="hover:text-orange-500">Главная</Link>
              <span className="mx-2 hidden sm:inline">/</span>
            </li>
            {customBreadcrumbs.map((breadcrumb, index) => (
                <li key={breadcrumb.href} className="flex items-center">
                  <Link href={breadcrumb.href} className="hover:text-orange-500">
                    {breadcrumb.label}
                  </Link>
                  {index < customBreadcrumbs.length - 1 && (
                      <span className="mx-2 hidden sm:inline">/</span>
                  )}
                </li>
            ))}
          </ol>
        </nav>
    );
  }

  const truncatedSegments = truncatePath(pathSegments, 3);

  return (
      <nav aria-label="Breadcrumb" className={cn('text-xs sm:text-sm md:text-base no-underline', className)}>
        <ol className="flex flex-wrap items-center space-x-2 text-gray-600 pl-4">
          <li className="flex items-center">
            <Link href="/" className="hover:text-orange-500">Главная</Link>
            <span className="mx-2 hidden sm:inline">/</span>
          </li>
          {truncatedSegments.map((segment, index) => {
            const basePath = pathSegments[0] === 'brands' ? '' : 'brands';
            const href = `/${[basePath, ...pathSegments.slice(0, index + 1)].join('/')}`.replace(/\/+/g, '/');
            const displayName = dynamicNames[segment] || decodeURIComponent(segment);

            return (
                <li key={href} className="flex items-center">
                  {segment === '...' ? (
                      <span className="text-gray-500">...</span>
                  ) : (
                      <Link href={href} className="hover:text-orange-500">
                        {displayName}
                      </Link>
                  )}
                  {index < truncatedSegments.length - 1 && (
                      <span className="mx-2 hidden sm:inline">/</span>
                  )}
                </li>
            );
          })}
        </ol>
      </nav>
  );
};

export default Breadcrumbs;