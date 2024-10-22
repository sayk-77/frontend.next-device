import { create } from 'zustand';

interface CartItem {
    productId: number;
    quantity: number;
    price: number;
}

interface CartState {
    items: CartItem[];
    addItem: (productId: number, quantity: number, price: number) => void;
    removeItem: (productId: number) => void;
    clearCart: () => void;
    initializeCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    items: [],
    addItem: (productId, quantity, price) => {
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
    },
    removeItem: (productId) => {
        set((state) => {
            const updatedItems = state.items.filter(item => item.productId !== productId);
            localStorage.setItem('cartItems', JSON.stringify(updatedItems));
            return { items: updatedItems };
        });
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