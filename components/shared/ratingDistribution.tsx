import { Star } from 'lucide-react';
import React from 'react';

interface RatingDistributionProps {
    reviews: { rating: number }[];
}

const RatingDistribution: React.FC<RatingDistributionProps> = ({ reviews }) => {
    const totalReviews = reviews.length;
    const ratingCounts = Array(5).fill(0);

    // Подсчет оценок
    reviews.forEach(review => {
        const index = Math.floor(review.rating) - 1; // Получение индекса
        if (index >= 0 && index < 5) {
            ratingCounts[index]++;
        }
    });

    const ratingPercentages = ratingCounts.map(count => (totalReviews ? (count / totalReviews) * 100 : 0));
    
    const averageRating = totalReviews ? (ratingCounts.reduce((acc, count, index) => acc + (count * (index + 1)), 0) / totalReviews).toFixed(1) : '0.0';

    return (
        <div className="flex flex-col items-start mb-5 max-w-xs">
            <div className="flex flex-col mb">
                <div className='flex items-center'>
                    <Star size={36} color="orange" />
                    <span className="text-gray-700 text-[32px] ml-2">{averageRating}</span>
                </div>
                <span className="text-gray-700 text-[18px] ml-2">Отзывов: {reviews.length}</span>
            </div>
            <div className="w-full">
                {ratingCounts.map((count, index) => (
                    <div className="flex items-center mb-1" key={index}>
                        <span className="text-gray-600 text-sm mr-2">{1 + index}</span>
                        <div className="h-2 bg-gray-200 rounded-full w-full">
                            <div
                                className="h-2 bg-yellow-400 rounded-full"
                                style={{ width: `${totalReviews ? (count / totalReviews) * 100 : 0}%` }} 
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RatingDistribution;
