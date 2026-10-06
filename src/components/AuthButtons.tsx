'use client';

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useSession, signOut } from '@/lib/auth-client';
import ThemeToggle from './ThemeToggle';

export default function AuthButtons() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <span className="text-xs text-gray-400">লোড হচ্ছে...</span>;
  }

  if (session) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        {/* প্রোফাইল: ছবি + নাম */}
        <Link
          href="/profile"
          className="flex items-center gap-2 group hover:opacity-90 transition"
        >
          {session.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || 'User'}
              className="w-8 h-8 rounded-full object-cover border border-gray-300 dark:border-slate-500"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#b90000] text-white flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
              {session.user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
          )}

          {/* ইউজারের নাম: ডার্ক মোডে ধবধবে সাদা */}
          <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[#b90000] dark:group-hover:text-red-400 transition max-w-30 sm:max-w-40 truncate">
            {session.user?.name}
          </span>
        </Link>

        {/* থিম আইকন (চাঁদ/সূর্য) */}
        <ThemeToggle />

        {/* সাইন আউট বাটন */}
        <button
          onClick={() => signOut()}
          className="bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-800 dark:text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors border border-gray-200 dark:border-slate-700"
        >
          সাইন আউট
        </button>
      </div>
    );
  }

  // লগআউট অবস্থায়
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <ThemeToggle />
      <Link
        href="/signin"
        className="text-[14px] md:text-[15px] font-semibold text-gray-800 dark:text-white hover:text-[#b90000] dark:hover:text-red-400 transition-colors"
      >
        সাইন ইন
      </Link>
      <Link
        href="/signup"
        className="bg-[#b90000] hover:bg-[#9b0000] text-white text-[14px] md:text-[15px] font-semibold px-3 py-1.5 md:px-4 md:py-1.5 rounded-sm transition-colors shadow-sm"
      >
        সাইন আপ
      </Link>
    </div>
  );
}