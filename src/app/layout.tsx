import type { Metadata } from 'next';
import { poppins } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Canary Waves – AI Voice Safety Platform',
  description:
    'High-conversion Landing Page For Canary Waves, An AI-driven Voice Intelligence Platform For Industrial Safety And Operations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
