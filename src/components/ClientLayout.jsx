'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const isTransactionRoute = pathname.startsWith('/transaction');
  const isAdminRoute = pathname.startsWith('/admin');

  const hideLayout = isTransactionRoute || isAdminRoute;

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
