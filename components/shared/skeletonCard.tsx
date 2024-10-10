import React from 'react';
import { Skeleton } from '../ui';

export const ProductCardSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col border min-w-[280px] max-w-[280px] w-full justify-between p-3 rounded-lg overflow-hidden">
            <Skeleton className="w-[150px] h-[150px] mb-3" />
            <div className="flex flex-col items-center justify-between text-center gap-2 p-2">
                <Skeleton className="h-[20px] w-[100px]" />
                <Skeleton className="h-[15px] w-[200px]" />
                <Skeleton className="h-[20px] w-[60px]" />
                <div className="flex flex-row gap-3 mt-2">
                    <Skeleton className="h-[40px] w-[100px]" />
                </div>
            </div>
        </div>
    );
};
