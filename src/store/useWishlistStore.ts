import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types';
import { useToastStore } from './useToastStore';

interface WishlistState {
  items: Product[];
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (product) => {
        const items = [...get().items];
        const existingIndex = items.findIndex((item) => item.id === product.id);

        if (existingIndex > -1) {
          // Remove
          items.splice(existingIndex, 1);
          set({ items });
          useToastStore.getState().addToast(`Removed "${product.name}" from wishlist.`, 'info');
        } else {
          // Add
          items.push(product);
          set({ items });
          useToastStore.getState().addToast(`Added "${product.name}" to wishlist.`, 'success');
        }
      },
      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },
    }),
    {
      name: 'jova-wishlist-storage',
    }
  )
);
