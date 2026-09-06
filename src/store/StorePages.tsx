import {
  Award,
  Bell,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Edit3,
  Grid2X2,
  Heart,
  List,
  LogOut,
  MapPin,
  Package,
  RotateCcw,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
  Truck,
  Trash2,
  UserRound,
  WalletCards,
  X,
  Zap,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode, type RefObject } from 'react';
import { Link, NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useStore } from './StoreContext';
import {
  CategoryRail,
  DirectionArrow,
  ProductCard,
  ProductGrid,
  ProductMedia,
  ProductPrice,
  QuantityStepper,
  StoreCopy,
  StoreState,
} from './StoreComponents';
import {
  AthleticHighlightTicker,
  AthleteRewardTierCard,
  AthleteSizingAdvisorCard,
  DeliverySlotSelector,
  OrderProgressTrackerCard,
  PerformanceTechLabCard,
  PromoCodeField,
} from './StoreGeniusCards';
import type { StoreCategorySlug, StoreProduct } from './storeTypes';

const COLLECTIONS = [
  {
    id: 'swimming',
    name: { en: 'Aquatic Speed Collection', ar: 'مجموعة الأداء المائي المميّز' },
    tagline: { en: 'Olympic-grade hydrodynamic swimming gear and performance suits.', ar: 'معدات السباحة الهيدروديناميكية الفائقة وبدلات الأداء الاحترافي الأولمبي.' },
    banner: '/media/user-products/product_01.png',
    accent: '#d4af37',
    productIds: ['uo-swim-goggles-pro', 'uo-swim-cap-pro', 'uo-hydro-training-fins', 'uo-training-kickboard']
  },
  {
    id: 'football',
    name: { en: 'Gold Pitch Dominance', ar: 'مجموعة الهيمنة الذهبية للملاعب' },
    tagline: { en: 'FIFA-quality match balls & professional football equipment.', ar: 'كرات مباريات معتمدة بمواصفات الفيفا العالمية والعتاد الاحترافي لملاعب العشب.' },
    banner: '/media/user-products/product_05.png',
    accent: '#3f9b66',
    productIds: ['uo-pro-match-ball']
  },
  {
    id: 'apparel',
    name: { en: 'Championship Wear', ar: 'الملابس الرياضية الفاخرة' },
    tagline: { en: 'Performance apparel and thermal jackets designed for podium finishes.', ar: 'الملابس الرياضية وجاكيتات الإحماء المخصصة لمنصات التتويج.' },
    banner: '/media/user-products/product_08.png',
    accent: '#d4af37',
    productIds: ['uo-training-top', 'uo-training-shorts', 'uo-pro-track-jacket']
  },
  {
    id: 'accessories',
    name: { en: 'Athlete Essentials', ar: 'حقائب ومستلزمات الرياضيين' },
    tagline: { en: 'Insulated flasks & ballistic nylon duffles built for daily workouts.', ar: 'حقائب دافل متينة وزجاجات ترطيب حرارية معزولة للتمارين الرياضية الشاقة.' },
    banner: '/media/user-products/product_13.png',
    accent: '#9a6c15',
    productIds: ['uo-athlete-duffle-bag', 'uo-insulated-bottle']
  }
];

function BrandCollectionsSection() {
  const { products } = useStore();
  const [activeTab, setActiveTab] = useState('swimming');

  const currentCollection = useMemo(() => {
    return COLLECTIONS.find(c => c.id === activeTab) || COLLECTIONS[0];
  }, [activeTab]);

  const collectionProducts = useMemo(() => {
    return products.filter(p => currentCollection.productIds.includes(p.id));
  }, [products, currentCollection]);

  return (
    <section className="store-section" id="featured-brand-collections" style={{ padding: '40px 0' }}>
      <SectionHeading 
        eyebrow={{ en: 'Signature Series', ar: 'سلسلة التواقيع الحصرية' }} 
        title={{ en: 'Featured Brand Collections', ar: 'تشكيلات علاماتنا التجارية المميزة' }} 
      />

      {/* Tabs list with modern visual aesthetics */}
      <div className="store-tabs-container mb-8 flex gap-3 border-b border-gray-100 pb-4 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {COLLECTIONS.map((col) => (
          <button
            key={col.id}
            type="button"
            className={`px-6 py-3 rounded-full font-bold text-sm transition-all whitespace-nowrap cursor-pointer border ${
              activeTab === col.id
                ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/10 scale-[1.02]'
                : 'bg-white border-gray-200 text-gray-700 hover:border-amber-500 hover:text-amber-600'
            }`}
            onClick={() => setActiveTab(col.id)}
          >
            <StoreCopy value={col.name} inline />
          </button>
        ))}
      </div>

      {/* Collection Grid Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-6">
        {/* Banner/Hero element */}
        <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-2xl relative overflow-hidden bg-zinc-950 text-white min-h-[380px] lg:min-h-full transition-transform duration-500">
          <img 
            src={currentCollection.banner} 
            alt="Collection Banner" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity hover:opacity-75 transition-all duration-700 hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-amber-500 text-zinc-950 mb-4">
              UO SIGNATURE
            </span>
          </div>

          <div className="relative z-10 mt-auto">
            <h3 className="text-2xl lg:text-3xl font-black mb-2 tracking-tight">
              <StoreCopy value={currentCollection.name} />
            </h3>
            <p className="text-zinc-300 text-sm mb-6 leading-relaxed">
              <StoreCopy value={currentCollection.tagline} />
            </p>
            <Link 
              className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors" 
              to={`/store/category/${currentCollection.id === 'accessories' ? 'accessories' : currentCollection.id === 'apparel' ? 'apparel' : currentCollection.id}`}
            >
              <StoreCopy value={{ en: 'Explore Entire Line', ar: 'استكشف التشكيلة بالكامل' }} inline />
              <DirectionArrow />
            </Link>
          </div>
        </div>

        {/* Collection Products list */}
        <div className="lg:col-span-7">
          <ProductGrid products={collectionProducts} />
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, action }: { eyebrow: { en: string; ar: string }; title: { en: string; ar: string }; action?: ReactNode }) {
  return <header className="store-section-heading"><div><span><StoreCopy value={eyebrow} inline /></span><h2><StoreCopy value={title} /></h2></div>{action}</header>;
}

