'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import type { Spot } from '@/data/otr/spots';
import { CATEGORY_META } from './categoryMeta';

interface SearchResultMapProps {
  spot: Spot;
}

export default function SearchResultMap({ spot }: SearchResultMapProps) {
  const mapElRef = useRef<HTMLDivElement | null>(null);
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    if (!sdkReady || !mapElRef.current) return;

    window.kakao.maps.load(() => {
      const map = new window.kakao.maps.Map(mapElRef.current, {
        center: new window.kakao.maps.LatLng(spot.lat, spot.lng),
        level: 4,
      });

      const meta = CATEGORY_META[spot.category];
      const el = document.createElement('div');
      el.style.width = '30px';
      el.style.height = '38px';
      el.innerHTML = `
        <div style="width:30px;height:38px;filter:drop-shadow(0 3px 6px rgba(0,0,0,.22))">
          <svg width="30" height="38" viewBox="0 0 30 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 37C15 37 28 22.6 28 14C28 6.8 22.2 1 15 1C7.8 1 2 6.8 2 14C2 22.6 15 37 15 37Z"
              fill="${meta.color}"
              stroke="var(--card)"
              stroke-width="2"
            />
            <circle cx="15" cy="14" r="5" fill="var(--card)" />
          </svg>
        </div>`;

      const overlay = new window.kakao.maps.CustomOverlay({
        position: new window.kakao.maps.LatLng(spot.lat, spot.lng),
        content: el,
        yAnchor: 1,
        zIndex: 4,
      });
      overlay.setMap(map);
    });
  }, [sdkReady, spot.id, spot.lat, spot.lng, spot.category]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-card" style={{ height: 200 }}>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`}
        strategy="afterInteractive"
        onReady={() => setSdkReady(true)}
      />
      <div ref={mapElRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
