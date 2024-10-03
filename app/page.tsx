import { Container, Title, TopBar, Filters, ProductsGroupList, AutoScrollCarousel } from "@/components/shared";
import { Button } from "@/components/ui";
import Link from "next/link";

interface BannerItem {
  id: number;
  title: string;
  imagePath: string;
}

const banners: BannerItem[] = [
  { id: 1, title: `Новый IPhone 16 Pro - "Покорите мир с новым iPhone 16 Pro — стиль и мощь в каждом кадре!"`, imagePath: "/iphone-16pro.jpg" },
  { id: 2, title: `Xiaomi 14 Ultra - новый флагман с шикарной камерой "С Xiaomi 14 Ultra каждый снимок — шедевр. Откройте для себя мир безграничных возможностей!"`, imagePath: "/xiaomi14-ultra.jpg" },
  { id: 3, title: `Iqoo Z9 Turbo - "Iqoo Z9 Turbo — мощный производитель с революционной камерой для тех, кто ценит скорость и качество!"`, imagePath: "/iqoo-z9.jpg" },
];

export default function Home() {
  return (
    <>
      <Container className="flex justify-center">
        <AutoScrollCarousel carouselItems={banners} />
      </Container>

      <TopBar />

      <Container className="pb-14 mt-10">
        <div className="flex gap-[80px]">
          <div className="flex-1">
            <div className="flex flex-col gap-[10px]">
              <ProductsGroupList
                title="Мобильные телефоны"
                items={[
                  {
                    id: 1,
                    name: `6.1" Смартфон Apple iPhone 13 128 ГБ зеленый`,
                    imageUrl: "https://c.dns-shop.ru/thumb/st1/fit/500/500/2a64a0f5e25a737679ce31588a560e6a/bd74bc38adc1e8b569d54823f3ca5580a76b3104c66dc6f8f299a4938b2d3db4.jpg.webp",
                    price: 79999,
                    items: [{ price: 79999 }]
                  },
                  {
                    id: 2,
                    name: `6.7" Смартфон Samsung Galaxy S22 Ultra 256 ГБ бордовый`,
                    imageUrl: "https://c.dns-shop.ru/thumb/st4/fit/500/500/b5e7a5d7fc1513f3c64f16bd2b738ab4/2ad9f445f19dc240c3b884a3169c3ac32db23b687dc58acc472b981a5f4e7206.jpg.webp",
                    price: 89999,
                    items: [{ price: 89999 }]
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
                    id: 6,
                    name: `6.55" Смартфон OPPO Reno11 F 256 ГБ зеленый`,
                    imageUrl: "https://c.dns-shop.ru/thumb/st1/fit/500/500/7a91cf3f67b9e61b7275867441b6595a/6d50670e84a526669e19d41d4b888e7958d61656af6a1ef3fc433d2b5cc5804a.jpg.webp",
                    price: 34999,
                    items: [{ price: 34999 }]
                  },
                ]}
                categoryId={1}
              />
              <Link href="/category/mobile-phone" className="flex w-[150px] m-auto bg-primary items-center justify-center rounded-[10px] p-[5px] text-white">Показать все</Link>

              <ProductsGroupList
                title="Ноутбуки"
                items={[
                  {
                    id: 1,
                    name: `14" Ноутбук Apple MacBook Pro M1 512 ГБ серый`,
                    imageUrl: "https://c.dns-shop.ru/thumb/st4/fit/500/500/995271bdcb9e629eb56cf1356422b55c/4836fd318384caea0e76d171e8b70c21063892db9498331838b02790640ed9a2.jpg.webp",
                    price: 149999,
                    items: [{ price: 149999 }]
                  },
                  {
                    id: 2,
                    name: `15.6" Ноутбук ASUS ROG Strix G15 G513RC-HN088 серый`,
                    imageUrl: "https://c.dns-shop.ru/thumb/st4/fit/500/500/0dba188df36c84e8acc2b9096d7751ca/05e39743f035541601bff8d7f54c4a0aa03702b8d8ebe77a816a46cb1686ced8.jpg.webp",
                    price: 109999,
                    items: [{ price: 109999 }]
                  },
                  {
                    id: 3,
                    name: `13.3" Ноутбук Apple MacBook Air M1 256 ГБ золотой`,
                    imageUrl: "https://c.dns-shop.ru/thumb/st1/fit/500/500/b0d0d7cf9ef6a88765bbffa11e8a2a65/bc1311aa320af2e639161b8f6b03f01d7f1d915c9186421f8472626fcad1195a.jpg.webp",
                    price: 99999,
                    items: [{ price: 99999 }]
                  },
                  {
                    id: 4,
                    name: `15.6" Ноутбук Dell Vostro 3520 черный`,
                    imageUrl: "https://c.dns-shop.ru/thumb/st1/fit/500/500/b5f6f84c5d49d3f532cca52b6f55d53f/6f218408201d77166a92e3d2949df8385e7a876b568447481278faa3110ef4aa.jpg.webp",
                    price: 43799,
                    items: [{ price: 43799 }]
                  },
                  {
                    id: 5,
                    name: `14" Ноутбук Lenovo ThinkPad X1 Carbon Gen 10 черный`,
                    imageUrl: "https://c.dns-shop.ru/thumb/st1/fit/500/500/53a9b40591ece8563bb7e060e47d5348/fb7690865b0fd47e31afc24acfd6821f5c11e90247442af7a2d99eb90b036bd3.jpg.webp",
                    price: 189999,
                    items: [{ price: 189999 }]
                  },
                  {
                    id: 6,
                    name: `16" Ноутбук HP Spectre x360 16-f1019nn черный`,
                    imageUrl: "https://c.dns-shop.ru/thumb/st1/fit/500/500/ae32c90d78042a58f74576af0a3e1f41/3ebbf5f9090da7c21378ad86cec9b8933926a483f0c25baa0816f7dff8ecfa7b.jpg.webp",
                    price: 139999,
                    items: [{ price: 139999 }]
                  },
                ]}
                categoryId={2}
              />
              <Link href="/category/laptop" className="flex w-[150px] m-auto bg-primary items-center justify-center rounded-[10px] p-[5px] text-white">Показать все</Link>
              
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
          </div>
        </div>
      </Container>
    </>
  );
}