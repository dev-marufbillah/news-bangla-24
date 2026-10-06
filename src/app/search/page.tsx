import Image from 'next/image';
import Link from 'next/link';
import MostRead from '@/components/MostRead';

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

interface Section {
  title: string;
  articles: Article[];
}

interface MostReadItem {
  id: string;
  title: string;
  link: string;
  rank?: number;
}

function formatBnDate(dateString: string | null) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const dateBn = date.toLocaleDateString('bn-BD', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return dateBn;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const searchQuery = q || '';

  let allArticles: Article[] = [];
  let mostReadArticles: MostReadItem[] = [];

  try {
    const [sectionsRes, mostReadRes] = await Promise.all([
      fetch('https://news-api-v2.vercel.app/api/news/sections', {
        next: { revalidate: 300 },
      }),
      fetch('https://news-api-v2.vercel.app/api/news/most-read', {
        next: { revalidate: 300 },
      }),
    ]);

    const sectionsData = await sectionsRes.json();
    const mostReadData = await mostReadRes.json();

    const sections: Section[] = sectionsData.data || [];
    mostReadArticles = mostReadData.data || [];

    // সব সেকশনের খবরগুলো একসাথে করা হলো
    const extractedArticles: Article[] = [];
    sections.forEach((sec) => {
      if (sec.articles && Array.isArray(sec.articles)) {
        sec.articles.forEach((art) => {
          if (art.title && art.imageUrl) {
            extractedArticles.push(art);
          }
        });
      }
    });

    // ডুপ্লিকেট খবর রিমুভ করা
    const uniqueMap = new Map<string, Article>();
    extractedArticles.forEach((item) => uniqueMap.set(item.id || item.title, item));
    allArticles = Array.from(uniqueMap.values());
  } catch (error) {
    console.error('Search fetch error:', error);
  }

  // সার্চ কুয়েরি অনুযায়ী ফিল্টার
  const searchResults = searchQuery
    ? allArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (article.description &&
            article.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* সার্চ হেডার */}
      <div className="border-b-2 border-[#b90000] pb-2 mb-6 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-serif font-bold text-gray-900">
          অনুসন্ধান ফলাফল: &quot;<span className="text-[#b90000]">{searchQuery}</span>&quot;
        </h1>
        <span className="text-sm font-semibold text-gray-500">
          {searchResults.length.toLocaleString('bn-BD')} টি ফলাফল পাওয়া গেছে
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* বাম পাশ: ফলাফলের গ্রিড */}
        <div className="lg:col-span-8">
          {searchResults.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">
              <p className="text-gray-500 text-base font-medium">
                &quot;{searchQuery}&quot; দিয়ে কোনো সংবাদ পাওয়া যায়নি। অন্য কোনো শব্দ দিয়ে আবার চেষ্টা করুন।
              </p>
              <Link
                href="/"
                className="mt-4 inline-block bg-[#b90000] text-white text-xs font-semibold px-4 py-2 rounded hover:bg-[#9b0000] transition"
              >
                হোমপেজে ফিরে যান
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {searchResults.map((article) => (
                <div
                  key={article.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between p-3"
                >
                  <div>
                    <div className="relative w-full h-36 rounded-lg overflow-hidden bg-gray-100 mb-2.5">
                      <Image
                        src={article.imageUrl}
                        alt={article.imageAlt || article.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    </div>

                    <span className="text-[11px] font-bold text-[#b90000] block">
                      {article.category || 'সংবাদ'}
                    </span>

                    <Link href={article.link || '#'} target="_blank">
                      <h3 className="text-[14px] font-bold font-serif text-gray-900 hover:text-[#b90000] leading-snug mt-1 transition-colors">
                        {article.title}
                      </h3>
                    </Link>

                    {article.description && (
                      <p className="text-[12px] text-gray-600 mt-1.5 line-clamp-2 leading-relaxed">
                        {article.description}
                      </p>
                    )}
                  </div>

                  <div className="text-[11px] text-gray-400 mt-3 pt-2 border-t border-gray-50">
                    {formatBnDate(article.firstPublished)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ডান পাশ: সর্বাধিক পঠিত */}
        <div className="lg:col-span-4 sticky top-4">
          <MostRead articles={mostReadArticles} />
        </div>
      </div>

    </div>
  );
}