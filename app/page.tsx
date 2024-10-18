'use client';
import { Container, TopBar, ProductsGroupList, AutoScrollCarousel } from "@/components/shared";
import { useEffect, useState } from "react";
import axios from "axios";
import useBreadCrumbStore from "@/store/breadCrumbStore";

interface BannerItem {
  id: number;
  title: string;
  imageUrl: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  searchName: string
  discountPrice: number
  image: string;
  price: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

const fetchProducts = async (categoryUrl: string): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_URL}/catalog/${categoryUrl}`, {params: {limit: 6}});
    console.log(response.data)  
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
        { title: "Успей купить", categoryUrl: "discounts" },
        { title: "Новинки", categoryUrl: "new" },
        { title: "Мобильные телефоны", categoryUrl: "mobile" },
        { title: "Ноутбуки", categoryUrl: "laptop" }
      ];

      const fetchedProducts = await Promise.all(
        groups.map(async (group) => {
          const products = await fetchProducts(group.categoryUrl);
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
        <AutoScrollCarousel carouselItems={
        [
          { id: 1, title: `Новый IPhone 16 Pro - "Покорите мир с новым iPhone 16 Pro — стиль и мощь в каждом кадре!"`, imageUrl: `iphone-16pro.jpg` },
          { id: 2, title: `Xiaomi 14 Ultra - новый флагман с шикарной камерой "С Xiaomi 14 Ultra каждый снимок — шедевр. Откройте для себя мир безграничных возможностей!"`, imageUrl: "xiaomi14-ultra.jpg" },
          { id: 3, title: `Iqoo Z9 Turbo - "Iqoo Z9 Turbo — мощный производитель с революционной камерой для тех, кто ценит скорость и качество!"`, imageUrl: "iqoo-z9.jpg" },
        ]} 
        />
      </Container>

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
                  categoryUrl={`/catalog/${group.categoryUrl}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}