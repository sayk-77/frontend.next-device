"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Upload, X } from "lucide-react"
import axios from "axios"

interface ReviewFormProps {
    onSubmit: (review: ReviewInput) => void
    onClose: () => void
    productId: number
}

interface ReviewInput {
    rating: number
    pros: string
    cons: string
    comment: string
    images: File[]
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, onClose, productId }) => {
    const [token, setToken] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [reviewData, setReviewData] = useState<ReviewInput>({
        rating: 0,
        pros: "",
        cons: "",
        comment: "",
        images: [],
    })

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            setToken(token)
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setReviewData((prev) => ({ ...prev, [name]: value }))
    }

    const handleRatingChange = (rating: number) => {
        setReviewData((prev) => ({ ...prev, rating }))
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return

        const newImages = Array.from(e.target.files).slice(0, 5 - reviewData.images.length)
        setReviewData((prev) => ({
            ...prev,
            images: [...prev.images, ...newImages],
        }))
    }

    const handleRemoveImage = (index: number) => {
        setReviewData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }))
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        const formData = new FormData()
        formData.append("rating", reviewData.rating.toString())
        formData.append("pros", reviewData.pros)
        formData.append("cons", reviewData.cons)
        formData.append("comment", reviewData.comment)
        formData.append("productId", productId.toString())

        reviewData.images.forEach((image) => {
            formData.append("images", image)
        })

        try {
            const response = await axios.post(`${API_URL}/review`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            })

            if (response.status === 200) {
                onSubmit(reviewData)
                onClose()
            }
        } catch (error) {
            console.error("Ошибка при отправке отзыва:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const StarRating = () => (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className="transition-colors hover:scale-110 transform duration-200"
                >
                    <Star
                        className={`w-8 h-8 ${
                            star <= reviewData.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-300"
                        }`}
                    />
                </button>
            ))}
            <span className="ml-2 text-sm text-gray-600 font-medium">{reviewData.rating} из 5</span>
        </div>
    )

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border-0">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-bold text-gray-900">Написать отзыв</CardTitle>
                        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full hover:bg-gray-100">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                    <p className="text-gray-600 text-sm">Поделитесь своим опытом использования продукта</p>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-900">Общая оценка</label>
                        <StarRating />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-green-700">Достоинства</label>
                            <Textarea
                                name="pros"
                                value={reviewData.pros}
                                onChange={handleChange}
                                placeholder="Что вам понравилось?"
                                className="min-h-[100px] resize-none border-green-200 focus:border-green-400 focus:ring-green-400"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-red-700">Недостатки</label>
                            <Textarea
                                name="cons"
                                value={reviewData.cons}
                                onChange={handleChange}
                                placeholder="Что можно улучшить?"
                                className="min-h-[100px] resize-none border-red-200 focus:border-red-400 focus:ring-red-400"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-900">Подробный комментарий</label>
                        <Textarea
                            name="comment"
                            value={reviewData.comment}
                            onChange={handleChange}
                            placeholder="Расскажите подробнее о своем опыте использования..."
                            className="min-h-[120px] resize-none"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-900">Фотографии ({reviewData.images.length}/5)</label>

                        {reviewData.images.length < 5 && (
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                                <label className="cursor-pointer">
                                    <div className="flex flex-col items-center space-y-2">
                                        <Upload className="h-8 w-8 text-gray-400" />
                                        <span className="text-sm font-medium text-gray-600">Нажмите для загрузки фото</span>
                                        <span className="text-xs text-gray-500">PNG, JPG до 10MB</span>
                                    </div>
                                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                                </label>
                            </div>
                        )}

                        {reviewData.images.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                {reviewData.images.map((image, index) => (
                                    <div key={index} className="relative group">
                                        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                                            <img
                                                src={URL.createObjectURL(image) || "/placeholder.svg"}
                                                alt={`Фото ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <button
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg transition-colors"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                        <Button onClick={onClose} variant="outline" className="flex-1 h-11" disabled={isSubmitting}>
                            Отмена
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="flex-1 h-11 bg-orange-500 hover:bg-orange-600"
                            disabled={isSubmitting || !reviewData.comment.trim()}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Отправка...
                                </div>
                            ) : (
                                "Отправить отзыв"
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
