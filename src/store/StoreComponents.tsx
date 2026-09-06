import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Heart,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Star,
  Trash2,
  UserRound,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import type { BilingualText as BilingualValue } from '../domain/contracts';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { useStore } from './StoreContext';
import type { StoreCategory, StoreProduct } from './storeTypes';

export function StoreCopy({ value, className = '', inline = false }: { value: BilingualValue; className?: string; inline?: boolean }) {
  const { locale } = useStore();
  const primary = locale === 'ar' ? value.ar : value.en;
  const secondary = locale === 'ar' ? value.en : value.ar;
  return <span className={`store-copy ${inline ? 'is-inline' : ''} ${className}`.trim()}><span lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>{primary}</span><small lang={locale === 'ar' ? 'en' : 'ar'} dir={locale === 'ar' ? 'ltr' : 'rtl'}>{secondary}</small></span>;
}

export function StorePreviewNotice() {
  const { isPreview } = useStore();
  return <div className="store-truth-notice" role="status"><Sparkles aria-hidden="true" /><StoreCopy value={isPreview ? { en: 'Development preview · catalog values are not live inventory', ar: 'معاينة تطوير · قيم الكتالوج ليست مخزونًا فعليًا' } : { en: 'Commerce services are awaiting production configuration', ar: 'خدمات التجارة بانتظار إعداد بيئة الإنتاج' }} inline /></div>;
}

export function ProductPrice({ product, size = 'm' }: { product: StoreProduct; size?: 's' | 'm' | 'l' }) {
  const formatter = new Intl.NumberFormat('en-AE', { style: 'currency', currency: product.currency, maximumFractionDigits: 2 });
  const hasDiscount = Boolean(product.compareAtPrice && product.compareAtPrice > product.price);
  return (
    <span className={`store-price-group store-price-${size}`}>
      <strong className="store-price-current">{formatter.format(product.price)}</strong>
      {hasDiscount && (
        <s className="store-price-compare" aria-label="Original price">{formatter.format(product.compareAtPrice!)}</s>
      )}
    </span>
  );
}

export function ProductMedia({ product, hero = false, source = product.image }: { product: StoreProduct; hero?: boolean; source?: string }) {
  return <div className={`store-product-media ${hero ? 'is-hero' : ''}`}>
    {source ? <img src={source} alt={`${product.name.en} | ${product.name.ar}`} loading={hero ? 'eager' : 'lazy'} /> : <div className="store-media-fallback" role="img" aria-label={`Product media pending for ${product.name.en} | صورة المنتج بانتظار الإضافة`}><img src="/brand/united-olympics-sports-logo.png" alt="" aria-hidden="true" /><ShoppingBag aria-hidden="true" /><span>MEDIA PENDING</span><small>الصورة بانتظار الإضافة</small></div>}
  </div>;
}

