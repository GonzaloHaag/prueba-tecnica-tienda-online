import { create } from 'zustand'

interface FilterState {
  searchQuery: string
  selectedCategory: string
  
  // Acciones
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: string) => void
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  searchQuery: '',
  selectedCategory: 'Todos',
  
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setSelectedCategory: (category: string) => set({ selectedCategory: category }),
  resetFilters: () => set({ searchQuery: '', selectedCategory: 'Todos' })
})) 