'use client';

import Link from 'next/link';
import { useState } from 'react';

const SCHEDULE: { day: string; emoji: string; items: string | null }[] = [
  { day: '월요일', emoji: '📦', items: '종이류 (신문지, 박스, 책자 등)' },
  { day: '화요일', emoji: '🥫', items: '캔류 (음료캔, 통조림캔 등)' },
  { day: '수요일', emoji: '🍾', items: '유리병 (음료병, 소주병 등)' },
  { day: '목요일', emoji: '🥤', items: '플라스틱류 (페트병, 플라스틱 용기 등)' },
  { day: '금요일', emoji: '🛍️', items: '비닐류 (비닐봉지, 포장 비닐 등)' },
  { day: '토요일', emoji: '🧊', items: '스티로폼류 (스티로폼 상자, 완충재 등)' },
  { day: '일요일', emoji: '😴', items: null },
];

export default function RecyclePage() {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedInfo = SCHEDULE.find((s) => s.day === selected);

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 bg-gradient-to-br from-emerald-50 via-white to-teal-100 p-8 text-center">
      <div className="w-full max-w-md rounded-3xl bg-white/80 p-8 shadow-xl shadow-emerald-100 backdrop-blur">
        <h1 className="text-2xl font-extrabold text-emerald-600">
          ♻️ 분리수거 요일 확인하기
        </h1>
        <p className="mt-1 text-sm text-gray-400">요일을 눌러서 확인해보세요</p>

        <div className="mt-6 grid grid-cols-7 gap-1">
          {SCHEDULE.map(({ day, emoji }) => (
            <button
              key={day}
              onClick={() => setSelected(day)}
              className={`flex flex-col items-center gap-1 rounded-xl border-2 px-1 py-2 text-[11px] font-bold transition ${
                selected === day
                  ? 'scale-105 border-emerald-500 bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-200'
                  : 'border-gray-100 bg-white text-black hover:border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              <span className="text-base sm:text-xl">{emoji}</span>
              {day.slice(0, 1)}
            </button>
          ))}
        </div>

        <div className="mt-6 min-h-[6rem]">
          {selectedInfo ? (
            <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-5">
              <p className="text-base leading-relaxed">
                <span className="font-extrabold text-emerald-600">
                  {selectedInfo.emoji} {selectedInfo.day}
                </span>
                <br />
                {selectedInfo.items ? (
                  <>
                    <span className="font-bold text-gray-800">{selectedInfo.items}</span>
                    <span className="text-gray-600">를 내놓는 날이에요!</span>
                  </>
                ) : (
                  <span className="font-bold text-gray-600">분리수거 없는 쉬는 날이에요 :)</span>
                )}
              </p>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 p-5 text-sm text-gray-400">
              위에서 요일을 선택해보세요 👆
            </div>
          )}
        </div>

        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-gray-100 px-5 py-2 text-sm font-semibold text-gray-500 transition hover:bg-gray-200"
        >
          ← 홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
