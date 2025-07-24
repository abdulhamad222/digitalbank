'use client';

import { BadgeDollarSign, CalendarCheck2, ShieldCheck } from 'lucide-react';

export default function LoanPage() {
  return (
    <main className="min-h-screen px-4 md:px-12 py-28">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#3cb0c9] mb-4">Smart Loan Services</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get the financial boost you need with fast approvals, flexible plans, and complete transparency.
          </p>
        </section>

        {/* Loan Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Instant Approval */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow hover:shadow-md transition">
            <BadgeDollarSign size={36} className="text-[#3cb0c9] mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Instant Approval</h2>
            <p className="text-gray-600">
              Apply online and get your loan approved within minutes. No long queues or paperwork.
            </p>
          </div>

          {/* Flexible Repayments */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow hover:shadow-md transition">
            <CalendarCheck2 size={36} className="text-[#3cb0c9] mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Flexible Repayments</h2>
            <p className="text-gray-600">
              Choose your own repayment schedule – monthly, quarterly or yearly – with no hidden fees.
            </p>
          </div>

          {/* Secure Processing */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow hover:shadow-md transition">
            <ShieldCheck size={36} className="text-[#3cb0c9] mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Secure & Transparent</h2>
            <p className="text-gray-600">
              We use bank-grade encryption and provide complete clarity on your loan status and terms.
            </p>
          </div>
        </section>

        {/* Loan Call To Action */}
        <section className="text-center mt-20">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Need a loan today?</h3>
          <p className="text-gray-600 mb-6">Sign in to check your eligibility and apply instantly.</p>
          <a
            href="/login"
           className="px-5 py-3 rounded-lg font-semibold transition duration-300 shadow-sm bg-[#3cb0c9] text-white border border-transparent hover:bg-transparent hover:text-[#3cb0c9] hover:border-[#3cb0c9]"
          >
            Apply Now
          </a>
        </section>
      </div>
    </main>
  );
}
