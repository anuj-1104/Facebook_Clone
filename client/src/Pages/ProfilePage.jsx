import React from "react";

const ProfilePage = () => {
  const profile_image = localStorage.getItem("profile_image");

  return (
    <>
      <div className="relative z-10000">
        <div className="w-full h-40">
          <img
            src={`http://localhost:8080/${profile_image}`} //cover image
            alt="back_image"
            className="w-full h-full object-cover  bg-gray-400 "
          />
        </div>
        <div className="absolute top-28 m-3 ">
          <img
            src={`http://localhost:8080/${profile_image}`} //profile image
            alt="profile_image "
            className="w-25 h-25 rounded-full bg-black "
          />
        </div>
        <hr />
        <div className=" ">
          <h4 className="font-bold flex left-35 top-2 relative">
            {/* Anuj Dalvadi */}
          </h4>
          <div className="top-12 p-3 relative">
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
