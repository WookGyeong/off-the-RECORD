'use client';

import { useRef, useState } from 'react';
import OtrHeader from '@/components/otr/OtrHeader';
import CategoryFilter from '@/components/otr/CategoryFilter';
import LocalMap from '@/components/otr/LocalMap';
import CourseRail from '@/components/otr/CourseRail';
import BottomNav from '@/components/otr/BottomNav';
import SpotSheet from '@/components/otr/SpotSheet';
import CourseSheet from '@/components/otr/CourseSheet';
import SearchSheet from '@/components/otr/SearchSheet';
import Toast from '@/components/otr/Toast';
import { spots } from '@/data/otr/spots';
import { courses } from '@/data/otr/courses';
import type { CategoryKey } from '@/components/otr/categoryMeta';

export default function ExploreHome() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const [selectedSpotId, setSelectedSpotId] = useState<number | null>(null);
  const [openCourseId, setOpenCourseId] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const visibleSpotIds = new Set(
    spots.filter((s) => activeCategory === 'all' || activeCategory === s.category).map((s) => s.id),
  );
  const selectedSpot = spots.find((s) => s.id === selectedSpotId) ?? null;
  const openCourse = courses.find((c) => c.id === openCourseId) ?? null;
  const sheetOpen = selectedSpotId !== null || openCourseId !== null || searchOpen;

  function showToast(message: string) {
    setToastMessage(message);
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 1900);
  }

  function closeSheets() {
    setSelectedSpotId(null);
    setOpenCourseId(null);
    setSearchOpen(false);
  }

  function handleSelectSpot(id: number) {
    setOpenCourseId(null);
    setSelectedSpotId(id);
  }

  function handleSelectCourse(id: number) {
    setSelectedSpotId(null);
    setOpenCourseId(id);
  }

  function handleViewCourseFromSpot() {
    if (!selectedSpot) return;
    const match = courses.find((c) => c.spotIds.includes(selectedSpot.id));
    setSelectedSpotId(null);
    if (match) {
      setTimeout(() => setOpenCourseId(match.id), 260);
    }
  }

  return (
    <div className="flex min-h-screen justify-center bg-[radial-gradient(120%_140%_at_50%_0%,var(--card),var(--paper))] px-0 py-0 sm:px-4 sm:py-8">
      <div className="relative flex w-full max-w-[430px] flex-col bg-paper sm:min-h-[820px] sm:rounded-[32px] sm:border sm:border-line sm:shadow-2xl">
        <OtrHeader
          onSearchClick={() => setSearchOpen(true)}
          onNotificationClick={() => showToast('새로운 알림이 없어요')}
        />

        <div className="flex-shrink-0 px-5 pb-3.5 pt-2.5">
          <h1 className="text-balance text-[19px] font-bold leading-relaxed text-ink">
            지금 걷는 골목에 <span className="text-rust">숨은 이야기</span>가 있어요
          </h1>
        </div>

        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

        <LocalMap
          spots={spots}
          visibleSpotIds={visibleSpotIds}
          selectedSpotId={selectedSpotId}
          onSelectSpot={handleSelectSpot}
        />

        <CourseRail courses={courses} onSelectCourse={handleSelectCourse} />

        <BottomNav
          onSavedClick={() => showToast('저장한 코스는 준비 중이에요')}
          onMyPageClick={() => showToast('마이페이지는 준비 중이에요')}
        />

        <div
          className={`absolute inset-0 z-50 bg-[rgba(20,18,12,0.42)] transition-opacity duration-200 ${
            sheetOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onClick={closeSheets}
        />

        <SpotSheet
          spot={selectedSpot}
          open={selectedSpotId !== null}
          onClose={closeSheets}
          onViewCourse={handleViewCourseFromSpot}
        />

        <CourseSheet
          course={openCourse}
          spots={spots}
          open={openCourseId !== null}
          onStartWalk={() => showToast('실제 걷기 모드는 다음 업데이트에서 만나요')}
        />

        <SearchSheet open={searchOpen} spots={spots} onClose={() => setSearchOpen(false)} />

        <Toast message={toastMessage} visible={toastVisible} />
      </div>
    </div>
  );
}
