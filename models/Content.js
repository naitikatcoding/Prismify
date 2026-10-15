import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    rawInput: {
      type: String,
      required: true,
      trim: true,
    },
    tone: {
      type: String,
      enum: ["Professional", "Conversational", "Bold"],
      default: "Professional",
    },
    outputs: {
      twitterThread: [String],
      linkedinPost: String,
      newsletter: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Content || mongoose.model("Content", ContentSchema);
