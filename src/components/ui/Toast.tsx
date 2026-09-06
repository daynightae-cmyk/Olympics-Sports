import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X, Sparkles } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
  id?: string;
  isOpen: boolean;
  type?: ToastType;
  title?: { en: string; ar: string } | string;
  message: { en: string; ar: string } | string;
  duration?: number;
  onClose: () => void;
  isAr?: boolean;
}

export function Toast({
  isOpen,
  type = 'success',
  title,
  message,
  duration = 4500,
  onClose,
  isAr = false,
}: ToastProps) {
  useEffect(() => {
    if (!isOpen || duration <= 0) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  const resolvedTitle: string | undefined = typeof title === 'object' && title !== null
    ? (isAr ? title.ar : title.en)
    : (title as string | undefined);

  const resolvedMessage: string = typeof message === 'object' && message !== null
    ? (isAr ? message.ar : message.en)
    : (message as string);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className={`fixed z-[9999] top-5 ${
            isAr ? 'left-5 sm:left-8' : 'right-5 sm:right-8'
          } max-w-sm sm:max-w-md w-[calc(100vw-2.5rem)] pointer-events-auto`}
          style={{ direction: isAr ? 'rtl' : 'ltr' }}
          role="status"
          aria-live="polite"
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`relative overflow-hidden rounded-2xl border p-4 sm:p-5 shadow-2xl backdrop-blur-xl ${
              type === 'success'
                ? 'bg-[#0b1017]/95 border-amber-500/40 text-neutral-100 shadow-amber-500/10'
                : type === 'error'
                ? 'bg-[#180d0d]/95 border-red-500/40 text-neutral-100 shadow-red-500/10'
                : 'bg-[#0d1117]/95 border-blue-500/40 text-neutral-100 shadow-blue-500/10'
            }`}
          >
            {/* Ambient subtle glow */}
            <div
              className={`absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl pointer-events-none opacity-30 ${
                type === 'success' ? 'bg-amber-400' : type === 'error' ? 'bg-red-400' : 'bg-blue-400'
              }`}
            />

            <div className="flex items-start gap-3.5 relative z-10">
              <div
                className={`p-2 rounded-xl shrink-0 ${
                  type === 'success'
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : type === 'error'
                    ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                    : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                }`}
              >
                {type === 'success' && <CheckCircle2 size={20} className="stroke-[2.5]" />}
                {type === 'error' && <AlertCircle size={20} className="stroke-[2.5]" />}
                {type === 'info' && <Info size={20} className="stroke-[2.5]" />}
              </div>

              <div className="flex-1 pr-1 space-y-0.5">
                {resolvedTitle && (
                  <h4 className="text-sm font-bold text-white font-tajawal flex items-center gap-1.5">
                    {resolvedTitle}
                    {type === 'success' && <Sparkles size={13} className="text-amber-400" />}
                  </h4>
                )}
                <p className="text-xs sm:text-sm text-neutral-300 font-tajawal leading-relaxed">
                  {resolvedMessage}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                aria-label={isAr ? 'إغلاق الإشعار' : 'Close notification'}
              >
                <X size={16} />
              </button>
            </div>

            {/* Timed progress indicator */}
            {duration > 0 && (
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: duration / 1000, ease: 'linear' }}
                className={`absolute bottom-0 left-0 right-0 h-[3px] ${
                  type === 'success'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-300'
                    : type === 'error'
                    ? 'bg-gradient-to-r from-red-500 to-red-300'
                    : 'bg-gradient-to-r from-blue-500 to-blue-300'
                }`}
              />
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
