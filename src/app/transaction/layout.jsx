'use client';


import { useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import Sidebar from '@/components/Sidebar';
import { AuthProvider, useAuth } from '@/components/AuthContext';

export default function TransactionLayout({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center flex-col gap-4 bg-gray-100">
        <p className="text-xl font-semibold text-red-600">
          Please sign in first to access the dashboard.
        </p>
        <button
          onClick={() => router.push('/signup')}
          className="px-5 py-3 rounded-lg font-semibold transition duration-300 shadow-sm bg-[#3cb0c9] text-white border border-transparent hover:bg-transparent hover:text-[#3cb0c9] hover:border-[#3cb0c9]"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen flex bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </AuthProvider>
  );
}
