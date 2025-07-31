'use client';

import { useEffect, useState } from 'react';
import { CalendarCheck2, CreditCard, AlarmClock, CheckCircle, FileText } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '@/components/AuthContext';

export default function BillsPage() {
  const [bills, setBills] = useState([]);
  const [capital, setCapital] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
  if (user?._id) {
    fetch(`/api/bills?userId=${user._id}`)
      .then(res => res.json())
      .then(async data => {
        if (data.length === 0) {
          // Add default bills for new users
          const defaultBills = [
            { name: 'Electric Bill', amount: 75, dueDate: '2025-08-05', status: 'Pending' },
            { name: 'Internet', amount: 50, dueDate: '2025-08-10', status: 'Pending' },
            { name: 'Netflix', amount: 15, dueDate: '2025-08-12', status: 'Pending' },
          ];

          for (const bill of defaultBills) {
            await fetch('/api/bills', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...bill, userId: user._id }),
            });
          }

          setBills(defaultBills);
        } else {
          setBills(data);
        }
      })
      .catch(() => toast.error('Failed to load bills'));
  }
}, [user]);



  useEffect(() => {
    if (user?._id) {
      fetch(`/api/transactions/summary?userId=${user._id}`)
        .then(res => res.json())
        .then(data => setCapital(data.capital))
        .catch(() => toast.error('Failed to load capital'));
    }
  }, [user]);

  const handlePayBill = async (bill) => {
    if (capital < bill.amount) {
      toast.error('Not enough capital to pay this bill');
      return;
    }

    try {
      // 1. Optimistically update the UI
      setBills(prev =>
        prev.map(b => b.name === bill.name ? { ...b, status: 'Paid' } : b)
      );

      // 2. Deduct the amount from capital
      setCapital(prev => prev - bill.amount);

      // 3. Create a transaction entry
      const res = await fetch('/api/transactions/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: user._id,
          to: user._id,
          amount: bill.amount,
          type: 'withdrawal',
          title: `${bill.name} Bill Payment`,
        }),
      });

      await fetch('/api/bills/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, name: bill.name }),
      });

      if (!res.ok) throw new Error();

      toast.success(`$${bill.amount} paid for ${bill.name}`);
    } catch (err) {
      toast.error('Payment failed. Please try again.');
      // Rollback on error
      setBills(prev =>
        prev.map(b => b.name === bill.name ? { ...b, status: 'Pending' } : b)
      );
      setCapital(prev => prev + bill.amount);
    }
  };

  const paidBills = bills.filter(b => b.status === 'Paid');
  const scheduled = bills.filter(b => b.status === 'Scheduled');

  return (
    <div className="space-y-8">
      <div className="text-2xl font-semibold text-[#3cb0c9]">Bills & Payments</div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
        <div className="bg-white p-4 rounded-xl shadow border border-[#3cb0c9]/20">
          <h4 className="text-[#3cb0c9] font-medium">Current Capital</h4>
          <p className="text-2xl font-bold text-[#3cb0c9] mt-2">${capital.toLocaleString()}</p>
        </div>
      </div>

      {/* Upcoming Bills */}
      <div className="bg-white p-6 rounded-xl shadow border border-[#3cb0c9]/20">
        <h3 className="text-lg font-semibold text-[#3cb0c9] mb-4">Upcoming Bills</h3>
        <div className="space-y-3">
          {bills.filter(b => b.status === 'Pending').map((bill, i) => (
            <div key={i} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium">{bill.name}</p>
                <p className="text-sm text-gray-500">Due: {bill.dueDate}</p>
              </div>
              <div className="text-right">
                <p className="text-red-500 font-semibold">${bill.amount}</p>
                <button
                  className="mt-1 text-sm px-3 py-1 bg-[#3cb0c9] text-white rounded hover:bg-[#3190a5]"
                  onClick={() => handlePayBill(bill)}
                >
                  Pay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled Payments */}
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

      {/* Paid Bills */}
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

      {/* Payment Method Info */}
      <div className="bg-white p-6 rounded-xl shadow border border-[#3cb0c9]/20">
        <div className="flex items-center gap-3">
          <CreditCard className="text-[#3cb0c9]" />
          <div>
            <p className="font-medium">Payment Method</p>
            <p className="text-sm text-gray-500">Visa Debit **** 7834</p>
          </div>
        </div>
      </div>

      {/* History Log */}
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
