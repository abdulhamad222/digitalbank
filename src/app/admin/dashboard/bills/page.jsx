'use client';

import { useEffect, useState } from 'react';
import { CalendarCheck2, CreditCard, AlarmClock, CheckCircle, FileText, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

export default function BillsAdminPage() {
  const [bills, setBills] = useState([]);
  const [billName, setBillName] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [billDueDate, setBillDueDate] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [users, setUsers] = useState([]);


  // Fetch all bills
  useEffect(() => {
    const fetchAllBills = async () => {
      try {
        const res = await fetch('/api/bills/all');
        const data = await res.json();
        setBills(data);
      } catch (err) {
        toast.error('Failed to fetch bills');
      }
    };
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        toast.error('Failed to fetch users');
      }
    };

    fetchAllBills();
    fetchUsers();
  }, []);

  const handleMarkAsPaid = async (billId) => {
    try {
      await fetch(`/api/bills/${billId}/mark-paid`, { method: 'PATCH' });
      setBills(prev => prev.map(b => b._id === billId ? { ...b, status: 'Paid' } : b));
      toast.success('Bill marked as paid');
    } catch {
      toast.error('Failed to mark as paid');
    }
  };

  const handleDeleteBill = async (billId) => {
    try {
      await fetch(`/api/bills/${billId}`, { method: 'DELETE' });
      setBills(prev => prev.filter(b => b._id !== billId));
      toast.success('Bill deleted');
    } catch {
      toast.error('Failed to delete bill');
    }
  };

  const handleCreateBill = async () => {
    const res = await fetch('/api/bills', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: billName,
        amount: billAmount,
        dueDate: billDueDate,
        userId: selectedUserId,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setBills(prev => [...prev, data]);
      toast.success('Bill created successfully');
      setShowModal(false);
      setBillName('');
      setBillAmount('');
      setBillDueDate('');
      setSelectedUserId('');
    } else {
      toast.error(data.error || 'Failed to create bill');
    }
  };


  const pendingBills = bills.filter(b => b.status === 'Pending');
  const paidBills = bills.filter(b => b.status === 'Paid');
  const scheduledBills = bills.filter(b => b.status === 'Scheduled');

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    dueDate: '',
    userId: '',
  });

  return (
    <div className="space-y-8">
      <div className="text-2xl font-semibold text-[#3cb0c9]">Admin: All Bills</div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl shadow border border-[#3cb0c9]/20">
          <h4 className="text-[#3cb0c9] font-medium">Total Bills</h4>
          <p className="text-2xl font-bold mt-2">{bills.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-[#3cb0c9]/20">
          <h4 className="text-green-600 font-medium">Paid</h4>
          <p className="text-2xl font-bold mt-2">{paidBills.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-[#3cb0c9]/20">
          <h4 className="text-yellow-500 font-medium">Scheduled</h4>
          <p className="text-2xl font-bold mt-2">{scheduledBills.length}</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-[#3cb0c9] text-white p-2 rounded">
          Create New Bill
        </button>
      </div>

      {/* Pending Bills */}
      <div className="bg-white p-6 rounded-xl shadow border border-[#3cb0c9]/20">
        <h3 className="text-lg font-semibold text-[#3cb0c9] mb-4">Pending Bills</h3>
        {pendingBills.map(bill => (
          <div key={bill._id} className="flex justify-between items-center border-b py-2">
            <div>
              <p className="font-medium">{bill.name}</p>
              <p className="text-sm text-gray-500">Due: {new Date(bill.dueDate).toLocaleDateString()}</p>
              <p className="text-xs text-gray-400">User: {bill.userId}</p>
            </div>
            <div className="text-right">
              <p className="text-red-500 font-semibold">${bill.amount}</p>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => handleMarkAsPaid(bill._id)}
                  className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Mark Paid
                </button>
                <button
                  onClick={() => handleDeleteBill(bill._id)}
                  className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paid Bills */}
      <div className="bg-white p-6 rounded-xl shadow border border-[#3cb0c9]/20">
        <h3 className="text-lg font-semibold text-[#3cb0c9] mb-4">Paid Bills</h3>
        <ul className="space-y-2">
          {paidBills.map((bill) => (
            <li key={bill._id} className="flex justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-600" />
                <span>{bill.name}</span>
              </div>
              <span className="text-green-600">${bill.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Scheduled Bills */}
      <div className="bg-white p-6 rounded-xl shadow border border-[#3cb0c9]/20">
        <h3 className="text-lg font-semibold text-[#3cb0c9] mb-4">Scheduled Bills</h3>
        <ul className="space-y-2">
          {scheduledBills.map((bill) => (
            <li key={bill._id} className="flex justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <AlarmClock className="text-yellow-500" />
                <span>{bill.name}</span>
              </div>
              <span className="text-yellow-600">${bill.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-lg font-semibold text-[#3cb0c9] mb-4">Create New Bill</h2>
            <input value={billName} onChange={(e) => setBillName(e.target.value)} placeholder="Bill Name" className="input mb-2 w-full" />
            <input type="number" value={billAmount} onChange={(e) => setBillAmount(e.target.value)} placeholder="Amount" className="input mb-2 w-full" />
            <input type="date" value={billDueDate} onChange={(e) => setBillDueDate(e.target.value)} className="input mb-2 w-full" />
            <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)} className="input mb-4 w-full">
              <option value="">Select User</option>
              {users.map(u => (
                <option key={u._id} value={u._id}>{u.name}</option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleCreateBill} className="px-4 py-2 bg-[#3cb0c9] text-white rounded">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
