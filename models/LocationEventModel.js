import mongoose from "mongoose";

const LocationEventSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  day: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const LocationEvent = mongoose.model("LocationEvent", LocationEventSchema);
export default LocationEvent;
