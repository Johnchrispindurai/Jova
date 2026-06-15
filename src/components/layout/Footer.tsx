import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useToastStore } from '../../store/useToastStore';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const addToast = useToastStore((state) => state.addToast);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      addToast('Thank you for subscribing to JOVA.', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-luxury-dark text-white pt-20 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          {/* Col 1: Newsletter */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs uppercase tracking-mega font-bold text-accent">Newsletter</h4>
            <p className="text-xs text-white/60 leading-relaxed font-sans max-w-xs">
              Subscribe to receive updates on collections, exclusive events, and personal recommendations.
            </p>
            <form onSubmit={handleSubscribe} className="relative w-full max-w-xs">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent border-b border-white/20 py-3 pl-1 pr-10 text-xs tracking-widest text-white focus:border-white focus:outline-none transition-colors duration-300 font-sans"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="absolute right-0 top-3 text-white/50 hover:text-white transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Col 2: Categories */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-mega font-bold text-accent">Collections</h4>
            <ul className="flex flex-col gap-3 text-xs text-white/60 font-sans">
              <li>
                <Link to="/women" className="hover:text-white transition-colors">Women's Apparel</Link>
              </li>
              <li>
                <Link to="/men" className="hover:text-white transition-colors">Men's Tailoring</Link>
              </li>
              <li>
                <Link to="/women" className="hover:text-white transition-colors">New Arrivals</Link>
              </li>
              <li>
                <Link to="/women" className="hover:text-white transition-colors">Capsule Wardrobe</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Support */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-mega font-bold text-accent">Services</h4>
            <ul className="flex flex-col gap-3 text-xs text-white/60 font-sans">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Shipping & Returns</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Payment Information</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Size Guide</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Contact Support</span>
              </li>
            </ul>
          </div>

          {/* Col 4: About JOVA */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs uppercase tracking-mega font-bold text-accent">The Brand</h4>
            <p className="text-xs text-white/60 leading-relaxed font-sans">
              JOVA is a minimalist luxury atelier focused on clean tailoring, premium materials, and sustainable production. Inspired by quiet luxury aesthetics.
            </p>
            <div className="flex items-center gap-4 text-white/50">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram link" className="hover:text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook link" className="hover:text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter link" className="hover:text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 text-[10px] tracking-widest text-white/40 uppercase font-sans">
          <p>© 2026 JOVA ATELIER. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-white/60 transition-colors">Privacy Policy</span>
            <span className="cursor-pointer hover:text-white/60 transition-colors">Terms of Service</span>
            <span className="cursor-pointer hover:text-white/60 transition-colors">Cookie settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
