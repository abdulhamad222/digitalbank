'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin) {
      router.replace('/admin/dashboard/overview');
    } else {
      router.replace('/admin');
    }
  }, [router]);

  return null;
}
