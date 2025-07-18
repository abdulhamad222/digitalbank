'use client';

import { useEffect, useState } from 'react';
import { BadgeDollarSign, Banknote, CalendarCheck2, CheckCircle, TimerReset } from 'lucide-react';

export default function LoanPage() {
  const [capital, setCapital] = useState(1000);
  const [loanApplied, setLoanApplied] = useState(false);
  const [emiStatus, setEmiStatus] = useState([
    { month: 'July', status: 'Paid' },
    { month: 'August', status: 'Upcoming' },
  ]);

  const maxEligible = capital * 5;

  useEffect(() => {
    // Simulate fetching user's capital
    setCapital(1000); // Replace with real API call if needed
  }, []);

  const handleApplyLoan = () => {
    setLoanApplied(true);
  };

  return (
    <div className="space-y-8">
      <div className="text-2xl font-semibold text-[#3cb0c9]">Loan & EMI Management</div>

      {/* Section 1: Eligibility */}
      <div className="bg-white border border-[#3cb0c9]/20 p-6 rounded-xl shadow-sm flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-[#3cb0c9] mb-2">Loan Eligibility</h3>
          <p className="text-gray-700">Based on your capital: <span className="font-bold">${capital}</span></p>
          <p className="text-gray-700">Max Eligible Amount: <span className="text-[#3cb0c9] font-bold">${maxEligible}</span></p>
        </div>
        <BadgeDollarSign className="w-10 h-10 text-[#3cb0c9]" />
      </div>

      {/* Section 2: Apply Loan */}
      <div className="bg-white border border-[#3cb0c9]/20 p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-[#3cb0c9]">Apply for Loan</h3>
          <button
            onClick={handleApplyLoan}
            disabled={loanApplied}
            className={`px-5 py-2 rounded-md font-semibold transition ${
              loanApplied
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-[#3cb0c9] hover:bg-[#3190a5] text-white'
            }`}
          >
            {loanApplied ? 'Loan Requested' : 'Apply Now'}
          </button>
        </div>
        {loanApplied && (
          <p className="mt-3 text-green-600 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" /> Your loan application has been submitted!
          </p>
        )}
      </div>

      {/* Section 3: EMI Tracker */}
      <div className="bg-white border border-[#3cb0c9]/20 p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-[#3cb0c9] mb-4">EMI Status</h3>
        <div className="space-y-2">
          {emiStatus.map((emi, index) => (
            <div key={index} className="flex justify-between items-center border-b py-2">
              <div className="flex items-center gap-3">
                {emi.status === 'Paid' ? (
                  <CheckCircle className="text-green-600" />
                ) : (
                  <TimerReset className="text-yellow-500" />
                )}
                <span className="text-gray-700">{emi.month} EMI</span>
              </div>
              <span
                className={`font-semibold ${
                  emi.status === 'Paid' ? 'text-green-600' : 'text-yellow-600'
                }`}
              >
                {emi.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Loan Summary */}
      {loanApplied && (
        <div className="bg-white border border-[#3cb0c9]/20 p-6 rounded-xl shadow-sm">
          <div className="flex gap-3 items-center">
            <Banknote className="text-[#3cb0c9]" />
            <div>
              <p className="font-medium">Loan Amount</p>
              <p className="text-gray-600">$5000 (Example)</p>
              <p className="text-sm text-gray-400">Tenure: 10 months | EMI: $500/month</p>
            </div>
          </div>
        </div>
      )}

      {/* Section 5: Loan Agreement Timestamp */}
      {loanApplied && (
        <div className="bg-white border border-[#3cb0c9]/20 p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <CalendarCheck2 className="text-[#3cb0c9]" />
            <div>
              <p className="font-medium">Agreement Submitted On</p>
              <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
