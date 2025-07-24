import mongoose from 'mongoose';

const LoanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: Number,
  emi: Number,
  duration: Number,
  cnic: String,
  phone: String,
  address: String,
  picture: String,
}, { timestamps: true });

export default mongoose.models.Loan || mongoose.model('Loan', LoanSchema);
