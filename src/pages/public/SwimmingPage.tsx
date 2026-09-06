import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Trophy, Dumbbell, Target, Sparkles, Waves, Heart } from 'lucide-react';
import { UosImage } from '../../components/public/UosImage';
import { useUiSettings } from '../../ui/theme/useUiSettings';
import { Sports3DIcon } from '../../design/sports3d';

export function SwimmingPage() {
  const { bilingualOrder } = useUiSettings();
  const isAr = bilingualOrder === 'ar-first';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const pillars = [
    {
      icon: <Waves className="text-amber-400" size={22} />,
      titleAr: 'الثقة في الماء والتكيف البيئي',
      titleEn: 'Water Confidence & Familiarity',
      descAr: 'بناء الألفة مع الماء والتخلص من التوتر لضمان استرخاء العضلات أثناء السباحة.',
      descEn: 'Building natural water comfort, reducing tension, and encouraging muscle relaxation.',
    },
    {
      icon: <Target className="text-amber-400" size={22} />,
      titleAr: 'دقة التكنيك والانسيابية',
      titleEn: 'Technical Precision & Streamlining',
      descAr: 'التركيز على محاذاة الجسم، حركة الذراعين، وضربات الأرجل الفعالة.',
      descEn: 'Focusing on streamline body alignment, efficient arm catch, and rhythmic kicking.',
    },
    {
      icon: <Heart className="text-amber-400" size={22} />,
      titleAr: 'التحكم في التنفس والسعة الرئوية',
      titleEn: 'Breathing Rhythm & Capacity',
      descAr: 'تدريب السباح على إيقاع الشهيق والزفير المنتظم تحت الماء دون إجهاد.',
      descEn: 'Cultivating controlled bilateral breathing rhythms and lung endurance underwater.',
    },
    {
      icon: <Dumbbell className="text-amber-400" size={22} />,
      titleAr: 'القوة العضلية والتحمل العام',
      titleEn: 'Endurance & Core Stability',
      descAr: 'تطوير القوة الأساسية للظهر والكتفين والقدرة على السباحة لمسافات أطول.',
      descEn: 'Developing upper body strength, core stability, and sustained aerobic stamina.',
    },
    {
      icon: <ShieldCheck className="text-amber-400" size={22} />,
      titleAr: 'معايير الأمان والسلامة المائية',
      titleEn: 'Aquatic Safety & Awareness',
      descAr: 'إتقان مهارات النجاة الذاتية والسلامة المائية كأولوية في جميع المراحل.',
      descEn: 'Mastering personal survival skills and aquatic safety protocols at every level.',
    },
  ];

  return (
    <div className="uos-public-page bg-[#07080b] text-neutral-100 overflow-hidden">
      
      {/* 1. HERO SECTION (UOS_13_SWIMMING_HERO) */}
      <section className="relative min-h-[70vh] lg:min-h-[78vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <UosImage
            assetKey="UOS_13_SWIMMING_HERO"
            aspectRatio="auto"
            priority
            className="w-full h-full !rounded-none"
            imageClassName="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#07080b]/75 backdrop-blur-[1px] z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-transparent to-[#07080b]/50 z-10" />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
          <Link
            to="/sports"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors font-tajawal bg-black/40 px-3 py-1.5 rounded-full border border-amber-500/20"
          >
            <ArrowLeft size={14} className={isAr ? 'rotate-180' : ''} />
            <span>{isAr ? 'العودة إلى جميع الرياضات' : 'Back to All Sports'}</span>
          </Link>

          <div className="flex justify-center">
            <div className="p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-amber-500/30">
              <Sports3DIcon sport="swimming" size="lg" decorative />
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-tajawal leading-tight drop-shadow-lg">
            {isAr ? 'مسار السباحة: إيقاع، تنفس، وثقة مائية' : 'Swimming Pathway: Rhythm, Breathing, and Water Mastery'}
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-tajawal leading-relaxed">
            {isAr
              ? 'برنامج تدريبي متدرج يهدف إلى تطوير الانسيابية، التوافق العضلي، والتحمل البدني في مسبح آمن ومجهز.'
              : 'A progressive curriculum engineered to cultivate fluidity, neuromuscular coordination, and endurance safely.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a href="#register-interest" className="uos-btn-gold w-full sm:w-auto">
              <span>{isAr ? 'سجل اهتمامك بالسباحة' : 'Register Interest'}</span>
              <ArrowIcon size={16} />
            </a>
            <Link to="/programs" className="uos-btn-outline w-full sm:w-auto">
              <span>{isAr ? 'عرض مستويات التدريب' : 'View Levels'}</span>
              <ArrowIcon size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TECHNIQUE & HYDRODYNAMICS (UOS_14_SWIMMING_TECHNIQUE) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="uos-pill uos-pill-gold font-tajawal">
              {isAr ? 'التكنيك والانسيابية' : 'Technique & Hydrodynamics'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-tajawal leading-tight">
              {isAr ? 'الانسيابية وقوة السحب في الماء' : 'Hydrodynamics & Stroke Efficiency'}
            </h2>
            <div className="space-y-4 text-neutral-300 text-sm sm:text-base font-tajawal leading-relaxed">
              <p>
                {isAr
                  ? 'ترتكز منهجية تدريب السباحة لدينا على تعليم السباح كيفية تقليل مقاومة الماء أولاً، ثم تطبيق القوة الحركية بكفاءة عبر التكنيك الصحيح لضربات الذراعين والتنفس الجانبي المتناغم.'
                  : 'Our swimming methodology emphasizes minimizing water drag first, then generating efficient propulsion through refined stroke mechanics and rhythmic breathing.'}
              </p>
              <p>
                {isAr
                  ? 'يتدرج السباح عبر الأنواع الأربعة (الحرة، الظهر، الصدر، الفراشة) وفق تقييم فردي لكل مرحلة.'
                  : 'Swimmers progress across the four competitive strokes (Freestyle, Backstroke, Breaststroke, Butterfly) based on individual milestone evaluations.'}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <UosImage
              assetKey="UOS_14_SWIMMING_TECHNIQUE"
              aspectRatio="3/2"
              withLightbox
              className="rounded-2xl shadow-2xl border border-amber-500/30 overflow-hidden"
            />
            <div className="mt-3 text-center text-xs text-neutral-400 font-tajawal">
              {isAr ? 'تطوير تكنيك السباحة الحرة وضبط إيقاع التنفس' : 'Freestyle technique refinement and stroke pacing'}
            </div>
          </div>

        </div>
      </section>

      {/* 3. 5 CORE PILLARS */}
      <section className="py-20 bg-[#0a0b0e] border-y border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="uos-pill uos-pill-gold font-tajawal">
              {isAr ? 'ركائز السباحة' : 'Core Swimming Pillars'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-tajawal">
              {isAr ? 'الأسس الخمسة لإتقان السباحة' : 'Five Foundations for Swimming Mastery'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#0d0f14] border border-neutral-800 hover:border-amber-500/30 transition-colors space-y-3">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 w-fit">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white font-tajawal">
                  {isAr ? item.titleAr : item.titleEn}
                </h3>
                <p className="text-sm text-neutral-400 font-tajawal leading-relaxed">
                  {isAr ? item.descAr : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. REGISTER INTEREST FORM */}
      <section id="register-interest" className="py-20 bg-[#0a0b0e]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <span className="uos-pill uos-pill-gold font-tajawal">
              {isAr ? 'الانضمام والتقييم' : 'Enrollment & Evaluation'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-tajawal">
              {isAr ? 'احجز موعد تقييم مستوى السباحة' : 'Book a Swimming Level Assessment'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-tajawal">
              {isAr ? 'سيقوم مدربونا بتحديد المسار الأنسب لطفلك بناءً على جاهزيته المائية.' : 'Our coaches will evaluate water comfort and assign the optimal progression group.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-[#0d0f14] border border-amber-500/20 space-y-4 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-300 font-tajawal mb-1.5">{isAr ? 'الاسم الكامل' : 'Full Name'}</label>
                <input required type="text" placeholder={isAr ? 'اسم ولي الأمر أو السباح' : 'Name'} className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 text-sm font-tajawal" />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-300 font-tajawal mb-1.5">{isAr ? 'البريد الإلكتروني' : 'Email Address'}</label>
                <input required type="email" placeholder="example@domain.com" className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 text-sm font-sans" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 font-tajawal mb-1.5">{isAr ? 'المستوى الحالي في السباحة' : 'Current Swimming Experience'}</label>
              <input type="text" placeholder={isAr ? 'مثال: مبتدئ تماماً / يجيد السباحة الحرة مسافة قصيرة' : 'e.g. Beginner / Basic freestyle'} className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 text-sm font-tajawal" />
            </div>

            <button type="submit" className="uos-btn-gold w-full !py-3 !text-sm">
              <span>{isAr ? 'تأكيد طلب التقييم' : 'Submit Assessment Request'}</span>
              <ArrowIcon size={16} />
            </button>

            {formSubmitted && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 text-amber-300 text-xs font-tajawal animate-fade-in">
                <CheckCircle2 size={18} className="shrink-0" />
                <span>{isAr ? 'تم استلام طلبك! سنتواصل معك قريباً لتحديد موعد التقييم بالمسبح.' : 'Thank you! We will get in touch to schedule your pool assessment.'}</span>
              </div>
            )}
          </form>
        </div>
      </section>

    </div>
  );
}
