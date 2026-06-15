import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../utils/api';
import type { Product } from '../types';
import { useToastStore } from '../store/useToastStore';
import { useUserStore } from '../store/useUserStore';

// Normalization function to align backend product representation to frontend Product type
export const normalizeProduct = (backendProduct: any): Product => {
  if (!backendProduct) return {} as Product;
  return {
    ...backendProduct,
    id: backendProduct._id || backendProduct.id,
    reviews: backendProduct.reviews || [],
  };
};

// Fetch all backend products to map frontend names to database IDs
export const useProductsMapQuery = () => {
  return useQuery({
    queryKey: ['productsMap'],
    queryFn: async () => {
      const response = await api.get('/products?limit=150');
      const products = response.data.data;
      const mapping = products.reduce((acc: Record<string, string>, p: any) => {
        acc[p.name.toLowerCase().trim()] = p._id;
        return acc;
      }, {} as Record<string, string>);
      return { mapping, rawProducts: products };
    },
    staleTime: Infinity, // The seeded products map is static and should remain valid
  });
};

// Query user wishlist from the backend (only if logged in)
export const useWishlistQuery = () => {
  const { isAuthenticated } = useUserStore();
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const response = await api.get('/wishlist');
      return response.data.data; // Array of { _id, user, product, createdAt }
    },
    enabled: isAuthenticated,
  });
};

// Add product to wishlist
export const useAddToWishlistMutation = () => {
  const queryClient = useQueryClient();
  const addToast = useToastStore.getState().addToast;

  return useMutation({
    mutationFn: async (productId: string) => {
      const response = await api.post('/wishlist', { productId });
      return response.data;
    },
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ['wishlist'] });
      const previousWishlist = queryClient.getQueryData<any[]>(['wishlist']);

      const productsMapData = queryClient.getQueryData<any>(['productsMap']);
      const rawProducts = productsMapData?.rawProducts || [];
      const dbProduct = rawProducts.find((p: any) => p._id === productId);

      if (previousWishlist && dbProduct) {
        // Prevent duplicate additions in cache
        const exists = previousWishlist.some((item) => {
          const itemProdId = item.product?._id || item.product?.id;
          return itemProdId === productId;
        });

        if (!exists) {
          queryClient.setQueryData<any[]>(['wishlist'], [
            {
              _id: 'temp-' + Date.now(),
              product: dbProduct,
              createdAt: new Date().toISOString(),
            },
            ...previousWishlist,
          ]);
        }
      }

      return { previousWishlist };
    },
    onError: (err: any, _productId, context) => {
      if (context?.previousWishlist) {
        queryClient.setQueryData(['wishlist'], context.previousWishlist);
      }
      
      const message = err.response?.data?.message || '';
      if (message.includes('already exists') || message.includes('duplicate')) {
        addToast('Already in your wishlist', 'info');
      } else {
        addToast('Something went wrong', 'error');
      }
    },
    onSuccess: () => {
      addToast('Added to wishlist', 'success');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });
};

// Remove product/wishlist item from wishlist
export const useRemoveFromWishlistMutation = () => {
  const queryClient = useQueryClient();
  const addToast = useToastStore.getState().addToast;

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/wishlist/${id}`);
      return response.data;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['wishlist'] });
      const previousWishlist = queryClient.getQueryData<any[]>(['wishlist']);

      if (previousWishlist) {
        queryClient.setQueryData<any[]>(
          ['wishlist'],
          previousWishlist.filter((item) => {
            const itemId = item._id;
            const itemProdId = item.product?._id || item.product?.id;
            return itemId !== id && itemProdId !== id;
          })
        );
      }

      return { previousWishlist };
    },
    onError: (_err, _id, context) => {
      if (context?.previousWishlist) {
        queryClient.setQueryData(['wishlist'], context.previousWishlist);
      }
      addToast('Something went wrong', 'error');
    },
    onSuccess: () => {
      addToast('Removed from wishlist', 'info');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });
};
