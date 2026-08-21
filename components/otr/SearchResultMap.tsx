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
      el.innerHTML = `
        <div style="width:26px;height:26px;transform:rotate(45deg);border-radius:50% 50% 50% 4px;border:2px solid var(--card);box-shadow:0 3px 8px rgba(0,0,0,.22);display:flex;align-items:center;justify-content:center;background:${meta.color}">
          <div style="width:7px;height:7px;border-radius:9999px;background:var(--card);transform:rotate(-45deg)"></div>
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
