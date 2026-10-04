import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  department: String,
  date: Date,
  location: String,
  capacity: Number,
  registered: { type: Number, default: 0 },
  match: { type: Number, default: 0 },
  recommended: { type: Boolean, default: false },
  point: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], default: [78.4867, 17.385] }
  }
}, { timestamps: true });

eventSchema.index({ point: "2dsphere" });

export const Event = mongoose.model("Event", eventSchema);
