import Link from 'next/link';

interface Category {
  slug: string;
  title: string;
}

export default async function NavLink() {
  let navItems: { title: string; href: string }[] = [];

  try {
    const res = await fetch('https://news-api-v2.vercel.app/api/categories', {
      next: { revalidate: 3600 },
    });
    const responseData = await res.json();
    const categories: Category[] = responseData.data || [];

    navItems = categories
      .filter((cat) => cat.slug !== '/bengali/popular/read')
      .map((cat) => {
        if (cat.slug === '/bengali') {
          return { title: 'হোম', href: '/' };
        }
        return { title: cat.title, href: `/category/${cat.slug}` };
      });
  } catch (error) {
    console.error('Error fetching categories:', error);
  }

  return (
    <nav className="flex items-center justify-center gap-5 sm:gap-7 flex-wrap mt-3">
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="text-[15px] font-medium text-gray-900 dark:text-gray-200 hover:text-[#9b0000] dark:hover:text-red-400 transition duration-150"
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}