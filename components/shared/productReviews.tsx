'use client'

import React, { useState, useEffect } from 'react';
import RatingDistribution from './ratingDistribution';
import { ReviewForm } from './reviewForm';
import { Button } from '../ui';
import axios from 'axios';
import { PanelTopCloseIcon, SquareX, X } from 'lucide-react';

interface Review {
    id: number;
    name: string;
    age: number;
    rating: number;
    pros: string;
    cons: string;
    images: {
        id: number;
        imageUrl: string;
    }[];
    comment: string;
}

interface ReviewInput {
    rating: number;
    pros: string;
    cons: string;
    comment: string;
    images: File[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ReviewProps {
    productId: number;
}

const Review: React.FC<ReviewProps> = ({ productId }) => {
    const [reviews, setReviews] = useState<Review[] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openImageModal = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        setIsImageModalOpen(true);
    };

    const closeImageModal = () => {
        setIsImageModalOpen(false);
        setSelectedImage(null);
    };

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${API_URL}/review/product/${productId}`);
                setReviews(response.data);
            } catch (err) {
                setError('Не удалось загрузить отзывы');
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [productId]);

    const handleReviewSubmit = (reviewData: ReviewInput) => {
        console.log('Отправленный отзыв:', reviewData);
    };

    return (
        <div className="pt-10 pb-10 px-5 rounded-lg shadow-lg">
            <div className="mb-6">
                <RatingDistribution reviews={reviews || []} />
                <Button onClick={openModal} className="w-full md:w-auto mt-4">
                    Оставить отзыв
                </Button>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Отзывы клиентов</h3>

            {loading ? (
                <p className="text-gray-700">Загрузка...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                    <div
                        key={review.id}
                        className="flex flex-col md:flex-row mb-8 p-6 bg-white border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex-1">
                            <div className="font-bold text-lg md:text-xl text-gray-800 mt-4 mb-2">
                                Оценка: <span>{review.rating}/5</span>
                            </div>
                            <h4 className="text-xl md:text-2xl font-semibold text-gray-900 flex items-center mb-2">
                                {review.name}
                            </h4>
                            <div className="font-bold text-lg md:text-xl text-gray-800 mt-4 mb-2">Достоинства:</div>
                            <p className="text-gray-700 mb-4">{review.pros}</p>

                            <div className="font-bold text-lg md:text-xl text-gray-800 mb-2">Недостатки:</div>
                            <p className="text-gray-700 mb-4">{review.cons}</p>

                            <div className="font-bold text-lg md:text-xl text-gray-800 mb-2">Комментарий:</div>
                            <p className="text-gray-700 italic">{review.comment}</p>

                            {review.images && review.images.length > 0 && (
                                <>
                                    <div className="font-bold text-lg md:text-xl text-gray-800 mb-2">Фото:</div>
                                    <div className="flex flex-wrap mt-4">
                                        {review.images.map((image, idx) => (
                                            <div
                                                key={idx}
                                                className="relative h-24 w-24 mr-2 mb-2 cursor-pointer"
                                                onClick={() => openImageModal(image.imageUrl)}
                                            >
                                                <img
                                                    src={`${API_URL}/images/review/${image.imageUrl}`}
                                                    loading="lazy"
                                                    className="w-full h-full object-scale-down rounded-xl"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-700">Нет отзывов</p>
            )}

            {isImageModalOpen && selectedImage && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg relative mx-4 my-4 max-w-[90%] max-h-[90%] overflow-y-auto">
                        <img
                            src={`${API_URL}/images/review/${selectedImage}`}
                            alt="Увеличенное фото"
                            className="max-w-full max-h-full object-contain"
                        />
                        <button
                            onClick={closeImageModal}
                            className="absolute top-2 right-2 text-black rounded-full p-2 bg-gray-200"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            )}

            {isModalOpen && !isImageModalOpen && (
                <ReviewForm onSubmit={handleReviewSubmit} onClose={closeModal} productId={productId} />
            )}
        </div>
    );
};

export default Review;