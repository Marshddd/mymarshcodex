import './globals.css';

export const metadata = {
  title: 'Backend Mastery',
  description: 'Fullstack Next.js learning platform for Back-End development'
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}

