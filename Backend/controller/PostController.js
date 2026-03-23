import { Post } from "../model/Post_Model.js";
import jwt from "jsonwebtoken";
import { User } from "../model/User_Model.js";
import { upload_images } from "../middleware/UploadFile.js";

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
