import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending',
  },
}, { timestamps: true });

const Bill = mongoose.models.Bill || mongoose.model('Bill', billSchema);
export default Bill;
