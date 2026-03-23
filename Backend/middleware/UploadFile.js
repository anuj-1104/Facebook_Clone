import multer from "multer";
import axios from "axios";
import FormData from "form-data";

// ✅ Use memory storage (IMPORTANT for buffer)
const storage = multer.memoryStorage();

export const upload = multer({ storage });

/* ────────────────────────────────────────────────
   Upload Single Image to imgbb
──────────────────────────────────────────────── */
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

/* ────────────────────────────────────────────────
   Upload Multiple Images to imgbb
──────────────────────────────────────────────── */
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

    console.log("Uploaded URLs:", urls);

    return urls;
  } catch (error) {
    console.log(
      "Multiple upload error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
