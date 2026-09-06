import { motion, AnimatePresence } from 'motion/react';
import { X, Ruler, HelpCircle } from 'lucide-react';
import { useStore } from './StoreContext';
import { StoreCopy } from './StoreComponents';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  const { locale } = useStore();
  const isAr = locale === 'ar';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-amber-500/30 bg-[#0c0e12] text-neutral-200 shadow-2xl p-6 sm:p-8"
            style={{ direction: isAr ? 'rtl' : 'ltr' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <Ruler size={20} />
                </div>
                <div>
                  <h3 id="size-guide-modal-title" className="text-lg font-bold text-neutral-100 font-tajawal">
                    <StoreCopy value={{ en: 'Athlete Sizing Chart', ar: 'جدول المقاسات الرياضي المعتمد' }} inline />
                  </h3>
                  <p className="text-xs text-neutral-500 font-tajawal">
                    <StoreCopy value={{ en: 'Olympic & Federation standards', ar: 'المعايير الرياضية والأولمبية الدولية' }} inline />
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close size guide | إغلاق دليل المقاسات"
              >
                <X size={18} />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs text-neutral-400 leading-relaxed font-tajawal mb-5">
              <StoreCopy
                value={{
                  en: 'Measurements are calibrated according to International Olympic & Federation specifications to guarantee maximum speed, mobility, and professional aerodynamic performance.',
                  ar: 'المقاسات موحدة ومعتمدة بدقة وفقاً للمواصفات الدولية للاتحادات والألعاب الأولمبية لضمان السرعة الفائقة، خفة الحركة، والأداء الانسيابي المحترف.',
                }}
                inline
              />
            </p>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/30 mb-6">
              <table className="w-full text-center border-collapse text-xs">
                <thead>
                  <tr className="bg-neutral-900 text-amber-400 font-tajawal border-b border-amber-500/20 font-bold">
                    <th className="px-4 py-3 text-start"><StoreCopy value={{ en: 'Size / Brand', ar: 'المقاس / الفئة' }} inline /></th>
                    <th className="px-4 py-3"><StoreCopy value={{ en: 'Chest', ar: 'الصدر' }} inline /></th>
                    <th className="px-4 py-3"><StoreCopy value={{ en: 'Waist', ar: 'الخصر' }} inline /></th>
                    <th className="px-4 py-3"><StoreCopy value={{ en: 'Height', ar: 'الطول' }} inline /></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/80 font-sans text-neutral-300">
                  <tr className="hover:bg-neutral-800/20 transition-colors">
                    <td className="px-4 py-3 text-start font-bold text-amber-400">S</td>
                    <td className="px-4 py-3">88 - 94 cm</td>
                    <td className="px-4 py-3">76 - 81 cm</td>
                    <td className="px-4 py-3">168 - 175 cm</td>
                  </tr>
                  <tr className="hover:bg-neutral-800/20 transition-colors">
                    <td className="px-4 py-3 text-start font-bold text-amber-400">M</td>
                    <td className="px-4 py-3">95 - 102 cm</td>
                    <td className="px-4 py-3">82 - 88 cm</td>
                    <td className="px-4 py-3">175 - 182 cm</td>
                  </tr>
                  <tr className="hover:bg-neutral-800/20 transition-colors">
                    <td className="px-4 py-3 text-start font-bold text-amber-400">L</td>
                    <td className="px-4 py-3">103 - 110 cm</td>
                    <td className="px-4 py-3">89 - 96 cm</td>
                    <td className="px-4 py-3">180 - 188 cm</td>
                  </tr>
                  <tr className="hover:bg-neutral-800/20 transition-colors">
                    <td className="px-4 py-3 text-start font-bold text-amber-400">XL</td>
                    <td className="px-4 py-3">111 - 118 cm</td>
                    <td className="px-4 py-3">97 - 104 cm</td>
                    <td className="px-4 py-3">185 - 194 cm</td>
                  </tr>
                  <tr className="hover:bg-neutral-800/20 transition-colors">
                    <td className="px-4 py-3 text-start font-bold text-amber-400">XXL</td>
                    <td className="px-4 py-3">119 - 128 cm</td>
                    <td className="px-4 py-3">105 - 114 cm</td>
                    <td className="px-4 py-3">190 - 200 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Note Panel */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/10 text-amber-400/90 mb-6">
              <HelpCircle size={16} className="shrink-0 mt-0.5 text-amber-400" />
              <p className="text-[11px] leading-relaxed font-tajawal">
                <StoreCopy
                  value={{
                    en: 'Are you between sizes? For athletic tight compression, choose your typical size. For relaxed comfort, order one size up.',
                    ar: 'هل مقاسك بين مقاسين؟ للضغط الرياضي المحكم والمثالي للتمارين، اختر مقاسك المعتاد. للحصول على ملاءمة مريحة وفضفاضة، اختر مقاساً أكبر بدفعة واحدة.',
                  }}
                  inline
                />
              </p>
            </div>

            {/* Action Buttons */}
            <button
              type="button"
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold font-tajawal text-sm transition-all shadow-lg hover:shadow-amber-500/10 cursor-pointer flex items-center justify-center gap-2"
              onClick={onClose}
            >
              <StoreCopy value={{ en: 'Understood · Back to Product', ar: 'مفهوم · العودة للمنتج' }} inline />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
