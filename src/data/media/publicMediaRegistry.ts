export type PublicMediaKey =
  | 'UOS_01_HOME_HERO'
  | 'UOS_02_FOOTBALL_CARD'
  | 'UOS_03_SWIMMING_CARD'
  | 'UOS_04_BASKETBALL_CARD'
  | 'UOS_05_TENNIS_CARD'
  | 'UOS_06_GYMNASTICS_CARD'
  | 'UOS_07_MARTIAL_ARTS_CARD'
  | 'UOS_08_PROGRESS_STORY'
  | 'UOS_09_ABOUT_HERO'
  | 'UOS_10_ABOUT_REFLECTION'
  | 'UOS_11_FOOTBALL_HERO'
  | 'UOS_12_FOOTBALL_TECHNIQUE'
  | 'UOS_13_SWIMMING_HERO'
  | 'UOS_14_SWIMMING_TECHNIQUE'
  | 'UOS_15_BASKETBALL_HERO'
  | 'UOS_16_BASKETBALL_DECISION'
  | 'UOS_16_BASKETBALL_TECHNIQUE'
  | 'UOS_17_TENNIS_HERO'
  | 'UOS_18_GYMNASTICS_HERO'
  | 'UOS_19_MARTIAL_ARTS_HERO'
  | 'UOS_20_CLOSING_CTA';

export interface PublicMediaAsset {
  key: string;
  url: string;
  altAr: string;
  altEn: string;
  role: string;
  aspectRatio: '16/9' | '21/9' | '4/5' | '3/2' | '1/1' | 'auto' | string;
  focalPointDesktop?: string;
  focalPointTablet?: string;
  focalPointMobile?: string;
  sportId?: 'football' | 'swimming' | 'basketball' | 'tennis' | 'gymnastics' | 'martial-arts' | string;
  titleAr?: string;
  titleEn?: string;
  copyAr?: string;
  copyEn?: string;
}

