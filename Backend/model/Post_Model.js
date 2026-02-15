import e from "express";
import mongoose from "mongoose";

const post_model = new mongoose.Schema({
  user_id: { type: String, required: true },
  image_url: [{ type: String, required: true }],
  description: { type: String },
  like: { type: Number, default: 0 },
  comment: [{ type: String }],
  timestamp: { type: Date, default: Date.now },
});

export const Post = mongoose.model("Post", post_model);
