import type { Metadata, Viewport } from 'next';
import { poppins } from '@/lib/fonts';
import './globals.css';

const siteUrl = 'https://canary-waves.com/';
const seoTitle = 'Canary Waves – AI Voice Safety Platform';
const seoDescription =
  'High-conversion Landing Page For Canary Waves, An AI-driven Voice Intelligence Platform For Industrial Safety And Operations. Tailored For Safety Managers, Operations Leads, And Digital Transformation Teams In Mining And Heavy Industries.';
const faviconUrl = '/images/favicon.svg';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: seoTitle,
  description: seoDescription,
  generator: 'Framer a1faaee',
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      {
        url: faviconUrl,
        media: '(prefers-color-scheme: light)',
      },
      {
        url: faviconUrl,
        media: '(prefers-color-scheme: dark)',
      },
    ],
  },
  robots: {
    'max-image-preview': 'large',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: seoTitle,
    description: seoDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: seoTitle,
    description: seoDescription,
  },
  other: {
    'framer-search-index': 'https://framerusercontent.com/sites/4ghQxFdWQEU9tiLMMw2TXW/searchIndex-Mu5QcOyTnaq5.json',
    'framer-search-index-fallback':
      'https://framerusercontent.com/sites/4ghQxFdWQEU9tiLMMw2TXW/searchIndex-1aPfb1e2ZC6V.json',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
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
