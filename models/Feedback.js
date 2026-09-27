import mongoose from "mongoose";

const { Schema, model } = mongoose;

const FeedbackSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "Anonymous",
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    category: {
      type: String,
      default: "General Feedback",
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    subject: {
      type: String,
      trim: true,
      default: "Website Feedback",
    },
    message: {
      type: String,
      required: [true, "Feedback message is required"],
      trim: true,
    },
    emailSent: {
      type: Boolean,
      default: false,
    },
    ipAddress: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Feedback || model("Feedback", FeedbackSchema);
