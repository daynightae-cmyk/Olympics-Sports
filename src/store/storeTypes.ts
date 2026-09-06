import type { BilingualText } from '../types';

export interface StoreCategory {
  slug: string;
  name: BilingualText;
  description: BilingualText;
  accent?: string;
  hero?: string;
}

export type StoreCategorySlug = 'swimming' | 'football' | 'basketball' | 'apparel' | 'accessories' | 'equipment' | string;

export interface StoreProduct {
  id: string;
  slug: string;
  name: BilingualText;
  description: BilingualText;
  category: string;
  type: BilingualText;
  price: number;
  compareAtPrice?: number;
  currency: string;
  sku: string;
  badge?: 'new' | 'featured' | string;
  image: string;
  gallery?: string[];
  colors?: BilingualText[];
  sizes?: string[];
}

export interface StoreCartLine {
  product: StoreProduct;
  quantity: number;
  size?: string;
  color?: string;
}

export type StoreDataState = 'preview' | 'empty' | 'loading' | 'error';
