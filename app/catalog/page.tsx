'use client'
import { CatalogDevices, Container, ProductsGroupList, Title } from "@/components/shared";
import { Card } from "@/components/shared";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Brand {
  id: number;
  name: string;
  imageUrl: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getItems = async (category: string, limit: number = 4) => {
  try {
    const response = await axios.get(`${API_URL}/${category}`, {
      params: { limit }
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default function CatalogPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [productsDiscounts, setProductDiscounts] = useState<Product[]>([]);
  const [productNew, setProductNew] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedBrands = await getItems('brands');
      const fetchedDiscounts = await getItems('catalog/discounts');
      const fetchedNewProducts = await getItems('catalog/new');

      setBrands(fetchedBrands);
      setProductDiscounts(fetchedDiscounts);
      setProductNew(fetchedNewProducts);
    };

    fetchData();
  }, []);

  return (
    <>
      <Container className="p-5 flex flex-col gap-5">
        <Title text="Каталог" className="text-[32px] font-bold" />

        <div className="flex flex-col gap-[50px]">
          <div className="flex flex-col gap-5">
            <Link href="/makers" className="text-[28px]">Брeнды</Link>
            <div className="flex flex-wrap gap-5 justify-between">
              {brands.map(item => (
                <Link href={`/brands/${item.name}`} key={item.id}>
                  <Card
                    imageUrl={`${API_URL}/images/brand/${item.imageUrl}`}
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
            products={productsDiscounts}
            categoryUrl="catalog/discounts"
          />

          <ProductsGroupList
            title="Новинки"
            products={productNew}
            categoryUrl="catalog/new"
          />

        </div>
      </Container>
    </>
  );
}