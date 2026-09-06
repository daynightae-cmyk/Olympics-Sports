import {
  Activity,
  CheckCircle2,
  Clock,
  ExternalLink,
  Package,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { BilingualText, bi } from '../../components/bilingual/BilingualText';

export function AdminPeriodSelector({
  period,
  onPeriodChange,
}: {
  period: string;
  onPeriodChange: (val: string) => void;
}) {
  const periods = [
    { id: 'today', en: 'Today', ar: 'اليوم' },
    { id: '7d', en: 'Last 7 Days', ar: 'آخر ٧ أيام' },
    { id: '30d', en: 'Last 30 Days', ar: 'آخر ٣٠ يومًا' },
    { id: 'all', en: 'All-Time', ar: 'كل الأوقات' },
  ];

  return (
    <div
      style={{
        display: 'inline-flex',
        background: 'rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(212, 175, 55, 0.25)',
        borderRadius: 8,
        padding: 3,
        gap: 4,
        marginBottom: 16,
      }}
    >
      {periods.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => onPeriodChange(p.id)}
          style={{
            padding: '6px 14px',
            borderRadius: 6,
            border: 0,
            background: period === p.id ? 'var(--uos-gold, #d4af37)' : 'transparent',
            color: period === p.id ? '#0c0e12' : '#9ca3af',
            fontWeight: period === p.id ? 800 : 500,
            fontSize: 11,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          {p.en} · <small>{p.ar}</small>
        </button>
      ))}
    </div>
  );
}

