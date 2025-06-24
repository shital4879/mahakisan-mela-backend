import mongoose from "mongoose";

const SponsorshipSchema = new mongoose.Schema({
  contactPerson: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Mobile number must be 10 digits']
  },
  email: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ['Platinum', 'Gold', 'Silver'], 
    required: true,
  }
}, { timestamps: true });

const Sponsorship = mongoose.model("Sponsorship", SponsorshipSchema);
export default Sponsorship;
