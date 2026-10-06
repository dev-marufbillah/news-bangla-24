export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-gray-200 py-6 mt-12 text-sm text-gray-500 font-serif">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* বাম পাশে কপিরাইট */}
        <div>
          © {currentYear} News Bangla 24
        </div>

        {/* ডান পাশে সোর্স ক্রেডিট */}
        <div>
          Source: BBC Bangla
        </div>
      </div>
    </footer>
  );
}