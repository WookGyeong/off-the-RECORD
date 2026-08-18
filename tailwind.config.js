/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        card: 'var(--card)',
        'card-raised': 'var(--card-raised)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        'ink-faint': 'var(--ink-faint)',
        moss: 'var(--moss)',
        'moss-soft': 'var(--moss-soft)',
        rust: 'var(--rust)',
        'rust-soft': 'var(--rust-soft)',
        plum: 'var(--plum)',
        'plum-soft': 'var(--plum-soft)',
        gold: 'var(--gold)',
        'gold-soft': 'var(--gold-soft)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
      },
      fontFamily: {
        sans: [
          'Pretendard Variable',
          'Pretendard',
          'Apple SD Gothic Neo',
          'Malgun Gothic',
          '-apple-system',
          'Segoe UI',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'SF Mono', 'Consolas', 'Menlo', 'monospace'],
      },
      borderRadius: {
        sheet: '22px 22px 0 0',
      },
    },
  },
  plugins: [],
};
