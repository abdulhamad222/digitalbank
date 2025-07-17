import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(req) {
  try {
    const email = JSON.parse(req.headers.get('user-email') || '""');
    if (!email) return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });

    await connectDB();
    const user = await User.findOne({ email });

    return new Response(JSON.stringify({ capital: user.capital, history: user.transactions }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { to, amount } = await req.json();
    const senderEmail = JSON.parse(req.headers.get('user-email') || '""');
    if (!senderEmail) return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });

    await connectDB();

    const sender = await User.findOne({ email: senderEmail });
    const receiver = await User.findOne({ email: to });

    if (!receiver) return new Response(JSON.stringify({ message: 'Receiver not found' }), { status: 404 });
    if (sender.capital < amount) return new Response(JSON.stringify({ message: 'Insufficient funds' }), { status: 400 });

    // Update sender
    sender.capital -= amount;
    sender.transactions.push({ type: 'sent', to, amount });
    await sender.save();

    // Update receiver
    receiver.capital += amount;
    receiver.transactions.push({ type: 'received', from: senderEmail, amount });
    await receiver.save();

    return new Response(JSON.stringify({ message: 'Success' }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Error' }), { status: 500 });
  }
}
