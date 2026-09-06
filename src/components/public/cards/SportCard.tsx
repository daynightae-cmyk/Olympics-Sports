import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Target, Sparkles } from 'lucide-react';
import { UosImage } from '../UosImage';
import { PublicMediaAsset } from '../../../data/media/publicMediaRegistry';
import { useUiSettings } from '../../../ui/theme/useUiSettings';
import { Sports3DIcon } from '../../../design/sports3d';
import type { UosSportSlug, Sport3DId } from '../../../design/sports3d/sports3d.types';

export interface SportCardProps {
  sportId: UosSportSlug | Sport3DId;
  asset: PublicMediaAsset;
  link: string;
  tagAr?: string;
  tagEn?: string;
  ageGroupAr?: string;
  ageGroupEn?: string;
  pathwayAr?: string;
  pathwayEn?: string;
  featured?: boolean;
  className?: string;
}

export function SportCard({
  sportId,
  asset,
  link,
  tagAr,
  tagEn,
  ageGroupAr = '٤ - ١٧ سنة',
  ageGroupEn = '4 - 17 Yrs',
  pathwayAr,
  pathwayEn,
  featured = false,
  className = '',
}: SportCardProps) {
  const { bilingualOrder } = useUiSettings();
  const isAr = bilingualOrder === 'ar-first';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <article
      id={`sport-card-${sportId}`}
      className={`uos-card-interactive group rounded-2xl bg-[#0d0f14]/90 backdrop-blur-sm border ${
        featured ? 'border-amber-500/50 shadow-amber-500/10' : 'border-neutral-800'
      } hover:border-amber-500/40 shadow-xl shadow-black/40 overflow-hidden flex flex-col justify-between transition-all duration-300 ${className}`}
    >
      <div>
        {/* Visual Stage (4:5 Aspect Ratio) */}
        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
          <UosImage
            asset={asset}
            aspectRatio="4/5"
            className="w-full h-full !rounded-none"
            imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-[#0d0f14]/30 to-transparent opacity-90" />

          {/* Age Group Badge */}
          <span className="absolute top-4 start-4 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-neutral-700/60 text-[10px] font-bold text-neutral-300 font-tajawal flex items-center gap-1 shadow-md">
            <span>{isAr ? ageGroupAr : ageGroupEn}</span>
          </span>

          {/* Tag / Badge */}
          {(tagAr || tagEn) && (
            <span className="absolute top-4 end-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-500/30 text-[11px] font-bold text-amber-300 font-tajawal flex items-center gap-1.5 shadow-lg">
              {featured && <Sparkles size={11} className="text-amber-400" />}
              <span>{isAr ? tagAr || tagEn : tagEn || tagAr}</span>
            </span>
          )}

          {/* 3D Sport Icon Stamp */}
          <div className="absolute bottom-4 start-4 p-2 rounded-xl bg-black/70 backdrop-blur-md border border-amber-500/30 shadow-lg">
            <Sports3DIcon sport={sportId} size="sm" decorative />
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-3">
          <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors font-tajawal">
            {isAr ? asset.titleAr : asset.titleEn}
          </h3>
          <p className="text-sm text-neutral-400 font-tajawal leading-relaxed line-clamp-3">
            {isAr ? asset.copyAr : asset.copyEn}
          </p>

          {/* Pathway Track */}
          {(pathwayAr || pathwayEn) && (
            <div className="pt-2 border-t border-neutral-800/60">
              <div className="text-[11px] font-bold text-amber-400/90 font-tajawal flex items-center gap-1.5">
                <Target size={12} className="text-amber-400" />
                <span>{isAr ? 'مسار التدرج:' : 'Pathway:'}</span>
              </div>
              <div className="text-[11px] text-neutral-400 font-tajawal mt-1">
                {isAr ? pathwayAr : pathwayEn}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer Action */}
      <div className="p-6 pt-0">
        <Link
          to={link}
          aria-label={`${isAr ? 'استكشف مسار' : 'Explore pathway for'} ${isAr ? asset.titleAr : asset.titleEn}`}
          className="w-full py-3 px-4 rounded-xl bg-neutral-900/90 group-hover:bg-amber-500/15 border border-neutral-800 group-hover:border-amber-500/40 text-xs font-bold text-amber-400 flex items-center justify-center gap-2 transition-all font-tajawal"
        >
          <span>{isAr ? 'استكشف مسار الرياضة بالتفصيل' : 'Explore Sport Details'}</span>
          <ArrowIcon size={14} className="group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export default SportCard;
