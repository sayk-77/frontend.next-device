'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '../ui';

interface Review {
  id: number;
  rating: number;
  pros: string;
  cons: string;
  isModer: boolean;
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AdminReview = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axios.get(`${API_URL}/review/all`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setReviews(response.data);
      } catch (error) {
        console.error('Ошибка загрузки отзывов:', error);
      }
    };
    getReviews();
  }, []);

    const handleViewReview = (id: number) => {
        console.log(id)
    }

  return (
    <div className="p-6 max-w-[1200px] m-auto">
          <ul className="space-y-4">
        {reviews.map((review) => (
          <li
            key={review.id}
            className="border p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-700">Отзыв № {review.id}</h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  review.isModer ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {review.isModer ? 'На модерации' : 'Опубликован'}
              </span>
            </div>
            <div className="mb-2">
              <p className="font-medium text-gray-700">Рейтинг: {review.rating}/5</p>
            </div>
            <div className="mb-2">
              <p>
                <span className="font-medium text-gray-700">Плюсы:</span> {review.pros}
              </p>
              <p>
                <span className="font-medium text-gray-700">Минусы:</span> {review.cons}
              </p>
            </div>
            <p className="text-gray-500 text-sm">
              <span className="font-medium text-gray-700">Дата:</span>{' '}
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
            <div className="flex justify-end mt-4">
              <Button variant="link" onClick={() => handleViewReview(review.id)}>
                Просмотреть отзыв
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminReview;