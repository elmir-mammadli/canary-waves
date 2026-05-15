'use client';

import type { ReactNode } from 'react';

interface FadeUpProps {
  children: ReactNode;
  className?: string;
}

export default function FadeUp({ children, className }: FadeUpProps) {
  return (
    <div className={['fade-up', className].filter(Boolean).join(' ')} data-fade-up>
      {children}
    </div>
  );
}
