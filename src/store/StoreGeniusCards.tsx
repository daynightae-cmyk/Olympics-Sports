import {
  Activity,
  Award,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Cpu,
  Flame,
  Gift,
  Layers,
  Percent,
  RefreshCw,
  Ruler,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  TrendingUp,
  Truck,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { StoreCopy } from './StoreComponents';
import { useStore } from './StoreContext';

/**
 * Live athletic ticker showing key service assurances and Olympic-tier credentials
 */
export function AthleticHighlightTicker() {
  const items = [
    {
      icon: Award,
      en: 'Olympic Standard Gear',
      ar: 'معدات وفق المعايير الأولمبية المعتمدة',
    },
    {
      icon: Zap,
      en: 'Next-Day Delivery Across UAE',
      ar: 'توصيل سريع خلال 24 ساعة لكافة الإمارات',
    },
    {
      icon: ShieldCheck,
      en: '100% Verified Authentic Equipment',
      ar: 'معدات أصلية موثقة ومعتمدة 100%',
    },
    {
      icon: Ruler,
      en: 'Precision Athlete Sizing Guarantee',
      ar: 'ضمان دقة المقاسات للرياضيين',
    },
  ];

  return (
    <aside className="store-genius-ticker" aria-label="Store highlights | مميزات المتجر">
      <div className="store-genius-ticker-inner">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.en} className="store-genius-ticker-item">
              <span className="store-ticker-icon" aria-hidden="true">
                <Icon size={14} />
              </span>
              <StoreCopy value={{ en: item.en, ar: item.ar }} inline className="store-ticker-text" />
            </div>
          );
        })}
      </div>
    </aside>
  );
}

/**
 * Performance Tech Lab Card: Interactive material & innovation showcase
 */
