import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton, Button } from "../ui";
import { useCartStore } from '@/store/cartStore';

interface Product {
    id: number;
    name: string;
    description: string;
    searchName: string;
    discountPrice: number;
    images: {
        id: number;
        imageUrl: string;
        isMain: boolean;
    }[];
    price: number;
}

interface CartItemProps {
    productId: number;
    quantity: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const CartItem: React.FC<CartItemProps> = ({ productId, quantity }) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const { addItem, removeItem } = useCartStore();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await axios.get(`${API_URL}/products/${productId}`);
                setProduct(response.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        getProduct();
    }, [productId]);

    const handleIncrease = () => {
        if (product) {
            addItem(productId, 1, product.price);
        }
    };

    const handleDecrease = () => {
        if (product) {
            if (quantity > 1) {
                addItem(productId, -1, product.price);
            } else {
                removeItem(productId);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-between items-center p-4 bg-white border-b border-gray-200 mb-4">
                <div className="flex items-center">
                    <div className="w-20 h-20 mr-4">
                        <Skeleton/>
                    </div>
                    <div className="flex flex-col">
                        <Skeleton/>
                        <Skeleton/>
                    </div>
                </div>
                <div className="text-right">
                    <Skeleton/>
                </div>
            </div>
        );
    }

    if (!product) return null;

    return (
        <div className="flex justify-between items-center p-4 bg-white border-b border-gray-200 mb-4">
            <div className="flex items-center">
                <div className="w-20 h-20 mr-4 relative">
                    <Image
                        src={`${API_URL}/images/product/${product.images[0].imageUrl}`}
                        alt={product.name}
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <div className="flex flex-col">
                    <h4 className="font-semibold text-lg">{product.name}</h4>
                    <p className="text-sm text-gray-500">Количество: {quantity}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <Button onClick={handleDecrease} variant="link">-</Button>
                        <span className="font-bold">{quantity}</span>
                        <Button onClick={handleIncrease} variant="link">+</Button>
                    </div>
                </div>
            </div>
            <div className="text-right">
                {product.discountPrice ? (
                    <div>
                        <p className="text-gray-500 line-through text-sm">{product.price} Р</p>
                        <p className="text-lg font-semibold text-black">{product.price - product.discountPrice} Р</p>
                    </div>
                ) : (
                    <p className="text-lg font-semibold text-black">{product.price} Р</p>
                )}
            </div>
        </div>
    );
};