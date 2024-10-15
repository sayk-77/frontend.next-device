import { create } from 'zustand';

interface BreadCrumbItem {
    label: string;
    link?: string;
}

interface BreadCrumbState {
    breadCrumbs: BreadCrumbItem[];
    addBreadCrumb: (item: BreadCrumbItem) => void;
    clearBreadCrumbs: () => void;
    setBreadCrumbs: (breadcrumbs: BreadCrumbItem[]) => void;
    loadBreadCrumbs: () => void;
    clearLastBreadCrumb: () => void;
    clearToHigherLevel: () => void;
}

const useBreadCrumbStore = create<BreadCrumbState>((set) => ({
    breadCrumbs: [],
    addBreadCrumb: (item) => set((state) => {
        if (state.breadCrumbs.find(b => b.label === item.label)) {
            return { breadCrumbs: state.breadCrumbs };
        }
        const newBreadCrumbs = [...state.breadCrumbs, item];
        localStorage.setItem('breadcrumbs', JSON.stringify(newBreadCrumbs));
        return { breadCrumbs: newBreadCrumbs };
    }),
    clearBreadCrumbs: () => set({ breadCrumbs: [] }),
    setBreadCrumbs: (breadcrumbs) => {
        localStorage.setItem('breadcrumbs', JSON.stringify(breadcrumbs));
        set({ breadCrumbs: breadcrumbs });
    },
    loadBreadCrumbs: () => {
        const savedBreadCrumbs = localStorage.getItem('breadcrumbs');
        if (savedBreadCrumbs) {
            set({ breadCrumbs: JSON.parse(savedBreadCrumbs) });
        }
    },
    clearLastBreadCrumb: () => set(state => {
        const newBreadCrumbs = state.breadCrumbs.slice(0, -1);
        localStorage.setItem('breadcrumbs', JSON.stringify(newBreadCrumbs));
        return { breadCrumbs: newBreadCrumbs };
    }),
    clearToHigherLevel: () => set((state) => {
        if (state.breadCrumbs.length > 1) {
            const newBreadCrumbs = state.breadCrumbs.slice(0, -1);
            localStorage.setItem('breadcrumbs', JSON.stringify(newBreadCrumbs));
            return { breadCrumbs: newBreadCrumbs };
        }
        return state;
    }),
}));

export default useBreadCrumbStore;
