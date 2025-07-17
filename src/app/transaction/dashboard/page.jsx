'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const [capital, setCapital] = useState(240399);

  const goals = {
    total: 20000,
    achieved: 12500,
  };

  const upcomingBills = [
    { name: 'Odoo - Monthly', date: 'May 15', amount: 150 },
    { name: 'M365 - Yearly', date: 'Jun 16', amount: 559 },
  ];

  const recent = [
    { title: 'Profit', type: 'Revenue', source: 'Gadget & Gear', amount: 16000, date: '17 May 2023' },
    { title: 'Grant', type: 'Revenue', source: 'Agency', amount: 24000, date: '17 May 2023' },
    { title: 'Laptop', type: 'Expenses', source: 'Online', amount: -18000, date: '17 May 2023' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-xl font-semibold text-[#3cb0c9]">Business</div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Balance */}
        <div className="bg-white p-4 rounded-xl shadow-sm space-y-3 border border-[#3cb0c9]/20">
          <p className="text-gray-500">Total Balance</p>
          <h2 className="text-2xl font-bold text-[#3cb0c9]">${capital.toLocaleString()}</h2>
          <div className="bg-[#3cb0c9] text-white p-4 rounded-lg flex justify-between items-center">
            <div>
              <p className="text-sm">Debit Card</p>
              <p className="tracking-widest text-lg">**** 2598</p>
            </div>
            <p className="text-lg font-bold">$25000</p>
          </div>
        </div>

        {/* Goals */}
        <div className="bg-white p-4 rounded-xl shadow-sm space-y-3 border border-[#3cb0c9]/20">
          <p className="text-gray-500">Goals</p>
          <h2 className="text-xl font-bold text-[#3cb0c9]">${goals.total.toLocaleString()}</h2>
          <p className="text-sm text-gray-600">Target Achieved: <span className="text-green-600">${goals.achieved}</span></p>
          <div className="w-full h-3 bg-gray-200 rounded-full">
            <div
              className="h-3 bg-[#3190a5] rounded-full"
              style={{ width: `${(goals.achieved / goals.total) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Upcoming Bills */}
        <div className="bg-white p-4 rounded-xl shadow-sm space-y-3 border border-[#3cb0c9]/20">
          <p className="text-gray-500">Upcoming Bill</p>
          {upcomingBills.map((bill, i) => (
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

      {/* Transactions & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#3cb0c9]/20">
          <h3 className="font-semibold mb-2 text-[#3cb0c9]">Recent Transactions</h3>
          <div className="space-y-2">
            {recent.map((item, i) => (
              <div key={i} className="flex justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.source}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${item.amount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    ${Math.abs(item.amount)}
                  </p>
                  <p className="text-sm text-gray-400">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Placeholder */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#3cb0c9]/20">
          <h3 className="font-semibold mb-2 text-[#3cb0c9]">Weekly Comparison</h3>
          <div className="text-sm text-gray-400 italic text-center">Chart coming soon...</div>
        </div>
      </div>
    </div>
  );
}
