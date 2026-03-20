import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LuImages } from "react-icons/lu";

const ProfileBar = () => {
  const navigate = useNavigate();
  const [searchquery, setSearchQuery] = useState({
    search: "",
  });

  const fileInputRef = useRef(null);
  const handleImage = () => {
    fileInputRef.current.click();
  };

  //select only single image access
  const handdlerfile = (event) => {
    const file = event.target.files[0];

    //Debugging Purpose
    // if (file) {
    //   console.log(`file is selected : ${file.name}`);
    // }
  };

  const profile_image = localStorage.getItem("profile_image");

  const handlechange = (e) => {
    const { name, value } = e.target;

    setSearchQuery((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handllerProfile = () => {
    navigate("/profile");
  };

  //fiexed the ui
  return (
    <div className="w-full grid grid-cols-2 z-10000 bg-white  fixed top-20">
      <div className="p-2 flex gap-4">
        <img
          src={`${profile_image}`} //used a express static routes
          alt="profile_image"
          onClick={handllerProfile}
          className="rounded-full w-10 fixed h-10"
        />

        <input
          type="text"
          name="search"
          value={searchquery.search}
          spellCheck="false"
          onChange={handlechange}
          className="text-black p-1 relative left-12 placeholder-black font-medium border-2 placeholder:font-medium outline-0 rounded-2xl "
          placeholder="What's on your mind ? "
        />
      </div>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handdlerfile}
      />
      <div className="flex flex-row-reverse p-3">
        <button onClick={handleImage}>
          <LuImages className="text-4xl justify-end-safe" />
        </button>
      </div>
      <hr />
      <hr />
    </div>
  );
};

export default ProfileBar;
