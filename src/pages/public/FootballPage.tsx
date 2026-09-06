import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Trophy, Dumbbell, Target, Sparkles, CircleDot, Users } from 'lucide-react';
import { UosImage } from '../../components/public/UosImage';
import { useUiSettings } from '../../ui/theme/useUiSettings';
import { Sports3DIcon } from '../../design/sports3d';

export function FootballPage() {
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
      icon: <CircleDot className="text-amber-400" size={22} />,
      titleAr: 'التحكم بالكرة والتكنيك الفردي',
      titleEn: 'Ball Mastery & Individual Technique',
      descAr: 'تطوير دقة اللمسة الأولى، المراوغة الإيجابية، والتمرير المتقن في المساحات الضيقة.',
      descEn: 'Developing first touch precision, positive dribbling, and crisp passing in tight spaces.',
    },
    {
      icon: <Target className="text-amber-400" size={22} />,
      titleAr: 'الوعي المكاني وقراءة الملعب',
      titleEn: 'Spatial Awareness & Pitch Vision',
      descAr: 'تدريب اللاعب على التحرك الذكي بدون كرة وخلق خيارات التمرير الفعالة.',
      descEn: 'Training smart off-the-ball movement and creating effective passing channels.',
    },
    {
      icon: <Users className="text-amber-400" size={22} />,
      titleAr: 'العمل الجماعي والمسؤولية المشتركة',
      titleEn: 'Teamwork & Shared Responsibility',
      descAr: 'غرس قيم التعاون والتواصل الإيجابي والدعم المتبادل بين عناصر الفريق.',
      descEn: 'Instilling mutual support, clear communication, and collective spirit.',
    },
    {
      icon: <Trophy className="text-amber-400" size={22} />,
      titleAr: 'الثقة التنافسية والهدوء',
      titleEn: 'Competitive Confidence & Composure',
      descAr: 'تحويل التمارين إلى جاهزية ذهنية للتعامل مع مواقف المباريات وضغط الخصم.',
      descEn: 'Translating training into mental resilience and composure under game pressure.',
    },
    {
      icon: <Dumbbell className="text-amber-400" size={22} />,
      titleAr: 'الجاهزية الحركية والبدنية',
      titleEn: 'Motor Fitness & Agility',
      descAr: 'تطوير سرعة رد الفعل، الرشاقة، والتوافق العضلي كجزء مدمج في كل حصة.',
      descEn: 'Cultivating rapid reflexes, agile footwork, and neuromuscular coordination.',
    },
  ];

  return (
    <div className="uos-public-page bg-[#07080b] text-neutral-100 overflow-hidden">
      
      {/* 1. HERO SECTION (UOS_11_FOOTBALL_HERO) */}
      <section className="relative min-h-[70vh] lg:min-h-[78vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <UosImage
            assetKey="UOS_11_FOOTBALL_HERO"
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
              <Sports3DIcon sport="football" size="lg" decorative />
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-tajawal leading-tight drop-shadow-lg">
            {isAr ? 'مسار كرة القدم: مهارة، حركة، وذكاء لعب' : 'Football Pathway: Skill, Movement, and Game IQ'}
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-tajawal leading-relaxed">
            {isAr
              ? 'تدريب متدرج يجمع بين دقة التحكم بالكرة، قراءة المساحات، والتناغم الجماعي داخل الملعب لبناء لاعب متكامل.'
              : 'Progressive training combining ball mastery, spatial awareness, and tactical team cohesion to build a complete player.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a href="#register-interest" className="uos-btn-gold w-full sm:w-auto">
              <span>{isAr ? 'سجل اهتمامك بالبرنامج' : 'Register Interest'}</span>
              <ArrowIcon size={16} />
            </a>
            <Link to="/programs" className="uos-btn-outline w-full sm:w-auto">
              <span>{isAr ? 'عرض جداول التدريب' : 'View Programs'}</span>
              <ArrowIcon size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. PROGRAM PHILOSOPHY & TECHNIQUE (UOS_12_FOOTBALL_TECHNIQUE) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="uos-pill uos-pill-gold font-tajawal">
              {isAr ? 'نبذة عن المسار' : 'Pathway Overview'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-tajawal leading-tight">
              {isAr ? 'نبني اللاعب، لا المهارة المعزولة فحسب' : 'We Build the Player, Not Just Isolated Drills'}
            </h2>
            <div className="space-y-4 text-neutral-300 text-sm sm:text-base font-tajawal leading-relaxed">
              <p>
                {isAr
                  ? 'برنامج كرة القدم في United Olympics Sports مصمم كرحلة تدريب متدرجة تربط بين العمل الفني، حركة الجسد، التواصل السليم، وفهم متطلبات اللعب الجماعي.'
                  : 'Football at United Olympics Sports is designed as a progressive development journey connecting technical repetition, physical literacy, spatial intelligence, and team dynamics.'}
              </p>
              <p>
                {isAr
                  ? 'يتدرب اللاعبون في بيئة إيجابية ومنضبطة بإشراف مدربين يركزون على شرح التكنيك وتصحيح الملاحظات أولاً بأول لترسيخ العادات الصحيحة.'
                  : 'Players train in a positive, structured atmosphere guided by coaches who provide continuous constructive feedback to build strong athletic habits.'}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <UosImage
              assetKey="UOS_12_FOOTBALL_TECHNIQUE"
              aspectRatio="3/2"
              withLightbox
              className="rounded-2xl shadow-2xl border border-amber-500/30 overflow-hidden"
            />
            <div className="mt-3 text-center text-xs text-neutral-400 font-tajawal">
              {isAr ? 'التحكم والتفاصيل الفنية الدقيقة تحت إشراف متخصص' : 'Technical precision and control under expert guidance'}
            </div>
          </div>

        </div>
      </section>

      {/* 3. 5 CORE PILLARS */}
      <section className="py-20 bg-[#0a0b0e] border-y border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="uos-pill uos-pill-gold font-tajawal">
              {isAr ? 'أسس التدريب' : 'Core Pillars'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-tajawal">
              {isAr ? 'خمسة أسس لتقدم حقيقي في كرة القدم' : 'Five Foundations for Meaningful Progress'}
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

      {/* 4. PROGRESSIVE PATHWAY STAGES */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="uos-pill uos-pill-gold font-tajawal">
            {isAr ? 'المسار التدريبي' : 'Training Progression'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-tajawal">
            {isAr ? 'تدرج واضح وفق الجاهزية' : 'Progression Built on Readiness'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-[#0d0f14] border border-amber-500/20 space-y-4">
            <span className="text-xs font-bold text-amber-400 font-tajawal uppercase tracking-wider block">01 — Foundation</span>
            <h3 className="text-xl font-bold text-white font-tajawal">{isAr ? 'المسار التأسيسي' : 'Foundation Level'}</h3>
            <p className="text-sm text-neutral-400 font-tajawal leading-relaxed">
              {isAr
                ? 'الحركة الأساسية، التوافق الحركي، الألفة مع الكرة، وغرس الثقة وحب اللعب في بيئة مرحة ومنظمة.'
                : 'Fundamental movement skills, ball familiarity, coordination, and building self-confidence.'}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0d0f14] border border-amber-500/20 space-y-4">
            <span className="text-xs font-bold text-amber-400 font-tajawal uppercase tracking-wider block">02 — Development</span>
            <h3 className="text-xl font-bold text-white font-tajawal">{isAr ? 'المسار التطويري' : 'Development Level'}</h3>
            <p className="text-sm text-neutral-400 font-tajawal leading-relaxed">
              {isAr
                ? 'تكرار المهارات الفنية، اتخاذ القرار بالكرة وبدونها، فهم واجبات المركز، والوعي التكتيكي الجماعي.'
                : 'Technical repetition, tactical position understanding, off-ball movement, and team awareness.'}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0d0f14] border border-amber-500/20 space-y-4">
            <span className="text-xs font-bold text-amber-400 font-tajawal uppercase tracking-wider block">03 — Performance</span>
            <h3 className="text-xl font-bold text-white font-tajawal">{isAr ? 'مسار الأداء والمنافسات' : 'Performance Level'}</h3>
            <p className="text-sm text-neutral-400 font-tajawal leading-relaxed">
              {isAr
                ? 'الجاهزية التنافسية الكاملة، الثبات الذهني، واللعب بكثافة وسرعة عالية تحت ضغط المباريات.'
                : 'High-intensity execution, match readiness, composure, and decision-making under game pressure.'}
            </p>
          </div>
        </div>
      </section>

      {/* 5. REGISTER INTEREST FORM */}
      <section id="register-interest" className="py-20 bg-[#0a0b0e] border-t border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <span className="uos-pill uos-pill-gold font-tajawal">
              {isAr ? 'التسجيل والاستفسار' : 'Inquiry & Registration'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-tajawal">
              {isAr ? 'مهتم بالانضمام إلى مسار كرة القدم؟' : 'Interested in the Football Pathway?'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-tajawal">
              {isAr ? 'أدخل بياناتك للتواصل معك وتحديد موعد جلسة التقييم المبدئي.' : 'Submit your info for program details and initial evaluation scheduling.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-[#0d0f14] border border-amber-500/20 space-y-4 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-300 font-tajawal mb-1.5">{isAr ? 'اسم اللاعب أو ولي الأمر' : 'Full Name'}</label>
                <input required type="text" placeholder={isAr ? 'الاسم الكامل' : 'Your name'} className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 text-sm font-tajawal" />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-300 font-tajawal mb-1.5">{isAr ? 'البريد الإلكتروني' : 'Email Address'}</label>
                <input required type="email" placeholder="example@domain.com" className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 text-sm font-sans" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 font-tajawal mb-1.5">{isAr ? 'الفئة العمرية أو المستوى الرياضي' : 'Age Group or Level'}</label>
              <input type="text" placeholder={isAr ? 'مثال: ناشئ 10-12 سنة / مبتدئ' : 'e.g. Youth 10-12 years'} className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 text-sm font-tajawal" />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 font-tajawal mb-1.5">{isAr ? 'ملاحظات أو استفسار إضافي' : 'Additional Notes'}</label>
              <textarea rows={3} placeholder={isAr ? 'اكتب أي تفاصيل إضافية تود مشاركتها...' : 'Any details you would like to share...'} className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 text-sm font-tajawal" />
            </div>

            <button type="submit" className="uos-btn-gold w-full !py-3 !text-sm">
              <span>{isAr ? 'إرسال طلب الاهتمام والتقييم' : 'Submit Interest Request'}</span>
              <ArrowIcon size={16} />
            </button>

            {formSubmitted && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 text-amber-300 text-xs font-tajawal animate-fade-in">
                <CheckCircle2 size={18} className="shrink-0" />
                <span>{isAr ? 'تم استلام طلبك بنجاح! سيقوم فريقنا بالتواصل معك لتنسيق موعد التقييم.' : 'Thank you! Your interest has been registered. Our team will contact you shortly.'}</span>
              </div>
            )}
          </form>
        </div>
      </section>

    </div>
  );
}
