import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rawInput: {
    type: String,
    required: true
  },
  tone: {
    type: String,
    default: 'Professional'
  },
  outputs: {
    twitterThread: [String], 
    linkedinPost: String,
    newsletter: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Content || mongoose.model("Content", ContentSchema);
