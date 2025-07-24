'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '@/components/AuthContext'; // ✅ import your auth context

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useAuth(); // ✅ get user from auth context

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinkClass = 'relative group transition duration-300 hover:text-[#3cb0c9]';

  return (
    <nav className="w-full backdrop-blur-sm shadow-lg fixed top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-[#3cb0c9] tracking-wide">Digital Bank</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <Link href="/" className={navLinkClass}>
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#3cb0c9] transition-all group-hover:w-full" />
          </Link>

          <Link href="/about" className={navLinkClass}>
            About
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#3cb0c9] transition-all group-hover:w-full" />
          </Link>

          {/* Facilities Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <div className={`${navLinkClass} cursor-pointer flex items-center gap-1`}>
              <Link href="/facilities"><span>Facilities</span></Link>
              <ChevronDown size={16} />
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#3cb0c9] transition-all group-hover:w-full" />
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute top-4 mt-2 left-0 bg-white rounded shadow-lg py-2 w-44 z-20 border border-gray-100">
                <Link
                  href="/facilities/payments"
                  className="block px-4 py-2 hover:bg-gray-100 hover:text-[#3cb0c9]"
                >
                  Payments
                </Link>
                <Link
                  href="/facilities/loans"
                  className="block px-4 py-2 hover:bg-gray-100 hover:text-[#3cb0c9]"
                >
                  Loans
                </Link>
              </div>
            )}
          </div>

          <Link href="/contact" className={navLinkClass}>
            Contact
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#3cb0c9] transition-all group-hover:w-full" />
          </Link>
        </div>

        {/* Profile / SignUp Button */}
        <div className="hidden md:block">
          {user ? (
            <Link
              href="/transaction/dashboard"
              className="flex items-center justify-center bg-[#3cb0c9] text-white font-semibold rounded-full w-10 h-10 hover:bg-[#3190a5] transition"
              title="Go to Dashboard"
            >
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Link>
          ) : (
            <Link
              href="/signup"
              className="px-5 py-2 rounded-lg font-semibold transition duration-300 shadow-sm bg-[#3cb0c9] text-white border border-transparent hover:bg-transparent hover:text-[#3cb0c9] hover:border-[#3cb0c9]"
            >
              SignUp
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 pt-2 shadow-md space-y-3 text-gray-700 font-medium">
          <Link href="/" className="block hover:text-[#3cb0c9] transition">Home</Link>
          <Link href="/about" className="block hover:text-[#3cb0c9] transition">About</Link>

          <div>
            <span className="block font-semibold text-[#3cb0c9] mt-2">Facilities</span>
            <Link href="/facilities/payments" className="block pl-4 hover:text-[#3cb0c9] transition">Payments</Link>
            <Link href="/facilities/loans" className="block pl-4 hover:text-[#3cb0c9] transition">Loans</Link>
          </div>

          <Link href="/contact" className="block hover:text-[#3cb0c9] transition">Contact</Link>

          {user ? (
            <Link href="/transaction/dashboard" className="block text-[#3cb0c9] font-semibold hover:text-[#3190a5] transition">
              My Dashboard
            </Link>
          ) : (
            <Link href="/signup" className="block text-[#3cb0c9] font-semibold hover:text-[#3190a5] transition">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
