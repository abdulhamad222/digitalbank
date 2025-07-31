import { NextResponse } from 'next/server';
import { connectDB } from '@/config/mongodb';
import Bill from '@/models/Bill';

export async function POST(request) {
  const body = await request.json();
  const { userId, name } = body;

  try {
    await connectDB();

    const updated = await Bill.findOneAndUpdate(
      { userId, name },
      { status: 'Paid' },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Bill not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error('Error updating bill status:', err);
    return NextResponse.json({ error: 'Failed to update bill' }, { status: 500 });
  }
}
