import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profile_image from "../assets/profile_icon.png";
import axios from "../api/axios";

export const Appcontext = createContext();

//import in main file access all child
export const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [friendsrequest, setFriendsRequest] = useState([]);

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  useEffect(() => {
    const NotificationFriends = async () => {
      try {
        const response = await axios.get("/api/request/friend/notification");

        if (response.status === 200) {
          setFriendsRequest(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    NotificationFriends();
  }, [token]);

  const value = { navigate, profile_image, token, friendsrequest, user };
  return <Appcontext.Provider value={value}>{children}</Appcontext.Provider>;
};

//used in all pages to access all characteristics
export const useAppcontext = () => useContext(Appcontext);
