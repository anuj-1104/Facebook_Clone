import React, { useState, useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import FriendsList from "../component/FriendsList";
import UserPost from "./UserPost";
import axios from "../api/axios";

const ProfilePage = () => {
  const profile_image = localStorage.getItem("profile_image");
  const userobj = JSON.parse(localStorage.getItem("user") || "{}");
  const [active, setActive] = useState(false);
  const data = JSON.parse(localStorage.getItem("_user_bio_") ?? "{}");

  const [user, setUser] = useState({});

  const [formdata, setFormdata] = useState({
    bio: "",
    personal: "",
    location: "",
    information: "",
  });

  const navigate = useNavigate();

  const handlerChange = (e) => {
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setUser({
        bio: data?.bio || "",
        personal: data?.personal || "",
        location: data?.location || "",
        information: data?.information || "",
      });
    });

    return () => clearTimeout(timer);
  }, [data]);

  useEffect(() => {
    setFormdata(user);
  }, [active]);

  const updateProfile = async () => {
    try {
      const response = await axios.patch("/api/user/edit/profile", formdata);
    } catch (error) {
      console.error(error.response);
    }
  };

  useEffect(() => {
    const handleUser = async () => {
      try {
        const res = await axios.post("/api/user/login/user", {
          _id: userobj.id,
        });

        if (res.status === 200) {
          const data = res.data.data.personalDetail;
          localStorage.setItem("_user_bio_", JSON.stringify(data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleUser();
  }, []);

  return (
    <>
      <div className="relative z-1000">
        {/* Cover */}
        <div className="w-full h-40 relative">
          <div className="absolute m-2 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer">
            <GoArrowLeft
              className="text-2xl transition hover:-translate-x-1 duration-150"
              onClick={() => navigate("/home")}
            />
          </div>

          <img
            src={profile_image ? `${profile_image}` : ""}
            alt="cover"
            className="w-full h-full object-cover bg-gray-400"
          />
        </div>

        {/* Profile */}
        <div className="absolute top-28 m-3 flex gap-5 items-center">
          <img
            src={profile_image ? `${profile_image}` : ""}
            alt="profile"
            className="w-24 h-24 rounded-full bg-black object-cover"
          />

          <h4 className="font-bold">{userobj?.name?.toUpperCase() || ""}</h4>
        </div>

        <hr className="mt-16" />

        {/* Content */}
        <div>
          {active ? (
            <div className="p-3 space-y-2">
              <div>
                <label>Bio :</label>
                <input
                  type="text"
                  name="bio"
                  value={formdata.bio}
                  onChange={handlerChange}
                  className="border-b-2 outline-0"
                />
              </div>

              <div>
                <label>Personal :</label>
                <input
                  name="personal"
                  value={formdata.personal}
                  onChange={handlerChange}
                  className="border-b-2 outline-0"
                />
              </div>

              <div>
                <label>Information :</label>
                <input
                  name="information"
                  value={formdata.information}
                  onChange={handlerChange}
                  className="border-b-2 outline-0"
                />
              </div>

              <div>
                <label>Location :</label>
                <input
                  name="location"
                  value={formdata.location}
                  onChange={handlerChange}
                  className="border-b-2 outline-0"
                />
              </div>

              <hr className="mt-3" />
            </div>
          ) : (
            <div className="p-3">
              <p>Bio: {user.bio}</p>
              <p>Personal: {user.personal}</p>
              <p>Location: {user.location}</p>
              <p>Information: {user.information}</p>
            </div>
          )}
        </div>
      </div>

      {/* Button */}
      <div className="relative top-12 mt-1 rounded w-full bg-black/20">
        {!active ? (
          <button
            className="w-full p-2"
            onClick={() => setActive((prev) => !prev)}
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex">
            <button
              className="w-50 p-2 bg-blue-600 text-white font-medium"
              onClick={updateProfile}
            >
              Confirm
            </button>
            <button
              onClick={() => [
                alert("Disacrd Edit ?"),
                setActive((pre) => !pre),
              ]}
              className="w-50 p-2 bg-red-600 text-white font-medium"
            >
              Cancle
            </button>
          </div>
        )}
      </div>

      <FriendsList />
      <UserPost />
    </>
  );
};

export default ProfilePage;
