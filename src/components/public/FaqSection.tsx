import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Sparkles, MessageCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUiSettings } from '../../ui/theme/useUiSettings';

interface FaqItem {
  id: string;
  category: 'registration' | 'training' | 'programs' | 'facilities';
  question: { en: string; ar: string };
  answer: { en: string; ar: string };
}

const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'registration',
    question: {
      en: 'What are the accepted age groups for academy registration?',
      ar: 'ما هي الفئات العمرية المقبولة للتسجيل في الأكاديمية؟',
    },
    answer: {
      en: 'We welcome young athletes starting from 4 years old up to 18+ years across our diverse disciplines. Athletes are grouped strictly by age bracket, physical readiness, and technical proficiency to ensure optimal safety and growth.',
      ar: 'نستقبل الرياضيين والناشئين من سن 4 سنوات وحتى 18+ عاماً عبر مختلف الرياضات. يتم توزيع المشتركين بدقة وفق الفئة العمرية، الجاهزية البدنية، والمستوى الفني لضمان الأمان والتطور المثالي.',
    },
  },
  {
    id: 'faq-2',
    category: 'registration',
    question: {
      en: 'Do you offer a trial or skill assessment session before official enrollment?',
      ar: 'هل تتوفر حصة تجريبية أو جلسة تقييم مستوى قبل التسجيل النهائي؟',
    },
    answer: {
      en: 'Yes! We provide an initial diagnostic assessment session conducted by certified coaching staff. During this session, we evaluate movement fundamentals, sport-specific technique, and recommend the best training track for the athlete.',
      ar: 'نعم بالتأكيد! نوفر جلسة تقييم مبدئي بإشراف كادر تدريبي معتمد. خلال الجلسة يتم اختبار الأساسيات الحركية والمهارية للرياضي وتحديد المجموعة والمسار الأنسب لمستواه.',
    },
  },
  {
    id: 'faq-3',
    category: 'training',
    question: {
      en: 'What are the weekly training schedules and session durations?',
      ar: 'ما هي المواعيد وعدد الحصص التدريبية الأسبوعية ومدتها؟',
    },
    answer: {
      en: 'Training sessions typically run 2 to 3 times per week depending on the program level (Foundation, Development, or Performance). Each session lasts 60 to 90 minutes and includes dynamic warm-up, core technical drills, game scenarios, and cool-down recovery.',
      ar: 'تُقام التدريبات بمعدل 2 إلى 3 حصص أسبوعياً حسب البرنامج المسجل به (التأسيسي، التطويري، أو التنافسي). تتراوح مدة الحصة بين 60 إلى 90 دقيقة وتشمل الإحماء الحركي، التدريبات الفنية المركزة، التطبيق العملي، والاستشفاء.',
    },
  },
  {
    id: 'faq-4',
    category: 'facilities',
    question: {
      en: 'What facilities and equipment standards are provided?',
      ar: 'ما هي مواصفات الملاعب والمنشآت الرياضية المعتمدة لديكم؟',
    },
    answer: {
      en: 'All training takes place in temperature-controlled, federation-standard facilities including FIFA-grade indoor/outdoor football pitches, Olympic standard 25m/50m swimming pools, professional hardwood basketball courts, and dedicated gymnastics & martial arts studios across the UAE.',
      ar: 'تُقام جميع التدريبات في منشآت مكيفة ومطابقة للمواصفات الدولية، تشمل ملاعب كرة قدم معتمدة، مسابح أولمبية 25م و50م، صالات كرة سلة بأرضيات باركيه احترافية، وقاعات مجهزة بأحدث أدوات الجمباز والفنون القتالية.',
    },
  },
  {
    id: 'faq-5',
    category: 'programs',
    question: {
      en: 'How are athlete progress and skill improvements tracked?',
      ar: 'كيف يتم تقييم ومتابعة تطور مستوى اللاعب بمرور الوقت؟',
    },
    answer: {
      en: 'Every registered athlete has a digital profile on our private Player Portal where coaches log monthly skill evaluations, attendance metrics, physical benchmarks, and personalized video performance notes accessible to athletes and parents.',
      ar: 'يمتلك كل لاعب ملفاً رقمياً خاصاً عبر بوابة اللاعبين وولي الأمر، حيث يُسجل المدربون تقارير تقييم دورية، مؤشرات الحضور، اختبارات اللياقة البدنية وملاحظات التطوير الفني المستمر.',
    },
  },
  {
    id: 'faq-6',
    category: 'registration',
    question: {
      en: 'Are training kits and apparel included with registration?',
      ar: 'هل يتم توفير الملابس والزي الرياضي الرسمي عند الاشتراك؟',
    },
    answer: {
      en: 'Official United Olympics Sports training kits (jerseys, shorts, specialized athletic gear) are provided upon registration, and additional federation-grade apparel and gear can be ordered directly through our verified online club store.',
      ar: 'يحصل كل مشترك على الطقم الرياضي الرسمي لـ United Olympics Sports (قميص، شورت، ومستلزمات الرياضة المحددة) عند إتمام التسجيل، كما يمكن طلب أي ملابس إضافية مباشرة من متجرنا الإلكتروني المعتمد.',
    },
  },
  {
    id: 'faq-7',
    category: 'programs',
    question: {
      en: 'Are there discounts for siblings or multi-sport enrollments?',
      ar: 'هل تتوفر باقات أو خصومات خاصة للأشقاء أو التسجيل في أكثر من رياضة؟',
    },
    answer: {
      en: 'Yes, we offer special family and multi-sport subscription packages designed to encourage all-around athletic development for siblings and dedicated young athletes.',
      ar: 'نعم، نقدم باقات اشتراك مخصصة للعائلات والأشقاء، بالإضافة إلى باقات متعددة الرياضات تشجع الرياضي الناشئ على تنمية مهارات رياضية متكاملة.',
    },
  },
];

