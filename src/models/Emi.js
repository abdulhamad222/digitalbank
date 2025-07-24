import mongoose from "mongoose";

const emiSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  loanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan', required: true },
  month: String,
  dueDate: Date,
  amount: Number,
  status: { type: String, enum: ['Paid', 'Unpaid'], default: 'Unpaid' },
});

const Emi = mongoose.models.Emi || mongoose.model("Emi", emiSchema);

export default Emi;
