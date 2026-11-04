import { create } from 'zustand';

const SIDEBAR_KEY = 'truckflow_sidebar_collapsed';

interface SidebarStore {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  toggle: () => void;
  collapse: () => void;
  expand: () => void;
  openMobile: () => void;
  closeMobile: () => void;
}

export const useSidebarStore = create<SidebarStore>((set, get) => ({
  isCollapsed: localStorage.getItem(SIDEBAR_KEY) === 'true',
  isMobileOpen: false,

  toggle: () => {
    const next = !get().isCollapsed;
    localStorage.setItem(SIDEBAR_KEY, String(next));
    set({ isCollapsed: next });
  },

  collapse: () => {
    localStorage.setItem(SIDEBAR_KEY, 'true');
    set({ isCollapsed: true });
  },

  expand: () => {
    localStorage.setItem(SIDEBAR_KEY, 'false');
    set({ isCollapsed: false });
  },

  openMobile: () => set({ isMobileOpen: true }),
  closeMobile: () => set({ isMobileOpen: false }),
}));