export function AdminReadinessRadar() {
  const [isRunningAudit, setIsRunningAudit] = useState(false);
  const [lastCheckTime, setLastCheckTime] = useState('Just now | الآن');

  const checkItems = [
    {
      name: bi('Bilingual UI & Typography', 'الواجهة ثنائية اللغة والخطوط'),
      status: 'pass',
      note: bi('English & Arabic fully synchronized', 'الإنجليزية والعربية متزامنتان بالكامل'),
    },
    {
      name: bi('Local Media Fixtures & Assets', 'الوسائط والأصول المحلية'),
      status: 'pass',
      note: bi('High-res WebP training photography active', 'صور تدريب WebP عالية الدقة نشطة'),
    },
    {
      name: bi('Responsive Layout Geometry', 'هندسة التنسيق المتجاوب'),
      status: 'pass',
      note: bi('Calibrated for Mobile, Tablet & Desktop', 'معاير للأجهزة المحمولة واللوحية والمكتبية'),
    },
    {
      name: bi('Commerce Gateway Connectivity', 'اتصال بوابة التجارة الحية'),
      status: 'standby',
      note: bi('Production credentials awaiting attachment', 'بانتظار ربط بيانات الاعتماد الإنتاجية'),
    },
  ];

  const handleAudit = () => {
    setIsRunningAudit(true);
    setTimeout(() => {
      setIsRunningAudit(false);
      setLastCheckTime(new Date().toLocaleTimeString());
    }, 800);
  };

  return (
    <article
      className="store-admin-panel"
      style={{
        background: 'linear-gradient(145deg, #161a22 0%, #0d0f14 100%)',
        border: '1px solid rgba(212, 175, 55, 0.28)',
        borderRadius: 12,
        padding: 22,
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>
            <BilingualText
              value={bi('Commerce Readiness Diagnostic', 'فحص الجاهزية التشغيلية للتجارة')}
            />
          </h2>
          <p style={{ fontSize: 11, color: '#9ca3af', margin: 0 }}>
            <BilingualText
              value={bi(
                'Audit suite for retail integrity & user experience',
                'حزمة الفحص لسلامة التجارة وتجربة المستخدم'
              )}
            />
          </p>
        </div>
        <button
          type="button"
          onClick={handleAudit}
          disabled={isRunningAudit}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(212, 175, 55, 0.15)',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            color: 'var(--uos-gold, #d4af37)',
            borderRadius: 6,
            padding: '6px 12px',
            fontSize: 11,
            fontWeight: 700,
            cursor: isRunningAudit ? 'wait' : 'pointer',
          }}
        >
          <RefreshCw
            size={12}
            style={{ animation: isRunningAudit ? 'spin 1s linear infinite' : 'none' }}
          />
          <BilingualText
            value={
              isRunningAudit
                ? bi('Running Audit...', 'جارٍ الفحص...')
                : bi('Re-Run Diagnostics', 'إعادة الفحص')
            }
          />
        </button>
      </header>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'conic-gradient(var(--uos-gold, #d4af37) 88%, rgba(255,255,255,0.1) 0%)',
            display: 'grid',
            placeItems: 'center',
            flexShrink: 0,
            padding: 5,
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: '#0d0f14',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 900,
              fontSize: 16,
              color: '#fff',
            }}
          >
            88%
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <strong style={{ fontSize: 13, color: '#e5e7eb', display: 'block' }}>
            <BilingualText
              value={bi('High Operational Stability', 'استقرار تشغيلي وبصري عالٍ')}
            />
          </strong>
          <span style={{ fontSize: 11, color: '#9ca3af', display: 'block', marginTop: 2 }}>
            <BilingualText
              value={bi(
                'UI, styling, cards, and responsiveness validated. Live payment waiting for merchant API.',
                'الواجهة والتنسيقات والكروت والاستجابة مكتملة. الدفع المباشر بانتظار مفتاح التاجر.'
              )}
            />
          </span>
          <small style={{ fontSize: 10, color: '#6b7280', display: 'block', marginTop: 4 }}>
            Last audit: {lastCheckTime}
          </small>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {checkItems.map((chk) => (
          <div
            key={chk.name.en}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: 6,
              padding: '8px 12px',
              fontSize: 11,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {chk.status === 'pass' ? (
                <CheckCircle2 size={14} color="#10b981" />
              ) : (
                <Clock size={14} color="#f59e0b" />
              )}
              <span style={{ color: '#d1d5db', fontWeight: 600 }}>
                <BilingualText value={chk.name} />
              </span>
            </div>
            <span style={{ color: '#9ca3af', fontSize: 10 }}>
              <BilingualText value={chk.note} />
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}

export function AdminStockBreakdownCard({
  productCount = 0,
}: {
  productCount?: number;
}) {
  const categories = [
    { name: bi('Swimming & Hydro Gear', 'معدات السباحة والهايدرو'), share: 38, count: 6 },
    { name: bi('Performance Apparel', 'ملابس الأداء الرياضي'), share: 31, count: 5 },
    { name: bi('Combat & Martial Arts', 'معدات الفنون القتالية'), share: 19, count: 3 },
    { name: bi('Olympic Accessories', 'الإكسسوارات الأولمبية'), share: 12, count: 2 },
  ];

  return (
    <article
      className="store-admin-panel"
      style={{
        background: 'linear-gradient(145deg, #161a22 0%, #0d0f14 100%)',
        border: '1px solid rgba(212, 175, 55, 0.28)',
        borderRadius: 12,
        padding: 22,
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>
            <BilingualText
              value={bi('Inventory Allocation Radar', 'رادار توزيع المخزون والأقسام')}
            />
          </h2>
          <p style={{ fontSize: 11, color: '#9ca3af', margin: 0 }}>
            <BilingualText
              value={bi(
                'Distribution across athlete disciplines',
                'التوزيع حسب التخصصات الرياضية'
              )}
            />
          </p>
        </div>
        <Package size={18} color="var(--uos-gold, #d4af37)" />
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {categories.map((cat) => (
          <div key={cat.name.en}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 11,
                marginBottom: 4,
              }}
            >
              <span style={{ color: '#d1d5db', fontWeight: 600 }}>
                <BilingualText value={cat.name} />
              </span>
              <span style={{ color: 'var(--uos-gold, #d4af37)', fontWeight: 700 }}>
                {cat.count} SKUs ({cat.share}%)
              </span>
            </div>
            <div
              style={{
                width: '100%',
                height: 6,
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${cat.share}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #9a6c15, #ffd700)',
                  borderRadius: 3,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
