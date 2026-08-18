# my-first-app

CAMPUS AX-TON 1회차 실습용 스타터 템플릿입니다.

## 시작하기

1. 이 폴더를 원하는 위치(예: 바탕화면)에 압축 해제하세요.
2. 터미널을 열고 이 폴더로 이동하세요.
   ```
   cd my-first-app
   ```
3. 필요한 패키지를 설치하세요. (최초 1회, 인터넷 연결 필요)
   ```
   npm install
   ```
4. Claude Code를 실행하세요.
   ```
   claude
   ```
5. 자연어로 원하는 화면을 요청해보세요.

## 개발 서버 직접 실행하기

Claude Code 없이 결과물만 미리 보고 싶다면:
```
npm run dev
```
그 다음 브라우저에서 `http://localhost:3000` 으로 접속하세요.

## 폴더 구조

```
my-first-app/
├── app/
│   ├── layout.tsx    ← 전체 페이지 틀 (수정할 일 거의 없음)
│   ├── page.tsx       ← 첫 화면(홈) 파일 (실습 중 이 파일이 바뀝니다)
│   └── globals.css    ← 전역 스타일
├── package.json       ← 프로젝트 설정 및 라이브러리 목록
└── README.md          ← 이 파일
```
