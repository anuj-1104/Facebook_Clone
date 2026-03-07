import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profile_image from "../assets/profile_icon.png";
import axios from "../api/axios";

export const Appcontext = createContext();

export const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [friendsrequest, setFriendsRequest] = useState([]);

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

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

  const value = {
    navigate,
    profile_image,
    token,
    friendsrequest,
    user,
    handlerlikes,
  };
  return <Appcontext.Provider value={value}>{children}</Appcontext.Provider>;
};

//used in all pages to access all characteristics
export const useAppcontext = () => useContext(Appcontext);
