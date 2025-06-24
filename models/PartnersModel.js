import mongoose from "mongoose";

const PartnersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Academic', 'Industrial', 'Media'],
    required: true
  }
}, { timestamps: true });

const Partners = mongoose.model("Partners", PartnersSchema);
export default Partners;
