'use client';

import { useEffect } from 'react';

export function useFadeUp(selector = '[data-fade-up]') {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          window.setTimeout(() => {
            target.classList.add('is-visible');
          }, index * 80);
          observer.unobserve(target);
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [selector]);
}
