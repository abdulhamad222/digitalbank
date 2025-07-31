import mongoose from 'mongoose';

const EMISchema = new mongoose.Schema({
  month: String,
  amount: Number,
  status: { type: String, enum: ['Paid', 'Unpaid'], default: 'Unpaid' },
});

const LoanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: Number,
  emi: Number,
  duration: Number,
  cnic: String,
  phone: String,
  address: String,
  picture: String,
  emis: [EMISchema],
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Loan || mongoose.model('Loan', LoanSchema);