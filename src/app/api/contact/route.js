import { NextResponse } from 'next/server';
import Contact from '@/models/Contact';
import { connectDB } from '@/lib/mongodb';

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await Contact.create({ name, email, message });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact Form Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
