'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { toast } from 'react-toastify'; 

export default function TransactionPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [capital, setCapital] = useState(0);
  const [totalSent, setTotalSent] = useState(0);
  const [totalReceived, setTotalReceived] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [amount, setAmount] = useState('');

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/transactions/summary?userId=${user._id}`);
      const data = await res.json();
      setCapital(data.capital);
      setTotalSent(data.totalSent);
      setTotalReceived(data.totalReceived);
      setTransactions(data.transactions.reverse());

      const usersRes = await fetch('/api/users');
      const allUsers = await usersRes.json();
      setUsers(allUsers.filter(u => u._id !== user._id));
    } catch (err) {
      toast.error('Failed to load data');
    }
  };

  useEffect(() => {
    if (!user) {
      router.replace('/signup');
      return;
    }
    fetchData();
  }, [user]);

  const handleSend = async () => {
    if (!selectedUserId || !amount) {
      toast.error('Please select a user and enter amount');
      return;
    }

    try {
      const res = await fetch('/api/transactions/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: user._id,
          to: selectedUserId,
          amount: parseFloat(amount),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Money sent successfully!');
        setShowModal(false);
        setAmount('');
        setSelectedUserId('');
        await fetchData(); // real-time refresh
      } else {
        toast.error(data.message || 'Failed to send money');
      }
    } catch (err) {
      toast.error('Server error');
    }
  };

  return (
    <div className="min-h-screen p-6 space-y-6 bg-gray-50">
      {/* Top Section */}
      <div className="h-[40vh] bg-white rounded-3xl p-6 shadow-md flex flex-col justify-between border border-[#3cb0c9]/20">
        <div className="space-y-2">
          <p className="text-gray-500 text-sm">Total Capital</p>
          <h2 className="text-4xl font-bold text-[#3cb0c9]">${capital.toLocaleString()}</h2>
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

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transaction History */}
        <div className="bg-white p-4 rounded-2xl shadow-md border border-[#3cb0c9]/20">
          <h3 className="text-xl font-semibold text-[#3cb0c9] mb-4">Transaction History</h3>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {transactions.length > 0 ? transactions.map((txn) => (
              <div
                key={txn._id}
                className="flex justify-between items-center p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
              >
                <div>
                  <p className="font-medium text-gray-800">{txn.title}</p>
                  <p className="text-sm text-gray-500">{new Date(txn.date).toLocaleDateString()}</p>
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

        {/* Send & Receive Buttons */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-[#3cb0c9]/20 flex flex-col justify-center items-center gap-6">
          <h3 className="text-xl font-semibold text-[#3cb0c9]">Actions</h3>
          <div className="grid grid-cols-1 w-full">
            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-[#3cb0c9] text-white py-3 rounded-lg font-semibold hover:bg-[#3190a5] transition"
            >
              Send Money
            </button>
          </div>
        </div>
      </div>

      {/* Send Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-lg font-bold mb-4 text-[#3cb0c9]">Send Money</h2>
            <select
              className="w-full mb-4 border p-2 rounded"
              value={selectedUserId}
              onChange={e => setSelectedUserId(e.target.value)}
            >
              <option value="">Select a user</option>
              {users.map(u => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
            <input
              type="number"
              className="w-full border p-2 rounded mb-4"
              placeholder="Amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:underline">
                Cancel
              </button>
              <button
                onClick={handleSend}
                className="bg-[#3cb0c9] text-white px-4 py-2 rounded hover:bg-[#3190a5]"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
