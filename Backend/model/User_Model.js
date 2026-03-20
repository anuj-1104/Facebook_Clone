import mongoose, { Types } from "mongoose";

const user_model = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_image: { type: String },
    role: { type: String, default: "User" },
    description: { type: String },
    personalDetail: {
      bio: { type: String, default: "" },
      location: { type: String, default: "" },
      personal: { type: String, default: "" },
      information: { type: String, default: "" },
    },
    friends: [{ type: Object }],
  },
  { timestamps: true },
);

export const User = mongoose.model("User", user_model);
