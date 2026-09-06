import { z } from 'zod';

/**
 * Zod validation schema for the Contact Form
 */
export const contactSchema = z.object({
  name: z.string().min(2, {
    en: 'Name must be at least 2 characters.',
    ar: 'يجب أن يكون الاسم حرفين على الأقل.',
  } as any),
  phone: z.string().refine((val) => {
    // Valid phone has +971 and then 9 digits
    const digitsOnly = val.replace(/\D/g, '');
    return digitsOnly.length === 12; // 971 + 9 digits = 12
  }, {
    en: 'Please enter a valid 9-digit UAE phone number (+971 XX XXX XXXX).',
    ar: 'يرجى إدخال رقم هاتف إماراتي صحيح من ٩ أرقام (+971 XX XXX XXXX).',
  } as any),
  email: z.string().email({
    en: 'Please enter a valid email address.',
    ar: 'يرجى إدخال بريد إلكتروني صحيح.',
  } as any),
  sport: z.string(),
  message: z.string().min(5, {
    en: 'Message must be at least 5 characters.',
    ar: 'يجب أن تكون الرسالة من ٥ أحرف على الأقل.',
  } as any),
});

/**
 * Zod validation schema for the Newsletter Subscription
 */
export const newsletterSchema = z.object({
  email: z.string().email({
    en: 'Please enter a valid email address.',
    ar: 'يرجى إدخال بريد إلكتروني صحيح.',
  } as any),
});

/**
 * Zod validation schema for the Store Checkout Form
 */
export const checkoutSchema = z.object({
  firstName: z.string().min(2, {
    en: 'First name must be at least 2 characters.',
    ar: 'يجب أن يكون الاسم الأول حرفين على الأقل.',
  } as any),
  lastName: z.string().min(2, {
    en: 'Last name must be at least 2 characters.',
    ar: 'يجب أن يكون اسم العائلة حرفين على الأقل.',
  } as any),
  email: z.string().email({
    en: 'Please enter a valid email address.',
    ar: 'يرجى إدخال بريد إلكتروني صحيح.',
  } as any),
  phone: z.string().refine((val) => {
    const digitsOnly = val.replace(/\D/g, '');
    return digitsOnly.length === 12;
  }, {
    en: 'Please enter a valid 9-digit UAE phone number.',
    ar: 'يرجى إدخال رقم هاتف إماراتي صحيح.',
  } as any),
  address: z.string().min(5, {
    en: 'Address must be at least 5 characters.',
    ar: 'يجب أن يكون العنوان ٥ أحرف على الأقل.',
  } as any),
  city: z.string().min(2, {
    en: 'City is required.',
    ar: 'المدينة مطلوبة.',
  } as any),
  emirate: z.string().min(1, {
    en: 'Emirate is required.',
    ar: 'الإمارة مطلوبة.',
  } as any),
  paymentMethod: z.enum(['cod', 'card', 'bank']),
});
