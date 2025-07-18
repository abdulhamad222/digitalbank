import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: String,
  type: { type: String, enum: ['sent', 'received'], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  source: String,
});

export default mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