const BRAND_PRODUCTS: StoreProduct[] = [
  {
    id: 'uo-gold-goggles',
    slug: 'uo-gold-goggles',
    name: { en: 'UO Gold-Mirrored Competition Goggles', ar: 'نظارات المنافسة الذهبية العاكسة' },
    description: { en: 'Olympic-grade hydrodynamic goggles with premium gold-mirror coating.', ar: 'نظارات هيدروديناميكية بمستوى الأولمبياد مع طلاء مرآة ذهبي فاخر.' },
    category: 'swimming',
    type: { en: 'Swim Goggles', ar: 'نظارات سباحة' },
    price: 135,
    currency: 'AED',
    sku: 'UO-SW-G01',
    badge: 'new',
    image: '/media/products/gold_swim_goggles_1788602294440.jpg',
    colors: [{ en: 'Gold', ar: 'ذهبي' }]
  },
  {
    id: 'uo-white-gold-goggles',
    slug: 'uo-white-gold-goggles',
    name: { en: 'UO White-Gold Racing Goggles', ar: 'نظارات السباق البيضاء الذهبية' },
    description: { en: 'Sleek white racing frames paired with precision gold-mirrored lenses.', ar: 'إطارات سباق بيضاء أنيقة متطابقة مع عدسات عاكسة ذهبية دقيقة.' },
    category: 'swimming',
    type: { en: 'Swim Goggles', ar: 'نظارات سباحة' },
    price: 140,
    currency: 'AED',
    sku: 'UO-SW-G02',
    badge: 'featured',
    image: '/media/products/white_gold_goggles_1788602316154.jpg',
    colors: [{ en: 'White / Gold', ar: 'أبيض / ذهبي' }]
  },
  {
    id: 'uo-match-ball-white',
    slug: 'uo-match-ball-white',
    name: { en: 'UO Premium Match Ball (Ice White)', ar: 'كرة المباريات الفاخرة (أبيض جليدي)' },
    description: { en: 'Thermally bonded tournament-grade match ball featuring geometric paneling.', ar: 'كرة مباريات معتمدة للبطولات مدمجة حرارياً تتميز بألواح هندسية.' },
    category: 'football',
    type: { en: 'Match Balls', ar: 'كرات مباريات' },
    price: 95,
    currency: 'AED',
    sku: 'UO-FB-B01',
    badge: 'featured',
    image: '/media/products/uo_match_ball_white_1788602330644.jpg',
    colors: [{ en: 'White / Gold', ar: 'أبيض / ذهبي' }]
  },
  {
    id: 'uo-match-ball-black',
    slug: 'uo-match-ball-black',
    name: { en: 'UO Premium Match Ball (Stealth Black)', ar: 'كرة المباريات الفاخرة (أسود نفاث)' },
    description: { en: 'Tournament-grade match ball in obsidian black and elegant gold trim.', ar: 'كرة مباريات بجودة البطولات باللون الأسود النفاث مع حواف ذهبية أنيقة.' },
    category: 'football',
    type: { en: 'Match Balls', ar: 'كرات مباريات' },
    price: 95,
    currency: 'AED',
    sku: 'UO-FB-B02',
    badge: 'new',
    image: '/media/products/uo_match_ball_black_1788602346335.jpg',
    colors: [{ en: 'Black / Gold', ar: 'أسود / ذهبي' }]
  },
  {
    id: 'uo-swim-cap-black',
    slug: 'uo-swim-cap-black',
    name: { en: 'UO Silicone Pro Swim Cap (Matte Black)', ar: 'قبعة سباحة سيليكون برو (أسود مطفي)' },
    description: { en: 'Hydrodynamic silicone cap featuring the signature gold crest.', ar: 'قبعة سباحة سيليكون هيدروديناميكية تتميز بشعار الأسد الذهبي المميز.' },
    category: 'swimming',
    type: { en: 'Swim Caps', ar: 'قبعات سباحة' },
    price: 49,
    currency: 'AED',
    sku: 'UO-SW-C01',
    image: '/media/products/uo_swim_cap_black_1788602360225.jpg',
    colors: [{ en: 'Black / Gold', ar: 'أسود / ذهبي' }]
  },
  {
    id: 'uo-swim-cap-white',
    slug: 'uo-swim-cap-white',
    name: { en: 'UO Silicone Pro Swim Cap (Ice White)', ar: 'قبعة سباحة سيليكون برو (أبيض جليدي)' },
    description: { en: 'High-durability racing cap in pristine white with gold emblem.', ar: 'قبعة سباحة عالية المتانة بلون أبيض ناصع مع شعار ذهبي.' },
    category: 'swimming',
    type: { en: 'Swim Caps', ar: 'قبعات سباحة' },
    price: 49,
    currency: 'AED',
    sku: 'UO-SW-C02',
    image: '/media/products/uo_swim_cap_white_1788602374799.jpg',
    colors: [{ en: 'White / Gold', ar: 'أبيض / ذهبي' }]
  },
  {
    id: 'uo-jersey-black',
    slug: 'uo-jersey-black',
    name: { en: 'UO Championship Compression Jersey (Stealth Black)', ar: 'قميص ضغط لبطولات النخبة (أسود)' },
    description: { en: '4-way stretch moisture-wicking compression jersey with ventilation zones.', ar: 'قميص ضغط مرن طارد للرطوبة رباعي الاتجاهات مع مناطق تهوية.' },
    category: 'apparel',
    type: { en: 'Performance Apparel', ar: 'ملابس تدريب وأداء' },
    price: 155,
    currency: 'AED',
    sku: 'UO-AP-J01',
    badge: 'featured',
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/media/products/uo_jersey_black_1788602397846.jpg',
    colors: [{ en: 'Black / Gold', ar: 'أسود / ذهبي' }]
  },
  {
    id: 'uo-jersey-white',
    slug: 'uo-jersey-white',
    name: { en: 'UO Championship Compression Jersey (Ice White)', ar: 'قميص ضغط لبطولات النخبة (أبيض)' },
    description: { en: 'Ultra-breathable performance top with golden flatlock seams.', ar: 'قميص أداء فائق التهوية مع درزات مسطحة ذهبية.' },
    category: 'apparel',
    type: { en: 'Performance Apparel', ar: 'ملابس تدريب وأداء' },
    price: 155,
    currency: 'AED',
    sku: 'UO-AP-J02',
    badge: 'new',
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/media/products/uo_jersey_white_1788602413628.jpg',
    colors: [{ en: 'White / Gold', ar: 'أبيض / ذهبي' }]
  },
  {
    id: 'uo-shorts-black',
    slug: 'uo-shorts-black',
    name: { en: 'UO Elite Training Shorts (Stealth Black)', ar: 'شورت تدريب للأداء الرياضي (أسود)' },
    description: { en: 'Lightweight woven training shorts with gold-accented drawstrings.', ar: 'شورت تدريب منسوج خفيف الوزن مع أربطة مزينة بالذهب.' },
    category: 'apparel',
    type: { en: 'Training Shorts', ar: 'شورتات تدريب' },
    price: 105,
    currency: 'AED',
    sku: 'UO-AP-S01',
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/media/products/uo_shorts_black_1788602425759.jpg',
    colors: [{ en: 'Black / Gold', ar: 'أسود / ذهبي' }]
  },
  {
    id: 'uo-shorts-white',
    slug: 'uo-shorts-white',
    name: { en: 'UO Elite Training Shorts (Ice White)', ar: 'شورت تدريب للأداء الرياضي (أبيض)' },
    description: { en: 'Premium sportswear training shorts in pristine white.', ar: 'شورت تدريب رياضي مميز بلون أبيض ناصع.' },
    category: 'apparel',
    type: { en: 'Training Shorts', ar: 'شورتات تدريب' },
    price: 105,
    currency: 'AED',
    sku: 'UO-AP-S02',
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/media/products/uo_shorts_white_1788602439716.jpg',
    colors: [{ en: 'White / Gold', ar: 'أبيض / ذهبي' }]
  },
  {
    id: 'uo-jacket-black',
    slug: 'uo-jacket-black',
    name: { en: 'UO Pro Elite Windrunner Jacket', ar: 'جاكيت وايند رانر إيليت للمحترفين' },
    description: { en: 'Weatherproof outer layer designed for pre-game warmth and comfort.', ar: 'سترة واقية من الرياح ومقاومة للعوامل الجوية مصممة للإحماء.' },
    category: 'apparel',
    type: { en: 'Jackets & Outerwear', ar: 'جاكيتات وملابس خارجية' },
    price: 295,
    currency: 'AED',
    sku: 'UO-AP-JK01',
    badge: 'new',
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/media/products/uo_jacket_black_1788602453148.jpg',
    colors: [{ en: 'Black / Gold', ar: 'أسود / ذهبي' }]
  },
  {
    id: 'uo-duffle-bag-ballistic',
    slug: 'uo-duffle-bag-ballistic',
    name: { en: 'UO Heavy-Duty Ballistic Duffle Bag', ar: 'حقيبة دافل باليستية شديدة التحمل' },
    description: { en: 'Maximum-capacity athlete bag with ventilated shoe pocket.', ar: 'حقيبة رياضية عالية السعة مع جيب أحذية مخصص وجيد التهوية.' },
    category: 'accessories',
    type: { en: 'Gym & Travel Bags', ar: 'حقائب تدريب وسفر' },
    price: 185,
    currency: 'AED',
    sku: 'UO-AC-B01',
    badge: 'featured',
    image: '/media/products/uo_duffle_bag_1788602466489.jpg',
    colors: [{ en: 'Obsidian / Gold', ar: 'أسود نفاث / ذهبي' }]
  },
  {
    id: 'uo-swim-fins-propulsion',
    slug: 'uo-swim-fins-propulsion',
    name: { en: 'UO Hydro-Propulsion Training Fins', ar: 'زعانف تدريب هيدرو برو للدفع' },
    description: { en: 'Dual-density training fins designed to build lower-body strength.', ar: 'زعانف تدريب مزدوجة الكثافة مصممة لزيادة قوة الجزء السفلي.' },
    category: 'swimming',
    type: { en: 'Training Equipment', ar: 'معدات تدريب' },
    price: 215,
    currency: 'AED',
    sku: 'UO-SW-F01',
    sizes: ['38-40', '41-43', '44-46'],
    image: '/media/products/uo_swim_fins_1788602487150.jpg',
    colors: [{ en: 'Black / Gold', ar: 'أسود / ذهبي' }]
  },
  {
    id: 'uo-kickboard-eva',
    slug: 'uo-kickboard-eva',
    name: { en: 'UO Closed-Cell EVA Kickboard', ar: 'لوح تدريب عالي الطفو من أسيتات إيفا' },
    description: { en: 'Buoyant training kickboard with anti-slip textured grip.', ar: 'لوح تدريب سباحة عالي الطفو مع قبضة مريحة ومقاومة للانزلاق.' },
    category: 'swimming',
    type: { en: 'Training Equipment', ar: 'معدات تدريب' },
    price: 89,
    currency: 'AED',
    sku: 'UO-SW-K01',
    image: '/media/products/uo_kickboard_1788602504166.jpg',
    colors: [{ en: 'Matte Black / Gold', ar: 'أسود مطفي / ذهبي' }]
  },
  {
    id: 'uo-bottle-insulated',
    slug: 'uo-bottle-insulated',
    name: { en: 'UO Double-Wall Insulated Flask', ar: 'قارورة مياه حرارية معزولة' },
    description: { en: '18/8 food-grade stainless steel bottle keeping beverages ice-cold.', ar: 'قارورة مياه من الفولاذ المقاوم للصدأ تحفظ البرودة طوال اليوم.' },
    category: 'accessories',
    type: { en: 'Hydration & Flasks', ar: 'زجاجات وترطيب' },
    price: 75,
    currency: 'AED',
    sku: 'UO-AC-FL01',
    image: '/media/products/uo_bottle_1788602519756.jpg',
    colors: [{ en: 'Matte Black / Gold', ar: 'أسود مطفي / ذهبي' }]
  },
  {
    id: 'uo-basketball-court',
    slug: 'uo-basketball-court',
    name: { en: 'UO Official Court Basketball', ar: 'كرة سلة معتمدة للملاعب' },
    description: { en: 'Composite leather match basketball engineered for elite grip.', ar: 'كرة سلة من الجلد المركب مخصصة للمباريات وتضمن ثبات اليد.' },
    category: 'basketball',
    type: { en: 'Basketball Equipment', ar: 'معدات كرة السلة' },
    price: 195,
    currency: 'AED',
    sku: 'UO-BB-B01',
    badge: 'new',
    image: '/media/products/uo_basketball_1788602536173.jpg',
    colors: [{ en: 'Gold / Black', ar: 'أسود / ذهبي' }]
  },
  {
    id: 'uo-running-shoes-elite',
    slug: 'uo-running-shoes-elite',
    name: { en: 'UO Elite Streak Running Shoes (Carbon Plate)', ar: 'حذاء الجري النخبوي إيليت ستريك' },
    description: { en: 'High-rebound running shoes featuring responsive foam and carbon plate.', ar: 'حذاء جري نخبوي مرتد للغاية يتميز برغوة تفاعلية ولوح كربون.' },
    category: 'equipment',
    type: { en: 'Footwear & Gear', ar: 'الأحذية والمعدات' },
    price: 450,
    currency: 'AED',
    sku: 'UO-EQ-S01',
    badge: 'featured',
    sizes: ['41', '42', '43', '44', '45'],
    image: '/media/products/uo_running_shoes_1788602556010.jpg',
    colors: [{ en: 'Black / Gold', ar: 'أسود / ذهبي' }]
  }
];

