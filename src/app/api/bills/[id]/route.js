import { NextResponse } from 'next/server';
import { connectDB } from '@/config/mongodb';
import Bill from '@/models/Bill';

export const DELETE = async (req, { params }) => {
  const { id } = params;

  try {
    await connectDB();
    const deletedBill = await Bill.findByIdAndDelete(id);

    if (!deletedBill) {
      return NextResponse.json({ message: 'Bill not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Bill deleted successfully' });
  } catch (err) {
    return NextResponse.json({ message: 'Failed to delete bill' }, { status: 500 });
  }
};
