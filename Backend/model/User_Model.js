import mongoose, { Types } from "mongoose";

const user_model = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile_image: { type: String },
  role: { type: String, default: "User" },
  description: { type: String },
  personalDetail: {
    bio: { type: String },
    location: { type: String },
    personal: { type: String },
    information: { type: String },
  },
  friends: [{ type: Object }],
  timestamp: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", user_model);
