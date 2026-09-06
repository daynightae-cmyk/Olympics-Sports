import type { SportMediaAsset, SportMediaUsage } from '../../domain/contracts';
import { basketballMediaAssets } from './basketball';
import { footballMediaAssets } from './football';
import { swimmingMediaAssets } from './swimming';
import { UOS_PUBLIC_MEDIA, getPublicMedia, getSportMediaByKey } from './publicMediaRegistry';

export const sportMediaAssets: SportMediaAsset[] = [
  ...footballMediaAssets,
  ...swimmingMediaAssets,
  ...basketballMediaAssets,
];

export function getSportMediaAssets(sportId: string) {
  return sportMediaAssets
    .filter(asset => asset.sportId === sportId)
    .sort((a, b) => a.order - b.order);
}

export function getSportMediaByUsage(sportId: string, usage: SportMediaUsage) {
  return getSportMediaAssets(sportId).find(asset => asset.usage === usage);
}

export function getSportPreviewMedia(sportId: string) {
  const mediaObj = getSportMediaByKey(sportId);
  if (mediaObj?.card) {
    return {
      id: mediaObj.card.key,
      url: mediaObj.card.url,
      altEn: mediaObj.card.altEn,
      altAr: mediaObj.card.altAr,
      sportId,
      usage: 'card' as const,
      order: 1,
    };
  }
  const assets = getSportMediaAssets(sportId);
  return assets.find(asset => asset.usage === 'brand')
    ?? assets.find(asset => asset.usage === 'hero')
    ?? assets[0];
}

export { basketballMediaAssets, footballMediaAssets, swimmingMediaAssets, UOS_PUBLIC_MEDIA, getPublicMedia, getSportMediaByKey };

