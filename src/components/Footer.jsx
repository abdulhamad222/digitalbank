'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-blue-700 mb-2">Digital Bank</h2>
          <p className="text-gray-500">Secure. Simple. Smart Banking.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-blue-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-500 hover:text-blue-600 transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/facilities" className="text-gray-500 hover:text-blue-600 transition">
                Facilities
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-500 hover:text-blue-600 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Contact Us</h3>
          <p className="text-gray-500">Email: support@digitalbank.com</p>
          <p className="text-gray-500">Phone: +1 800 123 4567</p>
          <p className="text-gray-500">Lahore, Pakistan</p>
        </div>
      </div>

      <div className="text-center text-gray-400 text-sm border-t py-4">
        © {new Date().getFullYear()} Digital Bank. All rights reserved.
      </div>
    </footer>
  );
}
