# 📰 বাংলা নিউজ ২৪ (News Bangla 24) — সর্বশেষ বাংলা খবরের পোর্টাল

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**বাংলা নিউজ ২৪ (News Bangla 24)** হলো একটি আধুনিক ও রেসপন্সিভ বাংলা নিউজ ওয়েবসাইট, যেখানে রাজনীতি, বিশ্ব, অর্থনীতি, স্বাস্থ্য, খেলা, প্রযুক্তি ও ভিডিও — সব বিভাগের সর্বশেষ খবর এক জায়গায় সাজানো অবস্থায় পাওয়া যায়। খবরের সংবাদসূত্র **BBC Bangla**।

## 🔗 গুরুত্বপূর্ণ লিংক (Important Links)

- 🌐 **লাইভ ওয়েবসাইট (Live Demo):** [https://news-bangla-24-six.vercel.app](https://news-bangla-24-six.vercel.app)
- 📁 **গিটহাব রিপোজিটোরি (GitHub Repo):** [`https://github.com/<your-username>/<your-repo>`](https://github.com/dev-marufbillah/news-bangla-24.git) 

## ✨ প্রধান ফিচারসমূহ (Key Features)

### 🗞️ সর্বশেষ নিউজ টিকার (Latest News Ticker)
- পেজের উপরে "সর্বশেষ" শিরোনামে একটানা স্ক্রলিং স্ট্রিপে সদ্য প্রকাশিত খবরের শিরোনাম দেখা যায়।
- প্রতিটি শিরোনামে ক্লিক করলে মূল প্রতিবেদনে পৌঁছে যাওয়া যায়।

### 🔥 প্রধান খবর ও নির্বাচিত খবর (Top Stories & Featured News)
- হোম পেজের শুরুতেই বড় ছবিসহ **প্রধান খবর** এবং তার পাশে আরও কয়েকটি গুরুত্বপূর্ণ শিরোনাম।
- **নির্বাচিত খবর** সেকশনে ছবি, শিরোনাম, সংক্ষিপ্ত বিবরণ ও প্রকাশের তারিখ-সময়সহ কার্ড।

### 🗂️ ক্যাটাগরিভিত্তিক খবর (Category-wise News)
নেভিগেশন বার থেকে সরাসরি যেকোনো বিভাগে যাওয়া যায়:

| বিভাগ | রুট |
|------|------|
| 🏠 হোম | `/` |
| 🏛️ রাজনীতি | `/category/politics` |
| 🌍 বিশ্ব | `/category/world` |
| 💰 অর্থনীতি | `/category/economy` |
| 🩺 স্বাস্থ্য | `/category/health` |
| ⚽ খেলা | `/category/sports` |
| 💻 প্রযুক্তি | `/category/technology` |
| 🎬 দেখুন (ভিডিও) | `/category/video` |

হোম পেজেও আলাদা আলাদা সেকশনে **বাংলাদেশ, ভারত, বিশ্ব, স্বাস্থ্য, ভিডিও ও অন্যান্য খবর** দেখানো হয়।

### 📈 সর্বাধিক পঠিত (Most Read)
- বাংলা সংখ্যায় (১, ২, ৩ …) সাজানো সবচেয়ে বেশি পঠিত ১০টি খবরের তালিকা।

### 🗓️ বাংলা তারিখ ও সময় (Bangla Date & Time)
- হেডারে বাংলা ভাষায় আজকের বার, তারিখ ও সাল প্রদর্শন।
- প্রতিটি খবরে বাংলা সংখ্যায় প্রকাশের সময়।

### 🔗 সোশ্যাল মিডিয়া লিংক (Social Links)
- WhatsApp, Facebook, YouTube, X (Twitter), Instagram ও TikTok-এ দ্রুত যাওয়ার লিংক।

### 🎨 রেসপন্সিভ ডিজাইন ও ইউজার এক্সপেরিয়েন্স
- মোবাইল, ট্যাবলেট ও ডেস্কটপ — সব ডিভাইসে সুন্দরভাবে কাজ করে।
- ডেটা লোড হওয়ার সময় "লোড হচ্ছে..." ইন্ডিকেটর।
- দ্রুত লোডিং ও SEO-বান্ধব মেটা ট্যাগ (`সর্বশেষ বাংলা খবর`)।

## 🛠️ ব্যবহৃত প্রযুক্তি (Technologies Used)

| ক্যাটাগরি | টেকনোলজি / লাইব্রেরি |
|-----------|----------------------|
| Framework | Next.js (App Router) |
| Language | TypeScript / JavaScript |
| Styling | CSS / Tailwind CSS  |
| News Source | BBC Bangla |
| Deployment | Vercel |

## 📂 প্রজেক্ট স্ট্রাকচার (Project Structure)

```bash
news-bangla-24/
├── app/
│   ├── page.tsx              # হোম পেজ
│   ├── category/
│   │   └── [slug]/page.tsx   # ক্যাটাগরি পেজ (politics, world, economy ...)
│   └── layout.tsx            # গ্লোবাল লেআউট (নেভবার, টিকার, ফুটার)
├── components/               # রিইউজেবল UI কম্পোনেন্ট
├── public/                   # স্ট্যাটিক ফাইল ও ইমেজ
└── package.json
```

> ℹ️ উপরের স্ট্রাকচার একটি সাধারণ উদাহরণ; আপনার আসল ফোল্ডার অনুযায়ী মিলিয়ে নিন।

## 💻 লোকাল ডেভেলপমেন্ট সেটআপ (Local Installation & Setup)

এই প্রজেক্টটি আপনার কম্পিউটারে চালাতে নিচের ধাপগুলো অনুসরণ করুন:

**১. রিপোজিটোরি ক্লোন করুন:**
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

**২. ডিপেন্ডেন্সি ইনস্টল করুন:**
```bash
npm install
```

**৩. ডেভেলপমেন্ট সার্ভার চালু করুন:**
```bash
npm run dev
```

**৪. ব্রাউজারে খুলুন:**
[http://localhost:3000](http://localhost:3000)

**প্রোডাকশন বিল্ডের জন্য:**
```bash
npm run build
npm start
```

## 🚀 ডিপ্লয়মেন্ট (Deployment)

প্রজেক্টটি [Vercel](https://vercel.com)-এ ডিপ্লয় করা আছে। নিজে ডিপ্লয় করতে:

1. GitHub-এ কোড পুশ করুন।
2. [Vercel](https://vercel.com)-এ নতুন প্রজেক্ট ইমপোর্ট করুন।
3. প্রয়োজনীয় Environment Variable (থাকলে) যোগ করে **Deploy** দিন।

## ⚖️ কপিরাইট ও দাবিত্যাগ (Disclaimer)

- এই ওয়েবসাইটের সংবাদ ও ছবির সকল স্বত্ব মূল প্রকাশক **BBC Bangla**-এর।
- প্রজেক্টটি শুধুমাত্র শেখা ও পোর্টফোলিও উদ্দেশ্যে তৈরি; এর সঙ্গে BBC-র কোনো আনুষ্ঠানিক সম্পর্ক নেই।
- প্রতিটি খবরের লিংক মূল সংবাদসূত্রে নিয়ে যায়।

## 🤝 অবদান (Contributing)

যেকোনো পরামর্শ বা বাগ রিপোর্টের জন্য একটি **Issue** খুলুন, অথবা **Pull Request** পাঠান। ⭐ ভালো লাগলে রিপোজিটোরিতে একটি স্টার দিতে ভুলবেন না!

## 👨‍💻 ডেভেলপার (Author)

**<আপনার নাম>**
- GitHub: [@your-username](https://github.com/your-username)
- Email: your-email@example.com

© 2026 News Bangla 24