export function StoreHomePage() {
  const { categories, products, isPreview } = useStore();
  const swimming = products.filter((product) => product.category === 'swimming').slice(0, 4);
  const football = products.filter((product) => product.category === 'football').slice(0, 4);
  const athlete = products.filter((product) => ['apparel', 'accessories'].includes(product.category)).slice(0, 4);
  return <>
    <section className="store-home-hero">
      <div className="store-home-primary">
        <img src="/media/products/hero-banner.jpg" alt="United Olympics Sports Champions | أبطال يونايتد أوليمبيكس سبورت" />
        <div className="store-hero-shade" />
        <div className="store-hero-copy">
          <span>UNITED OLYMPICS SPORT · CHAMPION EDITION</span>
          <h1><StoreCopy value={{ en: 'Champion Grade Performance', ar: 'أداء بمعايير أبطال الأولمبياد' }} /></h1>
          <p><StoreCopy value={{ en: 'Elite athletic apparel, match-grade balls, and hydrodynamic swimming equipment engineered for podium finishes.', ar: 'ملابس رياضية راقية، كرات مباريات معتمدة، ومعدات سباحة هيدروديناميكية مصممة خصيصاً لمنصات التتويج.' }} /></p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link className="store-button store-button-primary" to="/store/shop">
              <StoreCopy value={{ en: 'Shop the Collection', ar: 'تسوق التشكيلة كاملة' }} inline />
              <DirectionArrow />
            </Link>
            <Link className="store-button store-button-secondary" to="/store/category/swimming">
              <StoreCopy value={{ en: 'Explore Swimming', ar: 'مستلزمات السباحة' }} inline />
            </Link>
          </div>
        </div>
      </div>
      <div className="store-hero-secondary">
        <article>
          <img src="/media/user-products/product_01.png" alt="Aqua Speed Racing Goggles | نظارات السباحة الاحترافية" referrerPolicy="no-referrer" />
          <div>
            <small>SWIMMING PRO</small>
            <h2><StoreCopy value={{ en: 'Hydro Pro Goggles & Caps', ar: 'نظارات وقبعات السباحة الهيدروديناميكية' }} /></h2>
            <Link to="/store/category/swimming"><StoreCopy value={{ en: 'Explore', ar: 'استكشف' }} inline /><DirectionArrow /></Link>
          </div>
        </article>
        <article>
          <img src="/media/user-products/product_05.png" alt="FIFA Pro Match Ball | كرة المباريات المعتمدة" referrerPolicy="no-referrer" />
          <div>
            <small>MATCH SPEC BALLS</small>
            <h2><StoreCopy value={{ en: 'FIFA Pro Quality Spec', ar: 'كرات مطابقة لأعلى المعايير' }} /></h2>
            <Link to="/store/category/football"><StoreCopy value={{ en: 'Match Balls', ar: 'كرات المباريات' }} inline /><DirectionArrow /></Link>
          </div>
        </article>
      </div>
    </section>
    <AthleticHighlightTicker />

    {/* Luxury Pillars of Trust Strip */}
    <div className="store-trust-strip">
      <div>
        <ShieldCheck aria-hidden="true" />
        <StoreCopy value={{ en: '100% Certified Authentic Gear', ar: 'عتاد أولمبي أصلي ومعتمد 100%' }} />
      </div>
      <div>
        <Zap aria-hidden="true" />
        <StoreCopy value={{ en: 'Express GCC Air Delivery (24-48h)', ar: 'شحن سريع للإمارات والخليج (24-48 ساعة)' }} />
      </div>
      <div>
        <Award aria-hidden="true" />
        <StoreCopy value={{ en: 'World Competition Standards', ar: 'مطابق لمواصفات البطولات الدولية' }} />
      </div>
      <div>
        <RotateCcw aria-hidden="true" />
        <StoreCopy value={{ en: '30-Day Hassle-Free Exchange', ar: 'استبدال واسترجاع ميسر خلال 30 يومًا' }} />
      </div>
    </div>

    <CategoryRail categories={categories} />
    {!isPreview && <div className="store-page-pad"><StoreState kind="empty" title={{ en: 'Production catalog not connected', ar: 'كتالوج الإنتاج غير متصل' }} description={{ en: 'Connect verified products, pricing and media to publish the store catalog.', ar: 'اربط المنتجات والأسعار والوسائط الموثقة لنشر كتالوج المتجر.' }} /></div>}
    {isPreview && <>
      {/* Featured / New Arrivals Section */}
      <section className="store-section">
        <SectionHeading eyebrow={{ en: 'Elite Releases', ar: 'إصدارات النخبة' }} title={{ en: 'New Arrivals & Best Sellers', ar: 'وصل حديثًا والأكثر طلبًا' }} action={<Link to="/store/shop"><StoreCopy value={{ en: 'View All Products', ar: 'عرض جميع المنتجات' }} inline /><DirectionArrow /></Link>} />
        <ProductGrid products={products.slice(0, 4)} />
      </section>

      {/* Brand Collections Showcase (Dynamic Section with User Assets) */}
      <BrandCollectionsSection />

      {/* NEW: Official Academy Championship Line (Historical Branded Products) */}
      <section className="store-section store-section-tinted" style={{ padding: '60px 0' }}>
        <SectionHeading 
          eyebrow={{ en: 'Championship Legacy', ar: 'إرث البطولات الحقيقي' }} 
          title={{ en: 'Official Academy Championship Line', ar: 'خط منتجات الأكاديمية الرسمي للبطولات' }} 
        />
        <div className="store-page-pad" style={{ padding: '0 34px' }}>
          <ProductGrid products={BRAND_PRODUCTS} />
        </div>
      </section>

      {/* Swimming Essentials Showcase */}
      <section className="store-section store-section-tinted">
        <SectionHeading eyebrow={{ en: 'Water Performance', ar: 'أداء السباحة الأولمبي' }} title={{ en: 'Hydrodynamic Swimming Essentials', ar: 'مستلزمات السباحة عالية الانسيابية' }} action={<Link to="/store/category/swimming"><StoreCopy value={{ en: 'View Collection', ar: 'عرض المجموعة كاملة' }} inline /><DirectionArrow /></Link>} />
        <ProductGrid products={swimming} />
      </section>

      {/* Editorial Highlights Grid */}
      <section className="store-editorial-grid store-section">
        <article className="store-editorial-light">
          <img src="/media/user-products/product_12.png" alt="United Olympics Track Jacket | سترة تدريب يونايتد أوليمبيكس" referrerPolicy="no-referrer" />
          <div>
            <span>OLYMPIC APPAREL</span>
            <h2><StoreCopy value={{ en: 'Engineered for Cold-Weather Warmups', ar: 'مصممة للإحماء والحماية الرياضية' }} /></h2>
            <Link className="store-button store-button-secondary" to="/store/category/apparel"><StoreCopy value={{ en: 'Explore Apparel', ar: 'استكشف الملابس' }} inline /></Link>
          </div>
        </article>
        <article className="store-editorial-dark">
          <img src="/media/user-products/product_13.png" alt="United Olympic Gear Combo | تشكيلة معدات يونايتد الأولمبية" referrerPolicy="no-referrer" />
          <div>
            <span>TRAIN WITH PURPOSE</span>
            <h2><StoreCopy value={{ en: 'Heavy-Duty Match & Practice Gear', ar: 'عتاد التدريب والمباريات عالي التحمل' }} /></h2>
            <Link to="/store/category/accessories"><StoreCopy value={{ en: 'Gear & Equipment', ar: 'المعدات والإكسسوارات' }} inline /><DirectionArrow /></Link>
          </div>
        </article>
        <article className="store-quality-card">
          <ShieldCheck />
          <h2><StoreCopy value={{ en: 'Olympic Federation Grade', ar: 'معتمد من الاتحادات الرياضية' }} /></h2>
          <p><StoreCopy value={{ en: 'Every stitch, seal, and texture adheres strictly to world championship regulations for optimum athletic achievement.', ar: 'كل حياكة وخامة وملمس يخضع لأعلى المعايير العالمية لضمان تحقيق أفضل الأرقام والبطولات.' }} /></p>
        </article>
      </section>

      {/* Genius Innovation & Materials Section */}
      <section className="store-section">
        <SectionHeading eyebrow={{ en: 'Olympic Engineering', ar: 'هندسة أولمبية' }} title={{ en: 'Material Innovation Lab', ar: 'مختبر الابتكار وتطوير الأقمشة الرياضية' }} />
        <PerformanceTechLabCard />
      </section>

      {/* Match Balls & Football Section */}
      {football.length > 0 && (
        <section className="store-section store-section-tinted">
          <SectionHeading eyebrow={{ en: 'Pitch Dominance', ar: 'السيطرة على الميدان' }} title={{ en: 'Match Balls & Football Equipment', ar: 'كرات المباريات ومعدات كرة القدم' }} action={<Link to="/store/category/football"><StoreCopy value={{ en: 'View Football Gear', ar: 'عرض معدات كرة القدم' }} inline /><DirectionArrow /></Link>} />
          <ProductGrid products={football} />
        </section>
      )}

      {/* Genius Sizing Advisor Section */}
      <section className="store-section">
        <SectionHeading eyebrow={{ en: 'Precision Fit', ar: 'دقة المقاسات' }} title={{ en: 'Interactive Athlete Sizing Advisor', ar: 'مستشار المقاسات الرياضي الذكي' }} />
        <AthleteSizingAdvisorCard />
      </section>

      {/* Athlete Apparel & Accessories Section */}
      <section className="store-section store-section-tinted">
        <SectionHeading eyebrow={{ en: 'United Selection', ar: 'اختيارات يونايتد' }} title={{ en: 'Athlete Essentials & Training Wear', ar: 'مستلزمات الرياضيين وملابس التدريب' }} action={<Link to="/store/category/apparel"><StoreCopy value={{ en: 'View Apparel', ar: 'عرض الملابس' }} inline /><DirectionArrow /></Link>} />
        <ProductGrid products={athlete} />
      </section>

      {/* Official Identity Banner */}
      <section className="store-merch-banner">
        <img src="/brand/united-olympics-sports-logo.png" alt="United Olympics Sports | يونايتد أوليمبيكس سبورت" />
        <div>
          <span>OFFICIAL IDENTITY · الهوية الرسمية المعتمدة</span>
          <h2><StoreCopy value={{ en: 'United Olympics Sports Official Merchandise', ar: 'منتجات يونايتد أوليمبيكس سبورت الرسمية' }} /></h2>
          <p><StoreCopy value={{ en: 'Equip yourself with the official apparel and gear worn by our academy athletes and world-class competitors.', ar: 'تزود بالزي الرسمي والمعدات المعتمدة التي يرتديها رياضيو الأكاديمية وأبطال المنافسات الدولية.' }} /></p>
        </div>
        <Link className="store-button store-button-primary" to="/store/shop">
          <StoreCopy value={{ en: 'Open Complete Catalog', ar: 'استعراض الكتالوج الكامل' }} inline />
        </Link>
      </section>
    </>}
  </>;
}

