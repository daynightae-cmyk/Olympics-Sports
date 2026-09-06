import { useState, useId } from 'react';
import { UOS_PUBLIC_MEDIA, PublicMediaAsset } from '../../data/media/publicMediaRegistry';
import { Maximize2, X } from 'lucide-react';

export interface UosImageProps {
  assetKey?: keyof typeof UOS_PUBLIC_MEDIA | string;
  asset?: PublicMediaAsset;
  src?: string;
  altAr?: string;
  altEn?: string;
  aspectRatio?: '16/9' | '21/9' | '4/5' | '3/2' | '1/1' | 'auto';
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  withLightbox?: boolean;
  decorative?: boolean;
  focalPointDesktop?: string;
  focalPointTablet?: string;
  focalPointMobile?: string;
  caption?: { ar: string; en: string };
  sizes?: string;
}

export function UosImage({
  assetKey,
  asset: customAsset,
  src,
  altAr,
  altEn,
  aspectRatio,
  className = '',
  imageClassName = '',
  priority = false,
  withLightbox = false,
  decorative = false,
  focalPointDesktop,
  focalPointTablet,
  focalPointMobile,
  caption,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: UosImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const lightboxId = useId();

  const registeredAsset: PublicMediaAsset | undefined =
    customAsset || (assetKey && UOS_PUBLIC_MEDIA[assetKey as keyof typeof UOS_PUBLIC_MEDIA]);

  const finalSrc = src || registeredAsset?.url || '';
  const finalAltAr = altAr || registeredAsset?.altAr || 'صورة من United Olympics Sports';
  const finalAltEn = altEn || registeredAsset?.altEn || 'United Olympics Sports Visual';
  const finalAspect = aspectRatio || registeredAsset?.aspectRatio || '16/9';

  const finalFocalDesktop = focalPointDesktop || registeredAsset?.focalPointDesktop || '50% 50%';
  const finalFocalTablet = focalPointTablet || registeredAsset?.focalPointTablet || finalFocalDesktop;
  const finalFocalMobile = focalPointMobile || registeredAsset?.focalPointMobile || finalFocalTablet;

  const aspectClassMap = {
    '16/9': 'aspect-[16/9]',
    '21/9': 'aspect-[21/9]',
    '4/5': 'aspect-[4/5]',
    '3/2': 'aspect-[3/2]',
    '1/1': 'aspect-square',
    'auto': 'aspect-auto',
  };

  const aspectClass = aspectClassMap[finalAspect] || 'aspect-[16/9]';

  return (
    <>
      <figure
        className={`uos-image-container relative overflow-hidden bg-neutral-900/60 rounded-xl group select-none ${aspectClass} ${className}`}
        style={{
          ['--focal-desktop' as string]: finalFocalDesktop,
          ['--focal-tablet' as string]: finalFocalTablet,
          ['--focal-mobile' as string]: finalFocalMobile,
        }}
      >
        {/* Shimmer Placeholder */}
        {!isLoaded && !hasError && (
          <div
            className="absolute inset-0 bg-neutral-900/80 animate-pulse flex items-center justify-center text-amber-500/20"
            aria-hidden="true"
          >
            <div className="w-12 h-12 rounded-full border border-amber-500/30 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-amber-400/40 animate-ping" />
            </div>
          </div>
        )}

        {/* The Image Element */}
        {!hasError ? (
          <img
            src={finalSrc}
            alt={decorative ? '' : `${finalAltAr} | ${finalAltEn}`}
            aria-hidden={decorative ? 'true' : undefined}
            width={1648}
            height={928}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            sizes={sizes}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`uos-responsive-img w-full h-full object-cover transition-all duration-700 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            } ${imageClassName}`}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950 p-4 text-center border border-amber-500/20">
            <span className="text-amber-400 text-xs font-tajawal font-bold mb-1">United Olympics Sports</span>
            <span className="text-neutral-400 text-[11px] font-tajawal">جاري تحميل الوسائط المعتمدة...</span>
          </div>
        )}

        {/* Lightbox trigger button if enabled */}
        {withLightbox && isLoaded && !hasError && (
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label={`تكبير الصورة: ${finalAltAr} | Zoom image: ${finalAltEn}`}
            className="absolute bottom-3 end-3 p-2 rounded-lg bg-black/60 hover:bg-black/80 text-amber-400/90 hover:text-amber-300 backdrop-blur-md opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all border border-amber-500/20 shadow-lg cursor-pointer"
          >
            <Maximize2 size={16} />
          </button>
        )}

        {/* Optional Caption */}
        {caption && (
          <figcaption className="sr-only">
            <span>{caption.ar}</span> - <span>{caption.en}</span>
          </figcaption>
        )}
      </figure>

      {/* Accessible Lightbox Modal */}
      {withLightbox && lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={lightboxId}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-xl animate-fade-in"
          onClick={() => setLightboxOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setLightboxOpen(false);
          }}
          tabIndex={-1}
        >
          <div
            className="relative max-w-6xl max-h-[90vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="إغلاق | Close"
              className="absolute -top-12 end-0 p-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-amber-500/30 transition-all cursor-pointer"
            >
              <X size={20} />
            </button>
            <img
              src={finalSrc}
              alt={`${finalAltAr} | ${finalAltEn}`}
              className="max-w-full max-h-[80vh] object-contain rounded-xl border border-amber-500/30 shadow-2xl"
            />
            <div id={lightboxId} className="mt-4 text-center text-neutral-300 max-w-2xl px-4">
              <p className="text-sm font-semibold font-tajawal text-amber-300">{finalAltAr}</p>
              <p className="text-xs text-neutral-400 mt-1 font-sans">{finalAltEn}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
