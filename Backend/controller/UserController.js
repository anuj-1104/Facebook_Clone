import { User } from "../model/User_Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Post } from "../model/Post_Model.js";

export const userLogin = async (req, res) => {
  try {
    const user = req.body;

    const users_find = await User.findOne({ email: user.email });

    if (!users_find) {
      res.status(404).json({ message: "user not found registration first" });
      return;
    }
    const result = await bcrypt.compare(user.password, users_find.password);

    if (!result) {
      res.status(404).json({ message: "password not match" });
      return;
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
      profile_image:users_find.profile_image,
      token: user_token,
    });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error:${error} ` });
  }
};

export const userRegistration = async (request, response) => {
  try {
    const data = request.body;
    const file = request.file;

    console.log(file);
    console.log(data);

    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
      return response.status(409).json({ message: "User already existing" });
    }

    const hash_password = await bcrypt.hash(data.password, 10);

    const user_data = new User({
      name: data.name,
      email: data.email,
      password: hash_password,
      profile_image: file.path,
      description: data.description || null,
    });
    await user_data.save();

    response.status(200).json({ message: "user registration successfully" });
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error " });
  }
};

export const userPost = async (req, res) => {
  try {
    const requestData = req.body;

    const postData = new Post({
      user_id: req.user,
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
    if (!userPost) {
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
      res.status(404).json({ message: "NOt found post" });
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
    const { id } = req.params;

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
    const { id } = req.params;
    const { comment } = req.body;

    const post_Data = await Post.findByIdAndUpdate(
      id,
      { $push: { comment: comment } },
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
