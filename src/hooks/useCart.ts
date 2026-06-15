import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../utils/api';
import { useToastStore } from '../store/useToastStore';
import { useUserStore } from '../store/useUserStore';
import { normalizeProduct } from './useWishlist';

// Fetch the user's cart (only if logged in)
export const useCartQuery = () => {
  const { isAuthenticated } = useUserStore();
  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await api.get('/cart');
      const data = response.data;
      
      // Normalize each product to map MongoDB _id to frontend id
      const normalizedItems = (data.data || []).map((item: any) => ({
        ...item,
        product: normalizeProduct(item.product),
      }));

      return {
        ...data,
        data: normalizedItems,
      };
    },
    enabled: isAuthenticated,
  });
};

// Add to Cart
export const useAddToCartMutation = () => {
  const queryClient = useQueryClient();
  const addToast = useToastStore.getState().addToast;

  return useMutation({
    mutationFn: async ({
      productId,
      color,
      size,
      quantity = 1,
    }: {
      productId: string;
      color: { name: string; hex: string };
      size: string;
      quantity?: number;
    }) => {
      const response = await api.post('/cart', { productId, color, size, quantity });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.message === 'Cart updated') {
        addToast('Cart updated', 'success');
      } else {
        addToast('Added to cart', 'success');
      }
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || 'Something went wrong';
      addToast(msg, 'error');
    },
  });
};

// Update Cart Item Quantity
export const useUpdateCartQtyMutation = () => {
  const queryClient = useQueryClient();
  const addToast = useToastStore.getState().addToast;

  return useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      const response = await api.put(`/cart/${itemId}`, { quantity });
      return response.data;
    },
    onMutate: async ({ itemId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const previousCart = queryClient.getQueryData<any>(['cart']);

      if (previousCart) {
        // Optimistically calculate new totals in query cache
        const updatedItems = previousCart.data.map((item: any) =>
          item._id === itemId ? { ...item, quantity } : item
        );

        const subtotal = updatedItems.reduce((acc: number, item: any) => {
          return acc + item.product.price * item.quantity;
        }, 0);

        const estimatedTax = Math.round(subtotal * 0.05);
        const shipping = subtotal >= 4999 || subtotal === 0 ? 0 : 199;
        const total = subtotal + estimatedTax + shipping;
        const count = updatedItems.reduce((acc: number, item: any) => acc + item.quantity, 0);

        queryClient.setQueryData(['cart'], {
          ...previousCart,
          count,
          subtotal,
          estimatedTax,
          shipping,
          total,
          data: updatedItems,
        });
      }

      return { previousCart };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['cart'], context.previousCart);
      }
      addToast('Something went wrong', 'error');
    },
    onSuccess: () => {
      addToast('Cart updated', 'success');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

// Remove Cart Item
export const useRemoveFromCartMutation = () => {
  const queryClient = useQueryClient();
  const addToast = useToastStore.getState().addToast;

  return useMutation({
    mutationFn: async (itemId: string) => {
      const response = await api.delete(`/cart/${itemId}`);
      return response.data;
    },
    onMutate: async (itemId) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const previousCart = queryClient.getQueryData<any>(['cart']);

      if (previousCart) {
        const updatedItems = previousCart.data.filter((item: any) => item._id !== itemId);

        const subtotal = updatedItems.reduce((acc: number, item: any) => {
          return acc + item.product.price * item.quantity;
        }, 0);

        const estimatedTax = Math.round(subtotal * 0.05);
        const shipping = subtotal >= 4999 || subtotal === 0 ? 0 : 199;
        const total = subtotal + estimatedTax + shipping;
        const count = updatedItems.reduce((acc: number, item: any) => acc + item.quantity, 0);

        queryClient.setQueryData(['cart'], {
          ...previousCart,
          count,
          subtotal,
          estimatedTax,
          shipping,
          total,
          data: updatedItems,
        });
      }

      return { previousCart };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['cart'], context.previousCart);
      }
      addToast('Something went wrong', 'error');
    },
    onSuccess: () => {
      addToast('Removed from cart', 'info');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
