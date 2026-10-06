'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  // React 19 নিয়ম মেনে ক্লায়েন্ট মাউন্ট চেক (কোনো এরর আসবে না)
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return <div className="w-8 h-8" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle Theme"
      title={theme === 'dark' ? 'লাইট মোড' : 'ডার্ক মোড'}
      className="p-1.5 rounded-full text-gray-700 dark:text-amber-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
    >
      {theme === 'dark' ? (
        /* সূর্য — ডার্ক মোডে */
        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a6 6 0 11-12 0 0112 0z" />
        </svg>
      ) : (
        /* চাঁদ — লাইট মোডে */
        <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}