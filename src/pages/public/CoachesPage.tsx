import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, ShieldCheck, Heart, Target, Award, Users, BookOpen } from 'lucide-react';
import { UosImage } from '../../components/public/UosImage';
import { useUiSettings } from '../../ui/theme/useUiSettings';

export function CoachesPage() {
  const { bilingualOrder } = useUiSettings();
  const isAr = bilingualOrder === 'ar-first';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const pillars = [
    {
      icon: <Heart className="text-amber-400" size={24} />,
      titleAr: 'التعليم والتحفيز الإيجابي',
      titleEn: 'Positive Instruction & Encouragement',
      descAr: 'بناء الثقة في قدرات اللاعب وتصحيح الأخطاء بأسلوب بناء يحفز على المحاولة والتكرار دون خوف.',
      descEn: 'Building confidence and offering constructive feedback that motivates continuous effort without fear of mistakes.',
    },
    {
      icon: <BookOpen className="text-amber-400" size={24} />,
      titleAr: 'المنهجية العلمية التراكمية',
      titleEn: 'Cumulative Scientific Progression',
      descAr: 'خطط تدريبية مقسمة لمراحل محددة ترتكز على التوافق العصبي والنمو البدني المناسب لكل مرحلة عمرية.',
      descEn: 'Curricula structured into clear milestones aligned with neuromuscular and physical growth phases.',
    },
    {
      icon: <Target className="text-amber-400" size={24} />,
      titleAr: 'التقييم المستمر والمتابعة الفردية',
      titleEn: 'Continuous Assessment & Tracking',
      descAr: 'ملاحظة دقيقة لتطور المهارات الحركية والجاهزية، مع تقديم توجيهات فردية مستمرة لكل رياضي.',
      descEn: 'Detailed observation of technical motor skills and individualized guidance for every athlete.',
    },
    {
      icon: <ShieldCheck className="text-amber-400" size={24} />,
      titleAr: 'التربية الرياضية والانضباط',
      titleEn: 'Sports Character & Discipline',
      descAr: 'غرس قيم احترام القوانين والمدرب والزملاء، والالتزام بالمواعيد كركيزة لبناء الشخصية المتوازنة.',
      descEn: 'Instilling respect for rules, coaches, and peers, alongside punctual commitment for holistic character.',
    },
  ];

  return (
    <div className="uos-public-page bg-[#07080b] text-neutral-100 overflow-hidden">
      
      {/* 1. HERO SECTION (UOS_08_PROGRESS_STORY) */}
      <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <UosImage
            assetKey="UOS_08_PROGRESS_STORY"
            aspectRatio="auto"
            priority
            className="w-full h-full !rounded-none"
            imageClassName="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#07080b]/80 backdrop-blur-[1px] z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-transparent to-[#07080b]/50 z-10" />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-amber-500/30 backdrop-blur-md mb-2 shadow-xl">
            <Sparkles size={14} className="text-amber-400" />
            <span className="text-xs sm:text-sm font-bold tracking-wide text-amber-300 font-tajawal">
              {isAr ? 'فلسفة التدريب — United Olympics Sports' : 'Coaching Philosophy — United Olympics Sports'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-tajawal leading-tight drop-shadow-lg">
            {isAr ? 'مدربون موجهون، بيئة منضبطة' : 'Guiding Coaches, Disciplined Environment'}
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-tajawal leading-relaxed">
            {isAr
              ? 'التدريب ليس إعطاء تعليمات عابرة، بل غرس عادات الانضباط، التحفيز الإيجابي، وبناء علاقة ثقة تحفز اللاعب على بلوغ أفضل مستوياته.'
              : 'Coaching is not merely instruction—it is instilling discipline, positive reinforcement, and a foundation of trust.'}
          </p>
        </div>
      </section>

      {/* 2. 4 COACHING PILLARS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="uos-pill uos-pill-gold font-tajawal">
            {isAr ? 'مبادئ كادرنا التدريبي' : 'Our Guiding Principles'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-tajawal">
            {isAr ? 'أربع ركائز توجه كل حصة تدريبية' : 'Four Pillars Guiding Every Session'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#0d0f14] border border-amber-500/20 hover:border-amber-500/50 transition-colors flex flex-col sm:flex-row gap-6 items-start"
            >
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 shrink-0">
                {item.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white font-tajawal">
                  {isAr ? item.titleAr : item.titleEn}
                </h3>
                <p className="text-sm text-neutral-400 font-tajawal leading-relaxed">
                  {isAr ? item.descAr : item.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ATHLETE-COACH-PARENT ECOSYSTEM */}
      <section className="py-20 bg-[#0a0b0e] border-y border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="uos-pill uos-pill-gold font-tajawal">
                {isAr ? 'منظومة النجاح' : 'Success Ecosystem'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-tajawal leading-tight">
                {isAr ? 'تكامل ثلاثي بين اللاعب، المدرب، وولي الأمر' : 'A Triangle of Athlete, Coach, and Parent'}
              </h2>
              <div className="space-y-4 text-neutral-300 text-sm sm:text-base font-tajawal leading-relaxed">
                <p>
                  {isAr
                    ? 'نؤمن في United Olympics Sports بأن النجاح الحقيقي للناشئ يتحقق عندما تتكامل جهود المدرب الفنية مع الدعم والتشجيع الأسري في بيئة تتسم بالشفافية والتواصل المستمر.'
                    : 'We believe genuine youth athletic progress is achieved when coaching expertise harmonizes with parental support and transparent communication.'}
                </p>
                <p>
                  {isAr
                    ? 'نوفر تقارير متابعة دورية عبر البوابات الإلكترونية لإطلاع أولياء الأمور على نسب الحضور، التطور المهاري، وملاحظات الكادر الفني.'
                    : 'We provide structured progress tracking via our digital portals, keeping parents informed about attendance, skill milestones, and coach feedback.'}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-[#0d0f14] border border-neutral-800 space-y-2">
                <Users className="text-amber-400" size={24} />
                <h4 className="font-bold text-white text-base font-tajawal">{isAr ? 'تواصل شفاف' : 'Transparent Channels'}</h4>
                <p className="text-xs text-neutral-400 font-tajawal">{isAr ? 'ملاحظات دورية حول الأداء والانضباط' : 'Regular feedback on performance and behavior'}</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#0d0f14] border border-neutral-800 space-y-2">
                <ShieldCheck className="text-amber-400" size={24} />
                <h4 className="font-bold text-white text-base font-tajawal">{isAr ? 'بيئة آمنة' : 'Safe Environment'}</h4>
                <p className="text-xs text-neutral-400 font-tajawal">{isAr ? 'حماية ورعاية كاملة لكل رياضي ناشئ' : 'Complete safety and safeguarding protocols'}</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#0d0f14] border border-neutral-800 space-y-2">
                <Award className="text-amber-400" size={24} />
                <h4 className="font-bold text-white text-base font-tajawal">{isAr ? 'تقدير الجهد' : 'Effort Recognition'}</h4>
                <p className="text-xs text-neutral-400 font-tajawal">{isAr ? 'الاحتفاء بالالتزام والتطور المستمر' : 'Celebrating commitment and growth milestones'}</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#0d0f14] border border-neutral-800 space-y-2">
                <Target className="text-amber-400" size={24} />
                <h4 className="font-bold text-white text-base font-tajawal">{isAr ? 'أهداف فردية' : 'Personal Goals'}</h4>
                <p className="text-xs text-neutral-400 font-tajawal">{isAr ? 'خطة تلائم إمكانيات وجاهزية كل لاعب' : 'Plans tailored to individual readiness'}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CLOSING CTA */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-tajawal">
          {isAr ? 'تعرف على برامجنا الرياضية المتخصصة' : 'Explore Our Specialized Sports Programs'}
        </h2>
        <div className="flex justify-center gap-4 pt-4">
          <Link to="/programs" className="uos-btn-gold">
            <span>{isAr ? 'عرض البرامج' : 'View Programs'}</span>
            <ArrowIcon size={16} />
          </Link>
          <Link to="/contact" className="uos-btn-outline">
            <span>{isAr ? 'تواصل معنا' : 'Contact Us'}</span>
            <ArrowIcon size={16} />
          </Link>
        </div>
      </section>

    </div>
  );
}
