import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown, UserCheck, ShieldCheck, Dumbbell, ShoppingBag, Lock, Sparkles } from 'lucide-react';
import { AppLogo } from '../brand/AppLogo';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useUiSettings } from '../../ui/theme/useUiSettings';

export function PublicHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalsDropdownOpen, setPortalsDropdownOpen] = useState(false);
  const { bilingualOrder, setSetting } = useUiSettings();
  const location = useLocation();

  const isAr = bilingualOrder === 'ar-first';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setPortalsDropdownOpen(false);
  }, [location.pathname]);

  const toggleLanguage = () => {
    setSetting('bilingualOrder', isAr ? 'en-first' : 'ar-first');
  };

  const navLinks = [
    { to: '/', labelAr: 'الرئيسية', labelEn: 'Home' },
    { to: '/about', labelAr: 'من نحن', labelEn: 'About' },
    { to: '/sports', labelAr: 'الرياضات', labelEn: 'Sports' },
    { to: '/programs', labelAr: 'البرامج', labelEn: 'Programs' },
    { to: '/coaches', labelAr: 'فلسفة التدريب', labelEn: 'Coaching' },
    { to: '/store', labelAr: 'المتجر', labelEn: 'Store' },
    { to: '/contact', labelAr: 'تواصل معنا', labelEn: 'Contact' },
  ];

  const portalLinks = [
    { to: '/player/login', labelAr: 'بوابة اللاعب', labelEn: 'Player Portal', icon: <UserCheck size={16} /> },
    { to: '/parent/login', labelAr: 'بوابة ولي الأمر', labelEn: 'Parent Portal', icon: <ShieldCheck size={16} /> },
    { to: '/coach/login', labelAr: 'بوابة المدرب', labelEn: 'Coach Portal', icon: <Dumbbell size={16} /> },
    { to: '/store/login', labelAr: 'بوابة المتجر', labelEn: 'Store Portal', icon: <ShoppingBag size={16} /> },
    { to: '/admin/login', labelAr: 'بوابة الإدارة', labelEn: 'Admin Portal', icon: <Lock size={16} /> },
  ];

  return (
    <header className={`uos-public-header ${scrolled ? 'scrolled' : 'bg-[#07080b]/80 backdrop-blur-md border-b border-amber-500/10'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3.5 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg p-1">
          <AppLogo compact alt="United Olympics Sports | يونايتد أوليمبيكس سبورت" />
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-wide text-neutral-100 group-hover:text-amber-300 transition-colors">
              United Olympics Sports
            </span>
            <span className="text-[12px] font-tajawal font-bold text-amber-400/90 tracking-wider">
              يونايتد أوليمبيكس سبورت
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex flex-col items-center leading-tight ${
                  isActive
                    ? 'text-amber-400 bg-amber-500/10 font-bold border border-amber-500/20'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <span className={isAr ? 'font-tajawal text-[13px] font-bold' : 'text-xs'}>
                {isAr ? item.labelAr : item.labelEn}
              </span>
              <span className="text-[10px] text-neutral-400 opacity-80">
                {isAr ? item.labelEn : item.labelAr}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Actions (Language, Theme, Portals) */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language Toggle */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/60 transition-all cursor-pointer"
            aria-label="تغيير اللغة | Switch Language"
          >
            <Globe size={14} className="text-amber-400" />
            <span>{isAr ? 'English' : 'العربية'}</span>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle compact />

          {/* Portals Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setPortalsDropdownOpen(!portalsDropdownOpen)}
              className="uos-btn-outline !py-2 !px-4 !text-xs !min-h-[38px] flex items-center gap-1.5"
              aria-expanded={portalsDropdownOpen}
              aria-haspopup="true"
            >
              <Sparkles size={14} className="text-amber-400" />
              <span>{isAr ? 'البوابات' : 'Portals'}</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${portalsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {portalsDropdownOpen && (
              <div
                className="absolute end-0 mt-2 w-56 rounded-xl bg-neutral-950/95 backdrop-blur-xl border border-amber-500/30 shadow-2xl p-1.5 z-50 animate-fade-in"
                onMouseLeave={() => setPortalsDropdownOpen(false)}
              >
                <div className="px-3 py-2 border-b border-neutral-800/80 mb-1">
                  <span className="text-[11px] font-bold text-amber-400/90 font-tajawal">
                    {isAr ? 'بوابات الوصول المباشر' : 'Direct Portal Access'}
                  </span>
                </div>
                {portalLinks.map((portal) => (
                  <Link
                    key={portal.to}
                    to={portal.to}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-neutral-300 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
                  >
                    <span className="text-amber-400">{portal.icon}</span>
                    <div className="flex flex-col">
                      <span className="font-tajawal font-bold">{isAr ? portal.labelAr : portal.labelEn}</span>
                      <span className="text-[10px] text-neutral-400">{isAr ? portal.labelEn : portal.labelAr}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger & Quick Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleLanguage}
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-bold"
            aria-label="تغيير اللغة | Switch Language"
          >
            {isAr ? 'EN' : 'عربي'}
          </button>
          
          <ThemeToggle compact />

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg bg-neutral-900 border border-amber-500/30 text-amber-400 hover:text-white transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="فتح القائمة | Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-neutral-950/98 backdrop-blur-2xl border-t border-amber-500/20 overflow-y-auto z-40 p-6 flex flex-col justify-between animate-fade-in">
          <div className="space-y-2">
            <div className="text-xs font-bold text-amber-400/80 uppercase tracking-widest px-3 mb-2 font-tajawal">
              {isAr ? 'صفحات الموقع' : 'Navigation'}
            </div>
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-300 font-bold border border-amber-500/30'
                      : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                  }`
                }
              >
                <span className="font-tajawal font-bold text-base">{isAr ? item.labelAr : item.labelEn}</span>
                <span className="text-xs text-neutral-400">{isAr ? item.labelEn : item.labelAr}</span>
              </NavLink>
            ))}

            <div className="pt-6 border-t border-neutral-800/80">
              <div className="text-xs font-bold text-amber-400/80 uppercase tracking-widest px-3 mb-3 font-tajawal">
                {isAr ? 'دخول البوابات' : 'Portal Logins'}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {portalLinks.map((portal) => (
                  <Link
                    key={portal.to}
                    to={portal.to}
                    className="flex items-center gap-2 p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs font-medium text-neutral-200 hover:border-amber-500/40 hover:text-amber-300 transition-all"
                  >
                    <span className="text-amber-400">{portal.icon}</span>
                    <span className="font-tajawal font-bold truncate">{isAr ? portal.labelAr : portal.labelEn}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-800 text-center text-xs text-neutral-400">
            United Olympics Sports &copy; {new Date().getFullYear()}
          </div>
        </div>
      )}
    </header>
  );
}
