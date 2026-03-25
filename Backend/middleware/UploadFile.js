import multer from "multer";
import axios from "axios";
import FormData from "form-data";
import dotenv from "dotenv";

dotenv.config();

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const upload_image = async (file) => {
  try {
    const bbImageApiKey = process.env.BB_IMAGE_API;

    const base64Image = file.buffer.toString("base64");

    const formdata = new FormData();
    formdata.append("image", base64Image);

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${bbImageApiKey}`,
      formdata,
      {
        headers: formdata.getHeaders(),
      },
    );

    return response.data.data.url;
  } catch (error) {
    console.log("Single upload error:", error.response?.data || error.message);
    throw error;
  }
};

export const upload_images = async (files) => {
  try {
    const bbImageApiKey = process.env.BB_IMAGE_API;

    const uploadPromises = files.map(async (file) => {
      const base64Image = file.buffer.toString("base64");

      const formdata = new FormData();
      formdata.append("image", base64Image);

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${bbImageApiKey}`,
        formdata,
        {
          headers: formdata.getHeaders(),
        },
      );

      return response.data.data.url;
    });

    const urls = await Promise.all(uploadPromises);

    return urls;
  } catch (error) {
    console.log(
      "Multiple upload error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export default cloudinary;
