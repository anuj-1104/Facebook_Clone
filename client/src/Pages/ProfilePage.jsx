import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { useAppcontext } from "../contaxt/Appcontext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const profile_image = localStorage.getItem("profile_image");

  const { user } = useAppcontext();
  const loginUser = JSON.parse(user); //convert a json data i
  const navigate = useNavigate();

  return (
    <>
      <div className="relative z-1000">
        <div className="w-full h-40">
          <div className="text-white absolute rounded-full justify-center-safe cursor-pointer  m-2 w-8 h-8 bg-white/20 backdrop-blur-md">
            <GoArrowLeft
              className="text-2xl transition hover:-translate-x-1 duration-150 m-1"
              onClick={() => navigate("/home")}
            />
          </div>
          <img
            src={`http://localhost:8080/${profile_image}`} //cover image
            alt="cover_image"
            className="w-full h-full object-cover bg-gray-400 "
          />
        </div>
        <div className="absolute top-28 m-3 flex gap-5 ">
          <img
            src={`http://localhost:8080/${profile_image}`} //profile image
            alt="profile_image "
            className="w-25 h-25 rounded-full bg-black "
          />
          <h4 className="font-bold flex top-10  relative">
            {loginUser.name.toUpperCase()}
          </h4>
        </div>
        <hr />
        <div className=" ">
          <div className="top-15 p-3 relative ">
            <p>Bio</p>
            <p>Location</p>
            <p>Personal</p>
            <p>Information</p>
            <hr className="rounded-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
