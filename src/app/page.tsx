import MainNews from '@/components/MainNews';
import MostRead from '@/components/MostRead';
import CategorySection from '@/components/CategorySection';

interface Article {
  id: string;
  title: string;
  description: string | null;
  link: string;
  imageUrl: string;
  imageAlt?: string;
  category: string;
  type?: string;
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

export default async function HomePage() {
  let sections: Section[] = [];
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

    sections = sectionsData.data || [];
    mostReadArticles = mostReadData.data || [];
  } catch (error) {
    console.error('Home data fetch error:', error);
  }

  const mainSection = sections.find((s) => s.title === 'প্রধান খবর') || sections[0];
  const leadArticle = mainSection?.articles?.[0] || null;
  const subLeadArticles = mainSection?.articles?.slice(1, 5) || [];

  const categorySections = sections.filter((s) => {
    if (s.title === 'প্রধান খবর') return false;
    if (
      s.title.includes('সামাজিক মাধ্যম') ||
      s.title.includes('হোয়াটসঅ্যাপ') ||
      s.title.includes('ইন্সটাগ্রাম')
    )
      return false;

    return s.articles?.some((a) => a.type === 'article' || a.type === 'video');
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* বাম অংশ */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          <MainNews leadArticle={leadArticle} subLeadArticles={subLeadArticles} />

          {categorySections.map((sec, index) => (
            <CategorySection key={index} section={sec} />
          ))}
        </div>

        {/* ডান অংশ */}
        <div className="lg:col-span-4 sticky top-4">
          <MostRead articles={mostReadArticles} />
        </div>
      </div>
    </div>
  );
}