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
    name: '정미소 골목 카페',
    category: 'cafe',
    lat: 35.8706,
    lng: 128.5945,
    description:
      '1978년부터 정미소였던 자리, 지금은 동네 사람들의 아지트가 된 골목 카페예요.',
    audioDuration: 58,
  },
  {
    id: 2,
    name: '다림방 세탁소',
    category: 'dongne',
    lat: 35.8712,
    lng: 128.5958,
    description:
      '30년째 같은 자리를 지키는 세탁소. 사장님의 다림질 손끝에는 동네의 역사가 배어 있어요.',
    audioDuration: 52,
  },
  {
    id: 3,
    name: '계단집 문구사',
    category: 'culture',
    lat: 35.8698,
    lng: 128.5962,
    description:
      '학교 앞 계단 위, 3대째 이어져 온 손글씨 간판의 오래된 문구점이에요.',
    audioDuration: 47,
  },
  {
    id: 4,
    name: '옛 지물포 골목',
    category: 'golmok',
    lat: 35.8701,
    lng: 128.5938,
    description:
      '종이 냄새가 아직 남아있는 좁은 골목. 지금은 사라진 지물포의 흔적이 남아 있어요.',
    audioDuration: 63,
  },
  {
    id: 5,
    name: '야간 분식집',
    category: 'dongne',
    lat: 35.8695,
    lng: 128.595,
    description:
      '자정까지 불이 꺼지지 않는, 자취생들의 두 번째 부엌 같은 분식집이에요.',
    audioDuration: 55,
  },
  {
    id: 6,
    name: '유성 사진관',
    category: 'culture',
    lat: 35.8709,
    lng: 128.593,
    description: '40년 된 사진관 쇼윈도에는 아직도 오래된 졸업사진들이 걸려 있어요.',
    audioDuration: 50,
  },
];
