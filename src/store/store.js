import { create } from "zustand";

export const useStore = create((set) => ({
  allPosts: [],
  filteredPosts: [],
  username: "",
  secretKey: "",
  isLoggedIn: false,
  favorites: [],

  setAllPosts: (posts) => set({ allPosts: posts, filteredPosts: posts }),
  setFilteredPosts: (posts) => set({ filteredPosts: posts }),
  setUsername: (username) => set({ username: username }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn: isLoggedIn }),
  setSecretKey: (secretKey) => set({ secretKey: secretKey }),
  setFavorites: (favorites) => set({ favorites: favorites }),
}));

export default useStore;
