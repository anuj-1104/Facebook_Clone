import { User } from "../model/User_Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Post } from "../model/Post_Model.js";
import axios from "axios";
import FormData from "form-data";
import multer from "multer";

export const userLogin = async (req, res) => {
  try {
    const user = req.body;

    const users_find = await User.findOne({ email: user.email });

    if (users_find === null) {
      return res
        .status(404)
        .json({ message: "user not found registration first" });
    }
    const result = await bcrypt.compare(user.password, users_find.password);

    if (!result) {
      return res.status(404).json({ message: "Incorrect Password " });
    }

    const payload = {
      id: users_find._id,
      email: users_find.email,
      name: users_find.name,
    };

    const user_token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h",
      algorithm: process.env.ALGORITHEM,
    });

    res.status(200).json({
      message: "Login successfully.",
      user: payload,
      profile_image: users_find.profile_image,
      token: user_token,
    });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error:${error} ` });
  }
};
const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const userRegistration = async (req, res) => {
  try {
    const data = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ message: "Image Required" });

    // Convert file buffer to base64
    const base64Image = file.buffer.toString("base64");

    const formdata = new FormData();
    formdata.append("image", base64Image);

    // ImgBB API requires key in query parameter
    const bbImageApiKey = process.env.BB_IMAGE_API ?? "";

    const bbResponse = await axios.post(
      `https://api.imgbb.com/1/upload?key=${bbImageApiKey}`,
      formdata,
      { headers: formdata.getHeaders() },
    );

    const imageUrl = bbResponse.data.data.url;

    // Check if user exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser)
      return res.status(409).json({ message: "User already exists" });

    // Hash password
    const hash_password = await bcrypt.hash(data.password, 10);

    // Create user
    const user_data = new User({
      name: data.name,
      email: data.email,
      password: hash_password,
      profile_image: imageUrl || "",
      description: data.description || null,
    });

    await user_data.save();

    res
      .status(200)
      .json({ message: "User registered successfully", user: user_data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const CurrentUser = async (req, res) => {
  try {
    const user_id = req.user;

    const user_Data = await User.findById({ _id: user_id }).select("-password");

    if (!user_Data) {
      return res.status(404).json({ message: "User not Found" });
    }
    res.status(200).json({ message: "Current Login User .", data: user_Data });
  } catch (error) {
    console.log(error);
  }
};

export const FrogetPassword = async (req, res) => {
  try {
    const user = req.body;

    const find_user = await User.findOne({ email: user.email });

    if (!find_user) {
      return res.status(404).json({ message: "user Not Found" });
    }

    const verify_pass = await bcrypt.compare(user.password, find_user.password);

    if (!verify_pass) {
      return res.status(404).json({ message: "Password Incorrect" });
    }

    const hash_password = await bcrypt.hash(user.confirm_pass, 10);

    const updated_password = await User.updateOne(
      { _id: find_user._id },
      {
        password: hash_password,
      },
    );

    if (!updated_password) {
      res.status(422).json({ message: "error" });
    }

    res.status(200).json({ message: "password updated successfully " });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const  userFind = async (req, res) => {
//   try {
//     const { _id } = req.body;
//     const response = await User.findById(_id).select("-password");
//     if (!response) {
//       return res.status(404).json({ message: "User Not Found" });
//     }

//     res.status(200).json({ message: "Login User Data..", data: response });
//   } catch (error) {
//     return res.status(500).json({ messsage: "Internal Server Error " });
//   }
// };

export const userFind = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({
        message: "Invalid ID list",
        type: typeof ids,
      });
    }

    //removed duplicate id used a set
    const uniqueIds = [...new Set(ids)];

    const users = await User.find({
      _id: { $in: uniqueIds },
    }).select("-password");

    console.log(users);

    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const User_lists = async (req, res) => {
  try {
    const user = req.user;

    const allusers = await User.find().select("-password");
    if (!allusers) {
      return res.status(404).json({ message: "users not found" });
    }

    //can not response user login
    const data = allusers.filter(
      (item) => item._id.toString() != user.toString(),
    );

    console.log(data);

    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error " });
  }
};

export const userPost = async (req, res) => {
  try {
    const requestData = req.body;
    const user_id = req.user;
    const response = await User.findOne({ _id: user_id });

    if (!response) {
      return res.send(404).json({ message: "User Not Found" });
    }

    const postData = new Post({
      user_id: response._id,
      user_name: response.name,
      profile_image: response.profile_image,
      image_url: requestData.image_url,
      description: requestData.description,
      comment: requestData.comment,
      like: requestData.like,
    });

    const post = await postData.save();
    res.status(200).json({ message: "Image post", data: post });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error !" });
  }
};

export const userAllPost = async (req, res) => {
  try {
    const { user_id } = req.body;
    const userPost = await Post.find({ user_id: user_id });

    if (userPost.length <= 0) {
      res.status(404).json({ message: "User Post Not Found " });
      return;
    }
    res.status(200).json({ message: "find post", data: userPost });
  } catch (errot) {
    res.status(500).json({ message: "Internal Server Error " });
  }
};

export const AllPost = async (_, res) => {
  try {
    const userPost = await Post.find();

    if (userPost.length <= 0) {
      res.status(401).json({ message: "User Post Not Found " });
      return;
    }
    res.status(200).json({ message: "find post", data: userPost });
  } catch (errot) {
    res.status(500).json({ message: "Internal Server Error " });
  }
};

export const updateDataPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, image_url } = req.body;

    // const user_post=await Post.findOne({"_id":id});

    const update_post = await Post.findByIdAndUpdate(
      id,
      { description, image_url },
      { returnDocument: "after" },
    );

    if (!update_post) {
      res.status(404).json({ message: "Not found post" });
      return;
    }

    res
      .status(200)
      .json({ message: "Post Update Successfully .", data: update_post });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error " });
  }
};

export const update_like = async (req, res) => {
  try {
    const { id } = req.body;

    const post_Data = await Post.findByIdAndUpdate(
      id,
      { $inc: { like: 1 } },
      { returnDocument: "after" },
    );

    if (!post_Data) {
      res.status(404).json({ message: "post not found" });
      return;
    }
    res
      .status(200)
      .json({ message: "Like Updated successfully", data: post_Data });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const add_Comment = async (req, res) => {
  try {
    const { id, comment } = req.body;

    const post_Data = await Post.findByIdAndUpdate(
      id,
      { $push: { comment: comment } }, //like a array push all new methods
      { returnDocument: "after" },
    );

    if (!post_Data) {
      res.status(404).json({ message: "post not found" });
      return;
    }
    res.status(200).json({ message: "Comment  successfully", data: post_Data });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const ProfileController = async (req, res) => {
  try {
    const { bio, location, personal, information } = req.body;
    const user_id = req.user;

    const response = await User.findById(user_id);

    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }

    const user_update = await User.findByIdAndUpdate(
      { _id: response._id },
      {
        $set: {
          personalDetail: {
            bio,
            location,
            personal,
            information,
          },
        },
      },
    );
    res.status(200).json({ message: "user data updated", data: user_update });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error " });
  }
};

export const UserfriendsController = async (req, res) => {
  try {
    const _id = req.user;

    if (!_id) {
      return res.status(400).josn({ message: "User Not Found" });
    }

    const user = await User.findById(_id).select("-password");

    if (!user) {
      return res.staus(404).josn({ message: "User Not Found" });
    }

    const allfriends = user?.friends;
    // const filterfriends=allfriends

    res.status(200).json({ message: "All Friends", friends: allfriends });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