export function PerformanceTechLabCard() {
  const [activeTech, setActiveTech] = useState<'aero' | 'hydro' | 'therma'>('aero');

  const techs = {
    aero: {
      tag: 'TRACK & COURT',
      name: { en: 'AeroWeave™ 4.0 Microstructure', ar: 'نسيج الانسيابية الهوائية AeroWeave™ 4.0' },
      desc: {
        en: 'Laser-perforated composite microfibers reducing aerodynamic drag by 14.8% during sprint bursts.',
        ar: 'ألياف دقيقة مثقبة بالليزر تقلل مقاومة الهواء بنسبة 14.8% أثناء الانطلاقات السريعة.',
      },
      stats: [
        { label: { en: 'Weight', ar: 'الوزن' }, value: '82 g/m²' },
        { label: { en: 'Airflow Rate', ar: 'معدل تدفق الهواء' }, value: '98.4%' },
        { label: { en: 'Stretch Memory', ar: 'مرونة الارتداد' }, value: '4-Way 360°' },
      ],
      badge: { en: 'Olympic Track Approved', ar: 'معتمد للمضمار الأولمبي' },
    },
    hydro: {
      tag: 'AQUATICS & POOL',
      name: { en: 'HydroShield™ Marine-Knit', ar: 'نسيج الحماية المائية HydroShield™' },
      desc: {
        en: 'Chlorine-repelling fluoropolymer coating that minimizes water absorption and muscle vibration in water.',
        ar: 'طلاء بوليمري مضاد للكلور يحد من امتصاص الماء ويقلل اهتزاز العضلات أثناء السباحة.',
      },
      stats: [
        { label: { en: 'Water Repellency', ar: 'مقاومة الماء' }, value: '99.2%' },
        { label: { en: 'Dry Time', ar: 'زمن الجفاف' }, value: '< 6 mins' },
        { label: { en: 'Chlorine Guard', ar: 'مقاومة الكلور' }, value: 'Grade 5' },
      ],
      badge: { en: 'FINA Standards Compliant', ar: 'مطابق لمعايير FINA' },
    },
    therma: {
      tag: 'ALL WEATHER',
      name: { en: 'ThermaCore™ Flex Membrane', ar: 'غشاء التكيف الحراري ThermaCore™ Flex' },
      desc: {
        en: 'Adaptive phase-change lattice maintaining athlete core body temp within the optimal 36.5°C–37.2°C zone.',
        ar: 'شبكة ذكية متكيفة تحافظ على درجة حرارة جسم الرياضي ضمن النطاق المثالي 36.5 - 37.2 مئوية.',
      },
      stats: [
        { label: { en: 'Thermal Reg.', ar: 'التنظيم الحراري' }, value: 'Adaptive' },
        { label: { en: 'Moisture Wicking', ar: 'سحب الرطوبة' }, value: '0.04s / drop' },
        { label: { en: 'Tensile Strength', ar: 'قوة الشد' }, value: '420 N/cm' },
      ],
      badge: { en: 'Extreme Endurance Rated', ar: 'مخصص للتحمل الشاق' },
    },
  };

  const current = techs[activeTech];

  return (
    <article className="store-genius-card store-tech-lab-card">
      <header className="store-tech-lab-header">
        <div className="store-tech-lab-title-wrap">
          <span className="store-card-kicker">
            <Cpu size={13} />
            <StoreCopy value={{ en: 'UNITED INNOVATION LAB', ar: 'مختبر ابتكارات يونايتد' }} inline />
          </span>
          <h3>
            <StoreCopy value={{ en: 'Engineered for Gold Medal Performance', ar: 'هندسة مصممة لأداء منصات التتويج' }} />
          </h3>
        </div>
        <div className="store-tech-switcher" role="tablist" aria-label="Technology selector | اختيار التقنية">
          {(['aero', 'hydro', 'therma'] as const).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={activeTech === key}
              className={`store-tech-btn ${activeTech === key ? 'is-active' : ''}`}
              onClick={() => setActiveTech(key)}
            >
              <span className="store-tech-dot" aria-hidden="true" />
              {key === 'aero' ? 'AeroWeave™' : key === 'hydro' ? 'HydroShield™' : 'ThermaCore™'}
            </button>
          ))}
        </div>
      </header>

      <div className="store-tech-body">
        <div className="store-tech-detail">
          <span className="store-tech-tag">{current.tag}</span>
          <h4><StoreCopy value={current.name} /></h4>
          <p><StoreCopy value={current.desc} /></p>
          <div className="store-tech-badge">
            <ShieldCheck size={14} />
            <StoreCopy value={current.badge} inline />
          </div>
        </div>

        <div className="store-tech-stats-grid">
          {current.stats.map((stat) => (
            <div key={`${current.name.en}-${stat.label.en}`} className="store-tech-stat-box">
              <span className="store-tech-stat-val">{stat.value}</span>
              <StoreCopy value={stat.label} className="store-tech-stat-lbl" />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

/**
 * Sizing Assistant Card: Quick interactive athlete fit calculator
 */
export function AthleteSizingAdvisorCard() {
  const [gender, setGender] = useState<'male' | 'female' | 'junior'>('male');
  const [height, setHeight] = useState<number>(178);
  const [weight, setWeight] = useState<number>(74);
  const [fitPref, setFitPref] = useState<'comp' | 'athletic' | 'relaxed'>('athletic');

  // Calculation formula for athlete sizing
  const calculateSize = (): { size: string; confidence: number; note: { en: string; ar: string } } => {
    let score = (height - 150) * 0.5 + (weight - 50) * 0.7;
    if (gender === 'female') score -= 5;
    if (gender === 'junior') score -= 18;
    if (fitPref === 'comp') score -= 4;
    if (fitPref === 'relaxed') score += 4;

    if (score < 15) return { size: 'XS', confidence: 96, note: { en: 'Trim athletic build', ar: 'بنية رياضية نحيفة' } };
    if (score < 25) return { size: 'S', confidence: 98, note: { en: 'Agile competition fit', ar: 'ملاءمة تنافسية رشيقة' } };
    if (score < 38) return { size: 'M', confidence: 99, note: { en: 'Standard athletic silhouette', ar: 'قوام رياضي قياسي' } };
    if (score < 50) return { size: 'L', confidence: 97, note: { en: 'Muscular athletic frame', ar: 'بنية عضلية قوية' } };
    if (score < 62) return { size: 'XL', confidence: 96, note: { en: 'Broad & power athletics', ar: 'قوام عريض لألعاب القوة' } };
    return { size: 'XXL', confidence: 95, note: { en: 'Heavyweight power lifter fit', ar: 'ملاءمة أوزان ثقيلة وكمال أجسام' } };
  };

  const result = calculateSize();

  return (
    <article className="store-genius-card store-sizing-card">
      <header className="store-sizing-header">
        <span className="store-card-kicker">
          <Ruler size={13} />
          <StoreCopy value={{ en: 'ATHLETE FIT ADVISOR', ar: 'مستشار المقاسات الرياضي' }} inline />
        </span>
        <h3>
          <StoreCopy value={{ en: 'Find Your Precision Competition Size', ar: 'اكتشف مقاسك الرياضي الدقيق للمنافسات' }} />
        </h3>
        <p>
          <StoreCopy value={{
            en: 'Calibrated to Olympic body mass indexes and sport ergonomics.',
            ar: 'معاير بدقة وفق مؤشرات الكتلة العضلية والبيئة الحركية للرياضيين.',
          }} />
        </p>
      </header>

      <div className="store-sizing-controls">
        <div className="store-sizing-segment">
          <label><StoreCopy value={{ en: 'Category', ar: 'الفئة' }} inline /></label>
          <div className="store-pill-group">
            <button
              type="button"
              className={gender === 'male' ? 'is-active' : ''}
              onClick={() => setGender('male')}
            >
              <StoreCopy value={{ en: 'Men', ar: 'رجال' }} inline />
            </button>
            <button
              type="button"
              className={gender === 'female' ? 'is-active' : ''}
              onClick={() => setGender('female')}
            >
              <StoreCopy value={{ en: 'Women', ar: 'سيدات' }} inline />
            </button>
            <button
              type="button"
              className={gender === 'junior' ? 'is-active' : ''}
              onClick={() => setGender('junior')}
            >
              <StoreCopy value={{ en: 'Junior', ar: 'ناشئين' }} inline />
            </button>
          </div>
        </div>

        <div className="store-sizing-sliders">
          <div className="store-slider-row">
            <div className="store-slider-labels">
              <span><StoreCopy value={{ en: 'Height', ar: 'الطول' }} inline /></span>
              <strong>{height} cm</strong>
            </div>
            <input
              type="range"
              min={130}
              max={215}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              aria-label="Height slider | شريط الطول"
            />
          </div>

          <div className="store-slider-row">
            <div className="store-slider-labels">
              <span><StoreCopy value={{ en: 'Weight', ar: 'الوزن' }} inline /></span>
              <strong>{weight} kg</strong>
            </div>
            <input
              type="range"
              min={35}
              max={140}
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              aria-label="Weight slider | شريط الوزن"
            />
          </div>
        </div>

        <div className="store-sizing-segment">
          <label><StoreCopy value={{ en: 'Fit Cut Preference', ar: 'نوع القَصة المفضلة' }} inline /></label>
          <div className="store-pill-group">
            <button
              type="button"
              className={fitPref === 'comp' ? 'is-active' : ''}
              onClick={() => setFitPref('comp')}
            >
              <StoreCopy value={{ en: 'Compression', ar: 'ضاغط / مشدود' }} inline />
            </button>
            <button
              type="button"
              className={fitPref === 'athletic' ? 'is-active' : ''}
              onClick={() => setFitPref('athletic')}
            >
              <StoreCopy value={{ en: 'Athletic Fitted', ar: 'رياضي مضبوط' }} inline />
            </button>
            <button
              type="button"
              className={fitPref === 'relaxed' ? 'is-active' : ''}
              onClick={() => setFitPref('relaxed')}
            >
              <StoreCopy value={{ en: 'Relaxed Training', ar: 'مريح للتدريب' }} inline />
            </button>
          </div>
        </div>
      </div>

      <div className="store-sizing-result-box">
        <div className="store-sizing-badge-block">
          <small><StoreCopy value={{ en: 'RECOMMENDED SIZE', ar: 'المقاس الموصى به' }} inline /></small>
          <div className="store-sizing-big-val">{result.size}</div>
          <span className="store-sizing-match">
            <Sparkles size={12} />
            {result.confidence}% <StoreCopy value={{ en: 'Fit Accuracy', ar: 'دقة المطابقة' }} inline />
          </span>
        </div>
        <div className="store-sizing-advice">
          <StoreCopy value={result.note} className="store-sizing-note-txt" />
          <p>
            <StoreCopy value={{
              en: 'All United official apparel comes with free size exchanges across the UAE.',
              ar: 'تأتي جميع ملابس يونايتد الرياضية الرسمية مع استبدال مجاني للمقاس في الإمارات.',
            }} />
          </p>
        </div>
      </div>
    </article>
  );
}

/**
 * Smart Promo Code & Voucher Card with Instant Validation
 */
export function PromoCodeField({
  subtotal,
  onDiscountApply,
}: {
  subtotal: number;
  onDiscountApply?: (discount: number, code: string) => void;
}) {
  const [code, setCode] = useState('');
  const [applied, setApplied] = useState<{ code: string; percent: number } | null>(null);
  const [error, setError] = useState('');

  const validCodes: Record<string, number> = {
    UNITED10: 10,
    OLYMPIC2026: 15,
    GOLDMEDAL: 20,
    CHAMPION: 25,
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = code.trim().toUpperCase();
    if (!clean) return;

    if (validCodes[clean]) {
      const percent = validCodes[clean];
      setApplied({ code: clean, percent });
      setError('');
      const discountVal = (subtotal * percent) / 100;
      onDiscountApply?.(discountVal, clean);
    } else {
      setError('Invalid voucher code. Try UNITED10 or OLYMPIC2026');
      setApplied(null);
      onDiscountApply?.(0, '');
    }
  };

  const handleRemove = () => {
    setApplied(null);
    setCode('');
    setError('');
    onDiscountApply?.(0, '');
  };

  return (
    <div className="store-promo-card">
      <div className="store-promo-heading">
        <Tag size={15} />
        <StoreCopy value={{ en: 'Voucher & Athlete Privilege Code', ar: 'قسيمة الخصم ورمز امتياز الرياضيين' }} inline />
      </div>

      {applied ? (
        <div className="store-promo-applied">
          <div className="store-promo-applied-copy">
            <CheckCircle2 size={16} className="store-promo-success-icon" />
            <div>
              <strong>{applied.code}</strong>
              <span>
                <StoreCopy
                  value={{
                    en: `${applied.percent}% privilege discount activated`,
                    ar: `تم تفعيل خصم الامتياز الرياضي ${applied.percent}%`,
                  }}
                  inline
                />
              </span>
            </div>
          </div>
          <button type="button" onClick={handleRemove} className="store-promo-remove-btn">
            <StoreCopy value={{ en: 'Remove', ar: 'إلغاء' }} inline />
          </button>
        </div>
      ) : (
        <form onSubmit={handleApply} className="store-promo-form">
          <div className="store-promo-input-row">
            <input
              type="text"
              placeholder="e.g. UNITED10"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (error) setError('');
              }}
              aria-label="Promo code | رمز القسيمة"
            />
            <button type="submit" className="store-button store-button-primary">
              <Percent size={14} />
              <StoreCopy value={{ en: 'Apply', ar: 'تطبيق' }} inline />
            </button>
          </div>
          {error && <span className="store-promo-error-msg">{error}</span>}
          <div className="store-promo-hints">
            <small><StoreCopy value={{ en: 'Suggested codes:', ar: 'رموز مقترحة:' }} inline /></small>
            <button type="button" onClick={() => setCode('UNITED10')}>UNITED10 (10%)</button>
            <button type="button" onClick={() => setCode('OLYMPIC2026')}>OLYMPIC2026 (15%)</button>
          </div>
        </form>
      )}
    </div>
  );
}

/**
 * Dispatch Estimator & Delivery Slot Selector Field
 */
export function DeliverySlotSelector() {
  const [selectedSlot, setSelectedSlot] = useState('morning');
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  const slots = [
    {
      id: 'morning',
      time: '09:00 AM – 01:00 PM',
      label: { en: 'Morning Slot', ar: 'الفترة الصباحية' },
      note: { en: 'Early training drop-off', ar: 'تسليم مناسب للتدريب الصباحي' },
    },
    {
      id: 'afternoon',
      time: '02:00 PM – 06:00 PM',
      label: { en: 'Afternoon Slot', ar: 'فترة بعد الظهر' },
      note: { en: 'Midday standard dispatch', ar: 'تسليم قياسي منتصف اليوم' },
    },
    {
      id: 'evening',
      time: '06:30 PM – 10:00 PM',
      label: { en: 'Evening Slot', ar: 'الفترة المسائية' },
      note: { en: 'Post-work / Club delivery', ar: 'تسليم مسائي بعد الدوام أو بالنادي' },
    },
  ];

  return (
    <div className="store-delivery-customizer-card">
      <div className="store-dispatch-countdown">
        <Clock size={15} />
        <div>
          <strong>
            <StoreCopy value={{ en: 'Fast Dispatch Window', ar: 'نافذة الشحن السريع' }} inline />
          </strong>
          <p>
            <StoreCopy value={{
              en: 'Order within 3 hrs 24 mins for guaranteed Next-Day UAE Arrival.',
              ar: 'اطلب خلال 3 ساعات و24 دقيقة لضمان وصول شحنتك غداً في الإمارات.',
            }} />
          </p>
        </div>
      </div>

      <div className="store-slots-grid">
        <label className="store-slot-heading">
          <Calendar size={14} />
          <StoreCopy value={{ en: 'Preferred Delivery Window', ar: 'نافذة التوصيل المفضلة' }} inline />
        </label>
        <div className="store-slots-row">
          {slots.map((slot) => (
            <button
              key={slot.id}
              type="button"
              className={`store-slot-card ${selectedSlot === slot.id ? 'is-active' : ''}`}
              onClick={() => setSelectedSlot(slot.id)}
            >
              <div className="store-slot-radio" aria-hidden="true" />
              <div>
                <strong><StoreCopy value={slot.label} /></strong>
                <span className="store-slot-time">{slot.time}</span>
                <small><StoreCopy value={slot.note} /></small>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="store-gift-wrap-section">
        <label className="store-gift-toggle">
          <input
            type="checkbox"
            checked={giftWrap}
            onChange={(e) => setGiftWrap(e.target.checked)}
          />
          <span className="store-gift-label">
            <Gift size={16} />
            <StoreCopy value={{
              en: 'Include Luxury United Sports Gift Box & Custom Card',
              ar: 'تضمين علبة هدايا رياضية فاخرة وبطاقة تهنئة مخصصة',
            }} inline />
          </span>
        </label>

        {giftWrap && (
          <div className="store-gift-input-wrap">
            <label>
              <StoreCopy value={{
                en: 'Personalized Athlete Greeting / Coach Message:',
                ar: 'رسالة إهداء شخصية للرياضي / تشجيع من المدرب:',
              }} inline />
              <textarea
                rows={2}
                placeholder="e.g. Best of luck in the national qualifiers! Proud of you."
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Athlete Membership Tier & Loyalty Card
 */
export function AthleteRewardTierCard() {
  return (
    <article className="store-genius-card store-reward-tier-card">
      <div className="store-reward-foil-effect" aria-hidden="true" />
      <header className="store-reward-header">
        <div className="store-reward-brand">
          <Award size={20} className="store-reward-gold-icon" />
          <div>
            <span className="store-reward-tier-name">
              <StoreCopy value={{ en: 'OLYMPIAN GOLD TIER', ar: 'عضوية النخبة الأولمبية الذهبية' }} inline />
            </span>
            <small>ID: UOS-ATH-8842-AE</small>
          </div>
        </div>
        <div className="store-reward-badge">
          <Flame size={13} />
          <span>Active Pro</span>
        </div>
      </header>

      <div className="store-reward-points-block">
        <div>
          <span className="store-reward-pts-num">1,850</span>
          <span className="store-reward-pts-lbl">
            <StoreCopy value={{ en: 'Performance Points', ar: 'نقاط الأداء المكتسبة' }} inline />
          </span>
        </div>
        <div className="store-reward-value">
          <StoreCopy value={{ en: 'Cash Value: AED 185.00', ar: 'القيمة النقدية: 185.00 درهم' }} inline />
        </div>
      </div>

      <div className="store-reward-progress-block">
        <div className="store-reward-progress-labels">
          <span><StoreCopy value={{ en: 'Next: Platinum Champion Tier', ar: 'المستوى التالي: البلاتيني للبطولات' }} inline /></span>
          <strong>82% (150 pts left)</strong>
        </div>
        <div className="store-reward-progress-bar">
          <div className="store-reward-progress-fill" style={{ width: '82%' }} />
        </div>
      </div>

      <div className="store-reward-perks">
        <div><Check size={12} /><StoreCopy value={{ en: 'Free UAE Priority Express Delivery', ar: 'شحن سريع أولوية مجاني في الإمارات' }} inline /></div>
        <div><Check size={12} /><StoreCopy value={{ en: 'Early 48-Hour Drop Access', ar: 'أسبقية الحجز 48 ساعة للمجموعات الجديدة' }} inline /></div>
        <div><Check size={12} /><StoreCopy value={{ en: 'Dedicated Olympic Sizing Fitting', ar: 'جلسة ملاءمة وتحديد مقاسات خاصة' }} inline /></div>
      </div>
    </article>
  );
}

/**
 * Live Order Progress Tracker Card
 */
export function OrderProgressTrackerCard() {
  const steps = [
    { label: { en: 'Order Confirmed', ar: 'تم تأكيد الطلب' }, time: '10:45 AM', done: true },
    { label: { en: 'Quality & Sizing Check', ar: 'فحص الجودة والمقاس' }, time: '01:20 PM', done: true },
    { label: { en: 'Out with Olympic Courier', ar: 'خرج مع المندوب السريع' }, time: '04:15 PM', done: true, active: true },
    { label: { en: 'Delivered to Door', ar: 'تم التسليم بنجاح' }, time: 'Expected ~ 07:00 PM', done: false },
  ];

  return (
    <div className="store-order-tracker-card">
      <header className="store-tracker-header">
        <div>
          <span className="store-card-kicker">
            <Truck size={13} />
            <StoreCopy value={{ en: 'LIVE DISPATCH MONITOR', ar: 'متابعة الشحن والتوصيل الفوري' }} inline />
          </span>
          <h4>Order #UOS-99412</h4>
        </div>
        <span className="store-tracker-status-pill">
          <Activity size={12} />
          <StoreCopy value={{ en: 'On Route', ar: 'في الطريق' }} inline />
        </span>
      </header>

      <div className="store-tracker-timeline">
        {steps.map((step) => (
          <div
            key={step.label.en}
            className={`store-tracker-step ${step.done ? 'is-done' : ''} ${step.active ? 'is-active' : ''}`}
          >
            <div className="store-step-indicator">
              {step.done ? <Check size={12} /> : <span className="store-step-dot" />}
            </div>
            <div className="store-step-text">
              <strong><StoreCopy value={step.label} /></strong>
              <small>{step.time}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
