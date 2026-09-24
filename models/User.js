import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },

  profilePic: { type: String },


  isProfileSaved: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },

  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || model("User", UserSchema);