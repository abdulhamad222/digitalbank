'use client';

import { useAuth } from '@/components/AuthContext';
import { useEffect, useState } from 'react';
import { User, Mail, Phone, ShieldCheck, Calendar } from 'lucide-react';

export default function AccountPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
        if (!user?._id) return;

        try {
        const res = await fetch(`/api/transactions/summary?userId=${user._id}`);
        const data = await res.json();

        setProfile({
            name: user.name || 'John Doe',
            email: user.email || 'johndoe@example.com',
            phone: '+92 *** *******',
            role: 'Customer',
            createdAt: user.createdAt || new Date().toISOString(),
            avatar: '',
            capital: data.capital || 1000,
        });
        } catch (err) {
        console.error('Failed to fetch profile summary:', err);
        }
    };

    fetchProfile();
    }, [user]);


  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="text-2xl font-semibold text-[#3cb0c9]">Account Information</div>

      {/* Section 1: Profile Overview */}
    <div className="bg-white border border-[#3cb0c9]/20 p-6 rounded-xl shadow-sm flex justify-between items-center flex-wrap gap-4">
    {/* Left: Avatar & Name */}
    <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-[#3cb0c9] text-white flex items-center justify-center text-2xl font-bold">
        {profile.avatar ? (
            <img src={profile.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
        ) : (
            profile.name?.charAt(0)
        )}
        </div>
        <div>
        <h2 className="text-xl font-bold">{profile.name}</h2>
        <p className="text-sm text-gray-500">{profile.email}</p>
        </div>
    </div>

    {/* Right: Capital */}
    <div className="text-right">
        <p className="text-sm text-gray-500">Current Capital</p>
        <p className="text-2xl font-bold text-[#3cb0c9]">
        ${(profile.capital || 1000).toLocaleString()}
        </p>
    </div>
    </div>


      {/* Section 2: Contact Details */}
      <div className="bg-white border border-[#3cb0c9]/20 p-6 rounded-xl shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 text-gray-700">
          <Phone className="text-[#3cb0c9]" />
          <span>{profile.phone}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <Mail className="text-[#3cb0c9]" />
          <span>{profile.email}</span>
        </div>
      </div>

      {/* Section 3: Role & Permissions */}
      <div className="bg-white border border-[#3cb0c9]/20 p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-3 text-gray-700">
          <ShieldCheck className="text-[#3cb0c9]" />
          <div>
            <p className="font-medium">Role: {profile.role}</p>
            <p className="text-sm text-gray-500">Bank role determines access & permissions</p>
          </div>
        </div>
      </div>

      {/* Section 4: Joined Date */}
      <div className="bg-white border border-[#3cb0c9]/20 p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-3 text-gray-700">
          <Calendar className="text-[#3cb0c9]" />
          <div>
            <p className="font-medium">Member Since:</p>
            <p className="text-sm text-gray-500">
              {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
