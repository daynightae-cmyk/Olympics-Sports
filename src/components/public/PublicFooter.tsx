import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppLogo } from '../brand/AppLogo';
import { useUiSettings } from '../../ui/theme/useUiSettings';
import { ArrowUpRight, ShieldCheck, Heart, Send, CheckCircle2 } from 'lucide-react';
import { newsletterSchema } from '../../utils/validation';

const DEVELOPER_WHATSAPP =
  "https://wa.me/971503281920?text=Hello%20Eng.%20Sadek%20Elgazar%2C%20I%20would%20like%20to%20start%20a%20new%20project%20with%20KNOuX.%20%7C%20%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%85.%20%D8%B5%D8%A7%D8%AF%D9%82%20%D8%A7%D9%84%D8%AC%D8%B2%D8%A7%D8%B1%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A8%D8%AF%D8%A1%20%D9%81%D9%8A%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20%D8%AC%D8%AF%D9%8A%D8%AF%20%D9%85%D8%B9%20KNOuX.";

export function PublicFooter() {
  const { bilingualOrder } = useUiSettings();
  const isAr = bilingualOrder === 'ar-first';

  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    const result = newsletterSchema.safeParse({ email });
    if (!result.success) {
      const msgVal = result.error.issues[0].message as any;
      const msg = (msgVal && typeof msgVal === 'object')
        ? (msgVal[isAr ? 'ar' : 'en'] || msgVal.en)
        : result.error.issues[0].message;
      setError(msg);
      setSuccess(false);
    } else {
      setError(undefined);
      setSuccess(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#07080b] border-t border-amber-500/20 text-neutral-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-neutral-800/80">
          
          {/* Col 1 & 2: Brand Lockup & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3.5 group cursor-pointer inline-flex">
              <AppLogo compact alt="United Olympics Sports | يونايتد أوليمبيكس سبورت" />
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-wide text-neutral-100 group-hover:text-amber-300 transition-colors">
                  United Olympics Sports
                </span>
                <span className="text-xs font-tajawal font-bold text-amber-400/90 tracking-wider">
                  يونايتد أوليمبيكس سبورت
                </span>
              </div>
            </Link>
            
            <p className="text-sm text-neutral-400 font-tajawal leading-relaxed max-w-sm">
              {isAr
                ? 'بيئة رياضية متكاملة تهدف إلى بناء الرياضيين الصغار من خلال التدريب المنهجي والانضباط وغرس الشغف والعمل الجماعي.'
                : 'A purposeful sports development environment designed to nurture young athletes through structured training, discipline, passion, and teamwork.'}
            </p>

            {/* Premium Newsletter Section */}
            <div className="space-y-3 max-w-sm pt-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-amber-300 font-tajawal">
                {isAr ? 'النشرة البريدية الأولمبية' : 'Olympic Newsletter'}
              </h5>
              <p className="text-xs text-neutral-500 font-tajawal">
                {isAr
                  ? 'اشترك لتصلك أحدث مواعيد البطولات والتدريبات والعروض الحصرية.'
                  : 'Subscribe for tournament updates, training sessions, and exclusive store collections.'}
              </p>
              <form onSubmit={handleSubscribe} className="relative flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(undefined);
                  }}
                  placeholder={isAr ? 'البريد الإلكتروني' : 'your.email@example.com'}
                  aria-invalid={error ? "true" : "false"}
                  aria-describedby={error ? "newsletter-error" : undefined}
                  className={`w-full px-4 py-2.5 rounded-xl bg-neutral-900 border ${error ? 'border-red-500' : 'border-neutral-800'} text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 text-xs font-sans`}
                />
                <button
                  type="submit"
                  aria-label={isAr ? 'اشترك' : 'Subscribe'}
                  className="absolute right-1 top-1 bottom-1 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-colors flex items-center justify-center cursor-pointer"
                >
                  <Send size={12} />
                </button>
              </form>
              {error && (
                <span id="newsletter-error" className="block text-[11px] text-red-400 font-tajawal mt-1" role="alert">
                  {error}
                </span>
              )}
              {success && (
                <div className="p-3 rounded-lg bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 text-xs font-tajawal flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 size={14} className="shrink-0" />
                  <span>
                    {isAr ? 'تم الاشتراك بنجاح!' : 'Successfully subscribed!'}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-amber-400/90 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1.5 w-fit">
              <ShieldCheck size={14} />
              <span className="font-tajawal">
                {isAr ? 'بيانات موثقة ومعتمدة' : 'Verified Sports Environment'}
              </span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400 font-tajawal">
              {isAr ? 'الاستكشاف' : 'Explore'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-300 transition-colors font-tajawal">
                  {isAr ? 'الرئيسية' : 'Home'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-300 transition-colors font-tajawal">
                  {isAr ? 'من نحن' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link to="/sports" className="hover:text-amber-300 transition-colors font-tajawal">
                  {isAr ? 'الرياضات المتاحة' : 'Available Sports'}
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-amber-300 transition-colors font-tajawal">
                  {isAr ? 'برامج التدريب' : 'Training Programs'}
                </Link>
              </li>
              <li>
                <Link to="/coaches" className="hover:text-amber-300 transition-colors font-tajawal">
                  {isAr ? 'فلسفة التدريب' : 'Coaching Philosophy'}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-300 transition-colors font-tajawal">
                  {isAr ? 'تواصل معنا' : 'Contact Us'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Sports */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400 font-tajawal">
              {isAr ? 'الرياضات' : 'Sports'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/sports/football" className="hover:text-amber-300 transition-colors font-tajawal">
                  {isAr ? 'كرة القدم' : 'Football'}
                </Link>
              </li>
              <li>
                <Link to="/sports/swimming" className="hover:text-amber-300 transition-colors font-tajawal">
                  {isAr ? 'السباحة' : 'Swimming'}
                </Link>
              </li>
              <li>
                <Link to="/sports/basketball" className="hover:text-amber-300 transition-colors font-tajawal">
                  {isAr ? 'كرة السلة' : 'Basketball'}
                </Link>
              </li>
              <li>
                <Link to="/sports/tennis" className="hover:text-amber-300 transition-colors font-tajawal">
                  {isAr ? 'التنس' : 'Tennis'}
                </Link>
              </li>
              <li>
                <Link to="/sports/gymnastics" className="hover:text-amber-300 transition-colors font-tajawal">
                  {isAr ? 'الجمباز' : 'Gymnastics'}
                </Link>
              </li>
              <li>
                <Link to="/sports/martial-arts" className="hover:text-amber-300 transition-colors font-tajawal">
                  {isAr ? 'الفنون القتالية' : 'Martial Arts'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400 font-tajawal">
              {isAr ? 'دخول البوابات' : 'Portals'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/player/login" className="hover:text-amber-300 transition-colors font-tajawal">
                  {isAr ? 'بوابة اللاعب' : 'Player Portal'}
                </Link>
              </li>
              <li>
                <Link to="/parent/login" className="hover:text-amber-300 transition-colors font-tajawal">
                  {isAr ? 'بوابة ولي الأمر' : 'Parent Portal'}
                </Link>
              </li>
              <li>
                <Link to="/coach/login" className="hover:text-amber-300 transition-colors font-tajawal">
                  {isAr ? 'بوابة المدرب' : 'Coach Portal'}
                </Link>
              </li>
              <li>
                <Link to="/store" className="hover:text-amber-300 transition-colors font-tajawal">
                  {isAr ? 'المتجر الإلكتروني' : 'Public Store'}
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-amber-300 transition-colors font-tajawal">
                  {isAr ? 'بوابة الإدارة' : 'Admin Portal'}
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & KNOuX Signature */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p className="font-tajawal">
            &copy; {new Date().getFullYear()} United Olympics Sports — يونايتد أوليمبيكس سبورت. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>

          {/* Developer Credit Link */}
          <a
            href={DEVELOPER_WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-amber-500/20 hover:border-amber-400/50 text-neutral-300 hover:text-amber-300 transition-all group"
            aria-label="Made by KNOuX — Eng. Sadek Elgazar"
          >
            <span className="font-medium">{isAr ? 'صنع بواسطة' : 'Crafted by'} <strong className="text-white">KNOuX</strong> — {isAr ? 'م. صادق الجزار' : 'Eng. Sadek Elgazar'}</span>
            <ArrowUpRight size={14} className="text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </footer>
  );
}
