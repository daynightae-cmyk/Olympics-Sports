import { Sparkles, CheckCircle2, ShieldCheck, Target, Zap } from 'lucide-react';
import { MediaRegistry } from '../../data/media/publicMediaRegistry';
import { useUiSettings } from '../../ui/theme/useUiSettings';
import { SportCard, ValueCard } from '../../components/public/cards';
import type { UosSportSlug, Sport3DId } from '../../design/sports3d/sports3d.types';

export function SportsIndexPage() {
  const { bilingualOrder } = useUiSettings();
  const isAr = bilingualOrder === 'ar-first';

  const sportsList = [
    {
      id: 'football' as UosSportSlug | Sport3DId,
      asset: MediaRegistry.UOS_02_FOOTBALL_CARD,
      link: '/sports/football',
      tagAr: 'الأكثر إقبالاً',
      tagEn: 'Featured Sport',
      pathwayAr: 'تأسيسي ← تطويري ← أداء ومنافسات',
      pathwayEn: 'Foundation → Development → Performance',
      featured: true,
    },
    {
      id: 'swimming' as UosSportSlug | Sport3DId,
      asset: MediaRegistry.UOS_03_SWIMMING_CARD,
      link: '/sports/swimming',
      tagAr: 'مسبح أولمبي مجهز',
      tagEn: 'Olympic Pool',
      pathwayAr: 'ثقة مائية ← توافق حركي ← سباحة احترافية',
      pathwayEn: 'Water Confidence → Coordination → Competitive',
    },
    {
      id: 'basketball' as UosSportSlug | Sport3DId,
      asset: MediaRegistry.UOS_04_BASKETBALL_CARD,
      link: '/sports/basketball',
      tagAr: 'صالة مغطاة مكيفة',
      tagEn: 'Indoor Court',
      pathwayAr: 'تحكم بالكرة ← تصويب وتمرير ← تكتيك ومباريات',
      pathwayEn: 'Ball Handling → Shooting → Team Tactics',
    },
    {
      id: 'tennis' as UosSportSlug | Sport3DId,
      asset: MediaRegistry.UOS_05_TENNIS_CARD,
      link: '/sports/tennis',
      tagAr: 'ملاعب معتمدة',
      tagEn: 'Certified Courts',
      pathwayAr: 'حركة القدمين ← ضربات أساسية ← تركيز ومباريات',
      pathwayEn: 'Footwork → Core Strokes → Mental Composure',
    },
    {
      id: 'gymnastics' as UosSportSlug | Sport3DId,
      asset: MediaRegistry.UOS_06_GYMNASTICS_CARD,
      link: '/sports/gymnastics',
      tagAr: 'أجهزة تدريب آمنة',
      tagEn: 'Safety Equipment',
      pathwayAr: 'مرونة واتزان ← رشاقة وتحكم ← حركات متقدمة',
      pathwayEn: 'Flexibility → Body Control → Advanced Routines',
    },
    {
      id: 'martial-arts' as UosSportSlug | Sport3DId,
      asset: MediaRegistry.UOS_07_MARTIAL_ARTS_CARD,
      link: '/sports/martial-arts',
      tagAr: 'انضباط ودفاع عن النفس',
      tagEn: 'Discipline & Defense',
      pathwayAr: 'احترام وانضباط ← تكنيك دفاعي ← تدرج أحزمة',
      pathwayEn: 'Respect & Focus → Defensive Technique → Belt System',
    },
  ];

  return (
    <div className="uos-public-page bg-[#07080b] text-neutral-100 overflow-hidden">
      
      {/* 1. HERO BANNER */}
      <section className="relative py-20 lg:py-28 border-b border-neutral-800 bg-radial-vignette">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-amber-500/30 backdrop-blur-md mb-2 shadow-xl">
            <Sparkles size={14} className="text-amber-400" />
            <span className="text-xs sm:text-sm font-bold tracking-wide text-amber-300 font-tajawal">
              {isAr ? 'الرياضات المتاحة' : 'Available Disciplines'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-tajawal leading-tight">
            {isAr ? 'اكتشف الرياضة التي تحرك شغفك' : 'Find the Discipline That Moves You'}
          </h1>

          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto font-tajawal leading-relaxed">
            {isAr
              ? 'نقدم ستة مسارات رياضية متخصصة تهدف إلى صقل المهارات الحركية، غرس الانضباط، وتطوير الأداء تحت إشراف كادر تدريبي متمرس.'
              : 'Six specialized athletic pathways designed to hone motor skills, instill discipline, and elevate performance under expert guidance.'}
          </p>
        </div>
      </section>

      {/* 2. 6 SPORTS GRID */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sportsList.map((sport) => (
            <SportCard
              key={sport.id}
              sportId={sport.id}
              asset={sport.asset}
              link={sport.link}
              tagAr={sport.tagAr}
              tagEn={sport.tagEn}
              pathwayAr={sport.pathwayAr}
              pathwayEn={sport.pathwayEn}
              featured={sport.featured}
            />
          ))}
        </div>
      </section>

      {/* 3. INTEGRITY & METHODOLOGY ASSURANCE */}
      <section className="py-16 bg-[#0a0b0e] border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ValueCard
              icon={<ShieldCheck size={22} />}
              titleAr="أمان المنشآت"
              titleEn="Facility Safety"
              descAr="تجهيزات متكاملة ومعايير أمان معتمدة لسلامة اللاعبين"
              descEn="Certified equipment and comprehensive athlete safety"
            />
            <ValueCard
              icon={<Zap size={22} />}
              titleAr="مدربون متخصصون"
              titleEn="Specialist Coaches"
              descAr="خبرات تدريبية متخصصة في كل فئة رياضية"
              descEn="Experienced coaches across every sports discipline"
            />
            <ValueCard
              icon={<Target size={22} />}
              titleAr="تقييم دوري"
              titleEn="Periodic Assessment"
              descAr="متابعة مستمرة لتطور المهارة والجاهزية البدنية"
              descEn="Continuous tracking of skill and physical readiness"
            />
            <ValueCard
              icon={<CheckCircle2 size={22} />}
              titleAr="بيئة إيجابية"
              titleEn="Positive Culture"
              descAr="غرس الروح الرياضية والاحترام المتبادل"
              descEn="Cultivating sportsmanship, respect, and camaraderie"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
