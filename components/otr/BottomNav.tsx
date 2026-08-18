'use client';

interface BottomNavProps {
  onSavedClick: () => void;
  onMyPageClick: () => void;
}

export default function BottomNav({ onSavedClick, onMyPageClick }: BottomNavProps) {
  return (
    <nav className="flex flex-shrink-0 border-t border-line bg-card">
      <button type="button" className="flex flex-1 flex-col items-center gap-1 border-none bg-none px-1 pb-3 pt-2.5 text-[11px] font-semibold text-rust">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M12 21s-7-5.33-7-11a7 7 0 0 1 14 0c0 5.67-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.6" />
        </svg>
        탐색
      </button>
      <button
        type="button"
        onClick={onSavedClick}
        className="flex flex-1 flex-col items-center gap-1 border-none bg-none px-1 pb-3 pt-2.5 text-[11px] font-semibold text-ink-faint"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M6 3h12v18l-6-4.5L6 21V3z" />
        </svg>
        저장한 코스
      </button>
      <button
        type="button"
        onClick={onMyPageClick}
        className="flex flex-1 flex-col items-center gap-1 border-none bg-none px-1 pb-3 pt-2.5 text-[11px] font-semibold text-ink-faint"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <circle cx="12" cy="8" r="3.4" />
          <path d="M4.5 20c1.6-3.6 4.6-5.4 7.5-5.4s5.9 1.8 7.5 5.4" />
        </svg>
        마이페이지
      </button>
    </nav>
  );
}
