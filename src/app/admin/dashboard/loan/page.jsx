'use client';

import { useEffect, useState } from 'react';
import {
  BadgeDollarSign,
  Banknote,
  CalendarCheck2,
  CheckCircle,
  TimerReset,
} from 'lucide-react';
import { useAuth } from '@/components/AuthContext';

export default function LoanPage() {
  const { user } = useAuth();
  const [capital, setCapital] = useState(0);
  const [eligibleLoan, setEligibleLoan] = useState(0);
  const [loanOptionsVisible, setLoanOptionsVisible] = useState(false);
  const [selectedPercentage, setSelectedPercentage] = useState(null);
  const [loanApplied, setLoanApplied] = useState(false);
  const [loanData, setLoanData] = useState(null);
  const [emiStatus, setEmiStatus] = useState([]);

  const [showUserForm, setShowUserForm] = useState(false);
  const [userDetails, setUserDetails] = useState({
    cnic: '',
    phone: '',
    address: '',
    image: '',
  });

  useEffect(() => {
    if (!user || !user._id) return;

    const fetchCapital = async () => {
      try {
        const res = await fetch(`/api/transactions/summary?userId=${user._id}`);
        const data = await res.json();
        setCapital(data.capital);
        setEligibleLoan(data.capital * 0.3);
      } catch (err) {
        console.error("Failed to fetch capital:", err);
      }
    };

    const fetchEMIs = async () => {
      try {
        const res = await fetch(`/api/emis?userId=${user._id}`);
        const data = await res.json();
        setEmiStatus(data.emis);
      } catch (err) {
        console.error("Failed to fetch EMIs", err);
      }
    };

    const fetchLoan = async () => {
      try {
        const res = await fetch(`/api/loan?userId=${user._id}`);
        const data = await res.json();
        if (data.loan) {
          setLoanData(data.loan);
          setLoanApplied(true);
        }
      } catch (err) {
        console.error('Failed to fetch loan:', err);
      }
    };

    fetchCapital();
    fetchEMIs();
    fetchLoan();
  }, [user]);


  const handleApplyLoanClick = () => {
    setLoanOptionsVisible(true);
  };

  const handleLoanSelection = (percentage) => {
    setSelectedPercentage(percentage);
    setShowUserForm(true);
    setLoanOptionsVisible(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserDetails({ ...userDetails, image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitLoan = async () => {
    const amount = (capital * selectedPercentage) / 100;
    const emi = parseFloat((amount / 10).toFixed(2));
    const confirmLoan = confirm(`Confirm loan of $${amount}?`);

    if (!confirmLoan) return;

    const newLoan = {
      userId: user._id,
      amount,
      tenure: 10,
      emi,
      date: new Date().toLocaleDateString(),
      ...userDetails,
    };

    try {
      const res = await fetch('/api/loan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLoan),
      });

      const data = await res.json();
      if (data.success) {
        setLoanData(newLoan);
        setLoanApplied(true);
        setLoanOptionsVisible(false);
        setShowUserForm(false);
      } else {
        alert('Loan application failed.');
      }
    } catch (err) {
      console.error('Error submitting loan:', err);
      alert('An error occurred.');
    }
  };

  const handlePayEmi = async (index) => {
    if (!loanData || !loanData.emi || capital < loanData.emi) {
      alert("Not enough capital to pay EMI.");
      return;
    }

    try {
      // Update local state
      const updatedEmis = [...emiStatus];
      updatedEmis[index].status = 'Paid';
      setEmiStatus(updatedEmis);

      const newCapital = parseFloat((capital - loanData.emi).toFixed(2));
      setCapital(newCapital);

      // Update backend (optional endpoint)
      await fetch('/api/loan/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          emiAmount: loanData.emi,
          month: emiStatus[index].month,
        }),
      });

      alert('EMI paid successfully.');
    } catch (err) {
      console.error('Error paying EMI:', err);
      alert('Failed to process EMI payment.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Eligibility */}
      <div className="bg-white border border-[#3cb0c9]/20 p-6 rounded-xl shadow-sm flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-[#3cb0c9] mb-2">Loan Eligibility</h3>
          <p className="text-gray-700">Based on your capital: <span className="font-bold">${capital}</span></p>
          <p className="text-gray-700">Max Eligible Amount: <span className="text-[#3cb0c9] font-bold">${eligibleLoan}</span></p>
        </div>
        <BadgeDollarSign className="w-10 h-10 text-[#3cb0c9]" />
      </div>

      {/* Apply Loan */}
      <div className="bg-white border border-[#3cb0c9]/20 p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-[#3cb0c9]">Apply for Loan</h3>
          <button
            onClick={handleApplyLoanClick}
            disabled={loanApplied}
            className={`px-5 py-2 rounded-md font-semibold transition ${
              loanApplied
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-[#3cb0c9] hover:bg-[#3190a5] text-white'
            }`}
          >
            {loanApplied ? 'Loan Applied' : 'Apply Now'}
          </button>
        </div>

        {loanOptionsVisible && (
          <div className="mt-4 space-x-4">
            {[10, 20, 30].map((percent) => (
              <button
                key={percent}
                onClick={() => handleLoanSelection(percent)}
                className="bg-[#3cb0c9] hover:bg-[#3190a5] text-white px-4 py-1 rounded"
              >
                {percent}% (${(capital * percent) / 100})
              </button>
            ))}
          </div>
        )}

        {loanApplied && (
          <p className="mt-3 text-green-600 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" /> Your loan application has been submitted!
          </p>
        )}
      </div>

      {/* User Details Form */}
      {showUserForm && (
        <div className="mt-4 space-y-4 border-t pt-4">
          <div>
            <label className="block text-sm font-medium">CNIC</label>
            <input
              type="text"
              value={userDetails.cnic}
              onChange={(e) =>
                setUserDetails({ ...userDetails, cnic: e.target.value })
              }
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              value={userDetails.phone}
              onChange={(e) =>
                setUserDetails({ ...userDetails, phone: e.target.value })
              }
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              value={userDetails.address}
              onChange={(e) =>
                setUserDetails({ ...userDetails, address: e.target.value })
              }
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Upload Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <button
            onClick={handleSubmitLoan}
            className="bg-[#3cb0c9] hover:bg-[#3190a5] text-white px-4 py-2 rounded"
          >
            Submit Application
          </button>
        </div>
      )}

      {/* EMI Tracker with Pay Option */}
      <div className="bg-white border border-[#3cb0c9]/20 p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-[#3cb0c9] mb-4">EMI Status</h3>
        <div className="space-y-2">
          {emiStatus.map((emi, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-2"
            >
              <div className="flex items-center gap-3">
                {emi.status === 'Paid' ? (
                  <CheckCircle className="text-green-600" />
                ) : (
                  <TimerReset className="text-yellow-500" />
                )}
                <span className="text-gray-700">{emi.month} EMI</span>
              </div>
              <div className="flex gap-3 items-center">
                <span
                  className={`font-semibold ${
                    emi.status === 'Paid' ? 'text-green-600' : 'text-yellow-600'
                  }`}
                >
                  {emi.status}
                </span>
                {emi.status === 'Unpaid' && loanData && (
                  <button
                    onClick={() => handlePayEmi(index)}
                    className="text-sm bg-[#3cb0c9] hover:bg-[#3190a5] text-white px-3 py-1 rounded"
                  >
                    Pay ${loanData.emi}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Loan Summary */}
      {loanApplied && loanData && (
        <div className="bg-white border border-[#3cb0c9]/20 p-6 rounded-xl shadow-sm">
          <div className="flex gap-3 items-center">
            <Banknote className="text-[#3cb0c9]" />
            <div>
              <p className="font-medium">Loan Amount</p>
              <p className="text-gray-600">${loanData.amount}</p>
              <p className="text-sm text-gray-400">
                Tenure: {loanData.tenure} months | EMI: ${loanData.emi}/month
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Agreement Timestamp */}
      {loanApplied && loanData && (
        <div className="bg-white border border-[#3cb0c9]/20 p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <CalendarCheck2 className="text-[#3cb0c9]" />
            <div>
              <p className="font-medium">Agreement Submitted On</p>
              <p className="text-sm text-gray-500">{loanData.date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
