'use client'

import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useEffect, useState } from 'react';

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

interface CartItem {
    productId: number;
    quantity: number;
    price: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const CheckoutButton = ({ orderItems, totalPrice }: { orderItems: CartItem[], totalPrice: number }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem("token"));
        }
    }, []);

    const handlePayment = async () => {
        if (!publishableKey) {
            throw new Error("Stripe publishable key is not defined.");
        }

        const stripe = await loadStripe(publishableKey);
        if (!stripe) {
            console.error("Stripe has not loaded properly.");
            return;
        }

        try {
            const response = await axios.post(
                `${API_URL}/payment`,
                {
                    orderItems: orderItems,
                    totalPrice: totalPrice,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const sessionId = response.data.id;
            const { error } = await stripe.redirectToCheckout({ sessionId });

            if (error) {
                console.error("Ошибка при переходе на оплату:", error);
            }
        } catch (error) {
            console.error("Ошибка при создании сессии:", error);
        }
    };

    return <button onClick={handlePayment} disabled={!token}>Оплатить</button>;
};