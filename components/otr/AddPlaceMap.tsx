'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

interface AddPlaceMapProps {
  initialCenter: { lat: number; lng: number };
  onCenterChange: (center: { lat: number; lng: number }) => void;
}

export default function AddPlaceMap({ initialCenter, onCenterChange }: AddPlaceMapProps) {
  const mapElRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const onCenterChangeRef = useRef(onCenterChange);
  onCenterChangeRef.current = onCenterChange;

  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    if (!sdkReady || !mapElRef.current || mapRef.current) return;

    window.kakao.maps.load(() => {
      const map = new window.kakao.maps.Map(mapElRef.current, {
        center: new window.kakao.maps.LatLng(initialCenter.lat, initialCenter.lng),
        level: 4,
      });
      mapRef.current = map;

      window.kakao.maps.event.addListener(map, 'idle', () => {
        const center = map.getCenter();
        onCenterChangeRef.current({ lat: center.getLat(), lng: center.getLng() });
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdkReady]);

  return (
    <div className="px-5">
      <div className="relative overflow-hidden rounded-[20px] border border-line bg-card" style={{ height: 260 }}>
        <Script
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`}
          strategy="afterInteractive"
          onReady={() => setSdkReady(true)}
        />

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
      <p className="mt-2 text-center text-[12px] text-ink-faint">지도를 움직여서 핀 위치를 이 장소에 맞춰주세요</p>
    </div>
  );
}
