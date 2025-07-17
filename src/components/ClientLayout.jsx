'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isTransactionRoute = pathname.startsWith('/transaction');

  return (
    <>
      {!isTransactionRoute && <Navbar />}
      {children}
      {!isTransactionRoute && <Footer />}
    </>
  );
}
