'use client';

import { useEffect, useState } from 'react';

export default function AdminDashboardPage() {
  const [summary, setSummary] = useState({
    totalUsers: 0,
    totalCapital: 0,
    totalTransactions: 0,
    totalBills: 0,
    pendingBills: 0,
  });

  const [recentTransactions, setRecentTransactions] = useState([]);
  const [pendingBills, setPendingBills] = useState([]);

  useEffect(() => {
    const fetchAdminSummary = async () => {
      try {
        const res = await fetch('/api/admin/summary');
        const data = await res.json();
        setSummary(data);
        setRecentTransactions(data.recentTransactions || []);
        setPendingBills(data.pendingBills || []);
      } catch (err) {
        console.error('Failed to fetch admin summary:', err);
      }
    };

    fetchAdminSummary();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-2xl font-semibold text-[#3cb0c9]">Admin Dashboard</div>

      {/* Overview Card */}
      <div className="w-full h-40 bg-gradient-to-r from-[#3cb0c9] to-[#3190a5] text-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
        <div className="text-lg">Total System Capital</div>
        <div className="text-3xl font-bold">${summary.totalCapital.toLocaleString()}</div>
        <div className="text-sm opacity-80">Last updated: {new Date().toLocaleDateString()}</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Summary */}
        <div className="bg-white border border-[#3cb0c9]/20 p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-[#3cb0c9] mb-4">System Summary</h3>
          <p className="text-gray-600 mb-1">Total Users: {summary.totalUsers}</p>
          <p className="text-gray-600 mb-1">Total Transactions: {summary.totalTransactions}</p>
          <p className="text-gray-600 mb-1">Total Bills: {summary.totalBills}</p>
          <p className="text-gray-600">Pending Bills: {summary.pendingBills}</p>
        </div>

        {/* Pending Bills */}
        <div className="bg-white border border-[#3cb0c9]/20 p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-[#3cb0c9] mb-4">Pending Bills</h3>
          {pendingBills.length === 0 ? (
            <p className="text-gray-500">No pending bills</p>
          ) : (
            pendingBills.map((bill, i) => (
              <div key={i} className="flex justify-between border-b py-2">
                <div>
                  <p className="font-medium text-[#3cb0c9]">{bill.name}</p>
                  <p className="text-sm text-gray-500">User: {bill.userName}</p>
                  <p className="text-sm text-gray-500">Due: {bill.dueDate}</p>
                </div>
                <p className="text-[#3190a5] font-semibold">${bill.amount}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white border border-[#3cb0c9]/20 p-6 rounded-xl shadow-sm">
        <h3 className="font-semibold text-[#3cb0c9] mb-4">Recent Transactions</h3>
        <div className="space-y-2">
          {recentTransactions.length === 0 ? (
            <p className="text-gray-500">No recent transactions</p>
          ) : (
            recentTransactions.map((tx, i) => (
              <div key={i} className="flex justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{tx.title || tx.type}</p>
                  <p className="text-sm text-gray-500">By: {tx.userName}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${tx.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                    ${Math.abs(tx.amount)}
                  </p>
                  <p className="text-sm text-gray-400">{new Date(tx.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
