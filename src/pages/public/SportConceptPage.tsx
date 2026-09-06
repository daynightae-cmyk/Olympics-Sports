import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Trophy, Dumbbell, Target, Sparkles, Zap, Heart } from 'lucide-react';
import { UosImage } from '../../components/public/UosImage';
import { useUiSettings } from '../../ui/theme/useUiSettings';
import { Sports3DIcon } from '../../design/sports3d';
import { UOS_PUBLIC_MEDIA } from '../../data/media/publicMediaRegistry';

interface SportConceptPageProps {
  sportId: 'tennis' | 'gymnastics' | 'martial-arts';
}

export function SportConceptPage({ sportId }: SportConceptPageProps) {
  const { bilingualOrder } = useUiSettings();
  const isAr = bilingualOrder === 'ar-first';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const sportConfigs = {
    tennis: {
      heroKey: 'UOS_17_TENNIS_HERO',
      titleAr: 'مسار التنس: تركيز، توقيت، ودقة ضربات',
      titleEn: 'Tennis Pathway: Focus, Timing, and Shot Precision',
      descAr: 'صقل حركة القدمين، توقيت التلامس مع الكرة، والثبات الذهني في كل نقطة وإرسال.',
      descEn: 'Refining agile footwork, contact-point timing, and mental resilience point after point.',
      aboutHeadingAr: 'التكرار الذكي والانضباط الفردي',
      aboutHeadingEn: 'Intelligent Repetition & Individual Discipline',
      aboutTextAr: 'رياضة التنس تبني لدى اللاعب التركيز العالي وسرعة الاستجابة الحركية. نركز في تدريباتنا على إتقان الضربات الأساسية (الفورهاند والباكهاند والإرسال) وتطوير التحرك الذكي داخل الملعب.',
      aboutTextEn: 'Tennis fosters peak mental focus and rapid kinetic responses. Our training emphasizes mastering essential strokes (forehand, backhand, serve) and agile court positioning.',
      pillars: [
        {
          icon: <Target className="text-amber-400" size={22} />,
          titleAr: 'حركة القدمين والتمركز السريع',
          titleEn: 'Footwork & Rapid Positioning',
          descAr: 'التدريب على خطوات التعديل والانطلاق السريع نحو الكرة مع المحافظة على التوازن.',
          descEn: 'Split-step fundamentals, rapid recovery, and balanced stroke execution.',
        },
        {
          icon: <Zap className="text-amber-400" size={22} />,
          titleAr: 'توقيت الضربة ودقة التوجيه',
          titleEn: 'Stroke Timing & Directional Control',
          descAr: 'صقل نقطة التلامس المثالية والتحكم في زوايا وعمق الكرة داخل الملعب.',
          descEn: 'Perfecting sweet-spot contact, shot depth, and precise court placement.',
        },
        {
          icon: <ShieldCheck className="text-amber-400" size={22} />,
          titleAr: 'الثبات الذهني وإدارة النقاط',
          titleEn: 'Mental Composure & Match Strategy',
          descAr: 'تطوير الهدوء والتركيز تحت الضغط وإدارة نقاط الإرسال والاستقبال بذكاء.',
          descEn: 'Building poise on crucial points and developing tactical match awareness.',
        },
      ],
    },
    gymnastics: {
      heroKey: 'UOS_18_GYMNASTICS_HERO',
      titleAr: 'مسار الجمباز: اتزان، مرونة، وثقة جسدية',
      titleEn: 'Gymnastics Pathway: Balance, Flexibility, and Physical Confidence',
      descAr: 'بناء الأساس الحركي المتين، التحكم في الفضاء، وتطوير الرشاقة ضمن معايير أمان صارمة.',
      descEn: 'Building solid neuromuscular fundamentals, spatial control, and agility within strict safety protocols.',
      aboutHeadingAr: 'الأساس الحركي الشامل والرشاقة',
      aboutHeadingEn: 'Complete Physical Literacy & Agility',
      aboutTextAr: 'الجمباز هو الأساس لجميع الرياضات. يكتسب الطفل من خلاله التوافق العصبي العضلي، المرونة الفائقة، والوعي الكامل بحركة الجسم في الفضاء تحت إشراف مدربين مؤهلين وأجهزة تدريب آمنة.',
      aboutTextEn: 'Gymnastics forms the cornerstone of athletic movement, teaching body awareness, flexibility, and core strength safely and systematically.',
      pillars: [
        {
          icon: <Heart className="text-amber-400" size={22} />,
          titleAr: 'المرونة والتوافق العضلي',
          titleEn: 'Flexibility & Neuromuscular Coordination',
          descAr: 'تمارين إطالة وتقوية متخصصة لبناء مفاصل قوية ومرونة حركية عالية.',
          descEn: 'Targeted stretching and strengthening to build resilient joints and supple mobility.',
        },
        {
          icon: <Target className="text-amber-400" size={22} />,
          titleAr: 'الاتزان والتحكم في الفضاء',
          titleEn: 'Balance & Spatial Control',
          descAr: 'تطوير الثبات على عارضة التوازن وأجهزة التمرين بحركات متدرجة الأمان.',
          descEn: 'Cultivating balance, core alignment, and spatial awareness on gym apparatus.',
        },
        {
          icon: <ShieldCheck className="text-amber-400" size={22} />,
          titleAr: 'الأمان التام والتدرج المنظم',
          titleEn: 'Absolute Safety & Step-by-Step Progress',
          descAr: 'بيئة تدريبية مجهزة بأعلى مواصفات الحماية لضمان سلامة الرياضي في كل حركة.',
          descEn: 'Padded safety setups and spotted instruction ensuring total athlete well-being.',
        },
      ],
    },
    'martial-arts': {
      heroKey: 'UOS_19_MARTIAL_ARTS_HERO',
      titleAr: 'مسار الفنون القتالية: احترام، انضباط، وقوة داخلية',
      titleEn: 'Martial Arts Pathway: Respect, Discipline, and Inner Strength',
      descAr: 'ثقافة تدريبية ترتكز على ضبط النفس، التركيز الذهني، التكنيك الدفاعي الدقيق والمسؤولية الأخلاقية.',
      descEn: 'A training ethos centered on self-mastery, mental poise, precise defensive technique, and ethical responsibility.',
      aboutHeadingAr: 'الانضباط الذاتي والدفاع المسؤول',
      aboutHeadingEn: 'Self-Mastery & Responsible Defense',
      aboutTextAr: 'الفنون القتالية في United Olympics Sports تُقدم كمنظومة أخلاقية وتربوية تبدأ بالاحترام وتنتهي بالثقة بالنفس. يتعلم الرياضي التحكم في انفعالاته، وتطوير تقنيات دفاعية منظمة دون أي عداوة.',
      aboutTextEn: 'Martial arts is taught as a character-building discipline emphasizing respect, restraint, precision technique, and positive self-confidence.',
      pillars: [
        {
          icon: <ShieldCheck className="text-amber-400" size={22} />,
          titleAr: 'الاحترام والانضباط الأخلاقي',
          titleEn: 'Respect & Ethical Discipline',
          descAr: 'الالتزام بتحية الخصم، احترام المدرب والزملاء، وتطبيق روح الرياضة النبيلة.',
          descEn: 'Upholding dojo etiquette, humility, respect for peers, and strict self-control.',
        },
        {
          icon: <Zap className="text-amber-400" size={22} />,
          titleAr: 'سرعة البديهة والتكنيك الدفاعي',
          titleEn: 'Reflexes & Defensive Mechanics',
          descAr: 'إتقان حركات الصد والتحكم في المسافة وردود الفعل السريعة دون تسرع.',
          descEn: 'Mastering blocking angles, distance management, and measured defensive reflexes.',
        },
        {
          icon: <Trophy className="text-amber-400" size={22} />,
          titleAr: 'تدرج الأحزمة والمسار المتواصل',
          titleEn: 'Belt Progression & Long-term Growth',
          descAr: 'منهج تقييم رسمي يعزز الإنجاز ويحث اللاعب على المثابرة وبلوغ مستويات أعلى.',
          descEn: 'A clear milestone curriculum inspiring dedication, continuous learning, and mastery.',
        },
      ],
    },
  };

  const current = sportConfigs[sportId];

  return (
    <div className="uos-public-page bg-[#07080b] text-neutral-100 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[70vh] lg:min-h-[78vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <UosImage
            assetKey={current.heroKey}
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
              <Sports3DIcon sport={sportId as any} size="lg" decorative />
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-tajawal leading-tight drop-shadow-lg">
            {isAr ? current.titleAr : current.titleEn}
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-tajawal leading-relaxed">
            {isAr ? current.descAr : current.descEn}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a href="#register-interest" className="uos-btn-gold w-full sm:w-auto">
              <span>{isAr ? 'سجل اهتمامك بالرياضة' : 'Register Interest'}</span>
              <ArrowIcon size={16} />
            </a>
            <Link to="/programs" className="uos-btn-outline w-full sm:w-auto">
              <span>{isAr ? 'عرض البرامج' : 'View Programs'}</span>
              <ArrowIcon size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. ABOUT THE PATHWAY */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="uos-pill uos-pill-gold font-tajawal">
            {isAr ? 'منهج التدريب' : 'Training Methodology'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-tajawal leading-tight">
            {isAr ? current.aboutHeadingAr : current.aboutHeadingEn}
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 font-tajawal leading-relaxed">
            {isAr ? current.aboutTextAr : current.aboutTextEn}
          </p>
        </div>
      </section>

      {/* 3. 3 PILLARS */}
      <section className="py-20 bg-[#0a0b0e] border-y border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {current.pillars.map((item, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-[#0d0f14] border border-amber-500/20 space-y-4 hover:border-amber-500/50 transition-colors">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 w-fit">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white font-tajawal">
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
              {isAr ? 'التسجيل والاستفسار' : 'Inquiry & Registration'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-tajawal">
              {isAr ? 'احجز جلستك التجريبية' : 'Book an Introductory Session'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-tajawal">
              {isAr ? 'سجل بياناتك للتواصل معك وتحديد موعد الجلسة الاستكشافية.' : 'Submit your details for trial session and schedule inquiries.'}
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
              <span>{isAr ? 'إرسال طلب الاستفسار' : 'Submit Inquiry'}</span>
              <ArrowIcon size={16} />
            </button>

            {formSubmitted && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 text-amber-300 text-xs font-tajawal animate-fade-in">
                <CheckCircle2 size={18} className="shrink-0" />
                <span>{isAr ? 'تم استلام طلبك بنجاح! سنتواصل معك في أقرب وقت.' : 'Thank you! We will reach out shortly with schedule details.'}</span>
              </div>
            )}
          </form>
        </div>
      </section>

    </div>
  );
}
