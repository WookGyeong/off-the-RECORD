'use client';

import { useEffect, useRef, useState } from 'react';

interface KakaoPlace {
  place_name: string;
  address_name: string;
  road_address_name?: string;
  x: string;
  y: string;
}

interface PlaceSearchProps {
  sdkReady: boolean;
  biasCenter: { lat: number; lng: number };
  onSelect: (place: { name: string; lat: number; lng: number }) => void;
}

export default function PlaceSearch({ sdkReady, biasCenter, onSelect }: PlaceSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<KakaoPlace[]>([]);
  const [searching, setSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const placesRef = useRef<any>(null);
  const biasCenterRef = useRef(biasCenter);
  biasCenterRef.current = biasCenter;
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickAway(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickAway);
    return () => document.removeEventListener('mousedown', handleClickAway);
  }, [open]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed || !sdkReady) return;

    if (!placesRef.current) {
      placesRef.current = new window.kakao.maps.services.Places();
    }

    setSearching(true);
    placesRef.current.keywordSearch(
      trimmed,
      (data: KakaoPlace[], status: string) => {
        setSearching(false);
        setOpen(true);
        setResults(status === window.kakao.maps.services.Status.OK ? data : []);
      },
      { location: new window.kakao.maps.LatLng(biasCenterRef.current.lat, biasCenterRef.current.lng), size: 8 },
    );
  }

  function handlePick(place: KakaoPlace) {
    onSelect({ name: place.place_name, lat: parseFloat(place.y), lng: parseFloat(place.x) });
    setQuery(place.place_name);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative px-5 pb-3">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="장소 이름으로 검색 (예: 지금 그 자리의 가게 이름)"
          className="flex-1 rounded-xl border border-line bg-card px-3.5 py-2.5 text-[14px] text-ink outline-none transition focus:border-line-strong"
        />
        <button
          type="submit"
          disabled={!sdkReady || searching}
          className="flex-shrink-0 rounded-xl border border-line bg-card px-3.5 text-[13px] font-bold text-ink-soft transition active:scale-95 disabled:opacity-50"
        >
          검색
        </button>
      </form>

      {open && (
        <div className="absolute left-5 right-5 top-full z-10 mt-1.5 max-h-64 overflow-y-auto rounded-xl border border-line bg-card-raised shadow-lg">
          {results.length === 0 ? (
            <p className="px-3.5 py-3 text-[13px] text-ink-faint">검색 결과가 없어요. 지도를 직접 움직여서 위치를 잡아도 돼요.</p>
          ) : (
            results.map((place, i) => (
              <button
                key={`${place.place_name}-${i}`}
                type="button"
                onClick={() => handlePick(place)}
                className="block w-full border-b border-line px-3.5 py-2.5 text-left last:border-b-0 hover:bg-card"
              >
                <p className="text-[13.5px] font-bold text-ink">{place.place_name}</p>
                <p className="text-[12px] text-ink-faint">{place.road_address_name || place.address_name}</p>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
