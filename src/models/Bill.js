import mongoose from 'mongoose';

const BillSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: String,
  amount: Number,
  dueDate: String,
  status: { type: String, enum: ['Pending', 'Scheduled', 'Paid'], default: 'Pending' },
});

export default mongoose.models.Bill || mongoose.model('Bill', BillSchema);
