import { NextResponse } from 'next/server';
import { connectDB } from '@/config/mongodb';
import Loan from '@/models/Loan';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    const allLoans = await Loan.find().sort({ date: -1 }); // most recent first

    return NextResponse.json({ loans: allLoans });
  } catch (error) {
    console.error('Error fetching all loans:', error);
    return NextResponse.json({ error: 'Failed to fetch loans' }, { status: 500 });
  }
}
