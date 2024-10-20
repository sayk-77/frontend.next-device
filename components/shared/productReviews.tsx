import React from 'react';
import RatingDistribution from './ratingDistribution';
import Image from 'next/image';

interface ReviewProps {
    reviews: {
        name: string;
        age: number;
        rating: number;
        pros: string[];
        cons: string[];
        images: string[]
        comment: string;
    }[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

const Review: React.FC<ReviewProps> = ({ reviews }) => {
    return (
        <div className="flex pt-10 pb-10 px-5 rounded-lg shadow-lg">
            <div className="flex-none w-1/3">
                <RatingDistribution reviews={reviews} />
            </div>
            <div className="flex-1 pl-5">
                <h3 className="text-3xl font-bold mb-6 text-gray-800">Отзывы клиентов</h3>
                {reviews.map((review, index) => (
                    <div key={index} className="flex mb-8 p-6 bg-white border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="flex-1">
                            <h4 className="text-xl font-se  mibold text-gray-900 flex items-center mb-2">
                                {review.name}
                            </h4>
                            <div className="font-bold text-lg text-gray-800 mt-4 mb-2">Достоинства:</div>
                            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                                {review.pros.map((pro, idx) => (
                                    <li key={idx} className="flex items-center">
                                        <span className="text-green-500 mr-2">✓</span>
                                        {pro}
                                    </li>
                                ))}
                            </ul>
                
                            <div className="font-bold text-lg text-gray-800 mb-2">Недостатки:</div>
                            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                                {review.cons.map((con, idx) => (
                                    <li key={idx} className="flex items-center">
                                        <span className="text-red-500 mr-2">✗</span>
                                        {con}
                                    </li>
                                ))}
                            </ul>
                
                            <div className="font-bold text-lg text-gray-800 mb-2">Комментарий:</div>
                            <p className="text-gray-700 italic">
                                {review.comment}
                            </p>
                            
                            <div className="font-bold text-lg text-gray-800 mb-2">Фото:</div>
                            <div className="flex flex-wrap mt-4">
                            {Array.from({ length: 4 }).map((_, idx) => (
                                <div key={idx} className="relative h-24 w-24 mr-2 mb-2">
                                    <Image
                                        src={`${API_URL}/images/product/placeholder.png`}
                                        alt={`Review image ${idx + 1}`}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-lg"
                                    />
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Review;