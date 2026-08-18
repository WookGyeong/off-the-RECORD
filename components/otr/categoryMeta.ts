import type { SpotCategory } from '@/data/otr/spots';

export type CategoryKey = SpotCategory | 'all';

export const CATEGORY_META: Record<CategoryKey, { label: string; color?: string; soft?: string }> = {
  all: { label: '전체' },
  dongne: { label: '동네', color: 'var(--moss)', soft: 'var(--moss-soft)' },
  golmok: { label: '골목', color: 'var(--rust)', soft: 'var(--rust-soft)' },
  culture: { label: '문화·역사', color: 'var(--plum)', soft: 'var(--plum-soft)' },
  cafe: { label: '카페·찻방', color: 'var(--gold)', soft: 'var(--gold-soft)' },
};

export const CATEGORY_ORDER: CategoryKey[] = ['all', 'dongne', 'golmok', 'culture', 'cafe'];
