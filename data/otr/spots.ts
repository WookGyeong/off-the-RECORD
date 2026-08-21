export type SpotCategory = 'dongne' | 'golmok' | 'culture' | 'cafe';

export interface Spot {
  id: number;
  name: string;
  category: SpotCategory;
  /** real-world position (temporary placement around Daegu Yakjeon-golmok) */
  lat: number;
  lng: number;
  description: string;
  audioDuration: number;
}

export const spots: Spot[] = [
  {
    id: 1,
    name: '동산선교사주택',
    category: 'culture',
    lat: 35.867545,
    lng: 128.584811,
    description:
      '1900년대 초 대구에 온 서양 선교사들이 지은 스윗즈·챔니스·블레어, 세 채의 붉은 벽돌집이 모여 있어요. 지금은 각각 선교·의료·교육 역사를 보여주는 박물관으로 쓰이고 있어요.',
    audioDuration: 58,
  },
  {
    id: 2,
    name: '3.1만세운동길',
    category: 'culture',
    lat: 35.867842,
    lng: 128.586625,
    description:
      '1919년 3월 8일, 대구 학생들이 일본 경찰의 감시를 피해 만세운동 집결지로 향하던 90개의 돌계단길이에요.',
    audioDuration: 52,
  },
  {
    id: 3,
    name: '계산성당',
    category: 'culture',
    lat: 35.86793,
    lng: 128.58785,
    description:
      '1902년 완공된 영남 지역 최초의 고딕양식 성당으로, 프와넬 신부가 설계하고 프랑스·홍콩에서 자재를 들여와 지었어요.',
    audioDuration: 65,
  },
  {
    id: 4,
    name: '이상화·서상돈고택/계산예가',
    category: 'culture',
    lat: 35.867184,
    lng: 128.587863,
    description:
      '저항시인 이상화가 생의 마지막까지 살았던 고택과, 국채보상운동을 이끈 서상돈의 고택이 마주보고 있는 자리예요. 계산예가는 2012년, 이 일대 근대 문인들의 자취를 소개하는 공간으로 문을 열었어요.',
    audioDuration: 70,
  },
  {
    id: 5,
    name: '뽕나무골목(두사충)',
    category: 'golmok',
    lat: 35.867597,
    lng: 128.588739,
    description:
      '임진왜란 때 명나라 장수로 조선에 왔다가 귀화한 두사충이 뽕나무를 기르며 살았다는 이야기가 전해지는 골목이에요.',
    audioDuration: 48,
  },
  {
    id: 6,
    name: '김원일의 마당깊은집',
    category: 'culture',
    lat: 35.868288,
    lng: 128.588536,
    description:
      '1988년 발표된 김원일의 소설 속, 1950년대 대구 피란민의 삶을 재현한 전시 공간이에요. 옛 남성동 경로당 자리에 한옥으로 조성됐어요.',
    audioDuration: 60,
  },
  {
    id: 7,
    name: '대구읍성영상관',
    category: 'culture',
    lat: 35.86907,
    lng: 128.587532,
    description:
      '1590년 왜구 방비를 위해 쌓았다가 1907년 철거된 대구읍성의 역사를, 미디어아트 영상으로 되살린 전시관이에요.',
    audioDuration: 55,
  },
  {
    id: 8,
    name: '구 교남YMCA회관/아루스',
    category: 'culture',
    lat: 35.867941,
    lng: 128.589351,
    description:
      '1914년 지어진 붉은 벽돌 건물로, 3.1운동 당시 지도자들의 회합 장소이자 신간회운동 등 기독교 민족운동의 거점이었어요.',
    audioDuration: 62,
  },
  {
    id: 9,
    name: '제일교회 역사관',
    category: 'culture',
    lat: 35.868371,
    lng: 128.589526,
    description:
      '1994년 새 예배당을 지으며 남은 옛(세 번째) 예배당 건물을, 2015년부터 대구 기독교 역사를 소개하는 역사관으로 활용하고 있어요.',
    audioDuration: 50,
  },
  {
    id: 10,
    name: '약령시한의약박물관',
    category: 'culture',
    lat: 35.868287,
    lng: 128.589913,
    description:
      '1658년(효종 9년)에 시작된 350년 전통의 대구약령시 역사를 소개하는 박물관으로, 1993년 문을 열었어요.',
    audioDuration: 66,
  },
  {
    id: 11,
    name: '영남대로',
    category: 'golmok',
    lat: 35.867413,
    lng: 128.590492,
    description:
      '조선시대 한양과 동래를 잇던 간선도로로, 영남 유생들이 과거를 보러 걸어서 한양까지 오가던 옛길의 흔적이 남아 있어요.',
    audioDuration: 45,
  },
  {
    id: 12,
    name: '종로',
    category: 'golmok',
    lat: 35.867743,
    lng: 128.591784,
    description:
      '대구읍성 남문의 종루에서 이름이 유래했다는 설이 있는 거리로, 한때 금고·가구 골목이었다가 지금은 맛집 골목으로 변신했어요.',
    audioDuration: 47,
  },
  {
    id: 13,
    name: '진골목',
    category: 'golmok',
    lat: 35.868653,
    lng: 128.592807,
    description:
      "'길다'는 뜻의 경상도 말 '질다'에서 이름이 유래한 골목으로, 달성서씨 집성촌이자 대구 최초의 가구거리였어요. 1991년 자리잡은 미도다방이 지금도 성업 중이에요.",
    audioDuration: 58,
  },
  {
    id: 14,
    name: '화교협회(소학교)',
    category: 'culture',
    lat: 35.868878,
    lng: 128.591905,
    description:
      '1941년 설립 인가를 받아 1943년 개교한 대구화교소학교(현 한국대구화교초등학교)가 있던 자리로, 100년 넘은 대구 화교 공동체의 역사를 담고 있어요.',
    audioDuration: 53,
  },
];

const USER_SPOTS_STORAGE_KEY = 'otr:userSpots';
const KNOWN_CATEGORIES: SpotCategory[] = ['dongne', 'golmok', 'culture', 'cafe'];

function isValidSpot(value: unknown): value is Spot {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === 'number' &&
    typeof v.name === 'string' &&
    typeof v.description === 'string' &&
    typeof v.lat === 'number' &&
    typeof v.lng === 'number' &&
    typeof v.audioDuration === 'number' &&
    KNOWN_CATEGORIES.includes(v.category as SpotCategory)
  );
}

function loadUserSpots(): Spot[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(USER_SPOTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isValidSpot) : [];
  } catch {
    return [];
  }
}

// 사용자가 직접 추가한 장소만 따로 모아둬요. 새로고침 후 복원할 때도 이 목록만 저장해요.
const userSpots: Spot[] = loadUserSpots();
spots.push(...userSpots);

function persistUserSpots() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(USER_SPOTS_STORAGE_KEY, JSON.stringify(userSpots));
  } catch {
    // 프라이빗 모드 등으로 localStorage를 못 쓰면 저장은 그냥 건너뛰어요.
  }
}

export function addSpot(input: { name: string; category: SpotCategory; lat: number; lng: number; description: string }): Spot {
  const nextId = spots.reduce((max, s) => Math.max(max, s.id), 0) + 1;
  const spot: Spot = { ...input, id: nextId, audioDuration: 0 };
  spots.push(spot);
  userSpots.push(spot);
  persistUserSpots();
  return spot;
}
