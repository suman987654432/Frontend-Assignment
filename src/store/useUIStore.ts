import { create } from 'zustand';

interface UIState {
  viewMode: 'grid' | 'list';
  isSidebarOpen: boolean;
  setViewMode: (mode: 'grid' | 'list') => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  viewMode: 'grid',
  isSidebarOpen: false,
  setViewMode: (viewMode) => set({ viewMode }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
