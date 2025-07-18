'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';

export default function TransactionPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [capital, setCapital] = useState(102340);
  const [transactions, setTransactions] = useState([
    { id: 1, title: 'Received from Alice', type: 'Received', amount: 3500, date: 'Jul 15, 2025' },
    { id: 2, title: 'Sent to Bob', type: 'Sent', amount: -2200, date: 'Jul 14, 2025' },
    { id: 3, title: 'Received from Client', type: 'Received', amount: 7000, date: 'Jul 12, 2025' },
  ]);

  useEffect(() => {
    if (!user) {
      router.replace('/signup');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center flex-col gap-4 bg-gray-100">
        <p className="text-xl font-semibold text-red-600">Please Sign In first to access your transactions.</p>
        <button
          onClick={() => router.push('/signup')}
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 space-y-6 bg-gray-50">

      {/* Top Section */}
      <div className="h-[40vh] bg-white rounded-3xl p-6 shadow-md flex flex-col justify-between border border-[#3cb0c9]/20">
        <div className="space-y-2">
          <p className="text-gray-500 text-sm">Total Capital</p>
          <h2 className="text-4xl font-bold text-[#3cb0c9]">${capital.toLocaleString()}</h2>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Sent</p>
            <p className="text-lg font-semibold text-red-500">$4,200</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Received</p>
            <p className="text-lg font-semibold text-green-600">$12,500</p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Transaction History */}
        <div className="bg-white p-4 rounded-2xl shadow-md border border-[#3cb0c9]/20">
          <h3 className="text-xl font-semibold text-[#3cb0c9] mb-4">Transaction History</h3>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {transactions.map((txn) => (
              <div
                key={txn.id}
                className="flex justify-between items-center p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
              >
                <div>
                  <p className="font-medium text-gray-800">{txn.title}</p>
                  <p className="text-sm text-gray-500">{txn.date}</p>
                </div>
                <p className={`font-bold ${txn.amount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  ${Math.abs(txn.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Send & Receive Buttons */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-[#3cb0c9]/20 flex flex-col justify-center items-center gap-6">
          <h3 className="text-xl font-semibold text-[#3cb0c9]">Actions</h3>
          <div className="grid grid-cols-2 gap-4 w-full">
            <button className="w-full bg-[#3cb0c9] text-white py-3 rounded-lg font-semibold hover:bg-[#3190a5] transition">
              Send Money
            </button>
            <button className="w-full border border-[#3cb0c9] text-[#3cb0c9] py-3 rounded-lg font-semibold hover:bg-[#e8f8fb] transition">
              Receive Money
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
