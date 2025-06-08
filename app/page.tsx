import { Container, TopBar, ProductsGroupList, AutoScrollCarousel } from "@/components/shared";
import RegisterServiceWorker from "@/components/regSW";

interface Product {
  id: number;
  name: string;
  description: string;
  searchName: string;
  discountPrice: number;
  image: string;
  price: number;
}

export const metadata = {
    title: 'NextDevice — магазин электроники',
    description: 'NextDevice — удобный онлайн-магазин телефонов, планшетов, ноутбуков, аксессуаров и умных часов.',
    robots: 'index, follow',
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const productGroups = [
  { title: "Успей купить", categoryUrl: "discounts" },
  { title: "Новинки", categoryUrl: "new" },
  { title: "Мобильные телефоны", categoryUrl: "mobile" },
  { title: "Ноутбуки", categoryUrl: "laptop" }
];

async function fetchProducts(categoryUrl: string): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/catalog/${categoryUrl}?limit=6`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function Home() {
  const fetchedGroups = await Promise.all(
      productGroups.map(async (group) => {
        const products = await fetchProducts(group.categoryUrl);
        return { ...group, products };
      })
  );

  return (
      <>
        <div className="m-2">
          <Container className="flex justify-center">
            <AutoScrollCarousel
                carouselItems={[
                  { id: 1, title: `Новый IPhone 16 Pro - "Покорите мир с новым iPhone 16 Pro — стиль и мощь в каждом кадре!"`, imageUrl: `iphone-16pro.jpg` },
                  { id: 2, title: `Xiaomi 14 Ultra - новый флагман с шикарной камерой "С Xiaomi 14 Ultra каждый снимок — шедевр. Откройте для себя мир безграничных возможностей!"`, imageUrl: "xiaomi14-ultra.jpg" },
                  { id: 3, title: `Iqoo Z9 Turbo - "Iqoo Z9 Turbo — мощный производитель с революционной камерой для тех, кто ценит скорость и качество!"`, imageUrl: "iqoo-z9.jpg" },
                ]}
            />
          </Container>
        </div>

        <Container className="pb-14 mt-10">
          <div className="flex flex-col gap-[40px]">
            <div className="flex-1">
              <div className="flex flex-col gap-[30px]">
                {fetchedGroups.map((group) => (
                    <ProductsGroupList
                        key={group.title}
                        title={group.title}
                        loading={false}
                        products={group.products}
                        categoryUrl={`/catalog/${group.categoryUrl}`}
                    />
                ))}
              </div>
            </div>
          </div>
          <RegisterServiceWorker />
        </Container>
      </>
  );
}
