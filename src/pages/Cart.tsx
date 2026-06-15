import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCartQuery, useUpdateCartQtyMutation, useRemoveFromCartMutation } from '../hooks/useCart';
import { useToastStore } from '../store/useToastStore';
import { ProductCard } from '../components/product/ProductCard';
import { QuickViewDrawer } from '../components/product/QuickViewDrawer';
import { MOCK_PRODUCTS } from '../data/products';
import type { Product } from '../types';

export const Cart = () => {
  const navigate = useNavigate();
  const addToast = useToastStore((state) => state.addToast);

  const { data: cartData, isLoading: isCartLoading } = useCartQuery();
  const cartItems = cartData?.data || [];
  const cartTotals = {
    subtotal: cartData?.subtotal || 0,
    shippingFee: cartData?.shipping || 0,
    estimatedTax: cartData?.estimatedTax || 0,
    total: cartData?.total || 0,
  };

  const updateCartQtyMutation = useUpdateCartQtyMutation();
  const removeFromCartMutation = useRemoveFromCartMutation();

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    if (quantity > 10) return;
    updateCartQtyMutation.mutate({ itemId, quantity });
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromCartMutation.mutate(itemId);
  };

  // Promo code states
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<Product | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'JOVA10') {
      const discount = Math.round(cartTotals.subtotal * 0.1);
      setAppliedDiscount(discount);
      sessionStorage.setItem('appliedDiscount', discount.toString());
      addToast('Coupon "JOVA10" (10% Off) applied successfully!', 'success');
      setPromoCode('');
    } else {
      addToast('Invalid promo code.', 'error');
    }
  };

  if (isCartLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-44 pb-24 text-center">
        <span className="text-xs uppercase tracking-widest text-primary-muted font-bold font-sans animate-pulse">
          Loading Atelier Bag...
        </span>
      </div>
    );
  }

  if (cartItems.length === 0) {
    const emptyRecommendations = MOCK_PRODUCTS.filter(
      (p) => p.isTrending || p.isBestSeller
    ).slice(0, 4);

    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-24 page-transition-container">
        <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto py-12">
          <span className="text-[10px] uppercase tracking-mega text-accent font-bold mb-4">ATELIER BAG</span>
          <h1 className="text-2xl md:text-3xl font-serif uppercase tracking-widest text-[#111111] mb-3 leading-snug">
            Your cart is waiting for something beautiful.
          </h1>
          <p className="text-xs text-primary-muted font-sans leading-relaxed mb-8">
            Discover timeless pieces crafted for modern living.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Link
              to="/"
              className="flex-grow bg-[#111111] text-white text-center py-3.5 text-xs uppercase tracking-widest font-sans font-bold border border-[#111111] hover:bg-transparent hover:text-primary transition-all duration-300"
            >
              Continue Shopping
            </Link>
            <Link
              to="/collections/new-arrivals"
              className="flex-grow border border-luxury-border bg-white text-primary text-center py-3.5 text-xs uppercase tracking-widest font-sans font-bold hover:border-[#111111] transition-all duration-300"
            >
              Explore New Arrivals
            </Link>
          </div>
        </div>

        {/* You May Also Like Recommendations */}
        <div className="border-t border-luxury-border/60 pt-16 mt-16">
          <div className="text-center mb-10">
            <span className="text-[10px] uppercase tracking-mega text-accent font-bold">CURATED EDIT</span>
            <h2 className="text-2xl uppercase font-serif tracking-widest mt-1">You May Also Like</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {emptyRecommendations.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>

        {/* Quick View Drawer */}
        <QuickViewDrawer
          product={selectedQuickViewProduct}
          isOpen={!!selectedQuickViewProduct}
          onClose={() => setSelectedQuickViewProduct(null)}
        />
      </div>
    );
  }

  const finalTotal = Math.max(0, cartTotals.total - appliedDiscount);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-24 page-transition-container">
      <div className="mb-10 text-center md:text-left">
        <span className="text-[10px] uppercase tracking-mega text-accent font-bold">YOUR ATELIER BAG</span>
        <h1 className="text-3xl uppercase font-serif tracking-widest mt-1">Shopping Bag</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Cart Items List (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="hidden md:grid grid-cols-12 pb-4 border-b border-luxury-border text-[10px] uppercase tracking-widest text-primary-muted font-bold">
            <span className="col-span-6">Product details</span>
            <span className="col-span-2 text-center">Price</span>
            <span className="col-span-2 text-center">Quantity</span>
            <span className="col-span-2 text-right">Total</span>
          </div>

          <div className="flex flex-col divide-y divide-luxury-border/60">
            {cartItems.map((item: any) => (
              <div key={item._id} className="grid grid-cols-1 md:grid-cols-12 py-6 gap-4 items-center">
                {/* Thumbnail & Description */}
                <div className="col-span-1 md:col-span-6 flex gap-4">
                  <Link
                    to={`/product/${item.product.id}`}
                    className="w-20 md:w-24 aspect-[3/4] bg-luxury-cream overflow-hidden flex-shrink-0"
                  >
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </Link>

                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <Link
                        to={`/product/${item.product.id}`}
                        className="text-sm uppercase tracking-wider font-sans font-semibold text-primary hover:text-accent"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-[10px] text-primary-muted uppercase mt-0.5">{item.product.subcategory}</p>
                      
                      <div className="flex gap-4 text-[10px] text-primary-muted mt-3">
                        <span>Size: <strong className="text-primary">{item.size}</strong></span>
                        <span className="flex items-center gap-1.5">
                          Color:{' '}
                          <span
                            className="w-3 h-3 rounded-full inline-block border border-luxury-border"
                            style={{ backgroundColor: item.color.hex }}
                          />
                          <strong className="text-primary">{item.color.name}</strong>
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="text-[10px] uppercase tracking-wider font-semibold text-primary-muted hover:text-rose-500 transition-colors flex items-center gap-1 w-fit mt-4 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>

                {/* Price (Mobile label + val) */}
                <div className="col-span-1 md:col-span-2 text-left md:text-center flex md:block justify-between items-center py-2 md:py-0 border-b md:border-b-0 border-luxury-border/40">
                  <span className="md:hidden text-[10px] uppercase tracking-widest text-primary-muted font-bold">Price</span>
                  <span className="text-sm font-sans font-semibold">₹{item.product.price.toLocaleString('en-IN')}</span>
                </div>

                {/* Quantity Controls */}
                <div className="col-span-1 md:col-span-2 flex md:justify-center justify-between items-center py-2 md:py-0 border-b md:border-b-0 border-luxury-border/40">
                  <span className="md:hidden text-[10px] uppercase tracking-widest text-primary-muted font-bold">Quantity</span>
                  <div className="flex items-center border border-luxury-border bg-white">
                    <button
                      onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                      className="p-1.5 hover:text-accent text-primary-muted cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-xs font-semibold font-sans">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                      className="p-1.5 hover:text-accent text-primary-muted cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Line Total */}
                <div className="col-span-1 md:col-span-2 text-right flex md:block justify-between items-center py-2 md:py-0">
                  <span className="md:hidden text-[10px] uppercase tracking-widest text-primary-muted font-bold">Total</span>
                  <span className="text-sm font-sans font-bold">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Shopping button */}
          <Link
            to="/women"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-sans font-bold hover:text-accent transition-colors mt-6 border-b border-primary hover:border-accent pb-1 w-fit"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary sidebar (4 Cols) */}
        <div className="lg:col-span-4">
          <div className="bg-luxury-cream border border-luxury-border p-6 md:p-8 flex flex-col gap-6 sticky top-24">
            <h3 className="text-xs uppercase tracking-mega font-bold text-accent">Order Summary</h3>

            {/* Calculations breakdown */}
            <div className="flex flex-col gap-4 border-b border-luxury-border/80 pb-6 text-xs font-sans text-primary">
              <div className="flex justify-between">
                <span className="text-primary-muted uppercase tracking-wider">Subtotal</span>
                <span className="font-semibold">₹{cartTotals.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-muted uppercase tracking-wider">Estimated Shipping</span>
                <span className="font-medium uppercase">
                  {cartTotals.shippingFee === 0 ? 'FREE' : `₹${cartTotals.shippingFee.toLocaleString('en-IN')}`}
                </span>
              </div>
              <div className="flex justify-between text-primary-muted">
                <span className="uppercase tracking-wider">Estimated Taxes (5%)</span>
                <span className="font-medium">₹{cartTotals.estimatedTax.toLocaleString('en-IN')}</span>
              </div>
              
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span className="uppercase tracking-wider">Promo Discount (10%)</span>
                  <span>-₹{appliedDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            {/* Coupon Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="PROMO CODE (JOVA10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 bg-white border border-luxury-border py-2 px-3 text-xs uppercase tracking-widest focus:outline-none focus:border-primary font-sans"
              />
              <button
                type="submit"
                className="bg-primary text-white border border-primary hover:bg-transparent hover:text-primary py-2 px-4 text-xs uppercase tracking-widest font-sans font-bold transition-all duration-300 cursor-pointer"
              >
                Apply
              </button>
            </form>

            {/* Final Total */}
            <div className="flex justify-between items-baseline pt-2">
              <span className="text-xs uppercase tracking-widest font-bold">Estimated Total</span>
              <span className="text-xl font-bold font-sans">
                ₹{finalTotal.toLocaleString('en-IN')}
              </span>
            </div>

            {/* CTA checkout */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-primary text-white text-center py-4 text-xs uppercase tracking-widest font-sans font-bold border border-primary hover:bg-transparent hover:text-primary transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              Checkout <ArrowRight className="w-4 h-4" />
            </button>

            <span className="text-[10px] text-primary-muted font-sans leading-relaxed text-center block mt-2">
              Taxes calculated at checkout. Free returns & exchanges on all items.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
