import { NextResponse } from 'next/server';
import { connectDB } from '@/config/mongodb';
import Bill from '@/models/Bill';

export const PATCH = async (req, { params }) => {
  const { id } = params;

  try {
    await connectDB();
    const updatedBill = await Bill.findByIdAndUpdate(id, { status: 'Paid' }, { new: true });

    if (!updatedBill) {
      return NextResponse.json({ message: 'Bill not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Bill marked as paid', bill: updatedBill });
  } catch (err) {
    return NextResponse.json({ message: 'Error updating bill' }, { status: 500 });
  }
};
