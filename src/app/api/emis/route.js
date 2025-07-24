import { NextResponse } from 'next/server';
import Loan from '@/models/Loan';
import { connectDB } from '@/lib/mongodb';

// GET: Fetch EMI list
export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) return NextResponse.json({ message: 'Missing userId' }, { status: 400 });

  const loan = await Loan.findOne({ userId });
  if (!loan) return NextResponse.json({ emis: [] });

  return NextResponse.json({ emis: loan.emis });
}
