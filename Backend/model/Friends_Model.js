import mongoose from "mongoose";

const friends_model = new mongoose.Schema(
  {
    sender: { type: String },
    request: { type: String },
    reciver: { type: String },
    status: { type: String, default: "unfriend" },
  },
  { timestamp: { type: Date, default: Date.now } },
);

export const Friends = mongoose.model("friends", friends_model);
