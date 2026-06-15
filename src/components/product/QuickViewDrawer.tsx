import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Plus, Minus, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import type { Product, ColorOption } from '../../types';
import { useWishlistQuery, useAddToWishlistMutation, useRemoveFromWishlistMutation, useProductsMapQuery } from '../../hooks/useWishlist';
import { useAddToCartMutation } from '../../hooks/useCart';
import { useUserStore } from '../../store/useUserStore';
import { useToastStore } from '../../store/useToastStore';
import { useNavigate } from 'react-router-dom';

interface QuickViewDrawerProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewDrawer = ({ product, isOpen, onClose }: QuickViewDrawerProps) => {
  const navigate = useNavigate();

  const { data: rawWishlistItems = [] } = useWishlistQuery();
  const { data: productsMapData } = useProductsMapQuery();
  const addToWishlistMutation = useAddToWishlistMutation();
  const removeFromWishlistMutation = useRemoveFromWishlistMutation();
  const { isAuthenticated, setPendingWishlistAction, setPendingCartAction } = useUserStore();

  const dbId = product ? (productsMapData?.mapping[product.name.toLowerCase().trim()] || product.id) : '';
  const wishlistEntry = rawWishlistItems.find((item: any) => {
    const itemProdId = item.product?._id || item.product?.id;
    return itemProdId === dbId;
  });
  const isInWishlist = !!wishlistEntry;

