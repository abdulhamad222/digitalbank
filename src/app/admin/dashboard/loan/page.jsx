'use client';

import { useEffect, useState } from 'react';
import { Banknote, CalendarCheck2, CheckCircle, TimerReset } from 'lucide-react';
import { toast } from 'react-toastify';

export default function AdminLoanPage() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchAllLoans = async () => {
      try {
        const res = await fetch('/api/loan/all');
        const data = await res.json();
        setLoans(data.loans || []);
      } catch (err) {
        console.error("Failed to fetch loans", err);
        toast.error("Failed to fetch loans");
      }
    };

    fetchAllLoans();
  }, []);

  const handlePayEmi = async (userId, monthIndex, emiAmount) => {
    try {
      await fetch('/api/loan/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, month: `Month ${monthIndex + 1}`, emiAmount }),
      });

      setLoans(prevLoans =>
        prevLoans.map(loan =>
          loan.userId === userId
            ? {
                ...loan,
                emis: loan.emis.map((emi, i) =>
                  i === monthIndex ? { ...emi, status: 'Paid' } : emi
                ),
              }
            : loan
        )
      );

      toast.success('EMI marked as paid');
    } catch (err) {
      console.error('EMI update error', err);
      toast.error('Failed to update EMI');
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-[#3cb0c9]">Admin: Loan Applications</h2>

      {loans.map((loan) => (
        <div key={loan._id} className="bg-white border border-[#3cb0c9]/20 rounded-xl p-6 shadow space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-[#3cb0c9]">User ID: {loan.userId}</p>
              <p className="text-sm text-gray-600">CNIC: {loan.cnic}</p>
              <p className="text-sm text-gray-600">Phone: {loan.phone}</p>
              <p className="text-sm text-gray-600">Address: {loan.address}</p>
            </div>
            {loan.image && (
              <img src={loan.image} alt="user" className="w-16 h-16 rounded-full object-cover border" />
            )}
          </div>

          <div className="text-gray-700">
            <p>Loan Amount: <strong>${loan.amount}</strong></p>
            <p>EMI (Monthly): <strong>${loan.emi}</strong></p>
            <p>Tenure: {loan.tenure} months</p>
            <p className="text-sm text-gray-500">Agreement Date: {loan.date}</p>
          </div>

          <div>
            <h4 className="font-semibold text-[#3cb0c9] mb-2">EMI Status</h4>
            <div className="space-y-2">
              {Array.isArray(loan.emis) &&
                loan.emis.map((emi, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b py-1"
                >
                  <div className="flex items-center gap-3">
                    {emi.status === 'Paid' ? (
                      <CheckCircle className="text-green-600" />
                    ) : (
                      <TimerReset className="text-yellow-500" />
                    )}
                    <span>{emi.month}</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span
                      className={`font-semibold ${
                        emi.status === 'Paid' ? 'text-green-600' : 'text-yellow-600'
                      }`}
                    >
                      {emi.status}
                    </span>
                    {emi.status === 'Unpaid' && (
                      <button
                        onClick={() => handlePayEmi(loan.userId, index, loan.emi)}
                        className="text-sm bg-[#3cb0c9] hover:bg-[#3190a5] text-white px-3 py-1 rounded"
                      >
                        Mark Paid
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
