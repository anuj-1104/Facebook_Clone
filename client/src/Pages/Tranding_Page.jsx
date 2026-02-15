import React from "react";
import videos from "../assets/video.mp4";
import { useAppcontext } from "../contaxt/Appcontext";

const Tranding_Page = () => {
  const { profile_image } = useAppcontext();
  return (
    <div className="relative top-22 bg-gray-300">
      <div>
        <div className="p-3 flex gap-4 font-bold ">
          <img
            src={profile_image}
            alt="profile_image"
            className="w-10 h-10 rounded-full"
          />
          <p>Anuj Dalvadi</p>
        </div>
        <p className="pl-4 pr-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, id.
        </p>
        <div className="">
          <video src={videos} className=" w-full" autoFocus autoPlay></video>
        </div>
      </div>
      <div>
        <div className="p-3 flex gap-4 font-bold ">
          <img
            src={profile_image}
            alt="profile_image"
            className="w-10 h-10 rounded-full"
          />
          <p>Anuj Dalvadi</p>
        </div>
        <p className="pl-4 pr-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, id.
        </p>
        <div className="">
          <video src={videos} className=" w-full"></video>
        </div>
      </div>
    </div>
  );
};

export default Tranding_Page;
