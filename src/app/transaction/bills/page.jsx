'use client';

import { useEffect, useState } from 'react';
import { CalendarCheck2, CreditCard, AlarmClock, CheckCircle, XCircle, FileText } from 'lucide-react';

export default function BillsPage() {
  const [bills, setBills] = useState([]);
  const [paidBills, setPaidBills] = useState([]);
  const [scheduled, setScheduled] = useState([]);

  useEffect(() => {
    // Simulate fetching data from database
    const dummyBills = [
      { name: 'Netflix', amount: 15, dueDate: '2025-07-25', status: 'Pending' },
      { name: 'Electric Bill', amount: 85, dueDate: '2025-07-22', status: 'Scheduled' },
      { name: 'Water Bill', amount: 35, dueDate: '2025-07-20', status: 'Paid' },
      { name: 'Internet', amount: 55, dueDate: '2025-07-27', status: 'Pending' },
    ];
    setBills(dummyBills);
    setPaidBills(dummyBills.filter(b => b.status === 'Paid'));
    setScheduled(dummyBills.filter(b => b.status === 'Scheduled'));
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-2xl font-semibold text-[#3cb0c9]">Bills & Payments</div>

      {/* Section 1: Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl shadow border border-[#3cb0c9]/20">
          <h4 className="text-[#3cb0c9] font-medium">Total Bills</h4>
          <p className="text-2xl font-bold mt-2">{bills.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-[#3cb0c9]/20">
          <h4 className="text-[#3cb0c9] font-medium">Paid</h4>
          <p className="text-2xl font-bold text-green-600 mt-2">{paidBills.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-[#3cb0c9]/20">
          <h4 className="text-[#3cb0c9] font-medium">Scheduled</h4>
          <p className="text-2xl font-bold text-yellow-500 mt-2">{scheduled.length}</p>
        </div>
      </div>

      {/* Section 2: Upcoming Bills */}
      <div className="bg-white p-6 rounded-xl shadow border border-[#3cb0c9]/20">
        <h3 className="text-lg font-semibold text-[#3cb0c9] mb-4">Upcoming Bills</h3>
        <div className="space-y-3">
          {bills.filter(b => b.status === 'Pending').map((bill, i) => (
            <div key={i} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium">{bill.name}</p>
                <p className="text-sm text-gray-500">Due: {bill.dueDate}</p>
              </div>
              <p className="text-red-500 font-semibold">${bill.amount}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Scheduled Payments */}
      <div className="bg-white p-6 rounded-xl shadow border border-[#3cb0c9]/20">
        <h3 className="text-lg font-semibold text-[#3cb0c9] mb-4">Scheduled Payments</h3>
        <ul className="space-y-2">
          {scheduled.map((bill, i) => (
            <li key={i} className="flex justify-between items-center border-b pb-2">
              <div className="flex gap-3 items-center">
                <AlarmClock className="text-yellow-500" />
                <span>{bill.name}</span>
              </div>
              <span className="text-yellow-600">${bill.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Section 4: Paid Bills */}
      <div className="bg-white p-6 rounded-xl shadow border border-[#3cb0c9]/20">
        <h3 className="text-lg font-semibold text-[#3cb0c9] mb-4">Paid Bills</h3>
        <ul className="space-y-2">
          {paidBills.map((bill, i) => (
            <li key={i} className="flex justify-between items-center border-b pb-2">
              <div className="flex gap-3 items-center">
                <CheckCircle className="text-green-500" />
                <span>{bill.name}</span>
              </div>
              <span className="text-green-600">${bill.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Section 5: Payment Method Info */}
      <div className="bg-white p-6 rounded-xl shadow border border-[#3cb0c9]/20">
        <div className="flex items-center gap-3">
          <CreditCard className="text-[#3cb0c9]" />
          <div>
            <p className="font-medium">Payment Method</p>
            <p className="text-sm text-gray-500">Visa Debit **** 7834</p>
          </div>
        </div>
      </div>

      {/* Section 6: History Log */}
      <div className="bg-white p-6 rounded-xl shadow border border-[#3cb0c9]/20">
        <div className="flex items-center gap-3">
          <FileText className="text-[#3cb0c9]" />
          <div>
            <p className="font-medium">Last Updated</p>
            <p className="text-sm text-gray-500">{new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
