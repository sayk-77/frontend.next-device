import { CatalogDevices, Container, ProductsGroupList, Title } from "@/components/shared"
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
                
                <div className="flex flex-col gap-[50px]">
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
                    
                    <ProductsGroupList
                        title="Успей купить"
                        items={[
                          {
                            id: 1,
                            name: `6.1" Смартфон Apple iPhone 13 128 ГБ зеленый`,
                            imageUrl: "https://c.dns-shop.ru/thumb/st1/fit/500/500/2a64a0f5e25a737679ce31588a560e6a/bd74bc38adc1e8b569d54823f3ca5580a76b3104c66dc6f8f299a4938b2d3db4.jpg.webp",
                            price: 79999,
                            items: [{ price: 79999 }]
                          },
                          {
                            id: 4,
                            name: `15.6" Ноутбук Dell Vostro 3520 черный`,
                            imageUrl: "https://c.dns-shop.ru/thumb/st1/fit/500/500/b5f6f84c5d49d3f532cca52b6f55d53f/6f218408201d77166a92e3d2949df8385e7a876b568447481278faa3110ef4aa.jpg.webp",
                            price: 43799,
                            items: [{ price: 43799 }]
                          },
                          {
                            id: 3,
                            name: `6.53" Смартфон Xiaomi Redmi Note 10 128 ГБ оранжевый`,
                            imageUrl: "https://c.dns-shop.ru/thumb/st4/fit/500/500/2e5bc0de4aecb9fd48b1fa46b0440d3c/de6b3e2ec520139031e9d0dbcecb8f85573cf7195c88d3b8da6ce89db4785428.jpg.webp",
                            price: 18999,
                            items: [{ price: 18999 }]
                          },
                          {
                            id: 4,
                            name: `6.72" Смартфон OnePlus Nord N30 8 ГБ/128 ГБ черный`,
                            imageUrl: "https://c.dns-shop.ru/thumb/st4/fit/500/500/38bc123f9f89ca26ff3aa7157225b999/3a3007deb9cb8f5ef91502c416047861c03080354b909dffebb492bc7c312b4f.png.webp",
                            price: 29999,
                            items: [{ price: 29999 }]
                          },
                          {
                            id: 5,
                            name: `6.4" Смартфон Realme 8 128 ГБ серебристый`,
                            imageUrl: "https://c.dns-shop.ru/thumb/st4/fit/500/500/7b50df0072147757a899fe29dfb3b3f8/0d72fca1c9705e84c659d48725dae6856f189f80f7541954f05565f388ec387d.jpg.webp",
                            price: 17999,
                            items: [{ price: 17999 }]
                          },
                          {
                            id: 1,
                            name: `14" Ноутбук Apple MacBook Pro M1 512 ГБ серый`,
                            imageUrl: "https://c.dns-shop.ru/thumb/st4/fit/500/500/995271bdcb9e629eb56cf1356422b55c/4836fd318384caea0e76d171e8b70c21063892db9498331838b02790640ed9a2.jpg.webp",
                            price: 149999,
                            items: [{ price: 149999 }]
                          },
                        ]}
                    categoryId={3}
                  />
                  <Link href="/category/discount" className="flex w-[150px] m-auto bg-primary items-center justify-center rounded-[10px] p-[5px] text-white">Показать все</Link>
                
                  <ProductsGroupList
                    title="Популярные товары"
                    items={[
                      {
                        id: 1,
                        name: `6.1" Смартфон Apple iPhone 13 128 ГБ зеленый`,
                        imageUrl: "https://c.dns-shop.ru/thumb/st1/fit/500/500/2a64a0f5e25a737679ce31588a560e6a/bd74bc38adc1e8b569d54823f3ca5580a76b3104c66dc6f8f299a4938b2d3db4.jpg.webp",
                        price: 79999,
                        items: [{ price: 79999 }]
                      },
                      {
                        id: 4,
                        name: `15.6" Ноутбук Dell Vostro 3520 черный`,
                        imageUrl: "https://c.dns-shop.ru/thumb/st1/fit/500/500/b5f6f84c5d49d3f532cca52b6f55d53f/6f218408201d77166a92e3d2949df8385e7a876b568447481278faa3110ef4aa.jpg.webp",
                        price: 43799,
                        items: [{ price: 43799 }]
                      },
                      {
                        id: 3,
                        name: `6.53" Смартфон Xiaomi Redmi Note 10 128 ГБ оранжевый`,
                        imageUrl: "https://c.dns-shop.ru/thumb/st4/fit/500/500/2e5bc0de4aecb9fd48b1fa46b0440d3c/de6b3e2ec520139031e9d0dbcecb8f85573cf7195c88d3b8da6ce89db4785428.jpg.webp",
                        price: 18999,
                        items: [{ price: 18999 }]
                      },
                      {
                        id: 4,
                        name: `6.72" Смартфон OnePlus Nord N30 8 ГБ/128 ГБ черный`,
                        imageUrl: "https://c.dns-shop.ru/thumb/st4/fit/500/500/38bc123f9f89ca26ff3aa7157225b999/3a3007deb9cb8f5ef91502c416047861c03080354b909dffebb492bc7c312b4f.png.webp",
                        price: 29999,
                        items: [{ price: 29999 }]
                      },
                      {
                        id: 5,
                        name: `6.4" Смартфон Realme 8 128 ГБ серебристый`,
                        imageUrl: "https://c.dns-shop.ru/thumb/st4/fit/500/500/7b50df0072147757a899fe29dfb3b3f8/0d72fca1c9705e84c659d48725dae6856f189f80f7541954f05565f388ec387d.jpg.webp",
                        price: 17999,
                        items: [{ price: 17999 }]
                      },
                      {
                        id: 1,
                        name: `14" Ноутбук Apple MacBook Pro M1 512 ГБ серый`,
                        imageUrl: "https://c.dns-shop.ru/thumb/st4/fit/500/500/995271bdcb9e629eb56cf1356422b55c/4836fd318384caea0e76d171e8b70c21063892db9498331838b02790640ed9a2.jpg.webp",
                        price: 149999,
                        items: [{ price: 149999 }]
                      },
                    ]}
                    categoryId={3}
                  />
                  <Link href="/category/popularity" className="flex w-[150px] m-auto bg-primary items-center justify-center rounded-[10px] p-[5px] text-white">Показать все</Link>
                
                </div>
            </Container>
        </>
    )
}