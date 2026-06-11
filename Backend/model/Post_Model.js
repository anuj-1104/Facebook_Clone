import mongoose from "mongoose";

const post_model = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    user_name: { type: String },
    profile_image: { type: String },
    image_url: [{ type: String, required: true }],
    description: { type: String },
    like: { type: Number, default: 0 },
    likeduser: [{ type: String }],
    comment: [{ type: String }],
  },
  { timestamps: true },
);

export const Post = mongoose.model("Post", post_model);
