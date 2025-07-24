import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema({
  name: String,
  email: String,
  amount: Number,
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Loan || mongoose.model('Loan', loanSchema);
