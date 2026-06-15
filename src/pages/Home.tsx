import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { useState, useEffect, useMemo } from 'react';

// Hero slides data pointing to dedicated collection pages
const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1600&auto=format&fit=crop',
    title: 'SUMMER ESSENTIALS',
    subtitle: 'LIGHTWEIGHT & BREATHABLE ESCAPES',
    link: '/collections/summer',
    align: 'left'
  },
  {
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop',
    title: 'MODERN TAILORING',
    subtitle: 'LUXURY COATS & SUITING',
    link: '/collections/coats',
    align: 'right'
  },
  {
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
    title: 'SILENT LUXURY',
    subtitle: 'PREMIUM CASHMERE & KNITS',
    link: '/collections/knitwear',
    align: 'left'
  }
];

export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto carousel rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // Memoize filtered collections to optimize performance
  const newArrivals = useMemo(() => MOCK_PRODUCTS.filter(p => p.isNewArrival).slice(0, 12), []);
  const trendingProducts = useMemo(() => MOCK_PRODUCTS.filter(p => p.isTrending).slice(0, 12), []);
  const editorsPicks = useMemo(() => MOCK_PRODUCTS.filter(p => p.isEditorsPick).slice(0, 12), []);
  const bestSellers = useMemo(() => MOCK_PRODUCTS.filter(p => p.isBestSeller).slice(0, 12), []);
  const footwearEdit = useMemo(() => MOCK_PRODUCTS.filter(p => p.subcategory === 'Footwear').slice(0, 8), []);
  const seasonalEdit = useMemo(() => MOCK_PRODUCTS.filter(p => p.isSeasonal).slice(0, 8), []);

  return (
    <div className="w-full page-transition-container bg-luxury-bg">
      {/* 1. HERO CAROUSEL */}
      <section className="relative h-screen w-full overflow-hidden bg-luxury-cream">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Slide Image overlay */}
            <div className="absolute inset-0 bg-black/25 z-0" />
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                index === currentSlide ? 'scale-105' : 'scale-100'
              }`}
            />

            {/* Slide Text Overlay */}
            <div className="absolute inset-0 z-10 flex items-center">
              <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
                <div
                  className={`max-w-xl flex flex-col gap-6 text-white ${
                    slide.align === 'right' ? 'ml-auto text-right items-end' : 'text-left items-start'
                  }`}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 15 }}
                    animate={index === currentSlide ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-xs uppercase tracking-mega font-bold text-accent font-sans"
                  >
                    {slide.subtitle}
                  </motion.span>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={index === currentSlide ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-4xl md:text-6xl font-serif font-light tracking-wide leading-tight"
                  >
                    {slide.title}
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={index === currentSlide ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="mt-2"
                  >
                    <Link
                      to={slide.link}
                      className="inline-flex items-center gap-2 border-b border-white pb-2 text-xs uppercase tracking-widest font-sans font-bold hover:text-accent hover:border-accent transition-colors duration-300"
                    >
                      Discover Campaign <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full border border-white/20 text-white hover:bg-white hover:text-primary transition-all duration-300 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full border border-white/20 text-white hover:bg-white hover:text-primary transition-all duration-300 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-[2px] transition-all duration-300 ${
                index === currentSlide ? 'w-10 bg-accent' : 'w-4 bg-white/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. CATEGORY SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Women Spotlight */}
          <div className="relative aspect-[4/5] group overflow-hidden bg-luxury-cream">
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop"
              alt="Women Category"
              className="w-full h-full object-cover zoom-image"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
            <div className="absolute bottom-10 left-10 z-20 text-white flex flex-col gap-3">
              <span className="text-[10px] tracking-widest uppercase text-accent font-bold font-sans">ATELIER</span>
              <h3 className="text-3xl font-serif font-light tracking-wide">WOMEN</h3>
              <Link
                to="/women"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest border-b border-white pb-1 w-fit hover:text-accent hover:border-accent transition-colors"
              >
                Shop Collection <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Men Spotlight */}
          <div className="relative aspect-[4/5] group overflow-hidden bg-luxury-cream">
            <img
              src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1000&auto=format&fit=crop"
              alt="Men Category"
              className="w-full h-full object-cover zoom-image"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
            <div className="absolute bottom-10 left-10 z-20 text-white flex flex-col gap-3">
              <span className="text-[10px] tracking-widest uppercase text-accent font-bold font-sans">ATELIER</span>
              <h3 className="text-3xl font-serif font-light tracking-wide">MEN</h3>
              <Link
                to="/men"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest border-b border-white pb-1 w-fit hover:text-accent hover:border-accent transition-colors"
              >
                Shop Collection <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NEW ARRIVALS (12 Products) */}
      <section className="bg-luxury-cream/40 py-24 border-y border-luxury-border/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-baseline mb-12">
            <div>
              <span className="text-xs uppercase tracking-mega font-bold text-accent block mb-2 font-sans">LATEST RELEASES</span>
              <h2 className="text-3xl font-serif font-medium tracking-wide">NEW ARRIVALS</h2>
            </div>
            <Link
              to="/collections/new-arrivals"
              className="text-xs font-semibold uppercase tracking-widest hover:text-accent border-b border-primary hover:border-accent pb-1 transition-all font-sans"
            >
              View All Arrivals
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/collections/new-arrivals"
              className="inline-block border border-primary bg-primary text-white hover:bg-transparent hover:text-primary py-3.5 px-10 text-xs uppercase tracking-widest font-sans font-semibold transition-all duration-300"
            >
              Shop New Arrivals
            </Link>
          </div>
        </div>
      </section>

      {/* 4. TRENDING NOW (12 Products Sliding Shelf) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-24">
        <div className="flex justify-between items-baseline mb-12">
          <div>
            <span className="text-xs uppercase tracking-mega font-bold text-accent block mb-2 font-sans">CURATED SELECTION</span>
            <h2 className="text-3xl font-serif font-medium tracking-wide">TRENDING NOW</h2>
          </div>
          <Link
            to="/collections/trending"
            className="text-xs font-semibold uppercase tracking-widest hover:text-accent border-b border-primary hover:border-accent pb-1 transition-all font-sans"
          >
            View All Trending
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar scroll-smooth snap-x snap-mandatory">
          {trendingProducts.map((product) => (
            <div key={product.id} className="w-[260px] md:w-[300px] flex-shrink-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* 5. PROMOTIONAL EDITORIAL BANNER - SNEAKER BANNER */}
      <section className="relative h-[65vh] w-full overflow-hidden bg-luxury-cream">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img
          src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1600&auto=format&fit=crop"
          alt="Editorial Collection"
          className="w-full h-full object-cover scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
          <div className="max-w-2xl text-white flex flex-col items-center gap-6">
            <span className="text-xs uppercase tracking-mega font-bold text-accent font-sans">HANDCRAFTED LUXURY</span>
            <h2 className="text-3xl md:text-5xl font-serif font-light tracking-wide leading-tight uppercase">
              The Footwear Edit
            </h2>
            <p className="text-xs md:text-sm font-sans text-white/80 max-w-md leading-relaxed font-light">
              Step into silent luxury with our collection of handcrafted leather sneakers, premium Chelsea boots, and elegant heels built for modern silhouettes.
            </p>
            <Link
              to="/collections/footwear"
              className="mt-2 bg-white text-primary uppercase tracking-widest text-xs py-3.5 px-8 font-sans font-semibold border border-white hover:bg-transparent hover:text-white transition-all duration-300"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </section>

      {/* 6. BEST SELLERS (12 Products Sliding Shelf) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-24">
        <div className="flex justify-between items-baseline mb-12">
          <div>
            <span className="text-xs uppercase tracking-mega font-bold text-accent block mb-2 font-sans">COMMUNITY FAVOURITES</span>
            <h2 className="text-3xl font-serif font-medium tracking-wide">BEST SELLERS</h2>
          </div>
          <Link
            to="/collections/best-sellers"
            className="text-xs font-semibold uppercase tracking-widest hover:text-accent border-b border-primary hover:border-accent pb-1 transition-all font-sans"
          >
            View All Best Sellers
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar scroll-smooth snap-x snap-mandatory">
          {bestSellers.map((product) => (
            <div key={product.id} className="w-[260px] md:w-[300px] flex-shrink-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* 7. EDITOR'S PICKS (12 Products) */}
      <section className="bg-luxury-cream/40 py-24 border-y border-luxury-border/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-baseline mb-12">
            <div>
              <span className="text-xs uppercase tracking-mega font-bold text-accent block mb-2 font-sans">OUR RECOMMENDATIONS</span>
              <h2 className="text-3xl font-serif font-medium tracking-wide font-sans">EDITOR'S PICKS</h2>
            </div>
            <Link
              to="/collections/editors-picks"
              className="text-xs font-semibold uppercase tracking-widest hover:text-accent border-b border-primary hover:border-accent pb-1 transition-all font-sans"
            >
              View All Picks
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {editorsPicks.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/collections/editors-picks"
              className="inline-block border border-primary bg-primary text-white hover:bg-transparent hover:text-primary py-3.5 px-10 text-xs uppercase tracking-widest font-sans font-semibold transition-all duration-300"
            >
              Shop Editor's Picks
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FOOTWEAR EDIT (8 Products) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-24">
        <div className="flex justify-between items-baseline mb-12">
          <div>
            <span className="text-xs uppercase tracking-mega font-bold text-accent block mb-2 font-sans">SHOE SELECTION</span>
            <h2 className="text-3xl font-serif font-medium tracking-wide">FOOTWEAR EDIT</h2>
          </div>
          <Link
            to="/collections/footwear"
            className="text-xs font-semibold uppercase tracking-widest hover:text-accent border-b border-primary hover:border-accent pb-1 transition-all font-sans"
          >
            View All Footwear
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
          {footwearEdit.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 9. SEASONAL EDIT (8 Products Sliding Shelf) */}
      <section className="bg-luxury-cream/20 border-t border-luxury-border/20 py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-baseline mb-12">
            <div>
              <span className="text-xs uppercase tracking-mega font-bold text-accent block mb-2 font-sans">TRANSITIONAL STYLING</span>
              <h2 className="text-3xl font-serif font-medium tracking-wide">SEASONAL EDIT</h2>
            </div>
            <Link
              to="/collections/seasonal"
              className="text-xs font-semibold uppercase tracking-widest hover:text-accent border-b border-primary hover:border-accent pb-1 transition-all font-sans"
            >
              View All Seasonal
            </Link>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar scroll-smooth snap-x snap-mandatory">
            {seasonalEdit.map((product) => (
              <div key={product.id} className="w-[260px] md:w-[300px] flex-shrink-0 snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
