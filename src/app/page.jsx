'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';

export default function TransactionPage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace('/transaction/dashboard');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center flex-col gap-4 bg-gray-100">
        <p className="text-xl font-semibold text-red-600">Please Sign Up first to access your dashboard.</p>
        <button
          onClick={() => router.push('/signup')}
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg"
        >
          Sign Up
        </button>
      </div>
    );
  }

  return null;
}
