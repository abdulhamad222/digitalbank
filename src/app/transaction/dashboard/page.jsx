'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const [capital, setCapital] = useState(1000);
  const [transactions, setTransactions] = useState([]);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch(`/api/transactions/summary?userId=${user._id}`);
        const data = await res.json();
        setCapital(data.capital);
        setTransactions(data.transactions.reverse());
      } catch (err) {
        console.error('Failed to fetch summary:', err);
      }
    };

    if (user?._id) {
      fetchSummary();
    }
  }, [user]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await fetch(`/api/bills?userId=${user._id}`);
        const data = await res.json();
        setBills(data || []);
      } catch (err) {
        console.error('Failed to fetch bills:', err);
      }
    };

    if (user?._id) {
      fetchBills();
    }
  }, [user]);

  const recent = transactions.slice(0, 4);
  const upcomingBills = bills.filter(b => b.status === 'Pending');

  return (
    <div className="space-y-8">
      {/* 1. Header */}
      <div className="text-2xl font-semibold text-[#3cb0c9]">Bank Dashboard</div>

      {/* 2. Capital Overview */}
      <div className="w-full h-40 bg-gradient-to-r from-[#3cb0c9] to-[#3190a5] text-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
        <div className="text-lg">Total Capital</div>
        <div className="text-3xl font-bold">
          ${capital ? capital.toLocaleString() : 'Loading...'}
        </div>
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

        {/* Upcoming Bills (Real) */}
        <div className="bg-white border border-[#3cb0c9]/20 p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-[#3cb0c9] mb-4">Upcoming Bills</h3>
          {upcomingBills.length === 0 ? (
            <p className="text-gray-500">No pending bills</p>
          ) : (
            upcomingBills.map((bill, i) => (
              <div key={i} className="flex justify-between border-b py-2">
                <div>
                  <p className="font-medium text-[#3cb0c9]">{bill.name}</p>
                  <p className="text-sm text-gray-500">Due: {bill.dueDate || 'N/A'}</p>
                </div>
                <p className="text-[#3190a5] font-semibold">${bill.amount}</p>
              </div>
            ))
          )}
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
                <p className={`font-bold ${item.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                  ${Math.abs(item.amount)}
                </p>
                <p className="text-sm text-gray-400">{new Date(item.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
