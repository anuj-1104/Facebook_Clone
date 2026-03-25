import { Post } from "../model/Post_Model.js";
import { User } from "../model/User_Model.js";
import { upload_images } from "../middleware/UploadFile.js";
import cloudinary from "../middleware/UploadFile.js";
import streamifier from "streamifier";
import { Videos } from "../model/Videos_Model.js";

export const postController = async (req, res) => {
  try {
    console.log("running image uploded");
    const files = req.files;
    const { description } = req.body; //destructuring
    const userId = req.user;

    if (!files || files.length === 0 || !userId) {
      return res.status(400).json({ message: "User Find Error or file error" });
    }
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User Not Found !" });
    }

    const urls = await upload_images(files);

    const post = new Post({
      user_id: user._id,
      image_url: urls,
      description: description,
      user_name: user.name,
      profile_image: user.profile_image,
    });

    const data = await post.save();

    res.status(200).json({ message: "Post Upload Successfully !", data });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error !" });
  }
};

export const videoUpload = async (req, res) => {
  try {
    console.log("running");
    const file = req.file;
    const { description } = req.body;
    const userId = req.user._id.toString();

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "video", // IMPORTANT
            folder: "videos",
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          },
        );

        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    const result = await streamUpload(file.buffer);
    console.log(result);

    const video = new Videos({
      user_id: userId,
      user_name: user.name,
      profile_image: user.profile_image,
      description: description,
      video_url: result.secure_url,
    });

    const response = await video.save();

    res.status(200).json({
      message: "Video uploaded successfully",
      data: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const allVideos = async (req, res) => {
  try {
    const data = await Videos.find();

    if (!Videos) {
      return res.status(404).json({ message: "Videos not found" });
    }

    res.status(200).json({ message: "Find Videos", data: data });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
