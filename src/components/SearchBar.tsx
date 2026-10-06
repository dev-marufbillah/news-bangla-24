'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    setIsOpen(false);
  };

  return (
    <div className="relative flex items-center">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Search"
          className="p-2 text-gray-700 dark:text-gray-300 hover:text-[#b90000] dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors flex items-center justify-center"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      ) : (
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-1 bg-gray-100 dark:bg-slate-800 p-1 rounded-full border border-gray-300 dark:border-slate-600 shadow-sm transition-all duration-200"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="খবর খুঁজুন..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-36 sm:w-48 pl-3 pr-1 py-1 text-xs sm:text-sm bg-transparent border-none focus:outline-none text-gray-800 dark:text-gray-100"
          />
          <button type="submit" className="p-1 text-gray-600 dark:text-gray-300 hover:text-[#b90000] rounded-full">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setQuery('');
            }}
            className="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-full"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </form>
      )}
    </div>
  );
}