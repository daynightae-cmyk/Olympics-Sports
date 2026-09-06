import { useState, FormEvent } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Phone, Mail, MapPin, Sparkles, MessageCircle, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useUiSettings } from '../../ui/theme/useUiSettings';
import { formatUaePhoneNumber } from '../../utils/phoneMask';
import { contactSchema } from '../../utils/validation';

const DEVELOPER_WHATSAPP =
  "https://wa.me/971503281920?text=Hello%20Eng.%20Sadek%20Elgazar%2C%20I%20would%20like%20to%20start%20a%20new%20project%20with%20KNOuX.%20%7C%20%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%85.%20%D8%B5%D8%A7%D8%AF%D9%82%20%D8%A7%D9%84%D8%AC%D8%B2%D8%A7%D8%B1%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A8%D8%AF%D8%A1%20%D9%81%D9%8A%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20%D8%AC%D8%AF%D9%8A%D8%AF%20%D9%85%D8%B9%20KNOuX.";

export function ContactPage() {
  const { bilingualOrder } = useUiSettings();
  const isAr = bilingualOrder === 'ar-first';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    sport: 'football',
    message: '',
  });

  const [phoneWarning, setPhoneWarning] = useState<{ en: string; ar: string } | undefined>(undefined);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePhoneChange = (val: string) => {
    const res = formatUaePhoneNumber(val);
    setFormData({ ...formData, phone: res.formatted });
    if (res.warning) {
      setPhoneWarning(res.warning);
    } else {
      setPhoneWarning(undefined);
    }
    // Clear individual field error when user starts correcting
    if (errors.phone) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.phone;
        return copy;
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const collected: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as string;
        // Use translation mapped message if exists
        const messageVal = err.message as any;
        const msg = (messageVal && typeof messageVal === 'object')
          ? (messageVal[isAr ? 'ar' : 'en'] || messageVal.en)
          : err.message;
        collected[field] = msg;
      });
      setErrors(collected);
      setFormSubmitted(false);
    } else {
      setErrors({});
      setFormSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        sport: 'football',
        message: '',
      });
      setPhoneWarning(undefined);
    }
  };

  return (
    <div className="uos-public-page bg-[#07080b] text-neutral-100 overflow-hidden">
      
      {/* 1. HERO BANNER */}
      <section className="relative py-20 lg:py-28 border-b border-neutral-800 bg-radial-vignette">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-amber-500/30 backdrop-blur-md mb-2 shadow-xl">
            <Sparkles size={14} className="text-amber-400" />
            <span className="text-xs sm:text-sm font-bold tracking-wide text-amber-300 font-tajawal">
              {isAr ? 'تواصل معنا' : 'Get in Touch'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-tajawal leading-tight">
            {isAr ? 'نسعد بالإجابة عن استفساراتك' : 'We Are Here to Assist Your Athletic Journey'}
          </h1>

          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto font-tajawal leading-relaxed">
            {isAr
              ? 'تواصل مع فريق United Olympics Sports للاستفسار عن مواعيد التدريب، برامج التسجيل، أو جلسات التقييم المبدئي.'
              : 'Connect with United Olympics Sports for schedule inquiries, enrollment details, or initial assessments.'}
          </p>
        </div>
      </section>

      {/* 2. CONTACT GRID */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="uos-pill uos-pill-gold font-tajawal">
                {isAr ? 'قنوات التواصل' : 'Direct Channels'}
              </span>
              <h2 className="text-2xl font-bold text-white font-tajawal">
                {isAr ? 'معلومات الدعم والتنسيق' : 'Support & Coordination'}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 font-tajawal">
                {isAr
                  ? 'فريق خدمة العملاء والإشراف الفني جاهز لمساعدتكم في كل ما يخص المسارات الرياضية.'
                  : 'Our coordination team is ready to help you navigate sports pathways and schedule sessions.'}
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#0d0f14] border border-neutral-800 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm font-tajawal">{isAr ? 'الاعتماد والأمان' : 'Verified Sports Club'}</h4>
                  <p className="text-xs text-neutral-400 font-tajawal mt-1">United Olympics Sports — يونايتد أوليمبيكس سبورت</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0d0f14] border border-neutral-800 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
                  <Clock size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm font-tajawal">{isAr ? 'أوقات التنسيق والمتابعة' : 'Coordination Hours'}</h4>
                  <p className="text-xs text-neutral-400 font-tajawal mt-1">
                    {isAr ? 'السبت - الخميس: 9:00 صباحاً – 9:00 مساءً' : 'Saturday – Thursday: 9:00 AM – 9:00 PM'}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0d0f14] border border-neutral-800 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
                  <MessageCircle size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm font-tajawal">{isAr ? 'الاستجابة السريعة' : 'Fast Response'}</h4>
                  <p className="text-xs text-neutral-400 font-tajawal mt-1">
                    {isAr ? 'يتم الرد على جميع الاستفسارات والطلبات خلال 24 ساعة عمل.' : 'All inquiries are addressed within 24 working hours.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Developer Credit Signature Box */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-amber-500/30 space-y-3">
              <span className="text-xs text-amber-400 font-bold font-tajawal uppercase tracking-wider block">
                {isAr ? 'تطوير المنظومة البرمجية' : 'Platform Engineering & Design'}
              </span>
              <p className="text-xs text-neutral-300 font-tajawal leading-relaxed">
                {isAr
                  ? 'تم تصميم وتطوير منصة United Olympics Sports بواسطة المهندس صادق الجزار (KNOuX).'
                  : 'Designed and engineered by KNOuX — Eng. Sadek Elgazar.'}
              </p>
              <a
                href={DEVELOPER_WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors font-tajawal"
              >
                <span>{isAr ? 'تواصل مع المطور عبر واتساب' : 'Contact Developer on WhatsApp'}</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-2xl bg-[#0d0f14] border border-amber-500/20 space-y-5 shadow-2xl">
              <h3 className="text-xl font-bold text-white font-tajawal">
                {isAr ? 'نموذج الاستفسار وحجز التقييم' : 'Inquiry & Assessment Form'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 font-tajawal mb-1.5" htmlFor="contact-name">{isAr ? 'الاسم الكامل' : 'Full Name'}</label>
                  <input
                    id="contact-name"
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) {
                        setErrors((prev) => { const copy = { ...prev }; delete copy.name; return copy; });
                      }
                    }}
                    placeholder={isAr ? 'الاسم بالكامل' : 'Your name'}
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className={`w-full px-4 py-2.5 rounded-xl bg-neutral-900 border ${errors.name ? 'border-red-500' : 'border-neutral-700'} text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 text-sm font-tajawal`}
                  />
                  {errors.name && (
                    <span id="contact-name-error" className="block text-[11px] text-red-400 font-tajawal mt-1" role="alert">
                      {errors.name}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 font-tajawal mb-1.5" htmlFor="contact-phone">{isAr ? 'رقم الهاتف / واتساب' : 'Phone / WhatsApp'}</label>
                  <input
                    id="contact-phone"
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="+971 50 123 4567"
                    aria-invalid={errors.phone ? "true" : "false"}
                    aria-describedby={errors.phone ? "contact-phone-error" : phoneWarning ? "contact-phone-warning" : undefined}
                    className={`w-full px-4 py-2.5 rounded-xl bg-neutral-900 border ${errors.phone ? 'border-red-500' : 'border-neutral-700'} text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 text-sm font-sans`}
                  />
                  {errors.phone && (
                    <span id="contact-phone-error" className="block text-[11px] text-red-400 font-tajawal mt-1" role="alert">
                      {errors.phone}
                    </span>
                  )}
                  {phoneWarning && !errors.phone && (
                    <span id="contact-phone-warning" className="block text-[11px] text-amber-400 font-tajawal mt-1">
                      {isAr ? phoneWarning.ar : phoneWarning.en}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 font-tajawal mb-1.5" htmlFor="contact-email">{isAr ? 'البريد الإلكتروني' : 'Email Address'}</label>
                  <input
                    id="contact-email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) {
                        setErrors((prev) => { const copy = { ...prev }; delete copy.email; return copy; });
                      }
                    }}
                    placeholder="name@example.com"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className={`w-full px-4 py-2.5 rounded-xl bg-neutral-900 border ${errors.email ? 'border-red-500' : 'border-neutral-700'} text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 text-sm font-sans`}
                  />
                  {errors.email && (
                    <span id="contact-email-error" className="block text-[11px] text-red-400 font-tajawal mt-1" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 font-tajawal mb-1.5" htmlFor="contact-sport">{isAr ? 'الرياضة المرغوبة' : 'Sport of Interest'}</label>
                  <select
                    id="contact-sport"
                    value={formData.sport}
                    onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-amber-400 text-sm font-tajawal"
                  >
                    <option value="football">{isAr ? 'كرة القدم' : 'Football'}</option>
                    <option value="swimming">{isAr ? 'السباحة' : 'Swimming'}</option>
                    <option value="basketball">{isAr ? 'كرة السلة' : 'Basketball'}</option>
                    <option value="tennis">{isAr ? 'التنس' : 'Tennis'}</option>
                    <option value="gymnastics">{isAr ? 'الجمباز' : 'Gymnastics'}</option>
                    <option value="martial-arts">{isAr ? 'الفنون القتالية' : 'Martial Arts'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 font-tajawal mb-1.5" htmlFor="contact-message">{isAr ? 'تفاصيل الاستفسار أو العمر والخبرة' : 'Message or Athlete Details'}</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) {
                      setErrors((prev) => { const copy = { ...prev }; delete copy.message; return copy; });
                    }
                  }}
                  placeholder={isAr ? 'اكتب استفسارك هنا، مع ذكر عمر الرياضي وأي تفاصيل تهمك...' : 'Enter your message or questions here...'}
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className={`w-full px-4 py-2.5 rounded-xl bg-neutral-900 border ${errors.message ? 'border-red-500' : 'border-neutral-700'} text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 text-sm font-tajawal`}
                />
                {errors.message && (
                  <span id="contact-message-error" className="block text-[11px] text-red-400 font-tajawal mt-1" role="alert">
                    {errors.message}
                  </span>
                )}
              </div>

              <button type="submit" className="uos-btn-gold w-full !py-3.5 !text-sm">
                <span>{isAr ? 'إرسال الاستفسار' : 'Submit Inquiry'}</span>
                <ArrowIcon size={16} />
              </button>

              {formSubmitted && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 text-amber-300 text-xs font-tajawal animate-fade-in">
                  <CheckCircle2 size={18} className="shrink-0" />
                  <span>{isAr ? 'شكراً لتواصلك معنا! تم استلام رسالتك وسيتم الرد عليك في أقرب وقت.' : 'Thank you! Your message has been received and our team will get in touch shortly.'}</span>
                </div>
              )}
            </form>
          </div>

        </div>
      </section>

    </div>
  );
}
