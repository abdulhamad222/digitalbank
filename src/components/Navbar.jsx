'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinkClass = 'relative group transition duration-300 hover:text-blue-600';

  return (
    <nav className="w-full backdrop-blur-md shadow-lg fixed top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-blue-700 tracking-wide">Digital Bank</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <Link href="/" className={navLinkClass}>
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full" />
          </Link>
          <Link href="/about" className={navLinkClass}>
            About
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full" />
          </Link>
          <Link href="/facilities" className={navLinkClass}>
            Facilities
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full" />
          </Link>
          <Link href="/contact" className={navLinkClass}>
            Contact
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full" />
          </Link>
        </div>

        {/* Login Button */}
        <div className="hidden md:block">
            <Link
                href="/signup"
                className="px-5 py-2 rounded-lg font-semibold transition duration-300 shadow-sm bg-blue-600 text-white border border-transparent hover:bg-transparent hover:text-blue-600 hover:border-blue-600"
            >
                SignUp
            </Link>
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
          <Link href="/" className="block hover:text-blue-600 transition">Home</Link>
          <Link href="/about" className="block hover:text-blue-600 transition">About</Link>
          <Link href="/facilities" className="block hover:text-blue-600 transition">Facilities</Link>
          <Link href="/contact" className="block hover:text-blue-600 transition">Contact</Link>
          <Link href="/signup" className="block text-blue-600 font-semibold hover:text-blue-800 transition">Login</Link>
        </div>
      )}
    </nav>
  );
}
