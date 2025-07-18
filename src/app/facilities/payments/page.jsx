'use client';

import { Send, RefreshCw, ReceiptText } from 'lucide-react';

export default function PaymentsPage() {
  return (
    <main className="min-h-screen px-4 md:px-12 py-28">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Page Header */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#3cb0c9] mb-4">
            Payments Made Easy
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Send, receive, and manage your payments quickly and securely with our smart digital banking solutions.
          </p>
        </section>

        {/* Payment Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Send Money */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow hover:shadow-md transition">
            <Send className="text-[#3cb0c9] mb-4" size={36} />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Send Money</h2>
            <p className="text-gray-600">
              Instantly transfer funds to anyone using phone numbers, emails, or account numbers – no delays, no hassle.
            </p>
          </div>

          {/* Recurring Payments */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow hover:shadow-md transition">
            <RefreshCw className="text-[#3cb0c9] mb-4" size={36} />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Recurring Payments</h2>
            <p className="text-gray-600">
              Automate your monthly bills or subscriptions. Set it once and let us handle the rest – stress free.
            </p>
          </div>

          {/* Payment History */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow hover:shadow-md transition">
            <ReceiptText className="text-[#3cb0c9] mb-4" size={36} />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Payment History</h2>
            <p className="text-gray-600">
              Access detailed receipts of every transaction you make. Export, print or download at your convenience.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-20">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to get started?</h3>
          <p className="text-gray-600 mb-6">Sign in to your account and experience seamless digital payments now.</p>
          <a
            href="/login"
            className="px-5 py-3 rounded-lg font-semibold transition duration-300 shadow-sm bg-[#3cb0c9] text-white border border-transparent hover:bg-transparent hover:text-[#3cb0c9] hover:border-[#3cb0c9]"
          >
            Sign In to Pay
          </a>
        </section>
      </div>
    </main>
  );
}
