import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Flame, Sparkles, Trophy } from 'lucide-react';
import { AppLogo } from '../brand/AppLogo';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface OlympicLuxurySplashProps {
  onComplete: () => void;
  brand?: string;
  brandAr?: string;
}

export function OlympicLuxurySplash({
  onComplete,
  brand = 'United Olympics Sports',
  brandAr = 'يونايتد أوليمبيكس سبورت',
}: OlympicLuxurySplashProps) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  const statusPhases = [
    { en: 'Igniting Olympic Spirit...', ar: 'إيقاد الشعلة الأولمبية...' },
    { en: 'Calibrating Athletic Disciplines...', ar: 'تنسيق المسارات والأنشطة الرياضية...' },
    { en: 'Loading Performance Assets...', ar: 'تحميل وسائط وأصول الأداء العالي...' },
    { en: 'Ready for Champions.', ar: 'المنصة جاهزة لصناعة الأبطال.' },
  ];

  useEffect(() => {
    if (reducedMotion) {
      const timer = setTimeout(onComplete, 400);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 350);
          return 100;
        }
        if (next > 75) setStatusIndex(3);
        else if (next > 45) setStatusIndex(2);
        else if (next > 20) setStatusIndex(1);
        return next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete, reducedMotion]);

  // Generate fixed positions for golden stardust specks
  const stardustSpecks = [
    { top: '15%', left: '18%', delay: '0s' },
    { top: '22%', left: '78%', delay: '0.8s' },
    { top: '35%', left: '12%', delay: '1.4s' },
    { top: '68%', left: '20%', delay: '0.4s' },
    { top: '75%', left: '82%', delay: '1.2s' },
    { top: '28%', left: '42%', delay: '1.8s' },
    { top: '80%', left: '52%', delay: '0.6s' },
    { top: '62%', left: '88%', delay: '1.6s' },
  ];

  return (
    <motion.aside
      className="olympic-luxury-splash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      role="dialog"
      aria-label="United Olympics Sports Welcome Screen"
    >
      {/* Background Animated Rings & Cosmic Glow */}
      <div className="olympic-splash-backdrop" aria-hidden="true">
        <div className="olympic-splash-rings-bg" />
        {!reducedMotion && (
          <>
            <div className="olympic-splash-orbit-outer" />
            <div className="olympic-splash-orbit-inner" />
            <div className="olympic-splash-pulse-wave" />
            <div className="olympic-stardust-field">
              {stardustSpecks.map((speck) => (
                <div
                  key={`${speck.top}-${speck.left}`}
                  className="olympic-stardust-speck"
                  style={{
                    top: speck.top,
                    left: speck.left,
                    animationDelay: speck.delay,
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Main Center Composition */}
      <div className="olympic-splash-center">
        {/* Emblem Medallion Stage with Crown Aura */}
        <div className="olympic-splash-logo-container">
          <div className="olympic-splash-crown-aura" aria-hidden="true" />
          <AppLogo size={200} withGoldBorder withGlow alt={`${brand} | ${brandAr}`} />
        </div>

        {/* Eyebrow & Brand Typography */}
        <div className="olympic-splash-eyebrow">
          <Flame size={14} color="#f5d77f" />
          <span>Official Olympic Academy</span>
          <Flame size={14} color="#f5d77f" />
        </div>

        <h1 className="olympic-splash-title">{brand}</h1>
        <h2 className="olympic-splash-arabic">{brandAr}</h2>

        {/* Motto Badge */}
        <div className="olympic-splash-motto-row">
          <Sparkles size={14} color="#d4af37" />
          <span>From Childhood, We Build Champions</span>
          <small>من الطفولة نصنع الأبطال</small>
        </div>

        {/* Progress & Live Loading Telemetry */}
        <div className="olympic-splash-progress-track">
          <div
            className="olympic-splash-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="olympic-splash-status-text">
          {statusPhases[statusIndex].en} · {statusPhases[statusIndex].ar}
        </div>
      </div>

      {/* Skip Button */}
      <button
        type="button"
        className="olympic-splash-skip-btn"
        onClick={onComplete}
        aria-label="Skip splash intro"
      >
        <span>Skip Intro · تخطي المقدمة</span>
        <ArrowRight size={14} />
      </button>
    </motion.aside>
  );
}
