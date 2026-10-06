'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/auth-client';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password.length < 6) {
      setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
      setLoading(false);
      return;
    }

    await signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onSuccess: () => {
          setLoading(false);
          router.push('/');
          router.refresh();
        },
        onError: (ctx) => {
          setLoading(false);
          console.error("Sign up error:", ctx.error);
          setError(ctx.error.message || 'সাইন আপ করা যাচ্ছে না। ডাটাবেজ চেক করুন।');
        },
      }
    );
  };

  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-md border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold font-serif text-[#b90000] text-center mb-6">
          সাইন আপ
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded mb-4 text-center border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              নাম
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#b90000]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ইমেইল
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#b90000]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#b90000]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#b90000] hover:bg-[#9b0000] text-white font-medium py-2 rounded-md transition duration-200 mt-2 disabled:opacity-50"
          >
            {loading ? 'প্রসেসিং...' : 'সাইন আপ করুন'}
          </button>
        </form>

        <p className="text-xs sm:text-sm text-center text-gray-600 mt-5">
          অ্যাকাউন্ট আছে?{' '}
          <Link href="/signin" className="text-[#b90000] font-semibold hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}