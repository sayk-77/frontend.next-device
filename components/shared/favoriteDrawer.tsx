import { useFavoritesStore } from "@/store/favoriteStore";
import { FavoriteItem } from "./favoriteItem";
import { Button } from "../ui";

interface FavoritesDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({ isOpen, onClose }) => {
    const { favorites } = useFavoritesStore();

    return (
        <div className={`fixed top-0 z-40 right-0 h-full bg-white duration-500 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} shadow-lg`}>
            <div className="p-4 h-full overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">Избранные товары</h2>
                    <Button variant="link" onClick={onClose}>Закрыть</Button>
                </div>
                {favorites.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p>У вас нет избранных товаров.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4" onClick={onClose}>
                        {favorites.map(id => (
                            <FavoriteItem key={id} id={id} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};