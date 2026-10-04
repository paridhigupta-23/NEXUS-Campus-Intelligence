import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: String,
  description: String,
  location: String,
  locationText: String
});

resourceSchema.index({ location: "2dsphere" });

export const Resource = mongoose.model("Resource", resourceSchema);
