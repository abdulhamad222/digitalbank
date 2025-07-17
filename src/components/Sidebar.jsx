'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart2,
  Settings,
  Menu,
  X,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthContext';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { signOut } = useAuth();

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/transaction/dashboard' },
    { label: 'Transaction', icon: Users, href: '#' },
    { label: 'Bills', icon: FileText, href: '#' },
    { label: 'Expenses', icon: BarChart2, href: '#' },
    { label: 'Goals', icon: Settings, href: '#' },
    { label: 'Settings', icon: Settings, href: '#' },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white transition-all duration-300 
      overflow-hidden" style={{ width: isOpen ? '16rem' : '4rem' }}>
      
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <span className={`text-xl font-bold ${!isOpen && 'hidden'}`}>
          Digital Bank
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-400 hover:text-white"
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
            className="flex items-center space-x-4 px-4 py-2 hover:bg-gray-800 transition"
          >
            <Icon className="w-5 h-5" />
            {isOpen && <span>{label}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={signOut}
          className="w-full flex items-center justify-center space-x-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md"
        >
          <LogOut className="w-5 h-5" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