export function ProductCard({ product, compact = false }: { product: StoreProduct; compact?: boolean }) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const wished = wishlist.includes(product.id);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.colors?.[0]?.en);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes?.[0]);
  const [added, setAdded] = useState(false);

  const discountPercent = product.compareAtPrice && product.compareAtPrice > product.price
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleQuickAdd = () => {
    addToCart(product, { quantity: 1, size: selectedSize, color: selectedColor });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Curated performance badges
  const getBadge = () => {
    if (product.category === 'swimming') return { en: 'HYDRO PRO', ar: 'مقاوم للماء' };
    if (product.category === 'football') return { en: 'MATCH SPEC', ar: 'معيار المباريات' };
    if (product.category === 'apparel') return { en: 'AERO FIT', ar: 'قصة انسيابية' };
    if (product.category === 'equipment') return { en: 'HEAVY DUTY', ar: 'تحمل فائق' };
    return { en: 'OLYMPIC GRADE', ar: 'معيار أولمبي' };
  };

  const badge = getBadge();

  const currentImage = useMemo(() => {
    if (selectedColor && (selectedColor.toLowerCase().includes('white') || selectedColor.toLowerCase().includes('ivory')) && product.gallery && product.gallery.length > 1) {
      return product.gallery[1];
    }
    return product.image ?? product.gallery?.[0];
  }, [selectedColor, product.image, product.gallery]);

  return <article className={`store-product-card ${compact ? 'is-compact' : ''}`}>
    <div className="store-product-card-stage">
      <Link to={`/store/product/${product.slug}`} aria-label={`${product.name.en} | ${product.name.ar}`}>
        <ProductMedia product={product} source={currentImage} />
      </Link>
      <div className="store-card-badges-row">
        {discountPercent > 0 && (
          <span className="store-product-badge store-badge-sale" aria-label={`Discount ${discountPercent}% | خصم ${discountPercent}%`}>
            -{discountPercent}%
          </span>
        )}
        <span className="store-product-badge store-badge-olympic">
          <Sparkles size={11} aria-hidden="true" />
          <span>{badge.en}</span>
          <small>{badge.ar}</small>
        </span>
      </div>
      <button
        type="button"
        className={`store-card-heart ${wished ? 'is-active' : ''}`}
        onClick={() => toggleWishlist(product.id)}
        aria-pressed={wished}
        aria-label={wished ? 'Remove from wishlist | إزالة من المفضلة' : 'Add to wishlist | أضف إلى المفضلة'}
      >
        <Heart aria-hidden="true" />
      </button>

      <div className="store-card-quick-overlay">
        <span className="store-card-stock-pill">
          <span className="store-stock-pulse-dot" aria-hidden="true" />
          <StoreCopy value={{ en: 'In Stock · Fast Dispatch', ar: 'متوفر · شحن فوري' }} inline />
        </span>
      </div>
    </div>

    <div className="store-product-card-copy">
      <div className="store-card-meta-line">
        <StoreCopy value={product.type} className="store-product-type" inline />
        <span className="store-card-rating">
          <Star size={12} className="store-star-icon" aria-hidden="true" />
          <span>4.9</span>
          <small>(48)</small>
        </span>
      </div>

      <h3>
        <Link to={`/store/product/${product.slug}`}>
          <StoreCopy value={product.name} />
        </Link>
      </h3>

      {/* Color variant preview dots if available */}
      {product.colors && product.colors.length > 0 && (
        <div className="store-card-color-swatches" aria-label="Available colors | الألوان المتاحة">
          {product.colors.map((c) => (
            <button
              key={`${product.id}-color-${c.en}`}
              type="button"
              className={`store-swatch-dot ${selectedColor === c.en ? 'is-selected' : ''}`}
              onClick={() => setSelectedColor(c.en)}
              title={`${c.en} | ${c.ar}`}
              aria-label={`${c.en} | ${c.ar}`}
            >
              <span className="store-dot-preview" style={{ background: c.en.toLowerCase().includes('white') ? '#f3f3f3' : c.en.toLowerCase().includes('black') ? '#1a1a1a' : c.en.toLowerCase().includes('blue') ? '#1e3a8a' : c.en.toLowerCase().includes('gold') ? '#d4af37' : '#555' }} />
            </button>
          ))}
          <span className="store-swatches-count">+{product.colors.length}</span>
        </div>
      )}

      {/* Available sizes chips */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="store-card-sizes-row">
          {product.sizes.slice(0, 4).map((s) => (
            <button
              key={`${product.id}-size-${s}`}
              type="button"
              className={`store-size-chip ${selectedSize === s ? 'is-selected' : ''}`}
              onClick={() => setSelectedSize(s)}
            >
              {s}
            </button>
          ))}
          {product.sizes.length > 4 && <span className="store-sizes-more">+{product.sizes.length - 4}</span>}
        </div>
      )}

      <div className="store-product-card-bottom">
        <ProductPrice product={product} />
        <button
          type="button"
          className={`store-quick-cart ${added ? 'is-added' : ''}`}
          onClick={handleQuickAdd}
          aria-label={`Add ${product.name.en} to cart | أضف ${product.name.ar} إلى السلة`}
        >
          {added ? (
            <>
              <Check size={14} aria-hidden="true" />
              <StoreCopy value={{ en: 'Added!', ar: 'تمت الإضافة!' }} inline />
            </>
          ) : (
            <>
              <ShoppingCart size={15} aria-hidden="true" />
              <StoreCopy value={{ en: 'Quick Add', ar: 'إضافة سريعة' }} inline />
            </>
          )}
        </button>
      </div>
    </div>
  </article>;
}

