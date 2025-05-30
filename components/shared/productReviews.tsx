"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Star, ThumbsUp, ThumbsDown, MessageSquare, Camera, X, Plus } from "lucide-react"
import axios from "axios"
import { cn } from "@/lib/utils"
import RatingDistribution from "@/components/shared/ratingDistribution";
import {ReviewForm} from "@/components/shared/reviewForm";
import {toast} from "react-toastify";

interface Review {
    id: number
    name: string
    age: number
    rating: number
    pros: string
    cons: string
    images: {
        id: number
        imageUrl: string
    }[]
    comment: string
}

interface ReviewInput {
    rating: number
    pros: string
    cons: string
    comment: string
    images: File[]
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface ReviewProps {
    productId: number
}

const Review: React.FC<ReviewProps> = ({ productId }) => {
    const [reviews, setReviews] = useState<Review[] | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isImageModalOpen, setIsImageModalOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const openImageModal = (imageUrl: string) => {
        setSelectedImage(imageUrl)
        setIsImageModalOpen(true)
    }

    const closeImageModal = () => {
        setIsImageModalOpen(false)
        setSelectedImage(null)
    }

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await axios.get(`${API_URL}/review/product/${productId}`)
                setReviews(response.data)
            } catch (err) {
                setError("Не удалось загрузить отзывы")
            } finally {
                setLoading(false)
            }
        }

        fetchReviews()
    }, [productId])

    const handleReviewSubmit = (reviewData: ReviewInput) => {
        toast.info("Отзыв отправлен на модерацию")
    }

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={cn("w-4 h-4", star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300")}
                    />
                ))}
            </div>
        )
    }

    const LoadingSkeleton = () => (
        <div className="space-y-6">
            {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6">
                    <div className="flex items-start space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-[200px]" />
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-20 w-full" />
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">Отзывы покупателей</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Узнайте, что думают наши клиенты о продукте из первых рук</p>
            </div>

            <Card className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div className="flex-1 w-full">
                        <RatingDistribution reviews={reviews || []} />
                    </div>
                    <div className="flex flex-col items-center space-y-3">
                        <Button
                            onClick={openModal}
                            size="lg"
                            variant="outline"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Написать отзыв
                        </Button>
                        <p className="text-sm text-gray-600 text-center">Поделитесь своим опытом</p>
                    </div>
                </div>
            </Card>

            <div className="space-y-6">
                {loading ? (
                    <LoadingSkeleton />
                ) : error ? (
                    <Card className="p-8 text-center">
                        <div className="text-red-500 mb-4">
                            <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p className="text-lg font-medium">{error}</p>
                        </div>
                        <Button variant="outline" onClick={() => window.location.reload()}>
                            Попробовать снова
                        </Button>
                    </Card>
                ) : reviews && reviews.length > 0 ? (
                    reviews.map((review) => (
                        <Card key={review.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <CardContent className="p-6">
                                <div className="flex flex-col space-y-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                {review.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-lg text-gray-900">{review.name}</h4>
                                                <div className="flex items-center space-x-2">
                                                    {renderStars(review.rating)}
                                                    <Badge variant="secondary" className="text-xs">
                                                        {review.rating}/5
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {review.pros && (
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <ThumbsUp className="w-4 h-4 text-green-600" />
                                                    <h5 className="font-medium text-green-700">Достоинства</h5>
                                                </div>
                                                <p className="text-gray-700 bg-green-50 p-3">
                                                    {review.pros}
                                                </p>
                                            </div>
                                        )}

                                        {review.cons && (
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <ThumbsDown className="w-4 h-4 text-red-600" />
                                                    <h5 className="font-medium text-red-700">Недостатки</h5>
                                                </div>
                                                <p className="text-gray-700 bg-red-50 p-3">
                                                    {review.cons}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {review.comment && (
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <MessageSquare className="w-4 h-4 text-blue-600" />
                                                <h5 className="font-medium text-blue-700">Комментарий</h5>
                                            </div>
                                            <p className="text-gray-700 bg-blue-50 p-4 rounded-lg">
                                                "{review.comment}"
                                            </p>
                                        </div>
                                    )}

                                    {review.images && review.images.length > 0 && (
                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-2">
                                                <Camera className="w-4 h-4 text-purple-600" />
                                                <h5 className="font-medium text-purple-700">Фотографии ({review.images.length})</h5>
                                            </div>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                                {review.images.map((image, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg border-2 border-gray-200 hover:border-orange-400 transition-colors"
                                                        onClick={() => openImageModal(image.imageUrl)}
                                                    >
                                                        <img
                                                            src={`${API_URL}/images/review/${image.imageUrl}`}
                                                            alt={`Фото отзыва ${idx + 1}`}
                                                            loading="lazy"
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                        />
                                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <Plus className="w-4 h-4 text-gray-700" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Card className="p-12 text-center">
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                                <MessageSquare className="w-8 h-8 text-gray-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Пока нет отзывов</h3>
                                <p className="text-gray-600 mb-4">Будьте первым, кто поделится своим мнением о продукте</p>
                                <Button onClick={openModal} className="bg-orange-500 hover:bg-orange-600">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Написать первый отзыв
                                </Button>
                            </div>
                        </div>
                    </Card>
                )}
            </div>

            <Dialog open={isImageModalOpen} onOpenChange={closeImageModal}>
                <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                    {selectedImage && (
                        <div className="relative">
                            <img
                                src={`${API_URL}/images/review/${selectedImage}`}
                                alt="Увеличенное фото"
                                className="w-full h-auto max-h-[80vh] object-contain"
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={closeImageModal}
                                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {isModalOpen && <ReviewForm onSubmit={handleReviewSubmit} onClose={closeModal} productId={productId} />}
        </div>
    )
}

export default Review
