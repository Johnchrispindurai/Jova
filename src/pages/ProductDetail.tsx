import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Plus, Minus, Star, ChevronDown, RefreshCw, Truck } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/products';
import { useWishlistQuery, useAddToWishlistMutation, useRemoveFromWishlistMutation, useProductsMapQuery } from '../hooks/useWishlist';
import { useAddToCartMutation } from '../hooks/useCart';
import { useUserStore } from '../store/useUserStore';
import { useToastStore } from '../store/useToastStore';
import { ProductDetailSkeleton } from '../components/common/SkeletonLoader';
import { SizeGuideModal } from '../components/product/SizeGuideModal';
import type { Review } from '../types';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find product
  const [product, setProduct] = useState(() => MOCK_PRODUCTS.find((p) => p.id === id));
  const [isLoading, setIsLoading] = useState(true);

  // Detail view states
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [errorMsg, setErrorMsg] = useState('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Accordion state
  const [activeAccordion, setActiveAccordion] = useState<'details' | 'care' | 'shipping' | null>('details');

  // Review form states
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewError, setReviewError] = useState('');

  const addToast = useToastStore((state) => state.addToast);

  const { data: rawWishlistItems = [] } = useWishlistQuery();
  const { data: productsMapData } = useProductsMapQuery();
  const addToWishlistMutation = useAddToWishlistMutation();
  const removeFromWishlistMutation = useRemoveFromWishlistMutation();
  const { isAuthenticated, setPendingWishlistAction, setPendingCartAction } = useUserStore();
  const addToCartMutation = useAddToCartMutation();

  const dbId = product ? (productsMapData?.mapping[product.name.toLowerCase().trim()] || product.id) : '';
  const wishlistEntry = rawWishlistItems.find((item: any) => {
    const itemProdId = item.product?._id || item.product?.id;
    return itemProdId === dbId;
  });
  const isInWishlist = !!wishlistEntry;

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

  // Sync state on product change
  useEffect(() => {
    setIsLoading(true);
    const foundProduct = MOCK_PRODUCTS.find((p) => p.id === id);
    if (!foundProduct) {
      // Navigate to custom 404 if product not found
      navigate('/404', { replace: true });
      return;
    }
    setProduct(foundProduct);
    setSelectedColor(foundProduct.colors[0]);
    setSelectedSize('');
    setQuantity(1);
    setErrorMsg('');
    
    // Reset review form
    setReviewName('');
    setReviewRating(5);
    setReviewComment('');
    setReviewError('');

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id, navigate]);

  if (isLoading || !product) {
    return <ProductDetailSkeleton />;
  }

  const handleAddToCart = async () => {
    if (!selectedSize) {
      setErrorMsg('Please select a size');
      return;
    }
    if (!selectedColor) {
      setErrorMsg('Please select a color');
      return;
    }
    setErrorMsg('');

    if (!isAuthenticated) {
      setPendingCartAction({
        product,
        color: selectedColor,
        size: selectedSize,
        quantity,
      });
      useToastStore.getState().addToast('Please sign in to continue.', 'info');
      navigate('/profile');
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
    } else {
      useToastStore.getState().addToast('Something went wrong', 'error');
    }
  };

  const handleBuyNow = async () => {
    if (!selectedSize) {
      setErrorMsg('Please select a size');
      return;
    }
    if (!selectedColor) {
      setErrorMsg('Please select a color');
      return;
    }
    setErrorMsg('');

    sessionStorage.setItem('checkoutIntent', 'true');

    if (!isAuthenticated) {
      setPendingCartAction({
        product,
        color: selectedColor,
        size: selectedSize,
        quantity,
      });
      useToastStore.getState().addToast('Please sign in to continue.', 'info');
      navigate('/profile');
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
      navigate('/checkout');
    } else {
      useToastStore.getState().addToast('Something went wrong', 'error');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      setReviewError('Please fill in all review fields.');
      return;
    }

    const newReview: Review = {
      id: Math.random().toString(36).substring(2, 9),
      userName: reviewName.trim(),
      rating: reviewRating,
      date: new Date().toISOString().split('T')[0],
      comment: reviewComment.trim()
    };

    // Update product local reviews state
    const updatedReviews = [newReview, ...product.reviews];
    const newRating = Number(
      (updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length).toFixed(1)
    );

    setProduct({
      ...product,
      reviews: updatedReviews,
      rating: newRating
    });

    addToast('Review submitted successfully.', 'success');
    setReviewName('');
    setReviewRating(5);
    setReviewComment('');
    setReviewError('');
  };

  return (
    <div className="w-full bg-[#f5f2eb] text-[#111111] min-h-screen pt-28 pb-24 font-sans select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-8 page-transition-container">
        {/* Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20">
          
          {/* Left column: Editorial Image Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 animate-fade-in">
            {product.images.map((img, idx) => (
              <div key={idx} className="w-full aspect-[3/4] overflow-hidden bg-[#faf9f6] border border-[#e2dfd5]/40 shadow-sm rounded-lg relative group">
                <img
                  src={img}
                  alt={`${product.name} gallery ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
              </div>
            ))}
          </div>

          {/* Right column: Sticky Content details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-start lg:sticky lg:top-28 lg:self-start bg-transparent">
            {/* Category/Breadcrumb */}
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#111111]/60 font-semibold mb-3">
              <span>{product.category}</span>
              <span>&bull;</span>
              <span>{product.subcategory}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-serif font-light tracking-wide text-[#111111] mb-2 leading-tight uppercase">
              {product.name}
            </h1>

            {/* Description */}
            <p className="text-sm text-[#111111]/70 font-sans leading-relaxed mb-6 font-light">
              {product.description}
            </p>

            {/* Price */}
            <div className="text-sm uppercase tracking-wider text-[#111111] mb-6 font-sans">
              Price: <span className="font-semibold text-lg ml-1">₹{product.price.toLocaleString('en-IN')}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6 border-b border-[#e2dfd5]/40 pb-6">
              <div className="flex items-center text-[#d4af37]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.round(product.rating) ? 'fill-[#d4af37]' : 'text-[#e2dfd5]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold font-sans text-[#111111]">{product.rating}</span>
              <span className="text-xs text-[#111111]/60 font-sans font-light">({product.reviews.length} reviews)</span>
            </div>

            {/* 1. Colors Option Swatches */}
            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-xs uppercase tracking-[0.15em] font-semibold text-[#111111]">Color:</span>
                <span className="text-xs text-[#111111]/60 font-sans font-light uppercase tracking-wider">{selectedColor?.name} selected</span>
              </div>
              <div className="flex gap-4">
                {product.colors.map((color) => {
                  const isSelected = selectedColor?.name === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-9 h-9 rounded-full border flex-shrink-0 relative transition-all duration-300 flex items-center justify-center cursor-pointer ${
                        isSelected 
                          ? 'border-[#111111] ring-1 ring-offset-2 ring-transparent scale-105' 
                          : 'border-[#cccccc]/50 hover:scale-102'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      <span 
                        className={`w-7 h-7 rounded-full transition-transform ${
                          isSelected ? 'border border-[#111111]/40' : 'border border-transparent'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Sizes Option Swatches */}
            <div className="mb-6">
              <div className="flex items-baseline justify-between mb-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs uppercase tracking-[0.15em] font-semibold text-[#111111]">Size:</span>
                  <span className="text-xs text-[#111111]/60 font-sans font-light uppercase tracking-wider">{selectedSize ? `${selectedSize} selected` : 'Select a size'}</span>
                </div>
                <span
                  onClick={() => setShowSizeGuide(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setShowSizeGuide(true);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className="text-[10px] uppercase tracking-wider text-[#111111]/60 hover:text-black underline cursor-pointer font-sans focus:outline-none focus:text-black focus:ring-1 focus:ring-[#111111]/50 rounded-sm px-1"
                >
                  Size Guide
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setErrorMsg('');
                      }}
                      className={`w-12 h-12 flex items-center justify-center text-xs font-sans uppercase transition-all duration-200 border cursor-pointer ${
                        isSelected 
                          ? 'border-[#111111] bg-transparent text-[#111111] font-bold shadow-sm scale-102 ring-1 ring-[#111111]' 
                          : 'border-[#cccccc] text-[#111111]/70 hover:border-[#111111]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              {errorMsg && (
                <span className="text-xs text-rose-600 font-sans mt-2 block font-medium animate-fade-in">
                  {errorMsg}
                </span>
              )}
            </div>

            {/* 3. Quantity control */}
            <div className="mb-8">
              <span className="text-xs uppercase tracking-[0.15em] font-semibold text-[#111111] mb-3 block">Quantity</span>
              <div className="flex items-center border border-[#cccccc] w-32 justify-between rounded-md bg-white/20">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="p-2.5 hover:text-black text-[#111111]/60 cursor-pointer transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-semibold font-sans text-[#111111]">{quantity}</span>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="p-2.5 hover:text-black text-[#111111]/60 cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Buttons CTA */}
            <div className="flex flex-col gap-3.5 mb-6">
              <div className="flex gap-3">
                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={addToCartMutation.isPending}
                  className="flex-1 bg-[#5c6064] hover:bg-[#4a4d51] text-white border border-[#5c6064] hover:border-[#4a4d51] py-4 text-xs uppercase tracking-[0.15em] font-sans font-bold transition-all duration-300 flex items-center justify-center gap-2 rounded-lg cursor-pointer disabled:opacity-85 shadow-sm"
                >
                  {addToCartMutation.isPending ? 'Adding to Bag...' : <><ShoppingBag className="w-4 h-4" /> Add to Bag</>}
                </button>

                {/* Wishlist Heart Toggle */}
                <button
                  onClick={handleWishlistToggle}
                  aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                  className="border border-[#cccccc] hover:border-black p-4 text-[#111111] transition-all duration-300 flex items-center justify-center bg-transparent rounded-lg cursor-pointer hover:bg-black/5 active:scale-[0.98]"
                >
                  <Heart className={`w-4.5 h-4.5 transition-colors ${isInWishlist ? 'fill-accent text-accent' : 'text-[#111111]'}`} />
                </button>
              </div>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                disabled={addToCartMutation.isPending}
                className="w-full border border-[#111111] bg-transparent text-[#111111] hover:bg-[#111111] hover:text-white py-4 text-xs uppercase tracking-[0.15em] font-sans font-bold transition-all duration-300 rounded-lg cursor-pointer"
              >
                {addToCartMutation.isPending ? 'Processing...' : 'Buy it Now'}
              </button>
            </div>

            {/* Trust features list */}
            <div className="flex flex-col gap-3 py-6 border-t border-b border-[#e2dfd5]/60 mb-6 font-sans">
              <div className="flex items-center gap-3 text-xs text-[#111111]/80">
                <Truck className="w-4.5 h-4.5 stroke-[1.2]" />
                <span className="italic">Free shipping above ₹4,999</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#111111]/80">
                <RefreshCw className="w-4.5 h-4.5 stroke-[1.2] animate-spin-slow" />
                <span className="italic">14-day premium returns</span>
              </div>
            </div>

            {/* Accordions details */}
            <div className="border-t border-[#e2dfd5]/60">
              {/* Product Details */}
              <div className="border-b border-[#e2dfd5]/60">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'details' ? null : 'details')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-[0.15em] font-bold text-[#111111]"
                >
                  <span>Product Details</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeAccordion === 'details' ? 'rotate-180' : ''}`} />
                </button>
                {activeAccordion === 'details' && (
                  <div className="pb-6 animate-fade-in text-xs text-[#111111]/70 font-sans leading-relaxed pl-1">
                    <p className="mb-3">{product.description}</p>
                    <div className="grid grid-cols-2 gap-2 mt-4 text-[10px] uppercase tracking-wider font-semibold text-[#111111]">
                      <div>Category: <span className="font-normal text-[#111111]/70">{product.category}</span></div>
                      <div>Subcategory: <span className="font-normal text-[#111111]/70">{product.subcategory}</span></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Composition & Care */}
              <div className="border-b border-[#e2dfd5]/60">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'care' ? null : 'care')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-[0.15em] font-bold text-[#111111]"
                >
                  <span>Composition & Care</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeAccordion === 'care' ? 'rotate-180' : ''}`} />
                </button>
                {activeAccordion === 'care' && (
                  <div className="pb-6 animate-fade-in">
                    <ul className="flex flex-col gap-2.5 pl-4 list-disc text-xs text-[#111111]/70 font-sans leading-relaxed">
                      {product.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Shipping & Returns */}
              <div className="border-b border-[#e2dfd5]/60">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? null : 'shipping')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-[0.15em] font-bold text-[#111111]"
                >
                  <span>Shipping & Returns</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeAccordion === 'shipping' ? 'rotate-180' : ''}`} />
                </button>
                {activeAccordion === 'shipping' && (
                  <div className="pb-6 flex flex-col gap-4 text-xs text-[#111111]/70 font-sans leading-relaxed pl-1 animate-fade-in">
                    <div className="flex gap-3 items-start">
                      <Truck className="w-4 h-4 text-[#111111]/80 flex-shrink-0 mt-0.5" />
                      <p>Free standard delivery on orders above ₹4,999. Express shipping options available at checkout.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <RefreshCw className="w-4 h-4 text-[#111111]/80 flex-shrink-0 mt-0.5 animate-spin-slow" />
                      <p>Easy 14-day return and exchange policy. Return shipping label is included in the package.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      {/* REVIEWS SECTION */}
      <section className="mt-28 border-t border-luxury-border pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left side: Review stats and form (5 cols) */}
          <div className="lg:col-span-5">
            <h3 className="text-xl uppercase tracking-widest font-serif font-medium mb-6">Customer Reviews</h3>
            <div className="flex items-center gap-4 mb-8">
              <div className="text-4xl font-serif font-bold text-primary">{product.rating}</div>
              <div>
                <div className="flex items-center text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(product.rating) ? 'fill-accent' : 'text-luxury-border'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-primary-muted font-sans mt-1">Based on {product.reviews.length} reviews</p>
              </div>
            </div>

            {/* Write a review form */}
            <form onSubmit={handleReviewSubmit} className="bg-luxury-cream/50 p-6 border border-luxury-border/60">
              <h4 className="text-xs uppercase tracking-widest font-bold mb-4">Write a Review</h4>
              
              {reviewError && (
                <div className="text-xs text-rose-500 mb-3 font-medium font-sans">
                  {reviewError}
                </div>
              )}

              <div className="flex flex-col gap-4">
                {/* Rating */}
                <div>
                  <label className="premium-label">Rating</label>
                  <div className="flex gap-1.5 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className="text-accent hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star className={`w-5 h-5 ${star <= reviewRating ? 'fill-accent' : 'text-luxury-border'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="review-name" className="premium-label">Your Name</label>
                  <input
                    id="review-name"
                    type="text"
                    placeholder="Enter your name"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    className="premium-input bg-white/50 px-2.5"
                  />
                </div>

                {/* Comment */}
                <div>
                  <label htmlFor="review-comment" className="premium-label font-medium">Comments</label>
                  <textarea
                    id="review-comment"
                    placeholder="Write your comments here..."
                    rows={4}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full bg-white/50 border border-luxury-border p-3 text-sm focus:border-primary focus:outline-none transition-colors duration-300 font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white border border-primary hover:bg-transparent hover:text-primary py-3 text-xs uppercase tracking-widest font-sans font-bold transition-all duration-300 cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>

          {/* Right side: Reviews list (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <h3 className="text-xs uppercase tracking-widest font-bold mb-2">Review Log</h3>
            {product.reviews.length === 0 ? (
              <p className="text-xs text-primary-muted font-sans italic">
                No reviews have been written for this product yet. Be the first to share your thoughts.
              </p>
            ) : (
              <div className="flex flex-col gap-6 divide-y divide-luxury-border">
                {product.reviews.map((review, idx) => (
                  <div key={review.id} className={`${idx > 0 ? 'pt-6' : ''}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs uppercase font-sans font-bold text-primary">{review.userName}</span>
                      <span className="text-[10px] text-primary-muted font-sans">{review.date}</span>
                    </div>
                    {/* Stars */}
                    <div className="flex items-center text-accent mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < review.rating ? 'fill-accent' : 'text-luxury-border'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-primary-muted font-sans leading-relaxed text-justify-spacing">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <SizeGuideModal
        isOpen={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
        category={product?.category}
      />
      </div>
    </div>
  );
};
