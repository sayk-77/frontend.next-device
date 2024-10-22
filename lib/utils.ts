import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function addFavorite(productId: number) {
  const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
  
  if (!favorites.includes(productId)) {
    favorites.push(productId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return "Товар добавлен в понравившиеся";
  }else {
    const updatedFavorites = favorites.filter(id => id !== productId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    return "Товар удален из понравившихся";
  }
}

export function getFavorite() {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
}