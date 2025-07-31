import { NextResponse } from 'next/server';
import { connectDB } from '@/config/mongodb';
import User from '@/models/User';
import Transaction from '@/models/Transaction';
import Bill from '@/models/Bill';

export const dynamic = 'force-dynamic'; // ensure SSR data is always fresh

export async function GET() {
  try {
    await connectDB();

    const users = await User.find({});
    const transactions = await Transaction.find({}).sort({ date: -1 }).limit(5); // latest 5
    const bills = await Bill.find({});

    const totalCapital = users.reduce((sum, user) => sum + (user.capital || 0), 0);
    const totalTransactions = await Transaction.countDocuments();
    const totalBills = bills.length;
    const pendingBills = bills.filter(b => b.status === 'Pending');

    // Attach username to each transaction and pending bill
    const userMap = {};
    users.forEach(u => userMap[u._id.toString()] = u.fullName || u.email);

    const recentTransactions = transactions.map(t => ({
      ...t._doc,
      userName: userMap[t.userId?.toString()] || 'Unknown',
    }));

    const pendingBillsWithName = pendingBills.map(b => ({
      ...b._doc,
      userName: userMap[b.userId?.toString()] || 'Unknown',
    }));

    return NextResponse.json({
      totalUsers: users.length,
      totalCapital,
      totalTransactions,
      totalBills,
      pendingBills: pendingBills.length,
      recentTransactions,
      pendingBills: pendingBillsWithName,
    });

  } catch (error) {
    console.error('Admin Summary Error:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
