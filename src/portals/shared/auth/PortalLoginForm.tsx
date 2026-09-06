import React, { useState } from 'react';
import { AlertCircle, Phone } from 'lucide-react';
import { BilingualText, bi } from '../../../components/bilingual/BilingualText';
import { googleSignIn } from '../../../auth';
import { useUiSettings } from '../../../ui/theme/useUiSettings';

type PortalLoginFormProps = {
  onSuccess: (userId: string, data?: any) => void;
  showPreviewSelect?: boolean;
  previewOptions?: { id: string; labelEn: string; labelAr: string }[];
  onPreviewSelect?: (id: string) => void;
  phonePath?: string;
};

export function PortalLoginForm({ onSuccess, showPreviewSelect, previewOptions, onPreviewSelect, phonePath }: PortalLoginFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ en: string; ar: string } | null>(null);
  const [selectedPreview, setSelectedPreview] = useState(previewOptions?.[0]?.id || '');
  const { resolvedTheme } = useUiSettings();
  const isDark = resolvedTheme === 'dark';

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await googleSignIn();
      if (result?.user) {
        onSuccess(result.user.uid, result.user);
      }
    } catch (err: any) {
      const code = err?.code || '';
      if (code === 'auth/popup-closed-by-user') {
        setError({
          en: 'Sign-in was cancelled (popup closed). Please try again.',
          ar: 'تم إغلاق نافذة تسجيل الدخول. يمكنك المحاولة مرة أخرى.',
        });
      } else if (code === 'auth/popup-blocked') {
        setError({
          en: 'Sign-in popup was blocked by your browser. Please allow popups for this site.',
          ar: 'تم حظر النافذة المنبثقة بواسطة المتصفح. يُرجى السماح بالنوافذ المنبثقة لإكمال الدخول.',
        });
      } else if (code === 'auth/cancelled-popup-request') {
        setError({
          en: 'Another sign-in request is already in progress.',
          ar: 'يوجد طلب تسجيل دخول آخر قيد المعالجة حالياً.',
        });
      } else if (code === 'auth/network-request-failed') {
        setError({
          en: 'Network connection error. Please check your internet connectivity.',
          ar: 'تعذر الاتصال بالشبكة. يُرجى التحقق من اتصال الإنترنت.',
        });
      } else if (code === 'auth/unauthorized-domain') {
        setError({
          en: 'This domain is not authorized in Firebase Auth settings.',
          ar: 'هذا النطاق غير مصرح به في إعدادات مصادقة Firebase.',
        });
      } else {
        setError({
          en: err.message || 'Authentication failed. Please try again.',
          ar: 'فشلت عملية المصادقة. يرجى المحاولة مرة أخرى.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    if (selectedPreview && onPreviewSelect) {
      onPreviewSelect(selectedPreview);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {error && (
        <div className={`mb-4 p-3 rounded-xl flex items-start gap-2 text-xs ${isDark ? 'bg-red-900/20 border border-red-900/50 text-red-400' : 'bg-red-50 border border-red-200 text-red-600'}`}>
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <div><BilingualText value={error} /></div>
        </div>
      )}

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className={`w-full flex items-center justify-center gap-2 p-3 rounded-xl font-semibold text-[13px] border transition-colors ${
          isDark 
            ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10' 
            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
        } ${loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
        <span><BilingualText value={bi('Continue with Google', 'المتابعة باستخدام Google')} /></span>
      </button>

      {phonePath && (
        <>
          <div className="flex items-center gap-4 my-2">
            <div className={`flex-1 h-px ${isDark ? 'bg-white/10' : 'bg-slate-200'}`} />
            <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              <BilingualText value={bi('Or', 'أو')} />
            </span>
            <div className={`flex-1 h-px ${isDark ? 'bg-white/10' : 'bg-slate-200'}`} />
          </div>

          <a
            href={phonePath}
            className={`w-full flex items-center justify-center gap-2 p-3 rounded-xl font-semibold text-[13px] border transition-colors no-underline ${
              isDark 
                ? 'bg-[#d8b35a]/10 border-[#d8b35a]/30 text-[#f3c969] hover:bg-[#d8b35a]/20' 
                : 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
            }`}
          >
            <Phone size={16} />
            <span><BilingualText value={bi('Sign in with Mobile Number (OTP)', 'الدخول برقم الهاتف')} /></span>
          </a>
        </>
      )}

      {showPreviewSelect && previewOptions && (
        <div className={`mt-8 pt-6 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-bold flex items-center gap-2 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              <BilingualText value={bi('Demo Mode', 'وضع المعاينة')} />
            </span>
            <span className={`text-[9px] uppercase font-bold px-2 py-1 rounded-md border ${isDark ? 'bg-[#d8b35a]/10 border-[#d8b35a]/20 text-[#d8b35a]' : 'bg-amber-50 border-amber-200 text-amber-600'}`}>
              Preview
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <label className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <BilingualText value={bi('Select demo identity:', 'اختر هوية تجريبية:')} />
            </label>
            <select
              value={selectedPreview}
              onChange={(e) => setSelectedPreview(e.target.value)}
              className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                isDark 
                  ? 'bg-white/5 border-white/10 text-slate-200 focus:border-[#d8b35a]' 
                  : 'bg-white border-slate-200 text-slate-800 focus:border-amber-500'
              }`}
            >
              {previewOptions.map((opt) => (
                <option key={opt.id} value={opt.id} className={isDark ? 'bg-slate-900 text-slate-200' : ''}>
                  {opt.labelEn} — {opt.labelAr}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handlePreview}
              disabled={loading}
              className="mt-2 w-full p-3 rounded-xl font-bold text-xs border-0 cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 transition-transform hover:scale-[1.02] active:scale-95 bg-gradient-to-r from-[#d8b35a] to-[#f0c75e] text-slate-900"
            >
              <span><BilingualText value={bi('Enter Preview Mode', 'الدخول إلى وضع المعاينة')} /></span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
