export interface Brand {
    id: number;
    imageUrl: string;
    name: string;
    banners?: string | null;
  }
  
  export interface Category {
    id: number;
    name: string;
    categoryImage: string;
    parentCategoryId: number | null;
    title: string;
    subCategories?: Category[] | null;
  }
  
  export interface DynamicField {
    name: string;
    label: string;
    type: 'text' | 'number';
  }
  
  export interface ProductFormData {
    name: string;
    description: string;
    price: string;
    discountPrice: string;
    stock: string;
    categoryId: string;
    brandId: string;
    sku: string;
    filters: Record<string, string>;
    details: Record<string, string>;
  }