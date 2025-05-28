"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingDistributionProps {
    reviews: { rating: number }[]
    className?: string
}

const RatingDistribution = ({ reviews, className }: RatingDistributionProps) => {
    const [animatedCounts, setAnimatedCounts] = useState<number[]>([0, 0, 0, 0, 0])
    const totalReviews = reviews.length
    const ratingCounts = Array(5).fill(0)

    reviews.forEach((review) => {
        const index = Math.floor(review.rating) - 1
        if (index >= 0 && index < 5) {
            ratingCounts[index]++
        }
    })

    const averageRating = totalReviews
        ? (ratingCounts.reduce((acc, count, index) => acc + count * (index + 1), 0) / totalReviews).toFixed(1)
        : "0.0"

    const fiveStarPercentage = totalReviews ? Math.round((ratingCounts[4] / totalReviews) * 100) : 0

    useEffect(() => {
        setAnimatedCounts([0, 0, 0, 0, 0])

        const timer = setTimeout(() => {
            setAnimatedCounts(ratingCounts)
        }, 100)

        return () => clearTimeout(timer)
    }, [reviews])

    const renderStars = () => {
        const avgRating = Number.parseFloat(averageRating)
        const fullStars = Math.floor(avgRating)
        const hasHalfStar = avgRating - fullStars >= 0.5

        return (
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={cn(
                            "w-5 h-5 mr-0.5",
                            i < fullStars
                                ? "fill-yellow-400 text-yellow-400"
                                : i === fullStars && hasHalfStar
                                    ? "fill-yellow-400/50 text-yellow-400"
                                    : "text-gray-300",
                        )}
                    />
                ))}
            </div>
        )
    }

    return (
        <div className={cn("flex flex-col md:flex-row gap-6 md:gap-10 w-full", className)}>
            <div className="flex flex-col items-center md:items-start space-y-2 md:min-w-[140px]">
                <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">{averageRating}</span>
                    <span className="text-sm text-gray-500 ml-1">/ 5.0</span>
                </div>

                {renderStars()}

                <p className="text-sm text-gray-500 mt-1">
                    На основе <span className="font-medium text-gray-700">{totalReviews}</span> отзывов
                </p>

                {totalReviews > 0 && (
                    <div className="mt-2 text-center md:text-left">
                        <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                          {fiveStarPercentage}% клиентов рекомендуют
                        </span>
                    </div>
                )}
            </div>

            <div className="flex-1">
                {totalReviews > 0 ? (
                    <div className="space-y-2 w-full">
                        {ratingCounts
                            .slice()
                            .reverse()
                            .map((count, index) => {
                                const starNumber = 5 - index
                                const percentage = totalReviews ? (count / totalReviews) * 100 : 0
                                const animatedPercentage = totalReviews ? (animatedCounts[starNumber - 1] / totalReviews) * 100 : 0

                                return (
                                    <div className="flex items-center gap-3" key={index}>
                                        <div className="flex items-center min-w-[36px]">
                                            <span className="text-sm font-medium text-gray-700">{starNumber}</span>
                                            <Star className="w-3.5 h-3.5 ml-0.5 fill-yellow-400 text-yellow-400" />
                                        </div>

                                        <div className="relative flex-1">
                                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={cn(
                                                        "h-full rounded-full transition-all duration-1000 ease-out",
                                                        starNumber >= 4 ? "bg-green-500" : starNumber >= 3 ? "bg-yellow-500" : "bg-red-500",
                                                    )}
                                                    style={{ width: `${animatedPercentage}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="min-w-[40px] text-right">
                                          <span className="text-sm font-medium text-gray-700">
                                            {count > 0 ? `${Math.round(percentage)}%` : "0%"}
                                          </span>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full min-h-[120px] bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        <p className="text-gray-500 text-center">
                            Пока нет отзывов.
                            <br />
                            <span className="text-sm text-gray-400">Будьте первым, кто оставит отзыв!</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RatingDistribution