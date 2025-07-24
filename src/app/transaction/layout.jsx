'use client';

import { useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import Sidebar from '@/components/Sidebar';
import { AuthProvider, useAuth } from '@/components/AuthContext';
import { useEffect, useState } from 'react';

function AuthGate({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // wait for hydration
    if (user === null) {
      setLoading(false);
    } else if (!user) {
      router.replace('/signup');
    } else {
      setLoading(false);
    }
  }, [user, router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Sidebar />
      <main className="ml-64 p-6 min-h-screen">{children}</main>
    </>
  );
}

export default function TransactionLayout({ children }) {
  return (
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <AuthGate>{children}</AuthGate>
    </AuthProvider>
  );
}
