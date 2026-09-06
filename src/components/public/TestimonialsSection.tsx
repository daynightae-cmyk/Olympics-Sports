import React, { useState } from 'react';
import { Star, Quote, ShieldCheck, Trophy, Sparkles, User } from 'lucide-react';
import { useUiSettings } from '../../ui/theme/useUiSettings';

interface TestimonialItem {
  id: string;
  name: { en: string; ar: string };
  role: { en: string; ar: string };
  sport: { en: string; ar: string };
  sportSlug: 'football' | 'swimming' | 'basketball' | 'tennis' | 'gymnastics' | 'martial-arts';
  rating: number;
  highlight: { en: string; ar: string };
  quote: { en: string; ar: string };
  avatarText: string;
  verified: boolean;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    name: { en: 'Rashid Al-Marzouqi & Family', ar: 'راشد المرزوقي وولي الأمر' },
    role: { en: 'U-14 Academy Captain & Parent', ar: 'كابتن فريق تحت 14 سنة وولي الأمر' },
    sport: { en: 'Football Academy', ar: 'أكاديمية كرة القدم' },
    sportSlug: 'football',
    rating: 5,
    highlight: { en: 'Promoted to UAE Youth League Squad', ar: 'الانضمام لتشكيلة دوري البراعم الإماراتي' },
    quote: {
      en: 'The structured training and tactical guidance gave Rashid remarkable confidence. In less than a year, his tactical awareness and physical stamina reached competitive federation standards.',
      ar: 'التدريب المنهجي والتوجيه الفني الصارم منح راشد ثقة استثنائية. خلال أقل من موسم، تطور وعيه التكتيكي ومستوى لياقته البدنية ليواكب معايير بطولات الفئات السنية.',
    },
    avatarText: 'RM',
    verified: true,
  },
  {
    id: 't-2',
    name: { en: 'Maya Salem', ar: 'مايا سالم' },
    role: { en: 'Junior Olympic Squad Athlete', ar: 'سباحة في فريق الإعداد الأولمبي الناشئ' },
    sport: { en: 'Olympic Swimming', ar: 'السباحة الأولمبية' },
    sportSlug: 'swimming',
    rating: 5,
    highlight: { en: 'Improved 100m Freestyle by 3.8s & Gold Medal', ar: 'تحسين توقيت 100م حرة بفارق 3.8 ثانية وميدالية ذهبية' },
    quote: {
      en: 'The hydro-dynamic stroke analysis and endurance blocks designed by the Olympic coaching staff transformed my racing rhythm. I broke my personal best twice this season.',
      ar: 'تحليل تكنيك السباحة الدقيق وبرامج بناء التحمل المائي التي صممها المدربون الأولمبيون غيرت إيقاع سباقاتي بالكامل، وحققت أرقاماً قياسية شخصية جديدة هذا العام.',
    },
    avatarText: 'MS',
    verified: true,
  },
  {
    id: 't-3',
    name: { en: 'Zaid Al-Nuaimi', ar: 'زيد النعيمي' },
    role: { en: 'U-16 Elite Point Guard', ar: 'صانع ألعاب فئة تحت 16 سنة' },
    sport: { en: 'Basketball Elite', ar: 'نخبة كرة السلة' },
    sportSlug: 'basketball',
    rating: 5,
    highlight: { en: 'High Match Decision-Making & Agility', ar: 'سرعة اتخاذ القرار ورشاقة المناورة' },
    quote: {
      en: 'United Olympics Sports teaches you how to think before you move. The drills combine physical intensity with high-pressure game scenarios that prepare you for tournament championships.',
      ar: 'يونايتد أوليمبيكس سبورت يعلمك كيف تفكر تكتيكياً قبل تنفيذ الحركة. التمارين تجمع بين الكثافة البدنية والمواقف الحقيقية تحت الضغط في المباريات الرسمية.',
    },
    avatarText: 'ZN',
    verified: true,
  },
  {
    id: 't-4',
    name: { en: 'Layla Mansoor', ar: 'ليلى منصور' },
    role: { en: 'Acrobatic & Core Gymnast', ar: 'لاعبة جمباز ورشاقة حركية' },
    sport: { en: 'Gymnastics & Agility', ar: 'الجمباز والرشاقة الحركية' },
    sportSlug: 'gymnastics',
    rating: 5,
    highlight: { en: 'Mastered Advanced Beam & Vault Balance', ar: 'إتقان حركات التوازن والقفز المتقدم' },
    quote: {
      en: 'Safety, positive encouragement, and biomechanical precision are the core pillars here. My flexibility, core strength, and landing composure have multiplied immensely.',
      ar: 'الأمان، التشجيع المستمر والدقة الميكانيكية الحركية هي الركائز الأساسية هنا. مرونتي وقوة عضلات الجذع وثبات الهبوط تطورت بشكل ملحوظ.',
    },
    avatarText: 'LM',
    verified: true,
  },
  {
    id: 't-5',
    name: { en: 'Omar Al-Khatib', ar: 'عمر الخطيب' },
    role: { en: 'Junior Singles Competitor', ar: 'لاعب فردي في بطولات الناشئين' },
    sport: { en: 'Tennis Academy', ar: 'أكاديمية التنس' },
    sportSlug: 'tennis',
    rating: 5,
    highlight: { en: 'Enhanced Serve Velocity & Footwork', ar: 'زيادة سرعة الإرسال ودقة حركة القدمين' },
    quote: {
      en: 'The individual attention from coaches is unmatched. Every training session has clear technical milestones, from top-spin forehands to recovery footwork.',
      ar: 'الاهتمام الفردي من الكادر التدريبي لا مثيل له. كل حصة تدريبية لها أهداف واضحة ومقاسة، من ضبط دوران الكرة إلى سرعة التمركز والانطلاق في الملعب.',
    },
    avatarText: 'OK',
    verified: true,
  },
  {
    id: 't-6',
    name: { en: 'Sultan Al-Kaabi', ar: 'سلطان الكعبي' },
    role: { en: 'Disciplined Martial Arts Athlete', ar: 'لاعب الفنون القتالية والدفاع عن النفس' },
    sport: { en: 'Martial Arts & Defense', ar: 'الفنون القتالية والدفاع عن النفس' },
    sportSlug: 'martial-arts',
    rating: 5,
    highlight: { en: 'Advanced Belt Grading & Mental Focus', ar: 'اجتياز التقييم للأحزمة المتقدمة والتركيز الذهني' },
    quote: {
      en: 'Martial arts at UOS is not just about combat; it is about self-control, honor, respect for peers, and unbreakable mental fortitude.',
      ar: 'الفنون القتالية في UOS ليست مجرد رياضة تنافسية، بل هي مدرسة في ضبط النفس، الاحترام، الشجاعة، وبناء الصلابة الذهنية والأخلاقية.',
    },
    avatarText: 'SK',
    verified: true,
  },
];

