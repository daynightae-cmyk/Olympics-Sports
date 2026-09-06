import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Trophy, Dumbbell, Target, Sparkles, Zap, Users } from 'lucide-react';
import { UosImage } from '../../components/public/UosImage';
import { useUiSettings } from '../../ui/theme/useUiSettings';
import { Sports3DIcon } from '../../design/sports3d';

export function BasketballPage() {
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
      icon: <Zap className="text-amber-400" size={22} />,
      titleAr: 'التحكم بالكرة والمراوغة الديناميكية',
      titleEn: 'Ball Handling & Dynamic Dribbling',
      descAr: 'تطوير مهارة المحاورة بكلتا اليدين، وتغيير السرعة والاتجاه بثقة.',
      descEn: 'Developing ambidextrous handles, rapid pace variations, and controlled directional changes.',
    },
    {
      icon: <Target className="text-amber-400" size={22} />,
      titleAr: 'دقة التصويب وتوافق الحركة',
      titleEn: 'Shooting Mechanics & Form',
      descAr: 'التركيز على ميكانيكا التصويب السليم من الثبات والحركة ومن مسافات متنوعة.',
      descEn: 'Building sound shooting form, footwork setup, and consistent release mechanics.',
    },
    {
      icon: <Users className="text-amber-400" size={22} />,
      titleAr: 'قراءة الملعب واتخاذ القرار السريع',
      titleEn: 'Court Vision & Fast Decision-Making',
      descAr: 'تدريب اللاعب على الرؤية الشاملة للملعب، التمرير الذكي، واستغلال الثغرات.',
      descEn: 'Cultivating court vision, crisp passing lanes, and split-second tactical decisions.',
    },
    {
      icon: <Dumbbell className="text-amber-400" size={22} />,
      titleAr: 'اللياقة اللاهوائية والارتقاء',
      titleEn: 'Explosiveness & Vertical Jump',
      descAr: 'تمارين نوعية لتعزيز قوة القفز، سرعة الانطلاق، والرشاقة الدفاعية.',
      descEn: 'Plyometric and agility drills enhancing acceleration, lateral quickness, and vertical leap.',
    },
    {
      icon: <ShieldCheck className="text-amber-400" size={22} />,
      titleAr: 'الانضباط التكتيكي والدفاع الفردي',
      titleEn: 'Tactical Discipline & Defensive Stance',
      descAr: 'إتقان التمركز الدفاعي السليم، إغلاق زوايا التمرير، والمتابعة الهجومية والدفاعية.',
      descEn: 'Mastering solid defensive stance, boxing out, and disciplined team rotation.',
    },
  ];

  return (
    <div className="uos-public-page bg-[#07080b] text-neutral-100 overflow-hidden">
      
      {/* 1. HERO SECTION (UOS_15_BASKETBALL_HERO) */}
      <section className="relative min-h-[70vh] lg:min-h-[78vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <UosImage
            assetKey="UOS_15_BASKETBALL_HERO"
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
              <Sports3DIcon sport="basketball" size="lg" decorative />
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-tajawal leading-tight drop-shadow-lg">
            {isAr ? 'مسار كرة السلة: سرعة، تصويب، وتناغم جماعي' : 'Basketball Pathway: Speed, Shooting, and Team Chemistry'}
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-tajawal leading-relaxed">
            {isAr
              ? 'تطوير ردود الفعل السريعة، إتقان المراوغة والتصويب، وبناء التواصل الفعال على أرض الصالة.'
              : 'Developing rapid reaction times, mastering ball-handling and shooting, and instilling dynamic team communication.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a href="#register-interest" className="uos-btn-gold w-full sm:w-auto">
              <span>{isAr ? 'سجل اهتمامك بكرة السلة' : 'Register Interest'}</span>
              <ArrowIcon size={16} />
            </a>
            <Link to="/programs" className="uos-btn-outline w-full sm:w-auto">
              <span>{isAr ? 'عرض البرامج' : 'View Programs'}</span>
              <ArrowIcon size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TEAMWORK & DECISION MAKING (UOS_16_BASKETBALL_DECISION) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="uos-pill uos-pill-gold font-tajawal">
              {isAr ? 'الرؤية والعمل الجماعي' : 'Vision & Team Play'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-tajawal leading-tight">
              {isAr ? 'قراءة الملعب والتناغم السريع' : 'Court Vision & Cohesive Decision-Making'}
            </h2>
            <div className="space-y-4 text-neutral-300 text-sm sm:text-base font-tajawal leading-relaxed">
              <p>
                {isAr
                  ? 'كرة السلة لعبة تعتمد على السرعة واتخاذ القرارات في أجزاء من الثانية. يركز برنامجنا على تدريب اللاعبين على قراءة تحركات الخصم، التحرك الفعال بدون كرة، وخلق المساحات المناسبة للتسجيل.'
                  : 'Basketball is a game of lightning-fast decision-making. Our curriculum emphasizes reading opponent schemes, executing timely off-ball cuts, and creating optimal scoring opportunities.'}
              </p>
              <p>
                {isAr
                  ? 'يتعلم اللاعبون أهمية التمرير الإضافي والتواصل الصوتي المستمر كركيزة أساسية للنجاح الجماعي.'
                  : 'Players learn the value of the extra pass, floor spacing, and vocal communication as pillars of team victory.'}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <UosImage
              assetKey="UOS_16_BASKETBALL_DECISION"
              aspectRatio="3/2"
              withLightbox
              className="rounded-2xl shadow-2xl border border-amber-500/30 overflow-hidden"
            />
            <div className="mt-3 text-center text-xs text-neutral-400 font-tajawal">
              {isAr ? 'تدريبات جماعية متقدمة على التمرير وحركة الفريق' : 'Cohesive youth drills focusing on passing lanes and court motion'}
            </div>
          </div>

        </div>
      </section>

      {/* 3. 5 CORE PILLARS */}
      <section className="py-20 bg-[#0a0b0e] border-y border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="uos-pill uos-pill-gold font-tajawal">
              {isAr ? 'أسس كرة السلة' : 'Core Basketball Pillars'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-tajawal">
              {isAr ? 'خمس ركائز للتفوق في الصالة المغطاة' : 'Five Pillars for On-Court Excellence'}
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
              {isAr ? 'التسجيل والاستفسار' : 'Registration & Inquiry'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-tajawal">
              {isAr ? 'انضم إلى تدريبات كرة السلة' : 'Join Basketball Training'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-tajawal">
              {isAr ? 'سجل بياناتك للتواصل معك وتحديد موعد جلسة التقييم والتدريب.' : 'Register for age group availability and skill assessment scheduling.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-[#0d0f14] border border-amber-500/20 space-y-4 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-300 font-tajawal mb-1.5">{isAr ? 'الاسم الكامل' : 'Full Name'}</label>
                <input required type="text" placeholder={isAr ? 'الاسم' : 'Name'} className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 text-sm font-tajawal" />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-300 font-tajawal mb-1.5">{isAr ? 'البريد الإلكتروني' : 'Email Address'}</label>
                <input required type="email" placeholder="example@domain.com" className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 text-sm font-sans" />
              </div>
            </div>

            <button type="submit" className="uos-btn-gold w-full !py-3 !text-sm">
              <span>{isAr ? 'إرسال طلب الانضمام' : 'Submit Registration'}</span>
              <ArrowIcon size={16} />
            </button>

            {formSubmitted && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 text-amber-300 text-xs font-tajawal animate-fade-in">
                <CheckCircle2 size={18} className="shrink-0" />
                <span>{isAr ? 'تم استلام طلبك! سيقوم الكادر التدريبي بالتواصل معك قريباً.' : 'Thank you! We will get in touch with you shortly.'}</span>
              </div>
            )}
          </form>
        </div>
      </section>

    </div>
  );
}