function FilterPanel({ selected, onSelect, onClose, panelRef }: { selected: string; onSelect: (slug: string) => void; onClose?: () => void; panelRef?: RefObject<HTMLElement | null> }) {
  const { categories } = useStore();
  return <aside ref={panelRef} tabIndex={onClose ? -1 : undefined} className="store-filters"><header><h2><StoreCopy value={{ en: 'Filters', ar: 'تصفية' }} inline /></h2><div><button type="button" className="store-filter-clear" onClick={() => onSelect('')}><StoreCopy value={{ en: 'Clear All', ar: 'مسح الكل' }} inline /></button>{onClose && <button type="button" onClick={onClose} aria-label="Close filters | إغلاق التصفية"><X /></button>}</div></header><section><h3><StoreCopy value={{ en: 'Category', ar: 'الفئة' }} inline /></h3><label><input type="radio" name="category" checked={!selected} onChange={() => onSelect('')} /><span><StoreCopy value={{ en: 'All Categories', ar: 'كل الفئات' }} inline /></span></label>{categories.map((category) => <label key={category.slug}><input type="radio" name="category" checked={selected === category.slug} onChange={() => onSelect(category.slug)} /><span><StoreCopy value={category.name} inline /></span></label>)}</section><section><h3><StoreCopy value={{ en: 'Availability', ar: 'التوفر' }} inline /></h3><p><StoreCopy value={{ en: 'Awaiting production inventory source', ar: 'بانتظار مصدر مخزون الإنتاج' }} /></p></section><section><h3><StoreCopy value={{ en: 'Price', ar: 'السعر' }} inline /></h3><p><StoreCopy value={{ en: 'Uses configured catalog currency', ar: 'يستخدم عملة الكتالوج المهيأة' }} /></p></section>{onClose && <button type="button" className="store-button store-button-primary" onClick={onClose}><StoreCopy value={{ en: 'Apply Filters', ar: 'تطبيق التصفية' }} inline /></button>}</aside>;
}

export function CatalogPage({ categoriesOnly = false }: { categoriesOnly?: boolean }) {
  const { categories, products } = useStore();
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState('featured');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filterRef = useRef<HTMLElement>(null);
  const filterTriggerRef = useRef<HTMLButtonElement>(null);
  const selected = params.get('category') ?? '';
  const filtered = useMemo(() => products.filter((product) => !selected || product.category === selected).sort((a, b) => sort === 'price-low' ? a.price - b.price : sort === 'price-high' ? b.price - a.price : 0), [products, selected, sort]);
  const selectCategory = (category: string) => { const next = new URLSearchParams(params); category ? next.set('category', category) : next.delete('category'); setParams(next); };
  useEffect(() => {
    if (!filtersOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const frame = requestAnimationFrame(() => filterRef.current?.focus());
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setFiltersOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('keydown', onKey); document.body.style.overflow = previousOverflow; filterTriggerRef.current?.focus(); };
  }, [filtersOpen]);
  return <div className="store-catalog-page">
    <div className="store-page-heading">
      <nav><Link to="/store">Home</Link><ChevronRight /><span>{categoriesOnly ? 'Categories' : 'Shop'}</span></nav>
      <span>UNITED COMMERCE</span>
      <h1><StoreCopy value={categoriesOnly ? { en: 'All Categories', ar: 'جميع الفئات' } : { en: 'Shop', ar: 'المتجر' }} /></h1>
      <p><StoreCopy value={{ en: 'A disciplined catalog architecture ready for verified products and inventory.', ar: 'بنية كتالوج منضبطة وجاهزة للمنتجات والمخزون الموثق.' }} /></p>
    </div>
    <CategoryRail categories={categories} active={selected} />
    <div className="store-catalog-toolbar">
      <div><strong>{filtered.length}</strong> <StoreCopy value={{ en: 'preview products', ar: 'منتجات معاينة' }} inline /></div>
      <button ref={filterTriggerRef} type="button" className="store-mobile-filter" onClick={() => setFiltersOpen(true)}><SlidersHorizontal /><StoreCopy value={{ en: 'Filters', ar: 'تصفية' }} inline /></button>
      <label><span className="sr-only">Sort | ترتيب</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured | مميز</option><option value="price-low">Price: Low | السعر: الأقل</option><option value="price-high">Price: High | السعر: الأعلى</option></select></label>
      <button type="button" className={view === 'grid' ? 'is-active' : ''} onClick={() => setView('grid')} aria-pressed={view === 'grid'} aria-label="Grid view | عرض شبكي"><Grid2X2 /></button>
      <button type="button" className={view === 'list' ? 'is-active' : ''} onClick={() => setView('list')} aria-pressed={view === 'list'} aria-label="List view | عرض قائمة"><List /></button>
    </div>
    <div className="store-catalog-layout"><FilterPanel selected={selected} onSelect={selectCategory} /><section><ProductGrid products={filtered} layout={view} /></section></div>
    {filtersOpen && <div className="store-filter-layer" role="dialog" aria-modal="true" aria-label="Product filters | تصفية المنتجات"><button className="store-drawer-backdrop" type="button" aria-label="Close filters | إغلاق التصفية" onClick={() => setFiltersOpen(false)} /><FilterPanel panelRef={filterRef} selected={selected} onSelect={selectCategory} onClose={() => setFiltersOpen(false)} /></div>}
  </div>;
}