export function ProductGrid({ products, layout = 'grid' }: { products: StoreProduct[]; layout?: 'grid' | 'list' }) {
  if (!products.length) return <StoreState kind="empty" title={{ en: 'No verified products yet', ar: 'لا توجد منتجات موثقة بعد' }} description={{ en: 'The catalog will appear when a production product source is connected.', ar: 'سيظهر الكتالوج عند ربط مصدر منتجات إنتاجي.' }} />;
  return <div className={`store-product-grid ${layout === 'list' ? 'is-list' : ''}`}>{products.map((product) => <ProductCard product={product} key={product.id} />)}</div>;
}

export function QuantityStepper({ value, onChange, label = 'Quantity | الكمية' }: { value: number; onChange: (value: number) => void; label?: string }) {
  return <div className="store-quantity" aria-label={label}><button type="button" onClick={() => onChange(Math.max(1, value - 1))} aria-label="Decrease quantity | تقليل الكمية"><Minus /></button><output aria-live="polite">{value}</output><button type="button" onClick={() => onChange(value + 1)} aria-label="Increase quantity | زيادة الكمية"><Plus /></button></div>;
}

export function StoreState({ kind, title, description, action }: { kind: 'empty' | 'error' | 'loading' | 'unavailable'; title: BilingualValue; description: BilingualValue; action?: ReactNode }) {
  const Icon = kind === 'error' ? X : kind === 'loading' ? Sparkles : PackageCheck;
  return <section className={`store-state store-state-${kind}`} role={kind === 'error' ? 'alert' : 'status'}><span><Icon aria-hidden="true" /></span><h2><StoreCopy value={title} /></h2><p><StoreCopy value={description} /></p>{action}</section>;
}

export function CategoryRail({ categories, active }: { categories: StoreCategory[]; active?: string }) {
  return <nav className="store-category-rail" aria-label="Store categories | فئات المتجر">{categories.map((category) => <NavLink key={category.slug} className={active === category.slug ? 'is-active' : ''} to={`/store/category/${category.slug}`} style={{ '--sport-accent': category.accent } as React.CSSProperties}><span className="store-category-mark" aria-hidden="true" /><StoreCopy value={category.name} /></NavLink>)}</nav>;
}

const mainNav = [
  { to: '/store', value: { en: 'Home', ar: 'الرئيسية' }, end: true },
  { to: '/store/shop', value: { en: 'Shop', ar: 'المتجر' } },
  { to: '/store/categories', value: { en: 'Categories', ar: 'الفئات' } },
  { to: '/store/shop?collection=new', value: { en: 'New Arrivals', ar: 'وصل حديثًا' } },
  { to: '/store/shop?collection=featured', value: { en: 'Collections', ar: 'المجموعات' } },
];

