import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    klass: { type: String, required: true },
    skills: { type: String, required: true },
    bio: { type: String, required: true, maxlength: 300 },
    // Store small images as dataURI to keep hosting simple; or store external URL
    avatar: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('Member', MemberSchema);
