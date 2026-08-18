'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import type { Spot } from '@/data/otr/spots';
import { CATEGORY_META } from './categoryMeta';

interface LocalMapProps {
  spots: Spot[];
  visibleSpotIds: Set<number>;
  selectedSpotId: number | null;
  onSelectSpot: (id: number) => void;
}

/** temporary center: Daegu Yakjeon-golmok (약전골목) */
const MAP_CENTER = { lat: 35.8703, lng: 128.5952 };

export default function LocalMap({ spots, visibleSpotIds, selectedSpotId, onSelectSpot }: LocalMapProps) {
  const mapElRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const pinOverlaysRef = useRef<Map<number, any>>(new Map());
  const meOverlayRef = useRef<any>(null);
  const onSelectSpotRef = useRef(onSelectSpot);
  onSelectSpotRef.current = onSelectSpot;

  const [sdkReady, setSdkReady] = useState(false);
  const [locStatus, setLocStatus] = useState<'idle' | 'locating' | 'granted' | 'denied'>('idle');

  const anyVisible = spots.some((s) => visibleSpotIds.has(s.id));

  useEffect(() => {
    if (!sdkReady || !mapElRef.current || mapRef.current) return;

    window.kakao.maps.load(() => {
      const map = new window.kakao.maps.Map(mapElRef.current, {
        center: new window.kakao.maps.LatLng(MAP_CENTER.lat, MAP_CENTER.lng),
        level: 4,
      });
      mapRef.current = map;

      spots.forEach((spot) => {
        const meta = CATEGORY_META[spot.category];
        const el = document.createElement('div');
        el.style.cursor = 'pointer';
        el.innerHTML = `
          <div data-pin style="width:26px;height:26px;transform:rotate(45deg);border-radius:50% 50% 50% 4px;border:2px solid var(--card);box-shadow:0 3px 8px rgba(0,0,0,.22);display:flex;align-items:center;justify-content:center;background:${meta.color}">
            <div style="width:7px;height:7px;border-radius:9999px;background:var(--card);transform:rotate(-45deg)"></div>
          </div>`;
        el.addEventListener('click', () => onSelectSpotRef.current(spot.id));

        const overlay = new window.kakao.maps.CustomOverlay({
          position: new window.kakao.maps.LatLng(spot.lat, spot.lng),
          content: el,
          yAnchor: 1,
          zIndex: 4,
        });
        overlay.setMap(map);
        pinOverlaysRef.current.set(spot.id, overlay);
      });

      requestLocation(map);
    });
  }, [sdkReady, spots]);

  useEffect(() => {
    pinOverlaysRef.current.forEach((overlay, id) => {
      overlay.setMap(visibleSpotIds.has(id) ? mapRef.current : null);
      const pin = (overlay.getContent() as HTMLElement).querySelector('[data-pin]') as HTMLElement | null;
      if (!pin) return;
      const spot = spots.find((s) => s.id === id);
      if (!spot) return;
      const meta = CATEGORY_META[spot.category];
      pin.style.boxShadow =
        selectedSpotId === id ? `0 0 0 4px ${meta.soft}, 0 3px 8px rgba(0,0,0,.22)` : '0 3px 8px rgba(0,0,0,.22)';
    });
  }, [visibleSpotIds, selectedSpotId, spots]);

  function requestLocation(map: any) {
    if (!navigator.geolocation) {
      setLocStatus('denied');
      return;
    }
    setLocStatus('locating');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        placeMeOverlay(map, pos.coords.latitude, pos.coords.longitude);
        setLocStatus('granted');
      },
      () => setLocStatus('denied'),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }

  function placeMeOverlay(map: any, lat: number, lng: number) {
    const position = new window.kakao.maps.LatLng(lat, lng);
    if (meOverlayRef.current) {
      meOverlayRef.current.setPosition(position);
      return;
    }
    const el = document.createElement('div');
    el.style.position = 'relative';
    el.style.width = '16px';
    el.style.height = '16px';
    el.innerHTML = `
      <span class="animate-ping-slow" style="position:absolute;inset:-8px;border-radius:9999px;background:#3b82f6;opacity:.35"></span>
      <span style="position:absolute;inset:0;border-radius:9999px;border:2px solid var(--card);background:#3b82f6;box-shadow:0 1px 4px rgba(0,0,0,.3)"></span>`;
    meOverlayRef.current = new window.kakao.maps.CustomOverlay({
      position,
      content: el,
      zIndex: 5,
    });
    meOverlayRef.current.setMap(map);
  }

  function handleRecenter() {
    if (!mapRef.current) return;
    if (meOverlayRef.current) {
      mapRef.current.panTo(meOverlayRef.current.getPosition());
    } else {
      requestLocation(mapRef.current);
    }
  }

  return (
    <div className="flex min-h-0 flex-1 px-5">
      <div className="relative flex-1 overflow-hidden rounded-[20px] border border-line bg-card" style={{ minHeight: 300 }}>
        <Script
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`}
          strategy="afterInteractive"
          onReady={() => setSdkReady(true)}
        />

        <div ref={mapElRef} className="absolute inset-0 h-full w-full" />

        <div
          className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-card px-8 text-center transition-opacity ${
            anyVisible ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="text-2xl">🗺️</div>
          <p className="text-[13px] leading-relaxed text-ink-soft">
            아직 등록된 이야기가 없는 카테고리예요.
            <br />
            다른 필터를 눌러 골목을 둘러보세요.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRecenter}
          aria-label="내 위치로 이동"
          className="absolute bottom-3 right-3 z-[3] flex h-9 w-9 items-center justify-center rounded-full border border-line bg-card text-ink-soft shadow transition active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          </svg>
        </button>

        <div className="absolute bottom-3 left-3 z-[3] flex items-center gap-1.5 rounded-full border border-line bg-card px-2.5 py-1.5 text-[11px] text-ink-faint">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[11px] w-[11px]">
            <path d="M12 21s-7-5.33-7-11a7 7 0 0 1 14 0c0 5.67-7 11-7 11z" />
            <circle cx="12" cy="10" r="2.6" />
          </svg>
          {locStatus === 'denied' ? '위치 권한을 허용하면 내 위치가 표시돼요' : '핀을 눌러 이야기를 들어보세요'}
        </div>
      </div>
    </div>
  );
}