  const addToCartMutation = useAddToCartMutation();

  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Reset local state when product changes or drawer opens
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0] || null);
      setSelectedSize('');
      setQuantity(1);
      setActiveImageIndex(0);
      setErrorMsg('');
    }
  }, [product, isOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!product) return null;

  // Stock indicator logic
  const isLowStock = parseInt(product.id) % 3 === 0;
  const stockCount = (parseInt(product.id) % 3) + 2; // e.g. 2, 3 or 4 left

  const handleAddToCart = async () => {
    if (!selectedSize) {
      setErrorMsg('Please select a size');
      return;
    }
    if (!selectedColor) {
      setErrorMsg('Please select a color');
      return;
    }

    if (!isAuthenticated) {
      setPendingCartAction({
        product,
        color: selectedColor,
        size: selectedSize,
        quantity,
      });
      useToastStore.getState().addToast('Please sign in to continue.', 'info');
      navigate('/profile');
      onClose();
      return;
    }

    if (addToCartMutation.isPending) return;

    if (dbId) {
      await addToCartMutation.mutateAsync({
        productId: dbId,
        color: selectedColor,
        size: selectedSize,
        quantity,
      });
      onClose();
    } else {
      useToastStore.getState().addToast('Something went wrong', 'error');
    }
  };

  const handleWishlistToggle = async () => {
    if (!product) return;

    // Prevent duplicate requests while loading
    if (addToWishlistMutation.isPending || removeFromWishlistMutation.isPending) {
      return;
    }

    if (!isAuthenticated) {
      setPendingWishlistAction(product);
      useToastStore.getState().addToast('Please sign in to save items to your wishlist.', 'info');
      navigate('/profile');
      onClose();
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[45%] max-w-[620px] bg-white z-50 shadow-2xl flex flex-col h-full overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-luxury-border">
              <span className="text-[10px] uppercase tracking-mega text-primary-muted font-bold font-sans">
                Quick Shop / JOVA Atelier
              </span>
              <button
                onClick={onClose}
                className="p-1 hover:text-accent transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Content Scrollable Area */}
            <div className="flex-grow overflow-y-auto px-6 py-6 no-scrollbar flex flex-col gap-6">
              {/* Product Gallery Section */}
              <div className="flex flex-col gap-3">
                <div className="aspect-[3/4] overflow-hidden bg-luxury-cream relative">
                  <motion.img
                    key={activeImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    src={product.images[activeImageIndex] || product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Badges on Gallery */}
                  {product.badge && (
                    <span className="absolute top-4 left-4 bg-[#111111] text-white px-2.5 py-1 text-[9px] font-sans font-bold tracking-widest uppercase border border-white/20 shadow-md">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Thumbnails */}
                {product.images.length > 1 && (
                  <div className="flex gap-2.5 overflow-x-auto py-1">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-16 aspect-[3/4] flex-shrink-0 border transition-all ${
                          idx === activeImageIndex
                            ? 'border-[#111111] scale-105'
                            : 'border-luxury-border hover:border-primary/50'
                        }`}
                      >
                        <img src={img} alt={`${product.name} gallery ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-accent uppercase tracking-widest font-sans font-bold">
                  {product.subcategory}
                </span>
                <h2 className="text-xl font-serif uppercase tracking-widest text-[#111111]">
                  {product.name}
                </h2>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-lg font-sans font-bold text-[#111111]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  
                  {/* Reviews Summary */}
                  {product.reviews.length > 0 && (
                    <div className="flex items-center gap-1 border-l border-luxury-border pl-4">
                      <div className="flex text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.round(product.rating)
                                ? 'fill-amber-500 text-amber-500'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-primary-muted font-sans font-semibold">
                        {product.rating} ({product.reviews.length} reviews)
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-primary-muted font-sans leading-relaxed mt-2">
                  {product.description}
                </p>
              </div>

              {/* Trust Indicators Banner */}
              <div className="bg-luxury-cream p-4 border border-luxury-border flex flex-col gap-2 text-[10px] font-sans">
                {isLowStock && (
                  <div className="flex items-center gap-2 text-rose-600 font-bold tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
                    Only {stockCount} left in stock - rare design
                  </div>
                )}
                <div className="flex items-center gap-2 text-[#111111] font-semibold">
                  <Truck className="w-3.5 h-3.5 text-accent stroke-[1.5]" />
                  <span>Free shipping on orders above ₹4,999</span>
                </div>
                <div className="flex items-center gap-2 text-primary-muted">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent stroke-[1.5]" />
                  <span>100% Premium Atelier Quality Assured</span>
                </div>
                <div className="flex items-center gap-2 text-primary-muted">
                  <RotateCcw className="w-3.5 h-3.5 text-accent stroke-[1.5]" />
                  <span>Complimentary 14-day premium returns</span>
                </div>
              </div>

              {/* Interactive Swatches */}
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#111111] block mb-2">
                  Color: <span className="font-sans font-normal text-primary-muted">{selectedColor?.name}</span>
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor?.name === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-7 h-7 rounded-full border flex-shrink-0 relative transition-all duration-300 ${
                          isSelected ? 'scale-110 ring-1 ring-[#111111] ring-offset-2' : 'border-luxury-border hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {isSelected && (
                          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-sans font-bold text-white drop-shadow mix-blend-difference">
                            &bull;
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selectors */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#111111]">
                    Select Size
                  </span>
                  {errorMsg && (
                    <span className="text-[10px] text-rose-500 font-sans font-bold animate-pulse">
                      {errorMsg}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSize(size);
                          setErrorMsg('');
                        }}
                        className={`py-2.5 text-[10px] font-sans uppercase border transition-all duration-200 ${
                          isSelected
                            ? 'border-[#111111] bg-[#111111] text-white'
                            : 'border-luxury-border text-primary hover:border-[#111111]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Select */}
              <div className="flex items-center justify-between border-t border-luxury-border pt-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#111111]">
                  Quantity
                </span>
                <div className="flex items-center border border-luxury-border bg-luxury-cream">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-primary hover:text-accent transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-3 text-xs font-sans font-bold text-[#111111] w-8 text-center select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-primary hover:text-accent transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Fabric Composition & Care Details */}
              {product.details && product.details.length > 0 && (
                <div className="border-t border-luxury-border pt-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#111111] block mb-2">
                    Materials & Care
                  </span>
                  <ul className="list-disc pl-4 text-[10px] text-primary-muted font-sans space-y-1.5">
                    {product.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Bottom Actions Footer */}
            <div className="border-t border-luxury-border p-6 bg-white flex flex-col gap-3">
              <div className="flex gap-3">
                {/* Wishlist Button */}
                <button
                  onClick={handleWishlistToggle}
                  className={`border p-3 transition-colors ${
                    isInWishlist
                      ? 'border-accent bg-luxury-cream text-accent'
                      : 'border-luxury-border text-primary hover:border-[#111111]'
                  }`}
                  title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-accent font-bold text-accent' : 'text-[#111111]'}`} />
                </button>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={addToCartMutation.isPending}
                  className="flex-grow bg-[#111111] hover:bg-[#c5a880] text-white py-3 px-6 text-[10px] uppercase tracking-widest font-sans font-bold transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addToCartMutation.isPending ? 'Adding to Cart...' : `Add to Cart • ₹${(product.price * quantity).toLocaleString('en-IN')}`}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
