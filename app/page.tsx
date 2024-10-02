import { Container, Title, TopBar, Filters, ProductsGroupList, AutoScrollCarousel } from "@/components/shared";

interface BannerItem {
  id: number
  title: string
  imagePath: string
}

const banners: BannerItem[] = [
  { id: 1, title: `Новый IPhone 16 Pro - "Покорите мир с новым iPhone 16 Pro — стиль и мощь в каждом кадре!"`, imagePath: "/iphone-16pro.jpg"},
  { id: 2, title: `Xiaomi 14 Ultra - новый флагман с шикарной камерой "С Xiaomi 14 Ultra каждый снимок — шедевр. Откройте для себя мир безграничных возможностей!`, imagePath: "/xiaomi14-ultra.jpg"},
  { id: 3, title: `Iqoo Z9 Turbo - "Iqoo Z9 Turbo — мощный производитель с революционной камерой для тех, кто ценит скорость и качество!"`, imagePath: "/iqoo-z9.jpg"},
];

export default function Home() {
  return (
    <>
      <Container className="flex justify-center">
        <AutoScrollCarousel carouselItems={banners}/>
      </Container>
      
      <Container className="mt-10">
        <Title text="Все товары" size="lg" className="font-extrabold mt-10"/>
      </Container>

      <TopBar />

      <Container className="pb-14 mt-10">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Filters />
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList 
                title="Мобильные телефоны"
                items={[
                  {
                    id: 1,
                    name: `6.53" Смартфон Xiaomi Redmi 9A 32 ГБ голубой`,
                    imageUrl: "https://c.dns-shop.ru/thumb/st1/fit/500/500/df734736baa2abc8a9740e0694db318d/66eb7747cadd9ab482c00abe6dec86b184a6c5261f45410ad91587988453e06e.jpg",
                    price: 8999,
                    items: [{price: 8999}]
                  },
                  {
                    id: 2,
                    name: `6.53" Смартфон Xiaomi Redmi 9A 32 ГБ голубой`,
                    imageUrl: "https://c.dns-shop.ru/thumb/st1/fit/500/500/df734736baa2abc8a9740e0694db318d/66eb7747cadd9ab482c00abe6dec86b184a6c5261f45410ad91587988453e06e.jpg",
                    price: 8999,
                    items: [{price: 8999}]
                  },
                  {
                    id: 3,
                    name: `6.53" Смартфон Xiaomi Redmi 9A 32 ГБ голубой`,
                    imageUrl: "https://c.dns-shop.ru/thumb/st1/fit/500/500/df734736baa2abc8a9740e0694db318d/66eb7747cadd9ab482c00abe6dec86b184a6c5261f45410ad91587988453e06e.jpg",
                    price: 8999,
                    items: [{price: 8999}]
                  },
                  {
                    id: 4,
                    name: `6.53" Смартфон Xiaomi Redmi 9A 32 ГБ голубой`,
                    imageUrl: "https://c.dns-shop.ru/thumb/st1/fit/500/500/df734736baa2abc8a9740e0694db318d/66eb7747cadd9ab482c00abe6dec86b184a6c5261f45410ad91587988453e06e.jpg",
                    price: 8999,
                    items: [{price: 8999}]
                  },
                  {
                    id: 5,
                    name: `6.53" Смартфон Xiaomi Redmi 9A 32 ГБ голубой`,
                    imageUrl: "https://c.dns-shop.ru/thumb/st1/fit/500/500/df734736baa2abc8a9740e0694db318d/66eb7747cadd9ab482c00abe6dec86b184a6c5261f45410ad91587988453e06e.jpg",
                    price: 8999,
                    items: [{price: 8999}]
                  },
                  {
                    id: 5,
                    name: `6.53" Смартфон Xiaomi Redmi 9A 32 ГБ голубой`,
                    imageUrl: "https://c.dns-shop.ru/thumb/st1/fit/500/500/df734736baa2abc8a9740e0694db318d/66eb7747cadd9ab482c00abe6dec86b184a6c5261f45410ad91587988453e06e.jpg",
                    price: 8999,
                    items: [{price: 8999}]
                  },
                ]}
                categoryId={1}
              />

              <ProductsGroupList 
                title="Ноутбуки"
                items={[
                  {
                    id: 1,
                    name: `13.3" Ноутбук Apple MacBook Air серый`,
                    imageUrl: "https://c.dns-shop.ru/thumb/st1/fit/500/500/b0d0d7cf9ef6a88765bbffa11e8a2a65/bc1311aa320af2e639161b8f6b03f01d7f1d915c9186421f8472626fcad1195a.jpg",
                    price:82269,
                    items: [{price: 82269}]
                  },
                  {
                    id: 2,
                    name: `13.3" Ноутбук Apple MacBook Air серый`,
                    imageUrl: "https://c.dns-shop.ru/thumb/st1/fit/500/500/b0d0d7cf9ef6a88765bbffa11e8a2a65/bc1311aa320af2e639161b8f6b03f01d7f1d915c9186421f8472626fcad1195a.jpg",
                    price:82269,
                    items: [{price: 82269}]
                  },
                  {
                    id: 3,
                    name: `13.3" Ноутбук Apple MacBook Air серый`,
                    imageUrl: "https://c.dns-shop.ru/thumb/st1/fit/500/500/b0d0d7cf9ef6a88765bbffa11e8a2a65/bc1311aa320af2e639161b8f6b03f01d7f1d915c9186421f8472626fcad1195a.jpg",
                    price:82269,
                    items: [{price: 82269}]
                  },
                  {
                    id: 4,
                    name: `13.3" Ноутбук Apple MacBook Air серый`,
                    imageUrl: "https://c.dns-shop.ru/thumb/st1/fit/500/500/b0d0d7cf9ef6a88765bbffa11e8a2a65/bc1311aa320af2e639161b8f6b03f01d7f1d915c9186421f8472626fcad1195a.jpg",
                    price:82269,
                    items: [{price: 82269}]
                  },
                  {
                    id: 5,
                    name: `13.3" Ноутбук Apple MacBook Air серый`,
                    imageUrl: "https://c.dns-shop.ru/thumb/st1/fit/500/500/b0d0d7cf9ef6a88765bbffa11e8a2a65/bc1311aa320af2e639161b8f6b03f01d7f1d915c9186421f8472626fcad1195a.jpg",
                    price:82269,
                    items: [{price: 82269}]
                  },
                  {
                    id: 6,
                    name: `13.3" Ноутбук Apple MacBook Air серый`,
                    imageUrl: "https://c.dns-shop.ru/thumb/st1/fit/500/500/b0d0d7cf9ef6a88765bbffa11e8a2a65/bc1311aa320af2e639161b8f6b03f01d7f1d915c9186421f8472626fcad1195a.jpg",
                    price:82269,
                    items: [{price: 82269}]
                  },
                ]}
                categoryId={2}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
