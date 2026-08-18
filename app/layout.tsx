import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Off The Record',
  description: '골목과 오래된 가게에 숨은 이야기를 걸으며 듣는 하이퍼로컬 오디오 가이드, OTR',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
