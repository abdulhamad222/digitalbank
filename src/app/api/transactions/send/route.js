import { connectDB } from '@/config/mongodb';
import User from '@/models/User';
import Transaction from '@/models/Transaction';

export async function POST(req) {
  try {
    const { from, to, amount } = await req.json();

    if (!from || !to || !amount || amount <= 0) {
      return new Response(JSON.stringify({ message: 'Invalid data' }), { status: 400 });
    }

    await connectDB();

    const sender = await User.findById(from);
    const receiver = await User.findById(to);

    if (!sender || !receiver) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    if ((sender.capital ?? 999) < amount) {
      return new Response(JSON.stringify({ message: 'Insufficient balance' }), { status: 400 });
    }

    // Update capitals
    sender.capital = (sender.capital ?? 999) - amount;
    receiver.capital = (receiver.capital ?? 999) + amount;

    await sender.save();
    await receiver.save();

    // Create transactions for both users
    await Transaction.create([
      { userId: from, title: `Sent to ${receiver.name}`, type: 'sent', amount },
      { userId: to, title: `Received from ${sender.name}`, type: 'received', amount },
    ]);

    return new Response(JSON.stringify({ message: 'Transfer successful' }), { status: 200 });
  } catch (err) {
    console.error('Transfer error:', err);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
