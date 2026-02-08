import type { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  className?: string;
}

export function FadeIn({ children, className = '' }: FadeInProps) {
  return (
    <div
      className={`animate-in fade-in slide-in-from-bottom-5 fill-mode-forward duration-700 ease-out ${className} `}
    >
      {children}
    </div>
  );
}
