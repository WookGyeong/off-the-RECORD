export interface Course {
  id: number;
  title: string;
  concept: string;
  distanceKm: number;
  durationMin: number;
  /** ordered spot ids that make up the walking course */
  spotIds: number[];
  /** two accent colors used for the course thumbnail illustration */
  hue: [string, string];
}

export const courses: Course[] = [
  {
    id: 1,
    title: '대구 근대골목 2코스',
    concept: '청라언덕 선교사 주택에서 진골목까지, 개항기부터 근현대사가 겹겹이 쌓인 원도심 골목을 걷는 코스',
    distanceKm: 1.8,
    durationMin: 60,
    spotIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    hue: ['var(--plum)', 'var(--rust)'],
  },
];
