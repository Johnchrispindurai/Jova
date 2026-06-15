import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, ColorOption } from '../types';
import { useToastStore } from './useToastStore';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, color: ColorOption, size: string, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotals: () => { subtotal: number; shippingFee: number; total: number };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, color, size, quantity = 1) => {
        const id = `${product.id}-${size}-${color.name.replace(/\s+/g, '')}`;
        const items = [...get().items];
        const existingIndex = items.findIndex((item) => item.id === id);

        if (existingIndex > -1) {
          items[existingIndex].quantity += quantity;
        } else {
          items.push({
            id,
            product,
            selectedColor: color,
            selectedSize: size,
            quantity,
          });
        }

        set({ items });
        useToastStore.getState().addToast(`Added "${product.name}" (${size}, ${color.name}) to cart.`, 'success');
      },
      removeItem: (id) => {
        const itemToRemove = get().items.find((item) => item.id === id);
        const items = get().items.filter((item) => item.id !== id);
        set({ items });
        if (itemToRemove) {
          useToastStore.getState().addToast(`Removed "${itemToRemove.product.name}" from cart.`, 'info');
        }
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        const items = get().items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
        set({ items });
      },
      clearCart: () => set({ items: [] }),
      getTotals: () => {
        const items = get().items;
        const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        // Free shipping on orders over ₹5,000, else flat ₹150
        const shippingFee = subtotal > 5000 || subtotal === 0 ? 0 : 150;
        const total = subtotal + shippingFee;
        return { subtotal, shippingFee, total };
      },
    }),
    {
      name: 'jova-cart-storage', // local storage key
    }
  )
);
