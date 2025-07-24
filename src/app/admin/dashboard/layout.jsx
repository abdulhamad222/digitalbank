'use client';

import AdminSidebar from "@/components/adminSidebar";


export default function DashboardLayout({ children }) {
  return (
    <div>
      <AdminSidebar />
      <main className="ml-64 p-6 min-h-screen">
        {children}
      </main>
    </div>
  );
}
