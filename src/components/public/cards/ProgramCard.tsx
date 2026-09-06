import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Target, Sparkles } from 'lucide-react';
import { UosImage } from '../UosImage';
import { UOS_PUBLIC_MEDIA, PublicMediaAsset } from '../../../data/media/publicMediaRegistry';
import { useUiSettings } from '../../../ui/theme/useUiSettings';
import { Sports3DIcon } from '../../../design/sports3d';
import type { UosSportSlug, Sport3DId } from '../../../design/sports3d/sports3d.types';

export interface ProgramCardProps {
  id?: string;
  sportId: string;
  titleAr: string;
  titleEn: string;
  levelAr?: string;
  levelEn?: string;
  descAr: string;
  descEn: string;
  assetKey?: keyof typeof UOS_PUBLIC_MEDIA | string;
  asset?: PublicMediaAsset;
  focusAr?: string[];
  focusEn?: string[];
  seatStatusAr?: string;
  seatStatusEn?: string;
  link?: string;
  featured?: boolean;
  className?: string;
}

export function ProgramCard({
  id,
  sportId,
  titleAr,
  titleEn,
  levelAr,
  levelEn,
  descAr,
  descEn,
  assetKey,
  asset,
  focusAr = [],
  focusEn = [],
  seatStatusAr,
  seatStatusEn,
  link = '/contact',
  featured = false,
  className = '',
}: ProgramCardProps) {
  const { bilingualOrder } = useUiSettings();
  const isAr = bilingualOrder === 'ar-first';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const resolvedSeatAr = seatStatusAr || (featured ? 'مقاعد محدودة للموسم' : 'التسجيل متاح حالياً');
  const resolvedSeatEn = seatStatusEn || (featured ? 'Limited Season Seats' : 'Open for Enrollment');

  const validSportIds = ['football', 'swimming', 'basketball', 'tennis', 'gymnastics', 'martial-arts'];
  const hasSportIcon = validSportIds.includes(sportId);

  return (
    <article
      id={id ? `program-card-${id}` : undefined}
      className={`uos-card-interactive group rounded-2xl bg-[#0d0f14]/90 backdrop-blur-sm border ${
        featured ? 'border-amber-500/50 shadow-amber-500/10' : 'border-neutral-800'
      } hover:border-amber-500/40 shadow-xl shadow-black/40 overflow-hidden flex flex-col justify-between transition-all duration-300 ${className}`}
    >
      <div>
        {/* Visual Stage */}
        <div className="relative aspect-[16/9] overflow-hidden bg-neutral-900">
          <UosImage
            assetKey={assetKey}
            asset={asset}
            aspectRatio="16/9"
            className="w-full h-full !rounded-none"
            imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-transparent to-transparent opacity-90" />

          {/* Seat Status Badge */}
          <span className="absolute top-3 start-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-emerald-500/30 text-[9px] font-bold text-emerald-400 font-tajawal flex items-center gap-1 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{isAr ? resolvedSeatAr : resolvedSeatEn}</span>
          </span>

          {/* Level Badge */}
          {(levelAr || levelEn) && (
            <span className="absolute top-3 end-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-amber-500/30 text-[10px] font-bold text-amber-300 font-tajawal flex items-center gap-1 shadow-lg">
              {featured && <Sparkles size={10} className="text-amber-400" />}
              <span>{isAr ? levelAr || levelEn : levelEn || levelAr}</span>
            </span>
          )}

          {/* Sport Icon Badge */}
          {hasSportIcon && (
            <div className="absolute bottom-3 start-3 p-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-amber-500/30 shadow-md">
              <Sports3DIcon sport={sportId as UosSportSlug | Sport3DId} size="sm" decorative />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors font-tajawal">
            {isAr ? titleAr : titleEn}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 font-tajawal leading-relaxed line-clamp-3">
            {isAr ? descAr : descEn}
          </p>

          {/* Focus Tags */}
          {((isAr ? focusAr : focusEn).length > 0) && (
            <div className="pt-2 flex flex-wrap gap-1.5">
              {(isAr ? focusAr : focusEn).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-neutral-900/90 border border-neutral-800 text-[10px] text-neutral-300 font-tajawal"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action CTA */}
      <div className="p-6 pt-0">
        <Link
          to={link}
          aria-label={`${isAr ? 'الاستفسار عن برنامج' : 'Inquire about program'} ${isAr ? titleAr : titleEn}`}
          className="w-full py-2.5 px-4 rounded-xl bg-neutral-900/90 group-hover:bg-amber-500/15 border border-neutral-800 group-hover:border-amber-500/40 text-xs font-bold text-amber-400 flex items-center justify-center gap-2 transition-all font-tajawal"
        >
          <span>{isAr ? 'الاستفسار عن البرنامج' : 'Inquire About Program'}</span>
          <ArrowIcon size={14} className="group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export default ProgramCard;
