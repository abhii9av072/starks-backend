import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startDate: { type: String },
  completeDate: { type: String },
  description: { type: String },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
