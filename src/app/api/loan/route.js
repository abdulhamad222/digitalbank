import { NextResponse } from 'next/server';
import { connectDB } from "@/lib/mongodb";
import Loan from '@/models/Loan';

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const newLoan = new Loan(data);
  await newLoan.save();
  return NextResponse.json({ message: 'Loan request saved' }, { status: 201 });
}
