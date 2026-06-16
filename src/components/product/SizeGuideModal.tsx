import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

interface SizingRow {
  size: string;
  bustChest: string;
  waist: string;
  hip: string;
}

const WOMEN_SIZING: Record<'in' | 'cm', SizingRow[]> = {
  in: [
    { size: 'XS', bustChest: '31 - 32', waist: '24 - 25', hip: '34 - 35' },
    { size: 'S', bustChest: '33 - 34', waist: '26 - 27', hip: '36 - 37' },
    { size: 'M', bustChest: '35 - 36', waist: '28 - 29', hip: '38 - 39' },
    { size: 'L', bustChest: '37 - 39', waist: '30 - 32', hip: '40 - 42' },
    { size: 'XL', bustChest: '40 - 42', waist: '33 - 35', hip: '43 - 45' },
  ],
  cm: [
    { size: 'XS', bustChest: '79 - 81', waist: '61 - 64', hip: '86 - 89' },
    { size: 'S', bustChest: '84 - 86', waist: '66 - 69', hip: '91 - 94' },
    { size: 'M', bustChest: '89 - 91', waist: '71 - 74', hip: '97 - 99' },
    { size: 'L', bustChest: '94 - 99', waist: '76 - 81', hip: '102 - 107' },
    { size: 'XL', bustChest: '102 - 107', waist: '84 - 89', hip: '109 - 114' },
  ]
};

const MEN_SIZING: Record<'in' | 'cm', SizingRow[]> = {
  in: [
    { size: 'XS', bustChest: '34 - 36', waist: '28 - 30', hip: '34 - 36' },
    { size: 'S', bustChest: '36 - 38', waist: '30 - 32', hip: '36 - 38' },
    { size: 'M', bustChest: '38 - 40', waist: '32 - 34', hip: '38 - 40' },
    { size: 'L', bustChest: '40 - 42', waist: '34 - 36', hip: '40 - 42' },
    { size: 'XL', bustChest: '42 - 44', waist: '36 - 38', hip: '42 - 44' },
  ],
  cm: [
    { size: 'XS', bustChest: '86 - 91', waist: '71 - 76', hip: '86 - 91' },
    { size: 'S', bustChest: '91 - 96', waist: '76 - 81', hip: '91 - 96' },
    { size: 'M', bustChest: '96 - 101', waist: '81 - 86', hip: '96 - 101' },
    { size: 'L', bustChest: '101 - 106', waist: '86 - 91', hip: '101 - 106' },
    { size: 'XL', bustChest: '106 - 111', waist: '91 - 96', hip: '106 - 111' },
  ]
};

