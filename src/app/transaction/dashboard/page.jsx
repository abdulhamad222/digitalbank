'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthContext';
import { CandlestickChart } from '@/components/CandleChart'; // Make sure this component is set up correctly

export default function DashboardPage() {
  const { user } = useAuth();
  const [capital, setCapital] = useState(1000); // Default value
  const [transactions, setTransactions] = useState([]);

 useEffect(() => {
  const fetchTransactions = async () => {
      try {
        const res = await fetch(`/api/transactions?userId=${user._id}`);
        const data = await res.json();
        setTransactions(data || []);
        const total = data.reduce((acc, t) =>
          t.type === 'deposit' ? acc + t.amount : acc - t.amount,
          1000
        );
        setCapital(total);
      } catch (err) {
        console.error('Failed to fetch transactions:', err);
      }
    };

    if (user?._id) {
      fetchTransactions();
    }
  }, [user]);


  const bills = [
    { name: 'Netflix Subscription', amount: 15, date: 'July 20' },
    { name: 'Electric Bill', amount: 90, date: 'July 25' },
  ];

  const recent = transactions.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* 1. Header */}
      <div className="text-2xl font-semibold text-[#3cb0c9]">Bank Dashboard</div>

      {/* 2. Capital Overview */}
      <div className="w-full h-40 bg-gradient-to-r from-[#3cb0c9] to-[#3190a5] text-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
        <div className="text-lg">Total Capital</div>
        <div className="text-3xl font-bold">${capital.toLocaleString()}</div>
        <div className="text-sm opacity-80">Last updated: {new Date().toLocaleDateString()}</div>
      </div>

      {/* 3. Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transactions Summary */}
        <div className="bg-white border border-[#3cb0c9]/20 p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-[#3cb0c9] mb-4">Transaction Overview</h3>
          <p className="text-gray-600 mb-2">Total Transactions: {transactions.length}</p>
          <p className="text-gray-600">Deposits: ${transactions.filter(t => t.type === 'deposit').reduce((a, b) => a + b.amount, 0)}</p>
          <p className="text-gray-600">Withdrawals: ${transactions.filter(t => t.type === 'withdrawal').reduce((a, b) => a + b.amount, 0)}</p>
        </div>

        {/* Upcoming Bills */}
        <div className="bg-white border border-[#3cb0c9]/20 p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-[#3cb0c9] mb-4">Upcoming Bills</h3>
          {bills.map((bill, i) => (
            <div key={i} className="flex justify-between border-b py-2">
              <div>
                <p className="font-medium text-[#3cb0c9]">{bill.name}</p>
                <p className="text-sm text-gray-500">{bill.date}</p>
              </div>
              <p className="text-[#3190a5] font-semibold">${bill.amount}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Recent Transactions */}
      <div className="bg-white border border-[#3cb0c9]/20 p-6 rounded-xl shadow-sm">
        <h3 className="font-semibold text-[#3cb0c9] mb-4">Recent Transactions</h3>
        <div className="space-y-2">
          {recent.map((item, i) => (
            <div key={i} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">{item.title || item.type}</p>
                <p className="text-sm text-gray-500">{item.source || 'N/A'}</p>
              </div>
              <div className="text-right">
                <p className={`font-bold ${item.type === 'deposit' ? 'text-green-600' : 'text-red-500'}`}>
                  ${Math.abs(item.amount)}
                </p>
                <p className="text-sm text-gray-400">{new Date(item.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Candlestick Chart */}
      <div className="bg-white border border-[#3cb0c9]/20 p-6 rounded-xl shadow-sm">
        <h3 className="font-semibold text-[#3cb0c9] mb-4">Capital Analysis</h3>
        <CandlestickChart transactions={transactions} />
      </div>
    </div>
  );
}
