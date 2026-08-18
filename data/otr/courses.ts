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
    title: '해 질 녘 골목길 코스',
    concept: '노을이 스며드는 골목, 사라져가는 가게들의 이야기를 따라 걷는 코스',
    distanceKm: 1.4,
    durationMin: 35,
    spotIds: [1, 2, 4, 5, 6],
    hue: ['var(--gold)', 'var(--moss)'],
  },
  {
    id: 2,
    title: '학교 앞 추억의 가게 코스',
    concept: '학생들의 추억이 쌓인 가게들만 골라 짧게 도는 코스',
    distanceKm: 1.1,
    durationMin: 28,
    spotIds: [3, 1, 6, 2],
    hue: ['var(--plum)', 'var(--rust)'],
  },
];
