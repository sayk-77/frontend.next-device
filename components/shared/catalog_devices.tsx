import { Card, Container } from "@/components/shared"
import Link from "next/link"

const catalogDevices = [
    {
        id: 1,
        name: "Смартфоны",
        imageUrl: "https://avatars.mds.yandex.net/get-mpic/4721581/img_id3314186451693570420.jpeg/orig"
    },
    {
        id: 2,
        name: "Компьютеры",
        imageUrl: "https://ae04.alicdn.com/kf/Hb7036fa91e024d54b30b3e4fd009a050S.jpg"
    },
    {
        id: 3,
        name: "Ноутбуки",
        imageUrl: "https://static.tildacdn.com/tild6164-3134-4132-b634-626239623366/photo.png"
    },
    {
        id: 4,
        name: "Умные часы",
        imageUrl: "https://www.meleon.ru/upload/iblock/5be/new_w8_bluetooth_smart.jpg"
    },
    {
        id: 5,
        name: "Планшеты",
        imageUrl: "https://cdn.rbt.ru/images/gen/item_image/image/6497/24/649657_r3708.jpg"
    },
    {
        id: 6,
        name: "Аксесуары",
        imageUrl: "https://baseus1.ru/upload/iblock/701/7015585d10c573f0a7d659b994672a25.jpg"
    }
]

export const CatalogDevices = () => {
    return (
        <div className="flex flex-wrap gap-5 justify-between">
            {catalogDevices.map(device => (
                <Link href={`/catalog/${device.name}`} key={device.id}>
                    <Card 
                        name={device.name}
                        imageUrl={device.imageUrl}
                    />
                </Link>
            ))}
        </div>
    )
}