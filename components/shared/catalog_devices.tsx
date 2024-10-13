import { Card, Container } from "@/components/shared"
import Link from "next/link"

const catalogDevices = [
    {
        id: 1,
        title: "Смартфоны",
        category: "mobile",
        imageUrl: "/mobile.webp"
    },
    {
        id: 2,
        title: "Компьютеры",
        category: "pc",
        imageUrl: "/pc.avif"
    },
    {
        id: 3,
        title: "Ноутбуки",
        category: "laptop",
        imageUrl: "/laptop.png"
    },
    {
        id: 4,
        title: "Умные часы",
        category: "smart-watch",
        imageUrl: "/smart_watch.jpg"
    },
    {
        id: 5,
        title: "Планшеты",
        category: "tablet",
        imageUrl: "/tablet.jpg"
    },
    {
        id: 6,
        title: "Аксесуары",
        category: "accessories",
        imageUrl: "/accessories.jpg"
    }
]

export const CatalogDevices = () => {
    return (
        <div className="flex flex-wrap gap-5 justify-between">
            {catalogDevices.map(device => (
                <Link href={`/catalog/${device.category}`} key={device.id}>
                    <Card 
                        name={device.title}
                        imageUrl={device.imageUrl}
                    />
                </Link>
            ))}
        </div>
    )
}