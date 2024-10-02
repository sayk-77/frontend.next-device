"use client"

import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"

interface CarouselItem {
    id: number
    imageUrl: string
    title: string
}
  
interface ProductCarouselProps {
    carouselItems: CarouselItem[];
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ carouselItems }) => {
  const [mainCarouselRef, mainEmblaApi] = useEmblaCarousel()
  const [thumbCarouselRef, thumbEmblaApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  })

  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const onThumbClick = React.useCallback(
    (index: number) => {
      if (!mainEmblaApi || !thumbEmblaApi) return
      mainEmblaApi.scrollTo(index)
    },
    [mainEmblaApi, thumbEmblaApi]
  )

  const onSelect = React.useCallback(() => {
    if (!mainEmblaApi) return
    const snapList = mainEmblaApi.scrollSnapList()
    const currentIndex = snapList.findIndex((snap, index) => index === mainEmblaApi.scrollProgress())
    setSelectedIndex(currentIndex)
  }, [mainEmblaApi])

  React.useEffect(() => {
    if (!mainEmblaApi) return

    onSelect()
    mainEmblaApi.on("select", onSelect)
  }, [mainEmblaApi, onSelect])

  return (
    <Card className="w-full h-full max-w-[500px] max-h-[500px] mx-auto pb-150 border-none">
      <CardContent className="p-0">
        <div className="relative">
          <div ref={mainCarouselRef} className="overflow-hidden">
            <div className="flex">
              {carouselItems.map((item) => (
                <div key={item.id} className="flex-[0_0_100%] min-w-0">
                  <div className="relative w-[500px] h-[500px]">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-scale-down rounded-xl"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div ref={thumbCarouselRef} className="overflow-hidden mt-2">
          <div className="flex">
            {carouselItems.map((item, index) => (
              <button
                key={item.id}
                className={`flex-[0_0_20%] min-w-0 p-1 cursor-pointer transition-opacity ${index === selectedIndex ? "opacity-100" : "opacity-50"}`}
                onClick={() => onThumbClick(index)}
              >
                <img
                  src={item.imageUrl}
                  alt={`Thumbnail ${item.title}`}
                  className="w-full h-[120px] object-scale-down rounded"
                />
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
