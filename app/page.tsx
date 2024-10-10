'use client';
import { Container, TopBar, ProductsGroupList, AutoScrollCarousel } from "@/components/shared";
import { useEffect, useState } from "react";
import axios from "axios";

interface BannerItem {
  id: number;
  title: string;
  imagePath: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

const banners: BannerItem[] = [
  { id: 1, title: `Новый IPhone 16 Pro - "Покорите мир с новым iPhone 16 Pro — стиль и мощь в каждом кадре!"`, imagePath: "/iphone-16pro.jpg" },
  { id: 2, title: `Xiaomi 14 Ultra - новый флагман с шикарной камерой "С Xiaomi 14 Ultra каждый снимок — шедевр. Откройте для себя мир безграничных возможностей!"`, imagePath: "/xiaomi14-ultra.jpg" },
  { id: 3, title: `Iqoo Z9 Turbo - "Iqoo Z9 Turbo — мощный производитель с революционной камерой для тех, кто ценит скорость и качество!"`, imagePath: "/iqoo-z9.jpg" },
];

const fetchProducts = async (categoryUrl: string, limit: number = 4): Promise<Product[]> => {
  try {
    const response = await axios.get(`http://localhost:5000/api/catalog/${categoryUrl}`, {
      params: { limit }
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default function Home() {
  const [productGroups, setProductGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProducts = async () => {
      const groups = [
        { title: "Мобильные телефоны", categoryUrl: "category/mobile" },
        { title: "Ноутбуки", categoryUrl: "category/laptop" },
        { title: "Успей купить", categoryUrl: "discounts" },
        { title: "Новинки", categoryUrl: "new" },
      ];

      const fetchedProducts = await Promise.all(
        groups.map(async (group) => {
          const products = await fetchProducts(group.categoryUrl, 4);
          return { ...group, products };
        })
      );

      setProductGroups(fetchedProducts);
      setLoading(false);
    };

    loadProducts();
  }, []);

  return (
    <>
      <Container className="flex justify-center">
        <AutoScrollCarousel carouselItems={banners} />
      </Container>

      <TopBar />

      <Container className="pb-14 mt-10">
        <div className="flex flex-col gap-[40px]">
          <div className="flex-1">
            <div className="flex flex-col gap-[30px]">
              {productGroups.map((group) => (
                <ProductsGroupList
                  key={group.title}
                  title={group.title}
                  loading={loading}
                  products={group.products}
                  categoryUrl={`/category/${group.categoryUrl}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}