'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import toast from 'react-hot-toast';

export default function HomePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const balanceData = [
    { name: 'Jan', balance: 1000 },
    { name: 'Feb', balance: 1200 },
    { name: 'Mar', balance: 1500 },
    { name: 'Apr', balance: 1800 },
    { name: 'May', balance: 2500 },
  ];

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);
  }, []);

  const handleTransactionClick = () => {
    if (isAuthenticated) {
      router.push('/transaction');
    } else {
      toast.error('Please sign in first');
    }
  };

  return (
    <main className="w-full">
      
      {/* Intro Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 text-center space-y-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">Welcome to Your Digital Bank</h1>
          <p className="text-lg text-gray-600 mb-6">
            Securely manage your finances, send and receive money, and view your transaction history with ease.
          </p>
          <button
            onClick={handleTransactionClick}
            className="px-5 py-3 rounded-lg font-semibold transition duration-300 shadow-sm bg-blue-600 text-white border border-transparent hover:bg-transparent hover:text-blue-600 hover:border-blue-600"
          >
            Go to Transactions
          </button>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full py-16 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-10">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700">Why Choose Us?</h2>
          <div className="grid gap-8 md:grid-cols-3 text-left">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Secure Platform</h3>
              <p className="text-gray-600">Your data and transactions are encrypted and protected with bank-grade security.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Fast Transactions</h3>
              <p className="text-gray-600">Send and receive money in real-time without delays or hidden charges.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">24/7 Support</h3>
              <p className="text-gray-600">We’re always available to help you with any issues or questions you have.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Graph Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Account Balance Overview</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={balanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="balance" stroke="#2563eb" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </main>
  );
}
