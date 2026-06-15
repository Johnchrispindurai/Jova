import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useToastStore } from '../../store/useToastStore';
import type { Toast } from '../../store/useToastStore';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 w-full max-w-sm px-4 md:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
};

interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

const ToastItem = ({ toast, onClose }: ToastItemProps) => {
  const iconMap = {
    success: <CheckCircle className="w-4 h-4 text-emerald-500" />,
    error: <AlertCircle className="w-4 h-4 text-rose-500" />,
    info: <Info className="w-4 h-4 text-accent" />,
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className="bg-white text-primary border border-luxury-border shadow-xl p-4 flex items-center justify-between gap-3 relative"
      style={{ borderLeft: `3px solid ${toast.type === 'success' ? '#10B981' : toast.type === 'error' ? '#F43F5E' : '#C5A880'}` }}
    >
      <div className="flex items-center gap-3">
        {iconMap[toast.type]}
        <p className="text-xs tracking-wider uppercase font-sans font-medium text-primary">
          {toast.message}
        </p>
      </div>
      <button
        onClick={onClose}
        className="text-primary-muted hover:text-primary transition-colors cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
};
