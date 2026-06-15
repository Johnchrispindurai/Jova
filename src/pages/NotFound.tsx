import { Link } from 'react-router-dom';
import { ArrowRight, FileQuestion } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 pt-28 pb-20 page-transition-container">
      <div className="mb-6 p-6 bg-luxury-cream flex items-center justify-center rounded-full">
        <FileQuestion className="w-12 h-12 stroke-[1] text-accent" />
      </div>
      <span className="text-[10px] uppercase tracking-mega text-accent font-bold mb-2">ERROR 404</span>
      <h1 className="text-4xl uppercase font-serif tracking-widest text-primary mb-3">Page Not Found</h1>
      <p className="text-sm text-primary-muted font-sans max-w-sm mb-8 leading-relaxed">
        The luxury pieces or page you are looking for does not exist, or has been relocated to another collection.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="bg-primary text-white border border-primary hover:bg-transparent hover:text-primary py-3.5 px-8 text-xs uppercase tracking-widest font-sans font-bold transition-all duration-300"
        >
          Return to Home
        </Link>
        <Link
          to="/women"
          className="border border-luxury-border bg-white text-primary hover:border-primary py-3.5 px-8 text-xs uppercase tracking-widest font-sans font-bold transition-all duration-300 flex items-center justify-center gap-2"
        >
          Shop Latest New In <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
export default NotFound;
