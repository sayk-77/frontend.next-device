import { Port_Lligat_Sans } from 'next/font/google';
import { create } from 'zustand';

interface CartItem {
    productId: number;
    quantity: number;
    price: number;
}

interface CartState {
    items: CartItem[];
    addItem: (productId: number, quantity: number, price: number) => Promise<void>;
    removeItem: (productId: number) => Promise<void>;
    clearCart: () => void;
    initializeCart: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const useCartStore = create<CartState>((set) => ({
    items: [],
    addItem: async (productId, quantity, price) => {
        const token = localStorage.getItem('token');

        set((state) => {
            const existingItem = state.items.find(item => item.productId === productId);
            const updatedItems = existingItem
                ? state.items.map(item =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                  )
                : [...state.items, { productId, quantity, price }];

            localStorage.setItem('cartItems', JSON.stringify(updatedItems));

            return { items: updatedItems };
        });

        if (token) {
            await syncCartWithServer(productId, quantity, token);
        }
    },
    removeItem: async (productId: number) => {
        const token = localStorage.getItem('token');

        set((state) => {
            const updatedItems = state.items.filter(item => item.productId !== productId);
            localStorage.setItem('cartItems', JSON.stringify(updatedItems));

            return { items: updatedItems };
        });

        if (token) {
            await removeCartItemFromServer(productId, token);
        }
    },
    clearCart: () => {
        set({ items: [] });
        localStorage.removeItem('cartItems');
    },
    initializeCart: () => {
        const storedItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        set({ items: storedItems });
    },
}));

const syncCartWithServer = async (productId: number, quantity: number, token: string) => {
    try {
        const response = await fetch(`${API_URL}/cart/add`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId, quantity })
        });

        if (!response.ok) {
            throw new Error('Failed to sync item with server');
        }

        const data = await response.json();
        console.log('Item synced with server:', data);
    } catch (error) {
        console.error('Error syncing item with server:', error);
    }
};

const removeCartItemFromServer = async (productId: number, token: string) => {
    try {
        const response = await fetch(`${API_URL}/cart/remove/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to remove item from server');
        }

        const data = await response.json();
        console.log('Item removed from server:', data);
    } catch (error) {
        console.error('Error removing item from server:', error);
    }
};
