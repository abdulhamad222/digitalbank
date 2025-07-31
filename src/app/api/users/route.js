import { connectDB } from '@/config/mongodb';
import User from '@/models/User';

export async function GET() {
  await connectDB();
  const users = await User.find({}, '_id name email');
  return new Response(JSON.stringify(users), { status: 200 });
}
