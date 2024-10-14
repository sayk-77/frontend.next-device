import {create} from 'zustand';

interface BrandStore {
  brandId: number;
  brandName: string;
  setBrandId: (id: number) => void;
  setBrandName: (name: string) => void;
  clear: () => void;
}

const useBrandStore = create<BrandStore>((set) => ({
  brandId: Number(localStorage.getItem('brandId')) || 0,
  brandName: localStorage.getItem('brandName') || '',
  setBrandId: (id) => {
    set({ brandId: id });
    localStorage.setItem('brandId', id.toString());
  },
  setBrandName: (name) => {
    set({ brandName: name });
    localStorage.setItem('brandName', name);
  },
  clear: () => {
    set({ brandId: 0, brandName: '' });
    localStorage.removeItem('brandId');
    localStorage.removeItem('brandName');
  },
}));

export default useBrandStore;
