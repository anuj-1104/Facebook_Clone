import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import profile_image from "../assets/profile_icon.png";
import { LuImages } from "react-icons/lu";

const ProfileBar = () => {
  const navigate = useNavigate();
  const [searchquery, setSearchQuery] = useState("");

  const profile_image = localStorage.getItem("profile_image");

  const handllerProfile = () => {
    navigate("/profile");
  };

  //fiexed the ui
  return (
    <div className="w-full grid grid-cols-2  bg-white  fixed top-20">
      <div className="p-2 flex gap-4">
        <img
          src={`http://localhost:8080/${profile_image}`} //used a express static routes
          alt="profile_image"
          onClick={handllerProfile}
          className="rounded-full w-10 fixed h-10"
        />

        <input
          type="text"
          name="search"
          value={searchquery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-black p-1 relative left-12  border-2 rounded-2xl "
          placeholder="What's on your mind ? "
        />
      </div>
      <div className="flex flex-row-reverse p-3">
        <LuImages className="text-4xl justify-end-safe" />
      </div>
      <hr />
      <hr />
    </div>
  );
};

export default ProfileBar;
