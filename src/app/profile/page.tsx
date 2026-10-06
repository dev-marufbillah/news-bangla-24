'use client';

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { useSession, authClient } from '@/lib/auth-client';
import Link from 'next/link';

interface UserData {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

function ProfileForm({ user }: { user: UserData }) {
  const [name, setName] = useState(user.name || '');
  const [image, setImage] = useState(user.image || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await authClient.updateUser({
        name,
        image,
      });

      setMessage({ type: 'success', text: 'প্রোফাইল সফলভাবে আপডেট হয়েছে!' });
    } catch {
      setMessage({ type: 'error', text: 'প্রোফাইল আপডেট করা যায়নি।' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm">
      {/* প্রোফাইল হেডার */}
      <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-gray-100">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-20 h-20 rounded-full object-cover border-2 border-[#b90000] shadow-sm"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-[#b90000] text-white flex items-center justify-center font-bold text-2xl shadow-md">
            {name?.[0]?.toUpperCase() || 'U'}
          </div>
        )}

        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-serif font-bold text-gray-900">{user.name}</h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* মেসেজ প্রদর্শন */}
      {message && (
        <div className={`mt-4 p-3 rounded-md text-sm text-center font-medium ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-600 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      {/* প্রোফাইল এডিট ফর্ম */}
      <form onSubmit={handleUpdateProfile} className="mt-6 flex flex-col gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            আপনার নাম
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3.5 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#b90000] text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            প্রোফাইল ছবির লিংক (Image URL)
          </label>
          <input
            type="url"
            placeholder="https://example.com/my-photo.jpg"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-3.5 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#b90000] text-sm"
          />
          <p className="text-xs text-gray-400 mt-1">
            যেকোনো অনলাইন ছবির লিংক বসিয়ে ছবি পরিবর্তন করতে পারেন।
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            ইমেইল (পরিবর্তনযোগ্য নয়)
          </label>
          <input
            type="email"
            disabled
            value={user.email}
            className="w-full px-3.5 py-2 border border-gray-200 bg-gray-50 text-gray-500 rounded-md text-sm cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#b90000] hover:bg-[#9b0000] text-white font-medium py-2.5 rounded-md transition duration-200 text-sm mt-2 disabled:opacity-50"
        >
          {loading ? 'সংরক্ষণ হচ্ছে...' : 'পরিবর্তন সংরক্ষণ করুন'}
        </button>
      </form>
    </div>
  );
}

export default function ProfilePage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 font-medium">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!session || !session.user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <h2 className="text-xl font-bold font-serif text-gray-800">
          প্রোফাইল দেখতে প্রথমে সাইন ইন করুন
        </h2>
        <Link 
          href="/signin" 
          className="bg-[#b90000] text-white px-5 py-2 rounded-md font-medium text-sm hover:bg-[#9b0000] transition"
        >
          সাইন ইন পেজে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <ProfileForm key={session.user.id} user={session.user} />
    </div>
  );
}