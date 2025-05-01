import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem('theme') || 'luxury', // Default theme is light, or get from localStorage
  setTheme: (theme) => { 
    localStorage.setItem('theme', theme); // Save the theme to localStorage
    set({ theme }); // Update the theme in the store
  }, // Function to update the theme
}));