import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useUiSettings } from '../ui/theme/useUiSettings';
import { previewCategories, previewProducts } from './storeData.preview';
import type { StoreCartLine, StoreCategory, StoreDataState, StoreProduct } from './storeTypes';

type AddOptions = { quantity?: number; size?: string; color?: string };
type StoreContextValue = {
  state: StoreDataState;
  isPreview: boolean;
  locale: 'en' | 'ar';
  direction: 'ltr' | 'rtl';
  products: StoreProduct[];
  categories: StoreCategory[];
  cart: StoreCartLine[];
  wishlist: string[];
  miniCartOpen: boolean;
  cartCount: number;
  subtotal: number;
  setLocale: (locale: 'en' | 'ar') => void;
  setMiniCartOpen: (open: boolean) => void;
  addToCart: (product: StoreProduct, options?: AddOptions) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  removeFromCart: (productId: string, size?: string, color?: string) => void;
  toggleWishlist: (productId: string) => void;
};

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const { bilingualOrder, setSetting } = useUiSettings();
  const isPreview = true;
  const [catalog, setCatalog] = useState<{ products: StoreProduct[]; categories: StoreCategory[] }>({
    products: previewProducts,
    categories: previewCategories,
  });
  const [cart, setCart] = useState<StoreCartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const locale = bilingualOrder === 'ar-first' ? 'ar' : 'en';

  const products = catalog.products;
  const categories = catalog.categories;

  const value = useMemo<StoreContextValue>(() => ({
    state: isPreview ? 'preview' : 'empty',
    isPreview,
    locale,
    direction: locale === 'ar' ? 'rtl' : 'ltr',
    products,
    categories,
    cart,
    wishlist,
    miniCartOpen,
    cartCount: cart.reduce((sum, line) => sum + line.quantity, 0),
    subtotal: cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
    setLocale: (nextLocale) => setSetting('bilingualOrder', nextLocale === 'ar' ? 'ar-first' : 'en-first'),
    setMiniCartOpen,
    addToCart: (product, options = {}) => {
      setCart((current) => {
        const existing = current.find((line) => line.product.id === product.id && line.size === options.size && line.color === options.color);
        if (existing) return current.map((line) => line === existing ? { ...line, quantity: line.quantity + (options.quantity ?? 1) } : line);
        return [...current, { product, quantity: options.quantity ?? 1, size: options.size, color: options.color }];
      });
      setMiniCartOpen(true);
    },
    updateQuantity: (productId, quantity, size, color) => setCart((current) => current.map((line) => line.product.id === productId && line.size === size && line.color === color ? { ...line, quantity: Math.max(1, quantity) } : line)),
    removeFromCart: (productId, size, color) => setCart((current) => current.filter((line) => !(line.product.id === productId && line.size === size && line.color === color))),
    toggleWishlist: (productId) => setWishlist((current) => current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]),
  }), [cart, categories, isPreview, locale, miniCartOpen, products, setSetting, wishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used inside StoreProvider');
  return context;
}
