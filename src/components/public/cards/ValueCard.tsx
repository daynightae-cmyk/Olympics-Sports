import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useUiSettings } from '../../../ui/theme/useUiSettings';

export interface ValueCardProps {
  id?: string;
  icon?: ReactNode;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  badgeAr?: string;
  badgeEn?: string;
  stepNumber?: string | number;
  link?: string;
  featured?: boolean;
  className?: string;
}

export function ValueCard({
  id,
  icon,
  titleAr,
  titleEn,
  descAr,
  descEn,
  badgeAr,
  badgeEn,
  stepNumber,
  link,
  featured = false,
  className = '',
}: ValueCardProps) {
  const { bilingualOrder } = useUiSettings();
  const isAr = bilingualOrder === 'ar-first';

  const cardContent = (
    <div
      id={id ? `value-card-${id}` : undefined}
      className={`uos-card-interactive group rounded-2xl bg-[#0d0f14]/90 backdrop-blur-sm border ${
        featured ? 'border-amber-500/50 shadow-amber-500/10' : 'border-neutral-800'
      } hover:border-amber-500/40 p-8 space-y-4 transition-all duration-300 shadow-xl shadow-black/30 flex flex-col justify-between ${
        link ? 'cursor-pointer' : ''
      } ${className}`}
    >
      <div className="space-y-4">
        {/* Header with Icon and optional Step Badge */}
        <div className="flex items-center justify-between gap-3">
          {icon && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 w-fit group-hover:bg-amber-500/20 group-hover:border-amber-500/50 transition-colors">
              {icon}
            </div>
          )}

          {stepNumber !== undefined && (
            <span className="text-2xl font-black text-amber-400/30 font-mono">
              {String(stepNumber).padStart(2, '0')}
            </span>
          )}

          {(badgeAr || badgeEn) && (
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-[10px] font-bold text-amber-300 font-tajawal">
              {isAr ? badgeAr || badgeEn : badgeEn || badgeAr}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors font-tajawal">
            {isAr ? titleAr : titleEn}
          </h3>
          <p className="text-sm text-neutral-400 font-tajawal leading-relaxed">
            {isAr ? descAr : descEn}
          </p>
        </div>
      </div>
    </div>
  );

  if (link) {
    return (
      <Link to={link} className="block no-underline">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

export default ValueCard;
