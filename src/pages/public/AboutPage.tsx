import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Eye, Award, Sparkles, ShieldCheck, Dumbbell, Compass } from 'lucide-react';
import { UosImage } from '../../components/public/UosImage';
import { MediaRegistry } from '../../data/media/publicMediaRegistry';
import { useUiSettings } from '../../ui/theme/useUiSettings';
import { ValueCard } from '../../components/public/cards';

export function AboutPage() {
  const { bilingualOrder } = useUiSettings();
  const isAr = bilingualOrder === 'ar-first';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="uos-public-page bg-[#07080b] text-neutral-100 overflow-hidden">
      
      {/* 1. HERO SECTION (UOS_09_ABOUT_HERO) */}
      <section className="relative min-h-[55vh] lg:min-h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <UosImage
            asset={MediaRegistry.UOS_09_ABOUT_HERO}
            aspectRatio="auto"
            priority
            className="w-full h-full !rounded-none"
            imageClassName="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#07080b]/75 backdrop-blur-[1px] z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-transparent to-[#07080b]/50 z-10" />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-amber-500/30 backdrop-blur-md mb-2 shadow-xl">
            <Sparkles size={14} className="text-amber-400" />
            <span className="text-xs sm:text-sm font-bold tracking-wide text-amber-300 font-tajawal">
              {isAr ? 'من نحن — United Olympics Sports' : 'About United Olympics Sports'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-tajawal leading-tight drop-shadow-lg">
            {isAr ? 'منهج هادف للنمو الرياضي' : 'A Purposeful Approach to Athletic Growth'}
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-tajawal leading-relaxed">
            {isAr
              ? 'نحن نؤمن بأن الرياضة رحلة تربوية وإنسانية تبني الشخصية، تعزز الانضباط، وتصنع قادة المستقبل قبل صناعة الألقاب.'
              : 'We believe sports are an educational and human journey that shapes character, builds discipline, and cultivates future leaders.'}
          </p>
        </div>
      </section>

      {/* 2. CORE PHILOSOPHY & STORY */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="uos-pill uos-pill-gold font-tajawal">
              {isAr ? 'قصتنا ورؤيتنا' : 'Our Story & Purpose'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-tajawal leading-tight">
              {isAr ? 'التدريب ليس مجرد تكرار، بل بناء شامل' : 'Training is Not Just Repetition, but Holistic Growth'}
            </h2>
            <div className="space-y-4 text-neutral-300 text-sm sm:text-base font-tajawal leading-relaxed">
              <p>
                {isAr
                  ? 'تأسست United Olympics Sports لتكون بيئة رائدة تجمع بين الاحتراف الرياضي والتربية القيمية. نحن نوفر للرياضيين الناشئين مساحة آمنة ومحفزة تتيح لهم استكشاف إمكاناتهم وتطوير قدراتهم البدنية والذهنية.'
                  : 'United Olympics Sports was founded as a premier ecosystem blending athletic excellence with values-based development. We provide young athletes with a safe, inspiring environment to discover their potential.'}
              </p>
              <p>
                {isAr
                  ? 'من خلال كادر تدريبي مؤهل ومناهج مدروسة، نركز على تنمية التوافق الحركي، دقة المهارة، الانضباط في المواعيد، وروح الاحترام المتبادل داخل وخارج الملعب.'
                  : 'Through qualified coaches and structured curricula, we focus on motor coordination, skill accuracy, punctual discipline, and mutual respect on and off the field.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
              <ValueCard
                icon={<ShieldCheck size={22} />}
                titleAr="أمان وانضباط"
                titleEn="Safety & Discipline"
                descAr="معايير أمان صارمة في جميع المنشآت"
                descEn="Strict safety standards across all facilities"
              />
              <ValueCard
                icon={<Dumbbell size={22} />}
                titleAr="تطوير تدريجي"
                titleEn="Progressive Training"
                descAr="مستويات تناسب قدرات كل فئة"
                descEn="Levels tailored to each age group"
              />
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <UosImage
              asset={MediaRegistry.UOS_10_ABOUT_REFLECTION}
              aspectRatio="3/2"
              withLightbox
              className="rounded-2xl shadow-2xl border border-amber-500/30 overflow-hidden"
            />
            <div className="mt-4 text-center">
              <span className="text-xs font-bold text-amber-300 font-tajawal block">
                {isAr ? 'التطور عادة يومية' : 'Development is a Daily Habit'}
              </span>
              <span className="text-xs text-neutral-400 font-tajawal">
                {isAr ? 'التكرار المنظم يصنع الفارق الحقيقي' : 'Consistent practice makes the real difference'}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. VISION, MISSION, VALUES (3 CLEAN CARDS) */}
      <section className="py-20 bg-[#0a0b0e] border-y border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="uos-pill uos-pill-gold font-tajawal">
              {isAr ? 'ركائزنا الأساسية' : 'Our Pillars'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-tajawal">
              {isAr ? 'الرؤية، الرسالة، والقيم' : 'Vision, Mission & Values'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={<Eye size={24} />}
              titleAr="الرؤية"
              titleEn="Our Vision"
              descAr="بناء جيل رياضي واعد يمتلك المهارة الفنية العالية، الانضباط الذاتي، والشغف لتمثيل نفسه ومجتمعه بأفضل صورة في المحافل الرياضية."
              descEn="To cultivate a generation of young athletes possessing top technical skill, self-discipline, and passion to represent themselves and their community."
              className="p-8 space-y-4"
            />
            <ValueCard
              icon={<Compass size={24} />}
              titleAr="الرسالة"
              titleEn="Our Mission"
              descAr="توفير بيئة تدريبية احترافية وآمنة ترتكز على مناهج علمية متطورة ورعاية فردية تتيح لكل لاعب صقل قدراته وبلوغ أقصى إمكاناته."
              descEn="To provide a safe and professional training ecosystem based on evidence-backed methods and individual care."
              className="p-8 space-y-4"
            />
            <ValueCard
              icon={<Award size={24} />}
              titleAr="القيم الجوهرية"
              titleEn="Core Values"
              descAr="الاحترام، الانضباط، العمل الجماعي، والالتزام بالنمو المستمر. هذه القيم هي البوصلة التي توجه كل تمرين وحصة تدريبية لدينا."
              descEn="Respect, discipline, teamwork, and continuous improvement guide every drill, session, and match."
              className="p-8 space-y-4"
            />
          </div>
        </div>
      </section>

      {/* 4. CLOSING CTA */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-tajawal">
          {isAr ? 'هل أنت مستعد للانضمام إلى بيئتنا الرياضية؟' : 'Ready to Join Our Sports Environment?'}
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 font-tajawal max-w-xl mx-auto">
          {isAr
            ? 'تواصل معنا للتعرف على البرامج المتاحة ومواعيد التقييم.'
            : 'Get in touch with our team to learn about available programs and enrollment.'}
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link to="/contact" className="uos-btn-gold">
            <span>{isAr ? 'تواصل معنا' : 'Contact Us'}</span>
            <ArrowIcon size={16} />
          </Link>
          <Link to="/sports" className="uos-btn-outline">
            <span>{isAr ? 'استكشف الرياضات' : 'Explore Sports'}</span>
            <ArrowIcon size={16} />
          </Link>
        </div>
      </section>

    </div>
  );
}
