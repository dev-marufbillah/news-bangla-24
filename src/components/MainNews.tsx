import Image from 'next/image';
import Link from 'next/link';

interface Article {
  id: string;
  title: string;
  description: string | null;
  link: string;
  imageUrl: string;
  imageAlt?: string;
  category: string;
  firstPublished: string | null;
}

interface MainNewsProps {
  leadArticle: Article | null | undefined;
  subLeadArticles: Article[];
}

function formatBnDate(dateString: string | null) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const dateBn = date.toLocaleDateString('bn-BD', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const timeBn = date.toLocaleTimeString('bn-BD', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return `${dateBn} এ ${timeBn}`;
}

export default function MainNews({ leadArticle, subLeadArticles }: MainNewsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
      {leadArticle && (
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between p-4 hover:shadow-md transition-all">
          <div>
            <div className="relative w-full h-52 sm:h-56 rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-800">
              <Image
                src={leadArticle.imageUrl}
                alt={leadArticle.imageAlt || leadArticle.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                unoptimized
              />
            </div>

            <span className="text-[13px] font-bold text-[#b90000] dark:text-red-500 block mt-3">
              {leadArticle.category || 'প্রধান খবর'}
            </span>

            <Link href={leadArticle.link || '#'} target="_blank">
              <h2 className="text-lg sm:text-xl font-bold font-serif text-gray-900 dark:text-gray-100 hover:text-[#b90000] dark:hover:text-red-400 mt-1 leading-snug transition-colors">
                {leadArticle.title}
              </h2>
            </Link>

            {leadArticle.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3 leading-relaxed font-normal">
                {leadArticle.description}
              </p>
            )}
          </div>

          <div className="text-[12px] text-gray-400 dark:text-gray-500 mt-4 pt-2 border-t border-gray-100 dark:border-slate-700">
            {formatBnDate(leadArticle.firstPublished)}
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
        <div className="divide-y divide-gray-100 dark:divide-slate-700">
          {subLeadArticles.map((item, index) => (
            <div key={item.id || index} className="py-3 first:pt-0 last:pb-0">
              <span className="text-[12px] font-bold text-[#b90000] dark:text-red-500 block">
                {item.category || 'প্রধান খবর'}
              </span>
              <Link href={item.link || '#'} target="_blank">
                <h3 className="text-[15px] font-bold font-serif text-gray-900 dark:text-gray-100 hover:text-[#b90000] dark:hover:text-red-400 mt-0.5 leading-snug transition-colors">
                  {item.title}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}