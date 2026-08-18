'use client';

interface OtrHeaderProps {
  onSearchClick: () => void;
  onNotificationClick: () => void;
}

export default function OtrHeader({ onSearchClick, onNotificationClick }: OtrHeaderProps) {
  return (
    <header className="flex flex-shrink-0 items-center justify-between px-5 pb-1 pt-5 sm:pt-11">
      <div className="flex items-baseline gap-2">
        <span className="flex items-center gap-1.5 font-mono text-xl font-bold tracking-tight text-ink">
          <span className="h-[7px] w-[7px] rounded-full bg-rust shadow-[0_0_0_3px_var(--rust-soft)]" />
          OTR
        </span>
        <span className="text-[10px] tracking-wide text-ink-faint">Off The Record</span>
      </div>
      <div className="flex gap-1.5">
        <button
          type="button"
          aria-label="검색"
          onClick={onSearchClick}
          className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-line bg-card text-ink-soft transition hover:-translate-y-px hover:text-ink"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="알림"
          onClick={onNotificationClick}
          className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-line bg-card text-ink-soft transition hover:-translate-y-px hover:text-ink"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
      </div>
    </header>
  );
}