export const SizeGuideModal = ({ isOpen, onClose, category = 'women' }: SizeGuideModalProps) => {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const modalRef = useRef<HTMLDivElement>(null);
  
  const isMen = category?.toLowerCase() === 'men';
  const sizeData = isMen ? MEN_SIZING[unit] : WOMEN_SIZING[unit];

  // Lock body scroll when modal is open
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

  // Focus trap and key listener
  useEffect(() => {
    if (!isOpen) return;

    const activeElementBeforeOpen = document.activeElement as HTMLElement;

    // Focus the first interactive element or the close button
    setTimeout(() => {
      if (modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex="0"]'
        );
        if (focusable.length > 0) {
          focusable[0].focus();
        }
      }
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusable = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex="0"]'
          )
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (activeElementBeforeOpen) {
        activeElementBeforeOpen.focus();
      }
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="size-guide-title"
            aria-describedby="size-guide-desc"
            className="relative w-full max-w-xl bg-[#FCFBF7] border border-luxury-border shadow-2xl p-6 md:p-8 overflow-y-auto max-h-[90vh] rounded-none focus:outline-none"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-primary-muted hover:text-primary transition-colors cursor-pointer"
              aria-label="Close size guide"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-mega text-accent font-bold font-sans block mb-1">
                {isMen ? "Men's Collection" : "Women's Collection"}
              </span>
              <h2
                id="size-guide-title"
                className="text-2xl font-serif uppercase tracking-widest text-primary"
              >
                Size Guide
              </h2>
              <p id="size-guide-desc" className="sr-only">
                Standard clothing sizing measurements table for XS, S, M, L, XL including bust or chest, waist, and hips.
              </p>
            </div>

            {/* Unit Toggle Selector */}
            <div className="flex justify-end mb-4">
              <div className="inline-flex rounded-sm p-0.5 bg-luxury-cream border border-luxury-border">
                <button
                  onClick={() => setUnit('in')}
                  className={`px-3.5 py-1 text-[10px] uppercase tracking-wider font-sans font-bold transition-all duration-200 cursor-pointer ${
                    unit === 'in'
                      ? 'bg-white text-primary shadow-sm border border-luxury-border/30'
                      : 'text-primary/50 hover:text-primary'
                  }`}
                >
                  Inches
                </button>
                <button
                  onClick={() => setUnit('cm')}
                  className={`px-3.5 py-1 text-[10px] uppercase tracking-wider font-sans font-bold transition-all duration-200 cursor-pointer ${
                    unit === 'cm'
                      ? 'bg-white text-primary shadow-sm border border-luxury-border/30'
                      : 'text-primary/50 hover:text-primary'
                  }`}
                >
                  Centimeters
                </button>
              </div>
            </div>

            {/* Sizing Table */}
            <div className="overflow-x-auto border border-luxury-border bg-white mb-6">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-luxury-cream border-b border-luxury-border">
                    <th className="py-3 px-4 text-[10px] uppercase tracking-widest font-sans font-bold text-primary">
                      Size
                    </th>
                    <th className="py-3 px-4 text-[10px] uppercase tracking-widest font-sans font-bold text-primary">
                      {isMen ? 'Chest' : 'Bust'}
                    </th>
                    <th className="py-3 px-4 text-[10px] uppercase tracking-widest font-sans font-bold text-primary">
                      Waist
                    </th>
                    <th className="py-3 px-4 text-[10px] uppercase tracking-widest font-sans font-bold text-primary">
                      Hip
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-luxury-border">
                  {sizeData.map((row) => (
                    <tr
                      key={row.size}
                      className="hover:bg-luxury-cream/40 transition-colors"
                    >
                      <td className="py-3 px-4 text-xs font-sans font-bold text-primary">
                        {row.size}
                      </td>
                      <td className="py-3 px-4 text-xs font-sans font-light text-primary/80">
                        {row.bustChest}
                      </td>
                      <td className="py-3 px-4 text-xs font-sans font-light text-primary/80">
                        {row.waist}
                      </td>
                      <td className="py-3 px-4 text-xs font-sans font-light text-primary/80">
                        {row.hip}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* How to Measure Details */}
            <div className="border-t border-luxury-border pt-5">
              <h3 className="text-xs uppercase font-sans font-bold tracking-widest text-primary mb-3">
                How To Measure
              </h3>
              <ul className="space-y-3.5 text-[11px] text-primary/70 font-sans leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                  <div>
                    <strong className="text-primary font-medium uppercase tracking-wider text-[10px] block mb-0.5">
                      {isMen ? 'Chest' : 'Bust'}
                    </strong>
                    Measure around the fullest part of your chest or bust, keeping the measuring tape horizontal.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                  <div>
                    <strong className="text-primary font-medium uppercase tracking-wider text-[10px] block mb-0.5">
                      Waist
                    </strong>
                    Measure around the narrowest part of your waistline (typically where your body bends side to side), keeping the tape horizontal.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                  <div>
                    <strong className="text-primary font-medium uppercase tracking-wider text-[10px] block mb-0.5">
                      Hips
                    </strong>
                    Measure around the fullest part of your hips, keeping the measuring tape horizontal.
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
