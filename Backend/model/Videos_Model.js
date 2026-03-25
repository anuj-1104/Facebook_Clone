import mongoose from "mongoose";

const Videos_model = new mongoose.Schema({
  user_id: { type: String, required: true },
  user_name: { type: String },
  profile_image: { type: String },
  video_url: { type: String, required: true },
  description: { type: String },
  like: { type: Number, default: 0 },
  comment: [{ type: String }],
});

export const Videos = mongoose.model("Videos", Videos_model);
