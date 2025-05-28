import { CatalogDevices, Container, ProductsGroupList, Title } from "@/components/shared";
import Link from "next/link";
import { Button } from "@/components/ui";
import BrandCardLink from "@/components/shared/BrandCardLink";

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
  discountPrice: number;
  image: string;
  price: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getItems = async (category: string, limit?: number) => {
  const res = await fetch(`${API_URL}/${category}${limit ? `?limit=${limit}` : ""}`, {
    cache: "no-store"
  });
  if (!res.ok) return [];
  return res.json();
};

export default async function CatalogPage() {
  const brands: Brand[] = await getItems("brands", 5);
  const productsDiscounts: Product[] = await getItems("catalog/discounts");
  const productNew: Product[] = await getItems("catalog/new");

  return (
      <Container className="p-5 flex flex-col gap-5">
        <div className="flex flex-col gap-[50px]">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <Title text="Бренды" className="text-[14px] sm:text-[16px] md:text-[26px]" />
              <Button variant="link">
                <Link href="/brands" className="text-[14px] pr-[20px]">Показать все</Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-1 justify-around">
              {brands.map(item => (
                  <BrandCardLink
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      imageUrl={`${API_URL}/images/brand/${item.imageUrl}`}
                  />
              ))}
            </div>
          </div>

          <div>
            <Title text="Категории" className="text-[26px] pb-[20px]" />
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
