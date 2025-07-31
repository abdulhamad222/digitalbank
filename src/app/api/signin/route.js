import { connectDB } from '@/config/mongodb';
import User from '@/models/User';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ message: 'Email and password are required' }), { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
    }

    const { password: _, ...userData } = user._doc;

    return new Response(JSON.stringify({ message: 'Login successful', user: userData }), { status: 200 });
  } catch (error) {
    console.error('Signin error:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
