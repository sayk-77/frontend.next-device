'use client';
import { CatalogDevices, Container, ProductsGroupList, Title } from "@/components/shared";
import { Card } from "@/components/shared";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import useBrandStore from "@/store/storeBrand";
import { Button } from "@/components/ui";

interface Brand {
  id: number;
  name: string;
  imageUrl: string;
}

interface Product {
  id: number;
  name: string;
  searchName: string;
  description: string;
  image: string;
  price: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getItems = async (category: string, limit?: number) => {
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
  
  const setBrandId = useBrandStore(state => state.setBrandId);
  const setBrandName = useBrandStore(state => state.setBrandName);

  useEffect(() => {

    const fetchData = async () => {
      const fetchedBrands = await getItems('brands', 5);
      const fetchedDiscounts = await getItems('catalog/discounts');
      const fetchedNewProducts = await getItems('catalog/new');

      setBrands(fetchedBrands);
      setProductDiscounts(fetchedDiscounts);
      setProductNew(fetchedNewProducts);
      
    };

    fetchData();
  }, []);

  const handleBrandClick = (id: number, name: string) => {
    setBrandId(id);
    setBrandName(name);
  };

  return (
    <Container className="p-5 flex flex-col gap-5">
      <div className="flex flex-col gap-[50px]">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <Title text="Бренды" className="text-[26px]"/>
            <Button variant="link">
              <Link href="/brands" className="text-[14px] pr-[30px]">Показать все</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-5 justify-between">
            {brands.map(item => (
              <Link href={`/brands/${item.name}`} key={item.id} onClick={() => handleBrandClick(item.id, item.name)}>
                <Card
                  imageUrl={`${API_URL}/images/brand/${item.imageUrl}`}
                  name={item.name}
                />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <Title text="Категории" className="text-[26px] pb-[20px]"/>
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
  );
}