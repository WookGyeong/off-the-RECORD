'use client';

import { CATEGORY_META, CATEGORY_ORDER, type CategoryKey } from './categoryMeta';

interface CategoryFilterProps {
  active: CategoryKey;
  onChange: (key: CategoryKey) => void;
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="no-scrollbar flex flex-shrink-0 gap-2 overflow-x-auto px-5 pb-4 pt-1">
      {CATEGORY_ORDER.map((key) => {
        const meta = CATEGORY_META[key];
        const isActive = key === active;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-2 text-[13px] font-semibold transition ${
              isActive
                ? 'border-ink bg-ink text-paper'
                : 'border-line bg-card text-ink-soft hover:border-line-strong'
            }`}
          >
            {key !== 'all' && (
              <span
                className="h-[7px] w-[7px] rounded-full"
                style={{ background: meta.color, opacity: isActive ? 1 : 0.55 }}
              />
            )}
            {meta.label}
          </button>
        );
      })}
    </div>
  );
}
