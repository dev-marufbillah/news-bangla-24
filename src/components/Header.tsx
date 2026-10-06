import Link from 'next/link';
import NavLink from './NavLink';
import AuthButtons from './AuthButtons';
import SearchBar from './SearchBar';

export default function Header() {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const formattedDate = today.toLocaleDateString('bn-BD', options);

  return (
    <header className="w-full bg-white dark:bg-slate-900 border-t-[3px] border-[#e8dfd5] dark:border-slate-800 pt-3 pb-4 px-4 sm:px-8 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* ওপরের অংশ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center w-full">
          
          {/* বাম পাশ: শুধুমাত্র সার্চ বার */}
          <div className="flex items-center justify-center md:justify-start order-2 md:order-1">
            <SearchBar />
          </div>

          {/* মাঝখান: লোগো ও তারিখ */}
          <div className="flex flex-col items-center justify-center text-center order-1 md:order-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-[#090d16] rounded-xl flex items-center justify-center shadow-md">
                <div className="relative flex items-center justify-center">
                  <span className="text-red-600 font-extrabold text-2xl leading-none">B</span>
                  <span className="w-2 h-2 bg-red-500 rounded-full absolute -top-0.5 -right-2"></span>
                </div>
              </div>

              <Link href="/">
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#b90000] dark:text-red-500 tracking-tight">
                  Bangla News 24
                </h1>
              </Link>
            </div>

            <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1 font-normal">
              {formattedDate}
            </p>
          </div>

          {/* ডান পাশ: প্রোফাইল নাম, থিম আইকন ও সাইন আউট বাটন */}
          <div className="flex items-center justify-center md:justify-end gap-3 md:gap-4 order-3">
            <AuthButtons />
          </div>
        </div>

        {/* ক্যাটাগরি মেনু */}
        <NavLink />
      </div>
    </header>
  );
}