export const UOS_PUBLIC_MEDIA: Record<PublicMediaKey, PublicMediaAsset> = {
  UOS_01_HOME_HERO: {
    key: 'UOS_01_HOME_HERO',
    url: 'https://i.postimg.cc/fbNpLdWQ/file-00000000bacc81f4b9a9c073233596cb.png',
    altAr: 'لاعب ناشئ من United Olympics Sports يتدرب على كرة القدم',
    altEn: 'Young athlete training in football at United Olympics Sports',
    role: 'Homepage Hero',
    aspectRatio: '16/9',
    focalPointDesktop: '70% 50%',
    focalPointTablet: '65% 50%',
    focalPointMobile: '60% 45%',
    titleAr: 'من الطفولة نصنع الأبطال',
    titleEn: 'From Childhood, We Build Champions',
    copyAr: 'بيئة رياضية متكاملة تهدف إلى تطوير المهارات، بناء الانضباط، تعزيز الثقة وغرس روح العمل الجماعي.',
    copyEn: 'A structured environment for athletic development, skill building, discipline, confidence, and teamwork.',
  },

  UOS_02_FOOTBALL_CARD: {
    key: 'UOS_02_FOOTBALL_CARD',
    url: 'https://i.postimg.cc/8CS95vp3/file-0000000099fc820a8369a3d67fb2cba3.png',
    altAr: 'لاعب ناشئ يتدرب على المراوغة والتحكم بالكرة',
    altEn: 'Young athlete practicing dribbling and ball control',
    role: 'Sports Card - Football',
    sportId: 'football',
    aspectRatio: '4/5',
    focalPointDesktop: '50% 40%',
    focalPointTablet: '50% 40%',
    focalPointMobile: '50% 35%',
    titleAr: 'كرة القدم',
    titleEn: 'Football',
    copyAr: 'تطوير المهارة، التحكم، الوعي بالملعب والعمل الجماعي.',
    copyEn: 'Developing skill, control, pitch awareness and teamwork.',
  },

  UOS_03_SWIMMING_CARD: {
    key: 'UOS_03_SWIMMING_CARD',
    url: 'https://i.postimg.cc/CxD9S7g9/file-00000000d6208243b9d0a256670fb462.png',
    altAr: 'سباح ناشئ يتدرب على السباحة الحرة',
    altEn: 'Young swimmer practicing freestyle swimming',
    role: 'Sports Card - Swimming',
    sportId: 'swimming',
    aspectRatio: '4/5',
    focalPointDesktop: '50% 50%',
    focalPointTablet: '50% 50%',
    focalPointMobile: '50% 45%',
    titleAr: 'السباحة',
    titleEn: 'Swimming',
    copyAr: 'الثقة في الماء، التقنية، التنفس والتحمل.',
    copyEn: 'Water confidence, technique, breathing and endurance.',
  },

  UOS_04_BASKETBALL_CARD: {
    key: 'UOS_04_BASKETBALL_CARD',
    url: 'https://i.postimg.cc/9fhKM9Xh/file-00000000c460820aa62b5b16432fa7f6.png',
    altAr: 'لاعب كرة سلة ناشئ يؤدي تمرين مراوغة',
    altEn: 'Young basketball player executing a dribbling drill',
    role: 'Sports Card - Basketball',
    sportId: 'basketball',
    aspectRatio: '4/5',
    focalPointDesktop: '50% 45%',
    focalPointTablet: '50% 45%',
    focalPointMobile: '50% 40%',
    titleAr: 'كرة السلة',
    titleEn: 'Basketball',
    copyAr: 'السرعة، التحكم، اتخاذ القرار والعمل الجماعي.',
    copyEn: 'Speed, control, decision-making and teamwork.',
  },

  UOS_05_TENNIS_CARD: {
    key: 'UOS_05_TENNIS_CARD',
    url: 'https://i.postimg.cc/cJS2H3xD/file-00000000bd0c81f480fcd06b3ccc1b9a.png',
    altAr: 'لاعب تنس ناشئ ينفذ ضربة أمامية أثناء التدريب',
    altEn: 'Young tennis player executing a forehand stroke during training',
    role: 'Sports Card - Tennis',
    sportId: 'tennis',
    aspectRatio: '4/5',
    focalPointDesktop: '50% 50%',
    focalPointTablet: '50% 50%',
    focalPointMobile: '50% 45%',
    titleAr: 'التنس',
    titleEn: 'Tennis',
    copyAr: 'التركيز، التوقيت، حركة القدمين والتكرار الذكي.',
    copyEn: 'Focus, timing, footwork and intelligent repetition.',
  },

  UOS_06_GYMNASTICS_CARD: {
    key: 'UOS_06_GYMNASTICS_CARD',
    url: 'https://i.postimg.cc/zfr6BhDB/file-000000000a7c81f4baf99cd770452645.png',
    altAr: 'لاعبة جمباز ناشئة تؤدي تمرين توازن',
    altEn: 'Young gymnast executing a balance routine',
    role: 'Sports Card - Gymnastics',
    sportId: 'gymnastics',
    aspectRatio: '4/5',
    focalPointDesktop: '50% 45%',
    focalPointTablet: '50% 45%',
    focalPointMobile: '50% 40%',
    titleAr: 'الجمباز',
    titleEn: 'Gymnastics',
    copyAr: 'الاتزان، المرونة، التحكم والثقة.',
    copyEn: 'Balance, flexibility, control and confidence.',
  },

  UOS_07_MARTIAL_ARTS_CARD: {
    key: 'UOS_07_MARTIAL_ARTS_CARD',
    url: 'https://i.postimg.cc/SKh3s9Qk/file-000000000788820a8941d4a5b6c5c450.png',
    altAr: 'رياضيان ناشئان يتدربان على الفنون القتالية بانضباط',
    altEn: 'Young athletes training in martial arts with discipline',
    role: 'Sports Card - Martial Arts',
    sportId: 'martial-arts',
    aspectRatio: '4/5',
    focalPointDesktop: '50% 45%',
    focalPointTablet: '50% 45%',
    focalPointMobile: '50% 40%',
    titleAr: 'الفنون القتالية',
    titleEn: 'Martial Arts',
    copyAr: 'احترام، تركيز، تحكم ومسؤولية.',
    copyEn: 'Respect, focus, control and responsibility.',
  },

  UOS_08_PROGRESS_STORY: {
    key: 'UOS_08_PROGRESS_STORY',
    url: 'https://i.postimg.cc/DwsRn6Tx/file-000000008ba081f4b76b09569a6f5ca2.png',
    altAr: 'مجموعة من الرياضيين الناشئين أثناء تدريب منظم بإشراف مدرب',
    altEn: 'A group of young athletes in organized training guided by a coach',
    role: 'Homepage Progress Story / Coaching Philosophy',
    aspectRatio: '3/2',
    focalPointDesktop: '50% 50%',
    focalPointTablet: '50% 50%',
    focalPointMobile: '50% 45%',
    titleAr: 'كيف نبني التقدم',
    titleEn: 'How We Build Progress',
    copyAr: 'التطور ليس صدفة، بل مسار مدروس يبدأ بالأساس الحركي، ويمر بالتطوير الفني، ويصل إلى الأداء الواثق.',
    copyEn: 'Development is not random. It is a deliberate path starting with foundation, passing through technical growth, and reaching confident performance.',
  },

  UOS_09_ABOUT_HERO: {
    key: 'UOS_09_ABOUT_HERO',
    url: 'https://i.postimg.cc/Bv0k6FSN/file-00000000fe0882109a9f43751a363a25.png',
    altAr: 'رياضيون ناشئون يتدربون داخل منشأة United Olympics Sports',
    altEn: 'Young athletes training inside the United Olympics Sports facility',
    role: 'About Us Hero',
    aspectRatio: '21/9',
    focalPointDesktop: '50% 45%',
    focalPointTablet: '50% 45%',
    focalPointMobile: '50% 40%',
    titleAr: 'منهج هادف للنمو الرياضي',
    titleEn: 'A Purposeful Approach to Athletic Growth',
    copyAr: 'نحن نؤمن بأن الرياضة رحلة تربوية وإنسانية تبني الشخصية قبل المهارة.',
    copyEn: 'We believe sport is an educational and human journey that shapes character before skill.',
  },

  UOS_10_ABOUT_REFLECTION: {
    key: 'UOS_10_ABOUT_REFLECTION',
    url: 'https://i.postimg.cc/JhLvnXrF/file-000000002fa882108347c5632700765e.png',
    altAr: 'لاعب ناشئ يستعد للتدريب وينظر نحو الملعب',
    altEn: 'Young athlete preparing for practice and looking towards the pitch',
    role: 'About Page Reflection / Athlete Journey',
    aspectRatio: '3/2',
    focalPointDesktop: '50% 45%',
    focalPointTablet: '50% 45%',
    focalPointMobile: '50% 40%',
    titleAr: 'التطور عادة يومية',
    titleEn: 'Development is a Daily Habit',
    copyAr: 'النمو الحقيقي يأتي من التكرار المنظم والمثابرة والاستمتاع بكل خطوة على أرض الملعب.',
    copyEn: 'True growth stems from disciplined repetition, perseverance, and enjoying every single step on the field.',
  },

  UOS_11_FOOTBALL_HERO: {
    key: 'UOS_11_FOOTBALL_HERO',
    url: 'https://i.postimg.cc/SKh3s9Sw/file-00000000d57881f489f67cf43f7b7f1a.png',
    altAr: 'لاعب ناشئ يتقدم بالكرة أثناء تدريب كرة القدم',
    altEn: 'Young athlete advancing with the ball during football training',
    role: 'Football Hero',
    sportId: 'football',
    aspectRatio: '16/9',
    focalPointDesktop: '65% 50%',
    focalPointTablet: '60% 50%',
    focalPointMobile: '55% 45%',
    titleAr: 'مسار كرة القدم: مهارة، حركة، وذكاء لعب',
    titleEn: 'Football Pathway: Skill, Movement, and Game IQ',
    copyAr: 'تدريب متدرج يجمع بين دقة التحكم بالكرة، قراءة المساحات، والتناغم الجماعي داخل الملعب.',
    copyEn: 'Progressive training combining ball mastery, spatial awareness, and tactical team cohesion.',
  },

  UOS_12_FOOTBALL_TECHNIQUE: {
    key: 'UOS_12_FOOTBALL_TECHNIQUE',
    url: 'https://i.postimg.cc/3xpzY1TP/file-00000000540481f495db5292007fc40d.png',
    altAr: 'تفاصيل تدريب لاعب ناشئ على التحكم الدقيق بالكرة',
    altEn: 'Close-up of young athlete training precise ball control',
    role: 'Football Technique Section',
    sportId: 'football',
    aspectRatio: '3/2',
    focalPointDesktop: '50% 50%',
    focalPointTablet: '50% 50%',
    focalPointMobile: '50% 45%',
    titleAr: 'التحكم والتفاصيل الفنية',
    titleEn: 'Control & Technical Foundations',
    copyAr: 'اللمسة الأولى، التوجيه تحت الضغط، والتمرير الدقيق هي حجر الأساس لصناعة لاعب متكامل.',
    copyEn: 'First touch, directional control under pressure, and precision passing form the foundation of a complete player.',
  },

  UOS_13_SWIMMING_HERO: {
    key: 'UOS_13_SWIMMING_HERO',
    url: 'https://i.postimg.cc/DzTHZGvB/file-000000006da48210ab6b71dcdba377ba.png',
    altAr: 'سباح ناشئ يتدرب داخل مسبح United Olympics Sports',
    altEn: 'Young swimmer training inside United Olympics Sports pool',
    role: 'Swimming Hero',
    sportId: 'swimming',
    aspectRatio: '16/9',
    focalPointDesktop: '50% 50%',
    focalPointTablet: '50% 50%',
    focalPointMobile: '50% 45%',
    titleAr: 'مسار السباحة: إيقاع، تنفس، وثقة مائية',
    titleEn: 'Swimming Pathway: Rhythm, Breathing, and Water Mastery',
    copyAr: 'برنامج مصمم لتطوير الانسيابية، التوافق العضلي، والقدرة على التحمل بأمان واحترافية.',
    copyEn: 'A curriculum engineered to cultivate fluidity, neuromuscular coordination, and endurance safely and progressively.',
  },

  UOS_14_SWIMMING_TECHNIQUE: {
    key: 'UOS_14_SWIMMING_TECHNIQUE',
    url: 'https://i.postimg.cc/SKh3s9Sv/file-000000002c34820a9ccfcf8346a878eb.png',
    altAr: 'سباح ناشئ يؤدي تمرين سباحة حرة بتقنية منظمة',
    altEn: 'Young swimmer performing structured freestyle drill',
    role: 'Swimming Technique Section',
    sportId: 'swimming',
    aspectRatio: '3/2',
    focalPointDesktop: '50% 50%',
    focalPointTablet: '50% 50%',
    focalPointMobile: '50% 45%',
    titleAr: 'الانسيابية وقوة السحب',
    titleEn: 'Hydrodynamics & Stroke Efficiency',
    copyAr: 'التركيز على محاذاة الجسم، إيقاع التنفس، وكفاءة كل ضربة ذراع لبناء سرعة مستدامة.',
    copyEn: 'Focusing on body alignment, breathing rhythm, and stroke efficiency to develop sustainable power and speed.',
  },

  UOS_15_BASKETBALL_HERO: {
    key: 'UOS_15_BASKETBALL_HERO',
    url: 'https://i.postimg.cc/cJBj8J6C/file-00000000f6888246b945f6923429bc83.png',
    altAr: 'لاعب كرة سلة ناشئ يتقدم بالكرة داخل الصالة',
    altEn: 'Young basketball player advancing with the ball on court',
    role: 'Basketball Hero',
    sportId: 'basketball',
    aspectRatio: '16/9',
    focalPointDesktop: '60% 50%',
    focalPointTablet: '55% 50%',
    focalPointMobile: '50% 45%',
    titleAr: 'مسار كرة السلة: سرعة، تصويب، وتناغم جماعي',
    titleEn: 'Basketball Pathway: Speed, Shooting, and Team Chemistry',
    copyAr: 'تطوير ردود الفعل السريعة، إتقان المراوغة والتصويب، وبناء التواصل الفعال على أرض الصالة.',
    copyEn: 'Developing rapid reaction times, mastering ball-handling and shooting, and instilling dynamic on-court communication.',
  },

  UOS_16_BASKETBALL_DECISION: {
    key: 'UOS_16_BASKETBALL_DECISION',
    url: 'https://i.postimg.cc/VNWTbN5m/file-000000009ef082109a1608154539584c.png',
    altAr: 'مجموعة ناشئين تتدرب على التمرير والعمل الجماعي في كرة السلة',
    altEn: 'Group of youth players practicing passing and teamwork in basketball',
    role: 'Basketball Decision & Teamwork Section',
    sportId: 'basketball',
    aspectRatio: '3/2',
    focalPointDesktop: '50% 50%',
    focalPointTablet: '50% 50%',
    focalPointMobile: '50% 45%',
    titleAr: 'قراءة الملعب واتخاذ القرار',
    titleEn: 'Court Vision & Decision-Making',
    copyAr: 'التدريب على التحرك بدون كرة، التمرير في التوقيت المثالي، وتوزيع الأدوار بتكامل.',
    copyEn: 'Practicing off-ball movement, pinpoint timing on passes, and cohesive tactical role execution.',
  },

  UOS_16_BASKETBALL_TECHNIQUE: {
    key: 'UOS_16_BASKETBALL_TECHNIQUE',
    url: 'https://i.postimg.cc/VNWTbN5m/file-000000009ef082109a1608154539584c.png',
    altAr: 'مجموعة ناشئين تتدرب على التمرير والعمل الجماعي في كرة السلة',
    altEn: 'Group of youth players practicing passing and teamwork in basketball',
    role: 'Basketball Decision & Teamwork Section',
    sportId: 'basketball',
    aspectRatio: '3/2',
    focalPointDesktop: '50% 50%',
    focalPointTablet: '50% 50%',
    focalPointMobile: '50% 45%',
    titleAr: 'قراءة الملعب واتخاذ القرار',
    titleEn: 'Court Vision & Decision-Making',
    copyAr: 'التدريب على التحرك بدون كرة، التمرير في التوقيت المثالي، وتوزيع الأدوار بتكامل.',
    copyEn: 'Practicing off-ball movement, pinpoint timing on passes, and cohesive tactical role execution.',
  },

  UOS_17_TENNIS_HERO: {
    key: 'UOS_17_TENNIS_HERO',
    url: 'https://i.postimg.cc/9fhKM9Xm/file-000000005dd481f4b42998c8f9ed3cd6.png',
    altAr: 'لاعب تنس ناشئ يتدرب داخل ملعب United Olympics Sports',
    altEn: 'Young tennis player training on United Olympics Sports court',
    role: 'Tennis Hero & Pathway',
    sportId: 'tennis',
    aspectRatio: '16/9',
    focalPointDesktop: '55% 50%',
    focalPointTablet: '50% 50%',
    focalPointMobile: '50% 45%',
    titleAr: 'مسار التنس: تركيز، توقيت، ودقة ضربات',
    titleEn: 'Tennis Pathway: Focus, Timing, and Shot Precision',
    copyAr: 'صقل حركة القدمين، توقيت التلامس مع الكرة، والثبات الذهني في كل نقطة.',
    copyEn: 'Refining agile footwork, contact-point timing, and mental resilience point after point.',
  },

  UOS_18_GYMNASTICS_HERO: {
    key: 'UOS_18_GYMNASTICS_HERO',
    url: 'https://i.postimg.cc/VNWTbN5s/file-00000000edb88210b32581b03ddcbf05.png',
    altAr: 'لاعبة جمباز ناشئة تؤدي تمرين توازن داخل الأكاديمية',
    altEn: 'Young gymnast executing a balance routine in the academy',
    role: 'Gymnastics Hero & Pathway',
    sportId: 'gymnastics',
    aspectRatio: '16/9',
    focalPointDesktop: '50% 45%',
    focalPointTablet: '50% 45%',
    focalPointMobile: '50% 40%',
    titleAr: 'مسار الجمباز: اتزان، مرونة، وثقة جسدية',
    titleEn: 'Gymnastics Pathway: Balance, Flexibility, and Physical Confidence',
    copyAr: 'بناء الأساس الحركي المتين، التحكم في الفضاء، وتطوير الرشاقة ضمن معايير أمان صارمة.',
    copyEn: 'Building solid neuromuscular fundamentals, spatial control, and agility within strict safety protocols.',
  },

  UOS_19_MARTIAL_ARTS_HERO: {
    key: 'UOS_19_MARTIAL_ARTS_HERO',
    url: 'https://i.postimg.cc/QM3wt7Ns/file-000000004ee48210aa2827f372a4d166.png',
    altAr: 'رياضيان ناشئان يظهران الاحترام والانضباط في تدريب الفنون القتالية',
    altEn: 'Young athletes demonstrating respect and discipline during martial arts practice',
    role: 'Martial Arts Hero & Pathway',
    sportId: 'martial-arts',
    aspectRatio: '16/9',
    focalPointDesktop: '50% 50%',
    focalPointTablet: '50% 50%',
    focalPointMobile: '50% 45%',
    titleAr: 'مسار الفنون القتالية: احترام، انضباط، وقوة داخلية',
    titleEn: 'Martial Arts Pathway: Respect, Discipline, and Inner Strength',
    copyAr: 'ثقافة تدريبية ترتكز على ضبط النفس، التركيز الذهني، التكنيك الدفاعي الدقيق والمسؤولية الأخلاقية.',
    copyEn: 'A training ethos centered on self-mastery, mental poise, precise defensive technique, and ethical responsibility.',
  },

  UOS_20_CLOSING_CTA: {
    key: 'UOS_20_CLOSING_CTA',
    url: 'https://i.postimg.cc/W4vC3ZpP/file-000000004ea48243acf35ee8f1ddd0a0.png',
    altAr: 'رياضيون ناشئون داخل بيئة United Olympics Sports التدريبية',
    altEn: 'Young athletes inside the United Olympics Sports training environment',
    role: 'Closing CTA Banner / Programs Hero',
    aspectRatio: '21/9',
    focalPointDesktop: '50% 50%',
    focalPointTablet: '50% 50%',
    focalPointMobile: '50% 45%',
    titleAr: 'خطوتك التالية تبدأ هنا',
    titleEn: 'Your Next Step Starts Here',
    copyAr: 'اكتشف البيئة الرياضية التي تساعدك على التطور بثقة وانضباط.',
    copyEn: 'Discover the sports environment that helps you grow with confidence and discipline.',
  },
};

