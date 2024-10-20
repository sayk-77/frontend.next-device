interface Product {
    id: number;
    sku: string;
    name: string;
    searchName: string
    description: string;
    price: number;
    discountPrice: number;
    stock: number;
    categoryId: number;
    brandId: number;
    createdAt: string;
    updatedAt: string;
    category: {
      id: number;
      name: string;
      title: string
      parentCategoryId: number | null;
      subCategories: any[] | null; 
    };
    brand: {
      id: number;
      imageUrl: string;
      name: string;
    };
    variants: any[]; // TODO: add variants
    images: {
      id: number;
      productId: number;
      imageUrl: string;
      isMain: boolean; 
    }[];
    reviews: any[] | null; // TODO: add reviews
    details: {
      id: number;
      productId: number;
      processor: string;
      ram: string;
      storage: string;
      display: string;
      camera: string;
      battery: string;
      os: string;
      dimensions: string;
      weight: string;
    }
  }