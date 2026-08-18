'use client';

import { useEffect, useRef } from 'react';
import type { SpotCategory } from '@/data/otr/spots';
import { CATEGORY_META } from './categoryMeta';

interface CategoryDialProps {
  value: SpotCategory;
  onChange: (category: SpotCategory) => void;
}

const CATEGORIES: SpotCategory[] = ['dongne', 'golmok', 'culture', 'cafe'];
const ITEM_WIDTH = 96;

export default function CategoryDial({ value, onChange }: CategoryDialProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const index = Math.max(0, CATEGORIES.indexOf(value));
    el.scrollTo({ left: index * ITEM_WIDTH, behavior: 'auto' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function settleToNearest() {
    const el = trackRef.current;
    if (!el) return;
    const index = Math.max(0, Math.min(CATEGORIES.length - 1, Math.round(el.scrollLeft / ITEM_WIDTH)));
    el.scrollTo({ left: index * ITEM_WIDTH, behavior: 'smooth' });
    const category = CATEGORIES[index];
    if (category !== value) onChangeRef.current(category);
  }

  function handleScroll() {
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(settleToNearest, 120);
  }

  function handlePick(index: number) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: index * ITEM_WIDTH, behavior: 'smooth' });
    onChangeRef.current(CATEGORIES[index]);
  }

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-1/2 z-[1] w-[76px] -translate-x-1/2 rounded-xl border-2 border-ink" />
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth py-2.5"
        style={{ paddingLeft: 'calc(50% - 48px)', paddingRight: 'calc(50% - 48px)' }}
      >
        {CATEGORIES.map((cat, index) => {
          const meta = CATEGORY_META[cat];
          const selected = cat === value;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => handlePick(index)}
              style={{ width: ITEM_WIDTH }}
              className="flex flex-shrink-0 snap-center flex-col items-center justify-center gap-1.5 py-2"
            >
              <span
                className="h-2.5 w-2.5 rounded-full transition"
                style={{ background: meta.color, opacity: selected ? 1 : 0.35 }}
              />
              <span
                className={`whitespace-nowrap text-[13px] font-bold transition ${
                  selected ? 'text-ink' : 'text-ink-faint'
                }`}
              >
                {meta.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
