'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function AdminTransactionPage() {
  const [totalSent, setTotalSent] = useState(0);
  const [totalReceived, setTotalReceived] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/admin/transactions`);
      const data = await res.json();

      setTotalSent(data.totalSent);
      setTotalReceived(data.totalReceived);
      setTransactions(data.transactions.reverse());
    } catch (err) {
      toast.error('Failed to load admin transactions');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Top Section */}
      <div className="h-[30vh] bg-white rounded-3xl p-6 shadow-md flex flex-col justify-between border border-[#3cb0c9]/20">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-[#3cb0c9]">Admin Transaction Overview</h2>
          <p className="text-sm text-gray-500">Across all users</p>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Sent</p>
            <p className="text-lg font-semibold text-red-500">${totalSent.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Received</p>
            <p className="text-lg font-semibold text-green-600">${totalReceived.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-[#3cb0c9]/20">
        <h3 className="text-xl font-semibold text-[#3cb0c9] mb-4">All Transactions</h3>
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {transactions.length > 0 ? transactions.map((txn) => (
            <div
              key={txn._id}
              className="flex justify-between items-center p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            >
              <div>
                <p className="font-medium text-gray-800">{txn.title || txn.type}</p>
                <p className="text-sm text-gray-500">
                  By: {txn.userName || 'Unknown'} | {new Date(txn.date).toLocaleDateString()}
                </p>
              </div>
              <p className={`font-bold ${txn.type === 'received' ? 'text-green-600' : 'text-red-500'}`}>
                ${Math.abs(txn.amount)}
              </p>
            </div>
          )) : (
            <p className="text-gray-400 italic text-sm text-center">No transactions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
