import { connectDB } from "@/config/mongodb";
import Transaction from "@/models/Transaction";
import User from "@/models/User";


export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return new Response(JSON.stringify({ message: 'User ID required' }), { status: 400 });
    }

    const user = await User.findById(userId);
    const transactions = await Transaction.find({ userId });

    const totalSent = transactions
      .filter(t => t.type === 'sent')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalReceived = transactions
      .filter(t => t.type === 'received')
      .reduce((sum, t) => sum + t.amount, 0);

    return new Response(JSON.stringify({
      capital: user.capital !== undefined ? user.capital : 999,
      totalSent,
      totalReceived,
      transactions,
    }), { status: 200 });
  } catch (err) {
    console.error('Error in summary:', err);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
