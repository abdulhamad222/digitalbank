import { NextResponse } from 'next/server';
import { connectDB } from '@/config/mongodb';
import Transaction from '@/models/Transaction';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();

    const transactions = await Transaction.find({}).sort({ date: -1 });
    const users = await User.find({});
    const userMap = {};
    users.forEach(u => userMap[u._id.toString()] = u.fullName || u.email);

    const totalSent = transactions
      .filter(t => t.type === 'sent')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalReceived = transactions
      .filter(t => t.type === 'received')
      .reduce((sum, t) => sum + t.amount, 0);

    const transactionsWithUser = transactions.map(t => ({
      ...t._doc,
      userName: userMap[t.userId?.toString()] || 'Unknown',
    }));

    return NextResponse.json({
      totalSent,
      totalReceived,
      transactions: transactionsWithUser,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch admin transactions' }, { status: 500 });
  }
}
