import mongoose from "mongoose";

const ResourcePersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  occupation: {
    type: String,
    enum: ['farmer', 'scientist', 'entrepreneur', 'media person', 'policy maker', 'others'],
    required: true,
  },
  address: { type: String },
  email: { type: String },
  experience: { type: String },
  biodata: { type: String }, // path to uploaded file
  mobile: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Mobile number must be 10 digits']
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Rejected'],
    default: 'Pending'
  },
  type: {
    type: String,
  },
}, { timestamps: true });

const ResourcePerson = mongoose.model("ResourcePerson", ResourcePersonSchema);
export default ResourcePerson;