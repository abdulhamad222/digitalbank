import { NextResponse } from 'next/server';
import { connectDB } from '@/config/mongodb';
import Bill from '@/models/Bill';

export const dynamic = 'force-dynamic';

// GET: Fetch bills
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

// POST: Create new bill
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const newBill = await Bill.create({
      name: body.name,
      amount: body.amount,
      dueDate: body.dueDate,
      userId: body.userId,
      status: 'Pending',
    });

    return NextResponse.json(newBill, { status: 201 });
  } catch (error) {
    console.error('Error creating bill:', error);
    return NextResponse.json({ error: 'Failed to create bill' }, { status: 500 });
  }
}
