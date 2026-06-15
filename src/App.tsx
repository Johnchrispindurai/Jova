import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { useUserStore } from './store/useUserStore';
import { useProductsMapQuery } from './hooks/useWishlist';

// Lazy loaded page components
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const ProductListing = lazy(() => import('./pages/ProductListing').then(module => ({ default: module.ProductListing })));
const ProductDetail = lazy(() => import('./pages/ProductDetail').then(module => ({ default: module.ProductDetail })));
const Cart = lazy(() => import('./pages/Cart').then(module => ({ default: module.Cart })));
const Checkout = lazy(() => import('./pages/Checkout').then(module => ({ default: module.Checkout })));
const Profile = lazy(() => import('./pages/Profile').then(module => ({ default: module.Profile })));
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));
const Collection = lazy(() => import('./pages/Collection').then(module => ({ default: module.Collection })));

// Scroll to top helper component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    // Only scroll to top on forward/replace navigation, preserve on back (POP)
    if (navType !== 'POP') {
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    }
  }, [pathname, navType]);

  return null;
};

// Luxury loading indicator
const PageLoader = () => (
  <div className="min-h-screen bg-luxury-bg flex flex-col items-center justify-center">
    <div className="text-3xl font-serif tracking-widest text-primary animate-pulse">
      JOVA
    </div>
    <div className="w-16 h-[1.5px] bg-accent mt-4 animate-pulse" />
  </div>
);

function App() {
  const checkAuth = useUserStore((state) => state.checkAuth);
  const isCheckingAuth = useUserStore((state) => state.isCheckingAuth);

  // Pre-fetch the static backend product ObjectIds map
  useProductsMapQuery();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <PageLoader />;
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-luxury-bg text-primary flex flex-col justify-between overflow-x-hidden font-sans">
        
        {/* Sticky Header Navigation */}
        <Navbar />

        {/* Floating Custom Toast Notifications */}
        <ToastContainer />

        {/* Content body container */}
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/women" element={<ProductListing />} />
              <Route path="/men" element={<ProductListing />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/collections/:collectionName" element={<Collection />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        {/* Brand Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;