export function FaqSection() {
  const { bilingualOrder } = useUiSettings();
  const isAr = bilingualOrder === 'ar-first';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const categories = [
    { id: 'all', labelEn: 'All Questions', labelAr: 'جميع الأسئلة' },
    { id: 'registration', labelEn: 'Registration & Ages', labelAr: 'التسجيل والأعمار' },
    { id: 'training', labelEn: 'Training & Schedules', labelAr: 'التدريب والمواعيد' },
    { id: 'facilities', labelEn: 'Facilities & Safety', labelAr: 'المنشآت والأمان' },
    { id: 'programs', labelEn: 'Progress & Tracking', labelAr: 'التقييم والمتابعة' },
  ];

  const filteredFaqs = activeCategory === 'all'
    ? FAQS
    : FAQS.filter((f) => f.category === activeCategory);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-20 lg:py-28 bg-[#07080b] border-t border-neutral-800/80 relative" id="faq-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 backdrop-blur-md shadow-lg">
            <HelpCircle size={14} />
            <span className="text-xs sm:text-sm font-bold tracking-wide font-tajawal">
              {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-tajawal leading-tight">
            {isAr ? 'كل ما تود معرفته عن التسجيل والتدريب' : 'Everything You Need to Know About Enrollment'}
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 font-tajawal max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? 'إجابات واضحة ومفصلة عن آليات التدريب، الفئات العمرية، مواصفات الملاعب وبرامج التقييم الرياضي.'
              : 'Clear and detailed answers about our coaching pathways, age divisions, facilities, and assessment sessions.'}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-tajawal transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                    : 'bg-neutral-900/90 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {isAr ? cat.labelAr : cat.labelEn}
              </button>
            );
          })}
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#0f121a] border-amber-500/40 shadow-xl shadow-amber-500/5'
                    : 'bg-[#0a0c10] border-neutral-800/80 hover:border-neutral-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-start flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className={`text-sm sm:text-base font-bold font-tajawal leading-snug ${
                    isOpen ? 'text-amber-400' : 'text-neutral-100 hover:text-amber-300'
                  }`}>
                    {isAr ? faq.question.ar : faq.question.en}
                  </span>
                  <div
                    className={`p-1.5 rounded-xl border transition-transform duration-300 shrink-0 ${
                      isOpen
                        ? 'bg-amber-500 text-neutral-950 border-amber-400 rotate-180'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-6 sm:px-6 pt-1 text-xs sm:text-sm text-neutral-300 font-tajawal leading-relaxed border-t border-neutral-800/50">
                        {isAr ? faq.answer.ar : faq.answer.en}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#0e1017] to-amber-500/5 border border-amber-500/25 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-start">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white font-tajawal flex items-center justify-center sm:justify-start gap-2">
              <MessageCircle size={18} className="text-amber-400" />
              {isAr ? 'هل لديك استفسار إضافي لم تجد إجابته هنا؟' : 'Have a question not listed here?'}
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 font-tajawal">
              {isAr
                ? 'فريق الدعم الفني والتنسيق الأكاديمي جاهز للرد على كافة أسئلتكم فوراً.'
                : 'Our admissions and coaching team is here to assist with any custom inquiries.'}
            </p>
          </div>

          <Link
            to="/contact"
            className="uos-btn-gold !py-2.5 !px-5 !text-xs shrink-0 whitespace-nowrap"
          >
            <span>{isAr ? 'تواصل مع فريق الدعم' : 'Contact Admissions'}</span>
            <ArrowIcon size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}
