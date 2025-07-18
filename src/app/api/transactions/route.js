import { connectDB } from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await connectDB();
    const userId = req.nextUrl.searchParams.get('userId');

    const transactions = await Transaction.find({ userId }).sort({ date: -1 });

    return NextResponse.json({ transactions });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}
