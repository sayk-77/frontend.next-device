'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface ProductDetails {
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
}

interface Product {
    id: number;
    sku: string;
    name: string;
    searchName: string;
    description: string;
    price: number;
    discountPrice: number;
    stock: number;
    categoryId: number;
    brandId: number;
    details: ProductDetails;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const EditProductPage = ({ params }: { params: { searchName: string } }) => {
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (params.searchName) {
            axios.get(`${API_URL}/products/${params.searchName}`).then(response => {
                setProduct(response.data);
            }).catch((error) => {
                console.error('Error fetching product:', error);
            });
        }
    }, [params.searchName]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key?: string) => {
        if (!product) return;
        
        const { name, value } = e.target;
        
        if (key) {
            setProduct(prevProduct => ({
                ...prevProduct!,
                details: {
                    ...prevProduct!.details,
                    [key]: value,
                }
            }));
        } else {
            setProduct(prevProduct => ({
                ...prevProduct!,
                [name]: value,
            }));
        }
    };

    const saveProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!product) return;
        
        e.preventDefault()

        const updatedProduct: Product = {
            ...product,
            details: {
                processor: product.details.processor,
                graphicsCard: product.details.graphicsCard,
                ram: product.details.ram,
                storage: product.details.storage,
                display: product.details.display,
                camera: product.details.camera,
                battery: product.details.battery,
                os: product.details.os,
                dimensions: product.details.dimensions,
                weight: product.details.weight,
            }
        };
        
        updatedProduct.price = Number(updatedProduct.price)
        updatedProduct.discountPrice = Number(updatedProduct.discountPrice)
        
        try {
         const response = await axios.put(`${API_URL}/products`, updatedProduct)
         
         if (response.status === 200) {
            toast.info('Данные обновлены')
            window.location.href = '/dashboard';
         }
        } catch (err) {
            console.log(err)
            toast.error('Попробуйте позже')
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }
    
    const cancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        window.location.href = '/dashboard';
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-6">Изменить продукт</h1>
            <form>
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Основная информация</h2>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Название продукта:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Описание:
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                Price:
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="discountPrice" className="block text-sm font-medium text-gray-700">
                                Скидка:
                            </label>
                            <input
                                type="number"
                                id="discountPrice"
                                name="discountPrice"
                                value={product.discountPrice}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                            Количество на складе:
                        </label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            value={product.stock}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </section>
        
                <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Спецификация</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="processor" className="block text-sm font-medium text-gray-700">
                            Процессор:
                        </label>
                        <input
                            type="text"
                            id="processor"
                            name="processor"
                            value={product.details.processor}
                            onChange={(e) => handleChange(e, 'processor')}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="ram" className="block text-sm font-medium text-gray-700">
                            Оперативная память (RAM):
                        </label>
                        <input
                            type="text"
                            id="ram"
                            name="ram"
                            value={product.details.ram}
                            onChange={(e) => handleChange(e, 'ram')}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="storage" className="block text-sm font-medium text-gray-700">
                            Хранилище (Storage):
                        </label>
                        <input
                            type="text"
                            id="storage"
                            name="storage"
                            value={product.details.storage}
                            onChange={(e) => handleChange(e, 'storage')}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="display" className="block text-sm font-medium text-gray-700">
                            Экран:
                        </label>
                        <input
                            type="text"
                            id="display"
                            name="display"
                            value={product.details.display}
                            onChange={(e) => handleChange(e, 'display')}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="camera" className="block text-sm font-medium text-gray-700">
                            Камера:
                        </label>
                        <input
                            type="text"
                            id="camera"
                            name="camera"
                            value={product.details.camera}
                            onChange={(e) => handleChange(e, 'camera')}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="battery" className="block text-sm font-medium text-gray-700">
                            Батарея:
                        </label>
                        <input
                            type="text"
                            id="battery"
                            name="battery"
                            value={product.details.battery}
                            onChange={(e) => handleChange(e, 'battery')}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="os" className="block text-sm font-medium text-gray-700">
                            Операционная система:
                        </label>
                        <input
                            type="text"
                            id="os"
                            name="os"
                            value={product.details.os}
                            onChange={(e) => handleChange(e, 'os')}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700">
                            Габариты:
                        </label>
                        <input
                            type="text"
                            id="dimensions"
                            name="dimensions"
                            value={product.details.dimensions}
                            onChange={(e) => handleChange(e, 'dimensions')}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                            Вес:
                        </label>
                        <input
                            type="text"
                            id="weight"
                            name="weight"
                            value={product.details.weight}
                            onChange={(e) => handleChange(e, 'weight')}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                </div>
            </section>
                <div className='flex justify-end'>
                    <Button variant="link" onClick={(e: React.MouseEvent<HTMLButtonElement>) => saveProduct(e)}>
                        Сохранить
                    </Button>
                    <Button variant="link" onClick={(e: React.MouseEvent<HTMLButtonElement>) => cancel(e)}>
                        Отменить
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditProductPage;