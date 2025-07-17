import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  capital: {
    type: Number,
    default: 1000,
  },
  transactions: [
    {
      type: {
        type: String,
        enum: ['sent', 'received'],
      },
      to: String,
      from: String,
      amount: Number,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
