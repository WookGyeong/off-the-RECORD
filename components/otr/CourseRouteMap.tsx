'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import type { Spot } from '@/data/otr/spots';
import { CATEGORY_META } from './categoryMeta';

interface CourseRouteMapProps {
  /** spots in the order the course visits them */
  spots: Spot[];
  lineColor: string;
}

// NOTE: this connects stops with a straight (dashed) line, not an actual
// walking route — Kakao's map SDK has no pedestrian-directions API. Swapping
// in a real routed path later only means replacing the `path` passed to the
// Polyline below with a decoded route polyline from a directions service.
// Kakao's Polyline paints via canvas, which can't resolve CSS custom
// properties like canvas strokeStyle would need a literal color — so a
// `var(--gold)` string has to be resolved to its computed value first.
function resolveColor(color: string) {
  const match = color.match(/^var\((--[\w-]+)\)$/);
  if (!match) return color;
  const resolved = getComputedStyle(document.documentElement).getPropertyValue(match[1]).trim();
  return resolved || color;
}

export default function CourseRouteMap({ spots, lineColor }: CourseRouteMapProps) {
  const mapElRef = useRef<HTMLDivElement | null>(null);
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    if (!sdkReady || !mapElRef.current || spots.length === 0) return;

    window.kakao.maps.load(() => {
      const map = new window.kakao.maps.Map(mapElRef.current, {
        center: new window.kakao.maps.LatLng(spots[0].lat, spots[0].lng),
        level: 5,
      });

      const path = spots.map((spot) => new window.kakao.maps.LatLng(spot.lat, spot.lng));

      new window.kakao.maps.Polyline({
        map,
        path,
        strokeWeight: 3,
        strokeColor: resolveColor(lineColor),
        strokeOpacity: 0.85,
        strokeStyle: 'shortdash',
      });

      spots.forEach((spot, index) => {
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
              <circle cx="15" cy="14" r="8" fill="var(--card)" />
              <text x="15" y="18.5" text-anchor="middle" font-size="11" font-weight="bold" fill="${meta.color}">${index + 1}</text>
            </svg>
          </div>`;

        const overlay = new window.kakao.maps.CustomOverlay({
          position: new window.kakao.maps.LatLng(spot.lat, spot.lng),
          content: el,
          yAnchor: 1,
          zIndex: 4 + index,
        });
        overlay.setMap(map);
      });

      const bounds = new window.kakao.maps.LatLngBounds();
      path.forEach((point) => bounds.extend(point));
      map.setBounds(bounds, 44, 32, 32, 32);
    });
  }, [sdkReady, spots, lineColor]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-card" style={{ height: 220 }}>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`}
        strategy="afterInteractive"
        onReady={() => setSdkReady(true)}
      />
      <div ref={mapElRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
