'use client';

import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/components/AuthContext';
import Sidebar from '@/components/Sidebar';

export default function TransactionLayout({ children }) {
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
