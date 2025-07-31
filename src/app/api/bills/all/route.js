import { NextResponse } from 'next/server';
import { connectDB } from '@/config/mongodb';
import Bill from '@/models/Bill';

export const GET = async () => {
  try {
    await connectDB();
    const bills = await Bill.find().populate('userId', 'fullName email'); // optional: show user details
    return NextResponse.json(bills);
  } catch (err) {
    return NextResponse.json({ message: 'Failed to fetch all bills' }, { status: 500 });
  }
};