export function StoreHeader() {
  const { categories, products, locale, setLocale, cartCount, wishlist, setMiniCartOpen } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const results = query.trim().length > 1 ? products.filter((product) => `${product.name.en} ${product.name.ar} ${product.type.en}`.toLowerCase().includes(query.toLowerCase())).slice(0, 5) : [];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); setMegaOpen(false); setSearchOpen(false); } };
    const onPointer = (event: PointerEvent) => { if (headerRef.current && !headerRef.current.contains(event.target as Node)) { setMegaOpen(false); setSearchOpen(false); } };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointer);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('pointerdown', onPointer); };
  }, []);

  const submitSearch = () => { if (query.trim()) { navigate(`/store/search?q=${encodeURIComponent(query.trim())}`); setSearchOpen(false); setMenuOpen(false); } };

  return <header className="store-header" ref={headerRef}>
    <div className="store-announcement"><span><StoreCopy value={{ en: 'United Olympics Sports official commerce experience', ar: 'تجربة التسوق الرسمية ليونايتد أوليمبيكس سبورت' }} inline /></span><div><button type="button" onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}>{locale === 'en' ? 'العربية' : 'English'}</button><Link to="/store/orders"><StoreCopy value={{ en: 'Track Order', ar: 'تتبع الطلب' }} inline /></Link></div></div>
    <div className="store-main-header">
      <button type="button" className="store-mobile-menu" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Store menu | قائمة المتجر">{menuOpen ? <X /> : <Menu />}</button>
      <Link to="/store" className="store-brand"><img src="/brand/united-olympics-sports-logo.png" alt="United Olympics Sports | يونايتد أوليمبيكس سبورت" /><span><strong>United Olympics Sports</strong><small lang="ar" dir="rtl">يونايتد أوليمبيكس سبورت</small></span></Link>
      <div className="store-search-wrap">
        <form className="store-search" role="search" onSubmit={(event) => { event.preventDefault(); submitSearch(); }}><Search aria-hidden="true" /><label className="sr-only" htmlFor="store-search">Search products | البحث عن المنتجات</label><input id="store-search" value={query} onFocus={() => setSearchOpen(true)} onChange={(event) => { setQuery(event.target.value); setSearchOpen(true); }} placeholder={locale === 'ar' ? 'ابحث عن المنتجات أو الرياضات…' : 'Search products, sports, or collections…'} /><button type="submit" aria-label="Submit search | تنفيذ البحث"><ArrowRight /></button></form>
        {searchOpen && query.trim().length > 1 && <div className="store-search-results" role="listbox">{results.length ? results.map((product) => <Link role="option" to={`/store/product/${product.slug}`} key={product.id} onClick={() => setSearchOpen(false)}><span className="store-search-thumb"><ShoppingBag /></span><StoreCopy value={product.name} /><ProductPrice product={product} size="s" /></Link>) : <p><StoreCopy value={{ en: 'No matching preview products', ar: 'لا توجد منتجات معاينة مطابقة' }} /></p>}<Link className="store-search-all" to={`/store/search?q=${encodeURIComponent(query)}`} onClick={() => setSearchOpen(false)}><StoreCopy value={{ en: 'View all results', ar: 'عرض كل النتائج' }} inline /><ChevronRight /></Link></div>}
      </div>
      <div className="store-utilities"><ThemeToggle compact /><Link to="/store/account" aria-label="Account | الحساب"><UserRound /><span><StoreCopy value={{ en: 'Account', ar: 'الحساب' }} /></span></Link><Link to="/store/wishlist" aria-label="Wishlist | المفضلة"><Heart /><i>{wishlist.length}</i><span><StoreCopy value={{ en: 'Wishlist', ar: 'المفضلة' }} /></span></Link><button type="button" onClick={() => setMiniCartOpen(true)} aria-label="Cart | السلة"><ShoppingBag /><i>{cartCount}</i><span><StoreCopy value={{ en: 'Cart', ar: 'السلة' }} /></span></button></div>
    </div>
    <nav className={`store-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Store navigation | تنقل المتجر">
      <button type="button" className="store-mega-trigger" onClick={() => setMegaOpen((open) => !open)} aria-expanded={megaOpen}><SlidersHorizontal /><StoreCopy value={{ en: 'Shop by Category', ar: 'تسوق حسب الفئة' }} inline /><ChevronDown /></button>
      {mainNav.map((item) => <NavLink end={item.end} key={item.to} to={item.to} onClick={() => setMenuOpen(false)}><StoreCopy value={item.value} /></NavLink>)}
      <Link to="/" className="store-org-link"><StoreCopy value={{ en: 'Organization', ar: 'المؤسسة' }} /></Link>
      {megaOpen && <div className="store-mega" role="dialog" aria-label="Product categories | فئات المنتجات"><section><h3><StoreCopy value={{ en: 'Sports', ar: 'الرياضات' }} /></h3>{categories.slice(0, 6).map((category) => <Link key={category.slug} to={`/store/category/${category.slug}`} onClick={() => setMegaOpen(false)}><StoreCopy value={category.name} inline /><ChevronRight /></Link>)}</section><section><h3><StoreCopy value={{ en: 'Types', ar: 'الأنواع' }} /></h3>{categories.slice(6).map((category) => <Link key={category.slug} to={`/store/category/${category.slug}`} onClick={() => setMegaOpen(false)}><StoreCopy value={category.name} inline /><ChevronRight /></Link>)}<Link to="/store/shop" onClick={() => setMegaOpen(false)}><StoreCopy value={{ en: 'Training Essentials', ar: 'مستلزمات التدريب' }} inline /><ChevronRight /></Link></section><aside><img src="/media/sports/swimming/swimming-02-performance.webp" alt="Swimming performance training | تدريب أداء السباحة" /><div><span>UNITED PERFORMANCE</span><strong><StoreCopy value={{ en: 'Built for disciplined training', ar: 'مصمم للتدريب المنضبط' }} /></strong></div></aside></div>}
    </nav>
  </header>;
}

export function MiniCart() {
  const { miniCartOpen, setMiniCartOpen, cart, subtotal, updateQuantity, removeFromCart } = useStore();
  const panelRef = useRef<HTMLElement>(null);
  const restoreRef = useRef<Element | null>(null);
  useEffect(() => {
    if (!miniCartOpen) return;
    restoreRef.current = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setMiniCartOpen(false); };
    window.addEventListener('keydown', onKey);
    requestAnimationFrame(() => panelRef.current?.focus());
    return () => { document.body.style.overflow = overflow; window.removeEventListener('keydown', onKey); if (restoreRef.current instanceof HTMLElement) restoreRef.current.focus(); };
  }, [miniCartOpen, setMiniCartOpen]);
  if (!miniCartOpen) return null;
  return <div className="store-drawer-layer"><button type="button" className="store-drawer-backdrop" aria-label="Close cart | إغلاق السلة" onClick={() => setMiniCartOpen(false)} /><aside ref={panelRef} tabIndex={-1} className="store-mini-cart" role="dialog" aria-modal="true" aria-labelledby="mini-cart-title"><header><div><small>YOUR SELECTION</small><h2 id="mini-cart-title"><StoreCopy value={{ en: 'Shopping Cart', ar: 'سلة التسوق' }} /></h2></div><button type="button" onClick={() => setMiniCartOpen(false)} aria-label="Close cart | إغلاق السلة"><X /></button></header>{cart.length ? <><div className="store-mini-cart-lines">{cart.map((line) => <article key={`${line.product.id}-${line.size ?? 'default'}-${line.color ?? 'default'}`}><div className="store-mini-thumb"><ShoppingBag /></div><div><h3><StoreCopy value={line.product.name} /></h3>{line.size && <small>{line.size}</small>}<ProductPrice product={line.product} size="s" /><QuantityStepper value={line.quantity} onChange={(quantity) => updateQuantity(line.product.id, quantity, line.size, line.color)} /></div><button type="button" className="store-remove" onClick={() => removeFromCart(line.product.id, line.size, line.color)} aria-label="Remove item | إزالة المنتج"><Trash2 /></button></article>)}</div><footer><div><StoreCopy value={{ en: 'Subtotal', ar: 'المجموع الفرعي' }} inline /><strong>{new Intl.NumberFormat('en-AE', { style: 'currency', currency: cart[0]?.product.currency ?? 'AED' }).format(subtotal)}</strong></div><Link className="store-button store-button-secondary" to="/store/cart" onClick={() => setMiniCartOpen(false)}><StoreCopy value={{ en: 'View Cart', ar: 'عرض السلة' }} inline /></Link><Link className="store-button store-button-primary" to="/store/checkout" onClick={() => setMiniCartOpen(false)}><StoreCopy value={{ en: 'Checkout', ar: 'إتمام الطلب' }} inline /><ArrowRight /></Link></footer></> : <StoreState kind="empty" title={{ en: 'Your cart is empty', ar: 'سلتك فارغة' }} description={{ en: 'Explore the catalog to prepare an order.', ar: 'استكشف الكتالوج لتجهيز طلبك.' }} action={<Link className="store-button store-button-primary" to="/store/shop" onClick={() => setMiniCartOpen(false)}><StoreCopy value={{ en: 'Continue Shopping', ar: 'متابعة التسوق' }} inline /></Link>} />}</aside></div>;
}

export function TrustStrip() {
  const items = [
    { icon: ShieldCheck, value: { en: 'Quality-led selection', ar: 'اختيار قائم على الجودة' } },
    { icon: CreditCard, value: { en: 'Protected checkout architecture', ar: 'بنية دفع محمية' } },
    { icon: PackageCheck, value: { en: 'Order-state visibility', ar: 'وضوح حالة الطلب' } },
    { icon: Check, value: { en: 'Bilingual assistance', ar: 'مساعدة ثنائية اللغة' } },
  ];
  return <section className="store-trust-strip" aria-label="Store service architecture | بنية خدمات المتجر">{items.map(({ icon: Icon, value }) => <div key={value.en}><Icon /><StoreCopy value={value} /></div>)}</section>;
}

export function StoreFooter() {
  return <footer className="store-footer"><div className="store-footer-brand"><img src="/brand/united-olympics-sports-logo.png" alt="United Olympics Sports | يونايتد أوليمبيكس سبورت" /><div><strong>United Olympics Sports</strong><small lang="ar" dir="rtl">يونايتد أوليمبيكس سبورت</small><p><StoreCopy value={{ en: 'A premium commerce foundation for athletes and families.', ar: 'منصة تجارة متميزة للرياضيين والعائلات.' }} /></p></div></div><div><h3><StoreCopy value={{ en: 'Store', ar: 'المتجر' }} /></h3><Link to="/store/shop"><StoreCopy value={{ en: 'Shop', ar: 'تسوق' }} inline /></Link><Link to="/store/categories"><StoreCopy value={{ en: 'Sports', ar: 'الرياضات' }} inline /></Link><Link to="/store/wishlist"><StoreCopy value={{ en: 'Wishlist', ar: 'المفضلة' }} inline /></Link></div><div><h3><StoreCopy value={{ en: 'Account', ar: 'الحساب' }} /></h3><Link to="/store/account"><StoreCopy value={{ en: 'Profile', ar: 'الملف الشخصي' }} inline /></Link><Link to="/store/orders"><StoreCopy value={{ en: 'Orders', ar: 'الطلبات' }} inline /></Link><Link to="/store/addresses"><StoreCopy value={{ en: 'Addresses', ar: 'العناوين' }} inline /></Link></div><div><h3><StoreCopy value={{ en: 'Organization', ar: 'المؤسسة' }} /></h3><Link to="/"><StoreCopy value={{ en: 'Main Website', ar: 'الموقع الرئيسي' }} inline /></Link><Link to="/contact"><StoreCopy value={{ en: 'Contact', ar: 'تواصل معنا' }} inline /></Link><Link to="/admin/store"><StoreCopy value={{ en: 'Store Admin', ar: 'إدارة المتجر' }} inline /></Link></div><small className="store-footer-note">© {new Date().getFullYear()} United Olympics Sports</small></footer>;
}

export function StoreLayout({ children }: { children: ReactNode }) {
  const { direction } = useStore();
  return <div className="store-shell" dir={direction}><StorePreviewNotice /><StoreHeader /><main className="store-main">{children}</main><TrustStrip /><StoreFooter /><MiniCart /></div>;
}

export const DirectionArrow = () => {
  const { direction } = useStore();
  return direction === 'rtl' ? <ArrowLeft aria-hidden="true" /> : <ArrowRight aria-hidden="true" />;
};
