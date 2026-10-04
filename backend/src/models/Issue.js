import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  location: String,
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  status: { type: String, enum: ["open", "progress", "resolved"], default: "open" },
  reportedBy: String
}, { timestamps: true });

export const Issue = mongoose.model("Issue", issueSchema);