export type MediaAssetKey = keyof typeof UOS_PUBLIC_MEDIA;

export function getPublicMedia(key: MediaAssetKey | string): PublicMediaAsset {
  return UOS_PUBLIC_MEDIA[key as MediaAssetKey] || UOS_PUBLIC_MEDIA.UOS_01_HOME_HERO;
}

export function getSportMediaByKey(sportId: string): { hero: PublicMediaAsset; card: PublicMediaAsset; technique?: PublicMediaAsset } {
  switch (sportId) {
    case 'football':
      return {
        card: UOS_PUBLIC_MEDIA.UOS_02_FOOTBALL_CARD,
        hero: UOS_PUBLIC_MEDIA.UOS_11_FOOTBALL_HERO,
        technique: UOS_PUBLIC_MEDIA.UOS_12_FOOTBALL_TECHNIQUE,
      };
    case 'swimming':
      return {
        card: UOS_PUBLIC_MEDIA.UOS_03_SWIMMING_CARD,
        hero: UOS_PUBLIC_MEDIA.UOS_13_SWIMMING_HERO,
        technique: UOS_PUBLIC_MEDIA.UOS_14_SWIMMING_TECHNIQUE,
      };
    case 'basketball':
      return {
        card: UOS_PUBLIC_MEDIA.UOS_04_BASKETBALL_CARD,
        hero: UOS_PUBLIC_MEDIA.UOS_15_BASKETBALL_HERO,
        technique: UOS_PUBLIC_MEDIA.UOS_16_BASKETBALL_DECISION,
      };
    case 'tennis':
      return {
        card: UOS_PUBLIC_MEDIA.UOS_05_TENNIS_CARD,
        hero: UOS_PUBLIC_MEDIA.UOS_17_TENNIS_HERO,
      };
    case 'gymnastics':
      return {
        card: UOS_PUBLIC_MEDIA.UOS_06_GYMNASTICS_CARD,
        hero: UOS_PUBLIC_MEDIA.UOS_18_GYMNASTICS_HERO,
      };
    case 'martial-arts':
      return {
        card: UOS_PUBLIC_MEDIA.UOS_07_MARTIAL_ARTS_CARD,
        hero: UOS_PUBLIC_MEDIA.UOS_19_MARTIAL_ARTS_HERO,
      };
    default:
      return {
        card: UOS_PUBLIC_MEDIA.UOS_02_FOOTBALL_CARD,
        hero: UOS_PUBLIC_MEDIA.UOS_11_FOOTBALL_HERO,
      };
  }
}

