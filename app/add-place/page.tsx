'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import AddPlaceMap from '@/components/otr/AddPlaceMap';
import PlaceSearch from '@/components/otr/PlaceSearch';
import CategoryDial from '@/components/otr/CategoryDial';
import { addSpot } from '@/data/otr/spots';
import type { SpotCategory } from '@/data/otr/spots';

const DEFAULT_CENTER = { lat: 35.8679, lng: 128.5885 };

export default function AddPlacePage() {
  const router = useRouter();
  const [sdkReady, setSdkReady] = useState(false);
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<SpotCategory>('dongne');
  const [suggestion, setSuggestion] = useState<{ name: string; lat: number; lng: number; distanceMeters: number } | null>(
    null,
  );

  const canSubmit = name.trim().length > 0 && description.trim().length > 0;

  function handleSubmit() {
    if (!canSubmit) return;
    addSpot({ name: name.trim(), description: description.trim(), category, lat: center.lat, lng: center.lng });
    router.push('/');
  }

  function handlePlaceSelect(place: { name: string; lat: number; lng: number }) {
    setCenter({ lat: place.lat, lng: place.lng });
    setName(place.name);
  }

  function handleUseSuggestion() {
    if (!suggestion) return;
    setCenter({ lat: suggestion.lat, lng: suggestion.lng });
    setName(suggestion.name);
    setSuggestion(null);
  }

  return (
    <div className="flex min-h-screen justify-center bg-[radial-gradient(120%_140%_at_50%_0%,var(--card),var(--paper))] px-0 py-0 sm:px-4 sm:py-8">
      <div className="relative flex w-full max-w-[430px] flex-col overflow-hidden bg-paper sm:min-h-[820px] sm:rounded-[32px] sm:border sm:border-line sm:shadow-2xl">
        <Script
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services`}
          strategy="afterInteractive"
          onReady={() => window.kakao.maps.load(() => setSdkReady(true))}
        />

        <header className="flex flex-shrink-0 items-center gap-3 px-5 pb-1 pt-5 sm:pt-11">
          <Link
            href="/"
            aria-label="뒤로가기"
            className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full border border-line bg-card text-ink-soft transition hover:-translate-y-px hover:text-ink"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>
          <h1 className="text-[17px] font-bold text-ink">장소 추가</h1>
        </header>

        <p className="px-5 pb-3.5 pt-2.5 text-[13px] leading-relaxed text-ink-soft">
          새로 소개하고 싶은 골목이나 가게가 있다면 알려주세요.
        </p>

        <PlaceSearch sdkReady={sdkReady} biasCenter={center} onSelect={handlePlaceSelect} />

        <AddPlaceMap
          sdkReady={sdkReady}
          center={center}
          onCenterChange={setCenter}
          onNearbySuggestion={setSuggestion}
        />

        {suggestion && (
          <div className="mx-5 mt-2.5 flex items-center justify-between gap-3 rounded-xl border border-line bg-card px-3.5 py-2.5">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-moss">이 위치와 가장 비슷한 장소</p>
              <p className="truncate text-[13.5px] font-bold text-ink">{suggestion.name}</p>
              <p className="text-[11.5px] text-ink-faint">약 {Math.round(suggestion.distanceMeters)}m</p>
            </div>
            <div className="flex flex-shrink-0 items-center gap-1.5">
              <button
                type="button"
                onClick={handleUseSuggestion}
                className="flex-shrink-0 rounded-lg border border-ink bg-ink px-2.5 py-1.5 text-[12px] font-bold text-paper transition active:scale-95"
              >
                이 이름 쓰기
              </button>
              <button
                type="button"
                onClick={() => setSuggestion(null)}
                aria-label="추천 닫기"
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-ink-faint transition hover:text-ink"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 px-5 py-5">
          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-bold text-ink">장소 이름</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 정미소 골목 카페"
              className="rounded-xl border border-line bg-card px-3.5 py-3 text-[14px] text-ink outline-none transition focus:border-line-strong"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-bold text-ink">장소 설명</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="이 장소에 어떤 이야기가 숨어있나요?"
              className="resize-none rounded-xl border border-line bg-card px-3.5 py-3 text-[14px] leading-relaxed text-ink outline-none transition focus:border-line-strong"
            />
          </label>

          <div className="flex flex-col gap-1.5">
            <span className="text-[13px] font-bold text-ink">카테고리</span>
            <CategoryDial value={category} onChange={setCategory} />
          </div>
        </div>

        <div className="mt-auto px-5 pb-8 pt-2">
          <button
            type="button"
            disabled={!canSubmit}
            onClick={handleSubmit}
            className={`w-full rounded-xl px-3.5 py-3.5 text-[14px] font-bold transition active:scale-[0.97] ${
              canSubmit ? 'border border-ink bg-ink text-paper' : 'border border-line bg-card text-ink-faint'
            }`}
          >
            이 위치에 장소 등록하기
          </button>
        </div>
      </div>
    </div>
  );
}
