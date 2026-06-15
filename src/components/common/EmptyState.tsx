import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export interface EmptyStateProps {
  type: 'cart' | 'wishlist' | 'order' | 'search' | 'collection';
  title?: string;
  description?: string;
  primaryActionText?: string;
  primaryActionUrl?: string;
  onPrimaryAction?: () => void;
  secondaryActionText?: string;
  secondaryActionUrl?: string;
  onSecondaryAction?: () => void;
}

export const EmptyState = ({
  type,
  title: overrideTitle,
  description: overrideDescription,
  primaryActionText: overridePrimaryText,
  primaryActionUrl: overridePrimaryUrl,
  onPrimaryAction,
  secondaryActionText: overrideSecondaryText,
  secondaryActionUrl: overrideSecondaryUrl,
  onSecondaryAction
}: EmptyStateProps) => {

  // Brand-voice defaults for each empty state experience
  const DEFAULTS = {
    cart: {
      title: "Your cart is waiting for something beautiful.",
      description: "Explore our latest collections and discover pieces designed to elevate your everyday style.",
      primaryText: "Continue Shopping",
      primaryUrl: "/",
      secondaryText: "Explore New Arrivals",
      secondaryUrl: "/collections/new-arrivals"
    },
    wishlist: {
      title: "Save the styles you love.",
      description: "Your wishlist is the perfect place to keep track of pieces that inspire you.",
      primaryText: "Discover Trending Styles",
      primaryUrl: "/collections/trending",
      secondaryText: "Browse Collections",
      secondaryUrl: "/"
    },
    order: {
      title: "No orders yet.",
      description: "Your next favorite piece is waiting to be discovered.",
      primaryText: "Start Shopping",
      primaryUrl: "/",
      secondaryText: "",
      secondaryUrl: ""
    },
    search: {
      title: "No results found.",
      description: "Try a different keyword or explore our curated collections.",
      primaryText: "Explore Collections",
      primaryUrl: "/",
      secondaryText: "",
      secondaryUrl: ""
    },
    collection: {
      title: "Nothing matches your selection.",
      description: "Adjust your filters or discover other curated edits from JOVA.",
      primaryText: "Clear Filters",
      primaryUrl: "",
      secondaryText: "View All Products",
      secondaryUrl: "/collections/new-arrivals"
    }
  };

  const current = DEFAULTS[type];
  const title = overrideTitle || current.title;
  const description = overrideDescription || current.description;
  
  const primaryText = overridePrimaryText || current.primaryText;
  const primaryUrl = overridePrimaryUrl || current.primaryUrl;
  
  const secondaryText = overrideSecondaryText || current.secondaryText;
  const secondaryUrl = overrideSecondaryUrl || current.secondaryUrl;

  // Custom high-fashion vector illustrations
  const renderIllustration = () => {
    const strokeColor = "#C5A880"; // Champagne Gold accent
    
    switch (type) {
      case 'cart':
        return (
          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            {/* Elegant shopping bag with curved handle */}
            <path d="M6 8h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8z" />
            <path d="M9 8V6a3 3 0 0 1 6 0v2" />
          </svg>
        );
      case 'wishlist':
        return (
          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            {/* Elegant thin-line heart */}
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        );
      case 'order':
        return (
          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            {/* Minimal package / geometric box */}
            <path d="M21 7.5L12 3L3 7.5L12 12L21 7.5Z" />
            <path d="M3 7.5V16.5L12 21V12" />
            <path d="M21 7.5V16.5L12 21" />
            <line x1="7.5" y1="5.25" x2="16.5" y2="9.75" />
          </svg>
        );
      case 'search':
        return (
          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            {/* Elegant magnifying glass */}
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16" y2="16" />
          </svg>
        );
      case 'collection':
        return (
          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            {/* High-fashion coat hanger */}
            {/* Hook */}
            <path d="M12 7.5c-1.5 0-2.5-1.2-2.5-2.5S10.5 2.5 12 2.5s2.5 1.2 2.5 2.5v1" />
            {/* Body */}
            <path d="M12 7.5L2 14.5c0 0 .8-.5 1.8-.5h16.4c1 0 1.8.5 1.8.5L12 7.5z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center py-20 px-4 max-w-md mx-auto"
    >
      {/* Icon Frame with soft round shadow and champagne ring */}
      <div className="mb-8 p-6 bg-luxury-cream/30 border border-luxury-border/30 rounded-full shadow-sm flex items-center justify-center">
        {renderIllustration()}
      </div>

      {/* Luxury Title (Playfair Display font) */}
      <h3 className="text-xl uppercase tracking-widest text-primary mb-3 font-serif font-light leading-snug">
        {title}
      </h3>

      {/* Luxury Description (Inter font) */}
      <p className="text-xs text-primary-muted mb-10 font-sans max-w-xs leading-relaxed font-light">
        {description}
      </p>

      {/* Button Group (Stacked on mobile, side-by-side or centered) */}
      <div className="flex flex-col sm:flex-row gap-3 w-full justify-center items-center">
        {/* Primary CTA */}
        {onPrimaryAction ? (
          <button
            onClick={onPrimaryAction}
            className="w-full sm:w-auto bg-primary text-white border border-primary hover:bg-transparent hover:text-primary py-3 px-8 text-[10px] uppercase tracking-widest font-sans font-semibold transition-all duration-300 active:scale-[0.98]"
          >
            {primaryText}
          </button>
        ) : (
          primaryUrl && (
            <Link
              to={primaryUrl}
              className="w-full sm:w-auto text-center bg-primary text-white border border-primary hover:bg-transparent hover:text-primary py-3 px-8 text-[10px] uppercase tracking-widest font-sans font-semibold transition-all duration-300 active:scale-[0.98]"
            >
              {primaryText}
            </Link>
          )
        )}

        {/* Secondary CTA */}
        {secondaryText && (
          onSecondaryAction ? (
            <button
              onClick={onSecondaryAction}
              className="w-full sm:w-auto bg-transparent text-primary border border-luxury-border hover:border-accent hover:text-accent py-3 px-8 text-[10px] uppercase tracking-widest font-sans font-semibold transition-all duration-300 active:scale-[0.98]"
            >
              {secondaryText}
            </button>
          ) : (
            secondaryUrl && (
              <Link
                to={secondaryUrl}
                className="w-full sm:w-auto text-center bg-transparent text-primary border border-luxury-border hover:border-accent hover:text-accent py-3 px-8 text-[10px] uppercase tracking-widest font-sans font-semibold transition-all duration-300 active:scale-[0.98]"
              >
                {secondaryText}
              </Link>
            )
          )
        )}
      </div>
    </motion.div>
  );
};
