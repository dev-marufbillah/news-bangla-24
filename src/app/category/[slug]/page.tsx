import Image from 'next/image';
import Link from 'next/link';

// API ডেটা টাইপ ডিফাইন
interface Article {
  id: string;
  title: string;
  description: string | null;
  link: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  firstPublished: string | null;
}

interface CategoryResponse {
  success: boolean;
  title: string;
  data: Article[];
}

interface MostReadItem {
  id: string;
  title: string;
  link: string;
  rank: number;
}

// তারিখ বাংলা ফরম্যাটে রূপান্তর
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

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let categoryData: CategoryResponse | null = null;
  let mostReadArticles: MostReadItem[] = [];

  try {
    // ক্যাটাগরি নিউজ এবং মোস্ট রিড নিউজ দুটো একসাথে ফেচ করা হলো
    const [catRes, mostReadRes] = await Promise.all([
      fetch(`https://news-api-v2.vercel.app/api/category/${slug}`, {
        next: { revalidate: 300 },
      }),
      fetch('https://news-api-v2.vercel.app/api/news/most-read', {
        next: { revalidate: 300 },
      }),
    ]);

    if (catRes.ok) {
      categoryData = await catRes.json();
    }
    if (mostReadRes.ok) {
      const mostReadJson = await mostReadRes.json();
      mostReadArticles = mostReadJson.data || [];
    }
  } catch (error) {
    console.error("Category fetch error:", error);
  }

  // যদি কোনো ডেটা না পাওয়া যায়
  if (!categoryData || !categoryData.data || categoryData.data.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold font-serif text-gray-800">
          এই ক্যাটাগরিতে কোনো সংবাদ পাওয়া যায়নি
        </h1>
        <Link href="/" className="text-[#b90000] font-semibold underline mt-4 inline-block">
          হোমপেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const articles = categoryData.data;
  const leadArticle = articles[0]; // ক্যাটাগরির ১ম বড় খবর
  const otherArticles = articles.slice(1); // বাকি খবরগুলো

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* ক্যাটাগরি হেডার টাইটেল */}
      <div className="border-b-2 border-[#b90000] pb-2 mb-6">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
          {categoryData.title || leadArticle?.category || 'সংবাদ'}
        </h1>
      </div>

      {/* প্রধান লেআউট গ্রিড */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ================= বাম পাশ: মূল ক্যাটাগরির সংবাদসমূহ (৮ কলাম) ================= */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* ১. ক্যাটাগরির ১ম বড় খবর কার্ড */}
          {leadArticle && (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="relative w-full h-60 sm:h-80 rounded-lg overflow-hidden bg-gray-100 mb-4">
                <Image
                  src={leadArticle.imageUrl}
                  alt={leadArticle.imageAlt || leadArticle.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </div>

              <span className="text-xs font-bold text-[#b90000] uppercase block">
                {leadArticle.category}
              </span>

              <Link href={leadArticle.link || '#'} target="_blank">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 hover:text-[#b90000] mt-1 leading-snug">
                  {leadArticle.title}
                </h2>
              </Link>

              {leadArticle.description && (
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  {leadArticle.description}
                </p>
              )}

              <div className="text-[12px] text-gray-400 mt-4 pt-2 border-t border-gray-100">
                {formatBnDate(leadArticle.firstPublished)}
              </div>
            </div>
          )}

          {/* ২. ক্যাটাগরির বাকি সংবাদগুলোর ৩-কলামের কার্ড গ্রিড */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {otherArticles.map((article) => (
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
                    {article.category}
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

        </div>

        {/* ================= ডান পাশ: "সর্বাধিক পঠিত" কলাম (৪ কলাম) ================= */}
        <div className="lg:col-span-4 sticky top-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">
              সর্বাধিক পঠিত
            </h2>

            <div className="flex flex-col">
              {mostReadArticles.map((item, index) => (
                <div
                  key={item.id || index}
                  className="py-2.5 flex items-start gap-3.5 border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-lg font-serif font-bold text-[#b90000] w-4 text-left shrink-0 mt-0.5">
                    {(item.rank || index + 1).toLocaleString('bn-BD')}
                  </span>

                  <Link href={item.link || '#'} target="_blank" className="flex-1">
                    <h4 className="text-[14px] font-bold text-gray-800 hover:text-[#b90000] leading-snug transition-colors">
                      {item.title}
                    </h4>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}