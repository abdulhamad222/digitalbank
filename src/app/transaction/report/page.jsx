'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthContext'; 
import { FileDown, CalendarDays, TrendingUp, TrendingDown } from 'lucide-react';

export default function ReportPage() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState('monthly');

  useEffect(() => {
    if (!user) return;
    const fetchTransactions = async () => {
      try {
        const res = await fetch('/api/transactions?userId=123'); // replace with dynamic user ID
        const { transactions } = await res.json();
        setTransactions(transactions);
        setFiltered(transactions);
      } catch (err) {
        console.error('Failed to fetch transactions:', err);
      }
    };

    fetchTransactions();
  }, [user]);

  // Filters
  useEffect(() => {
    const now = new Date();
    const filteredTxns =
      filter === 'monthly'
        ? transactions.filter(txn => new Date(txn.date).getMonth() === now.getMonth())
        : transactions.filter(txn => new Date(txn.date).getFullYear() === now.getFullYear());
    setFiltered(filteredTxns);
  }, [filter, transactions]);

  const totalDeposit = filtered
    .filter(t => t.type === 'deposit')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalWithdraw = filtered
    .filter(t => t.type === 'withdrawal')
    .reduce((acc, t) => acc + t.amount, 0);

  const netBalance = totalDeposit - totalWithdraw;

  const exportCSV = () => {
    const header = 'Date,Type,Amount,Source\n';
    const rows = filtered.map(t => `${new Date(t.date).toLocaleDateString()},${t.type},${t.amount},${t.source}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${filter}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="text-2xl font-semibold text-[#3cb0c9]">Reports & Export</div>

      {/* Filter Controls */}
      <div className="flex gap-4">
        <button
          onClick={() => setFilter('monthly')}
          className={`px-4 py-2 rounded-lg font-semibold border ${
            filter === 'monthly' ? 'bg-[#3cb0c9] text-white' : 'text-[#3cb0c9] border-[#3cb0c9]'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setFilter('yearly')}
          className={`px-4 py-2 rounded-lg font-semibold border ${
            filter === 'yearly' ? 'bg-[#3cb0c9] text-white' : 'text-[#3cb0c9] border-[#3cb0c9]'
          }`}
        >
          Yearly
        </button>
        <button
          onClick={exportCSV}
          className="ml-auto flex items-center gap-2 bg-[#3cb0c9] hover:bg-[#3190a5] text-white px-4 py-2 rounded-lg font-semibold"
        >
          <FileDown className="w-5 h-5" /> Export CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-[#3cb0c9]/20 shadow-sm">
          <p className="text-gray-600">Total Deposits</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold text-green-600">${totalDeposit}</span>
            <TrendingUp className="text-green-500" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#3cb0c9]/20 shadow-sm">
          <p className="text-gray-600">Total Withdrawals</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold text-red-500">${totalWithdraw}</span>
            <TrendingDown className="text-red-500" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#3cb0c9]/20 shadow-sm">
          <p className="text-gray-600">Net Balance</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold text-[#3cb0c9]">${netBalance}</span>
            <CalendarDays className="text-[#3cb0c9]" />
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white border border-[#3cb0c9]/20 p-6 rounded-xl shadow-sm">
        <h3 className="font-semibold text-[#3cb0c9] mb-4">Transaction History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Source</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => (
                <tr key={i} className="border-b text-gray-700">
                  <td className="px-4 py-2">{new Date(t.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2 capitalize">{t.type}</td>
                  <td className="px-4 py-2">${t.amount}</td>
                  <td className="px-4 py-2">{t.source || 'N/A'}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-400 italic">
                    No transactions found for this period.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
