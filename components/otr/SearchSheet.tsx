'use client';

import { useState } from 'react';
import type { Spot } from '@/data/otr/spots';
import { CATEGORY_META } from './categoryMeta';
import SearchScopeDial, { type SearchScope } from './SearchScopeDial';
import SearchResultMap from './SearchResultMap';

interface SearchSheetProps {
  open: boolean;
  spots: Spot[];
  onClose: () => void;
}

function matchesScope(spot: Spot, scope: SearchScope, query: string) {
  const nameMatch = spot.name.toLowerCase().includes(query);
  const descMatch = spot.description.toLowerCase().includes(query);
  if (scope === 'title') return nameMatch;
  if (scope === 'content') return descMatch;
  return nameMatch || descMatch;
}

export default function SearchSheet({ open, spots, onClose }: SearchSheetProps) {
  const [scope, setScope] = useState<SearchScope>('title');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Spot[] | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSelectedId(null);
    const q = query.trim().toLowerCase();
    setResults(q ? spots.filter((spot) => matchesScope(spot, scope, q)) : []);
  }

  function handleSelectResult(id: number) {
    setSelectedId((current) => (current === id ? null : id));
  }

  return (
    <div
      className={`absolute inset-x-0 bottom-0 z-[51] max-h-[86%] overflow-y-auto rounded-sheet bg-card-raised px-5 pb-6 pt-2 shadow-[0_-12px_30px_rgba(0,0,0,0.18)] transition-transform duration-300 ${
        open ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="mx-auto mb-3.5 mt-1.5 h-1 w-9 rounded-full bg-line-strong" />

      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-lg font-bold text-ink">검색</h3>
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-faint transition hover:text-ink"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <SearchScopeDial value={scope} onChange={setScope} />

      <form onSubmit={handleSearch} className="mt-2 flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="flex-1 rounded-xl border border-line bg-card px-3.5 py-3 text-[14px] text-ink outline-none transition focus:border-line-strong"
        />
        <button
          type="submit"
          className="flex-shrink-0 rounded-xl border border-ink bg-ink px-4 text-[13.5px] font-bold text-paper transition active:scale-95"
        >
          검색
        </button>
      </form>

      {results !== null && (
        <div className="mt-4">
          <p className="mb-2 text-[12px] text-ink-faint">{results.length}개 결과</p>

          {results.length === 0 ? (
            <p className="rounded-xl border border-line bg-card px-3.5 py-4 text-center text-[13px] text-ink-faint">
              검색 결과가 없어요
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {results.map((spot) => {
                const meta = CATEGORY_META[spot.category];
                const isSelected = spot.id === selectedId;
                return (
                  <li key={spot.id}>
                    <button
                      type="button"
                      onClick={() => handleSelectResult(spot.id)}
                      className={`flex w-full items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left transition ${
                        isSelected ? 'rounded-b-none border-ink' : 'border-line hover:border-line-strong'
                      } bg-card`}
                    >
                      <span
                        className="flex-shrink-0 rounded-full px-2 py-1 text-[11px] font-bold"
                        style={{ background: meta.soft, color: meta.color }}
                      >
                        {meta.label}
                      </span>
                      <span className="truncate text-[14px] font-bold text-ink">{spot.name}</span>
                    </button>
                    {isSelected && (
                      <div className="rounded-b-xl border border-t-0 border-ink bg-card p-2.5">
                        <SearchResultMap spot={spot} />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
