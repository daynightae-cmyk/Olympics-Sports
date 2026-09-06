import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { BilingualText, bi } from '../../../components/bilingual/BilingualText';
import { useUiSettings } from '../../../ui/theme/useUiSettings';
import { AppLogo } from '../../../components/brand/AppLogo';

type PortalType = 'admin' | 'store' | 'player' | 'parent' | 'coach';

type PortalAuthShellProps = {
  portal: PortalType;
  children: ReactNode;
  theme?: 'dark' | 'light';
};

const PORTAL_CONFIG = {
  admin: {
    name: bi('Admin Portal', 'بوابة الإدارة'),
    heroImage: "/media/sports/basketball/basketball-02-coach-team-brand.webp",
  },
  store: {
    name: bi('Store Portal', 'بوابة المتجر'),
    heroImage: "/media/sports/basketball/basketball-03-children-dribbling.webp",
  },
  player: {
    name: bi('Athlete Portal', 'بوابة اللاعب'),
    heroImage: "/media/sports/basketball/basketball-08-match-action.webp",
  },
  parent: {
    name: bi('Parent Portal', 'بوابة ولي الأمر'),
    heroImage: "/media/sports/basketball/basketball-04-girls-coaching.webp",
  },
  coach: {
    name: bi('Coach Portal', 'بوابة المدرب'),
    heroImage: "/media/sports/basketball/basketball-06-coach-child-dribbling.webp",
  }
};

export function PortalAuthShell({ portal, children, theme }: PortalAuthShellProps) {
  const { resolvedTheme: appTheme } = useUiSettings();
  const currentTheme = theme || appTheme;
  const isDark = currentTheme === 'dark';
  
  const config = PORTAL_CONFIG[portal];

  return (
    <div className={`flex min-h-screen font-['Outfit','Cairo',sans-serif] ${isDark ? 'bg-[#0a0e14] text-[#e8e4dd]' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Left visual side - hidden on mobile, visible on desktop */}
      <div className="hidden lg:block lg:flex-1 relative overflow-hidden">
        <img 
          src={config.heroImage} 
          alt="Portal Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay to blend with the content side */}
        <div className={`absolute inset-0 bg-gradient-to-r ${isDark ? 'from-transparent to-[#0a0e14]' : 'from-transparent to-slate-50'}`} />
        
        {/* Decorative elements over the hero image (optional) */}
        <div className="absolute top-12 left-12">
          <div className="w-16 h-1 bg-[#d8b35a] mb-4"></div>
          <h2 className="text-white text-3xl font-bold tracking-tight drop-shadow-md">
            United Olympics<br />Sports
          </h2>
        </div>
      </div>

      {/* Right content side */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 xl:px-24 max-w-[640px] mx-auto w-full relative z-10">
        <div className="mb-8">
          <AppLogo className="h-16 md:h-20 w-auto object-contain mb-6 !w-auto" compact={false} />
          
          <h1 className={`text-3xl font-bold mb-2 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <BilingualText value={config.name} />
          </h1>
          <p className={`text-sm ${isDark ? 'text-[#8a8780]' : 'text-slate-500'}`}>
            <BilingualText value={bi('Secure access to your United Olympics Sports account', 'وصول آمن لحسابك في يونايتد أوليمبيكس سبورت')} />
          </p>
        </div>

        {/* The dynamic portal-specific forms */}
        <div className="w-full">
          {children}
        </div>

        <div className={`mt-12 pt-6 border-t flex flex-col gap-3 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
          <Link to="/" className={`text-xs inline-flex items-center gap-2 no-underline hover:text-[#d8b35a] transition-colors ${isDark ? 'text-[#8a8780]' : 'text-slate-500'}`}>
            <ExternalLink size={14} />
            <BilingualText value={bi('Return to Main Website', 'العودة للموقع الرئيسي')} />
          </Link>
          <span className={`text-[11px] ${isDark ? 'text-[#5a5853]' : 'text-slate-400'}`}>
            © {new Date().getFullYear()} United Olympics Sports · يونايتد أوليمبيكس سبورت
          </span>
        </div>
      </div>
    </div>
  );
}
