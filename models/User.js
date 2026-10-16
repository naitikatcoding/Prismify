import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, trim: true, default: "" },

    email: { type: String, required: true, unique: true, lowercase: true, trim: true },

    profilePic: { type: String },

    isProfileSaved: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || model("User", UserSchema);