import mongoose from 'mongoose';

const StallBookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  type: {
    type: String,
    enum: [
      'STD Stall',
      'Compact Stall',
      'Food Court Stall',
      'Indoor Open Area Stall',
      'Outdoor Open Area Stall',
      'Bench Space'
    ],
    required: true
  },
  email: { type: String },
  category: { type: String },
  amount: { type: Number },
  status: { type: String },
  date: { type: Date }
}, { timestamps: true });

export default mongoose.model('StallBooking', StallBookingSchema);
