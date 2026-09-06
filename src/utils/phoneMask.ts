/**
 * UAE (+971) Phone Input Mask Utility
 * Enforces +971 format and provides real-time character validation feedback.
 */

export interface PhoneMaskResult {
  formatted: string;
  rawValue: string; // digits only without leading +
  isValid: boolean;
  warning?: { en: string; ar: string };
}

/**
 * Formats user input into +971 XX XXX XXXX
 * and detects any disallowed characters typed.
 */
export function formatUaePhoneNumber(input: string): PhoneMaskResult {
  let hasInvalidChar = false;

  // Check if non-digit characters were introduced (excluding +, spaces, dashes, parentheses)
  if (/[^\d+\s\-()]/.test(input)) {
    hasInvalidChar = true;
  }

  // Strip everything except digits
  let digits = input.replace(/\D/g, '');

  // If user starts typing with 971, strip it to avoid duplicates
  if (digits.startsWith('971')) {
    digits = digits.slice(3);
  } else if (digits.startsWith('0')) {
    // If user starts with local 0 (e.g. 050), drop the 0
    digits = digits.slice(1);
  }

  // Cap at 9 digits for UAE numbers (e.g., 50 123 4567)
  digits = digits.slice(0, 9);

  let formatted = '+971';
  if (digits.length > 0) {
    formatted += ' ' + digits.slice(0, 2);
  }
  if (digits.length > 2) {
    formatted += ' ' + digits.slice(2, 5);
  }
  if (digits.length > 5) {
    formatted += ' ' + digits.slice(5, 9);
  }

  const isValid = digits.length === 9;

  let warning: { en: string; ar: string } | undefined;
  if (hasInvalidChar) {
    warning = {
      en: 'Only numbers are allowed. Invalid characters were removed.',
      ar: 'يُسمح بالأرقام فقط. تم حذف الأحرف غير الصالحة تلقائياً.',
    };
  } else if (digits.length > 0 && digits.length < 9) {
    warning = {
      en: `Please enter full 9-digit UAE phone number (${digits.length}/9 digits entered).`,
      ar: `يرجى إدخال ٩ أرقام لرقم الهاتف الإماراتي (${digits.length}/٩ أرقام مدخلة).`,
    };
  }

  return {
    formatted,
    rawValue: '971' + digits,
    isValid,
    warning,
  };
}
