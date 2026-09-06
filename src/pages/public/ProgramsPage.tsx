import { useState } from 'react';
import { Sparkles, Filter } from 'lucide-react';
import { useUiSettings } from '../../ui/theme/useUiSettings';
import { UOS_PUBLIC_MEDIA } from '../../data/media/publicMediaRegistry';
import { ProgramCard } from '../../components/public/cards';
import { UosImage } from '../../components/public/UosImage';

interface ProgramItem {
  id: string;
  slug: string;
  sportId: string;
  titleAr: string;
  titleEn: string;
  levelAr: string;
  levelEn: string;
  descAr: string;
  descEn: string;
  assetKey: keyof typeof UOS_PUBLIC_MEDIA;
  focusAr: string[];
  focusEn: string[];
}

export function ProgramsPage() {
  const { bilingualOrder } = useUiSettings();
  const isAr = bilingualOrder === 'ar-first';

  const [selectedSport, setSelectedSport] = useState<string>('all');

  const categories = [
    { id: 'all', labelAr: 'جميع الرياضات', labelEn: 'All Sports' },
    { id: 'football', labelAr: 'كرة القدم', labelEn: 'Football' },
    { id: 'swimming', labelAr: 'السباحة', labelEn: 'Swimming' },
    { id: 'basketball', labelAr: 'كرة السلة', labelEn: 'Basketball' },
    { id: 'tennis', labelAr: 'التنس', labelEn: 'Tennis' },
    { id: 'gymnastics', labelAr: 'الجمباز', labelEn: 'Gymnastics' },
    { id: 'martial-arts', labelAr: 'الفنون القتالية', labelEn: 'Martial Arts' },
  ];

  const programs: ProgramItem[] = [
    {
      id: 'fb-foundation',
      slug: 'football-foundation',
      sportId: 'football',
      titleAr: 'تأسيس مهارات كرة القدم',
      titleEn: 'Football Foundation Track',
      levelAr: 'تأسيسي',
      levelEn: 'Foundation',
      descAr: 'برنامج يركز على المهارات الحركية الأساسية، التحكم بالكرة، وحب اللعب الجماعي في بيئة محفزة.',
      descEn: 'Focusing on core motor skills, ball familiarity, coordination, and team play enjoyment.',
      assetKey: 'UOS_02_FOOTBALL_CARD',
      focusAr: ['التحكم بالكرة', 'التوافق الحركي', 'المراوغة الإيجابية'],
      focusEn: ['Ball Control', 'Motor Coordination', 'Positive Dribbling'],
    },
    {
      id: 'fb-dev',
      slug: 'football-development',
      sportId: 'football',
      titleAr: 'تطوير وتكتيك كرة القدم',
      titleEn: 'Football Tactical & Skill Development',
      levelAr: 'تطويري',
      levelEn: 'Development',
      descAr: 'تطوير المهارات الفنية، دقة التمرير، التمركز في الملعب، وقراءة مجريات اللعب.',
      descEn: 'Advancing technical mastery, crisp passing, tactical positioning, and game vision.',
      assetKey: 'UOS_11_FOOTBALL_HERO',
      focusAr: ['التمرير الذكي', 'التمركز التكتيكي', 'صناعة اللعب'],
      focusEn: ['Smart Passing', 'Tactical Positioning', 'Playmaking'],
    },
    {
      id: 'sw-water-safety',
      slug: 'swimming-foundation',
      sportId: 'swimming',
      titleAr: 'تأسيس وثقة السباحة',
      titleEn: 'Swimming Confidence & Stroke Basics',
      levelAr: 'تأسيسي',
      levelEn: 'Foundation',
      descAr: 'بناء الثقة التامة في الماء، التنفس المنتظم، وإتقان ضربات الأرجل والانسيابية.',
      descEn: 'Building total water comfort, rhythmic breathing, kick fundamentals, and streamlining.',
      assetKey: 'UOS_03_SWIMMING_CARD',
      focusAr: ['الثقة المائية', 'التنفس الجانبي', 'الانسيابية'],
      focusEn: ['Water Comfort', 'Bilateral Breathing', 'Streamlining'],
    },
    {
      id: 'sw-endurance',
      slug: 'swimming-development',
      sportId: 'swimming',
      titleAr: 'السباحة التنافسية والتحمل',
      titleEn: 'Competitive Swimming & Technique',
      levelAr: 'أداء',
      levelEn: 'Performance',
      descAr: 'صقل أنواع السباحة الأربعة، تحسين كفاءة كل ضربة، وبناء السعة الرئوية والتحمل.',
      descEn: 'Refining the four competitive strokes, stroke efficiency, and sustained aerobic power.',
      assetKey: 'UOS_13_SWIMMING_HERO',
      focusAr: ['سباحة حرة وظهر', 'كفاءة السحب', 'التحمل اللاهوائي'],
      focusEn: ['Freestyle & Backstroke', 'Stroke Mechanics', 'Aerobic Capacity'],
    },
    {
      id: 'bb-skills',
      slug: 'basketball-skills',
      sportId: 'basketball',
      titleAr: 'أساسيات وتصويب كرة السلة',
      titleEn: 'Basketball Core & Shooting Mechanics',
      levelAr: 'تطويري',
      levelEn: 'Development',
      descAr: 'تدريب مكثف على مهارات المحاورة، ميكانيكا التصويب السليم، والتناغم السريع في الصالة.',
      descEn: 'Intensive training on ball handling, shooting form, fast breaks, and court chemistry.',
      assetKey: 'UOS_04_BASKETBALL_CARD',
      focusAr: ['المراوغة باليدين', 'التصويب السليم', 'التمرير السريع'],
      focusEn: ['Dual-hand Dribble', 'Shooting Form', 'Fast Passing'],
    },
    {
      id: 'tn-precision',
      slug: 'tennis-pathway',
      sportId: 'tennis',
      titleAr: 'أكاديمية التنس الفردي',
      titleEn: 'Tennis Technical Precision Track',
      levelAr: 'تطويري',
      levelEn: 'Development',
      descAr: 'صقل ضربات الفورهاند والباكهاند، حركة القدمين السريعة، والثبات الذهني في كل نقطة.',
      descEn: 'Honing forehand/backhand mechanics, agile footwork, and mental focus on court.',
      assetKey: 'UOS_05_TENNIS_CARD',
      focusAr: ['حركة القدمين', 'دقة الضربات', 'الإرسال والاستقبال'],
      focusEn: ['Agile Footwork', 'Stroke Placement', 'Serve & Return'],
    },
    {
      id: 'gym-agility',
      slug: 'gymnastics-agility',
      sportId: 'gymnastics',
      titleAr: 'تأسيس الجمباز والمرونة الحركية',
      titleEn: 'Gymnastics Agility & Balance Track',
      levelAr: 'تأسيسي',
      levelEn: 'Foundation',
      descAr: 'تنمية التوافق الحركي الشامل، المرونة، والاتزان في بيئة تدريب آمنة ومجهزة.',
      descEn: 'Fostering full-body physical literacy, suppleness, and spatial equilibrium safely.',
      assetKey: 'UOS_06_GYMNASTICS_CARD',
      focusAr: ['المرونة الشاملة', 'الاتزان', 'الأمان والتوافق'],
      focusEn: ['Full Flexibility', 'Spatial Balance', 'Coordination'],
    },
    {
      id: 'ma-discipline',
      slug: 'martial-arts-discipline',
      sportId: 'martial-arts',
      titleAr: 'الفنون القتالية والانضباط الذاتي',
      titleEn: 'Martial Arts & Self-Mastery Track',
      levelAr: 'تطويري',
      levelEn: 'Development',
      descAr: 'ثقافة تدريبية تقوم على الاحترام، التكنيك الدفاعي الدقيق، وبناء الشخصية الواثقة.',
      descEn: 'Character-building curriculum based on respect, defensive precision, and inner poise.',
      assetKey: 'UOS_07_MARTIAL_ARTS_CARD',
      focusAr: ['الاحترام والانضباط', 'التكنيك الدفاعي', 'تدرج الأحزمة'],
      focusEn: ['Respect & Discipline', 'Defensive Form', 'Belt Progression'],
    },
  ];

  const filteredPrograms =
    selectedSport === 'all'
      ? programs
      : programs.filter((p) => p.sportId === selectedSport);

  return (
    <div className="uos-public-page bg-[#07080b] text-neutral-100 overflow-hidden">
      
      {/* 1. HERO BANNER (UOS_20_CLOSING_CTA CROP) */}
      <section className="relative py-20 lg:py-28 border-b border-neutral-800 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <UosImage
            assetKey="UOS_20_CLOSING_CTA"
            aspectRatio="auto"
            className="w-full h-full !rounded-none"
            imageClassName="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#07080b]/85 backdrop-blur-[2px] z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-transparent to-[#07080b]/60 z-10" />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-amber-500/30 backdrop-blur-md mb-2 shadow-xl">
            <Sparkles size={14} className="text-amber-400" />
            <span className="text-xs sm:text-sm font-bold tracking-wide text-amber-300 font-tajawal">
              {isAr ? 'برامج United Olympics Sports' : 'United Olympics Sports Programs'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-tajawal leading-tight">
            {isAr ? 'برامج مصممة للتطور الرياضي المستمر' : 'Programs Built for Sustained Athletic Progress'}
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto font-tajawal leading-relaxed">
            {isAr
              ? 'مسارات تدريب متخصصة تغطي كافة الرياضات وتلائم مختلف مستويات الجاهزية من البداية وحتى التميز.'
              : 'Specialized training pathways spanning all disciplines and adapted to each developmental milestone.'}
          </p>
        </div>
      </section>

      {/* 2. CATEGORY FILTERS */}
      <section className="py-8 bg-[#0a0b0e] border-b border-neutral-800 sticky top-20 z-30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto py-2 scrollbar-none">
          <Filter size={16} className="text-amber-400 shrink-0 me-2" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedSport(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer font-tajawal min-h-[38px] ${
                selectedSport === cat.id
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
              }`}
            >
              {isAr ? cat.labelAr : cat.labelEn}
            </button>
          ))}
        </div>
      </section>

      {/* 3. PROGRAMS GRID */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program) => (
            <ProgramCard
              key={program.id}
              id={program.id}
              sportId={program.sportId}
              titleAr={program.titleAr}
              titleEn={program.titleEn}
              levelAr={program.levelAr}
              levelEn={program.levelEn}
              descAr={program.descAr}
              descEn={program.descEn}
              assetKey={program.assetKey}
              focusAr={program.focusAr}
              focusEn={program.focusEn}
            />
          ))}
        </div>
      </section>

    </div>
  );
}
