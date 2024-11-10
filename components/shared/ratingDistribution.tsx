import { Star } from 'lucide-react';
import React from 'react';

interface RatingDistributionProps {
    reviews: { rating: number }[];
}

const RatingDistribution: React.FC<RatingDistributionProps> = ({ reviews }) => {
    const totalReviews = reviews.length;
    const ratingCounts = Array(5).fill(0);

    reviews.forEach(review => {
        const index = Math.floor(review.rating) - 1;
        if (index >= 0 && index < 5) {
            ratingCounts[index]++;
        }
    });

    const averageRating = totalReviews
        ? (ratingCounts.reduce((acc, count, index) => acc + (count * (index + 1)), 0) / totalReviews).toFixed(1)
        : '0.0';

    return (
        <div className="flex flex-col items-start mb-5 max-w-xs">
            <div className="flex flex-col mb-4">
                <div className='flex items-center'>
                    <Star size={36} color="orange" />
                    <span className="text-gray-700 text-[32px] ml-2">{averageRating}</span>
                </div>
                <span className="text-gray-700 text-[18px] ml-2">Отзывов: {totalReviews}</span>
            </div>

            {totalReviews > 0 ? (
                <div className="w-full">
                    {ratingCounts.slice().reverse().map((count, index) => (
                        <div className="flex items-center mb-1" key={index}>
                            <span className="text-gray-600 text-sm mr-2">{5 - index}★</span>
                            <div className="h-2 bg-gray-200 rounded-full w-full">
                                <div
                                    className="h-2 bg-yellow-400 rounded-full"
                                    style={{ width: `${(count / totalReviews) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">Пока нет отзывов</p>
            )}
        </div>
    );
};

export default RatingDistribution;