export function TestimonialsSection() {
  const { bilingualOrder } = useUiSettings();
  const isAr = bilingualOrder === 'ar-first';
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredList = activeFilter === 'all'
    ? TESTIMONIALS
    : TESTIMONIALS.filter((item) => item.sportSlug === activeFilter);

  const filters = [
    { id: 'all', labelEn: 'All Athletes', labelAr: 'جميع الرياضيين' },
    { id: 'football', labelEn: 'Football', labelAr: 'كرة القدم' },
    { id: 'swimming', labelEn: 'Swimming', labelAr: 'السباحة' },
    { id: 'basketball', labelEn: 'Basketball', labelAr: 'كرة السلة' },
    { id: 'gymnastics', labelEn: 'Gymnastics', labelAr: 'الجمباز' },
    { id: 'tennis', labelEn: 'Tennis', labelAr: 'التنس' },
    { id: 'martial-arts', labelEn: 'Martial Arts', labelAr: 'الفنون القتالية' },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#090b0f] border-t border-neutral-800/80 relative overflow-hidden" id="athlete-testimonials">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 backdrop-blur-md shadow-lg">
            <Sparkles size={14} />
            <span className="text-xs sm:text-sm font-bold tracking-wide font-tajawal">
              {isAr ? 'قصص النجاح والتميز' : 'Athlete Success Stories'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-tajawal leading-tight">
            {isAr ? 'تجارب الرياضيين وأولياء الأمور' : 'Real Voices from Our Athletes & Parents'}
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 font-tajawal leading-relaxed">
            {isAr
              ? 'نفخر بمرافقة أبطالنا الصاعدين في كل خطوة نحو بناء اللياقة، إتقان المهارات، والتألق في المنافسات الرسمية.'
              : 'Empowering young champions across the UAE to discover their potential, master disciplines, and achieve excellence.'}
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filters.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-tajawal transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                    : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {isAr ? f.labelAr : f.labelEn}
              </button>
            );
          })}
        </div>

        {/* Testimonials Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredList.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-7 rounded-2xl bg-[#0e1017] border border-neutral-800/90 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl relative group"
            >
              <div className="space-y-4">
                {/* Header: Sport Badge + Star Rating */}
                <div className="flex items-center justify-between gap-2 border-b border-neutral-800/70 pb-3.5">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-bold font-tajawal">
                    {isAr ? item.sport.ar : item.sport.en}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Achievement Highlight Tag */}
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300/90 font-tajawal bg-amber-500/5 px-3 py-1.5 rounded-lg border border-amber-500/15">
                  <Trophy size={14} className="text-amber-400 shrink-0" />
                  <span>{isAr ? item.highlight.ar : item.highlight.en}</span>
                </div>

                {/* Quote Body */}
                <div className="relative pt-1">
                  <Quote size={18} className="text-amber-500/20 absolute -top-1 -left-1 rtl:-right-1 rtl:left-auto" />
                  <p className="text-xs sm:text-sm text-neutral-300 font-tajawal leading-relaxed relative z-10 pl-2 rtl:pr-2 rtl:pl-0">
                    "{isAr ? item.quote.ar : item.quote.en}"
                  </p>
                </div>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3 pt-3 border-t border-neutral-800/70">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-neutral-950 font-black text-xs flex items-center justify-center shrink-0 shadow-md">
                  {item.avatarText}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs sm:text-sm font-bold text-white font-tajawal truncate">
                      {isAr ? item.name.ar : item.name.en}
                    </h4>
                    {item.verified && (
                      <span title={isAr ? 'عضو معتمد' : 'Verified Member'}>
                        <ShieldCheck size={14} className="text-amber-400 shrink-0" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-400 font-tajawal truncate">
                    {isAr ? item.role.ar : item.role.en}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Stat Summary */}
        <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-[#0c0e14] border border-amber-500/20 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-sans">98.4%</div>
            <div className="text-xs text-neutral-400 font-tajawal mt-1">{isAr ? 'رضا أولياء الأمور' : 'Parent Satisfaction'}</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-sans">+1,200</div>
            <div className="text-xs text-neutral-400 font-tajawal mt-1">{isAr ? 'رياضي متدرب' : 'Active Athletes'}</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-sans">+45</div>
            <div className="text-xs text-neutral-400 font-tajawal mt-1">{isAr ? 'مدرب أولمبي معتمد' : 'Accredited Coaches'}</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-sans">+180</div>
            <div className="text-xs text-neutral-400 font-tajawal mt-1">{isAr ? 'ميدالية في البطولات' : 'Championship Medals'}</div>
          </div>
        </div>

      </div>
    </section>
  );
}
