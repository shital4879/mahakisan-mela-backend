import mongoose from 'mongoose';

const RegisterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
  },
  address: {
    type: String,
    required: true,
    trim: true
  },

  // Optional fields - you can keep or remove them
  company: {
    type: String,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    default: ''
  },
  category: {
    type: String,
    trim: true,
    default: ''
  },
  amount: {
    type: Number,
    default: null
  },
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Cancelled'],
    default: 'Pending'
  }
}, { timestamps: true });

export default mongoose.model('Register', RegisterSchema);
