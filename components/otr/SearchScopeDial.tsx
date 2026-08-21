'use client';

import { useEffect, useRef } from 'react';

export type SearchScope = 'title' | 'content' | 'both';

const SCOPES: { key: SearchScope; label: string }[] = [
  { key: 'title', label: '제목' },
  { key: 'content', label: '내용' },
  { key: 'both', label: '제목+내용' },
];
const ITEM_WIDTH = 96;

interface SearchScopeDialProps {
  value: SearchScope;
  onChange: (scope: SearchScope) => void;
}

export default function SearchScopeDial({ value, onChange }: SearchScopeDialProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const index = Math.max(0, SCOPES.findIndex((s) => s.key === value));
    el.scrollTo({ left: index * ITEM_WIDTH, behavior: 'auto' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function settleToNearest() {
    const el = trackRef.current;
    if (!el) return;
    const index = Math.max(0, Math.min(SCOPES.length - 1, Math.round(el.scrollLeft / ITEM_WIDTH)));
    el.scrollTo({ left: index * ITEM_WIDTH, behavior: 'smooth' });
    const scope = SCOPES[index].key;
    if (scope !== value) onChangeRef.current(scope);
  }

  function handleScroll() {
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(settleToNearest, 120);
  }

  function handlePick(index: number) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: index * ITEM_WIDTH, behavior: 'smooth' });
    onChangeRef.current(SCOPES[index].key);
  }

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-1/2 z-[1] w-[88px] -translate-x-1/2 rounded-xl border-2 border-ink" />
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth py-2.5"
        style={{ paddingLeft: 'calc(50% - 48px)', paddingRight: 'calc(50% - 48px)' }}
      >
        {SCOPES.map((s, index) => {
          const selected = s.key === value;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => handlePick(index)}
              style={{ width: ITEM_WIDTH }}
              className="flex flex-shrink-0 snap-center items-center justify-center py-2"
            >
              <span
                className={`whitespace-nowrap text-[13px] font-bold transition ${selected ? 'text-ink' : 'text-ink-faint'}`}
              >
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
