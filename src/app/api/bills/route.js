import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Bill from '@/models/Bill';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  try {
    await connectDB();

    const query = userId ? { userId } : {};
    const bills = await Bill.find(query).sort({ dueDate: 1 });

    return NextResponse.json(bills);
  } catch (error) {
    console.error('Error fetching bills:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
