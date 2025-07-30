'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  FileText,
  Landmark,
  BarChart2,
  Settings,
  Menu,
  X,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthContext';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { signOut } = useAuth();

  const navItems = [
    {
      label: 'OverView',
      icon: LayoutDashboard,
      href: '/admin/dashboard/overview',
    },
    {
      label: 'Transaction',
      icon: ArrowLeftRight,
      href: '/admin/dashboard/transactions',
    },
    {
      label: 'Bills & Payments',
      icon: FileText,
      href: '/admin/dashboard/bills',
    },
    {
      label: 'Loan',
      icon: Landmark,
      href: '/admin/dashboard/loan',
    },
    {
      label: 'Reports',
      icon: BarChart2,
      href: '/admin/dashboard/report',
    },
    {
      label: 'Profile Settings',
      icon: Settings,
      href: '/admin/dashboard/adminSettings',
    },
  ];

  return (
    <div
      className="fixed top-0 left-0 h-screen bg-[#3cb0c9] text-white transition-all duration-300 overflow-y-auto z-50 flex flex-col justify-between"
      style={{ width: isOpen ? '16rem' : '4rem' }}
    >
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4 border-b border-[#3190a5]">
        <span className={`text-xl font-bold ${!isOpen && 'hidden'}`}>Digital Bank</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:text-gray-100"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4 space-y-2">
        {navItems.map(({ label, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center space-x-4 px-4 py-2 hover:bg-[#3190a5] transition"
          >
            <Icon className="w-5 h-5" />
            {isOpen && <span>{label}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-[#3190a5]">
        <button
          onClick={signOut}
          className="w-full flex items-center justify-center space-x-2 bg-white hover:bg-gray-100 text-[#3cb0c9] px-4 py-2 rounded-md font-semibold"
        >
          <LogOut className="w-5 h-5" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
