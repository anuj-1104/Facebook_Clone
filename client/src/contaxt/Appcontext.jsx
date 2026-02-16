import React, { createContext, useContext, useEffect, useState } from "react";
import App from "../App";
import { useNavigate } from "react-router-dom";
import profile_image from "../assets/profile_icon.png";

export const Appcontext = createContext();

//import in main file access all child
export const ContextProvider = ({ children }) => {
  const name = "hello";

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const value = { name, navigate, profile_image, token };
  return <Appcontext.Provider value={value}>{children}</Appcontext.Provider>;
};

//used in all pages to access all characteristics
export const useAppcontext = () => useContext(Appcontext);