export function CategoryPage() {
  const { slug } = useParams();
  const { categories, products } = useStore();
  const category = categories.find((item) => item.slug === slug);
  if (!category) return <div className="store-page-pad"><StoreState kind="empty" title={{ en: 'Category unavailable', ar: 'الفئة غير متاحة' }} description={{ en: 'This category is not present in the verified catalog.', ar: 'هذه الفئة غير موجودة في الكتالوج الموثق.' }} action={<Link className="store-button store-button-primary" to="/store/categories"><StoreCopy value={{ en: 'All Categories', ar: 'كل الفئات' }} inline /></Link>} /></div>;
  const categoryProducts = products.filter((product) => product.category === category.slug);
  return <div className="store-category-page"><section className="store-category-hero" style={{ '--sport-accent': category.accent } as React.CSSProperties}>{category.hero && <img src={category.hero} alt={`${category.name.en} | ${category.name.ar}`} />}<div className="store-category-hero-shade" /><div><span className="store-category-emblem" aria-hidden="true"><Package /></span><small>SPORT COLLECTION</small><h1><StoreCopy value={category.name} /></h1><p><StoreCopy value={category.description} /></p></div></section><CategoryRail categories={categories} active={category.slug} /><section className="store-section"><SectionHeading eyebrow={{ en: 'Preview Catalog', ar: 'كتالوج المعاينة' }} title={category.name} /><div className="store-catalog-layout"><FilterPanel selected={category.slug} onSelect={() => undefined} /><ProductGrid products={categoryProducts} /></div></section></div>;
}

export function SearchResultsPage() {
  const { products } = useStore();
  const [params] = useSearchParams();
  const query = params.get('q')?.trim() ?? '';
  const results = products.filter((product) => `${product.name.en} ${product.name.ar} ${product.type.en} ${product.type.ar}`.toLowerCase().includes(query.toLowerCase()));
  return <section className="store-section store-search-page"><div className="store-page-heading"><span>SEARCH</span><h1><StoreCopy value={{ en: 'Search Results', ar: 'نتائج البحث' }} /></h1><p>{query ? <><StoreCopy value={{ en: 'Results for', ar: 'نتائج البحث عن' }} inline /> “{query}”</> : <StoreCopy value={{ en: 'Enter a term in the store search.', ar: 'أدخل عبارة في بحث المتجر.' }} />}</p></div>{query ? <ProductGrid products={results} /> : <StoreState kind="empty" title={{ en: 'Start your search', ar: 'ابدأ البحث' }} description={{ en: 'Search products, sports or categories from the header.', ar: 'ابحث عن المنتجات أو الرياضات أو الفئات من الشريط العلوي.' }} />}</section>;
}

