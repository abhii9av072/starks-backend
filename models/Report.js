import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    author: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
