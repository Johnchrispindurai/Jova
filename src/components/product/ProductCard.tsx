import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Eye, X } from 'lucide-react';
import type { Product } from '../../types';
import { useWishlistQuery, useAddToWishlistMutation, useRemoveFromWishlistMutation, useProductsMapQuery } from '../../hooks/useWishlist';
import { useAddToCartMutation } from '../../hooks/useCart';
import { useUserStore } from '../../store/useUserStore';
import { useToastStore } from '../../store/useToastStore';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard = React.memo(({ product, onQuickView }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showSizes, setShowSizes] = useState(false);
  const navigate = useNavigate();

  const { data: rawWishlistItems = [] } = useWishlistQuery();
  const { data: productsMapData } = useProductsMapQuery();
  const addToWishlistMutation = useAddToWishlistMutation();
  const removeFromWishlistMutation = useRemoveFromWishlistMutation();
  const { isAuthenticated, setPendingWishlistAction, setPendingCartAction } = useUserStore();

  const dbId = productsMapData?.mapping[product.name.toLowerCase().trim()] || product.id;
  const wishlistEntry = rawWishlistItems.find((item: any) => {
    const itemProdId = item.product?._id || item.product?.id;
    return itemProdId === dbId;
  });
  const isInWishlist = !!wishlistEntry;

  const addToCartMutation = useAddToCartMutation();

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Prevent duplicate requests while loading
    if (addToWishlistMutation.isPending || removeFromWishlistMutation.isPending) {
      return;
    }

    if (!isAuthenticated) {
      setPendingWishlistAction(product);
      useToastStore.getState().addToast('Please sign in to save items to your wishlist.', 'info');
      navigate('/profile');
      return;
    }

    if (isInWishlist) {
      const deleteId = wishlistEntry._id || dbId;
      await removeFromWishlistMutation.mutateAsync(deleteId);
    } else {
      if (dbId) {
        await addToWishlistMutation.mutateAsync(dbId);
      } else {
        useToastStore.getState().addToast('Something went wrong', 'error');
      }
    }
  };

  const handleQuickAdd = async (size: string) => {
    if (!isAuthenticated) {
      setPendingCartAction({
        product,
        color: product.colors[0],
        size,
        quantity: 1,
      });
      useToastStore.getState().addToast('Please sign in to continue.', 'info');
      navigate('/profile');
      return;
    }

    if (addToCartMutation.isPending) return;

    if (dbId) {
      await addToCartMutation.mutateAsync({
        productId: dbId,
        color: product.colors[0],
        size,
        quantity: 1,
      });
      setShowSizes(false);
    } else {
      useToastStore.getState().addToast('Something went wrong', 'error');
    }
  };

  // Stock indicator logic
  const isLowStock = parseInt(product.id) % 3 === 0;
  const stockCount = (parseInt(product.id) % 3) + 2;

  // Active status badge
  const trustBadge = () => {
    if (isLowStock) {
      return (
        <span className="text-[9px] text-rose-600 font-bold uppercase tracking-widest mt-1">
          Only {stockCount} left
        </span>
      );
    }
    if (product.isBestSeller) {
      return (
        <span className="text-[9px] text-accent font-bold uppercase tracking-widest mt-1">
          Bestseller
        </span>
      );
    }
    if (product.isNewArrival) {
      return (
        <span className="text-[9px] text-primary/70 font-semibold uppercase tracking-widest mt-1">
          New Arrival
        </span>
      );
    }
    return (
      <span className="text-[9px] text-primary-muted/60 uppercase tracking-widest mt-1">
        Free Shipping
      </span>
    );
  };

  return (
    <motion.div
      className="group relative flex flex-col w-full bg-white border border-transparent transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizes(false);
      }}
      whileHover={{
        y: -6,
        boxShadow: '0 20px 30px -10px rgba(0,0,0,0.06)',
      }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4] overflow-hidden bg-luxury-cream mb-4">
        {/* Images Crossfade container */}
        <Link to={`/product/${product.id}`} className="block w-full h-full overflow-hidden">
          <motion.div
            className="w-full h-full relative"
            animate={{ scale: isHovered ? 1.03 : 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Primary Image */}
            <motion.img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              animate={{ opacity: isHovered && product.images[1] ? 0 : 1 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover"
            />
            {/* Secondary Image */}
            {product.images[1] && (
              <motion.img
                src={product.images[1]}
                alt={`${product.name} alternate view`}
                loading="lazy"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </motion.div>
        </Link>

        {/* Wishlist Button (always visible on top right, subtle animations) */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-4 right-4 p-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-sm text-primary hover:text-accent transition-all duration-300 z-10 hover:scale-110 active:scale-95"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isInWishlist ? 'fill-accent text-accent' : 'text-primary'
            }`}
          />
        </button>

        {/* Dynamic Badge (e.g. Limited Edition, New, etc.) */}
        {product.badge && (
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-0.5 text-[8px] font-sans font-bold tracking-widest uppercase text-primary border border-luxury-border shadow-xs">
            {product.badge}
          </span>
        )}

        {/* Hover Action Overlay */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 15, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="absolute bottom-0 left-0 w-full z-10 p-3 bg-white/95 backdrop-blur-md border-t border-luxury-border"
        >
          <AnimatePresence mode="wait">
            {!showSizes ? (
              <motion.div
                key="actions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2"
              >
                {/* Quick View Button */}
                <button
                  onClick={() => onQuickView && onQuickView(product)}
                  className="flex-1 py-2.5 text-[9px] uppercase tracking-widest font-sans font-bold border border-luxury-border bg-white text-primary hover:bg-[#111111] hover:text-white transition-all duration-200 flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 stroke-[1.8]" /> Quick View
                </button>

                {/* Add to Cart Button */}
                <button
                  onClick={() => setShowSizes(true)}
                  className="flex-1 py-2.5 text-[9px] uppercase tracking-widest font-sans font-bold bg-[#111111] text-white hover:bg-[#c5a880] transition-all duration-200 flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="sizes"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[8px] uppercase tracking-widest text-primary-muted font-bold">
                    Select Size
                  </span>
                  <button
                    onClick={() => setShowSizes(false)}
                    className="p-0.5 hover:text-rose-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 justify-start">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleQuickAdd(size)}
                      className="w-9 h-7 border border-luxury-border text-[9px] uppercase font-sans font-semibold hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-150"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Info Card */}
      <div className="flex flex-col flex-1 px-1 pb-2">
        <span className="text-[9px] text-primary-muted uppercase tracking-widest font-sans font-semibold mb-0.5">
          {product.subcategory}
        </span>
        <Link
          to={`/product/${product.id}`}
          className="text-xs uppercase tracking-wider font-sans font-medium text-primary hover:text-accent mb-0.5 line-clamp-1"
        >
          {product.name}
        </Link>
        <span className="text-xs font-sans font-bold text-[#111111] mb-1">
          ₹{product.price.toLocaleString('en-IN')}
        </span>
        
        {/* Trust indicator */}
        {trustBadge()}
      </div>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';
