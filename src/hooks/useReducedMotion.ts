import { useEffect, useState } from 'react';
import { useUiSettings } from '../ui/theme/useUiSettings';

/**
 * Hook to respect the user's motion preference:
 * - Checks the system 'prefers-reduced-motion: reduce' media query
 * - Incorporates manual UI setting if configured ('reduced' | 'system')
 * - Automatically keeps the root element dataset in sync
 */
export function useReducedMotion(): boolean {
  const { motion } = useUiSettings();

  const [systemPrefersReduced, setSystemPrefersReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersReduced(e.matches);
    };

    mediaQuery.addEventListener?.('change', handleChange);
    return () => mediaQuery.removeEventListener?.('change', handleChange);
  }, []);

  const isReduced = motion === 'reduced' || (motion === 'system' && systemPrefersReduced);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.dataset.reducedMotion = isReduced ? 'true' : 'false';
  }, [isReduced]);

  return isReduced;
}

export default useReducedMotion;
