'use client';

import type { Course } from '@/data/otr/courses';
import type { Spot } from '@/data/otr/spots';

interface CourseSheetProps {
  course: Course | null;
  spots: Spot[];
  open: boolean;
  onStartWalk: () => void;
}

export default function CourseSheet({ course, spots, open, onStartWalk }: CourseSheetProps) {
  if (!course) return null;
  const orderedSpots = course.spotIds
    .map((id) => spots.find((s) => s.id === id))
    .filter((s): s is Spot => Boolean(s));

  return (
    <div
      className={`absolute inset-x-0 bottom-0 z-[51] max-h-[78%] overflow-y-auto rounded-sheet bg-card-raised px-5 pb-6 pt-2 shadow-[0_-12px_30px_rgba(0,0,0,0.18)] transition-transform duration-300 ${
        open ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="mx-auto mb-3.5 mt-1.5 h-1 w-9 rounded-full bg-line-strong" />
      <h3 className="mb-2 text-lg font-bold text-ink">{course.title}</h3>
      <p className="mb-1 text-[13.5px] leading-relaxed text-ink-soft">{course.concept}</p>

      <div className="mb-1 flex gap-3.5 border-b border-line py-3">
        <div className="text-[11px] text-ink-faint">
          <b className="block text-[15px] font-bold text-ink">{orderedSpots.length}</b>스팟
        </div>
        <div className="text-[11px] text-ink-faint">
          <b className="block text-[15px] font-bold text-ink">{course.distanceKm}km</b>거리
        </div>
        <div className="text-[11px] text-ink-faint">
          <b className="block text-[15px] font-bold text-ink">{course.durationMin}분</b>예상 시간
        </div>
      </div>

      <ol className="mb-[18px] mt-1 list-none p-0">
        {orderedSpots.map((spot, index) => (
          <li
            key={spot.id}
            className="flex items-center gap-3 border-b border-dashed border-line py-2.5 text-[13.5px] text-ink last:border-none"
          >
            <span className="flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full border border-line bg-paper font-mono text-[11px] font-bold text-ink-soft">
              {index + 1}
            </span>
            {spot.name}
          </li>
        ))}
      </ol>

      <button
        type="button"
        onClick={onStartWalk}
        className="w-full rounded-xl border border-ink bg-ink px-3.5 py-3 text-[13.5px] font-bold text-paper transition active:scale-[0.97]"
      >
        이 코스로 걷기 시작
      </button>
    </div>
  );
}
