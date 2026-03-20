import React, { useState, useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import UserPost from "./UserPost";
import axios from "../api/axios";
import FriendsList from "../component/FriendsList";

const ProfilePage = () => {
  const profile_image = localStorage.getItem("profile_image");
  const userobj = JSON.parse(localStorage.getItem("user") || "{}");
  const data = JSON.parse(localStorage.getItem("_user_bio_") || "{}");
  const token = localStorage.getItem("token");

  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    bio: "",
    personal: "",
    location: "",
    information: "",
  });

  const [formdata, setFormdata] = useState(user);

  const navigate = useNavigate();
  //  Load user bio from localStorage
  useEffect(() => {
    setUser({
      bio: data?.bio || "",
      personal: data?.personal || "",
      location: data?.location || "",
      information: data?.information || "",
    });
  }, []);

  //  Sync formdata with user
  useEffect(() => {
    setFormdata(user);
  }, [user]);

  //  Handle input change
  const handlerChange = (e) => {
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //  Update profile
  const updateProfile = async () => {
    try {
      const response = await axios.patch("/api/user/edit/profile", formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUser(formdata); // update UI instantly
        localStorage.setItem("_user_bio_", JSON.stringify(formdata));
        setActive(false);
      }
    } catch (error) {
      console.error(error?.response || error);
    }
  };

  //  Fetch latest user data
  useEffect(() => {
    const handleUser = async () => {
      try {
        const res = await axios.get("/api/user/curr/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          const updatedData = res.data.data.personalDetail;
          localStorage.setItem("_user_bio_", JSON.stringify(updatedData));
          setUser(updatedData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleUser();
  }, []);

  // Edit button animation
  const handleEdit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActive(true);
    }, 1000);
  };

  return (
    <>
      <div className="relative z-1000 ">
        {/* Cover */}
        <div className="w-full h-40 relative">
          <div className="absolute m-2 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer">
            <GoArrowLeft
              className="text-2xl hover:-translate-x-1 duration-150"
              onClick={() => navigate("/home")}
            />
          </div>

          <img
            src={profile_image || ""}
            alt="cover"
            className="w-full h-full object-cover bg-gray-400"
          />
        </div>

        {/* Profile */}
        <div className="absolute top-28 m-3 flex gap-5 items-center">
          <img
            src={profile_image || ""}
            alt="profile"
            className="w-24 h-24 rounded-full bg-black object-cover"
          />
          <h4 className="font-bold">{userobj?.name?.toUpperCase() || ""}</h4>
        </div>

        {/* Content */}
        <div className="mt-16">
          {active ? (
            <div className="p-3 space-y-2">
              {["bio", "personal", "information", "location"].map((field) => (
                <div key={field}>
                  <label className="capitalize">{field} :</label>
                  <input
                    type="text"
                    name={field}
                    value={formdata[field]}
                    onChange={handlerChange}
                    className="border-b-2 outline-0 w-full"
                  />
                </div>
              ))}
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

      {/* Buttons */}
      <div className="m-3">
        {!active ? (
          <button
            className={`p-2 w-full rounded bg-black/20 ${
              loading ? "animate-pulse" : "hover:animate-pulse"
            }`}
            onClick={handleEdit}
          >
            {loading ? "Loading..." : "Edit Profile Detail"}
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-500"
              onClick={updateProfile}
            >
              Confirm
            </button>
            <button
              onClick={() => {
                if (window.confirm("Discard changes?")) {
                  setActive(false);
                  setFormdata(user);
                }
              }}
              className="w-full p-2 bg-red-600 text-white rounded hover:bg-red-500"
            >
              Cancel
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
