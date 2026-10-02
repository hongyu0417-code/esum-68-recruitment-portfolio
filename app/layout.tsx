import type { Metadata } from 'next';
import './globals.css';
import './landing.css';

export const metadata: Metadata = {
  title: 'ESUM 68 Executive Recruitment',
  description: 'Discover ESUM, meet the departments, and apply to join the 68th executive team of the Engineering Society of Universiti Malaya.',
  icons: {
    icon: '/favicon-esum.png',
    shortcut: '/favicon-esum.png',
    apple: '/favicon-esum.png',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
