import { create } from 'zustand';

interface FavoritesState {
    favorites: number[];
    addFavorite: (productId: number) => void;
    removeFavorite: (productId: number) => void;
    initializeFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>((set) => ({
    favorites: [],
    initializeFavorites: () => {
        if (typeof window !== 'undefined') {
            const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            set({ favorites: storedFavorites });
        }
    },
    addFavorite: (productId) => {
        set((state) => {
            const updatedFavorites = [...state.favorites, productId];
            if (typeof window !== 'undefined') {
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            }
            return { favorites: updatedFavorites };
        });
    },
    removeFavorite: (productId) => {
        set((state) => {
            const updatedFavorites = state.favorites.filter(id => id !== productId);
            if (typeof window !== 'undefined') {
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            }
            return { favorites: updatedFavorites };
        });
    },
}));
