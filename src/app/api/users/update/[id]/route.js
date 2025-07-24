import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const data = await req.json();
    const updates = { name: data.name, email: data.email };

    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(data.password, salt);
    }

    if (data.kyc) updates.kyc = data.kyc;

    await User.findByIdAndUpdate(params.id, updates);
    return NextResponse.json({ message: 'Profile updated' });
  } catch (err) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
