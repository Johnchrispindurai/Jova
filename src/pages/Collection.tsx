import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SlidersHorizontal,
  ArrowUpDown,
  X,
  Grid2X2,
  Grid3X3,
  ChevronDown,
  Search
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { EmptyState } from '../components/common/EmptyState';
import { ProductGridSkeleton as LoadingGrid } from '../components/common/SkeletonLoader';
import { QuickViewDrawer } from '../components/product/QuickViewDrawer';
import type { Product } from '../types';

interface CollectionInfo {
  title: string;
  description: string;
  filter: (p: Product) => boolean;
}

const COLLECTIONS: Record<string, CollectionInfo> = {
  'footwear': {
    title: 'Footwear Edit',
    description: 'Step into refinement. Explore our handcrafted sneakers, loafers, and boots designed for modern luxury.',
    filter: (p) => p.subcategory === 'Footwear'
  },
  'coats': {
    title: 'Luxury Coats & Jackets',
    description: 'Structured silhouettes, double-breasted trenches, and utility jackets built for effortless warmth.',
    filter: (p) => ['Outerwear', 'Jackets', 'Suits'].includes(p.subcategory)
  },
  'summer': {
    title: 'Summer Essentials',
    description: 'Lightweight linen, organic cotton, and breathable designs for warmer days.',
    filter: (p) => {
      const keywords = ['linen', 'cotton', 'breezy', 'shorts', 'tee', 'polo', 'summer', 'silk', 'slip', 'sundress', 'sandal', 'slide', 'straw'];
      const subcats = ['T-Shirts', 'Polos', 'Skirts', 'Dresses', 'Blouses', 'Tops'];
      const matchesKeyword = keywords.some(k =>
        p.name.toLowerCase().includes(k) ||
        p.description.toLowerCase().includes(k) ||
        p.details.some(d => d.toLowerCase().includes(k))
      );
      return subcats.includes(p.subcategory) || matchesKeyword;
    }
  },
  'knitwear': {
    title: 'Premium Knitwear',
    description: 'Grade-A cashmere, fine merino wool cardigans, and ribbed winter crewnecks.',
    filter: (p) => {
      const keywords = ['knit', 'sweater', 'cardigan', 'crewneck', 'mock-neck', 'bodycon', 'ribbed'];
      const matchesKeyword = keywords.some(k =>
        p.name.toLowerCase().includes(k) ||
        p.description.toLowerCase().includes(k)
      );
      return p.subcategory === 'Knitwear' || matchesKeyword;
    }
  },
  'accessories': {
    title: 'Accessories & Leather Goods',
    description: 'Structured tote bags, gold plated pendant necklaces, and minimalist watches.',
    filter: (p) => ['Accessories', 'Bags'].includes(p.subcategory)
  },
  'best-sellers': {
    title: 'Best Sellers',
    description: 'Discover the pieces loved most by the JOVA community.',
    filter: (p) => !!p.isBestSeller
  },
  'new-arrivals': {
    title: 'New Arrivals',
    description: 'Explore the latest releases, seasonal edits, and modern silhouettes from JOVA Atelier.',
    filter: (p) => !!p.isNewArrival
  },
  'editors-picks': {
    title: "Editor's Picks",
    description: 'A curated selection of high-fashion statements and clean wardrobe staples, handpicked by our editors.',
    filter: (p) => !!p.isEditorsPick
  },
  'trending': {
    title: 'Trending Now',
    description: 'The most popular and trending premium pieces from the current season.',
    filter: (p) => !!p.isTrending
  },
  'trending-now': {
    title: 'Trending Now',
    description: 'The most popular and trending premium pieces from the current season.',
    filter: (p) => !!p.isTrending
  },
  'seasonal': {
    title: 'Seasonal Edit',
    description: 'Lightweight linen, organic cotton, and transitional layering pieces for the current season.',
    filter: (p) => !!p.isSeasonal
  }
};

// Reusable Accordion Filter component
interface AccordionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  count?: number;
  children: React.ReactNode;
}