export function ProductDetailPage() {
  const { slug } = useParams();
  const { products, addToCart, wishlist, toggleWishlist, setMiniCartOpen } = useStore();
  const navigate = useNavigate();
  const product = products.find((item) => item.slug === slug);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<string | undefined>();
  const [color, setColor] = useState<string | undefined>(product?.colors?.[0]?.en);
  const [tab, setTab] = useState('description');
  const [mediaIndex, setMediaIndex] = useState(0);
  if (!product) return <div className="store-page-pad"><StoreState kind="unavailable" title={{ en: 'Product unavailable', ar: 'المنتج غير متاح' }} description={{ en: 'This product is not available from the current verified source.', ar: 'هذا المنتج غير متاح من المصدر الموثق الحالي.' }} action={<Link className="store-button store-button-primary" to="/store/shop"><StoreCopy value={{ en: 'Return to Shop', ar: 'العودة للمتجر' }} inline /></Link>} /></div>;
  const related = products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 4);
  const wished = wishlist.includes(product.id);
  const media = Array.from(new Set([product.image, ...(product.gallery ?? [])].filter((source): source is string => Boolean(source))));
  const activeMedia = media[mediaIndex];
  const changeMedia = (offset: number) => setMediaIndex((current) => (current + offset + media.length) % media.length);
  return <div className="store-product-page">
    <nav className="store-breadcrumb"><Link to="/store">Home</Link><ChevronRight /><Link to={`/store/category/${product.category}`}>{product.category}</Link><ChevronRight /><span>{product.name.en}</span></nav>
    <section className="store-product-layout">
      <div className="store-product-gallery">
        <div className="store-thumbnails">
          {media.length ? media.map((source, index) => <button key={`${source}-${index}`} type="button" className={index === mediaIndex ? 'is-active' : ''} onClick={() => setMediaIndex(index)} aria-pressed={index === mediaIndex} aria-label={`Product media ${index + 1} | صورة المنتج ${index + 1}`}><img src={source} alt="" /></button>) : <button type="button" className="is-active" disabled aria-label="Product media pending | صورة المنتج معلقة"><ShoppingBag /></button>}
        </div>
        <ProductMedia product={product} hero source={activeMedia} />
        {media.length > 1 && <><button className="store-gallery-prev" type="button" onClick={() => changeMedia(-1)} aria-label="Previous image | الصورة السابقة">‹</button><button className="store-gallery-next" type="button" onClick={() => changeMedia(1)} aria-label="Next image | الصورة التالية">›</button></>}
      </div>
      <div className="store-product-info">
        <span className="store-product-eyebrow"><StoreCopy value={product.type} inline /></span>
        <h1><StoreCopy value={product.name} /></h1>
        <div className="store-sku"><span>SKU</span><code>{product.sku}</code></div>
        <ProductPrice product={product} size="l" />
        <div className="store-availability store-in-stock"><span className="store-stock-pulse-dot" aria-hidden="true" /><StoreCopy value={{ en: 'In Stock · Ready for Immediate Dispatch', ar: 'متوفر في المخزون · جاهز للشحن الفوري' }} inline /></div>
        <p><StoreCopy value={product.description} /></p>
        {product.colors && <fieldset className="store-variants"><legend><StoreCopy value={{ en: 'Color Option', ar: 'اختيار اللون' }} inline /></legend><div>{product.colors.map((item) => <button type="button" key={item.en} className={color === item.en ? 'is-selected' : ''} onClick={() => { setColor(item.en); if ((item.en.toLowerCase().includes('white') || item.en.toLowerCase().includes('ivory')) && media.length > 1) { setMediaIndex(1); } else if (media.length > 0) { setMediaIndex(0); } }} aria-pressed={color === item.en}><i style={{ background: item.en.toLowerCase().includes('white') ? '#f5f5f5' : item.en.toLowerCase().includes('black') ? '#181818' : item.en.toLowerCase().includes('gold') ? '#d4af37' : item.en.toLowerCase().includes('blue') ? '#1e3a8a' : '#333' }} /><StoreCopy value={item} inline /></button>)}</div></fieldset>}
        {product.sizes && <fieldset className="store-sizes"><legend><StoreCopy value={{ en: 'Select Size', ar: 'اختر المقاس' }} inline /></legend><div>{product.sizes.map((item) => <button type="button" key={item} className={size === item ? 'is-selected' : ''} onClick={() => setSize(item)} aria-pressed={size === item}>{item}</button>)}</div></fieldset>}
        <div className="store-buy-row"><QuantityStepper value={quantity} onChange={setQuantity} /><button className="store-button store-button-primary" type="button" onClick={() => addToCart(product, { quantity, size, color })}><ShoppingBag /><StoreCopy value={{ en: 'Add to Cart', ar: 'أضف إلى السلة' }} inline /></button></div>
        <button className="store-button store-button-dark" type="button" onClick={() => { addToCart(product, { quantity, size, color }); setMiniCartOpen(false); navigate('/store/checkout'); }}><StoreCopy value={{ en: 'Buy Now', ar: 'اشترِ الآن' }} inline /></button>
        <button className={`store-button store-button-wishlist ${wished ? 'is-active' : ''}`} type="button" onClick={() => toggleWishlist(product.id)} aria-pressed={wished}><Heart /><StoreCopy value={wished ? { en: 'Saved to Wishlist', ar: 'محفوظ في المفضلة' } : { en: 'Add to Wishlist', ar: 'أضف إلى المفضلة' }} inline /></button>
        <div className="store-product-benefits">
          <span><ShieldCheck aria-hidden="true" /><StoreCopy value={{ en: '100% Olympic Grade', ar: 'معتمد للبطولات الأولمبية' }} /></span>
          <span><Truck aria-hidden="true" /><StoreCopy value={{ en: 'Express GCC Delivery (24-48h)', ar: 'شحن سريع للإمارات ودول الخليج' }} /></span>
          <span><Award aria-hidden="true" /><StoreCopy value={{ en: 'Official Federation Approved', ar: 'مطابق لمواصفات الاتحادات الرياضية' }} /></span>
          <span><RotateCcw aria-hidden="true" /><StoreCopy value={{ en: '30-Day Hassle-Free Returns', ar: 'إرجاع واستبدال مرن خلال 30 يوماً' }} /></span>
        </div>
      </div>
    </section>
    <section className="store-product-tabs">
      <div role="tablist">{[['description', 'Description', 'الوصف'], ['specifications', 'Specifications', 'المواصفات'], ['size', 'Size Guide', 'دليل المقاسات'], ['shipping', 'Shipping', 'الشحن والتوصيل'], ['returns', 'Returns', 'الإرجاع']].map(([id, en, ar]) => <button type="button" role="tab" aria-selected={tab === id} className={tab === id ? 'is-active' : ''} onClick={() => setTab(id)} key={id}><StoreCopy value={{ en, ar }} inline /></button>)}</div>
      <article role="tabpanel">
        {tab === 'description' && (
          <div>
            <h2><StoreCopy value={{ en: 'Product Description & Craftsmanship', ar: 'وصف المنتج ودقة التصنيع' }} /></h2>
            <p><StoreCopy value={product.description} /></p>
          </div>
        )}
        {tab === 'specifications' && (
          <div className="store-spec-table-wrap">
            <h2><StoreCopy value={{ en: 'Technical Specifications', ar: 'المواصفات الفنية المعتمدة' }} /></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginTop: '16px' }}>
              <div style={{ padding: '14px', background: 'var(--store-soft)', borderRadius: '8px', border: '1px solid var(--store-border)' }}><strong>SKU / رمز الموديل:</strong><p style={{ margin: '4px 0 0', fontFamily: 'monospace', color: 'var(--store-gold)' }}>{product.sku}</p></div>
              <div style={{ padding: '14px', background: 'var(--store-soft)', borderRadius: '8px', border: '1px solid var(--store-border)' }}><strong>Discipline / الرياضة:</strong><p style={{ margin: '4px 0 0', textTransform: 'capitalize' }}>{product.category}</p></div>
              <div style={{ padding: '14px', background: 'var(--store-soft)', borderRadius: '8px', border: '1px solid var(--store-border)' }}><strong>Standard / معيار التصنيع:</strong><p style={{ margin: '4px 0 0' }}>Olympic & World Championship Grade</p></div>
              <div style={{ padding: '14px', background: 'var(--store-soft)', borderRadius: '8px', border: '1px solid var(--store-border)' }}><strong>Materials / الخامات:</strong><p style={{ margin: '4px 0 0' }}>{product.category === 'swimming' ? 'Hydrophobic Liquid Silicone & Polycarbonate UV400' : product.category === 'football' ? 'Textured Microfiber PU & Thermal Bonded Bladder' : 'Aero-Weave 4-Way Stretch Compression'}</p></div>
              <div style={{ padding: '14px', background: 'var(--store-soft)', borderRadius: '8px', border: '1px solid var(--store-border)' }}><strong>Certification / الاعتماد:</strong><p style={{ margin: '4px 0 0' }}>World Aquatics / FIFA Quality Pro / Olympic Spec</p></div>
              <div style={{ padding: '14px', background: 'var(--store-soft)', borderRadius: '8px', border: '1px solid var(--store-border)' }}><strong>Official Warranty / الضمان:</strong><p style={{ margin: '4px 0 0' }}>1-Year Official Manufacturer Guarantee</p></div>
            </div>
          </div>
        )}
        {tab === 'size' && (
          <div className="store-size-guide-wrap">
            <h2><StoreCopy value={{ en: 'Official Athlete Sizing Chart', ar: 'جدول مقاسات الرياضيين الرسمي' }} /></h2>
            <p><StoreCopy value={{ en: 'All United Olympics Sports products are sized according to international federation athletic fit guidelines.', ar: 'جميع منتجات يونايتد أوليمبيكس سبورت مصممة وفقاً للمقاسات الرياضية المعتمدة دولياً.' }} /></p>
            <div style={{ overflowX: 'auto', marginTop: '14px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'center' }}>
                <thead>
                  <tr style={{ background: 'var(--store-soft)', borderBottom: '2px solid var(--store-border-strong)' }}>
                    <th style={{ padding: '10px' }}>Size / المقاس</th>
                    <th style={{ padding: '10px' }}>Chest / الصدر (cm)</th>
                    <th style={{ padding: '10px' }}>Waist / الخصر (cm)</th>
                    <th style={{ padding: '10px' }}>Height / الطول (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--store-border)' }}><td style={{ padding: '9px', fontWeight: 'bold' }}>S</td><td>88 - 94</td><td>76 - 81</td><td>168 - 175</td></tr>
                  <tr style={{ borderBottom: '1px solid var(--store-border)' }}><td style={{ padding: '9px', fontWeight: 'bold' }}>M</td><td>95 - 102</td><td>82 - 88</td><td>175 - 182</td></tr>
                  <tr style={{ borderBottom: '1px solid var(--store-border)' }}><td style={{ padding: '9px', fontWeight: 'bold' }}>L</td><td>103 - 110</td><td>89 - 96</td><td>180 - 188</td></tr>
                  <tr style={{ borderBottom: '1px solid var(--store-border)' }}><td style={{ padding: '9px', fontWeight: 'bold' }}>XL</td><td>111 - 118</td><td>97 - 104</td><td>185 - 194</td></tr>
                  <tr><td style={{ padding: '9px', fontWeight: 'bold' }}>XXL</td><td>119 - 128</td><td>105 - 114</td><td>190 - 200</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {tab === 'shipping' && (
          <div className="store-shipping-info">
            <h2><StoreCopy value={{ en: 'Express Shipping & Dispatch', ar: 'الشحن السريع والتوصيل' }} /></h2>
            <div style={{ display: 'grid', gap: '10px', marginTop: '12px' }}>
              <p><strong>United Arab Emirates (UAE):</strong> Next-day express courier dispatch across Dubai, Abu Dhabi, and all Emirates (1-2 business days).</p>
              <p><strong>GCC Countries (KSA, Qatar, Kuwait, Bahrain, Oman):</strong> 2-4 business days via DHL Express tracked air shipping.</p>
              <p><strong>Complimentary Delivery:</strong> Orders over AED 300 qualify for free express shipping.</p>
            </div>
          </div>
        )}
        {tab === 'returns' && (
          <div className="store-returns-info">
            <h2><StoreCopy value={{ en: '30-Day Hassle-Free Returns', ar: 'سياسة الإرجاع والاستبدال خلال 30 يوماً' }} /></h2>
            <p><StoreCopy value={{ en: 'If your gear doesn’t fit or perform to Olympic standards, return or exchange it within 30 days in its original packaging with tags attached for a 100% refund.', ar: 'إذا لم تكن المقاسات أو الأداء بمستوى توقعاتك، يمكنك إرجاع أو استبدال المنتج خلال 30 يوماً في عبوته الأصلية مع بطاقاته لاسترداد كامل المبلغ دون أي تعقيد.' }} /></p>
          </div>
        )}
      </article>
    </section>
    <section className="store-section"><SectionHeading eyebrow={{ en: 'Continue Exploring', ar: 'واصل الاستكشاف' }} title={{ en: 'You May Also Like', ar: 'قد يعجبك أيضًا' }} /><ProductGrid products={related} /></section>
    <div className="store-mobile-buy"><ProductPrice product={product} /><button type="button" onClick={() => addToCart(product, { quantity, size, color })}><ShoppingBag /><StoreCopy value={{ en: 'Add to Cart', ar: 'أضف للسلة' }} inline /></button></div>
  </div>;
}

function CartSummary({ checkout = false }: { checkout?: boolean }) {
  const { cart, subtotal } = useStore();
  const [discount, setDiscount] = useState(0);
  const currency = cart[0]?.product.currency ?? 'AED';
  const format = (value: number) => new Intl.NumberFormat('en-AE', { style: 'currency', currency }).format(value);
  const finalTotal = Math.max(0, subtotal - discount);

  return <aside className="store-cart-summary">
    <h2><StoreCopy value={{ en: 'Order Summary', ar: 'ملخص الطلب' }} /></h2>
    <dl>
      <div><dt><StoreCopy value={{ en: 'Subtotal', ar: 'المجموع الفرعي' }} inline /></dt><dd>{format(subtotal)}</dd></div>
      {discount > 0 && (
        <div style={{ color: '#10b981' }}>
          <dt><StoreCopy value={{ en: 'Promo Discount', ar: 'خصم الرمز الترويجي' }} inline /></dt>
          <dd>-{format(discount)}</dd>
        </div>
      )}
      <div><dt><StoreCopy value={{ en: 'Shipping', ar: 'الشحن' }} inline /></dt><dd><StoreCopy value={{ en: 'Complimentary Express', ar: 'شحن سريع مجاني' }} inline /></dd></div>
      <div><dt><StoreCopy value={{ en: 'Tax (VAT 5%)', ar: 'الضريبة (5%)' }} inline /></dt><dd><StoreCopy value={{ en: 'Included', ar: 'مشمولة' }} inline /></dd></div>
    </dl>
    <div className="store-summary-total">
      <StoreCopy value={{ en: 'Total Amount', ar: 'المبلغ الإجمالي' }} inline />
      <strong>{format(finalTotal)}</strong>
    </div>

    {!checkout && (
      <PromoCodeField
        subtotal={subtotal}
        onDiscountApply={(amt) => setDiscount(amt)}
      />
    )}

    <p><ShieldCheck /><StoreCopy value={{ en: 'Protected by 256-bit Olympic Grade SSL Checkout.', ar: 'محمي بواسطة تشفير SSL الآمن بمستوى أولمبي 256-بت.' }} /></p>
    {!checkout && <Link className="store-button store-button-primary" to="/store/checkout"><StoreCopy value={{ en: 'Proceed to Checkout', ar: 'المتابعة للدفع' }} inline /><DirectionArrow /></Link>}
  </aside>;
}

export function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useStore();
  return <div className="store-cart-page"><div className="store-page-heading"><span>YOUR SELECTION</span><h1><StoreCopy value={{ en: 'Your Cart', ar: 'سلة التسوق' }} /></h1></div>{cart.length ? <div className="store-cart-layout"><section className="store-cart-list">{cart.map((line) => <article key={`${line.product.id}-${line.size ?? 'default'}-${line.color ?? 'default'}`}><div className="store-cart-image"><ProductMedia product={line.product} /></div><div className="store-cart-copy"><StoreCopy value={line.product.type} className="store-product-type" inline /><h2><Link to={`/store/product/${line.product.slug}`}><StoreCopy value={line.product.name} /></Link></h2>{line.size && <small><StoreCopy value={{ en: 'Size', ar: 'المقاس' }} inline />: {line.size}</small>}{line.color && <small><StoreCopy value={{ en: 'Color', ar: 'اللون' }} inline />: {line.color}</small>}<ProductPrice product={line.product} /></div><QuantityStepper value={line.quantity} onChange={(quantity) => updateQuantity(line.product.id, quantity, line.size, line.color)} /><button type="button" className="store-remove" onClick={() => removeFromCart(line.product.id, line.size, line.color)}><Trash2 /><StoreCopy value={{ en: 'Remove', ar: 'إزالة' }} inline /></button></article>)}<DeliverySlotSelector /></section><CartSummary /></div> : <StoreState kind="empty" title={{ en: 'Your cart is empty', ar: 'سلتك فارغة' }} description={{ en: 'Your selected products will appear here.', ar: 'ستظهر المنتجات التي تختارها هنا.' }} action={<Link className="store-button store-button-primary" to="/store/shop"><StoreCopy value={{ en: 'Continue Shopping', ar: 'متابعة التسوق' }} inline /></Link>} />}</div>;
}

const checkoutSteps = [
  { id: 1, icon: UserRound, value: { en: 'Contact', ar: 'التواصل' } },
  { id: 2, icon: MapPin, value: { en: 'Delivery Address', ar: 'عنوان التوصيل' } },
  { id: 3, icon: Truck, value: { en: 'Delivery Method', ar: 'طريقة التوصيل' } },
  { id: 4, icon: CreditCard, value: { en: 'Payment Method', ar: 'طريقة الدفع' } },
  { id: 5, icon: CheckCircle2, value: { en: 'Order Review', ar: 'مراجعة الطلب' } },
];

export function CheckoutPage() {
  const { cart } = useStore();
  const [step, setStep] = useState(1);
  const [notice, setNotice] = useState(false);
  if (!cart.length) return <div className="store-page-pad"><StoreState kind="empty" title={{ en: 'Checkout needs cart items', ar: 'الدفع يحتاج إلى عناصر في السلة' }} description={{ en: 'Add a verified product before entering checkout.', ar: 'أضف منتجًا موثقًا قبل الانتقال إلى الدفع.' }} action={<Link className="store-button store-button-primary" to="/store/shop"><StoreCopy value={{ en: 'Open Shop', ar: 'فتح المتجر' }} inline /></Link>} /></div>;
  const next = (event: FormEvent) => { event.preventDefault(); if (step < 5) { setStep(step + 1); setNotice(false); } else setNotice(true); };
  return <div className="store-checkout-page"><div className="store-page-heading"><span>SECURE FLOW ARCHITECTURE</span><h1><StoreCopy value={{ en: 'Checkout', ar: 'إتمام الطلب' }} /></h1></div><div className="store-checkout-stepper">{checkoutSteps.map(({ id, icon: Icon, value }) => <button type="button" key={id} className={`${step === id ? 'is-active' : ''} ${step > id ? 'is-complete' : ''}`} onClick={() => id <= step && setStep(id)}><span>{step > id ? <CheckCircle2 /> : <Icon />}</span><i>{id}</i><StoreCopy value={value} /></button>)}</div><div className="store-checkout-layout"><form className="store-checkout-form" onSubmit={next}><header><span>0{step}</span><h2><StoreCopy value={checkoutSteps[step - 1].value} /></h2></header>{step === 1 && <div className="store-form-grid"><label><StoreCopy value={{ en: 'Email', ar: 'البريد الإلكتروني' }} inline /><input type="email" autoComplete="email" required placeholder="name@example.com" /></label><label><StoreCopy value={{ en: 'Phone', ar: 'رقم الهاتف' }} inline /><input type="tel" autoComplete="tel" required placeholder="+971" /></label></div>}{step === 2 && <div className="store-form-grid"><label className="wide"><StoreCopy value={{ en: 'Full Name', ar: 'الاسم الكامل' }} inline /><input autoComplete="name" required /></label><label><StoreCopy value={{ en: 'Country', ar: 'الدولة' }} inline /><select required defaultValue="AE"><option value="AE">United Arab Emirates | الإمارات</option></select></label><label><StoreCopy value={{ en: 'Emirate', ar: 'الإمارة' }} inline /><select required defaultValue=""><option value="" disabled>Select | اختر</option><option>Abu Dhabi | أبوظبي</option><option>Dubai | دبي</option><option>Sharjah | الشارقة</option><option>Ajman | عجمان</option><option>Umm Al Quwain | أم القيوين</option><option>Ras Al Khaimah | رأس الخيمة</option><option>Fujairah | الفجيرة</option></select></label><label><StoreCopy value={{ en: 'City', ar: 'المدينة' }} inline /><input required /></label><label><StoreCopy value={{ en: 'Area', ar: 'المنطقة' }} inline /><input required /></label><label className="wide"><StoreCopy value={{ en: 'Street', ar: 'الشارع' }} inline /><input required /></label><label><StoreCopy value={{ en: 'Building', ar: 'المبنى' }} inline /><input required /></label><label><StoreCopy value={{ en: 'Apartment / Villa', ar: 'شقة / فيلا' }} inline /><input /></label><label className="wide"><StoreCopy value={{ en: 'Additional Instructions', ar: 'تعليمات إضافية' }} inline /><textarea rows={3} /></label></div>}{step === 3 && <StoreState kind="unavailable" title={{ en: 'Delivery methods not configured', ar: 'طرق التوصيل غير مهيأة' }} description={{ en: 'A production shipping configuration is required before delivery selection can be completed.', ar: 'يلزم إعداد شحن إنتاجي قبل إكمال اختيار طريقة التوصيل.' }} />}{step === 4 && <StoreState kind="unavailable" title={{ en: 'Payment provider not configured', ar: 'موفر الدفع غير مهيأ' }} description={{ en: 'No payment option is rendered until a verified provider is connected. Raw card data is never stored here.', ar: 'لن يظهر خيار دفع حتى يتم ربط موفر موثق، ولا تُخزن بيانات البطاقة الخام هنا.' }} />}{step === 5 && <div className="store-review"><StoreState kind="unavailable" title={{ en: 'Order submission unavailable', ar: 'إرسال الطلب غير متاح' }} description={{ en: 'Address, shipping, tax and payment configuration must be verified before a real order can be submitted.', ar: 'يجب التحقق من العنوان والشحن والضريبة والدفع قبل إرسال طلب حقيقي.' }} />{cart.map((line) => <div key={`${line.product.id}-${line.size ?? 'default'}-${line.color ?? 'default'}`}><ShoppingBag /><StoreCopy value={line.product.name} /><span>× {line.quantity}</span><ProductPrice product={line.product} size="s" /></div>)}</div>}{notice && <div className="store-inline-error" role="alert"><X /><StoreCopy value={{ en: 'Order was not submitted. Production checkout is not configured.', ar: 'لم يتم إرسال الطلب. الدفع الإنتاجي غير مهيأ.' }} inline /></div>}<footer>{step > 1 && <button type="button" className="store-button store-button-secondary" onClick={() => setStep(step - 1)}><StoreCopy value={{ en: 'Back', ar: 'السابق' }} inline /></button>}<button type="submit" className="store-button store-button-primary">{step === 5 ? <StoreCopy value={{ en: 'Place Order', ar: 'تأكيد الطلب' }} inline /> : <StoreCopy value={{ en: 'Continue', ar: 'متابعة' }} inline />}<DirectionArrow /></button></footer></form><CartSummary checkout /></div></div>;
}

const accountNav = [
  { to: '/store/account', end: true, icon: UserRound, value: { en: 'Profile', ar: 'الملف الشخصي' } },
  { to: '/store/orders', icon: Package, value: { en: 'My Orders', ar: 'طلباتي' } },
  { to: '/store/wishlist', icon: Heart, value: { en: 'Wishlist', ar: 'المفضلة' } },
  { to: '/store/addresses', icon: MapPin, value: { en: 'Addresses', ar: 'العناوين' } },
  { to: '/store/payment-methods', icon: WalletCards, value: { en: 'Payment Methods', ar: 'طرق الدفع' } },
  { to: '/store/notifications', icon: Bell, value: { en: 'Notifications', ar: 'الإشعارات' } },
  { to: '/store/settings', icon: Settings, value: { en: 'Settings', ar: 'الإعدادات' } },
];

function AccountShell({ title, children }: { title: { en: string; ar: string }; children: ReactNode }) {
  return <div className="store-account-page"><aside className="store-account-sidebar"><div><img src="/brand/united-olympics-sports-logo.png" alt="United Olympics Sports | يونايتد أوليمبيكس سبورت" /><h2><StoreCopy value={{ en: 'My Account', ar: 'حسابي' }} /></h2></div><nav>{accountNav.map(({ to, end, icon: Icon, value }) => <NavLink key={to} to={to} end={end}><Icon /><StoreCopy value={value} /></NavLink>)}<button type="button" disabled title="Authentication not connected | المصادقة غير متصلة"><LogOut /><StoreCopy value={{ en: 'Logout', ar: 'تسجيل الخروج' }} /></button></nav><section><ShieldCheck /><h3><StoreCopy value={{ en: 'Need assistance?', ar: 'تحتاج إلى مساعدة؟' }} /></h3><p><StoreCopy value={{ en: 'Use the official contact route for verified support details.', ar: 'استخدم صفحة التواصل الرسمية للحصول على بيانات الدعم الموثقة.' }} /></p><Link to="/contact"><StoreCopy value={{ en: 'Contact', ar: 'تواصل' }} inline /></Link></section></aside><main className="store-account-content"><div className="store-page-heading"><span>ACCOUNT</span><h1><StoreCopy value={title} /></h1></div>{children}</main></div>;
}

export function AccountPage() {
  return <AccountShell title={{ en: 'Profile', ar: 'الملف الشخصي' }}>
    <AthleteRewardTierCard />
    <div className="store-profile-card"><span><UserRound /></span><div><h2><StoreCopy value={{ en: 'Customer profile not connected', ar: 'ملف العميل غير متصل' }} /></h2><p><StoreCopy value={{ en: 'Name, email and phone will appear only after production authentication is connected.', ar: 'سيظهر الاسم والبريد والهاتف فقط بعد ربط المصادقة الإنتاجية.' }} /></p></div><button type="button" disabled><Edit3 /><StoreCopy value={{ en: 'Edit Profile', ar: 'تعديل الملف' }} inline /></button></div><StoreState kind="empty" title={{ en: 'No verified profile data', ar: 'لا توجد بيانات ملف موثقة' }} description={{ en: 'No personal information has been fabricated for this preview.', ar: 'لم يتم اختلاق أي معلومات شخصية لهذه المعاينة.' }} /></AccountShell>;
}

export function OrdersPage() {
  const [status, setStatus] = useState('all');
  const tabs = [['all', 'All', 'الكل'], ['processing', 'Processing', 'قيد المعالجة'], ['shipped', 'Shipped', 'تم الشحن'], ['delivered', 'Delivered', 'تم التسليم'], ['cancelled', 'Cancelled', 'ملغي']];
  return <AccountShell title={{ en: 'My Orders', ar: 'طلباتي' }}>
    <OrderProgressTrackerCard />
    <div className="store-order-tabs" role="tablist">{tabs.map(([id, en, ar]) => <button type="button" role="tab" aria-selected={status === id} className={status === id ? 'is-active' : ''} onClick={() => setStatus(id)} key={id}>{en} <small>{ar}</small></button>)}</div><StoreState kind="empty" title={{ en: `No verified ${status === 'all' ? '' : `${status} `}orders`, ar: 'لا توجد طلبات موثقة' }} description={{ en: 'Orders will appear after a real commerce and authentication source is connected.', ar: 'ستظهر الطلبات بعد ربط مصدر تجارة ومصادقة حقيقي.' }} action={<Link className="store-button store-button-primary" to="/store/shop"><StoreCopy value={{ en: 'Continue Shopping', ar: 'متابعة التسوق' }} inline /></Link>} /></AccountShell>;
}

export function OrderDetailPage() {
  const { id } = useParams();
  return <AccountShell title={{ en: 'Order Details', ar: 'تفاصيل الطلب' }}><StoreState kind="unavailable" title={{ en: 'Order source unavailable', ar: 'مصدر الطلب غير متاح' }} description={{ en: `No verified order was found for reference ${id ?? '—'}. Timeline, payment and shipment actions remain disabled.`, ar: `لم يتم العثور على طلب موثق للمرجع ${id ?? '—'}. يظل الخط الزمني وإجراءات الدفع والشحن معطلة.` }} action={<Link className="store-button store-button-secondary" to="/store/orders"><StoreCopy value={{ en: 'Back to Orders', ar: 'العودة للطلبات' }} inline /></Link>} /></AccountShell>;
}

export function WishlistPage() {
  const { products, wishlist } = useStore();
  const items = products.filter((product) => wishlist.includes(product.id));
  return <AccountShell title={{ en: 'Wishlist', ar: 'المفضلة' }}>{items.length ? <ProductGrid products={items} /> : <StoreState kind="empty" title={{ en: 'Your wishlist is empty', ar: 'قائمة المفضلة فارغة' }} description={{ en: 'Save products here while comparing your training essentials.', ar: 'احفظ المنتجات هنا أثناء مقارنة مستلزمات التدريب.' }} action={<Link className="store-button store-button-primary" to="/store/shop"><StoreCopy value={{ en: 'Explore Products', ar: 'استكشف المنتجات' }} inline /></Link>} />}</AccountShell>;
}

export function AddressesPage() {
  return <AccountShell title={{ en: 'Addresses', ar: 'العناوين' }}><StoreState kind="empty" title={{ en: 'No saved addresses', ar: 'لا توجد عناوين محفوظة' }} description={{ en: 'Saved addresses require an authenticated production account.', ar: 'تتطلب العناوين المحفوظة حساب إنتاج موثّق.' }} /><button type="button" className="store-button store-button-secondary" disabled><MapPin /><StoreCopy value={{ en: 'Add Address', ar: 'إضافة عنوان' }} inline /></button></AccountShell>;
}

export function PaymentMethodsPage() {
  return <AccountShell title={{ en: 'Payment Methods', ar: 'طرق الدفع' }}><StoreState kind="empty" title={{ en: 'No saved payment methods', ar: 'لا توجد طرق دفع محفوظة' }} description={{ en: 'A tokenized payment provider must be connected before saved methods can appear.', ar: 'يجب ربط موفر دفع يعتمد الرموز قبل ظهور طرق الدفع المحفوظة.' }} /><p className="store-security-note"><ShieldCheck /><StoreCopy value={{ en: 'Raw card numbers are never stored by this interface.', ar: 'لا تخزن هذه الواجهة أرقام البطاقات الخام مطلقًا.' }} inline /></p></AccountShell>;
}

export function NotificationsPage() {
  return <AccountShell title={{ en: 'Notifications', ar: 'الإشعارات' }}><StoreState kind="empty" title={{ en: 'No verified notifications', ar: 'لا توجد إشعارات موثقة' }} description={{ en: 'Order, delivery, store and system notifications will appear from the connected service.', ar: 'ستظهر إشعارات الطلب والتوصيل والمتجر والنظام من الخدمة المتصلة.' }} /></AccountShell>;
}

export function StoreSettingsPage() {
  const { locale, setLocale } = useStore();
  return <AccountShell title={{ en: 'Settings', ar: 'الإعدادات' }}><div className="store-settings-grid"><section><h2><StoreCopy value={{ en: 'Language', ar: 'اللغة' }} /></h2><div className="store-setting-choice"><button type="button" className={locale === 'en' ? 'is-active' : ''} onClick={() => setLocale('en')}>English</button><button type="button" className={locale === 'ar' ? 'is-active' : ''} onClick={() => setLocale('ar')}>العربية</button></div></section><section><h2><StoreCopy value={{ en: 'Theme', ar: 'المظهر' }} /></h2><p><StoreCopy value={{ en: 'Use the theme control in the header to choose light, dark or system mode.', ar: 'استخدم أداة المظهر في رأس الصفحة لاختيار الفاتح أو الداكن أو النظام.' }} /></p></section><section><h2><StoreCopy value={{ en: 'Communication Preferences', ar: 'تفضيلات التواصل' }} /></h2><p><StoreCopy value={{ en: 'Requires an authenticated notification service.', ar: 'تتطلب خدمة إشعارات ومصادقة متصلة.' }} /></p></section><section><h2><StoreCopy value={{ en: 'Privacy & Account Controls', ar: 'الخصوصية والتحكم بالحساب' }} /></h2><p><StoreCopy value={{ en: 'Production account controls are not configured in this environment.', ar: 'عناصر التحكم بالحساب الإنتاجي غير مهيأة في هذه البيئة.' }} /></p></section></div></AccountShell>;
}

export function OrderSuccessPage() {
  return <div className="store-page-pad"><StoreState kind="unavailable" title={{ en: 'No completed order operation', ar: 'لا توجد عملية طلب مكتملة' }} description={{ en: 'Success is shown only after a genuine payment and order response.', ar: 'تظهر حالة النجاح فقط بعد استجابة دفع وطلب حقيقية.' }} action={<Link className="store-button store-button-primary" to="/store"><StoreCopy value={{ en: 'Store Home', ar: 'رئيسية المتجر' }} inline /></Link>} /></div>;
}
