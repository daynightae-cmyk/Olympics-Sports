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
  inventory?: number;
  inventoryCount?: number;
}

export interface StoreCartLine {
  product: StoreProduct;
  quantity: number;
  size?: string;
  color?: string;
}

export type OrderStatus = 'placed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface StoreOrderItem {
  product: StoreProduct;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

export interface StoreOrder {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  currency: string;
  items: StoreOrderItem[];
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    emirate: string;
    country: string;
    phone: string;
  };
  timeline: {
    status: OrderStatus;
    title: BilingualText;
    description: BilingualText;
    timestamp: string;
    isCompleted: boolean;
    isCurrent: boolean;
  }[];
}

export type StoreDataState = 'preview' | 'empty' | 'loading' | 'error';