/**
 * Centralized MediaRegistry Module
 * Contains all 20 approved sports image URLs, responsive crop metadata, and alt text configurations.
 */
export const MediaRegistry = {
  ...UOS_PUBLIC_MEDIA,
  items: UOS_PUBLIC_MEDIA,
  get: getPublicMedia,
  getBySport: getSportMediaByKey,
  getAll: (): PublicMediaAsset[] => Object.values(UOS_PUBLIC_MEDIA),
  getSportsCards: (): PublicMediaAsset[] => [
    UOS_PUBLIC_MEDIA.UOS_02_FOOTBALL_CARD,
    UOS_PUBLIC_MEDIA.UOS_03_SWIMMING_CARD,
    UOS_PUBLIC_MEDIA.UOS_04_BASKETBALL_CARD,
    UOS_PUBLIC_MEDIA.UOS_05_TENNIS_CARD,
    UOS_PUBLIC_MEDIA.UOS_06_GYMNASTICS_CARD,
    UOS_PUBLIC_MEDIA.UOS_07_MARTIAL_ARTS_CARD,
  ],
  getHeroes: (): PublicMediaAsset[] => [
    UOS_PUBLIC_MEDIA.UOS_01_HOME_HERO,
    UOS_PUBLIC_MEDIA.UOS_09_ABOUT_HERO,
    UOS_PUBLIC_MEDIA.UOS_11_FOOTBALL_HERO,
    UOS_PUBLIC_MEDIA.UOS_13_SWIMMING_HERO,
    UOS_PUBLIC_MEDIA.UOS_15_BASKETBALL_HERO,
    UOS_PUBLIC_MEDIA.UOS_17_TENNIS_HERO,
    UOS_PUBLIC_MEDIA.UOS_18_GYMNASTICS_HERO,
    UOS_PUBLIC_MEDIA.UOS_19_MARTIAL_ARTS_HERO,
    UOS_PUBLIC_MEDIA.UOS_20_CLOSING_CTA,
  ],
};

export default MediaRegistry;

