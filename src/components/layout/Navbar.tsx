import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Search, Heart, ShoppingBag, User, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCartQuery, useUpdateCartQtyMutation, useRemoveFromCartMutation } from '../../hooks/useCart';
import { useUserStore } from '../../store/useUserStore';
import { useWishlistQuery, normalizeProduct } from '../../hooks/useWishlist';
import { MOCK_PRODUCTS } from '../../data/products';
import { AnimatePresence, motion } from 'framer-motion';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isCollectionsActive = location.pathname.startsWith('/collections') && !location.pathname.includes('new-arrivals');

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `hover:text-accent transition-all duration-300 relative py-1.5 font-sans tracking-widest text-[11px] uppercase ${
      isActive ? 'text-accent font-semibold' : 'text-primary'
    }`;

  const { isAuthenticated, logout } = useUserStore();
  const { data: cartData } = useCartQuery();
  const cartItems = cartData?.data || [];
  const totalCartQty = cartData?.count || 0;
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

  const { data: rawWishlistItems = [] } = useWishlistQuery();
  const wishlistItems = rawWishlistItems.map((item: any) => normalizeProduct(item.product));

  // Filtered search results
  const searchResults = searchQuery
    ? MOCK_PRODUCTS.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  // Track page scroll to toggle background opacity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawers on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCartOpen(false);
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/women?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Navbar wrapper */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'glass-nav border-b border-luxury-border/50 py-3 shadow-sm' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Left: Mobile Menu & Category Links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-primary hover:text-accent transition-colors"
              aria-label="Toggle mobile menu"
            >
              <Menu className="w-6 h-6 stroke-[1.5]" />
            </button>

            <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-sans font-medium">
              <NavLink to="/" end className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    Home
                    {isActive && (
                      <motion.div
                        layoutId="activeUnderline"
                        className="absolute left-0 bottom-0 w-full h-[2px] bg-[#C5A880]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
              <NavLink to="/women" className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    Women
                    {isActive && (
                      <motion.div
                        layoutId="activeUnderline"
                        className="absolute left-0 bottom-0 w-full h-[2px] bg-[#C5A880]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
              <NavLink to="/men" className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    Men
                    {isActive && (
                      <motion.div
                        layoutId="activeUnderline"
                        className="absolute left-0 bottom-0 w-full h-[2px] bg-[#C5A880]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
              <NavLink to="/collections/new-arrivals" className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    New Arrivals
                    {isActive && (
                      <motion.div
                        layoutId="activeUnderline"
                        className="absolute left-0 bottom-0 w-full h-[2px] bg-[#C5A880]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
              <div className="group relative">
                <NavLink
                  to="/collections/best-sellers"
                  className={() => navLinkClass({ isActive: isCollectionsActive })}
                >
                  Collections
                  {isCollectionsActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute left-0 bottom-0 w-full h-[2px] bg-[#C5A880]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </NavLink>
                {/* Premium hover dropdown menu */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white border border-luxury-border shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 flex flex-col py-3 text-left">
                  <Link to="/collections/footwear" className="px-5 py-2.5 hover:bg-luxury-cream hover:text-accent transition-colors font-sans text-[11px] uppercase tracking-wider text-primary">Footwear Edit</Link>
                  <Link to="/collections/coats" className="px-5 py-2.5 hover:bg-luxury-cream hover:text-accent transition-colors font-sans text-[11px] uppercase tracking-wider text-primary">Luxury Coats</Link>
                  <Link to="/collections/summer" className="px-5 py-2.5 hover:bg-luxury-cream hover:text-accent transition-colors font-sans text-[11px] uppercase tracking-wider text-primary">Summer Essentials</Link>
                  <Link to="/collections/knitwear" className="px-5 py-2.5 hover:bg-luxury-cream hover:text-accent transition-colors font-sans text-[11px] uppercase tracking-wider text-primary">Premium Knitwear</Link>
                  <Link to="/collections/accessories" className="px-5 py-2.5 hover:bg-luxury-cream hover:text-accent transition-colors font-sans text-[11px] uppercase tracking-wider text-primary">Accessories & Bags</Link>
                  <Link to="/collections/best-sellers" className="px-5 py-2.5 hover:bg-luxury-cream hover:text-accent transition-colors font-sans text-[11px] uppercase tracking-wider text-accent border-t border-luxury-border/30 mt-1">Best Sellers</Link>
                  <Link to="/collections/editors-picks" className="px-5 py-2.5 hover:bg-luxury-cream hover:text-accent transition-colors font-sans text-[11px] uppercase tracking-wider text-primary">Editor's Picks</Link>
                </div>
              </div>
            </nav>
          </div>

          {/* Center: Brand Logo */}
          <div className="text-center absolute left-1/2 transform -translate-x-1/2">
            <Link
              to="/"
              className="text-2xl md:text-3xl font-serif font-bold tracking-widest text-primary hover:text-accent transition-colors"
            >
              JOVA
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-primary hover:text-accent transition-colors"
              aria-label="Open search"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Account */}
            <Link
              to="/profile"
              className="hidden md:block text-primary hover:text-accent transition-colors"
              aria-label="View account"
            >
              <User className="w-5 h-5 stroke-[1.5]" />
            </Link>

            {/* Wishlist */}
            <Link
              to="/profile"
              state={{ tab: 'wishlist' }}
              className="text-primary hover:text-accent transition-colors relative"
              aria-label="View wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.5]" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-accent text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-primary hover:text-accent transition-colors relative"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {totalCartQty > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {totalCartQty}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ================= DRAWERS & OVERLAYS ================= */}

      {/* 1. Mobile Navigation Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-[100]"
            />
            {/* Slider */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-[80%] max-w-sm bg-white z-[101] shadow-2xl p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-12">
                  <span className="text-xl font-serif tracking-widest text-primary">JOVA</span>
                  <button onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="w-5 h-5 stroke-[1.5] text-primary" />
                  </button>
                </div>

                <nav className="flex flex-col gap-6 text-sm uppercase tracking-widest font-sans font-medium">
                  <Link to="/" className="hover:text-accent" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                  <Link to="/women" className="hover:text-accent" onClick={() => setIsMobileMenuOpen(false)}>Women</Link>
                  <Link to="/men" className="hover:text-accent" onClick={() => setIsMobileMenuOpen(false)}>Men</Link>
                  <Link to="/collections/new-arrivals" className="hover:text-accent" onClick={() => setIsMobileMenuOpen(false)}>New Arrivals</Link>
                  
                  {/* Collapsible Mobile Collections List */}
                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] tracking-wider text-accent font-bold uppercase font-sans">Campaign Collections</span>
                    <div className="pl-3 flex flex-col gap-4 border-l border-luxury-border">
                      <Link to="/collections/footwear" className="text-xs hover:text-accent text-primary/70 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Footwear Edit</Link>
                      <Link to="/collections/coats" className="text-xs hover:text-accent text-primary/70 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Luxury Coats</Link>
                      <Link to="/collections/summer" className="text-xs hover:text-accent text-primary/70 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Summer Essentials</Link>
                      <Link to="/collections/knitwear" className="text-xs hover:text-accent text-primary/70 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Premium Knitwear</Link>
                      <Link to="/collections/accessories" className="text-xs hover:text-accent text-primary/70 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Accessories & Bags</Link>
                      <Link to="/collections/best-sellers" className="text-xs hover:text-accent text-accent transition-colors font-bold" onClick={() => setIsMobileMenuOpen(false)}>Best Sellers</Link>
                    </div>
                  </div>

                  <hr className="border-luxury-border my-2" />
                  {isAuthenticated ? (
                    <>
                      <Link to="/profile" className="hover:text-accent" onClick={() => setIsMobileMenuOpen(false)}>My Account</Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-left text-rose-500 uppercase hover:text-rose-700 tracking-widest"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link to="/profile" className="hover:text-accent" onClick={() => setIsMobileMenuOpen(false)}>Login / Register</Link>
                  )}
                </nav>
              </div>

              <div className="text-[10px] tracking-wider text-primary-muted font-sans leading-relaxed">
                <p>© 2026 JOVA LTD.</p>
                <p className="mt-1">Luxury Apparel & Design.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 2. Slide-out Mini-Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black z-[100]"
            />
            {/* Cart Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-[101] shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-luxury-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary stroke-[1.5]" />
                  <span className="text-xs uppercase tracking-widest font-sans font-semibold">
                    Shopping Bag ({totalCartQty})
                  </span>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="hover:text-accent">
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 no-scrollbar">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag className="w-10 h-10 text-luxury-border mb-4 stroke-[1]" />
                    <p className="text-xs uppercase tracking-widest text-primary font-medium mb-1">
                      Your bag is empty
                    </p>
                    <p className="text-[11px] text-primary-muted">
                      Add items to start shopping.
                    </p>
                  </div>
                ) : (                  cartItems.map((item: any) => (
                    <div key={item._id} className="flex gap-4 border-b border-luxury-border/50 pb-4">
                      {/* Thumbnail */}
                      <Link to={`/product/${item.product.id}`} className="w-20 aspect-[3/4] overflow-hidden bg-luxury-cream flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>
 
                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <Link
                              to={`/product/${item.product.id}`}
                              className="text-xs uppercase tracking-wider font-sans font-semibold text-primary hover:text-accent line-clamp-1"
                            >
                              {item.product.name}
                            </Link>
                            <span className="text-xs font-semibold font-sans ml-2">
                              ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                          <p className="text-[10px] text-primary-muted uppercase mt-0.5">
                            {item.product.subcategory}
                          </p>
                          <div className="flex gap-4 text-[10px] text-primary-muted mt-2">
                            <span>Size: <strong className="text-primary">{item.size}</strong></span>
                            <span className="flex items-center gap-1">
                              Color:{' '}
                              <span
                                className="w-2.5 h-2.5 rounded-full inline-block border border-luxury-border"
                                style={{ backgroundColor: item.color.hex }}
                                title={item.color.name}
                              />
                            </span>
                          </div>
                        </div>
 
                        {/* Qty & Remove */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-luxury-border">
                            <button
                              onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                              className="p-1 hover:text-accent text-primary-muted"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-xs font-semibold font-sans">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                              className="p-1 hover:text-accent text-primary-muted"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className="text-primary-muted hover:text-rose-500 transition-colors flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
 
              {/* Checkout / Footer Section */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-luxury-border bg-luxury-cream/30">
                  {/* Premium Shopping Indicators */}
                  <div className="mb-4 bg-white p-3 border border-luxury-border/50 text-[10px] tracking-wide font-sans flex flex-col gap-2.5">
                    {/* Free Shipping Indicator */}
                    <div>
                      {cartTotals.subtotal >= 4999 ? (
                        <div className="flex justify-between items-center text-emerald-600 font-bold uppercase">
                          <span>Free shipping unlocked</span>
                          <span>100%</span>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1.5">
                          <div className="flex justify-between text-primary-muted font-medium">
                            <span>Spend <strong className="text-primary">₹{(4999 - cartTotals.subtotal).toLocaleString('en-IN')}</strong> more for free shipping</span>
                            <span>{Math.round((cartTotals.subtotal / 4999) * 100)}%</span>
                          </div>
                          <div className="w-full bg-luxury-cream h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-accent h-full transition-all duration-500"
                              style={{ width: `${Math.min(100, (cartTotals.subtotal / 4999) * 100)}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
 
                    {/* Delivery Estimate */}
                    <div className="flex items-center gap-1.5 text-primary-muted border-t border-luxury-border/30 pt-2 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                      <span>Estimated Delivery: <strong className="text-primary font-semibold">Delivered within 3–5 business days</strong></span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs uppercase tracking-widest text-primary-muted font-medium">Subtotal</span>
                    <span className="text-sm font-semibold font-sans">₹{cartTotals.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs uppercase tracking-widest text-primary-muted font-medium">Shipping</span>
                    <span className="text-xs uppercase tracking-wider font-sans font-medium text-emerald-600">
                      {cartTotals.shippingFee === 0 ? 'FREE' : `₹${cartTotals.shippingFee.toLocaleString('en-IN')}`}
                    </span>
                  </div>
 
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/checkout"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full bg-primary text-white text-center py-3 text-xs uppercase tracking-widest font-sans font-semibold border border-primary hover:bg-transparent hover:text-primary transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Proceed to Checkout <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to="/cart"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full border border-luxury-border bg-white text-primary text-center py-3 text-xs uppercase tracking-widest font-sans font-semibold hover:border-primary transition-all duration-300"
                    >
                      View Shopping Bag
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 3. Dropdown Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="fixed inset-0 bg-black/40 z-[100]"
            />
            {/* Panel */}
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 w-full bg-white z-[101] shadow-xl border-b border-luxury-border p-6 md:p-10"
            >
              <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs uppercase tracking-widest text-primary-muted font-bold">Search Catalog</span>
                  <button onClick={() => setIsSearchOpen(false)} className="hover:text-accent">
                    <X className="w-5 h-5 stroke-[1.5]" />
                  </button>
                </div>

                <form onSubmit={handleSearchSubmit} className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Search by product, category, style..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-base bg-transparent border-b border-luxury-border py-4 pl-1 pr-10 focus:border-primary focus:outline-none transition-colors duration-300 font-sans"
                    autoFocus
                  />
                  <button type="submit" className="absolute right-2 top-4 hover:text-accent">
                    <Search className="w-5 h-5 stroke-[1.5]" />
                  </button>
                </form>

                {/* Live Results list */}
                {searchQuery && (
                  <div className="mt-4">
                    <p className="text-[10px] uppercase tracking-widest text-primary-muted mb-4">
                      Suggested Results ({searchResults.length})
                    </p>

                    {searchResults.length === 0 ? (
                      <p className="text-xs text-primary-muted font-sans py-2">
                        No products found matching "{searchQuery}"
                      </p>
                    ) : (
                      <div className="flex flex-col gap-3">
                        {searchResults.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => {
                              navigate(`/product/${product.id}`);
                              setIsSearchOpen(false);
                            }}
                            className="flex items-center gap-4 cursor-pointer hover:bg-luxury-cream/50 p-2 rounded transition-all"
                          >
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-10 h-12 object-cover bg-luxury-cream"
                            />
                            <div>
                              <p className="text-xs uppercase tracking-wider font-semibold text-primary">
                                {product.name}
                              </p>
                              <p className="text-[10px] text-primary-muted uppercase mt-0.5">
                                {product.category} &bull; {product.subcategory} &bull; ₹{product.price.toLocaleString('en-IN')}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
