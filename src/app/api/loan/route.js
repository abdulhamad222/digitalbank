import { NextResponse } from 'next/server';
import Loan from '@/models/Loan';
import { connectDB } from '@/lib/mongodb';

// GET: Fetch loan by userId
export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) return NextResponse.json({ message: 'Missing userId' }, { status: 400 });

  const loan = await Loan.findOne({ userId });
  return NextResponse.json({ loan });
}

// POST: Create a new loan
export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const { userId, amount, emi, duration, cnic, phone, address, picture } = body;

  const loan = await Loan.create({
    userId,
    amount,
    emi,
    duration,
    cnic,
    phone,
    address,
    picture,
    emis: Array.from({ length: duration }, (_, i) => ({
      month: new Date(new Date().setMonth(new Date().getMonth() + i)).toLocaleString('default', { month: 'long' }),
      status: 'Unpaid',
    })),
  });

  return NextResponse.json({ loan }, { status: 201 });
}
