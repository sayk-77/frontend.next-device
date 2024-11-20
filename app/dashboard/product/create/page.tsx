'use client'

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Brand, Category, DynamicField} from '@/types/type';
import { Title } from '@/components/shared';
import { toast } from 'react-toastify';

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function NewProduct() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [dynamicFields, setDynamicFields] = useState<DynamicField[]>([]);
    
    const [productData, setProductData] = useState<{
      name: string;
      description: string;
      price: number;
      discountPrice: number;
      stock: number;
      categoryId: number;
      brandId: number;
      sku: string;
      searchName: string
    }>({
      name: '',
      description: '',
      price: 0.0,
      discountPrice: 0.0,
      stock: 0,
      categoryId: 0,
      brandId: 0,
      sku: '',
      searchName: ''
    });
  
    const [productDetails, setProductDetails] = useState<{
      productId: number
      processor: string;
      graphicsCard: string;
      ram: string;
      storage: string;
      display: string;
      camera: string;
      battery: string;
      os: string;
      dimensions: string;
      weight: string;
    }>({
      productId: 0,
      processor: '',
      graphicsCard: '',
      ram: '',
      storage: '',
      display: '',
      camera: '',
      battery: '',
      os: '',
      dimensions: '',
      weight: ''
    });
  
    const [filters, setFilters] = useState<{ [key: string]: string }>({});
  
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [images, setImages] = useState<File[]>([]);
  
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [brandRes, categoryRes] = await Promise.all([
            axios.get<Brand[]>(`${API_URL}/brands`),
            axios.get<Category[]>(`${API_URL}/categories`),
          ]);
          setBrands(brandRes.data);
          setCategories(categoryRes.data);
        } catch (error) {
          console.error('Ошибка загрузки данных:', error);
        }
      };
  
      fetchData();
    }, []);
  
    useEffect(() => {
      const selectedCategory = categories.find(
        (cat) => cat.id === productData.categoryId
      );
      if (!selectedCategory) return;
  
      if (selectedCategory.name === 'mobile' || selectedCategory.name === 'tablet') {
        setDynamicFields([
          { name: 'DisplaySize', label: 'Размер экрана', type: 'number' },
          { name: 'RAM', label: 'ОЗУ', type: 'number' },
          { name: 'Storage', label: 'Память', type: 'number' },
          { name: 'CameraQuality', label: 'Качество камеры', type: 'number' },
          { name: 'Processor', label: 'Процессор', type: 'text' },
          { name: 'Battery', label: 'Ёмкость батареи', type: 'number' },
          { name: 'OS', label: 'Операционная система', type: 'text' },
        ]);
      } else if (selectedCategory.name === 'laptop') {
        setDynamicFields([
          { name: 'ProcessorBrand', label: 'Бренд процессора', type: 'text' },
          { name: 'ProcessorName', label: 'Название процессора', type: 'text' },
          { name: 'GraphicsCardType', label: 'Тип видеокарты', type: 'text' },
          { name: 'GraphicsCardName', label: 'Название видеокарты', type: 'text' },
          { name: 'RAM', label: 'ОЗУ', type: 'number' },
          { name: 'Storage', label: 'Память', type: 'number' },
          { name: 'ScreenSize', label: 'Размер экрана', type: 'number' },
        ]);
      } else {
        setDynamicFields([]);
      }
    }, [productData.categoryId, categories]);
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setProductData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleDynamicFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleDetailChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setProductDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;
  
      const fileArray = Array.from(files).slice(0, 8);
      const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
      setImagePreviews(newPreviews);
      setImages(fileArray);
    };
  
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setMessage('');
        
      productData.price = Number(productData.price)
      productData.discountPrice = Number(productData.discountPrice)
      productData.stock = Number(productData.stock)
      productData.brandId = Number(productData.brandId)
      productData.categoryId = Number(productData.categoryId)
    
      console.log(productData)
      console.log(productDetails)
      console.log(filters)
      console.log(images)
      
      try {
        const response = await axios.post(`${API_URL}/products`, productData)
        const productId = response.data.productId
        
        if (productId) {
            productDetails.productId = Number(productId)
            
            try {
                const response = await axios.post(`${API_URL}/product/details`, productDetails)
                
                if (response.status === 200) {
                    const formData = new FormData();
                    images.forEach(image => {
                        formData.append('images', image);
                    });
                    formData.append("productId", productId)
                    
                    try {
                        const response = await axios.post(`${API_URL}/product/images`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            }})
                        if (response.status === 200) {
                            toast.info('Товар добавлен')
                            setLoading(false);
                            window.location.href = '/dashboard';
                        }
                    } catch (err) {
                        console.log(err)
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
      } catch (err) {
        console.log(err)
        toast.error('Попробуйте позже')
      }
      return
    };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Добавить новый товар</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Название товара</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Название для поиска</label>
          <input
            type="text"
            name="searchName"
            value={productData.searchName}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Количество на складе</label>
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Описание</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium">Цена</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Категория</label>
          <select
            name="categoryId"
            value={productData.categoryId}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Выберите категорию</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Процессор</label>
          <input
            type="text"
            name="processor"
            value={productDetails.processor}
            onChange={handleDetailChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">ОЗУ</label>
          <input
            type="text"
            name="ram"
            value={productDetails.ram}
            onChange={handleDetailChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Память</label>
          <input
            type="text"
            name="storage"
            value={productDetails.storage}
            onChange={handleDetailChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Дисплей</label>
          <input
            type="text"
            name="display"
            value={productDetails.display}
            onChange={handleDetailChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Батарея</label>
          <input
            type="text"
            name="battery"
            value={productDetails.battery}
            onChange={handleDetailChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Камера</label>
          <input
            type="text"
            name="camera"
            value={productDetails.camera}
            onChange={handleDetailChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Операционная система</label>
          <input
            type="text"
            name="os"
            value={productDetails.os}
            onChange={handleDetailChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Размеры</label>
          <input
            type="text"
            name="dimensions"
            value={productDetails.dimensions}
            onChange={handleDetailChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Вес</label>
          <input
            type="text"
            name="weight"
            value={productDetails.weight}
            onChange={handleDetailChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Бренд</label>
          <select
            name="brandId"
            value={productData.brandId}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Выберите бренд</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
         <div>
          <label className="block text-sm font-medium">Изображения</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="block w-full text-sm"
          />
          <div className="flex flex-wrap justify-between gap-[20px]">
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Предпросмотр ${index + 1}`}
                className="max-h-[300px] max-w-[400px]"
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? 'Добавление...' : 'Добавить товар'}
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
