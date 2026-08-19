'use client';

import type { Course } from '@/data/otr/courses';

interface CourseRailProps {
  courses: Course[];
  onSelectCourse: (id: number) => void;
}

export default function CourseRail({ courses, onSelectCourse }: CourseRailProps) {
  function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    e.currentTarget.scrollLeft += e.deltaY;
    e.preventDefault();
  }

  return (
    <div className="flex-shrink-0 pb-1.5 pt-4">
      <div className="flex items-baseline justify-between px-5 pb-2.5">
        <h2 className="text-[15px] font-bold text-ink">지금 걷기 좋은 코스</h2>
        <span className="text-[11.5px] text-ink-faint">{courses.length}개 코스</span>
      </div>
      <div className="hscroll flex gap-3 px-5 pb-1 pt-0.5" onWheel={handleWheel}>
        {courses.map((course) => (
          <button
            key={course.id}
            type="button"
            onClick={() => onSelectCourse(course.id)}
            className="w-[230px] flex-shrink-0 overflow-hidden rounded-2xl border border-line bg-card text-left transition hover:-translate-y-0.5 hover:border-line-strong"
          >
            <div className="h-[78px]">
              <svg viewBox="0 0 230 78" preserveAspectRatio="none" className="block h-full w-full">
                <rect width="230" height="78" fill={course.hue[0]} opacity="0.16" />
                <path
                  d="M -10 55 C 40 20, 90 70, 140 35 S 220 15, 250 40"
                  fill="none"
                  stroke={course.hue[1]}
                  strokeWidth="3"
                  strokeDasharray="1 8"
                  strokeLinecap="round"
                  opacity="0.8"
                />
                <circle cx="18" cy="52" r="4" fill={course.hue[1]} />
                <circle cx="212" cy="30" r="4" fill={course.hue[1]} />
              </svg>
            </div>
            <div className="px-[13px] pb-[13px] pt-3">
              <p className="mb-1 text-sm font-bold text-ink">{course.title}</p>
              <p className="mb-2.5 text-xs leading-relaxed text-ink-soft">{course.concept}</p>
              <div className="flex items-center gap-1.5 text-[11px] text-ink-faint">
                <b className="font-mono font-bold tabular-nums text-ink-soft">{course.spotIds.length}</b> spots
                <span className="opacity-50">·</span>
                <b className="font-mono font-bold tabular-nums text-ink-soft">{course.distanceKm}</b> km
                <span className="opacity-50">·</span>
                <b className="font-mono font-bold tabular-nums text-ink-soft">{course.durationMin}</b> min
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
