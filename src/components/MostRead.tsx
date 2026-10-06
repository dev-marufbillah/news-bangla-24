import Link from 'next/link';

interface MostReadItem {
  id: string;
  title: string;
  link: string;
  rank?: number;
}

interface MostReadProps {
  articles: MostReadItem[];
}

export default function MostRead({ articles }: MostReadProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-5 shadow-sm transition-colors">
      <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-3">
        সর্বাধিক পঠিত
      </h2>

      <div className="flex flex-col">
        {articles.map((item, index) => (
          <div
            key={item.id || index}
            className="py-2.5 flex items-start gap-3.5 border-b border-gray-100 dark:border-slate-700 last:border-b-0"
          >
            <span className="text-lg font-serif font-bold text-[#b90000] dark:text-red-500 w-4 text-left shrink-0 mt-0.5">
              {(item.rank || index + 1).toLocaleString('bn-BD')}
            </span>

            <Link href={item.link || '#'} target="_blank" className="flex-1">
              <h4 className="text-[14px] font-bold text-gray-800 dark:text-gray-200 hover:text-[#b90000] dark:hover:text-red-400 leading-snug transition-colors">
                {item.title}
              </h4>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}