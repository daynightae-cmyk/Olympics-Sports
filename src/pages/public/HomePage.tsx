import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Trophy, Users, Dumbbell, Sparkles, Target, CheckCircle2 } from 'lucide-react';
import { UosImage } from '../../components/public/UosImage';
import { MediaRegistry } from '../../data/media/publicMediaRegistry';
import { useUiSettings } from '../../ui/theme/useUiSettings';
import { SportCard } from '../../components/public/cards';
import type { UosSportSlug, Sport3DId } from '../../design/sports3d/sports3d.types';

export function HomePage() {
  const { bilingualOrder } = useUiSettings();
  const isAr = bilingualOrder === 'ar-first';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const sportsList = [
    {
      id: 'football' as UosSportSlug | Sport3DId,
      asset: MediaRegistry.UOS_02_FOOTBALL_CARD,
      link: '/sports/football',
      tagAr: 'الأكثر إقبالاً',
      tagEn: 'Featured Sport',
      featured: true,
    },
    {
      id: 'swimming' as UosSportSlug | Sport3DId,
      asset: MediaRegistry.UOS_03_SWIMMING_CARD,
      link: '/sports/swimming',
      tagAr: 'مسبح أولمبي',
      tagEn: 'Olympic Pool',
    },
    {
      id: 'basketball' as UosSportSlug | Sport3DId,
      asset: MediaRegistry.UOS_04_BASKETBALL_CARD,
      link: '/sports/basketball',
      tagAr: 'صالة مغطاة',
      tagEn: 'Indoor Court',
    },
    {
      id: 'tennis' as UosSportSlug | Sport3DId,
      asset: MediaRegistry.UOS_05_TENNIS_CARD,
      link: '/sports/tennis',
      tagAr: 'تدريب فردي وزوجي',
      tagEn: 'Individual & Pair',
    },
    {
      id: 'gymnastics' as UosSportSlug | Sport3DId,
      asset: MediaRegistry.UOS_06_GYMNASTICS_CARD,
      link: '/sports/gymnastics',
      tagAr: 'مرونة ورشاقة',
      tagEn: 'Agility & Balance',
    },
    {
      id: 'martial-arts' as UosSportSlug | Sport3DId,
      asset: MediaRegistry.UOS_07_MARTIAL_ARTS_CARD,
      link: '/sports/martial-arts',
      tagAr: 'انضباط ودفاع',
      tagEn: 'Discipline & Defense',
    },
  ];

  return (
    <div className="uos-public-page bg-[#07080b] text-neutral-100 overflow-hidden">
      
      {/* 1. HERO SECTION (UOS_01_HOME_HERO) */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Responsive Image */}
        <div className="absolute inset-0 z-0">
          <UosImage
            assetKey="UOS_01_HOME_HERO"
            aspectRatio="auto"
            priority
            className="w-full h-full !rounded-none"
            imageClassName="w-full h-full object-cover"
          />
          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-[#07080b]/60 to-[#07080b]/40 z-10" />
          <div className="absolute inset-0 bg-radial-vignette opacity-75 z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col items-center text-center">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-amber-500/30 backdrop-blur-md mb-6 animate-fade-in shadow-xl">
            <Sparkles size={14} className="text-amber-400" />
            <span className="text-xs sm:text-sm font-bold tracking-wide text-amber-300 font-tajawal">
              United Olympics Sports — يونايتد أوليمبيكس سبورت
            </span>
          </div>

          {/* H1 Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 max-w-4xl font-tajawal leading-tight drop-shadow-lg">
            {isAr ? 'من الطفولة نصنع الأبطال' : 'From Childhood, We Build Champions'}
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl font-tajawal leading-relaxed mb-10 text-balance drop-shadow">
            {isAr
              ? 'بيئة رياضية متكاملة تهدف إلى تطوير المهارات، بناء الانضباط، تعزيز الثقة وغرس روح العمل الجماعي.'
              : 'A structured environment for athletic development, skill building, discipline, confidence, and teamwork.'}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link to="/sports" className="uos-btn-gold w-full sm:w-auto">
              <span>{isAr ? 'استكشف الرياضات' : 'Explore Sports'}</span>
              <ArrowIcon size={18} />
            </Link>
            <Link to="/programs" className="uos-btn-outline w-full sm:w-auto">
              <span>{isAr ? 'اكتشف برامجنا' : 'Explore Programs'}</span>
              <ArrowIcon size={18} />
            </Link>
          </div>

          {/* Quick Trust Badges */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 text-xs sm:text-sm text-neutral-300">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
              <span className="font-tajawal">{isAr ? 'تدريب منهجي معتمد' : 'Verified Training System'}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
              <span className="font-tajawal">{isAr ? 'مسارات تدريب متدرجة' : 'Progressive Pathways'}</span>
            </div>
            <div className="flex items-center justify-center gap-2 col-span-2 sm:col-span-1">
              <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
              <span className="font-tajawal">{isAr ? 'بيئة آمنة وملهمة' : 'Safe & Inspiring Culture'}</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. VALUE STRIP */}
      <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#0d0f14]/90 backdrop-blur-xl border border-amber-500/25 rounded-2xl p-6 sm:p-8 shadow-2xl">
          
          <div className="flex items-start gap-4 p-3 rounded-xl">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
              <Dumbbell size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-base text-white font-tajawal">
                {isAr ? 'تدريب منظم' : 'Structured Training'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-tajawal leading-relaxed">
                {isAr
                  ? 'منهجية واضحة تركز على الأساسيات الحركية والمهارية وفق مراحل النمو.'
                  : 'Clear curriculum focused on fundamental movement and technical skills.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-3 rounded-xl">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
              <Target size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-base text-white font-tajawal">
                {isAr ? 'نمو تدريجي' : 'Progressive Growth'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-tajawal leading-relaxed">
                {isAr
                  ? 'تقييم مستمر ومسارات تتناسب مع تطور وجاهزية كل رياضي ناشئ.'
                  : 'Continuous evaluation and progressive pathways tailored to readiness.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-3 rounded-xl">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
              <Users size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-base text-white font-tajawal">
                {isAr ? 'روح الفريق' : 'Team Spirit'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-tajawal leading-relaxed">
                {isAr
                  ? 'بناء الشخصية الرياضية، الاحترام المتبادل والمسؤولية المشتركة.'
                  : 'Character building, mutual respect, and shared responsibility.'}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CHOOSE YOUR SPORT (UOS_02 to UOS_07) */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="uos-pill uos-pill-gold font-tajawal">
              {isAr ? 'الرياضات المعتمدة' : 'Official Disciplines'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-tajawal">
              {isAr ? 'اختر رياضتك وابدأ رحلتك' : 'Choose Your Sport & Begin'}
            </h2>
          </div>
          <Link
            to="/sports"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors font-tajawal"
          >
            <span>{isAr ? 'عرض جميع الرياضات' : 'View All Sports'}</span>
            <ArrowIcon size={16} />
          </Link>
        </div>

        {/* Grid of Sports */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sportsList.map((sport) => (
            <SportCard
              key={sport.id}
              sportId={sport.id}
              asset={sport.asset}
              link={sport.link}
              tagAr={sport.tagAr}
              tagEn={sport.tagEn}
              featured={sport.featured}
            />
          ))}
        </div>
      </section>

      {/* 4. HOW WE BUILD PROGRESS (UOS_08_PROGRESS_STORY) */}
      <section className="py-20 lg:py-28 bg-[#0a0b0e] border-y border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story Visual (3:2) */}
            <div className="lg:col-span-6 relative">
              <UosImage
                assetKey="UOS_08_PROGRESS_STORY"
                aspectRatio="3/2"
                withLightbox
                className="shadow-2xl border border-amber-500/30 rounded-2xl overflow-hidden"
              />
              <div className="absolute -bottom-4 -end-4 bg-[#0d0f14] border border-amber-500/30 rounded-xl p-4 shadow-xl hidden sm:flex items-center gap-3">
                <Trophy className="text-amber-400" size={24} />
                <div>
                  <div className="text-xs text-neutral-400 font-tajawal">{isAr ? 'منهج التطوير' : 'Methodology'}</div>
                  <div className="text-sm font-bold text-white font-tajawal">{isAr ? '3 مراحل متدرجة' : '3 Progressive Stages'}</div>
                </div>
              </div>
            </div>

            {/* Story Content & 3 Stages */}
            <div className="lg:col-span-6 space-y-6">
              <span className="uos-pill uos-pill-gold font-tajawal">
                {isAr ? 'فلسفة التطوير' : 'Coaching Philosophy'}
              </span>
              
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-tajawal leading-tight">
                {isAr ? 'كيف نبني التقدم خطوة بخطوة' : 'How We Build Progress, Step by Step'}
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 font-tajawal leading-relaxed">
                {isAr
                  ? 'التطور ليس صدفة، بل مسار مدروس يبدأ بالأساس الحركي، ويمر بالتطوير الفني، ويصل إلى الأداء الواثق في بيئة تشجع على الانضباط والمثابرة.'
                  : 'Athletic progress is not accidental. It is a deliberate progression starting with foundational movement, technical mastery, and culminating in confident performance.'}
              </p>

              {/* 3 Step Stack */}
              <div className="space-y-4 pt-2">
                <div className="flex gap-4 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                  <span className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold flex items-center justify-center shrink-0 text-sm">
                    01
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base font-tajawal">
                      {isAr ? 'المرحلة التأسيسية (Foundation)' : 'Stage 1: Foundation'}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-400 font-tajawal mt-1">
                      {isAr
                        ? 'تنمية المهارات الحركية الأساسية، التوافق العضلي العصبي، وغرس حب الممارسة والنشاط.'
                        : 'Building fundamental movement skills, neuromuscular coordination, and love for activity.'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                  <span className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold flex items-center justify-center shrink-0 text-sm">
                    02
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base font-tajawal">
                      {isAr ? 'المرحلة التطويرية (Development)' : 'Stage 2: Development'}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-400 font-tajawal mt-1">
                      {isAr
                        ? 'التكرار الهادف للتكنيك، فهم قواعد اللعبة، وتطوير التكتيك الفردي والتواصل الجماعي.'
                        : 'Purposeful technical repetition, tactical understanding, and team communication.'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                  <span className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold flex items-center justify-center shrink-0 text-sm">
                    03
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base font-tajawal">
                      {isAr ? 'مرحلة الأداء والتميز (Performance)' : 'Stage 3: Performance'}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-400 font-tajawal mt-1">
                      {isAr
                        ? 'الجاهزية العالية للمنافسة، الثبات الذهني، واتخاذ القرارات السليمة تحت الضغط.'
                        : 'High competitive readiness, mental composure, and quick decision-making under pressure.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link to="/coaches" className="uos-btn-gold !text-xs">
                  <span>{isAr ? 'اقرأ عن فلسفة التدريب' : 'Read Coaching Philosophy'}</span>
                  <ArrowIcon size={14} />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. FIELD MOMENTS (GALLERY WITH APPROVED DOM IMAGES) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="uos-pill uos-pill-gold font-tajawal">
            {isAr ? 'معرض أرض التدريب' : 'Field Moments'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-tajawal">
            {isAr ? 'لحظات من أرض التدريب' : 'Moments from the Pitch & Court'}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-tajawal">
            {isAr
              ? 'صور معتمدة تنقل حيوية وانضباط التدريب داخل United Olympics Sports.'
              : 'Verified imagery capturing the discipline and vitality of our athletes.'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <UosImage assetKey="UOS_12_FOOTBALL_TECHNIQUE" aspectRatio="3/2" withLightbox className="rounded-xl shadow-lg border border-neutral-800 hover:border-amber-500/40 transition-colors" />
          <UosImage assetKey="UOS_14_SWIMMING_TECHNIQUE" aspectRatio="3/2" withLightbox className="rounded-xl shadow-lg border border-neutral-800 hover:border-amber-500/40 transition-colors" />
          <UosImage assetKey="UOS_16_BASKETBALL_DECISION" aspectRatio="3/2" withLightbox className="rounded-xl shadow-lg border border-neutral-800 hover:border-amber-500/40 transition-colors" />
          <UosImage assetKey="UOS_10_ABOUT_REFLECTION" aspectRatio="3/2" withLightbox className="rounded-xl shadow-lg border border-neutral-800 hover:border-amber-500/40 transition-colors" />
        </div>
      </section>

      {/* 6. CLOSING CTA (UOS_20_CLOSING_CTA) */}
      <section className="relative py-24 lg:py-32 overflow-hidden border-t border-amber-500/20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <UosImage
            assetKey="UOS_20_CLOSING_CTA"
            aspectRatio="auto"
            className="w-full h-full !rounded-none"
            imageClassName="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#07080b]/80 backdrop-blur-[2px] z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-transparent to-[#07080b]/60 z-10" />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="uos-pill uos-pill-gold font-tajawal">
            {isAr ? 'انضم إلينا' : 'Join the Movement'}
          </span>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-tajawal leading-tight">
            {isAr ? 'خطوتك التالية تبدأ هنا' : 'Your Next Step Starts Here'}
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-tajawal max-w-xl mx-auto leading-relaxed">
            {isAr
              ? 'اكتشف البيئة الرياضية التي تساعدك على التطور بثقة وانضباط.'
              : 'Discover the sports environment that helps you grow with confidence and discipline.'}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="uos-btn-gold w-full sm:w-auto">
              <span>{isAr ? 'تواصل معنا' : 'Contact Us'}</span>
              <ArrowIcon size={18} />
            </Link>
            <Link to="/programs" className="uos-btn-outline w-full sm:w-auto">
              <span>{isAr ? 'عرض البرامج' : 'View Programs'}</span>
              <ArrowIcon size={18} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
