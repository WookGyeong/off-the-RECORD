'use client';

import { useEffect, useRef, useState } from 'react';
import type { Spot } from '@/data/otr/spots';
import { CATEGORY_META } from './categoryMeta';

interface SpotSheetProps {
  spot: Spot | null;
  open: boolean;
  onClose: () => void;
  onViewCourse: () => void;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function SpotSheet({ spot, open, onClose, onViewCourse }: SpotSheetProps) {
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setElapsed(0);
    setPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [spot?.id]);

  useEffect(() => {
    if (!playing || !spot) return;
    intervalRef.current = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 0.2;
        if (next >= spot.audioDuration) {
          setPlaying(false);
          return 0;
        }
        return next;
      });
    }, 200);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, spot]);

  if (!spot) return null;
  const meta = CATEGORY_META[spot.category];
  const remaining = Math.max(0, spot.audioDuration - elapsed);
  const progress = spot.audioDuration > 0 ? Math.min(100, (elapsed / spot.audioDuration) * 100) : 0;

  return (
    <div
      className={`absolute inset-x-0 bottom-0 z-[51] max-h-[78%] overflow-y-auto rounded-sheet bg-card-raised px-5 pb-6 pt-2 shadow-[0_-12px_30px_rgba(0,0,0,0.18)] transition-transform duration-300 ${
        open ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="mx-auto mb-3.5 mt-1.5 h-1 w-9 rounded-full bg-line-strong" />
      <span
        className="mb-2.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold"
        style={{ background: meta.soft, color: meta.color }}
      >
        {meta.label}
      </span>
      <h3 className="mb-2 text-lg font-bold text-ink">{spot.name}</h3>
      <p className="mb-4 text-[13.5px] leading-relaxed text-ink-soft">{spot.description}</p>

      <div className="mb-3.5 flex items-center gap-2.5 rounded-2xl border border-line bg-paper px-3 py-2.5">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full bg-rust text-card-raised"
          aria-label={playing ? '일시정지' : '재생'}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M7 5l13 7-13 7V5z" />
            </svg>
          )}
        </button>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-line">
          <div className="h-full rounded-full bg-rust" style={{ width: `${progress}%` }} />
        </div>
        <span className="min-w-[34px] flex-shrink-0 text-right font-mono text-[11px] tabular-nums text-ink-faint">
          {formatTime(playing || elapsed > 0 ? remaining : spot.audioDuration)}
        </span>
      </div>

      <div className="flex gap-2.5">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="flex-1 rounded-xl border border-ink bg-ink px-3.5 py-3 text-[13.5px] font-bold text-paper transition active:scale-[0.97]"
        >
          미리듣기
        </button>
        <button
          type="button"
          onClick={onViewCourse}
          className="flex-1 rounded-xl border border-line bg-card px-3.5 py-3 text-[13.5px] font-bold text-ink transition active:scale-[0.97]"
        >
          코스 보기
        </button>
      </div>
    </div>
  );
}
