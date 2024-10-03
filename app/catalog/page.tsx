import { CatalogDevices, Container, Title } from "@/components/shared"
import { Card } from "@/components/shared"
import Link from "next/link"

const makerItems = [
    {
        id: 1,
        imageUrl: "https://chesnook.ru/image/catalog/11.10.2017/no-translate-detected_318-33267.jpg",
        name: "Apple"
    },
    {
        id: 2,
        imageUrl: "https://i02.appmifile.com/167_operatorx_operatorx_xm/17/04/2023/3ee25dde7d34039e7b79c2a9f123c75b.png",
        name: "Xiaomi"
    },
    {
        id: 3,
        imageUrl: "https://dumps.tadiphone.dev/uploads/-/system/group/avatar/78/vivo-1-logo-png-transparent.png",
        name: "Vivo"
    },
    {
        id: 4,
        imageUrl: "https://i.vimeocdn.com/portrait/38272609_640x640",
        name: "Samsung"
    },
    {
        id: 5,
        imageUrl: "https://bbshop.gr/wp-content/uploads/2021/12/asusBrands.png",
        name: "Asus"
    },
    {
        id: 6,
        imageUrl: "https://4-life.ru/upload/iblock/9de/0atqy0xiw0kvkee9vrpyj6caczvhqnsv/MSI-Logo-2011-2000x1125.png",
        name: "Msi"
    },
    {
        id: 7,
        imageUrl: "https://i.pinimg.com/736x/49/47/bd/4947bded9104c107a495acdb7283f4a6.jpg",
        name: "Huawei"
    },
    {
        id: 8,
        imageUrl: "https://skypka1.com/assets/images/logo/logo-2/sony.png",
        name: "Sony"
    },
    {
        id: 9,
        imageUrl: "https://avatars.mds.yandex.net/i?id=01090613e7874e415993e5346d8805064e9e7482-6903367-images-thumbs&n=13",
        name: "Techno"
    },
    {
        id: 10,
        imageUrl: "https://mobile-review.com/all/wp-content/uploads/2021/11/realme-logo.png",
        name: "Realme"
    },
    {
        id: 11,
        imageUrl: "https://пиксель.com/wp-content/uploads/2022/06/infinix_mobile-logo-brandlogos.net_.png",
        name: "Infinix"
    },
]

export default function CatalogPage () {
    return (
        <>
            <Container className="p-5 flex flex-col gap-5">
                <Title text="Каталог" className="text-[32px] font-bold"/>
                
                <div className="flex flex-col gap-[100px]">
                    <div className="flex flex-col gap-5">
                        <Link href="/makers" className="text-[28px]">Брeнды</Link>
                        <div className="flex flex-wrap gap-5 justify-between">
                            {
                                makerItems.map(item => (
                                    <Link href={`/makers/${item.name}`} key={item.id}>
                                        <Card
                                            imageUrl={item.imageUrl}
                                            name={item.name}
                                        />
                                    </Link>
                            ))}
                        </div>
                    </div>
                    
                    <div>
                        <Link href="/catalog/devices" className="text-[28px]">Устройства</Link>
                        <CatalogDevices />
                    </div>
                </div>
            </Container>
        </>
    )
}