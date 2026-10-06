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
  type?: string;
}

interface Section {
  title: string;
  articles: Article[];
}

interface CategorySectionProps {
  section: Section;
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

export default function CategorySection({ section }: CategorySectionProps) {
  return (
    <div className="w-full">
      <div className="border-b-2 border-[#b90000] dark:border-red-600 pb-1 mb-5">
        <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-gray-100">
          {section.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {section.articles.map((article) => (
          <div
            key={article.id}
            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between p-3"
          >
            <div>
              <div className="relative w-full h-36 rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-800 mb-2.5">
                <Image
                  src={article.imageUrl}
                  alt={article.imageAlt || article.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </div>

              <span className="text-[11px] font-bold text-[#b90000] dark:text-red-500 block">
                {article.category || section.title}
              </span>

              <Link href={article.link || '#'} target="_blank">
                <h3 className="text-[14px] font-bold font-serif text-gray-900 dark:text-gray-100 hover:text-[#b90000] dark:hover:text-red-400 leading-snug mt-1 transition-colors">
                  {article.title}
                </h3>
              </Link>

              {article.description && (
                <p className="text-[12px] text-gray-600 dark:text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {article.description}
                </p>
              )}
            </div>

            <div className="text-[11px] text-gray-400 dark:text-gray-500 mt-3 pt-2 border-t border-gray-50 dark:border-slate-700">
              {formatBnDate(article.firstPublished)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}