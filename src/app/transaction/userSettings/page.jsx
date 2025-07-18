'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthContext';
import { User, Mail, Lock, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UserSettingsPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    kyc: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        kyc: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/users/update/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to update profile');

      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Update failed.');
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#3cb0c9]">Profile Settings</h1>

      <form onSubmit={handleUpdate} className="space-y-6">
        {/* Name */}
        <div>
          <label className="text-gray-600 font-medium mb-1 flex items-center gap-2">
            <User className="w-4 h-4 text-[#3cb0c9]" /> Full Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#3cb0c9]"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-gray-600 font-medium mb-1 flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#3cb0c9]" /> Email Address
          </label>
          <input
            type="email"
            name="email"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#3cb0c9]"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-gray-600 font-medium mb-1 flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#3cb0c9]" /> New Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#3cb0c9]"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* KYC */}
        <div>
          <label className="text-gray-600 font-medium mb-1 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#3cb0c9]" /> KYC Document No (e.g., CNIC/Passport)
          </label>
          <input
            type="text"
            name="kyc"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#3cb0c9]"
            value={formData.kyc}
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-[#3cb0c9] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#3190a5] transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
