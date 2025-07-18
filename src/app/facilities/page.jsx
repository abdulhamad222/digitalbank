'use client';

import { CreditCard, Banknote, ShieldCheck, Clock } from 'lucide-react';
import Link from 'next/link';

export default function FacilitiesPage() {
  return (
    <main className="min-h-screen px-4 md:px-12 py-20">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#3cb0c9] mb-4">
            Our Facilities
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            At Digital Bank, we provide secure and user-friendly features to help you manage your money smarter.
          </p>
        </section>

        {/* Features */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Payments */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow hover:shadow-md transition">
            <div className="flex items-center gap-4 mb-4">
              <CreditCard className="w-8 h-8 text-[#3cb0c9]" />
              <h2 className="text-2xl font-semibold text-gray-800">Easy Payments</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Instantly transfer money to anyone, anywhere. Schedule payments, split bills, and more – all in one place.
            </p>
            <Link
              href="/facilities/payments"
              className="inline-block mt-2 text-[#3cb0c9] hover:underline font-medium"
            >
              Learn More →
            </Link>
          </div>

          {/* Loans */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow hover:shadow-md transition">
            <div className="flex items-center gap-4 mb-4">
              <Banknote className="w-8 h-8 text-[#3cb0c9]" />
              <h2 className="text-2xl font-semibold text-gray-800">Smart Loans</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Apply for personal or business loans with low interest rates and flexible repayment options. Get approved in minutes.
            </p>
            <Link
              href="/facilities/loans"
              className="inline-block mt-2 text-[#3cb0c9] hover:underline font-medium"
            >
              Learn More →
            </Link>
          </div>
        </section>

        {/* More Highlights */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-5 rounded-lg bg-white border hover:shadow-md transition">
            <ShieldCheck className="text-[#3cb0c9] mb-3" size={30} />
            <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
            <p className="text-gray-600">
              We use military-grade encryption and real-time fraud detection to keep your money safe.
            </p>
          </div>
          <div className="p-5 rounded-lg bg-white border hover:shadow-md transition">
            <Clock className="text-[#3cb0c9] mb-3" size={30} />
            <h3 className="text-xl font-semibold mb-2">24/7 Accessibility</h3>
            <p className="text-gray-600">
              Access all features, anytime – whether you're at home or traveling abroad.
            </p>
          </div>
          <div className="p-5 rounded-lg bg-white border hover:shadow-md transition">
            <Banknote className="text-[#3cb0c9] mb-3" size={30} />
            <h3 className="text-xl font-semibold mb-2">Instant Settlements</h3>
            <p className="text-gray-600">
              Receive your payments instantly and track everything with detailed transaction logs.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
