'use client';

import { useEffect, useRef } from 'react';

interface NearbySuggestion {
  name: string;
  lat: number;
  lng: number;
  distanceMeters: number;
}

interface AddPlaceMapProps {
  sdkReady: boolean;
  center: { lat: number; lng: number };
  onCenterChange: (center: { lat: number; lng: number }) => void;
  onNearbySuggestion: (suggestion: NearbySuggestion | null) => void;
}

// category codes covering the kinds of everyday spots this app is about
// (cafes, small shops, pharmacies, culture/history spots, sights) — see Kakao's
// fixed category-group-code list; life services like 세탁소/문구점 aren't covered.
const NEARBY_CATEGORY_CODES = ['FD6', 'CE7', 'CS2', 'MT1', 'CT1', 'AT4', 'PM9', 'HP8'];
const NEARBY_RADIUS_M = 120;

function searchCategoryNearby(places: any, code: string, lat: number, lng: number): Promise<any | null> {
  return new Promise((resolve) => {
    places.categorySearch(
      code,
      (data: any[], status: string) => {
        resolve(status === window.kakao.maps.services.Status.OK && data.length > 0 ? data[0] : null);
      },
      {
        location: new window.kakao.maps.LatLng(lat, lng),
        radius: NEARBY_RADIUS_M,
        sort: window.kakao.maps.services.SortBy.DISTANCE,
        size: 1,
      },
    );
  });
}

export default function AddPlaceMap({ sdkReady, center, onCenterChange, onNearbySuggestion }: AddPlaceMapProps) {
  const mapElRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const lastCenterRef = useRef(center);
  const onCenterChangeRef = useRef(onCenterChange);
  onCenterChangeRef.current = onCenterChange;
  const onNearbySuggestionRef = useRef(onNearbySuggestion);
  onNearbySuggestionRef.current = onNearbySuggestion;
  const placesRef = useRef<any>(null);
  const searchTokenRef = useRef(0);
  const suppressNextIdleSuggestionRef = useRef(false);

  useEffect(() => {
    if (!sdkReady || !mapElRef.current || mapRef.current) return;

    async function findNearbySuggestion(lat: number, lng: number) {
      if (!window.kakao?.maps?.services) return;
      const token = ++searchTokenRef.current;
      if (!placesRef.current) {
        placesRef.current = new window.kakao.maps.services.Places();
      }

      const results = await Promise.all(
        NEARBY_CATEGORY_CODES.map((code) => searchCategoryNearby(placesRef.current, code, lat, lng)),
      );
      if (token !== searchTokenRef.current) return; // a newer drag/search superseded this lookup

      const nearest = results.filter(Boolean).sort((a, b) => Number(a.distance) - Number(b.distance))[0];
      onNearbySuggestionRef.current(
        nearest
          ? {
              name: nearest.place_name,
              lat: parseFloat(nearest.y),
              lng: parseFloat(nearest.x),
              distanceMeters: Number(nearest.distance),
            }
          : null,
      );
    }

    const map = new window.kakao.maps.Map(mapElRef.current, {
      center: new window.kakao.maps.LatLng(lastCenterRef.current.lat, lastCenterRef.current.lng),
      level: 4,
    });
    mapRef.current = map;

    window.kakao.maps.event.addListener(map, 'idle', () => {
      const c = map.getCenter();
      const next = { lat: c.getLat(), lng: c.getLng() };
      lastCenterRef.current = next;
      onCenterChangeRef.current(next);
      if (suppressNextIdleSuggestionRef.current) {
        suppressNextIdleSuggestionRef.current = false;
        return;
      }
      findNearbySuggestion(next.lat, next.lng);
    });
  }, [sdkReady]);

  // re-center the map when a place is picked from search or a suggestion, without fighting user drags
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const moved =
      Math.abs(center.lat - lastCenterRef.current.lat) > 1e-6 ||
      Math.abs(center.lng - lastCenterRef.current.lng) > 1e-6;
    if (!moved) return;
    lastCenterRef.current = center;
    searchTokenRef.current += 1; // invalidate any in-flight drag-triggered suggestion lookup
    suppressNextIdleSuggestionRef.current = true; // this pan is programmatic, not a user drag — don't re-suggest
    onNearbySuggestionRef.current(null);
    map.panTo(new window.kakao.maps.LatLng(center.lat, center.lng));
  }, [center]);

  return (
    <div className="px-5">
      <div className="relative overflow-hidden rounded-[20px] border border-line bg-card" style={{ height: 260 }}>
        <div ref={mapElRef} className="absolute inset-0 h-full w-full" />

        {/* fixed pin: stays visually centered while the map underneath is dragged */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-[3] -translate-x-1/2 -translate-y-[calc(100%-3px)]">
          <svg width="30" height="38" viewBox="0 0 30 38" fill="none">
            <path
              d="M15 37C15 37 28 22.6 28 14C28 6.8 22.2 1 15 1C7.8 1 2 6.8 2 14C2 22.6 15 37 15 37Z"
              fill="var(--rust)"
              stroke="var(--card)"
              strokeWidth="2"
            />
            <circle cx="15" cy="14" r="4.5" fill="var(--card)" />
          </svg>
        </div>
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-[2] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line bg-card/70" />
      </div>
      <p className="mt-2 text-center text-[12px] text-ink-faint">위에서 장소를 검색하거나, 지도를 직접 움직여서 핀 위치를 맞춰주세요</p>
    </div>
  );
}
