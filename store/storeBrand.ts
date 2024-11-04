import { create } from 'zustand';

interface BrandStore {
  brandId: number;
  brandName: string;
  setBrandId: (id: number) => void;
  setBrandName: (name: string) => void;
  clear: () => void;
}

const useBrandStore = create<BrandStore>((set) => {
  const isBrowser = typeof window !== 'undefined';

  const initialBrandId = isBrowser ? Number(localStorage.getItem('brandId')) || 0 : 0;
  const initialBrandName = isBrowser ? localStorage.getItem('brandName') || '' : '';

  return {
    brandId: initialBrandId,
    brandName: initialBrandName,
    setBrandId: (id) => {
      set({ brandId: id });
      if (isBrowser) {
        localStorage.setItem('brandId', id.toString());
      }
    },
    setBrandName: (name) => {
      set({ brandName: name });
      if (isBrowser) {
        localStorage.setItem('brandName', name);
      }
    },
    clear: () => {
      set({ brandId: 0, brandName: '' });
      if (isBrowser) {
        localStorage.removeItem('brandId');
        localStorage.removeItem('brandName');
      }
    },
  };
});

export default useBrandStore;
