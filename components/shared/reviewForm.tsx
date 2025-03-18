import { useEffect, useState } from 'react';
import { Button, Input } from "@/components/ui";
import axios from 'axios';

interface ReviewFormProps {
    onSubmit: (review: ReviewInput) => void;
    onClose: () => void;
    productId: number
}

interface ReviewInput {
    rating: number;
    pros: string;
    cons: string;
    comment: string;
    images: File[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, onClose, productId }) => {
    const [token, setToken] = useState<string | null>(null)
    const [reviewData, setReviewData] = useState<ReviewInput>({
        rating: 5,
        pros: '',
        cons: '',
        comment: '',
        images: []
    });
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token)
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setReviewData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const newImages = Array.from(e.target.files).slice(0, 5 - reviewData.images.length);
        setReviewData((prev) => ({
            ...prev,
            images: [...prev.images, ...newImages]
        }));
    };

    const handleRemoveImage = (index: number) => {
        setReviewData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('rating', reviewData.rating.toString());
        formData.append('pros', reviewData.pros);
        formData.append('cons', reviewData.cons);
        formData.append('comment', reviewData.comment);
        formData.append('productId', productId.toString())
    
        reviewData.images.forEach((image, index) => {
            formData.append(`images`, image);
        });
    
        try {
            const response = await axios.post(`${API_URL}/review`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 200) {
                onSubmit(reviewData);
                onClose();
            }
        } catch (error) {
            console.error('Ошибка при отправке отзыва:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md w-full max-w-[800px] shadow-lg m-2">
                <h3 className="text-xl font-semibold mb-4">Написать отзыв</h3>
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium">Рейтинг (1-5)</label>
                        <Input
                            type="number"
                            name="rating"
                            min={1}
                            max={5}
                            value={reviewData.rating}
                            onChange={handleChange}
                            className="w-full h-[40px]" 
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">Достоинства</label>
                        <textarea
                            name="pros"
                            value={reviewData.pros}
                            onChange={handleChange}
                            rows={3}
                            className="p-2 border rounded-md w-full h-[80px] resize-none focus:ring-0 focus:border-orange-500 focus:outline-none" // Фиксированная высота и отключение изменения размера
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">Недостатки</label>
                        <textarea
                            name="cons"
                            value={reviewData.cons}
                            onChange={handleChange}
                            rows={3}
                            className="p-2 border rounded-md w-full h-[80px] resize-none focus:ring-0 focus:border-orange-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">Комментарий</label>
                        <textarea
                            name="comment"
                            value={reviewData.comment}
                            onChange={handleChange}
                            rows={4}
                            className="p-2 border rounded-md w-full h-[100px] resize-none focus:ring-0 focus:border-orange-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">Добавить фото (до 5)</label>
                        <label className="cursor-pointer inline-flex items-center px-4 py-2 text-orange-500 rounded-md hover:bg-orange-600 hover:text-white transition">
                            Загрузить изображения
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </label>
                        <div className="flex gap-2 mt-2">
                            {reviewData.images.map((image, index) => (
                                <div key={index} className="relative w-20 h-20">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt={`image-${index}`}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                    <button
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-0 right-0 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <Button onClick={onClose} variant="secondary">Отмена</Button>
                    <Button onClick={handleSubmit}>Отправить</Button>
                </div>
            </div>
        </div>
    );
};