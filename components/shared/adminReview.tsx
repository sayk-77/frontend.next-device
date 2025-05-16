'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '../ui';
import Image from 'next/image';
import { toast } from 'react-toastify';

interface Review {
  id: number;
  rating: number;
  pros: string;
  cons: string;
  isModer: boolean;
  createdAt: string;
  images: Images[]
}

interface Images {
  id: number
  imageUrl: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AdminReview = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  
  const openImageModal = (imageUrl: string) => {
      setSelectedImage(imageUrl);
      setIsImageModalOpen(true);
  };
  
  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImage(null);
};

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
  
  const refreshReviews = (reviewId: number) => {
    setReviews(reviews.filter(review => review.id != reviewId))
  }
  
  const publishReview = async (reviewId: number) => {
    try {
      const response = await axios.put(`${API_URL}/review/${reviewId}`, {}, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        
      if (response.status === 200) {
        toast.info(`Отзыв № ${reviewId} опубликован`) 
        refreshReviews(reviewId)
      }
    } catch (err) {
      console.log(err)
    }
  }
  
  const deleteReviews = async (reviewId: number) => {
    try {
      const response = await axios.delete(`${API_URL}/review/${reviewId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      
      if (response.status === 200) {
        toast.info(`Отзыв № ${reviewId} отклонен`)
        console.log(response.data)
        refreshReviews(reviewId)
      }
  } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="p-6 max-w-[1200px] m-auto">
          <ul className="space-y-4">
        {reviews.length > 0 ?reviews.map((review) => (
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
                {review.isModer ? 'Опубликован' : 'На модерации'}
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
            <div className='mt-[15px] flex gap-[10px]'>
              {review.images.map((image, id) => (
                <div
                key={id}
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
            <div className="flex justify-end mt-4">
              <Button variant="link" onClick={() => deleteReviews(review.id)}>
                Отклонить
              </Button>
              <Button variant="link" onClick={() => publishReview(review.id)}>
                Опубликовать
              </Button>
            </div>
          </li>
        )) : (<div>Отзывов, требующих модерации пока нет</div>)}
      </ul>
      
      {isImageModalOpen && selectedImage && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg relative mx-4 my-4">
                        <img
                            src={`${API_URL}/images/review/${selectedImage}`}
                            alt="Увеличенное фото"
                            className="p-[15px] max-w-2xl max-h-screen object-contain"
                        />
                        <button
                            onClick={closeImageModal}
                            className="absolute top-1 right-1 text-black rounded-full p-2"
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
    </div>
  );
};

export default AdminReview;