const Accordion = ({ title, isOpen, onToggle, count, children }: AccordionProps) => {
  return (
    <div className="border-b border-luxury-border pb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-2 text-xs uppercase tracking-widest font-bold text-[#111111] hover:text-accent transition-colors"
      >
        <span>
          {title} {count !== undefined && count > 0 ? `(${count})` : ''}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-3.5 h-3.5 stroke-[1.5]" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden mt-3"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Collection = () => {
  const { collectionName } = useParams<{ collectionName: string }>();
  const navigate = useNavigate();
  const searchDropdownRef = useRef<HTMLDivElement>(null);

  // Determine current collection metadata
  const collectionMeta = useMemo(() => {
    const key = (collectionName || '').toLowerCase();
    return COLLECTIONS[key] || {
      title: (collectionName || '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      description: `Curated selection of ${collectionName || 'collection'} pieces.`,
      filter: (p: Product) => p.subcategory.toLowerCase() === (collectionName || '').replace('-', ' ').toLowerCase()
    };
  }, [collectionName]);

  // Initial base products matching the collection criteria
  const baseProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(collectionMeta.filter);
  }, [collectionMeta]);

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Filters State
  const [selectedGender, setSelectedGender] = useState<'all' | 'men' | 'women'>('all');
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(12000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Quick View Drawer State
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Search Live Suggestions State
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('jova-recent-searches');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Accordion Sections State
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    gender: true,
    subcategory: true,
    colors: true,
    sizes: true,
    price: true,
  });

  // Persistent Grid Columns State
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(() => {
    const saved = localStorage.getItem('jova-grid-cols');
    return saved ? (Number(saved) as 2 | 3 | 4) : 4;
  });

  // Detect mobile width
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setIsFilterOpen(false); // Close filter drawer by default on mobile
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close search suggestions on click outside
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => document.removeEventListener('mousedown', clickOutside);
  }, []);

  // Reset filters when collection changes
  useEffect(() => {
    setIsLoading(true);
    setSelectedGender('all');
    setSelectedSubcategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange(12000);
    setSortBy('featured');
    setSearchQuery('');

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [collectionName]);

  const toggleAccordion = (section: string) => {
    setOpenAccordions((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Grid Cols select wrapper
  const handleGridColsChange = (cols: 2 | 3 | 4) => {
    setGridCols(cols);
    localStorage.setItem('jova-grid-cols', String(cols));
  };

  // Recent Searches management
  const saveRecentSearch = (query: string) => {
    if (!query.trim()) return;
    const cleanQuery = query.trim();
    const filtered = recentSearches.filter(q => q.toLowerCase() !== cleanQuery.toLowerCase());
    const updated = [cleanQuery, ...filtered].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('jova-recent-searches', JSON.stringify(updated));
  };

  const removeRecentSearch = (query: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = recentSearches.filter(q => q !== query);
    setRecentSearches(updated);
    localStorage.setItem('jova-recent-searches', JSON.stringify(updated));
  };

  const clearRecentSearches = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches([]);
    localStorage.removeItem('jova-recent-searches');
  };

  // Filter triggers
  const handleFilterChange = (type: string, value: any) => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 250);

    if (type === 'gender') {
      setSelectedGender(value);
    } else if (type === 'subcategory') {
      setSelectedSubcategories(prev =>
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      );
    } else if (type === 'color') {
      setSelectedColors(prev =>
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      );
    } else if (type === 'size') {
      setSelectedSizes(prev =>
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      );
    }
  };

  const handleClearAll = () => {
    setIsLoading(true);
    setSelectedGender('all');
    setSelectedSubcategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange(12000);
    setSearchQuery('');
    setTimeout(() => setIsLoading(false), 300);
  };

  // Available options
  const availableSubcategories = useMemo(() => {
    const list = baseProducts.map(p => p.subcategory);
    return Array.from(new Set(list));
  }, [baseProducts]);

  const availableColors = useMemo(() => {
    const list: { name: string; hex: string }[] = [];
    const hexSet = new Set<string>();
    baseProducts.forEach(p => {
      p.colors.forEach(c => {
        if (!hexSet.has(c.hex)) {
          hexSet.add(c.hex);
          list.push(c);
        }
      });
    });
    return list;
  }, [baseProducts]);

  const availableSizes = useMemo(() => {
    const list: string[] = [];
    baseProducts.forEach(p => {
      p.sizes.forEach(s => {
        if (!list.includes(s)) list.push(s);
      });
    });
    const order = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '30', '32', '34', '36', '38', '39', '40', '41', '42', '43', '44', 'One Size'];
    return list.sort((a, b) => order.indexOf(a) - order.indexOf(b));
  }, [baseProducts]);

  // Main filtered products list
  const filteredProducts = useMemo(() => {
    let list = [...baseProducts];

    if (selectedGender !== 'all') {
      list = list.filter(p => p.category === selectedGender);
    }

    if (selectedSubcategories.length > 0) {
      list = list.filter(p => selectedSubcategories.includes(p.subcategory));
    }

    if (selectedColors.length > 0) {
      list = list.filter(p => p.colors.some(c => selectedColors.includes(c.name)));
    }

    if (selectedSizes.length > 0) {
      list = list.filter(p => p.sizes.some(s => selectedSizes.includes(s)));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.colors.some(c => c.name.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q) ||
        p.details.some(d => d.toLowerCase().includes(q))
      );
    }

    list = list.filter(p => p.price <= priceRange);

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }

    return list;
  }, [baseProducts, selectedGender, selectedSubcategories, selectedColors, selectedSizes, priceRange, sortBy, searchQuery]);

  // Search Live Suggestions
  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return baseProducts.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q) ||
      p.colors.some(c => c.name.toLowerCase().includes(q)) ||
      p.description.toLowerCase().includes(q) ||
      p.details.some(d => d.toLowerCase().includes(q))
    ).slice(0, 5);
  }, [baseProducts, searchQuery]);

  // Highlight suggestion matching letters
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return <span>{text}</span>;
    const regex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <strong key={i} className="font-extrabold text-[#111111] underline decoration-accent/60 decoration-2">{part}</strong>
          ) : (
            <span key={i} className="text-primary-muted">{part}</span>
          )
        )}
      </span>
    );
  };

  // Category chips filtering active state logic
  const isChipActive = (type: 'all' | 'men' | 'women' | 'footwear' | 'accessories') => {
    if (type === 'all') {
      return selectedGender === 'all' && selectedSubcategories.length === 0;
    }
    if (type === 'men') {
      return selectedGender === 'men' && selectedSubcategories.length === 0;
    }
    if (type === 'women') {
      return selectedGender === 'women' && selectedSubcategories.length === 0;
    }
    if (type === 'footwear') {
      return selectedSubcategories.length === 1 && selectedSubcategories[0] === 'Footwear';
    }
    if (type === 'accessories') {
      return selectedSubcategories.length > 0 && selectedSubcategories.every(s => ['Accessories', 'Bags'].includes(s));
    }
    return false;
  };

  const handleChipClick = (type: 'all' | 'men' | 'women' | 'footwear' | 'accessories') => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);

    if (type === 'all') {
      setSelectedGender('all');
      setSelectedSubcategories([]);
    } else if (type === 'men') {
      setSelectedGender('men');
      setSelectedSubcategories([]);
    } else if (type === 'women') {
      setSelectedGender('women');
      setSelectedSubcategories([]);
    } else if (type === 'footwear') {
      setSelectedGender('all');
      setSelectedSubcategories(['Footwear']);
    } else if (type === 'accessories') {
      setSelectedGender('all');
      setSelectedSubcategories(['Accessories', 'Bags']);
    }
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedGender !== 'all') count += 1;
    count += selectedSubcategories.length;
    count += selectedColors.length;
    count += selectedSizes.length;
    if (priceRange < 12000) count += 1;
    return count;
  }, [selectedGender, selectedSubcategories, selectedColors, selectedSizes, priceRange]);

  // Sidebar filters render content
  const renderFilterSidebarContent = () => (
    <div className="flex flex-col gap-6">
      {/* Global Reset */}
      <div className="flex items-center justify-between border-b border-luxury-border pb-4">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#111111]">
          Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}
        </span>
        {activeFiltersCount > 0 && (
          <button
            onClick={handleClearAll}
            className="text-[10px] uppercase tracking-wider text-accent font-bold hover:text-[#111111] transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Gender Accordion */}
      <Accordion
        title="Category"
        isOpen={openAccordions.gender}
        onToggle={() => toggleAccordion('gender')}
        count={selectedGender !== 'all' ? 1 : 0}
      >
        <div className="flex flex-col gap-3">
          {(['all', 'men', 'women'] as const).map((gender) => (
            <label
              key={gender}
              className="flex items-center gap-3 text-xs uppercase tracking-wider text-primary/80 hover:text-primary cursor-pointer"
            >
              <input
                type="radio"
                name="gender"
                checked={selectedGender === gender}
                onChange={() => handleFilterChange('gender', gender)}
                className="w-3.5 h-3.5 border-luxury-border text-[#111111] focus:ring-0 accent-[#111111] cursor-pointer"
              />
              <span>{gender === 'all' ? 'All Collection' : `${gender}'s`}</span>
            </label>
          ))}
        </div>
      </Accordion>

      {/* Subcategory Accordion */}
      {availableSubcategories.length > 1 && (
        <Accordion
          title="Product Type"
          isOpen={openAccordions.subcategory}
          onToggle={() => toggleAccordion('subcategory')}
          count={selectedSubcategories.length}
        >
          <div className="flex flex-col gap-3">
            {availableSubcategories.map((sub) => (
              <label
                key={sub}
                className="flex items-center gap-3 text-xs uppercase tracking-wider text-primary/80 hover:text-primary cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedSubcategories.includes(sub)}
                  onChange={() => handleFilterChange('subcategory', sub)}
                  className="w-3.5 h-3.5 border-luxury-border text-[#111111] focus:ring-0 accent-[#111111] cursor-pointer"
                />
                <span>{sub}</span>
              </label>
            ))}
          </div>
        </Accordion>
      )}

      {/* Colors Accordion */}
      {availableColors.length > 0 && (
        <Accordion
          title="Colors"
          isOpen={openAccordions.colors}
          onToggle={() => toggleAccordion('colors')}
          count={selectedColors.length}
        >
          <div className="flex flex-wrap gap-2.5">
            {availableColors.map((color) => {
              const isSelected = selectedColors.includes(color.name);
              return (
                <button
                  key={color.name}
                  onClick={() => handleFilterChange('color', color.name)}
                  className={`w-6.5 h-6.5 rounded-full border flex-shrink-0 relative transition-all duration-300 ${
                    isSelected
                      ? 'scale-110 ring-1 ring-[#111111] ring-offset-2'
                      : 'border-luxury-border hover:scale-105'
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
        </Accordion>
      )}

      {/* Sizes Accordion */}
      {availableSizes.length > 0 && (
        <Accordion
          title="Sizes"
          isOpen={openAccordions.sizes}
          onToggle={() => toggleAccordion('sizes')}
          count={selectedSizes.length}
        >
          <div className="grid grid-cols-4 gap-2">
            {availableSizes.map((size) => {
              const isSelected = selectedSizes.includes(size);
              return (
                <button
                  key={size}
                  onClick={() => handleFilterChange('size', size)}
                  className={`py-2 text-[9px] font-sans uppercase border transition-all duration-200 ${
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
        </Accordion>
      )}

      {/* Price Accordion */}
      <Accordion
        title="Price Range"
        isOpen={openAccordions.price}
        onToggle={() => toggleAccordion('price')}
        count={priceRange < 12000 ? 1 : 0}
      >
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-[10px] text-primary-muted font-sans font-bold">Max Price</span>
            <span className="text-xs font-semibold font-sans text-[#111111]">₹{priceRange.toLocaleString('en-IN')}</span>
          </div>
          <input
            type="range"
            min="1000"
            max="12000"
            step="500"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            onMouseUp={() => {
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 200);
            }}
            className="w-full accent-[#111111] bg-luxury-cream border-none h-1 cursor-pointer"
          />
        </div>
      </Accordion>
    </div>
  );

  return (
    <div className="max-w-[1800px] mx-auto px-5 md:px-10 pt-28 pb-24 page-transition-container relative">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-[9px] text-primary-muted font-sans uppercase tracking-widest mb-4">
        <Link to="/" className="hover:text-[#111111] transition-colors">Home</Link>
        <span>/</span>
        <span className="text-primary-muted/50">Collections</span>
        <span>/</span>
        <span className="text-[#111111] font-bold">{collectionMeta.title}</span>
      </div>

      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-luxury-border pb-8">
        <div className="max-w-2xl">
          <span className="text-[9px] uppercase tracking-mega text-accent font-bold">
            JOVA CAMPAIGN
          </span>
          <h1 className="text-3xl md:text-4xl uppercase font-serif tracking-widest mt-1 text-[#111111]">
            {collectionMeta.title}
          </h1>
          <p className="text-xs text-primary-muted font-sans mt-2.5 leading-relaxed">
            {collectionMeta.description}
          </p>

          {/* Supporting Information block */}
          <div className="flex items-center gap-4 mt-4 text-[9px] text-accent uppercase font-sans font-bold">
            <span>{filteredProducts.length} Premium Pieces</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EAE6DF]" />
            <span>Updated Weekly</span>
          </div>

          {/* Category Chips filter bar */}
          <div className="flex flex-wrap gap-2 mt-6">
            {(['all', 'men', 'women', 'footwear', 'accessories'] as const).map((chip) => {
              const active = isChipActive(chip);
              return (
                <button
                  key={chip}
                  onClick={() => handleChipClick(chip)}
                  className={`px-4 py-2 text-[9px] uppercase tracking-widest font-sans font-bold transition-all duration-300 border ${
                    active
                      ? 'bg-[#111111] border-[#111111] text-white'
                      : 'bg-transparent border-luxury-border text-[#111111] hover:bg-[#F5F5F5] hover:border-[#111111]'
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Control Bar */}
      <div className="sticky top-[60px] md:top-[64px] z-20 bg-white/95 backdrop-blur-md border-y border-luxury-border py-3 px-1 flex items-center justify-between lg:hidden mb-6">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#111111] px-4 py-1.5 border border-luxury-border bg-white"
        >
          <SlidersHorizontal className="w-4 h-4 stroke-[1.8]" />
          Filter {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}
        </button>

        <div className="flex items-center gap-2 pr-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-primary-muted" />
          <select
            value={sortBy}
            onChange={(e) => {
              setIsLoading(true);
              setSortBy(e.target.value);
              setTimeout(() => setIsLoading(false), 200);
            }}
            className="bg-transparent text-xs uppercase tracking-wider font-bold focus:outline-none cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="newest">New In</option>
            <option value="price-low">Price: Low-High</option>
            <option value="price-high">Price: High-Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Desktop Control Bar */}
      <div className="border-b border-luxury-border pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-6">
          {/* Toggle Filter Panel */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-widest font-sans font-bold text-[#111111] hover:text-accent transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 stroke-[1.8]" />
            {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Desktop Grid Layout Buttons */}
          <div className="hidden md:flex items-center gap-3 border-l border-luxury-border pl-6">
            {/* 2 Cols */}
            <div className="relative group">
              <button
                onClick={() => handleGridColsChange(2)}
                className={`p-1.5 transition-colors border ${
                  gridCols === 2 ? 'border-[#111111] text-[#111111]' : 'border-transparent text-primary/40 hover:text-[#111111]'
                }`}
                aria-label="View as 2 columns"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleGridColsChange(2); }}
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#111111] text-white text-[8px] uppercase tracking-widest py-1 px-2 rounded-none whitespace-nowrap z-10 shadow-md">
                2 Columns
              </span>
            </div>

            {/* 3 Cols */}
            <div className="relative group">
              <button
                onClick={() => handleGridColsChange(3)}
                className={`p-1.5 transition-colors border text-sm font-sans font-bold leading-none ${
                  gridCols === 3 ? 'border-[#111111] text-[#111111]' : 'border-transparent text-primary/40 hover:text-[#111111]'
                }`}
                aria-label="View as 3 columns"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleGridColsChange(3); }}
              >
                3C
              </button>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#111111] text-white text-[8px] uppercase tracking-widest py-1 px-2 rounded-none whitespace-nowrap z-10 shadow-md">
                3 Columns
              </span>
            </div>

            {/* 4 Cols */}
            <div className="relative group">
              <button
                onClick={() => handleGridColsChange(4)}
                className={`p-1.5 transition-colors border ${
                  gridCols === 4 ? 'border-[#111111] text-[#111111]' : 'border-transparent text-primary/40 hover:text-[#111111]'
                }`}
                aria-label="View as 4 columns"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleGridColsChange(4); }}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#111111] text-white text-[8px] uppercase tracking-widest py-1 px-2 rounded-none whitespace-nowrap z-10 shadow-md">
                4 Columns (Widescreen)
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Search Input */}
        <div ref={searchDropdownRef} className="relative w-full md:w-80 z-30">
          <div className="flex items-center border border-luxury-border px-3.5 py-1.5 bg-luxury-cream/30 hover:border-primary/50 focus-within:border-[#111111] focus-within:bg-white transition-all">
            <Search className="w-4 h-4 text-primary-muted mr-2.5 flex-shrink-0" />
            <input
              type="text"
              placeholder={`Search ${collectionMeta.title.toLowerCase()}...`}
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  saveRecentSearch(searchQuery);
                  setIsSearchFocused(false);
                }
              }}
              className="bg-transparent text-xs text-primary placeholder-primary/40 focus:outline-none w-full py-0.5 font-sans"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="p-0.5 hover:text-[#111111] transition-colors">
                <X className="w-3.5 h-3.5 text-primary-muted" />
              </button>
            )}
          </div>

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {isSearchFocused && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-full bg-white border border-luxury-border shadow-xl z-50 overflow-hidden"
              >
                {/* Case 1: Search is Empty - show recent searches */}
                {!searchQuery.trim() && (
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2 pb-1 border-b border-luxury-border">
                      <span className="text-[9px] uppercase tracking-widest text-[#111111] font-bold">Recent Searches</span>
                      {recentSearches.length > 0 && (
                        <button
                          onClick={clearRecentSearches}
                          className="text-[9px] text-accent hover:text-[#111111] font-bold uppercase tracking-wider"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    {recentSearches.length === 0 ? (
                      <span className="text-[10px] text-primary-muted font-sans py-2 block">No recent searches</span>
                    ) : (
                      <div className="flex flex-col gap-1.5">
                        {recentSearches.map((query) => (
                          <div
                            key={query}
                            onClick={() => {
                              setSearchQuery(query);
                              saveRecentSearch(query);
                            }}
                            className="flex items-center justify-between text-xs text-primary-muted hover:text-[#111111] hover:bg-luxury-cream px-2 py-1.5 cursor-pointer font-sans"
                          >
                            <span>{query}</span>
                            <button
                              onClick={(e) => removeRecentSearch(query, e)}
                              className="p-0.5 hover:text-rose-500"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Case 2: Query entered - show live matches */}
                {searchQuery.trim() && (
                  <div>
                    <div className="p-3 bg-luxury-cream/50 border-b border-luxury-border">
                      <span className="text-[8px] uppercase tracking-widest text-primary-muted font-bold">Suggestions</span>
                    </div>
                    {searchSuggestions.length === 0 ? (
                      <div className="p-4 text-xs text-primary-muted font-sans">No matching items found</div>
                    ) : (
                      <div className="flex flex-col">
                        {searchSuggestions.map((prod) => (
                          <div
                            key={prod.id}
                            onClick={() => {
                              saveRecentSearch(searchQuery);
                              setIsSearchFocused(false);
                              navigate(`/product/${prod.id}`);
                            }}
                            className="flex items-center gap-3 p-3 hover:bg-luxury-cream border-b border-luxury-border/30 last:border-b-0 cursor-pointer transition-colors"
                          >
                            <img src={prod.images[0]} alt={prod.name} className="w-9 aspect-[3/4] object-cover flex-shrink-0" />
                            <div className="flex-grow min-w-0">
                              <h4 className="text-xs uppercase tracking-wider font-sans font-bold text-primary truncate">
                                {highlightText(prod.name, searchQuery)}
                              </h4>
                              <p className="text-[9px] text-primary-muted uppercase tracking-widest font-sans mt-0.5">
                                {prod.subcategory}
                              </p>
                            </div>
                            <span className="text-xs font-bold text-[#111111] font-sans flex-shrink-0">
                              ₹{prod.price.toLocaleString('en-IN')}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Sorting selector */}
        <div className="hidden lg:flex items-center gap-2 border-l border-luxury-border pl-6">
          <ArrowUpDown className="w-3.5 h-3.5 text-primary-muted" />
          <select
            value={sortBy}
            onChange={(e) => {
              setIsLoading(true);
              setSortBy(e.target.value);
              setTimeout(() => setIsLoading(false), 200);
            }}
            className="bg-transparent text-xs uppercase tracking-wider font-sans font-semibold focus:outline-none cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="newest">New In</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Removable Active Filter Chips (Above Grid) */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 items-center mb-8 bg-luxury-cream p-3.5 border border-luxury-border">
          <span className="text-[9px] uppercase tracking-widest font-bold text-[#111111] mr-1">Active Filters:</span>
          {selectedGender !== 'all' && (
            <span className="bg-white px-2.5 py-1 border border-luxury-border text-[9px] flex items-center gap-1.5 uppercase font-sans font-bold text-primary">
              Gender: {selectedGender}
              <X className="w-3 h-3 cursor-pointer text-primary-muted hover:text-[#111111] transition-colors" onClick={() => setSelectedGender('all')} />
            </span>
          )}
          {selectedSubcategories.map(s => (
            <span key={s} className="bg-white px-2.5 py-1 border border-luxury-border text-[9px] flex items-center gap-1.5 uppercase font-sans font-bold text-primary">
              {s}
              <X className="w-3 h-3 cursor-pointer text-primary-muted hover:text-[#111111] transition-colors" onClick={() => handleFilterChange('subcategory', s)} />
            </span>
          ))}
          {selectedColors.map(c => (
            <span key={c} className="bg-white px-2.5 py-1 border border-luxury-border text-[9px] flex items-center gap-1.5 uppercase font-sans font-bold text-primary">
              {c}
              <X className="w-3 h-3 cursor-pointer text-primary-muted hover:text-[#111111] transition-colors" onClick={() => handleFilterChange('color', c)} />
            </span>
          ))}
          {selectedSizes.map(s => (
            <span key={s} className="bg-white px-2.5 py-1 border border-luxury-border text-[9px] flex items-center gap-1.5 uppercase font-sans font-bold text-primary">
              {s}
              <X className="w-3 h-3 cursor-pointer text-primary-muted hover:text-[#111111] transition-colors" onClick={() => handleFilterChange('size', s)} />
            </span>
          ))}
          {priceRange < 12000 && (
            <span className="bg-white px-2.5 py-1 border border-luxury-border text-[9px] flex items-center gap-1.5 uppercase font-sans font-bold text-primary">
              Under ₹{priceRange.toLocaleString('en-IN')}
              <X className="w-3 h-3 cursor-pointer text-primary-muted hover:text-[#111111] transition-colors" onClick={() => setPriceRange(12000)} />
            </span>
          )}
          <button
            onClick={handleClearAll}
            className="text-[9px] uppercase tracking-widest text-accent font-extrabold hover:text-[#111111] transition-colors ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Desktop Filter Sidebar (Hidden on mobile) */}
        {!isMobile && isFilterOpen && (
          <aside className="w-[300px] flex-shrink-0 sticky top-24 h-fit max-h-[85vh] overflow-y-auto pr-6 no-scrollbar border-r border-luxury-border/30 animate-fade-in">
            {renderFilterSidebarContent()}
          </aside>
        )}

        {/* Mobile Filter Drawer (Bottom Sheet) */}
        <AnimatePresence>
          {isMobile && isFilterOpen && (
            <>
              {/* Mobile Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFilterOpen(false)}
                className="fixed inset-0 bg-black z-50 lg:hidden"
              />

              {/* Bottom Sheet Container */}
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl h-[75vh] flex flex-col overflow-hidden lg:hidden shadow-2xl"
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-luxury-border">
                  <span className="text-xs uppercase tracking-widest font-bold text-[#111111]">
                    Filter By
                  </span>
                  <button onClick={() => setIsFilterOpen(false)} className="p-1 hover:text-rose-500">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Scrollable Content */}
                <div className="flex-grow overflow-y-auto px-6 py-4 no-scrollbar">
                  {renderFilterSidebarContent()}
                </div>

                {/* Drawer Actions Footer */}
                <div className="border-t border-luxury-border p-4 bg-luxury-cream flex gap-3">
                  <button
                    onClick={handleClearAll}
                    className="flex-1 border border-luxury-border bg-white text-[#111111] py-3 text-[10px] uppercase tracking-widest font-bold transition-colors"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="flex-1 bg-[#111111] text-white py-3 text-[10px] uppercase tracking-widest font-bold transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Product Grid Area */}
        <main className="flex-grow">
          {isLoading ? (
            <LoadingGrid count={8} />
          ) : filteredProducts.length === 0 ? (
            <EmptyState
              type={searchQuery ? 'search' : 'collection'}
              onPrimaryAction={handleClearAll}
            />
          ) : (
            <div
              className={`grid gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16 transition-all duration-300 ${
                gridCols === 2
                  ? 'grid-cols-2'
                  : gridCols === 3
                  ? 'grid-cols-2 md:grid-cols-3'
                  : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-[1600px]:grid-cols-5'
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => {
                    setQuickViewProduct(p);
                    setIsDrawerOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Zara-Style Quick View Drawer */}
      <QuickViewDrawer
        product={quickViewProduct}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
