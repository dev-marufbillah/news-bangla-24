import Link from 'next/link';

interface NewsItem {
  id: string;
  title: string;
  link: string;
}

export default async function Marquee() {
  let newsList: NewsItem[] = [];

  try {
    const res = await fetch('https://news-api-v2.vercel.app/api/news', {
      next: { revalidate: 300 }
    });
    const responseData = await res.json();
    newsList = responseData.data || [];
  } catch (error) {
    console.error("Marquee fetch error:", error);
  }

  const headlines = newsList.filter((item) => item.title);

  if (headlines.length === 0) return null;

  // অনবরত (Endless Loop) দেখানোর জন্য অ্যারেকে ডাবল করা হলো
  const doubleHeadlines = [...headlines, ...headlines];

  return (
    <div className="w-full bg-[#b90000] text-white flex items-center h-10 overflow-hidden relative shadow-sm">
      <div className="max-w-7xl mx-auto w-full flex items-center h-full px-4 sm:px-8">
        
        {/* 'সর্বশেষ' ফিক্সড বক্স */}
        <div className="bg-[#7d0000] text-white font-bold text-sm px-4 h-full flex items-center justify-center shrink-0 z-20 shadow-md">
          সর্বশেষ
        </div>

        {/* স্ক্রলিং এরিয়া - ঢোকার সাথে সাথেই খবর দেখাবে */}
        <div className="overflow-hidden w-full h-full flex items-center relative pl-3">
          <div className="animate-marquee flex items-center gap-6 cursor-pointer">
            {doubleHeadlines.map((item, index) => (
              <div key={index} className="inline-flex items-center gap-6 shrink-0">
                <span className="text-white/80 font-bold">•</span>
                <Link 
                  href={item.link || '#'} 
                  target="_blank"
                  className="text-[14px] sm:text-[15px] font-medium hover:underline text-white"
                >
                  {item.title}
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}