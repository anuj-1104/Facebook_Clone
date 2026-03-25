import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profile_image from "../assets/profile_icon.png";
import axios from "../api/axios";

export const Appcontext = createContext();

export const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [videosdata, setVideosData] = useState([]);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handlerlikes = async (id) => {
    try {
      const response = await axios.patch("api/user/like/id", { id }); //used only end point

      if (response.status === 200) {
        return id;
      }
    } catch (error) {
      console.error(`error: ${error.response}`);
      return null;
    }
  };

  useEffect(() => {
    const handleVideos = async () => {
      if (!token) {
        console.log("Token not Found");
        return;
      }
      try {
        const response = await axios.get("/api/post/videos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setVideosData(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleVideos();
  }, [token]);

  const getImageGridClass = (imageCount) => {
    if (imageCount === 1) return "grid-cols-1 item-center";
    if (imageCount === 2) return "grid-cols-2";
    if (imageCount === 3) return "grid-cols-3";
    if (imageCount === 4) return "grid-cols-2";
    return "grid-cols-2 sm:grid-cols-3";
  };

  const value = {
    navigate,
    profile_image,
    token,
    user,
    videosdata,
    handlerlikes,
    getImageGridClass,
  };
  return <Appcontext.Provider value={value}>{children}</Appcontext.Provider>;
};

//used in all pages to access all characteristics
export const useAppcontext = () => useContext(Appcontext);
